import { Route, Routes } from 'react-router-dom'
import './App.css'
import MainGamePage from './pages/MainGamePage'

function App() {
  return (
    <Routes>
        <Route path="" Component={MainGamePage}/>
    </Routes>
  )
}

export default App
