import { Button,  Container, Grid, Typography } from "@mui/material"
import { useEffect, useState } from "react";
import { IGamestate } from "../types";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import GameCard from "../components/GameCard";

export const AllGames = () => {
    const [games, setGames] = useState<Array<IGamestate>>([]);
    const [archiveGames, setArchiveGames] = useState<Array<IGamestate>>([]);
    const refreshData = () => {
        const endpoint = BASE_URL + "game"
        axios.get(endpoint)
            .then((response : {data: Array<IGamestate>})=>setGames(response.data))
        axios.get(endpoint + "/archive")
            .then((response : {data: Array<IGamestate>})=>setArchiveGames(response.data))
    } 
    
    useEffect(()=>{
        refreshData()
    },[])
    return (
        <Container>
            <Typography variant="h1">All Games</Typography>

            <Typography variant="h2">Currently active games</Typography>
            <Grid container>
                {games.map((game, gameIndex)=>
                    <Grid item sx={{m:1}} key={gameIndex}>
                        <GameCard game={game}/>
                    </Grid>
                )}
            </Grid>
            <Typography variant="h2">Archived Games</Typography>
            <Grid container>
                {archiveGames.reverse().map((game, gameIndex)=>
                    <Grid item sx={{m:1}} key={gameIndex}>
                        <GameCard game={game}/>
                    </Grid>
                )}
            </Grid>
            <Button variant="outlined" onClick={refreshData}>Refresh Data</Button>

        </Container>
    )
}
