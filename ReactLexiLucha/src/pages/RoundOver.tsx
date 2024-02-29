import { Button, Card, Typography } from "@mui/material";
import SmallLeaderboard from "../components/SmallLeaderboard";
import { IGamestate } from "../types";
import { socket } from "../utils/socket";

interface IProps {
    gamestate: IGamestate
}
const RoundOver = (props: IProps) => {
    let totalScore:number =0;
    console.log(socket.id)
    console.log(props.gamestate.players)
    const thisPlayer = props.gamestate.players.filter(p=>p.socketId===socket.id)[0]
    totalScore = thisPlayer.targets?.map((t)=>t.points).reduce((item,total)=>total+item,0) || 0
    return(
        <>
            <Typography variant="h2">Game over</Typography>
            <SmallLeaderboard gamestate={props.gamestate} />
            <Button onClick={()=>window.location.href="/"}>Play Again</Button>
            {thisPlayer.socketId!=null &&
                <>
                <Typography variant="h4">Targets Achieved: </Typography> 
                {thisPlayer.targets && thisPlayer.targets.map((target,index)=>
                    <Card key={index} sx={{my:1,backgroundColor:"#d9fdd4"}}>
                        <Typography variant="body1">{target.name}   +{target.points}</Typography>
                    </Card>
                )}
                <Typography variant="body1">Total Points: {totalScore}</Typography>
                </>
            }


        </>
    )
}

export default RoundOver;