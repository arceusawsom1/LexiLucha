package com.LexiLucha.LexiLucha.model

import com.corundumstudio.socketio.SocketIOClient
import com.fasterxml.jackson.annotation.JsonIgnore
import jakarta.persistence.Entity
import jakarta.persistence.GeneratedValue
import jakarta.persistence.Id

data class Player (val name: String = "", val stat:Stat? = null, @JsonIgnore var client : SocketIOClient) {

}