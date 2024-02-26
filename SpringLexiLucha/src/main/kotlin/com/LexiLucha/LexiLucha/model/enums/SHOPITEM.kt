package com.LexiLucha.LexiLucha.model.enums

enum class SHOPITEM(val value: Int) {
    TEXTCOLOR(1),
    FONTCOLOR(2),
    BACKGROUNDCOLOR(3);


    fun getValue(): Int {
        return value
    }
}