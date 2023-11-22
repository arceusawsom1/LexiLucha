import { BarChart } from "@mui/x-charts";
import { ICompletedQuestion, IGamestate, IPlayer } from "../../types"
import { Card, Typography } from "@mui/material";
import { useMemo } from "react";

interface IProps {
    games: Array<IGamestate>
}
const CombinedGraph = (props: IProps) => {
    const { games } = props;

    let allUsedLangauges = useMemo(()=>{
        return [...new Set(games.map((game: IGamestate)=> game.language))]
    },[games])

    let timeData = useMemo(()=>{
        
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

    let percentageData = useMemo(()=>{
        
        let data : Array<number> = []

        for (let language of allUsedLangauges){
            let AllAttempts:Array<ICompletedQuestion> = games
                .filter((game : IGamestate)=>game.language==language)
                .flatMap((game:IGamestate)=>game.players
                    .flatMap((player : IPlayer)=>player.stat.completions))
            
            let correctAttempts = AllAttempts.filter(attempt=>attempt.correct)

            let answer = 0
            if (AllAttempts.length!=0){
                answer = (correctAttempts.length / AllAttempts.length)*100
            }
            data.push(answer) 
        }
        
        
        return data
    },[games])
    return (
        <Card sx={{p:2,m:1,textAlign:"center"}}>
            <Typography variant="h3">Stats per Language</Typography>
            {percentageData.length>0 && timeData.length>0 && allUsedLangauges.length>0 && 
                <BarChart
                    width={500}
                    height={200}
                    series={[{yAxisKey:"1",data:percentageData,label:"Percentage correct"},{yAxisKey:"2",data:timeData,label:"Average time taken"},]}
                    xAxis={[{data:allUsedLangauges,scaleType:"band"}]}
                    yAxis={[{id:"1",max:100, scaleType: 'linear' },{id:"2", scaleType: 'log' }]}
                    rightAxis={"2"}
                />
            }   
        </Card>
    )
}

export default CombinedGraph