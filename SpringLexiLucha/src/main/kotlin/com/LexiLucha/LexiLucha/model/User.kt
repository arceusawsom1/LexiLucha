package com.LexiLucha.LexiLucha.model

import com.LexiLucha.LexiLucha.model.enums.ROLE
import jakarta.persistence.CascadeType
import jakarta.persistence.Entity
import jakarta.persistence.GeneratedValue
import jakarta.persistence.Id
import jakarta.persistence.OneToMany
import jakarta.persistence.OneToOne

@Entity
data class User (
    @GeneratedValue @Id val id: Int=0,
    var username: String = "",
    var password: String,
    val role: ArrayList<ROLE> = arrayListOf(ROLE.USER),
    var money : Int = 0,
    @OneToMany
    val items : MutableSet<ShopItem> = java.util.HashSet(),
    @OneToOne(cascade = arrayOf(CascadeType.ALL))
    var custom: CustomBoard = CustomBoard()
){

}