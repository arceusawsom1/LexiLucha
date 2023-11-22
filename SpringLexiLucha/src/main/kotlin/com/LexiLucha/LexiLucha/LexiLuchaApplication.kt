package com.LexiLucha.LexiLucha

import com.LexiLucha.LexiLucha.model.GameState
import com.LexiLucha.LexiLucha.security.RsaKeyProperties
import com.corundumstudio.socketio.Configuration
import com.corundumstudio.socketio.SocketIOServer
import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.context.properties.EnableConfigurationProperties
import org.springframework.boot.runApplication
import org.springframework.context.annotation.Bean
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder
import org.springframework.security.crypto.password.PasswordEncoder


@SpringBootApplication
@EnableConfigurationProperties(RsaKeyProperties::class)
class LexiLuchaApplication
fun main(args: Array<String>) {
	runApplication<LexiLuchaApplication>(*args)
}


