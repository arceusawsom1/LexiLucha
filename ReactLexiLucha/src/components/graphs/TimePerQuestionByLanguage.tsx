import { BarChart } from "@mui/x-charts";
import { ICompletedQuestion, IGamestate, IPlayer } from "../../types"
import { Card, Typography } from "@mui/material";
import { useMemo } from "react";

interface IProps {
    games: Array<IGamestate>
}
const TimePerQuestionByLanguage = (props: IProps) => {
    const { games } = props;

    let allUsedLangauges = useMemo(()=>{
        return [...new Set(games.map((game: IGamestate)=> game.language))]
    },[games])

    let data = useMemo(()=>{
        
        let data : Array<number> = []

        for (let language of allUsedLangauges){
            let times:Array<number> = games
                .filter((game : IGamestate)=>game.language==language)
                .flatMap((game:IGamestate)=>game.players
                    .flatMap((player : IPlayer)=>player.stat.completions
                        .filter((question: ICompletedQuestion)=> question.correct))
                        .flatMap((question: ICompletedQuestion)=> question.timeTaken))

            let sum = times.reduce((total:number, iterator:number)=> total+iterator,0)
            let answer = 0
            if (times.length!=0){
                answer = sum/times.length/1000
            }
            data.push(answer) 
        }
        
        
        return data
    },[games])
    console.log(allUsedLangauges)
    console.log(data)
    return (
        <Card sx={{p:2,m:1,textAlign:"center"}}>
            <Typography variant="h3">Time per Question</Typography>
            <Typography>* Only correct attempts</Typography>
            {data.length>0 && allUsedLangauges.length>0 && 
                <BarChart
                    width={500}
                    height={200}
                    series={[{data}]}
                    xAxis={[{data:allUsedLangauges,scaleType:"band"}]}
                />
            }   
        </Card>
    )
}

export default TimePerQuestionByLanguage