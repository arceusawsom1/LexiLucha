package com.LexiLucha.LexiLucha.model

import com.LexiLucha.LexiLucha.model.dto.SimpleQuestion
import com.LexiLucha.LexiLucha.model.enums.LANGUAGE
import com.fasterxml.jackson.annotation.JsonIgnore
import java.util.*
import kotlin.collections.ArrayList

data class GameState(
        val players: ArrayList<Player> = ArrayList(),
        val language: LANGUAGE = LANGUAGE.SPANISH,  //default language is spanish
        @JsonIgnore var currentQuestion: Question? = null,
        val finishedQuestions: ArrayList<Int> = ArrayList(),
        var startTime: Long = 0,
        var phase: Int = 0,
        var currentQuestionSimple : SimpleQuestion?= null){
    fun sendUpdate() {
        println("Sending update")
        for (player in players){
            player.client.sendEvent("gameUpdate", this)
        }
    }

    fun start() {
        println("Starting Game")
    }
    fun getPlayerBySessionId(sessionID: UUID) : Player{
        return players.find { player -> player.client.sessionId === sessionID } ?: throw RuntimeException("Invalid session ID");
    }

    fun nextQuestion(question: Question) {
        //if current question exists, add its ID to finished Questions
        currentQuestion?.id?.let { finishedQuestions.add(it) }
        currentQuestion = question
    }

}