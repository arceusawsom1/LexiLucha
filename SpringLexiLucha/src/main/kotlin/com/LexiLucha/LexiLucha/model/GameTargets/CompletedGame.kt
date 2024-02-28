package com.LexiLucha.LexiLucha.model.GameTargets

import com.LexiLucha.LexiLucha.model.GameState
import com.LexiLucha.LexiLucha.model.GameTarget

class CompletedGame : GameTarget {
    final val POINTS = 1

    override fun getName(): String {
        return "You finished an online game"
    }

    override fun getPoints(gameState: GameState, playerId : Int): Int {
        return POINTS
    }

    override fun isQualified(gameState: GameState, playerId : Int): Boolean {
        return gameState.activePlayers().size>1
    }
}