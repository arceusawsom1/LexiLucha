package com.LexiLucha.LexiLucha.model.dto

import com.LexiLucha.LexiLucha.model.enums.LANGUAGE

data class JoinQueueMessage (val name: String="", val bearer: String="", val language: LANGUAGE=LANGUAGE.SPANISH) {
}