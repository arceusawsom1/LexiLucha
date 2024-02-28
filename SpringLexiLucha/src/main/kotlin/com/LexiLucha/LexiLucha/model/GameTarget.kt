package com.LexiLucha.LexiLucha.model

interface GameTarget {
    fun getName() : String;
    fun getPoints(gameState: GameState, playerId : Int) : Int;
    fun isQualified(gameState: GameState, playerId: Int): Boolean
}