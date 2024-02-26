package com.LexiLucha.LexiLucha.model.shopItems

import com.LexiLucha.LexiLucha.model.ShopItem
import jakarta.persistence.Entity

@Entity
class BorderColor (val color : String, title: String = "", description : String = "", price : Int = 0,id:Int=2) : ShopItem(id=id,title=title, description = description, price = price) {
}