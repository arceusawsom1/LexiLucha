package com.LexiLucha.LexiLucha.model

import jakarta.persistence.Entity
import jakarta.persistence.GeneratedValue
import jakarta.persistence.Id

data class Player (val name: String, val stat:Stat) {

}