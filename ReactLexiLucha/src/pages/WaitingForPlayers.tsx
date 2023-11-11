import { CircularProgress, List, ListItem, Typography } from "@mui/material"
import { IGamestate, IPlayer } from "../types"

interface IProps{
    gamestate: IGamestate
}
const WaitingForPlayers = ({gamestate} : IProps) => {
    return(
        <>
            <Typography variant="h2">Waiting for players</Typography>
            <CircularProgress/>
            <Typography variant="h3">Current Players: </Typography>
            <List>
                {gamestate.players.map((player:IPlayer, playerIndex: number)=>
                    <ListItem key={playerIndex}>
                        {player.name}
                    </ListItem>
                )}
            </List>

        </>
    )
}
export default WaitingForPlayers