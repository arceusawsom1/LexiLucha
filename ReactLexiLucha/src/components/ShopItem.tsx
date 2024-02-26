import { Button, Grid } from "@mui/material";
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
        <Grid item sx={{m:1,width:"200px",height:"200px",overflow:"hidden",border:"1px solid black"}}>
            <p>{title}</p>
            <p>{description}</p>
            <p>{price}</p>
            <Button onClick={buyItem}>Buy</Button>
        </Grid>
    )
}
export default ShopItem;