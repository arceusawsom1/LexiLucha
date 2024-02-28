package com.LexiLucha.LexiLucha.model

import com.LexiLucha.LexiLucha.model.dto.SimpleQuestion
import com.LexiLucha.LexiLucha.model.enums.LANGUAGE
import com.LexiLucha.LexiLucha.model.enums.QUESTIONMODE
import com.fasterxml.jackson.annotation.JsonIgnore
import jakarta.persistence.CascadeType
import jakarta.persistence.Entity
import jakarta.persistence.GeneratedValue
import jakarta.persistence.Id
import jakarta.persistence.ManyToOne
import jakarta.persistence.OneToMany
import jakarta.persistence.OneToOne
import java.util.*
import kotlin.collections.ArrayList

@Entity
data class GameState(
    @OneToMany(cascade = [CascadeType.ALL])
    var players: MutableSet<Player> = java.util.HashSet(),
    val language: LANGUAGE = LANGUAGE.SPANISH,  //default language is spanish
    @ManyToOne
    @JsonIgnore var currentQuestion: Question? = null,
    val finishedQuestions: ArrayList<Int> = java.util.ArrayList(),
    var startTime: Long = 0,
    var createdTime: Long = 0,
    var finishedTime: Long = 0,
    var phase: Int = 0,
    @Transient var currentQuestionSimple: SimpleQuestion? = null,
    @GeneratedValue @Id var id: Int = 0,
    val mode: QUESTIONMODE = QUESTIONMODE.SIMPLE
){

    fun sendUpdate() {
        println("Sending update")
        for (player in players.filter{it.active}){
            player.client?.sendEvent("gameUpdate", this)
        }
    }

    fun start() {
        println("Starting Game")
    }
    fun getPlayerBySessionId(sessionID: UUID) : Player{
        return players.find { player -> player.client?.sessionId === sessionID } ?: throw RuntimeException("Invalid session ID");
    }

    fun nextQuestion(question: Question) {
        //if current question exists, add its ID to finished Questions
        currentQuestion?.id?.let { finishedQuestions.add(it) }
        currentQuestion = question
    }

    fun activePlayers() : List<Player>{
        return this.players.filter { it.active }
    }

    override fun toString(): String {
        return "GameState(players=$players, language=$language, currentQuestion=$currentQuestion, finishedQuestions=$finishedQuestions, startTime=$startTime, createdTime=$createdTime, finishedTime=$finishedTime, phase=$phase, currentQuestionSimple=$currentQuestionSimple, id=$id, mode=$mode)"
    }

}