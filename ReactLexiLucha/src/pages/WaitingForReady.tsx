import { Button, List, ListItem, Typography } from "@mui/material"
import { IGamestate, IPlayer } from "../types"
import { socket } from "../utils/socket"

interface IProps{
    gamestate: IGamestate
}
const WaitingForReady = ({gamestate} : IProps) => {

    const onReady = () => {
        socket.emit("ready")
    }

    return(
        <>
            <Typography variant="h2">Waiting for players to ready up</Typography>
            <Button onClick={onReady}>Ready Up</Button>
            <Typography variant="h3">Current Players: </Typography>
            <List>
                {gamestate.players.map((player:IPlayer, playerIndex: number)=>
                    <ListItem key={playerIndex}>
                        {player.name}:{player.ready ? "Ready": "Not Ready"}
                    </ListItem>
                )}
            </List>

        </>
    )
}
export default WaitingForReady