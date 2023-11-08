package com.LexiLucha.LexiLucha.controller

import org.springframework.messaging.handler.annotation.MessageMapping
import org.springframework.stereotype.Controller

@Controller
class SocketController {

    @MessageMapping("something")
    fun test(){
        println("Something pinged")
    }
}