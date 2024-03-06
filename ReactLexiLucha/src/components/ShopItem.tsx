import { Button, Card, CardActions, Grid, Typography } from "@mui/material";
import { IShopItem, IBearer } from "../types";
import { BASE_URL } from "../utils/constants";
import axios from "axios";

interface IProps {
    item:IShopItem,
    me: IBearer,
    refreshData : ()=>void,
}
const ShopItem = (props:IProps) => {
    const {title, description, price, id} = props.item;
    const { refreshData, me } = props
    const buyItem = () => {
        const endpoint=(BASE_URL+"items/buy/" + id)
        axios.get(endpoint, {headers:{Authorization:me.bearer}})
            .then(()=>refreshData())
        
    }
    return(
        <Grid item>
            <Card variant="outlined" sx={{justifyContent:"space-between",p:1,m:1,minWidth:"200px",maxWidth:"253px",height:"200px",overflow:"hidden"}}>
            <Typography gutterBottom variant="h5" component="div" sx={{whiteSpace:"nowrap", textOverflow:"ellipsis",overflow:"hidden"}}>
                {title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
                {description}
            </Typography>
            <CardActions>
                <Typography variant="body2" color="text.secondary">
                    {price} Credits
                </Typography>
                <Button sx={{mx:2}} size="small" onClick={buyItem} variant="outlined">Buy now</Button>
            </CardActions>
            </Card>
        </Grid>
    )
}
export default ShopItem;