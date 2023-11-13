package com.LexiLucha.LexiLucha.config

import com.corundumstudio.socketio.Configuration
import com.corundumstudio.socketio.SocketIOServer
import org.slf4j.Logger
import org.slf4j.LoggerFactory
import org.springframework.beans.factory.annotation.Value
import org.springframework.context.annotation.Bean
@org.springframework.context.annotation.Configuration
class SocketConfig {

    private val log: Logger = LoggerFactory.getLogger(this::class.java)

    @Value("\${socketio.port}")
    lateinit var port: String

    @Value("\${server.servlet.context-path}")
    lateinit var context: String

    @Bean
    fun socketIOServer(): SocketIOServer {
        val config = Configuration()
        config.port = port.toInt()
        config.context = context
        val server = SocketIOServer(config)
        log.info("Started socketio server on port: $port with context path: '$context'")
        server.start()
        return server;
    }
}