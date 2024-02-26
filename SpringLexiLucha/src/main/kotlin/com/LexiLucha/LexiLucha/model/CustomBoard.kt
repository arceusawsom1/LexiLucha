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
    var textColor : TextColor = TextColor(color="#333333"),
    @ManyToOne
    var borderColor : BorderColor = BorderColor(color="#333333"),
    @ManyToOne
    var backgroundColor : BackgroundColor = BackgroundColor(color="#ffffff"),
){
}