package com.LexiLucha.LexiLucha.model

import com.LexiLucha.LexiLucha.model.enums.LANGUAGE
import jakarta.persistence.Entity
import jakarta.persistence.GeneratedValue
import jakarta.persistence.Id

@Entity
data class Question(val phrase:String, var answer: String, var noiseWords:String="", val language: LANGUAGE = LANGUAGE.SPANISH) {
    @Id
    @GeneratedValue
    val id: Int = 0
}