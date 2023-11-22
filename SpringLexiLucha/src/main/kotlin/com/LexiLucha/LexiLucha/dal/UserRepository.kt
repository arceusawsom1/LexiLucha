package com.LexiLucha.LexiLucha.dal

import com.LexiLucha.LexiLucha.model.User
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface UserRepository : JpaRepository<User, Int> {
    abstract fun findByUsername(username: String) : User
}