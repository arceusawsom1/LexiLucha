import { Card, List, ListItem, Typography } from "@mui/material";
import { prettyFormat } from "../utils/time";
import { IGamestate } from "../types";
import { useState } from "react";
import { prettyDate } from "../utils/date";
interface IProps {
    game: IGamestate
}
export const GameCard = (props: IProps) => {
    const {game} = props
    const [showQuestionIds, setShowQuestionIds] = useState<Boolean>(false)
    const toggleShow = () => {
        setShowQuestionIds(!showQuestionIds)
    }
    const currentTime = Date.now()
    const runtime = prettyFormat(game.finishedTime==0 ? currentTime-game.createdTime : game.finishedTime - game.createdTime)   
    console.log(game.finishedTime)
    return (
        <Card sx={{p:1}}>
            <Typography>Language: {game.language}</Typography>
            <Typography>Phase: {game.phase}</Typography>
            <Typography>Number of Questions: {game.finishedQuestions.length} <span onClick={toggleShow}>({showQuestionIds ? "hide" :"show"})</span></Typography>
            {showQuestionIds && 
                <List>
                    {game.finishedQuestions.map(questionId=>
                        <ListItem key={questionId}>{questionId}</ListItem>
                    )}
                </List>
            }
            {game.finishedTime==0 &&<Typography>Time since last question: {prettyFormat(currentTime-game.startTime)}</Typography>}
            {game.finishedTime!=0 && <Typography>Date: {prettyDate(game.startTime)}</Typography>}
            <Typography>Runtime: {runtime}</Typography>
            <Typography>Players: {game.players.length===0 ? "0":""}</Typography>
            <List>
                {game.players.map((player, playerIndex)=>
                    <ListItem key={playerIndex} sx={{textDecoration: (player.active ? "none" : "line-through")}}>{player.name}:{player.stat.score}</ListItem>
                )}
            </List>
        </Card>
    )
}
export default GameCard;
