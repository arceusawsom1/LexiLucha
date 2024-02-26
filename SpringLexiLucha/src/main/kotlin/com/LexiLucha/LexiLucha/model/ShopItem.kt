package com.LexiLucha.LexiLucha.model

import jakarta.persistence.*

@Entity
@Inheritance(strategy = InheritanceType.JOINED)
open class ShopItem (
    @GeneratedValue @Id val id: Int=0,
    val title: String = "",
    val description : String = "",
    val price : Int = 0,
) {
    override fun toString(): String {
        return "SHOPITEM [ID: $id, title:$title]"
    }
}