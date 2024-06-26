import { useEffect, useState } from "react"
import { IGamestate } from "../types"
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { Button, Container, Grid, Typography } from "@mui/material";
import PopularityByLanguage from "../components/graphs/PopularityByLanguage";
import GamesPerDay from "../components/graphs/GamesPerDay";
import TimePerQuestionByLanguage from "../components/graphs/TimePerQuestionByLanguage";
import PercCorrectByLanguage from "../components/graphs/PercCorrectByLanguage";

const Dashboard = () => {
    const [games, setGames] = useState<Array<IGamestate>>([]);
    const refreshData = () => {
        const endpoint = BASE_URL + "game/archive"
        axios.get(endpoint)
            .then((response : {data: Array<IGamestate>})=>setGames(response.data))
    }

    useEffect(()=>{
        refreshData()
    },[])

    

    return (
        <Container sx={{textAlign:"center"}}>
            <Typography variant="h1">Dashboard</Typography>
            <Grid container>
                <Grid item>
                    <PopularityByLanguage games={games} />
                </Grid>
                <Grid item>
                    <GamesPerDay games={games} />
                </Grid>
                <Grid item>
                    <TimePerQuestionByLanguage games={games} />
                </Grid>
                <Grid item>
                    <PercCorrectByLanguage games={games} />
                </Grid>
            </Grid>
            
               
            <Button variant="outlined" onClick={refreshData}>Refresh Data</Button>
        </Container>
    )
}

export default Dashboard