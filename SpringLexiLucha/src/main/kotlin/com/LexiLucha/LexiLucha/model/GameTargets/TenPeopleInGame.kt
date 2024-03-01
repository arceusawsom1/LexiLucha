package com.LexiLucha.LexiLucha.model.GameTargets

import com.LexiLucha.LexiLucha.model.GameState
import com.LexiLucha.LexiLucha.model.GameTarget

class TenPeopleInGame : GameTarget {
    final val POINTS = 3

    override fun getName(gameState: GameState, playerId: Int): String {
        return "You were in a large game(10 people!)"
    }

    override fun getPoints(gameState: GameState, playerId : Int): Int {
        return POINTS
    }

    override fun isQualified(gameState: GameState, playerId : Int): Boolean {
        return gameState.activePlayers().size>=10
    }
}