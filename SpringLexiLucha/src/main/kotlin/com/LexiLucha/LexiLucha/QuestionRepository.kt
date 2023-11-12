package com.LexiLucha.LexiLucha

import com.LexiLucha.LexiLucha.model.Question
import org.springframework.data.jpa.repository.JpaRepository

interface QuestionRepository : JpaRepository<Question, Int> {

}