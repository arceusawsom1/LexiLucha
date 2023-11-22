package com.LexiLucha.LexiLucha.security

import com.LexiLucha.LexiLucha.exceptions.ConflictException
import com.LexiLucha.LexiLucha.model.User
import com.LexiLucha.LexiLucha.service.UserService
import org.slf4j.LoggerFactory
import org.springframework.security.core.Authentication
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RestController


@RestController
class AuthController(private val tokenService: TokenService, val userService: UserService) {
    @PostMapping("auth/login")
    fun token(authentication: Authentication): String {
        LOG.debug("Token requested for user: '{}'", authentication.name)
        val token: String = tokenService.generateToken(authentication)
        LOG.debug("Token granted: {}", token)
        return token
    }

    @GetMapping("example")
    fun example(auth: Authentication): String {
        println("name:  " + auth.name)
        println("princ: " + auth.principal)
        println("creds: " + auth.credentials)
        println(auth.authorities)
        return "Hello, " + auth.name
    }

    @GetMapping("adminonly")
    fun example(): String {
        return "You must be an admin"
    }

    @PostMapping("auth/register")
    fun register(@RequestBody user : User){
        if (!userService.existsByUsername(user.username)){
            userService.register(user)
            return
        }
        throw ConflictException("Username is in use")

    }

    companion object {
        private val LOG = LoggerFactory.getLogger(AuthController::class.java)
    }
}

