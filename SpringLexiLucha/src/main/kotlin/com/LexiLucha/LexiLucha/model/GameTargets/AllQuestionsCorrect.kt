package com.LexiLucha.LexiLucha.model.GameTargets

import com.LexiLucha.LexiLucha.model.GameState
import com.LexiLucha.LexiLucha.model.GameTarget

class AllQuestionsCorrect : GameTarget {
    final val POINTS = 5

    override fun getName(gameState: GameState, playerId: Int): String {
        return "You got every question correct!"
    }

    override fun getPoints(gameState: GameState, playerId : Int): Int {
        return POINTS
    }

    override fun isQualified(gameState: GameState, playerId : Int): Boolean {
        val currentPlayer = gameState.activePlayers().find {it.id == playerId} ?: throw RuntimeException("The player is not in the activeplayers array")
        val incorrectAnswers:Int = currentPlayer.stat.completions.count{!it.correct}

        return incorrectAnswers==0
    }
}