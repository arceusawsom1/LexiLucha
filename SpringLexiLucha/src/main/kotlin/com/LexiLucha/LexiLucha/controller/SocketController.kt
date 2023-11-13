package com.LexiLucha.LexiLucha.controller

import com.LexiLucha.LexiLucha.QuestionRepository
import com.LexiLucha.LexiLucha.messages.SimpleMessage
import com.LexiLucha.LexiLucha.model.CompletedQuestion
import com.LexiLucha.LexiLucha.model.GameState
import com.LexiLucha.LexiLucha.model.Player
import com.LexiLucha.LexiLucha.model.Question
import com.LexiLucha.LexiLucha.model.dto.SimpleQuestion
import com.corundumstudio.socketio.AckRequest
import com.corundumstudio.socketio.SocketIOClient
import com.corundumstudio.socketio.SocketIONamespace
import com.corundumstudio.socketio.SocketIOServer
import com.corundumstudio.socketio.listener.ConnectListener
import com.corundumstudio.socketio.listener.DataListener
import com.corundumstudio.socketio.listener.DisconnectListener
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Component
import java.lang.RuntimeException
import java.util.*


@Component
class SocketController @Autowired constructor(
        private final val server: SocketIOServer,
        private final val questionRepo: QuestionRepository
) {
    val queue: List<Player> = ArrayList()
    val connections : MutableMap<UUID, Int> = HashMap()
    val games : MutableMap<Int, GameState> = HashMap()
    final val namespace:SocketIONamespace = server.addNamespace("/main");
    init{

        println("setup socketio controller")
        namespace.addConnectListener(onConnected())
        namespace.addDisconnectListener(onDisconnected())

        namespace.addEventListener("joinQueue", SimpleMessage::class.java, onJoinQueue())
        namespace.addEventListener("ready", SimpleMessage::class.java, onReady())
        namespace.addEventListener("submitAttempt", SimpleMessage::class.java, submitAttempt())

    }

    private fun onConnected(): ConnectListener {
        return ConnectListener { client: SocketIOClient ->
            val handshakeData = client.handshakeData
            println("Client[${client.sessionId.toString()}] - Connected to game module through '${ handshakeData.url}'")
        }
    }
    private fun onDisconnected(): DisconnectListener {
        return DisconnectListener { client: SocketIOClient -> println("Client[${client.sessionId.toString()}] - Disconnected from game module.") }
    }

    private fun onJoinQueue(): DataListener<SimpleMessage> {
        return DataListener<SimpleMessage> { client: SocketIOClient, data: SimpleMessage?, ackSender: AckRequest? ->
            println("Message Recieved ${data?.data}")
//            namespace.getBroadcastOperations().sendEvent("chat", data)
            connections[client.sessionId] = 1
            if (!games.containsKey(1)){
                games[1] = GameState(phase=1)
            }
            var name = "Default Name"
            if (data != null) {
                name = data.data
            }
            games[1]?.players?.add(Player(name=name, client=client))
            if (games[1]?.players?.size==2){
                games[1]?.phase=2
            }
            games[1]?.sendUpdate();
        }
    }
    private fun onReady(): DataListener<SimpleMessage> {
        return DataListener<SimpleMessage> { client: SocketIOClient, data: SimpleMessage?, ackSender: AckRequest? ->
            println("${client.sessionId} is ready")
            val gamestate = games[connections[client.sessionId]] ?: throw RuntimeException("gameState null")
            gamestate.getPlayerBySessionId(client.sessionId)?.ready = true
            if (gamestate.players.all{ it.ready}){
                gamestate.phase=3
                stepQuestion(gamestate)
            }
            gamestate.sendUpdate()
        }
    }
    private fun stepQuestion(gamestate: GameState){
        val maxQuestion : Int = questionRepo.count().toInt()
        val allQuestionIds : List<Int> = (1..maxQuestion).toList()
        val unusedQuestions = allQuestionIds.filter{!gamestate.finishedQuestions.contains(it)}
        val newQuestionID = unusedQuestions.random()
        val newQuestion = questionRepo.findById(newQuestionID).orElseThrow { RuntimeException("can't find question: $newQuestionID") }
        gamestate.currentQuestion = newQuestion
        gamestate.currentQuestionSimple = SimpleQuestion(newQuestion)
        gamestate.startTime = System.currentTimeMillis()
    }
    private fun submitAttempt(): DataListener<SimpleMessage> {
        return DataListener<SimpleMessage> { client: SocketIOClient, data: SimpleMessage?, ackSender: AckRequest? ->
            var attempt : String = data?.data ?: throw RuntimeException("gameState null")
            val gamestate = games[connections[client.sessionId]] ?: throw RuntimeException("gameState null")
            gamestate.currentQuestion ?: throw RuntimeException("currentQuestion null")
            var player: Player = gamestate.getPlayerBySessionId(client.sessionId)
            val correct = attempt.equals(gamestate.currentQuestion?.answer);
            if ( correct  ){
                if (!gamestate.players.any{it.stat.completions.size > player.stat.completions.size && it.stat.completions.last().correct}) {
                    client.sendEvent("successMessage", SimpleMessage("You got the question right the fastest!"))
                    println("right fast")
                    player.stat?.score = player.stat?.score?.plus(1) ?: 1
                } else {
                    println("right slow")

                    client.sendEvent("warningMessage",SimpleMessage("You got the question right, but not the fastest"))
                }
            } else {
                println("wrong")

                client.sendEvent("failMessage",SimpleMessage("You got the question wrong!"))
            }
            val questionId: Int = gamestate.currentQuestion!!.id ?:1
            val timeTaken: Long = System.currentTimeMillis() - gamestate.startTime
            player.stat?.completions?.add(CompletedQuestion(questionId, timeTaken, correct))
            if (gamestate.players.all{ p -> p.stat?.completions!!.any {it.questionId==questionId}}) {
                stepQuestion(gamestate)
            }
            gamestate.sendUpdate()
        }
    }

}