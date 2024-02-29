package com.LexiLucha.LexiLucha.model

import com.LexiLucha.LexiLucha.model.enums.ROLE
import jakarta.persistence.CascadeType
import jakarta.persistence.Entity
import jakarta.persistence.GeneratedValue
import jakarta.persistence.Id
import jakarta.persistence.ManyToMany
import jakarta.persistence.OneToMany
import jakarta.persistence.OneToOne

@Entity
data class User (
    @GeneratedValue @Id val id: Int=0,
    var username: String = "",
    var password: String,
    val role: ArrayList<ROLE> = arrayListOf(ROLE.USER),
    var money : Int = 0,
    @ManyToMany
    val items : MutableSet<ShopItem> = mutableSetOf(ShopItem(id=-1), ShopItem(id=-2),ShopItem(id=-3),ShopItem(-4)),
    @OneToOne(cascade = arrayOf(CascadeType.ALL))
    var custom: CustomBoard = CustomBoard()
){

}