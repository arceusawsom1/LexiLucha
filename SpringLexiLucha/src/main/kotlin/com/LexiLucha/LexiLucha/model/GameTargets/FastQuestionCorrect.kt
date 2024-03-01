package com.LexiLucha.LexiLucha.model.GameTargets

import com.LexiLucha.LexiLucha.model.GameState
import com.LexiLucha.LexiLucha.model.GameTarget

class FastQuestionCorrect : GameTarget {
    final val POINTS_PER = 2
    final val MAX_TIME_THRESHOLD = 2500


    override fun getName(gameState: GameState, playerId: Int): String {
        val currentPlayer = gameState.activePlayers().find {it.id == playerId} ?: throw RuntimeException("The player is not in the activeplayers array")
        val numQuickAnswers = currentPlayer.stat.completions.filter{it.correct}.filter{it.timeTaken<MAX_TIME_THRESHOLD}.count()

        return "You got a question correct very quickly! (x${numQuickAnswers})"
    }

    override fun getPoints(gameState: GameState, playerId : Int): Int {
        val currentPlayer = gameState.activePlayers().find {it.id == playerId} ?: throw RuntimeException("The player is not in the activeplayers array")
        val numQuickAnswers = currentPlayer.stat.completions.filter{it.correct}.filter{it.timeTaken<MAX_TIME_THRESHOLD}.count()

        return numQuickAnswers*POINTS_PER
    }

    override fun isQualified(gameState: GameState, playerId : Int): Boolean {
        val currentPlayer = gameState.activePlayers().find {it.id == playerId} ?: throw RuntimeException("The player is not in the activeplayers array")
        val numQuickAnswers = currentPlayer.stat.completions.filter{it.correct}.filter{it.timeTaken<MAX_TIME_THRESHOLD}.count()

        return numQuickAnswers>0
    }
}