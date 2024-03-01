package com.LexiLucha.LexiLucha.model.GameTargets

import com.LexiLucha.LexiLucha.model.GameState
import com.LexiLucha.LexiLucha.model.GameTarget
import com.LexiLucha.LexiLucha.model.Player

class PlaceHighInBigLeaderboard : GameTarget {
    final val POINTS = 3

    override fun getName(gameState: GameState, playerId: Int): String {
        return "placed highly in a large game (10 players or more)!"
    }

    override fun getPoints(gameState: GameState, playerId : Int): Int {
        return POINTS
    }

    override fun isQualified(gameState: GameState, playerId : Int): Boolean {
        if (gameState.players.size<10)
            return false
        val currentPlayer : Player = gameState.activePlayers().find { it.id==playerId } ?: throw RuntimeException("Cant find player")
        println("Calculating top of leaderboard")
        val currentScore : Int = currentPlayer.stat.score
        val allScores : MutableList<Int> = gameState.activePlayers().map { it.stat.score}.toMutableList()
        allScores.remove(allScores.max())
        allScores.remove(allScores.max())
        allScores.remove(allScores.max())

        println("end of Calculating top of leaderboard")
        return currentScore > allScores.max() //Ties do not count

    }
}