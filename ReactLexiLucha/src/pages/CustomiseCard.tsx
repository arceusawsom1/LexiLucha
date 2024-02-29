import { Container, Table, TableBody, Typography } from "@mui/material"
import PlayerBoard from "../components/PlayerBoard"
import { ICustomBoard, IPlayer, ITextColor, IBearer, IUser, IBorderColor, IBackgroundColor, IBackgroundImage } from "../types"
import { Dispatch, SetStateAction, useEffect, useState } from "react"
import ColorPicker from "../components/ColorPicker"
import axios from "axios"
import { BASE_URL } from "../utils/constants"
import { Link } from "react-router-dom"

interface IProps{
    me: [IBearer, Dispatch<SetStateAction<IBearer>>]
}
const CustomiseCard = (props:IProps) => {
    const [player, setPlayer] = useState<IPlayer>({name:"loading...", ready:true, active:true, stat:{score:2,completions:[]}, type:"some type lol",socketId:""})
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
        <Container>
            <Typography variant="h1">Customizer</Typography>
            <Typography variant="body1">Here you can customise how you apear on the leaderboard during games.</Typography>
            <Typography variant="body1">You must go to the <Link to="/shop">shop</Link> to purchase new options </Typography>
            <ColorPicker me={props.me} shopLink = "textColor" label="Text Color" state={[custom.textColor, (newVal:ITextColor)=>{setCustom({...custom,textColor:newVal as ITextColor})}]} apiPath={"items/textColors/me"}/>
            <ColorPicker me={props.me} shopLink = "borderColor" label="Border Color" state={[custom.borderColor, (newVal:IBorderColor)=>{setCustom({...custom,borderColor:newVal})}]} apiPath={"items/borderColors/me"}/>
            <ColorPicker me={props.me} shopLink = "backgroundColor" label="Background Color" state={[custom.backgroundColor, (newVal:IBackgroundColor)=>{setCustom({...custom,backgroundColor:newVal})}]} apiPath={"items/backgroundColors/me"}/>
            <ColorPicker me={props.me} shopLink = "backgroundImage" label="Background Image" state={[custom.backgroundImage, (newVal:IBackgroundImage)=>{setCustom({...custom,backgroundImage:newVal})}]} apiPath={"items/backgroundImages/me"}/>
            <Typography variant="h4">Preview</Typography>
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