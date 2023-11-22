package com.LexiLucha.LexiLucha.service

import com.LexiLucha.LexiLucha.dal.UserRepository
import com.LexiLucha.LexiLucha.model.User
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.security.crypto.password.PasswordEncoder
import org.springframework.stereotype.Service

@Service
class UserService @Autowired constructor(var userRepository: UserRepository, var encoder: PasswordEncoder) {
    fun register(user : User) {
        val encodedPassword = encoder.encode(user.password)
        user.password= encodedPassword
        userRepository.save(user)
    }
    fun findByUsername(username: String) : User{
        return userRepository.findByUsername(username)
    }
}