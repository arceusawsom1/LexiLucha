package com.LexiLucha.LexiLucha.config

import com.corundumstudio.socketio.Configuration
import com.corundumstudio.socketio.SocketIOServer
import org.springframework.beans.factory.annotation.Value
import org.springframework.context.annotation.Bean
@org.springframework.context.annotation.Configuration
class SocketConfig {

    @Value("\${socketio.port}")
    lateinit var port: String

    @Bean
    fun socketIOServer(): SocketIOServer {
        val config = Configuration()
        config.port = port.toInt()
        val server = SocketIOServer(config)
        server.start()
        println("Server starting")
        return server;
    }
}