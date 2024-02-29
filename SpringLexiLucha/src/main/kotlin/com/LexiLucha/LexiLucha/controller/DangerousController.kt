package com.LexiLucha.LexiLucha.controller

import com.LexiLucha.LexiLucha.dal.QuestionRepository
import com.LexiLucha.LexiLucha.dal.ShopItemRepository
import com.LexiLucha.LexiLucha.dal.UserRepository
import com.LexiLucha.LexiLucha.model.CustomBoard
import com.LexiLucha.LexiLucha.model.Question
import com.LexiLucha.LexiLucha.model.ShopItem
import com.LexiLucha.LexiLucha.model.enums.LANGUAGE
import com.LexiLucha.LexiLucha.model.enums.QUESTIONMODE
import com.LexiLucha.LexiLucha.model.shopItems.BackgroundColor
import com.LexiLucha.LexiLucha.model.shopItems.BackgroundImage
import com.LexiLucha.LexiLucha.model.shopItems.BorderColor
import com.LexiLucha.LexiLucha.model.shopItems.TextColor
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("danger")
class DangerousController @Autowired constructor (val userRepository: UserRepository,val questionRepo: QuestionRepository, val shopItemRepository: ShopItemRepository) {
    @GetMapping("ping")
    fun getAllQuestions() : List<Question>{
        return questionRepo.findAll()
    }
    @GetMapping("newBoards")
    fun giveUsersCustoms(){
        val users = userRepository.findAll()
        users.forEach { it.custom= CustomBoard() }
        userRepository.saveAll(users)
    }
    @GetMapping("loadNewData")
    fun saveQuestions(){
        // Creating some shop items
        val shopItems : ArrayList<ShopItem> =  ArrayList<ShopItem>()
        //BackgroundImage items
        shopItems.add(BackgroundImage(id=0,title="Carbon Background Image",description="An Item that allows you to look cool on the leaderboard", url="boardBackgrounds/carbon.jpg",price=50))
        shopItems.add(BackgroundImage(id=0,title="lines Background Image",description="An Item that allows you to look cool on the leaderboard", url="boardBackgrounds/lines.gif",price=100))
        shopItems.add(BackgroundImage(id=0,title="waves Background Image",description="An Item that allows you to look cool on the leaderboard", url="boardBackgrounds/waves.gif",price=250))

        shopItemRepository.saveAll(shopItems)
    }
}