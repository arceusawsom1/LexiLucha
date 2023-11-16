import { Link, Route, Routes } from 'react-router-dom'
import './App.css'
import MainGamePage from './pages/MainGamePage'
import { Box, Button, Container } from '@mui/material'
import Dashboard from './pages/Dashboard'

function App() {
    
  return (
    <>
        <Routes>
            <Route path="" Component={MainGamePage}/>
            <Route path="dashboard" Component={Dashboard}/>
        </Routes>
        <Container sx={{textAlign:"center",my:4}}>
            <Box sx={{my:1}}>
                <Button component={Link} variant="outlined" to="/">New Game</Button>
            </Box>
            <Box sx={{my:1}}>
                <Button component={Link} variant="outlined" to="dashboard">Dashboard</Button>
            </Box>

        </Container>
    </>
  )
}

export default App
