import { Table, TableBody, TableCell, TableRow } from "@mui/material";
import { IPlayer } from "../types";
import { getDisplayname } from "../utils/player";

interface IProps {
    players: Array<IPlayer>
}
const SmallLeaderboard = (props : IProps) => {
    return(
        <Table>
            <TableBody>
              {props.players.filter(p=>p.active).sort((a, b)=> b.stat.score-a.stat.score).map((player, index)=>
                <TableRow key={index}>
                    <TableCell>{getDisplayname(player)}</TableCell>
                    <TableCell>{player.stat.score}</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
    )
}

export default SmallLeaderboard;