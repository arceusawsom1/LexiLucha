package com.LexiLucha.LexiLucha.service

import com.LexiLucha.LexiLucha.dal.ShopItemRepository
import com.LexiLucha.LexiLucha.dal.UserRepository
import com.LexiLucha.LexiLucha.model.CustomBoard
import com.LexiLucha.LexiLucha.model.User
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.security.crypto.password.PasswordEncoder
import org.springframework.stereotype.Service

@Service
class UserService @Autowired constructor(var userRepository: UserRepository, var encoder: PasswordEncoder, var shopItemRepository: ShopItemRepository) {
    fun register(user : User) {
        val encodedPassword = encoder.encode(user.password)
        user.custom = CustomBoard();
        user.password= encodedPassword
        save(user)
    }
    fun findByUsername(username: String) : User{
        return userRepository.findByUsername(username)
    }

    fun existsByUsername(username: String): Boolean {
        return userRepository.existsByUsername(username)
    }

    fun save(user: User) {
//        user.items.filter{it.title==""}.forEach { user.items.remove(it);user.items.add(shopItemRepository.findById(it.id).orElseThrow{RuntimeException("item cant be found (${it.id})")}) }
//        println(user)
        this.userRepository.save(user)
    }

    fun saveAll(userList: ArrayList<User>) {
        this.userRepository.saveAll(userList)
    }
}