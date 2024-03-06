import { Alert, Box, Button, Container, TextField, Typography } from "@mui/material"
import { Dispatch, FormEvent, SetStateAction, useState } from "react"
import { BASE_URL } from "../utils/constants"
import axios from "axios"
import { IBearer } from "../types"
import { useNavigate } from "react-router-dom"
interface IProps {
    me: [IBearer, Dispatch<SetStateAction<IBearer>>]
}
const LoginPage = (props: IProps) => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [errorMsg, setErrorMsg] = useState("")
    const navigate = useNavigate()
    const [_me, setMe] = props.me;
    const submit = (e : FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setErrorMsg("")
        const endpoint = BASE_URL + "auth/login"
        const body = {}
        const requestOptions = {auth:{username, password}}
        axios.post(endpoint, body, requestOptions)
            .then(response=>{
                const bearer = "Bearer " + response.data
                setMe({bearer})
                localStorage.setItem("me",bearer)
                navigate("/")
            })
            .catch(err=>{
                console.warn(err)
                setErrorMsg("Something went wrong")
            })
    }
    return (
        <form onSubmit={submit}>
            <Container sx={{textAlign:"center"}}>
                <Typography variant="h1">Login</Typography>
                <Box sx={{m:1}}>
                    <TextField required fullWidth label={"Username"} value={username} onChange={(e)=>setUsername(e.target.value)}/>
                </Box>
                <Box sx={{m:1}}>
                    <TextField required type="password" fullWidth label={"Password"} value={password} onChange={(e)=>setPassword(e.target.value)}/>
                </Box>
                {errorMsg.length!=0 && <Alert severity={"error"}>{errorMsg}</Alert>}
                <Button type="submit" variant="contained">Login</Button>
            </Container>
        </form>
    )
}

export default LoginPage