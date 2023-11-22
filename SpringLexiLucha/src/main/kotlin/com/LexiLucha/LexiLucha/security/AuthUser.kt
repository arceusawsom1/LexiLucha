package com.LexiLucha.LexiLucha.security

import com.LexiLucha.LexiLucha.model.User
import org.springframework.security.core.GrantedAuthority
import org.springframework.security.core.authority.SimpleGrantedAuthority
import java.util.*

class AuthUser(user: User) : org.springframework.security.core.userdetails.UserDetails {
    private val user: User

    init {
        this.user = user
    }

    override fun getAuthorities(): MutableCollection<out GrantedAuthority> {
        return ArrayList(user.role.map{SimpleGrantedAuthority(it.toString())})
    }

    override fun getPassword(): String {
        return user.password
    }

    override fun getUsername(): String {
        return user.username
    }

    override fun isAccountNonExpired(): Boolean {
        return true
    }

    override fun isAccountNonLocked(): Boolean {
        return true
    }

    override fun isCredentialsNonExpired(): Boolean {
        return true
    }

    override fun isEnabled(): Boolean {
        return true
    }

}
