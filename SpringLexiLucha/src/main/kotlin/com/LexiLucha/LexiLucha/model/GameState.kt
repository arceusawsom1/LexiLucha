package com.LexiLucha.LexiLucha.model

data class GameState(
        val players: ArrayList<Player> = ArrayList(),
        val language: String = "Spanish",
        val currentQuestion: Question? = null,
        val finishedQuestions: ArrayList<Int> = ArrayList(),
        val startTime: Int = 0){
    fun sendUpdate() {
        println("Sending update")
        println(this)
        for (player in players){
            player.client.sendEvent("gameUpdate", this)
        }
    }

    fun start() {
        println("Starting Game")
    }

}