import { Button, Card, Typography } from "@mui/material";
import SmallLeaderboard from "../components/SmallLeaderboard";
import { ICompletedQuestion, IGamestate } from "../types";
import { socket } from "../utils/socket";
import QuestionReview from "../components/QuestionReview";
import { useState } from "react";

interface IProps {
    gamestate: IGamestate
}
const RoundOver = (props: IProps) => {
    let totalScore:number =0;
    const [seeSolutions, setSeeSolutions] = useState(false)
    const toggleSolutions = () => setSeeSolutions(!seeSolutions)
    const thisPlayer = props.gamestate.players.filter(p=>p.socketId===socket.id)[0]
    totalScore = thisPlayer.targets?.map((t)=>t.points).reduce((item,total)=>total+item,0) || 0
    return(
        <>
            <Typography variant="h2">Game over</Typography>
            <SmallLeaderboard gamestate={props.gamestate} />
            <Button onClick={()=>window.location.href="/"}>Play Again</Button>
            {thisPlayer.type=="REGISTERED" &&
                <>
                <Typography variant="h4">Targets Achieved: </Typography> 
                {thisPlayer.targets && totalScore>0 && thisPlayer.targets.map((target,index)=>
                    <Card key={index} sx={{my:1,backgroundColor:"#d9fdd4"}}>
                        <Typography variant="body1">{target.name}   +{target.points}</Typography>
                    </Card>
                )}
                {thisPlayer.targets && totalScore==0 &&
                    <Typography variant="body1">You didn't complete any targets (try playing a game with another person OR get every question correct)</Typography>
                }
                <Typography variant="body1">Total Points: {totalScore}</Typography>
                </>
            }
            {thisPlayer.type=="GUEST" &&
                <>
                    <Typography variant="h4">No points for you</Typography>
                    <Typography variant="body1">Want to start earning credits to purchase customisations for your leaderboard? register an acount and login!</Typography>
                    <Typography variant="body1">Registering an account also allows you to review the questions from the previous game!</Typography>
                </>
            }
            <Button onClick={toggleSolutions}>{!seeSolutions ? "Show":"Hide"} Solutions</Button>
            {thisPlayer.type=="REGISTERED" && seeSolutions &&
                <>
                    <Typography variant="h5">Question Review!</Typography>
                    {thisPlayer.stat.completions.map((question: ICompletedQuestion)=>
                        <QuestionReview id={question.questionId} correct={question.correct} />
                    )}
                </>
            }



        </>
    )
}

export default RoundOver;