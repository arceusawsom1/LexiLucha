package com.LexiLucha.LexiLucha.model

data class CompletedQuestion(val questionId: Int, val timeTaken: Long, val correct: Boolean = true) {
}