import { Button, Card, Grid } from "@mui/material";
import { IShopItem, IBearer } from "../types";
import { BASE_URL } from "../utils/constants";
import { Dispatch, SetStateAction } from "react";
import axios from "axios";

interface IProps {
    item:IShopItem,
    me: [IBearer, Dispatch<SetStateAction<IBearer>>],
}
const ShopItem = (props:IProps) => {
    const {title, description, price, id} = props.item;
    const [me, _setMe] = props.me
    const buyItem = () => {
        const endpoint=(BASE_URL+"items/buy/" + id)
        console.log(endpoint,);
        axios.get(endpoint, {headers:{Authorization:me.bearer}})
    }
    return(
        <Grid item>
            <Card sx={{p:1,m:1,width:"200px",height:"200px",overflow:"hidden"}}>
                <p>{title}</p>
                <p>{description}</p>
                <div>
                    {price}
                    <Button onClick={buyItem}>Buy</Button>
                </div>
            </Card>
        </Grid>
    )
}
export default ShopItem;