import { Card, Container, Typography } from "@mui/material";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { ITextColor, IBearer, IBackgroundImage } from "../types";
interface IProps {
    label:string,
    state: [any,(newVal:any)=>void],
    apiPath: string,
    shopLink:string,
    me: [IBearer, Dispatch<SetStateAction<IBearer>>]
}
const ColorPicker = (props:IProps) => {
    const {label, apiPath} = props;
    const [options, setOptions] = useState<Array<ITextColor & IBackgroundImage>>([])
    const [selected, setSelected] = props.state;
    const [me, _setMe] = props.me
    useEffect(()=>{
        refreshData()
    },[])
    const refreshData = () => {
        const endpoint = BASE_URL + apiPath
        const requestOptions={
            headers:{
                Authorization: me.bearer
            }
        }
        axios.get(endpoint, requestOptions)
            .then((response:{data:Array<ITextColor & IBackgroundImage>})=>setOptions(response.data))
    }
    const styles = {
        width:"120px",
        height:"40px",
        fontSize:"20px",
        cursor:"pointer"
    }
    const handleClick = (newTextColor: ITextColor) => {
        setSelected(newTextColor)
        const endpoint = BASE_URL + apiPath + "/choose/" + newTextColor.id
        const requestOptions = {
            headers:{
                authorization: me.bearer
            }
        }
        axios.put(endpoint,{}, requestOptions)
    }
    return(
        <Card variant="outlined" sx={{my:2,flexFlow:"none"}}>
                <Typography variant="h5">{label}</Typography>
                <Container sx={{flexFlow:"row",display:"flex",justifyContent:"center"}}>
                    {options.map((option, index)=>
                        <Card key={index} sx={{m:2}} style={{
                                ...styles,
                                backgroundColor:option.color,
                                backgroundImage:`url(${option.url})`,
                                border:`${(selected!=undefined && selected.id==option.id)? "5px":"2px"} solid  black`,
                            }} onClick={()=>{handleClick(option)}}>
                            {option.color}
                        </Card>
                    )}
                </Container>
        </Card>
    )
}
export default ColorPicker;