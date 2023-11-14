import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { FormEvent, FormEventHandler, useState } from "react";
import { socket } from "../utils/socket";

const LandingForm = () => {
    const [name, setName] = useState<string>("");
    const [language, setLanguage] = useState<string>("");
    const [languages] = useState<Array<string>>(["Spanish","Greek"]);
    const joinQueue = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        socket.emit("joinQueue", {name, language})
    }

    return(
        <>
            <form onSubmit={joinQueue}>
                <FormControl fullWidth sx={{my:1}}>
                    <TextField required label="Display Name" value={name} onChange={(e)=>setName(e.target.value)}/>
                </FormControl>
                <FormControl fullWidth>
                    <InputLabel id="language-picker">Language</InputLabel>
                    <Select
                        required
                        labelId="language-picker"
                        sx={{mb:2}}
                        value={language}
                        label="Language"
                        onChange={(e: {target: {value: string}})=>setLanguage(e.target.value)}
                    >
                        {languages.map(((language, languageIndex)=>
                            <MenuItem key={languageIndex} value={language.toUpperCase()}>{language}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
                
                <Box>
                    <Button variant="contained" type="submit">Join Queue</Button>
                </Box>
            </form>
        </>
    )
}
export default LandingForm;