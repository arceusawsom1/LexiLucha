package com.LexiLucha.LexiLucha.model

import com.LexiLucha.LexiLucha.model.shopItems.BackgroundColor
import com.LexiLucha.LexiLucha.model.shopItems.BorderColor
import com.LexiLucha.LexiLucha.model.shopItems.TextColor
import jakarta.persistence.Entity
import jakarta.persistence.GeneratedValue
import jakarta.persistence.Id
import jakarta.persistence.ManyToOne

@Entity
class CustomBoard (
    @GeneratedValue @Id var id : Int = 0,
    @ManyToOne
    var textColor : TextColor = TextColor(id=-1,color="#333333"),
    @ManyToOne
    var borderColor : BorderColor = BorderColor(id=-2,color="#333333"),
    @ManyToOne
    var backgroundColor : BackgroundColor = BackgroundColor(id=-3,color="#ffffff"),
){
    override fun toString(): String {
        return "CustomBoard(id=$id, textColor=$textColor, borderColor=$borderColor, backgroundColor=$backgroundColor)"
    }
}