package com.LexiLucha.LexiLucha.service

import com.LexiLucha.LexiLucha.dal.GameArchive
import com.LexiLucha.LexiLucha.dal.GameRepository
import com.LexiLucha.LexiLucha.dal.QuestionRepository
import com.LexiLucha.LexiLucha.model.GameState
import com.LexiLucha.LexiLucha.model.Player
import com.corundumstudio.socketio.SocketIOClient
import org.junit.jupiter.api.Assertions
import org.junit.jupiter.api.Test
import io.mockk.mockk
import org.junit.jupiter.api.BeforeEach
import org.springframework.security.oauth2.jwt.JwtDecoder
import java.util.*


class SocketServiceTest {

    private val clientMock = mockk<SocketIOClient>(relaxed = true)
    private val mockGameRepo = mockk<GameRepository>(relaxed = true)
    private val mockQuestionRepository = mockk<QuestionRepository>(relaxed = true)
    private val mockGameArchive = mockk<GameArchive>(relaxed = true)
    private val mockDecoder = mockk<JwtDecoder>(relaxed = true)

    private lateinit var socketService :SocketService

    @BeforeEach
    fun setup(){
        socketService = SocketService(mockGameRepo,mockQuestionRepository,mockGameArchive, mockDecoder)
    }

    @Test
    fun simpleTest(){
        // ARRANGE
        socketService.games = ArrayList<GameState>()
        val dummyGame = GameState()
        dummyGame.players.add(Player(client=clientMock))

        // ACT
        socketService.handleDisconnect(clientMock)

        // ASSERT
        assert(dummyGam)
    }
}