import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { Dispatch, FormEvent, SetStateAction, useEffect, useState } from "react";
import { socket } from "../utils/socket";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { IBearer } from "../types";
interface IProps {
    me: [IBearer, Dispatch<SetStateAction<IBearer>>]
}
const LandingForm = (props: IProps) => {
    const [me, _setMe] = props.me
    const [name, setName] = useState<string>("");
    const [language, setLanguage] = useState<string>("SPANISH");
    const [languages, setLanguages] = useState<Array<string>>(["Spanish","Greek", "(the api server is not working)"]);
    const [mode, setMode] = useState<string>("");
    const [modeDisabled, setModeDisabled] = useState<boolean>(false);
    const [modes, setModes] = useState<Array<string>>(["SIMPLE"]);
    const joinQueue = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const message = {name, language, bearer:me.bearer, mode:"SIMPLE"}
        if (mode!="")
            message.mode=mode
        console.log(message)
        socket.emit("joinQueue", message)
    }

    useEffect(()=>{
        refreshLanguages()
    },[])

    const refreshLanguages = () => {
        const endpoint = BASE_URL + "language"
        console.log(endpoint)
        axios.get(endpoint)
            .then((response : {data: Array<string>})=>setLanguages(response.data))
    }
    
    useEffect(()=>{
        if (language==="")
            return
        console.log("language is: " + language)
        const endpoint = BASE_URL + "language/" + language + "/modes"
        console.log(endpoint)
        setModeDisabled(true)
        axios.get(endpoint)
            .then((response : {data: Array<string>})=>{
                setModeDisabled(false)
                setModes(response.data)
            })
    },[language])

    

    return(
        <>
            <form onSubmit={joinQueue}>
                {me.bearer.length==0 && <FormControl fullWidth sx={{my:1}}>
                    <TextField required label="Display Name" value={name} onChange={(e)=>setName(e.target.value)}/>
                </FormControl> }
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
                            <MenuItem key={languageIndex} value={language.toUpperCase()}>{language.charAt(0).toUpperCase() + language.substring(1).toLowerCase()}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
                {modes.length>1 && <FormControl fullWidth>
                    <InputLabel id="mode-picker">Mode</InputLabel>
                    <Select
                        labelId="mode-picker"
                        sx={{mb:2}}
                        value={mode}
                        label="Mode"
                        disabled={modeDisabled}
                        onChange={(e: {target: {value: string}})=>setMode(e.target.value)}
                    >
                        {modes.map(((mode, modeIndex)=>
                            <MenuItem key={modeIndex} value={mode.toUpperCase()}>{mode.charAt(0).toUpperCase() + mode.substring(1).toLowerCase()}</MenuItem>
                        ))}
                    </Select>
                </FormControl>}
                
                <Box>
                    <Button variant="contained" type="submit">Join Queue</Button>
                </Box>
            </form>
        </>
    )
}
export default LandingForm;