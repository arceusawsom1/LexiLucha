import { TableCell, TableRow } from "@mui/material"
import { getDisplayname } from "../utils/player"
import { ICustomBoard, IPlayer } from "../types";

interface IProps {
    player:IPlayer,
    custom:ICustomBoard
}
const PlayerBoard = (props:IProps) => {
    const { player, custom } = props;
    return(
        <TableRow style={{color:custom.textColor.color, border:`5px solid ${custom.borderColor.color}`, backgroundColor: custom.backgroundColor.color}}>
            <TableCell style={{color:custom.textColor.color}}>{getDisplayname(player)}</TableCell>
            <TableCell style={{color:custom.textColor.color}}>{player.stat.score}</TableCell>
        </TableRow>
    )
}
export default PlayerBoard