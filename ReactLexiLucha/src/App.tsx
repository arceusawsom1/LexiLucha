import './App.css'
import { Container, ThemeProvider, createTheme, Snackbar, Alert, Typography } from '@mui/material'
import BasicPhraseQuestion from './components/BasicPhraseQuestion'
import { useEffect,useState } from 'react';
import { socket } from './utils/socket';
import LandingForm from './pages/LandingForm';
import { IGamestate } from './types';
import WaitingForPlayers from './pages/WaitingForPlayers';
import WaitingForReady from './pages/WaitingForReady';
import RoundOver from './pages/RoundOver';

function App() {
  const theme = createTheme({
    
  })
  const [successMessage, setSuccessMessage] = useState("");
  const [successOpen, setSuccessOpen] = useState(false);
  const [warningMessage, setWarningMessage] = useState("");
  const [warningOpen, setWarningOpen] = useState(false);
  const [failMessage, setFailMessage] = useState("");
  const [failOpen, setFailOpen] = useState(false);
  const [phase, setPhase] = useState(0);
  const [gamestate, setGamestate] = useState<IGamestate>();
  const setupSockets = () => {
    console.log("setting up sockets")

    socket.off("connect")
    socket.off("disconnect")
    socket.off("gameUpdate")
    socket.off("successMessage")
    socket.off("failMessage")
    socket.off("warningMessage")

    const onConnect = () => {
      console.log("connected")
    }
    const onDisconnect = () => {
      console.log("disconnected")
    }
    const onGameUpdate = (e: IGamestate) => {
      setPhase(1);
      setGamestate(e);
    }
    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);
    socket.on('gameUpdate', onGameUpdate);
    socket.on("successMessage", (e: {data: string})=>setSuccessMessage(e.data))
    socket.on("failMessage", (e: {data: string})=>setFailMessage(e.data))
    socket.on("warningMessage", (e: {data: string})=>setWarningMessage(e.data))


  }

  useEffect(()=>{
    setupSockets();
  },[])

  useEffect(()=>{
    if (successMessage!=""){
      setSuccessOpen(true);
      handleWarningClose();
      handleFailClose();
    }
  },[successMessage])

  useEffect(()=>{
    if (failMessage!=""){
      setFailOpen(true);
      handleSuccessClose();
      handleWarningClose();
    }
  },[failMessage])

  useEffect(()=>{
    if (warningMessage!=""){
      setWarningOpen(true);
      handleSuccessClose();
      handleFailClose();
    }
  },[warningMessage])

  const handleSuccessClose = () => {
    setSuccessOpen(false);
    setSuccessMessage("");
  }

  const handleFailClose = () =>{
    setFailOpen(false);
    setFailMessage("");
  }

  const handleWarningClose = () =>{
    setWarningOpen(false);
    setWarningMessage("");
  }

  /*
  Gamestate phases:
    1. Waiting for other plays
    2. Waiting for ready ups
    3. playing the game

  */
  return (
    <ThemeProvider theme = {theme}>
      <Container sx={{textAlign:"center"}}>
        <Typography variant="h1">Lexi Lucha</Typography>
        {phase === 0 && <LandingForm />}
        {(phase === 1 && gamestate!==undefined)&& 
          <>
            {gamestate.phase===1 && <WaitingForPlayers gamestate={gamestate} />}
            {gamestate.phase===2 && <WaitingForReady gamestate={gamestate} />}
            {gamestate.phase===3 && <BasicPhraseQuestion gamestate={gamestate} correctHandler={setSuccessMessage} failHandler={setFailMessage} currentQuestion={gamestate.currentQuestionSimple} key={gamestate.currentQuestionSimple.id}/>}
            {gamestate.phase===4 && <RoundOver gamestate = {gamestate} />}
          </>
        }
      </Container>
      <Snackbar anchorOrigin={{vertical:"bottom",horizontal:"center"}} autoHideDuration={2000} open={successOpen} onClose={handleSuccessClose}>
        <Alert severity="success">{successMessage}</Alert>
      </Snackbar>
      <Snackbar anchorOrigin={{vertical:"bottom",horizontal:"center"}} autoHideDuration={2000} open={failOpen}  onClose={handleFailClose}>
        <Alert severity="error">{failMessage}</Alert>
      </Snackbar>
      <Snackbar anchorOrigin={{vertical:"bottom",horizontal:"center"}} autoHideDuration={2000} open={warningOpen}  onClose={handleWarningClose}>
        <Alert severity="warning">{warningMessage}</Alert>
      </Snackbar>
    </ThemeProvider>
  )
}

export default App
