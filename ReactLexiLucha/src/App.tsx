import { Route, Routes } from 'react-router-dom'
import './App.css'
import { AllGames } from './pages/AllGames'
import React, { Suspense, useEffect, useState } from 'react'
import SocketErrorPage from './pages/SocketErrorPage'
import { IBearer } from './types'
import { Container, useMediaQuery } from '@mui/material'
import LoginPage from './pages/LoginPage'
import LandingPage from './pages/LandingPage'
import RegisterPage from './pages/RegisterPage'
import AboutMe from './pages/AboutMe'
import LogoutPage from './pages/LogoutPage'
const MainGamePage = React.lazy(() => import('./pages/MainGamePage'));
const Shop = React.lazy(() => import('./pages/Shop'));
const Dashboard = React.lazy(() => import('./pages/Dashboard'));
const CustomiseCard = React.lazy(() => import('./pages/CustomiseCard'));
const TopNav = React.lazy(() => import('./components/TopNav'));


function App() {
    const [me, setMe] = useState<IBearer>({bearer:""})
    const [ingame, setIngame] = useState<boolean>(false)
    const isMobile = useMediaQuery('(max-width:600px)');
    useEffect(()=>{
        const bearer = localStorage.getItem("me")
        if (bearer!=null && bearer.length!=0){
            setMe({bearer})
        }
    }, [])

    

    return (
        <>
            <Suspense><TopNav inGame={[ingame, setIngame]} me={[me, setMe]} isMobile={isMobile}/></Suspense>
            <Container sx={{backgroundColor:"white",p:2,mt:12,mb:12,textAlign:"center",maxWidth:"1200px"}}>
                <Routes>
                    <Route path="" element={<LandingPage />}/>
                    <Route path="shop" element={<Suspense><Shop  apiPath="items" title="Full Shop" me={me}/></Suspense>}/>
                    <Route path="aboutMe" element={<AboutMe />}/>
                    <Route path="play" element={<Suspense><MainGamePage  isMobile={isMobile} me={[me, setMe]} inGame={[ingame, setIngame]} /></Suspense>}/>
                    <Route path="dashboard" element={<Suspense><Dashboard/></Suspense>}/>
                    { me.bearer!="" && <Route path="customise" element={<Suspense><CustomiseCard me={[me,setMe]}/></Suspense>}/> }
                    <Route path="allgames" Component={AllGames}/>
                    <Route path="socketError" Component={SocketErrorPage}/>
                    <Route path="login" element={<LoginPage me={[me, setMe]} />}/>
                    <Route path="logout" element={<LogoutPage me={[me, setMe]} />}/>
                    <Route path="register" element={<RegisterPage />}/>
                    
                    {/* <Route path="*" Component={NotFoundPage}/> */}
                </Routes>
            </Container>
            {/* <BotNav me={[me, setMe]} /> */}
        </>
    )
}

export default App
