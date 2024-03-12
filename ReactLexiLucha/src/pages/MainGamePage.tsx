import { Container, ThemeProvider, createTheme, Snackbar, Alert, Typography } from '@mui/material'
import { Dispatch, SetStateAction, useEffect,useState } from 'react';
import { IGamestate, IBearer } from '../types';
import { socket } from '../utils/socket';
import LandingForm from './LandingForm';
import WaitingForPlayers from './WaitingForPlayers';
import WaitingForReady from './WaitingForReady';
import BasicPhraseQuestion from '../components/BasicPhraseQuestion';
import RoundOver from './RoundOver';
import { useNavigate } from 'react-router-dom';
import { CORRECT_BING, playBadBeep } from "../utils/audioHelper"

interface IProps {
  me: [IBearer, Dispatch<SetStateAction<IBearer>>],
  inGame: [boolean, Dispatch<SetStateAction<boolean>>],
  isMobile: boolean,
}
const MainGamePage = (props: IProps) => {
    const [me, setMe] = props.me
    const [_inGame, setInGame] = props.inGame
    const { isMobile } = props;
    const theme = createTheme({
    
    })
    const navigate = useNavigate();
    const [allLobbies, setAllLobbies] = useState<Array<IGamestate>>([])
    const [successMessage, setSuccessMessage] = useState("");
    const [successOpen, setSuccessOpen] = useState(false);
    const [warningMessage, setWarningMessage] = useState("");
    const [warningOpen, setWarningOpen] = useState(false);
    const [failMessage, setFailMessage] = useState("");
    const [timer, setTimer] = useState(0); //Only used for display purposes, not actually doing anything (except counting down)
    const [timerActive, setTimerActive] = useState(false);
    const [failOpen, setFailOpen] = useState(false);
    const [phase, setPhase] = useState(0);
    const [gamestate, setGamestate] = useState<IGamestate>();
    const setupSockets = () => {
      console.debug("Setting up socket events")
  
      socket.off("connect")
      socket.off("disconnect")
      socket.off("gameUpdate")
      socket.off("successMessage")
      socket.off("failMessage")
      socket.off("warningMessage")
      socket.off("startTimer")
      const onConnect = () => {
        console.debug("connected")
      }
      const onDisconnect = (e:any) => {
        setFailMessage("Disconnected from server (Tell Ryan)")
        console.warn("disconnected, reason: " + e)
      }
      const onGameUpdate = (e: IGamestate) => {
        setPhase(1);
        if (e.phase===4)
          setInGame(false);
        else
          setInGame(true);
        setGamestate(e);
        console.debug("New Gamestate:", e)
      }
      socket.on('connect', onConnect);
      socket.on('disconnect', onDisconnect);
      socket.on('gameUpdate', onGameUpdate);
      socket.on('allLobbies', (e: {data: Array<IGamestate>})=>setAllLobbies(e.data));
      socket.on("successMessage", (e: {data: string})=>setSuccessMessage(e.data))
      socket.on("failMessage", (e: {data: string})=>setFailMessage(e.data))
      socket.on("warningMessage", (e: {data: string})=>setWarningMessage(e.data))
      socket.on("connect_error", (err) => {navigate("/socketError?err=" + err)});
      socket.on("startTimer", (timerVal:number) => {setTimer(timerVal);setTimerActive(true)});
      socket.on("stopTimer", () => {setTimerActive(false)});

  
    }
  
    useEffect(() => {
      // setting time from 0 to 1 every 10 milisecond using javascript setInterval method
      let intervalId:number;
      if (timerActive){
        intervalId = setInterval(() => setTimer(timer - 1000), 950);

      }
      return () => clearInterval(intervalId);
    }, [ timer, timerActive ]);

    useEffect(() => {
      socket.connect()
      setupSockets();
      return ():void => {socket.disconnect()}
    },[])
  
    useEffect(()=>{
      if (successMessage!=""){
        CORRECT_BING.play()
        setSuccessOpen(true);
        handleWarningClose();
        handleFailClose();
      }
    },[successMessage])
  
    useEffect(()=>{
      if (failMessage!=""){
        playBadBeep();
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
          {phase === 0 && <LandingForm me={[me, setMe]} allLobbies={allLobbies}/>}
          {(phase === 1 && gamestate!==undefined)&& 
            <>
              {gamestate.phase===1 && <WaitingForPlayers gamestate={gamestate} />}
              {gamestate.phase===2 && <WaitingForReady gamestate={gamestate} />}
              {gamestate.phase===3 && <BasicPhraseQuestion isMobile={isMobile} timer={[timer, timerActive]} gamestate={gamestate} correctHandler={setSuccessMessage} failHandler={setFailMessage} currentQuestion={gamestate.currentQuestionSimple} key={gamestate.currentQuestionSimple.id}/>}
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
export default MainGamePage;