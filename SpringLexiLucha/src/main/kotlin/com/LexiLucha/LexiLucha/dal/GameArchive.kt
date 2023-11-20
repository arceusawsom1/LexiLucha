package com.LexiLucha.LexiLucha.dal

import com.LexiLucha.LexiLucha.model.GameState
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface GameArchive : JpaRepository<GameState, Int> {
}