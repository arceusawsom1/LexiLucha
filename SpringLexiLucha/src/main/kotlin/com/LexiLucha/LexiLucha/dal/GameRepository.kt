package com.LexiLucha.LexiLucha.dal

import com.LexiLucha.LexiLucha.model.GameState
import org.springframework.stereotype.Component

@Component
class GameRepository (private val games: ArrayList<GameState>){

    fun findAll(): ArrayList<GameState>{
        return games;
    }
}