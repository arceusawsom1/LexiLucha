package com.LexiLucha.LexiLucha.dal

import com.LexiLucha.LexiLucha.model.Question
import com.LexiLucha.LexiLucha.model.ShopItem
import com.LexiLucha.LexiLucha.model.enums.LANGUAGE
import com.LexiLucha.LexiLucha.model.enums.QUESTIONMODE
import com.LexiLucha.LexiLucha.model.shopItems.BackgroundColor
import com.LexiLucha.LexiLucha.model.shopItems.BackgroundImage
import com.LexiLucha.LexiLucha.model.shopItems.BorderColor
import com.LexiLucha.LexiLucha.model.shopItems.TextColor
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query
import org.springframework.javapoet.ClassName
import org.springframework.stereotype.Repository
import kotlin.reflect.KClass

@Repository
interface ShopItemRepository : JpaRepository<ShopItem, Int> {

    @Query("SELECT i FROM User u JOIN u.items i WHERE u.username = :name AND type(i) LIKE :className")
    abstract fun findMyItemsOfType(name: String, className : Class<*>): MutableList<ShopItem>

    @Query("SELECT t FROM TextColor t WHERE t.id = :id")
    abstract fun findTextColorById(id: Int): TextColor

    @Query("SELECT t FROM TextColor t")
    abstract fun findAllTextColors(): MutableList<TextColor>

    @Query("SELECT t FROM BorderColor t WHERE t.id = :id")
    abstract fun findBorderColorById(id: Int): BorderColor

    @Query("SELECT t FROM BorderColor t")
    abstract fun findAllBorderColors(): MutableList<BorderColor>

    @Query("SELECT t FROM BackgroundColor t WHERE t.id = :id")
    abstract fun findBackgroundColorById(id: Int): BackgroundColor

    @Query("SELECT t FROM BackgroundColor t")
    abstract fun findAllBackgroundColors(): MutableList<BackgroundColor>
    @Query("SELECT t FROM BackgroundImage t")
    abstract fun findAllBackgroundImages(): MutableList<BackgroundImage>
    @Query("SELECT t FROM BackgroundImage t WHERE t.id = :id")
    abstract fun findBackgroundImagesById(id: Int): BackgroundImage

}