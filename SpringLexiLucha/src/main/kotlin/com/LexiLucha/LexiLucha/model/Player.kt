package com.LexiLucha.LexiLucha.model

import com.corundumstudio.socketio.SocketIOClient
import com.fasterxml.jackson.annotation.JsonIgnore
import com.fasterxml.jackson.annotation.JsonIgnoreProperties
import jakarta.persistence.CascadeType
import jakarta.persistence.Entity
import jakarta.persistence.GeneratedValue
import jakarta.persistence.Id
import jakarta.persistence.OneToOne
import org.hibernate.annotations.Cascade
import javax.annotation.processing.Generated
@JsonIgnoreProperties(value = [ "client" ])

@Entity
data class Player (
    @GeneratedValue @Id val id: Int=0,
    val name: String = "",
    @OneToOne(cascade = [CascadeType.ALL])
    val stat:Stat = Stat(),
    @Transient var client : SocketIOClient,
    var ready : Boolean = false,
    var active : Boolean = true) {

}