package com.LexiLucha.LexiLucha.controller

import com.LexiLucha.LexiLucha.dal.QuestionRepository
import com.LexiLucha.LexiLucha.model.enums.LANGUAGE
import com.LexiLucha.LexiLucha.model.enums.QUESTIONMODE
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.CrossOrigin
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import java.util.*

@RestController
@RequestMapping("language")
class LanguageController @Autowired constructor(private final val questionRepo: QuestionRepository){

    @GetMapping
    fun testEndpoint() : Array<LANGUAGE>{
        return LANGUAGE.values();
    }

    @GetMapping("{language}/modes")
    fun getModesByLanguage(@PathVariable language : LANGUAGE) : Array<QUESTIONMODE> {
//        return listOf(QUESTIONMODE.SIMPLE)
        return questionRepo.findModesByLanguage(language)
    }

}