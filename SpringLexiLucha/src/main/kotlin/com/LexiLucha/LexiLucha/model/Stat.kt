package com.LexiLucha.LexiLucha.model

import jakarta.persistence.CascadeType
import jakarta.persistence.Entity
import jakarta.persistence.GeneratedValue
import jakarta.persistence.Id
import jakarta.persistence.OneToMany

@Entity
data class Stat(
    @GeneratedValue @Id val id : Int=0,
    var score: Int = 0,
    @OneToMany(cascade = [CascadeType.ALL])
    val completions: MutableSet<CompletedQuestion> = HashSet()) {
}