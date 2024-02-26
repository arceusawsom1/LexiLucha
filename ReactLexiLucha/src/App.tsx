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
import BotNav from './components/BotNav'
import CustomiseCard from './pages/CustomiseCard'
import ShopRouter from './routers/ShopRouter'

function App() {
    const [me, setMe] = useState<IBearer>({bearer:""})

    useEffect(()=>{
        const bearer = localStorage.getItem("me")
        if (bearer!=null && bearer.length!=0){
            setMe({bearer})
        }
    }, [])

    

    return (
        <>
            <ShopRouter me={[me, setMe]} />
            <Routes>
                <Route path="" element={<MainGamePage me={[me, setMe]} />}/>
                <Route path="dashboard" Component={Dashboard}/>
                { me.bearer!="" && <Route path="customise" element={<CustomiseCard me={[me,setMe]}/>}/> }
                <Route path="allgames" Component={AllGames}/>
                <Route path="socketError" Component={SocketErrorPage}/>
                <Route path="login" element={<LoginPage me={[me, setMe]} />}/>
                <Route path="register" element={<RegisterPage />}/>
                
                {/* <Route path="*" Component={NotFoundPage}/> */}
            </Routes>
            <BotNav me={[me, setMe]} />
        </>
    )
}

export default App
