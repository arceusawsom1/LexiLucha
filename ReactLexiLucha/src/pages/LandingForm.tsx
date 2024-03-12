import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { Dispatch, FormEvent, SetStateAction, useEffect, useMemo, useState } from "react";
import { socket } from "../utils/socket";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { IBearer, IGamestate } from "../types";
interface IProps {
    me: [IBearer, Dispatch<SetStateAction<IBearer>>],
    allLobbies: Array<IGamestate>
}
interface ILanguage {
    value:string,
    display:string,
}
const LandingForm = (props: IProps) => {
    const [me, _setMe] = props.me
    const { allLobbies } = props
    const [name, setName] = useState<string>("");
    const [language, setLanguage] = useState<string>("SPANISH");
    const [languages, setLanguages] = useState<Array<string>>(["Spanish","Greek", "(the api server is not working)"]);
    const [mode, setMode] = useState<string>("");
    const [modeDisabled, setModeDisabled] = useState<boolean>(false);
    const [modes, setModes] = useState<Array<string>>(["SIMPLE"]);
    
    const displayLanguages :Array<ILanguage> = useMemo(()=>{
        return languages.map((language)=>{
            console.log("running loop")
            const currentLobby = allLobbies.filter((lobby:IGamestate)=>lobby.language==language && (lobby.phase==1 || lobby.phase==2))[0]
            let playercount = 0
            if (currentLobby!=undefined)
                playercount = currentLobby.players.filter((player)=>player.active).length
            return {
                display:language + " (" + playercount + ")",
                value:language
            }
        })
    },[languages, allLobbies])
    const joinQueue = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        socket.emit("joinQueue", {name, language, bearer:me.bearer})
    }

    useEffect(()=>{
        refreshLanguages()
    },[])

    const refreshLanguages = () => {
        
        const endpoint = BASE_URL + "language"
        axios.get(endpoint)
            .then((response : {data: Array<string>})=>setLanguages(response.data))
    }
    
    useEffect(()=>{
        if (language==="")
            return
        const endpoint = BASE_URL + "language/" + language + "/modes"
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
                        {displayLanguages.map(((language, languageIndex)=>
                            <MenuItem key={languageIndex} value={language.value.toUpperCase()}>{language.display.charAt(0).toUpperCase() + language.display.substring(1).toLowerCase()}</MenuItem>
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