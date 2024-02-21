package com.LexiLucha.LexiLucha.model.dto

import com.LexiLucha.LexiLucha.model.enums.LANGUAGE
import com.LexiLucha.LexiLucha.model.enums.QUESTIONMODE

data class JoinQueueMessage (val name: String="", val bearer: String="", val language: LANGUAGE=LANGUAGE.SPANISH, val mode:QUESTIONMODE = QUESTIONMODE.SIMPLE) {
}