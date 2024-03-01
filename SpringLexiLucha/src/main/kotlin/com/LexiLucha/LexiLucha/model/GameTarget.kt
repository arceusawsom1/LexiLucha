package com.LexiLucha.LexiLucha.model

interface GameTarget {
    fun getName(gameState: GameState, playerId: Int): String;
    fun getPoints(gameState: GameState, playerId : Int) : Int;
    fun isQualified(gameState: GameState, playerId: Int): Boolean
}