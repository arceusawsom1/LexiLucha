package com.LexiLucha.LexiLucha.model

import jakarta.persistence.Entity
import jakarta.persistence.GeneratedValue
import jakarta.persistence.Id

@Entity
data class Question(val phrase:String, val answer: String, val noiseWords:String="") {
    @Id
    @GeneratedValue
    val id: Int = 0
}