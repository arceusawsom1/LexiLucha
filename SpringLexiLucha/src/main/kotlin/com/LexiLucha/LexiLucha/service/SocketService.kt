package com.LexiLucha.LexiLucha.service

import com.LexiLucha.LexiLucha.dal.GameArchive
import com.LexiLucha.LexiLucha.dal.GameRepository
import com.LexiLucha.LexiLucha.dal.QuestionRepository
import com.LexiLucha.LexiLucha.messages.SimpleMessage
import com.LexiLucha.LexiLucha.model.CompletedQuestion
import com.LexiLucha.LexiLucha.model.GameState
import com.LexiLucha.LexiLucha.model.Player
import com.LexiLucha.LexiLucha.model.User
import com.LexiLucha.LexiLucha.model.dto.JoinQueueMessage
import com.LexiLucha.LexiLucha.model.dto.SimpleQuestion
import com.LexiLucha.LexiLucha.model.enums.LANGUAGE
import com.LexiLucha.LexiLucha.model.enums.PLAYERTYPE
import com.LexiLucha.LexiLucha.model.enums.QUESTIONMODE
import com.corundumstudio.socketio.SocketIOClient
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.security.oauth2.jwt.Jwt
import org.springframework.security.oauth2.jwt.JwtDecoder
import org.springframework.stereotype.Service
import java.lang.RuntimeException
import java.util.*

