import { Container, Table, TableBody, Typography } from "@mui/material"
import PlayerBoard from "../components/PlayerBoard"
import { ICustomBoard, IPlayer, ITextColor, IBearer, IUser, IBorderColor, IBackgroundColor } from "../types"
import { Dispatch, SetStateAction, useEffect, useState } from "react"
import ColorPicker from "../components/ColorPicker"
import axios from "axios"
import { BASE_URL } from "../utils/constants"
interface IProps{
    me: [IBearer, Dispatch<SetStateAction<IBearer>>]
}
const CustomiseCard = (props:IProps) => {
    const [player, setPlayer] = useState<IPlayer>({name:"loading...", ready:true, active:true, stat:{score:2,completions:[]}, type:"some type lol"})
    const [custom, setCustom] = useState<ICustomBoard>({backgroundColor:{title:"Default color (White)",description:"",price:1,id:-1,color:"ffffff"},textColor:{title:"Default color (Black)",description:"",price:1,id:-1,color:"000000"},borderColor:{title:"Default color (Black)",description:"",price:1,id:-1,color:"000000"}})
    const [money, setMoney] = useState<number>(0)
    const refreshData = () =>{
        const endpoint=BASE_URL + "items/me"
        const requestOptions = {
            headers:{
                "Authorization": props.me[0].bearer
            }
        }
        axios.get(endpoint,requestOptions)
            .then((response:{data:IUser})=>{
                setCustom({...custom,...response.data.custom})
                setPlayer({...player,name:response.data.username})
                setMoney(response.data.money)
            })
    }
    useEffect(()=>{
        refreshData()
    },[])
    
    return(
        <Container sx={{textAlign:"center"}}>
            <Typography variant="h1">Customizer</Typography>
            <ColorPicker me={props.me} shopLink = "textColor" label="Text Color" state={[custom.textColor, (newVal:ITextColor)=>{setCustom({...custom,textColor:newVal})}]} apiPath={"items/textColors/me"}/>
            <ColorPicker me={props.me} shopLink = "borderColor" label="Border Color" state={[custom.borderColor, (newVal:IBorderColor)=>{setCustom({...custom,borderColor:newVal})}]} apiPath={"items/borderColors/me"}/>
            <ColorPicker me={props.me} shopLink = "backgroundColor" label="Background Color" state={[custom.backgroundColor, (newVal:IBackgroundColor)=>{setCustom({...custom,backgroundColor:newVal})}]} apiPath={"items/backgroundColors/me"}/>
            {/* <Picker shopLink = "backgroundColor" label="Background Color" state={[custom.backgroundColor, (newVal:string)=>{setCustom({...custom,backgroundColor:newVal})}]} options={basicColors} /> */}
            {/* <Picker shopLink = "borderColor" label="Border Color" state={[custom.borderColor, (newVal:string)=>{setCustom({...custom,borderColor:newVal})}]} options={basicColors} /> */}
            <Table>
                <TableBody>
                    <PlayerBoard player={player} custom={custom}/>
                </TableBody>
            </Table>
            <Typography>Money: ${money} </Typography>
        </Container>

    )
}
export default CustomiseCard