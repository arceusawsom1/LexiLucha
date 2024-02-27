package com.LexiLucha.LexiLucha.model

import com.LexiLucha.LexiLucha.model.enums.PLAYERTYPE
import com.corundumstudio.socketio.SocketIOClient
import com.fasterxml.jackson.annotation.JsonIgnore
import com.fasterxml.jackson.annotation.JsonIgnoreProperties
import jakarta.persistence.CascadeType
import jakarta.persistence.Entity
import jakarta.persistence.GeneratedValue
import jakarta.persistence.Id
import jakarta.persistence.ManyToOne
import jakarta.persistence.OneToMany
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
    var active : Boolean = true,
    @ManyToOne
    var custom : CustomBoard = CustomBoard(id=-1),
    var type : PLAYERTYPE = PLAYERTYPE.GUEST) {
    override fun equals(other: Any?): Boolean {
        if (this === other) return true
        if (javaClass != other?.javaClass) return false

        other as Player

        if (id != other.id) return false
        if (name != other.name) return false
        if (client != other.client) return false
        if (ready != other.ready) return false
        if (active != other.active) return false

        return true
    }

    override fun hashCode(): Int {
        var result = id
        result = 31 * result + name.hashCode()
        result = 31 * result + ready.hashCode()
        result = 31 * result + active.hashCode()
        return result
    }

    override fun toString(): String {
        return "Player(id=$id, name='$name', stat=$stat, client=$client, ready=$ready, active=$active, custom=$custom, type=$type)"
    }
}