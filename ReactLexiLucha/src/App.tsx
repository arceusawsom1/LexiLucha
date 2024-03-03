import { Route, Routes } from 'react-router-dom'
import './App.css'
import MainGamePage from './pages/MainGamePage'
import Dashboard from './pages/Dashboard'
import { AllGames } from './pages/AllGames'
import LoginPage from './pages/LoginPage'
import { useEffect, useState } from 'react'
import { IBearer } from './types'
import RegisterPage from './pages/RegisterPage'
import SocketErrorPage from './pages/SocketErrorPage'
import CustomiseCard from './pages/CustomiseCard'
import ShopRouter from './routers/ShopRouter'
import TopNav from './components/TopNav'
import { Container } from '@mui/material'
import LandingPage from './pages/LandingPage'
import AboutMe from './pages/AboutMe'

function App() {
    const [me, setMe] = useState<IBearer>({bearer:""})
    const [ingame, setIngame] = useState<boolean>(false)

    useEffect(()=>{
        const bearer = localStorage.getItem("me")
        if (bearer!=null && bearer.length!=0){
            setMe({bearer})
        }
    }, [])

    

    return (
        <>
            <TopNav inGame={[ingame, setIngame]} me={[me, setMe]}/>
            <Container sx={{backgroundColor:"white",p:2,mt:12,textAlign:"center",width:"1200px"}}>
                <ShopRouter me={[me, setMe]} />
                <Routes>
                    <Route path="" element={<LandingPage />}/>
                    <Route path="aboutMe" element={<AboutMe />}/>
                    <Route path="play" element={<MainGamePage me={[me, setMe]} inGame={[ingame, setIngame]} />}/>
                    <Route path="dashboard" Component={Dashboard}/>
                    { me.bearer!="" && <Route path="customise" element={<CustomiseCard me={[me,setMe]}/>}/> }
                    <Route path="allgames" Component={AllGames}/>
                    <Route path="socketError" Component={SocketErrorPage}/>
                    <Route path="login" element={<LoginPage me={[me, setMe]} />}/>
                    <Route path="register" element={<RegisterPage />}/>
                    
                    {/* <Route path="*" Component={NotFoundPage}/> */}
                </Routes>
            </Container>
            {/* <BotNav me={[me, setMe]} /> */}
        </>
    )
}

export default App
