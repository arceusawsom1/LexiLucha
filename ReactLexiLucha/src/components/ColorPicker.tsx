import { Container, Typography } from "@mui/material";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { ITextColor, IBearer } from "../types";
interface IProps {
    label:string,
    state: [ITextColor,(newVal:ITextColor)=>void],
    apiPath: string,
    shopLink:string,
    me: [IBearer, Dispatch<SetStateAction<IBearer>>]
}
const ColorPicker = (props:IProps) => {
    const {label, apiPath, shopLink} = props;
    const [options, setOptions] = useState<Array<ITextColor>>([])
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
            .then((response:{data:Array<ITextColor>})=>setOptions(response.data))
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
        <Container sx={{border:"1px solid blue",margin:"10px 0px"}}>
            <Typography>{label}</Typography>
            {options.map((option, index)=>
                <div key={index} style={{
                        ...styles,
                        backgroundColor:option.color, 
                        border:`5px solid ${(selected==option)? "black":"white"}`,
                    }} onClick={()=>{handleClick(option)}}>
                    {option.color}
                </div>
            )}
            <Link to={"/shop/" + shopLink}>
                <div style={styles}>
                    Buy more
                </div>
            </Link>
        </Container>
    )
}
export default ColorPicker;