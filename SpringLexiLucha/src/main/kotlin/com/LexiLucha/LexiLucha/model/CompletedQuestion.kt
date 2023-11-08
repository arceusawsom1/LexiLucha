package com.LexiLucha.LexiLucha.model

data class CompletedQuestion(val questionId: Int, val timeTaken: Int, val correct: Boolean = true) {
}