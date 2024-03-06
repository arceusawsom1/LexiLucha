import { Grid, Typography } from "@mui/material";
import { IShopItem, IBearer, IUser } from "../types";
import ShopItem from "../components/ShopItem";
import { useEffect, useState } from "react";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { Link } from "react-router-dom";
interface IProps{
    title : string,
    apiPath : string, //Change to IShopItem eventually
    me: IBearer,
}
const Shop = (props: IProps) => {
    const {title, apiPath, me} = props
    const [items, setItems] = useState<Array<IShopItem>>([])
    useEffect(()=>{
        refreshData();
    },[])
    const refreshData = () => {
        const endpoint = BASE_URL + apiPath
        axios.get(endpoint)
            .then((response:{data:Array<IShopItem>}) => {
                const allItems = response.data
                console.log(response.data)
                axios.get(BASE_URL + apiPath+"/me",{headers:{Authorization:me.bearer}})
                    .then((response2:{data:IUser})=>{
                        console.log(response2.data)
                        const myIds :Array<Number> = response2.data.items.flatMap(item=>item.id)
                        console.log(myIds) 
                        setItems(allItems.filter(item=>!myIds.includes(item.id)))
                    })
            })
    }
    return(
        <>
            <Typography variant="h1" sx={{textAlign:"center"}}>{title}</Typography>
            <Typography variant="body1">Here you can buy upgrades to customise how you apear on the leaderboard during games.</Typography>
            <Typography variant="body1">You must go to <Link to="/customise">customise</Link> to apply the purchases </Typography>
            <Grid container>
                {items.map((item, index)=>
                    <ShopItem me={props.me} key={index} item={item} refreshData={refreshData}/>
                )}
            </Grid>
        </>
    )
}
export default Shop;