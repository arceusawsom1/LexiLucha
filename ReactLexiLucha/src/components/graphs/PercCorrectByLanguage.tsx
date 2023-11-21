import { BarChart } from "@mui/x-charts";
import { ICompletedQuestion, IGamestate, IPlayer } from "../../types"
import { Card, Typography } from "@mui/material";
import { useMemo } from "react";

interface IProps {
    games: Array<IGamestate>
}
const PercCorrectByLanguage = (props: IProps) => {
    const { games } = props;

    let allUsedLangauges = useMemo(()=>{
        return [...new Set(games.map((game: IGamestate)=> game.language))]
    },[games])

    let data = useMemo(()=>{
        
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
            <Typography variant="h3">% Correct by Language</Typography>
            {data.length>0 && allUsedLangauges.length>0 && 
                <BarChart
                    width={500}
                    height={200}
                    series={[{data}]}
                    xAxis={[{data:allUsedLangauges,scaleType:"band"}]}
                    yAxis={[{max:100}]}
                />
            }   
        </Card>
    )
}

export default PercCorrectByLanguage