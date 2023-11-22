import { FormEvent, useState } from "react"
import { BASE_URL } from "../utils/constants"
import axios from "axios"
import { Alert, Box, Button, Container, TextField, Typography } from "@mui/material"
import { useNavigate } from "react-router-dom"

const RegisterPage = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [errorMsg, setErrorMsg] = useState("")
    const navigate = useNavigate();

    const submit = (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      const endpoint = BASE_URL + "auth/register"
      console.log(endpoint)
      if (password==confirmPassword){
        const body = {username, password}
        axios.post(endpoint, body)
          .then(()=>navigate("/"))
          .catch(({response})=>{
            setErrorMsg("Can't connect to server")
            if (response){
              if (response.status==409){
                setErrorMsg("Username taken")
              } else {
                setErrorMsg("Something went wrong")
              }
            }
            console.log(response.status)
          })
      } else {
        setErrorMsg("Password and confirm password are different")
      }
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
                <Box sx={{m:1}}>
                    <TextField required type="password" fullWidth label={"Confirm Password"} value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)}/>
                </Box>
                {errorMsg.length!=0 && <Alert severity={"error"}>{errorMsg}</Alert>}
                <Button type="submit" variant="contained">Register now</Button>
            </Container>
        </form>
    )
}

export default RegisterPage