import { useEffect, useMemo, useState } from "react"
import { IGamestate } from "../types"
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { Button, Card, Container, Grid, Typography } from "@mui/material";
import { PieChart } from "@mui/x-charts";

const Dashboard = () => {
    const [games, setGames] = useState<Array<IGamestate>>([]);
    const refreshData = () => {
        const endpoint = BASE_URL + "game"
        console.log("Endpoint: " + endpoint)
        axios.get(endpoint)
            .then((response : {data: Array<IGamestate>})=>setGames(response.data))
    }

    useEffect(()=>{
        refreshData()
    },[])

    let allUsedLangauges = useMemo(()=>{
        return [...new Set(games.map((game: IGamestate)=> game.language))]
    },[games])

    return (
        <Container sx={{textAlign:"center"}}>
            <Typography variant="h1">Dashboard</Typography>
            <Grid container>
                <Grid item>
                    <Card sx={{p:2}}>
                        <Typography variant="h3">Languages by game count</Typography>
                        <PieChart
                            series={
                                [{                                
                                    data: 
                                        allUsedLangauges.map((language: string) => {
                                            return {
                                                language, 
                                                value: games.filter(game=>game.language===language).length,
                                                label: language
                                        }
                                    }),
                                    innerRadius:0,
                                    outerRadius:40
                                },
                                {
                                    data: 
                                        allUsedLangauges.map((language: string) => {
                                        return {
                                            language, 
                                            value: games
                                                .filter(game=>game.language===language)
                                                .flatMap(game=>game.players).length
                                        }
                                    }),
                                    innerRadius:50,
                                    outerRadius:100

                                }]}
                            width={400}
                            height={200}
                        />
                    </Card>
                </Grid>
            </Grid>
            
               
            <Button variant="outlined" onClick={refreshData}>Refresh Data</Button>
        </Container>
    )
}

export default Dashboard