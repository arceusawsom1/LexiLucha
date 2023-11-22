import { Link, Route, Routes } from 'react-router-dom'
import './App.css'
import MainGamePage from './pages/MainGamePage'
import { Box, Button, Container } from '@mui/material'
import Dashboard from './pages/Dashboard'
import { AllGames } from './pages/AllGames'
import LoginPage from './pages/LoginPage'
import NotFoundPage from './pages/NotFoundPage'
import { useEffect, useState } from 'react'
import { IUser } from './types'
import RegisterPage from './pages/RegisterPage'

function App() {
    const [me, setMe] = useState<IUser>({bearer:""})

    useEffect(()=>{
        const bearer = localStorage.getItem("me")
        if (bearer!=null && bearer.length!=0){
            setMe({bearer})
        }
    }, [])

    const logout = () => {
        localStorage.removeItem("me")
        setMe({bearer:""})
    }

    return (
        <>
            <Routes>
                <Route path="" element={<MainGamePage me={[me, setMe]} />}/>
                <Route path="dashboard" Component={Dashboard}/>
                <Route path="allgames" Component={AllGames}/>
                <Route path="login" element={<LoginPage me={[me, setMe]} />}/>
                <Route path="register" element={<RegisterPage />}/>
                <Route path="*" Component={NotFoundPage}/>
            </Routes>
            <Container sx={{textAlign:"center",my:4}}>
                <Box sx={{my:1}}>
                    <Button component={Link} variant="outlined" to="dashboard">Dashboard</Button>
                </Box>
                <Box sx={{my:1}}>
                    <Button component={Link} variant="outlined" to="allgames">All Games</Button>
                </Box>
                {me.bearer.length==0 ? 
                    <> {/* Not Logged in */}
                        <Box sx={{my:1}}>
                            <Button component={Link} variant="contained" to="login">Log In</Button>
                        </Box>
                        <Box sx={{my:1}}>
                            <Button component={Link} variant="outlined" to="register">Register</Button>
                        </Box>
                    </>
                :
                    <> {/* Logged in */}
                        <Box sx={{my:1}}>
                            <Button onClick={logout} variant="outlined">Logout</Button>
                        </Box>
                    </>
                }

            </Container>
        </>
    )
}

export default App
