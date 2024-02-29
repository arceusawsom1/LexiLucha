import { Card, Typography } from "@mui/material";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Link } from "react-router-dom";
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
    const {label, apiPath, shopLink} = props;
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
        display:"inline-block", 
        width:"120px",
        height:"30px",
        padding:"5px",
        margin:"2px",
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
        <Card sx={{my:2,py:2}}>
            <Typography variant="h5">{label}</Typography>
            {options.map((option, index)=>
                <div key={index} style={{
                        ...styles,
                        backgroundColor:option.color,
                        backgroundImage:`url(${option.url})`,
                        border:`${(selected==option)? "5px":"2px"} solid  black`,
                    }} onClick={()=>{handleClick(option)}}>
                    {option.color}
                </div>
            )}
            <Link to={"/shop/" + shopLink}>
                <div style={styles}>
                    Buy more
                </div>
            </Link>
        </Card>
    )
}
export default ColorPicker;