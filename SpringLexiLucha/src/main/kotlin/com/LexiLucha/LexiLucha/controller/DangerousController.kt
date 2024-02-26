package com.LexiLucha.LexiLucha.controller

import com.LexiLucha.LexiLucha.dal.QuestionRepository
import com.LexiLucha.LexiLucha.dal.ShopItemRepository
import com.LexiLucha.LexiLucha.model.Question
import com.LexiLucha.LexiLucha.model.ShopItem
import com.LexiLucha.LexiLucha.model.enums.LANGUAGE
import com.LexiLucha.LexiLucha.model.enums.QUESTIONMODE
import com.LexiLucha.LexiLucha.model.shopItems.BackgroundColor
import com.LexiLucha.LexiLucha.model.shopItems.BorderColor
import com.LexiLucha.LexiLucha.model.shopItems.TextColor
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("danger")
class DangerousController @Autowired constructor (val questionRepo: QuestionRepository, val shopItemRepository: ShopItemRepository) {
    @GetMapping("ping")
    fun getAllQuestions() : List<Question>{
        return questionRepo.findAll()
    }
    @GetMapping("loadNewData")
    fun saveQuestions(){
        // Creating some shop items
        val shopItems : ArrayList<ShopItem> = ArrayList()
        shopItems.add(TextColor(title="Default Text Color (Black)", description = "", color="#000000",))
        shopItems.add(BorderColor(title="Default Border Color (Black)", description = "", color="#000000",))
        shopItems.add(BackgroundColor(title="Default Background Color (White)", description = "", color="#ffffff",))
        //TextColor Items
        shopItems.add(TextColor(title="Purple Text Color", description = "An item that allows you to change your leaderboard card test to purple", color="#800080",price=5))
        shopItems.add(TextColor(title="Orange Text Color", description = "An item that allows you to change your leaderboard card test to Orange", color="#FFA500",price=10))
        shopItems.add(TextColor(title="Quartz Text Color", description = "An item that allows you to change your leaderboard card test to quartz", color="#51414F",price=15))
        //BorderColor items
        shopItems.add(BorderColor(title="Teal Border Color", description="An item that allows you to change your leaderboard card border to teal", color="#008080", price=8))
        shopItems.add(BorderColor(title="Magenta Border Color", description="An item that allows you to change your leaderboard card border to magenta", color="#FF00FF", price=12))
        shopItems.add(BorderColor(title="Turquoise Border Color", description="An item that allows you to change your leaderboard card border to turquoise", color="#40E0D0", price=18))
        //BackgroundColor items
        shopItems.add(BackgroundColor(title="Gold Background Color", description="An item that allows you to change your leaderboard card background to gold", color="#FFD700", price=20))
        shopItems.add(BackgroundColor(title="Silver Background Color", description="An item that allows you to change your leaderboard card background to silver", color="#C0C0C0", price=25))
        shopItems.add(BackgroundColor(title="Bronze Background Color", description="An item that allows you to change your leaderboard card background to bronze", color="#CD7F32", price=30))

        shopItemRepository.saveAll(shopItems)
    }
}