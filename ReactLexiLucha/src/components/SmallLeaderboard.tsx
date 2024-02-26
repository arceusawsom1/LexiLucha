import { Table, TableBody } from "@mui/material";
import { IPlayer } from "../types";
import PlayerBoard from "./PlayerBoard";

interface IProps {
    players: Array<IPlayer>
}
const SmallLeaderboard = (props : IProps) => {
    return(
        <Table>
            <TableBody>
              {props.players.filter(p=>p.active).sort((a, b)=> b.stat.score-a.stat.score).map((player, index)=>
              <>
                {player.custom !=undefined && 
                  <PlayerBoard key={index} player={player} custom={player.custom}/>
                }
              </>
              )}
            </TableBody>
          </Table>  
    )
}

export default SmallLeaderboard;