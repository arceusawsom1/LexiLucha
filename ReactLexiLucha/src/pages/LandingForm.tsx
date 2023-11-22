import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { Dispatch, FormEvent, SetStateAction, useEffect, useState } from "react";
import { socket } from "../utils/socket";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { IUser } from "../types";
interface IProps {
    me: [IUser, Dispatch<SetStateAction<IUser>>]
}
const LandingForm = (props: IProps) => {
    const [me, _setMe] = props.me
    const [name, setName] = useState<string>("");
    const [language, setLanguage] = useState<string>("");
    const [languages, setLanguages] = useState<Array<string>>(["Spanish","Greek"]);
    const joinQueue = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        socket.emit("joinQueue", {name, language, bearer:me.bearer})
    }

    useEffect(()=>{
        const endpoint = BASE_URL + "language"
        console.log(endpoint)
        axios.get(endpoint)
            .then((response : {data: Array<string>})=>setLanguages(response.data))
    },[])
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
                
                <Box>
                    <Button variant="contained" type="submit">Join Queue</Button>
                </Box>
            </form>
        </>
    )
}
export default LandingForm;