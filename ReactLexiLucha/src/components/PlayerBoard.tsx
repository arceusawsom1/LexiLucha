import { TableCell, TableRow } from "@mui/material"
import { getDisplayname } from "../utils/player"
import { ICustomBoard, IPlayer } from "../types";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

interface IProps {
    player:IPlayer,
    custom:ICustomBoard,
    complete?:boolean,
}
const PlayerBoard = (props:IProps) => {
    const { player, custom, complete } = props;
    return(
        <TableRow style={{color:custom.textColor.color, border:`5px solid ${custom.borderColor.color}`,backgroundColor:custom.backgroundColor.color, backgroundImage:`url(${(custom.backgroundImage ||{}).url})`}}>
            <TableCell style={{color:custom.textColor.color}}>{getDisplayname(player)}</TableCell>
            <TableCell style={{color:custom.textColor.color}}>{player.stat.score}</TableCell>
            <TableCell style={{color:custom.textColor.color}}>{complete===true ? <CheckCircleIcon/>:""}</TableCell>
        </TableRow>
    )
}
export default PlayerBoard