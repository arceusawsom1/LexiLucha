package com.LexiLucha.LexiLucha.controller

import com.LexiLucha.LexiLucha.messages.SimpleMessage
import com.LexiLucha.LexiLucha.model.GameState
import com.LexiLucha.LexiLucha.model.Player
import com.corundumstudio.socketio.AckRequest
import com.corundumstudio.socketio.SocketIOClient
import com.corundumstudio.socketio.SocketIONamespace
import com.corundumstudio.socketio.SocketIOServer
import com.corundumstudio.socketio.listener.ConnectListener
import com.corundumstudio.socketio.listener.DataListener
import com.corundumstudio.socketio.listener.DisconnectListener
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Component
import java.util.*


@Component
class SocketController @Autowired constructor(
        private final val server: SocketIOServer
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
                games[1] = GameState()
            }
            var name = "Default Name"
            if (data != null) {
                name = data.data
            }
            games[1]?.players?.add(Player(name=name, client=client))
            if (games[1]?.players?.size==2){
                games[1]?.start()
            }
            games[1]?.sendUpdate();
        }
    }

}