import { Card, Grid, Typography } from "@mui/material";
import { IStats } from "./BasicPhraseQuestion";

interface IProps {
    stats: IStats
}
const StatView = ({stats}:IProps) => {

    return(
        <Grid container direction={"column"} alignItems={"center"}>
            <Grid item xs={3}>
                <Card sx={{mt:2,width:"200px", textAlign:"left",pl:2,py:1}}>
                    <Typography variant="h4">Stats</Typography>
                    <Typography>Streak: {stats.streak}</Typography>
                    <Typography>Total Correct: {stats.correct}</Typography>
                </Card>
            </Grid>
        </Grid>
    )
}
export default StatView;