import { Table, TableBody } from "@mui/material";
import { IGamestate } from "../types";
import PlayerBoard from "./PlayerBoard";

interface IProps {
    gamestate: IGamestate
}
const SmallLeaderboard = (props : IProps) => {
    return(
        <Table>
            <TableBody>
              {props.gamestate.players.filter(p=>p.active&&p.custom!=undefined).sort((a, b)=> b.stat.score-a.stat.score).map((player, index)=>
                  <PlayerBoard key={index} player={player} custom={player.custom!} complete={player.stat.completions.length===props.gamestate.finishedQuestions.length+1}/>
              )}
            </TableBody>
          </Table>  
    )
}

export default SmallLeaderboard;