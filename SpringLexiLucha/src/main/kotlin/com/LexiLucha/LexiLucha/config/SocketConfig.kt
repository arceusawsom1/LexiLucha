package com.LexiLucha.LexiLucha.config

import com.corundumstudio.socketio.Configuration
import com.corundumstudio.socketio.SocketIOServer
import org.springframework.context.annotation.Bean
@org.springframework.context.annotation.Configuration
class SocketConfig {
    @Bean
    fun socketIOServer(): SocketIOServer {
        val config = Configuration()
        config.port = 8088
        val server = SocketIOServer(config)
        server.start()
        println("Server starting")
        return server;
    }
}