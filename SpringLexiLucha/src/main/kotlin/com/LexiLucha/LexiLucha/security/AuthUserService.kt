package com.LexiLucha.LexiLucha.security

import com.LexiLucha.LexiLucha.model.User
import com.LexiLucha.LexiLucha.service.UserService

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.security.core.userdetails.UserDetails
import org.springframework.security.core.userdetails.UserDetailsService
import org.springframework.security.core.userdetails.UsernameNotFoundException
import org.springframework.stereotype.Service


@Service
class AuthUserService @Autowired constructor(val userService: UserService) : UserDetailsService {

    @Throws(UsernameNotFoundException::class)
    override fun loadUserByUsername(username: String): UserDetails {
        val user: User = userService.findByUsername(username)
        return AuthUser(user)
    }
}