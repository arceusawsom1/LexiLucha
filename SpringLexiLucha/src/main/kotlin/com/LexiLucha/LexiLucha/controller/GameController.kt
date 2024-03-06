package com.LexiLucha.LexiLucha.controller

import com.LexiLucha.LexiLucha.dal.GameArchive
import com.LexiLucha.LexiLucha.dal.GameRepository
import com.LexiLucha.LexiLucha.dal.QuestionRepository
import com.LexiLucha.LexiLucha.model.GameState
import com.LexiLucha.LexiLucha.model.enums.LANGUAGE
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.CrossOrigin
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("game")
class GameController @Autowired(required = true) constructor(
    private val gameRepo: GameRepository,
    private val gameArchive: GameArchive
){

    @GetMapping
    fun getCurrentGames() : ArrayList<GameState>{
        val games = ArrayList<GameState>()

        val myHistory : History = History();

        games.addAll(gameRepo.findAll())
        return games
    }
    @GetMapping("/archive")
    fun getArchive() : ArrayList<GameState>{
        val games = ArrayList<GameState>()
        games.addAll(gameArchive.findAll())
        return games
    }
}