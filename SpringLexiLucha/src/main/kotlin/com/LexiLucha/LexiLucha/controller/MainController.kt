package com.LexiLucha.LexiLucha.controller

import com.LexiLucha.LexiLucha.dal.QuestionRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("ping")
class MainController {

    private var questionRepo : QuestionRepository? = null

    @Autowired
    fun setQuestionRepo(questionRepo : QuestionRepository){
        this.questionRepo = questionRepo;
    }

    @GetMapping
    fun testEndpoint() : String{
        return "pong"
    }

    @GetMapping("dbcheck")
    fun getEndpoint(): String{
        questionRepo ?: return "DB not connected"
        return "DB_Check: Num questions: ${questionRepo?.count()}"
    }
}