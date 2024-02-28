package com.LexiLucha.LexiLucha.model.GameTargets

import com.LexiLucha.LexiLucha.model.GameState
import com.LexiLucha.LexiLucha.model.GameTarget
import com.LexiLucha.LexiLucha.model.Player

class TopOfLeaderboard : GameTarget {
    final val POINTS = 3

    override fun getName(): String {
        return "You came first!"
    }

    override fun getPoints(gameState: GameState, playerId : Int): Int {
        return POINTS
    }

    override fun isQualified(gameState: GameState, playerId : Int): Boolean {
        if (gameState.players.size<=1)
            return false
        val currentPlayer : Player = gameState.activePlayers().find { it.id==playerId } ?: throw RuntimeException("Cant find player")
        val currentScore : Int = currentPlayer.stat.completions.count { it.correct }
        val allScores : MutableList<Int> = gameState.activePlayers().map { it.stat. completions.count{it.correct}}.toMutableList()
        allScores.remove(currentScore)
        return currentScore > allScores.max() //Ties do not count
    }
}