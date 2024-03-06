import { BarChart } from "@mui/x-charts";
import { IGamestate } from "../../types"
import { Card, Typography } from "@mui/material";
import { useMemo } from "react";
import { prettyDate } from "../../utils/date";

interface IProps {
    games: Array<IGamestate>
}
const GamesPerDay = (props: IProps) => {
    const { games } = props;

    let [data, labels] = useMemo(()=>{
        let labels : Array<string>= []
        let currentDay = new Date()
        while (currentDay.getTime() > new Date(new Date().setDate(new Date().getDate()-14)).getTime()){
            labels.push(prettyDate(currentDay.getTime()))
            currentDay.setDate(currentDay.getDate()-1)
        }
        let data : Array<number> = []
        for (let date of labels) {
            data.push(games.filter(game=>prettyDate(game.createdTime)==date).length)
        }
        
        return [data.reverse(), labels.reverse()]
    },[games])

    return (
        <Card sx={{p:2,m:1,textAlign:"center"}}>
            <Typography variant="h3">Number of games per day</Typography>
            <BarChart
                width={500}
                height={200}
                series={[{data}]}
                xAxis={[{data:labels,scaleType:"band"}]}
            />
        </Card>
    )
}

export default GamesPerDay