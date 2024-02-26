package com.LexiLucha.LexiLucha.controller

import com.LexiLucha.LexiLucha.dal.GameArchive
import com.LexiLucha.LexiLucha.dal.GameRepository
import com.LexiLucha.LexiLucha.dal.QuestionRepository
import com.LexiLucha.LexiLucha.dal.ShopItemRepository
import com.LexiLucha.LexiLucha.model.CustomBoard
import com.LexiLucha.LexiLucha.model.GameState
import com.LexiLucha.LexiLucha.model.ShopItem
import com.LexiLucha.LexiLucha.model.User
import com.LexiLucha.LexiLucha.model.enums.LANGUAGE
import com.LexiLucha.LexiLucha.model.shopItems.BackgroundColor
import com.LexiLucha.LexiLucha.model.shopItems.BorderColor
import com.LexiLucha.LexiLucha.model.shopItems.TextColor
import com.LexiLucha.LexiLucha.service.UserService
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.security.core.Authentication
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("items")
class ShopItemController @Autowired(required = true) constructor(
    private val gameRepo: GameRepository,
    private val gameArchive: GameArchive,
    private val shopItemRepo: ShopItemRepository,
    val userService: UserService
){
    @GetMapping("/me")
    fun getMyCustom(auth:Authentication) : User {
        val user : User = userService.findByUsername(auth.name)
        return user;
    }
    @GetMapping("/textColors")
    fun getTextColors() : MutableList<TextColor> {
        return shopItemRepo.findAllTextColors();
    }
    @GetMapping("/textColors/me")
    fun getMyTextColors(auth:Authentication) : MutableList<ShopItem> {
        return shopItemRepo.findMyItemsOfType(auth.name,  TextColor::class.java);
    }
    @PutMapping("/textColors/me/choose/{id}")
    fun chooseTextColor(auth:Authentication, @PathVariable id : Int) {
        val user : User = userService.findByUsername(auth.name)
        val item : TextColor = shopItemRepo.findTextColorById(id)
        user.custom.textColor= item;
        userService.save(user);
    }
    @GetMapping("/borderColors")
    fun getBorderColors() : MutableList<BorderColor> {
        return shopItemRepo.findAllBorderColors();
    }
    @GetMapping("/borderColors/me")
    fun getMyBorderColors(auth:Authentication) : MutableList<ShopItem> {
        println("Name: " + auth.name + "(border colors)")
        return shopItemRepo.findMyItemsOfType(auth.name,  BorderColor::class.java);
    }
    @PutMapping("/borderColors/me/choose/{id}")
    fun chooseBorderColor(auth:Authentication, @PathVariable id : Int) {
        val user : User = userService.findByUsername(auth.name)
        val item : BorderColor = shopItemRepo.findBorderColorById(id)
        user.custom.borderColor= item;
        userService.save(user);
    }
    @GetMapping("/backgroundColors")
    fun getBackgroundColors() : MutableList<BackgroundColor> {
        return shopItemRepo.findAllBackgroundColors()
    }
    @GetMapping("/backgroundColors/me")
    fun getMyBackgroundColors(auth:Authentication) : MutableList<ShopItem> {
        return shopItemRepo.findMyItemsOfType(auth.name,  BackgroundColor::class.java);
    }
    @PutMapping("/backgroundColors/me/choose/{id}")
    fun chooseBackgroundColor(auth:Authentication, @PathVariable id : Int) {
        val user : User = userService.findByUsername(auth.name)
        val item : BackgroundColor = shopItemRepo.findBackgroundColorById(id)
        user.custom.backgroundColor= item;
        userService.save(user);
    }
    @GetMapping("/buy/{itemId}")
    fun buyItem(auth:Authentication, @PathVariable itemId : Int){
        println("The buy endpoint was clicked")
        val user : User = userService.findByUsername(auth.name)
        val item : ShopItem = shopItemRepo.findById(itemId).orElse(ShopItem())
        println(user)
        println(item)
        if (user.money >= item.price){
            println("Purchasing?")
            user.money -= item.price
            user.items.add(item)
            userService.save(user)
        }else
            println("Could not purchase (not enouph money)")
    }
}