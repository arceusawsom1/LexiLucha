import { Box, Button, TextField } from "@mui/material";
import { useState } from "react";
import { socket } from "../utils/socket";

const LandingForm = () => {
    const [name, setName] = useState<string>("");
    
    const joinQueue = () => {
        socket.emit("joinQueue", {data:name})
    }

    return(
        <>
            <Box sx={{m:1}}>
                <TextField label="Display Name" value={name} onChange={(e)=>setName(e.target.value)}/>
            </Box>
            <Box>
                <Button variant="contained" onClick={joinQueue}>Join Queue</Button>
            </Box>
        </>
    )
}
export default LandingForm;