import { Container, Grid, Typography } from "@mui/material";
import { IShopItem, IBearer } from "../types";
import ShopItem from "../components/ShopItem";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { Link } from "react-router-dom";
interface IProps{
    title : string,
    apiPath : string, //Change to IShopItem eventually
    me: [IBearer, Dispatch<SetStateAction<IBearer>>],
    backPath : string,
}
const Shop = (props: IProps) => {
    const {title, apiPath, backPath} = props
    const [me] = props.me
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
                    .then((response2:{data:Array<IShopItem>})=>{
                        console.log(response2.data)
                        const myIds :Array<Number> = response2.data.flatMap(item=>item.id)
                        console.log(myIds) 
                        setItems(allItems.filter(item=>!myIds.includes(item.id)))
                    })
            })
    }
    return(
        <Container sx={{backgroundColor:"white"}}>
            <Typography variant="h2">{title}</Typography>
            <Grid container>
                {items.map((item, index)=>
                    <ShopItem me={props.me} key={index} item={item} />
                )}
                <Link to={backPath}>Back</Link>
            </Grid>
        </Container>
    )
}
export default Shop;