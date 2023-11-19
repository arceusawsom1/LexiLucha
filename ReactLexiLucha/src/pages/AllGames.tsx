import { Button, Card, Container, Grid, List, ListItem, Typography } from "@mui/material"
import { useEffect, useState } from "react";
import { IGamestate } from "../types";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { prettyFormat } from "../utils/time";
import GameCard from "../components/GameCard";

export const AllGames = () => {
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
    return (
        <Container>
            <Typography variant="h1">All Games</Typography>

            <Typography variant="h2">Currently active games</Typography>
            <Grid container>
                {games.map(game=>
                    <Grid item sx={{m:1}}>
                        <GameCard game={game}/>
                    </Grid>
                )}
            </Grid>
            <Typography variant="h2">Archived Games</Typography>
            
            <Button variant="outlined" onClick={refreshData}>Refresh Data</Button>

        </Container>
    )
}
