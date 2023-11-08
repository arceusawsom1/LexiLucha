package com.LexiLucha.LexiLucha.model

import jakarta.persistence.Entity
import jakarta.persistence.GeneratedValue
import jakarta.persistence.Id

@Entity
data class Player (val name: String) {
    @Id
    @GeneratedValue
    val id: Int = 0
}