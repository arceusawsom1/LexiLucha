package com.LexiLucha.LexiLucha

import com.LexiLucha.LexiLucha.controller.MainController
import com.LexiLucha.LexiLucha.dal.PlayerRepository
import com.LexiLucha.LexiLucha.model.Player
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.ApplicationArguments
import org.springframework.boot.ApplicationRunner
import org.springframework.stereotype.Service

@Service
class Dataloader @Autowired constructor(
    private val playerRepository : PlayerRepository,
        private val mainController: MainController
): ApplicationRunner {
    override fun run(args: ApplicationArguments?) {
        playerRepository.save(Player("Ryan"));
    }
}