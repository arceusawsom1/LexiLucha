package com.LexiLucha.LexiLucha.model

import jakarta.persistence.Entity
import jakarta.persistence.GeneratedValue
import jakarta.persistence.Id

@Entity
data class CompletedQuestion(
    @GeneratedValue @Id var id : Int=0,
    val questionId: Int,
    val timeTaken: Long,
    val correct: Boolean = true) {
}