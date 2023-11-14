package com.LexiLucha.LexiLucha.dal

import com.LexiLucha.LexiLucha.model.Question
import com.LexiLucha.LexiLucha.model.enums.LANGUAGE
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query

interface QuestionRepository : JpaRepository<Question, Int> {

    @Query("SELECT q.id FROM Question q WHERE q.language=:language")
    fun findIdsByLanguage(language: LANGUAGE): List<Int>
}