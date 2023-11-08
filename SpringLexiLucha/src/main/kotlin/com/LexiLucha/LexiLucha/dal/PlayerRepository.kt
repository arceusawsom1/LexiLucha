package com.LexiLucha.LexiLucha.dal

import com.LexiLucha.LexiLucha.model.Player
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface PlayerRepository : JpaRepository<Player, Int>{
}