@Service
class SocketService @Autowired constructor(
    private final val gameRepo: GameRepository,
    private final val questionRepo: QuestionRepository,
    private final val gameArchive: GameArchive,
    private final val decoder : JwtDecoder,
    private final val userService: UserService
){
    val connections : MutableMap<UUID, GameState> = HashMap()
    var games : ArrayList<GameState> = gameRepo.findAll()
    private final val MIN_PLAYERS_IN_LOBBY = 1
    private final val QUESTIONS_IN_ROUND = 10

    fun handleDisconnect(client : SocketIOClient){
        if (connections.containsKey(client.sessionId)){
            val currentGame : GameState = games.find{it.activePlayers().any{it.client==client}} ?: throw Exception("Game not found")
            currentGame.activePlayers().filter { it.client == client }.forEach{ it.active=false }
            if (currentGame.players.count{it.active} == 0){
                games.remove(currentGame)
            }
            connections.remove(client.sessionId)
            currentGame.sendUpdate()
        }
    }
    fun handleJoinQueue(client : SocketIOClient,data: JoinQueueMessage ) {
        println("Player joining queue $data")
        val newPlayer = if (data.name!=""){
            Player(name=data.name, client=client)
        } else if (data.bearer!=""){
            val jwt : Jwt = decoder.decode(data.bearer.removePrefix("Bearer "))
            val username : String = jwt.subject
            val user : User = userService.findByUsername(username)
            Player(name=username, client=client, type= PLAYERTYPE.REGISTERED, custom=user.custom)
        } else {
            throw Exception("Name OR Bearer needs to be provided")
        }
        val language : LANGUAGE = data.language
        val mode : QUESTIONMODE = data.mode

        // Find an existing game that is in one of the first two phases (waiting for playerrs, or waiting for ready upts) OR create a new game
        val selectedGame : GameState = games.find{it.language==language && it.mode==mode && (it.phase==1 || it.phase==2)} ?: GameState(mode=mode, language=language, phase=1, createdTime=System.currentTimeMillis())

        // Point the user to the game
        connections[client.sessionId] = selectedGame

        // Add the player to the game
        selectedGame.players.add(newPlayer)

        // If the lobby now has the correct number of players, then start waiting for ready ups
        if (selectedGame.activePlayers().size >= MIN_PLAYERS_IN_LOBBY){
            selectedGame.phase=2
        }
        selectedGame.sendUpdate();

        // This line COULD cause issues in the future
        // We need to know whether the game needs to be added to 'games'
        // We are going to assume that if a game only has one player at this point, then it is new, and thus needs to be added
        if (selectedGame.players.size == 1)
            games.add(selectedGame)
    }
    fun handleReady(client: SocketIOClient){
        println("${client.sessionId} is ready")
        val gamestate = connections[client.sessionId] ?: throw RuntimeException("gameState null")
        gamestate.getPlayerBySessionId(client.sessionId).ready = true
        if (gamestate.activePlayers().all{ it.ready }){
            gamestate.phase=3
            stepQuestion(gamestate)
        }
        gamestate.sendUpdate()
    }

    fun handleSubmit(client : SocketIOClient, data : SimpleMessage){
        var attempt : String = data.data
        val gamestate = connections[client.sessionId] ?: throw RuntimeException("gameState null")
        gamestate.currentQuestion ?: throw RuntimeException("currentQuestion null")
        var player: Player = gamestate.getPlayerBySessionId(client.sessionId)
        val correct = attempt.lowercase() == gamestate.currentQuestion?.answer?.lowercase();
        val questionId: Int = gamestate.currentQuestion!!.id ?:1
        val timeTaken: Long = System.currentTimeMillis() - gamestate.startTime
        if ( correct  ){
            val numPlayers = gamestate.activePlayers().size
            val allAttempts : List<CompletedQuestion> = gamestate.activePlayers().flatMap{it.stat.completions}
            val currentQuestionAttempts : List<CompletedQuestion> = allAttempts.filter{it.questionId==questionId}
            val correctAttempts =  currentQuestionAttempts.count{it.correct}
            val earnedScore = numPlayers-correctAttempts
            player.stat.score = player.stat.score.plus(earnedScore)
            if (correctAttempts==0) {
                client.sendEvent("successMessage", SimpleMessage("You got the question right the fastest!"))
            } else {
                client.sendEvent("warningMessage", SimpleMessage("You got the question right, but not the fastest"))
            }
        } else {
            println("  - And got it wrong")
            client.sendEvent("failMessage", SimpleMessage("You got the question wrong!"))
        }

        // Add a record of the current question to the user
        player.stat.completions.add(CompletedQuestion(questionId=questionId,timeTaken=timeTaken,correct=correct))

        // If everyone has answered a question, then chose a new question
        if (gamestate.activePlayers().all{ p -> p.stat.completions.any {it.questionId==questionId}}) {
            stepQuestion(gamestate)
        }
        // If the round is complete, then end the round
        if (gamestate.finishedQuestions.size>=QUESTIONS_IN_ROUND && gamestate.phase!=4) {
            endGame(gamestate)
        }
        gamestate.sendUpdate()
    }
    fun endGame(gamestate: GameState){
        gamestate.phase = 4
        games.remove(gamestate)
        gamestate.finishedTime=System.currentTimeMillis()
        gameArchive.save(gamestate)
        gamestate.players.forEach{connections.remove(it.client.sessionId)}
        val userList = ArrayList<User>();
        gamestate.activePlayers().filter{it.type==PLAYERTYPE.REGISTERED}.forEach{userList.add(userService.findByUsername(it.name))}
        userList.forEach { it.money+=1 }
        userService.saveAll(userList)
    }
    fun stepQuestion(gamestate: GameState){
        // Add the old question to the finished questions array, so it doesn't get repeated
        if (gamestate.currentQuestion != null)
            gamestate.finishedQuestions.add(gamestate.currentQuestion!!.id)

        // Get all questions for the correct language AND MODE
        val allQuestionIds = questionRepo.findIdsByLanguageAndMode(gamestate.language, gamestate.mode)
        // Remove questions that have already been done
        val unusedQuestions = allQuestionIds.filter{!gamestate.finishedQuestions.contains(it)}
        // Get a random question ID
        val newQuestionID = unusedQuestions.random()
        // Get that question
        val newQuestion = questionRepo.findById(newQuestionID).orElseThrow { RuntimeException("can't find question: $newQuestionID") }


        // Set the current question to the new question
        gamestate.currentQuestion = newQuestion
        gamestate.currentQuestionSimple = SimpleQuestion(newQuestion)
        // Reset the startTime
        gamestate.startTime = System.currentTimeMillis()
    }
}