import { Button, Card, Container, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const LandingPage = () => {
    return(
        <>
            <Container sx={{mb:3}}>
                <Typography variant="h3">Welcome to</Typography>
                <Typography variant="h1">LexiLucha</Typography>
                <Typography variant="h3">The online battle arena game</Typography>
            </Container>
            <div style={{backgroundColor:"black",width:400,height:400,display:"inline-block"}}></div>
            <Container sx={{width:"80%",mt:3}}>
                <Button variant="contained" component={Link} to="/play">Play now</Button>
                <Card variant="outlined" sx={{my:1,border:""}}>
                    <Typography variant="h3">1. Choose a language</Typography>
                    <Typography variant="h5">Click the Play now Button to go to the game page, choose a display name and a language, then enter the game</Typography>
                </Card>
                <Card variant="outlined" sx={{my:1}}>
                    <Typography variant="h3">2. Ready up</Typography>
                    <Typography variant="h5">Once there are enouph people in your lobby, ready uponce all players have readied up the game will begin.  Make sure you are prepared!</Typography>
                </Card>
                <Card variant="outlined" sx={{my:1}}>
                    <Typography variant="h3">3. Display your lexical know-how</Typography>
                    <Typography variant="h5">View the foreign phrase at the top of the screen, and use the available words to translate the phrase into english.</Typography>
                    <Typography variant="h4">Be as quick as you can</Typography>
                    <Typography variant="h5">the ammount of points you earn is based on how quickly you solve the phrase in relation to other players</Typography>

                </Card>
                <Card variant="outlined" sx={{my:1}}>
                    <Typography variant="h3">4. Reap the rewards</Typography>
                    <Typography variant="h5">If you are logged in then you will earn points that you can use to customise how you apear on the leaderboard</Typography>
                </Card>
            </Container>
        </>
    )
}
export default LandingPage;