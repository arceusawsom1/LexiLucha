import { Card, List, ListItem, Typography } from "@mui/material";
import { prettyFormat } from "../utils/time";
import { IGamestate } from "../types";
import { useState } from "react";
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
    return (
        <Card sx={{p:1}}>
            <Typography>Language: {game.language}</Typography>
            <Typography>Phase: {game.phase}</Typography>
            <Typography>Number of Questions: {game.finishedQuestions.length} <span onClick={toggleShow}>({showQuestionIds ? "hide" :"show"})</span></Typography>
            {showQuestionIds && 
                <List>
                    {game.finishedQuestions.map(questionId=>
                        <ListItem>{questionId}</ListItem>
                    )}
                </List>
            }
            <Typography>Time since last question: {prettyFormat(currentTime-game.startTime)}</Typography>
            <Typography>Runtime: {prettyFormat(currentTime-game.createdTime)}</Typography>
            <Typography>Players: {game.players.length===0 ? "0":""}</Typography>
            <List>
                {game.players.map(player=>
                    <ListItem>{player.name}</ListItem>
                )}
            </List>
        </Card>
    )
}
export default GameCard;
