package com.LexiLucha.LexiLucha.controller

import com.LexiLucha.LexiLucha.dal.GameArchive
import com.LexiLucha.LexiLucha.dal.GameRepository
import com.LexiLucha.LexiLucha.dal.QuestionRepository
import com.LexiLucha.LexiLucha.messages.SimpleMessage
import com.LexiLucha.LexiLucha.model.CompletedQuestion
import com.LexiLucha.LexiLucha.model.GameState
import com.LexiLucha.LexiLucha.model.Player
import com.LexiLucha.LexiLucha.model.Question
import com.LexiLucha.LexiLucha.model.dto.AllLobbies
import com.LexiLucha.LexiLucha.model.dto.JoinQueueMessage
import com.LexiLucha.LexiLucha.model.dto.SimpleQuestion
import com.LexiLucha.LexiLucha.model.enums.LANGUAGE
import com.LexiLucha.LexiLucha.model.enums.PLAYERTYPE
import com.LexiLucha.LexiLucha.security.TokenService
import com.LexiLucha.LexiLucha.service.SocketService
import com.corundumstudio.socketio.AckRequest
import com.corundumstudio.socketio.SocketIOClient
import com.corundumstudio.socketio.SocketIONamespace
import com.corundumstudio.socketio.SocketIOServer
import com.corundumstudio.socketio.listener.ConnectListener
import com.corundumstudio.socketio.listener.DataListener
import com.corundumstudio.socketio.listener.DisconnectListener
import com.nimbusds.jwt.JWT
import jakarta.annotation.PreDestroy
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.beans.factory.annotation.Value
import org.springframework.security.oauth2.jwt.Jwt
import org.springframework.security.oauth2.jwt.JwtDecoder
import org.springframework.stereotype.Component
import java.lang.RuntimeException
import java.util.*
import kotlin.collections.ArrayList


@Component
class SocketController @Autowired constructor(
    private final val server: SocketIOServer,
    @Value("\${socketio.context-path}") private final val contextPath : String,
    private final val socketService : SocketService
) {
    init{
        val namespace:SocketIONamespace = server.addNamespace("$contextPath/main");
        namespace.addConnectListener(onConnected())
        namespace.addDisconnectListener(onDisconnected())

        namespace.addEventListener("joinQueue", JoinQueueMessage::class.java, onJoinQueue())
        namespace.addEventListener("ready", SimpleMessage::class.java, onReady())
        namespace.addEventListener("submitAttempt", SimpleMessage::class.java, submitAttempt())
//        namespace.addEventListener("requestAllLobbies", SimpleMessage::class.java, broadcastLobbiesListner())




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
    private fun broadcastLobbiesListner(): DataListener<SimpleMessage> {
        return DataListener<SimpleMessage> { _: SocketIOClient, data: SimpleMessage?, ackSender: AckRequest? ->
            broadcastLobbiesListner()
        }
    }
    private fun broadcastLobbies(){
        server.broadcastOperations.sendEvent("allLobbies", AllLobbies(socketService.allLobbies()))
    }
    private fun onDisconnected(): DisconnectListener {
        return DisconnectListener { client: SocketIOClient ->
            socketService.handleDisconnect(client);
            broadcastLobbies()
        }
    }

    private fun onJoinQueue(): DataListener<JoinQueueMessage> {
        return DataListener<JoinQueueMessage> { client: SocketIOClient, data: JoinQueueMessage, ackSender: AckRequest? ->
            socketService.handleJoinQueue(client, data)
            broadcastLobbies()
        }
    }
    private fun onReady(): DataListener<SimpleMessage> {
        return DataListener<SimpleMessage> { client: SocketIOClient, data: SimpleMessage?, ackSender: AckRequest? ->
            socketService.handleReady(client)
            broadcastLobbies()
        }
    }

    private fun submitAttempt(): DataListener<SimpleMessage> {
        return DataListener<SimpleMessage> { client: SocketIOClient, data: SimpleMessage, ackSender: AckRequest? ->
            socketService.handleSubmit(client, data);
        }
    }

}