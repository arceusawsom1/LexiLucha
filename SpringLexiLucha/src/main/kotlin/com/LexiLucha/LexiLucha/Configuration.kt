package com.LexiLucha.LexiLucha

import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder
import org.springframework.security.crypto.password.PasswordEncoder

@Configuration
class Configuration {
    @Bean
    fun passwordEncoder(): PasswordEncoder {
        println(BCryptPasswordEncoder().encode("password"))
        return BCryptPasswordEncoder()
    }
}