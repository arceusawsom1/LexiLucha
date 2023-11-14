package com.LexiLucha.LexiLucha.controller

import com.LexiLucha.LexiLucha.dal.QuestionRepository
import com.LexiLucha.LexiLucha.model.enums.LANGUAGE
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.CrossOrigin
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("language")
class LanguageController {

    @GetMapping
    @CrossOrigin(origins = ["http://localhost:5173", "https://lexilucha.theduggan.online"])
    fun testEndpoint() : Array<LANGUAGE>{
        return LANGUAGE.values()
    }
}