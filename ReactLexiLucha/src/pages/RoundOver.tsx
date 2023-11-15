import { Button, Typography } from "@mui/material";
import SmallLeaderboard from "../components/SmallLeaderboard";
import { IGamestate } from "../types";

interface IProps {
    gamestate: IGamestate
}
const RoundOver = (props: IProps) => {
    return(
        <>
            <Typography variant="h2">Game over</Typography>
            <SmallLeaderboard players={props.gamestate.players} />
            <Button onClick={()=>window.location.href="/"}>Play Again</Button>
        </>
    )
}

export default RoundOver;