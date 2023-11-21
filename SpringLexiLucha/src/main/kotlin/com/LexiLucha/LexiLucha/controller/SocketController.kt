package com.LexiLucha.LexiLucha.controller

import com.LexiLucha.LexiLucha.dal.GameArchive
import com.LexiLucha.LexiLucha.dal.GameRepository
import com.LexiLucha.LexiLucha.dal.QuestionRepository
import com.LexiLucha.LexiLucha.messages.SimpleMessage
import com.LexiLucha.LexiLucha.model.CompletedQuestion
import com.LexiLucha.LexiLucha.model.GameState
import com.LexiLucha.LexiLucha.model.Player
import com.LexiLucha.LexiLucha.model.Question
import com.LexiLucha.LexiLucha.model.dto.JoinQueueMessage
import com.LexiLucha.LexiLucha.model.dto.SimpleQuestion
import com.LexiLucha.LexiLucha.model.enums.LANGUAGE
import com.corundumstudio.socketio.AckRequest
import com.corundumstudio.socketio.SocketIOClient
import com.corundumstudio.socketio.SocketIONamespace
import com.corundumstudio.socketio.SocketIOServer
import com.corundumstudio.socketio.listener.ConnectListener
import com.corundumstudio.socketio.listener.DataListener
import com.corundumstudio.socketio.listener.DisconnectListener
import jakarta.annotation.PreDestroy
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.beans.factory.annotation.Value
import org.springframework.stereotype.Component
import java.lang.RuntimeException
import java.util.*
import kotlin.collections.ArrayList


@Component
class SocketController @Autowired constructor(
    private final val server: SocketIOServer,
    private final val questionRepo: QuestionRepository,
    private final val gameRepo: GameRepository,
    @Value("\${socketio.context-path}") private final val contextPath : String,
    private final val gameArchive: GameArchive
) {
    val queue: List<Player> = ArrayList()
    val connections : MutableMap<UUID, GameState> = HashMap()
    val games : ArrayList<GameState> = gameRepo.findAll()
    private final val MIN_PLAYERS_IN_LOBBY = 1
    private final val QUESTIONS_IN_ROUND = 10

    init{
        val namespace:SocketIONamespace = server.addNamespace("$contextPath/main");
        namespace.addConnectListener(onConnected())
        namespace.addDisconnectListener(onDisconnected())

        namespace.addEventListener("joinQueue", JoinQueueMessage::class.java, onJoinQueue())
        namespace.addEventListener("ready", SimpleMessage::class.java, onReady())
        namespace.addEventListener("submitAttempt", SimpleMessage::class.java, submitAttempt())

    }
    @PreDestroy
    fun destroy(){
        println("Killing server")
        server.stop()
    }
    private fun onConnected(): ConnectListener {
        return ConnectListener { client: SocketIOClient ->
            val handshakeData = client.handshakeData
            println("Client[${client.sessionId.toString()}] - Connected to game module through '${ handshakeData.url}'")
        }
    }
    private fun onDisconnected(): DisconnectListener {
        return DisconnectListener { client: SocketIOClient ->
            if (connections.containsKey(client.sessionId)){
                val currentGame : GameState = games.find{it.activePlayers().any{it.client==client}} ?: throw Exception("Game not found")
                currentGame.activePlayers().filter { it.client == client }.forEach{ it.active=false }
                connections.remove(client.sessionId)
                currentGame.sendUpdate()
            }
        }
    }

    private fun onJoinQueue(): DataListener<JoinQueueMessage> {
        return DataListener<JoinQueueMessage> { client: SocketIOClient, data: JoinQueueMessage, ackSender: AckRequest? ->
            println("Player joining queue ${data}")
            val newPlayer = Player(name=data.name ?: "default name", client=client)
            val language : LANGUAGE = data.language
            // Find an existing game that is in one of the first two phases (waiting for playerrs, or waiting for ready upts) OR create a new game
            val selectedGame : GameState = games.find{it.language==language && (it.phase==1 || it.phase==2)} ?: GameState(language=language, phase=1, createdTime=System.currentTimeMillis())

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
    }
    private fun onReady(): DataListener<SimpleMessage> {
        return DataListener<SimpleMessage> { client: SocketIOClient, data: SimpleMessage?, ackSender: AckRequest? ->
            println("${client.sessionId} is ready")
            val gamestate = connections[client.sessionId] ?: throw RuntimeException("gameState null")
            gamestate.getPlayerBySessionId(client.sessionId).ready = true
            if (gamestate.activePlayers().all{ it.ready }){
                gamestate.phase=3
                stepQuestion(gamestate)
            }
            gamestate.sendUpdate()
        }
    }
    private fun stepQuestion(gamestate: GameState){
        // Add the old question to the finished questions array, so it doesn't get repeated
        if (gamestate.currentQuestion != null)
            gamestate.finishedQuestions.add(gamestate.currentQuestion!!.id)

        // Get all questions for the correct language
        val allQuestionIds = questionRepo.findIdsByLanguage(gamestate.language)
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
    private fun submitAttempt(): DataListener<SimpleMessage> {
        return DataListener<SimpleMessage> { client: SocketIOClient, data: SimpleMessage?, ackSender: AckRequest? ->
            var attempt : String = data?.data ?: throw RuntimeException("gameState null")
            val gamestate = connections[client.sessionId] ?: throw RuntimeException("gameState null")
            gamestate.currentQuestion ?: throw RuntimeException("currentQuestion null")
            var player: Player = gamestate.getPlayerBySessionId(client.sessionId)
            val correct = attempt.lowercase() == gamestate.currentQuestion?.answer?.lowercase();
            if ( correct  ){
                if (!gamestate.activePlayers().any{it.stat.completions.size > player.stat.completions.size && it.stat.completions.last().correct}) {
                    client.sendEvent("successMessage", SimpleMessage("You got the question right the fastest!"))
                    println("right fast")
                    player.stat.score = player.stat.score.plus(gamestate.activePlayers().size-gamestate.activePlayers().filter{it.stat.completions.size > player.stat.completions.size && it.stat.completions.last().correct}.size)
                } else {
                    println("right slow")
                    player.stat.score = player.stat.score.plus(gamestate.activePlayers().size-gamestate.activePlayers().filter{it.stat.completions.size > player.stat.completions.size && it.stat.completions.last().correct}.size)
                    client.sendEvent("warningMessage",SimpleMessage("You got the question right, but not the fastest"))
                }
            } else {
                println("wrong")

                client.sendEvent("failMessage",SimpleMessage("You got the question wrong!"))
            }
            val questionId: Int = gamestate.currentQuestion!!.id ?:1
            val timeTaken: Long = System.currentTimeMillis() - gamestate.startTime
            player.stat.completions.add(CompletedQuestion(questionId=questionId,timeTaken=timeTaken,correct=correct))
            if (gamestate.activePlayers().all{ p -> p.stat.completions.any {it.questionId==questionId}}) {
                stepQuestion(gamestate)
            }
            if (gamestate.finishedQuestions.size>=QUESTIONS_IN_ROUND && gamestate.phase!=4) {
                gamestate.phase = 4
                games.remove(gamestate)
                gamestate.finishedTime=System.currentTimeMillis()
                gameArchive.save(gamestate)
                gamestate.players.forEach{connections.remove(it.client.sessionId)}
            }
            gamestate.sendUpdate()
        }
    }

}