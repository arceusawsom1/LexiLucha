package com.LexiLucha.LexiLucha.dal

import com.LexiLucha.LexiLucha.model.Question
import com.LexiLucha.LexiLucha.model.enums.LANGUAGE
import com.LexiLucha.LexiLucha.model.enums.QUESTIONMODE
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query

interface QuestionRepository : JpaRepository<Question, Int> {

    @Query("SELECT q.id FROM Question q WHERE q.language=:language AND q.mode=:mode")
    fun findIdsByLanguageAndMode(language: LANGUAGE, mode: QUESTIONMODE): List<Int>

    @Query("SELECT DISTINCT q.mode FROM Question q WHERE q.language=:language")
    fun findModesByLanguage(language: LANGUAGE): Array<QUESTIONMODE>
}