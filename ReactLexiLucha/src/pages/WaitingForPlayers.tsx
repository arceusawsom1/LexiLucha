import { CircularProgress, List, ListItem, Typography } from "@mui/material"
import { IGamestate, IPlayer } from "../types"
import { getDisplayname } from "../utils/player"

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
                        {getDisplayname(player)}
                    </ListItem>
                )}
            </List>
            <Typography variant="body1">Language: {gamestate.language}</Typography>

        </>
    )
}
export default WaitingForPlayers