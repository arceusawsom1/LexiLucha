package com.LexiLucha.LexiLucha.model

import com.LexiLucha.LexiLucha.model.enums.ROLE
import jakarta.persistence.Entity
import jakarta.persistence.GeneratedValue
import jakarta.persistence.Id

@Entity
data class User (
    @GeneratedValue @Id val id: Int=0,
    var username: String = "",
    var password: String,
    val role: ArrayList<ROLE> = arrayListOf(ROLE.USER)
){

}