package com.LexiLucha.LexiLucha.model

data class GameState (val players: Array<Player>, val language: String, val currentQuestion: Question,
    val finishedQuestions: Array<Int>, val startTime: Int){
}