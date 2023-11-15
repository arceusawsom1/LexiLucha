package com.LexiLucha.LexiLucha.model.dto

import com.LexiLucha.LexiLucha.model.Question

data class SimpleQuestion(val id: Int, val phrase: String, val options: String){
    constructor(question: Question) : this(question.id, question.phrase, question.answer + " " + question.noiseWords)
}
