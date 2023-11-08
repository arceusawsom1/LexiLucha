package com.LexiLucha.LexiLucha.controller

import com.LexiLucha.LexiLucha.model.Player
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("player")
class MainController {

    @GetMapping
    fun testEndpoint() : Player{
        return Player("Dummy");
    }
}