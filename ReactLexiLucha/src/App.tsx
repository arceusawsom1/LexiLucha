import './App.css'
import { Container, ThemeProvider, createTheme, Snackbar, Alert, Typography } from '@mui/material'
import BasicPhraseQuestion from './components/BasicPhraseQuestion'
import { useEffect,useState } from 'react';

function App() {
  const theme = createTheme({
    
  })
  const [successMessage, setSuccessMessage] = useState("");
  const [successOpen, setSuccessOpen] = useState(false);
  const [failMessage, setFailMessage] = useState("");
  const [failOpen, setFailOpen] = useState(false);
  useEffect(()=>{
    if (successMessage!=""){
      setSuccessOpen(true);
      handleFailClose()
    }
  },[successMessage])
  useEffect(()=>{
    if (failMessage!=""){
      setFailOpen(true);
      handleSuccessClose();
    }
  },[failMessage])
  const handleSuccessClose = () => {
    setSuccessOpen(false);
    setSuccessMessage("");
  }
  const handleFailClose = () =>{
    setFailOpen(false);
    setFailMessage("");
  }

  return (
    <ThemeProvider theme = {theme}>
      <Typography variant="h1">Lexi Lucha</Typography>
      <Container>
        <BasicPhraseQuestion correctHandler={setSuccessMessage} failHandler={setFailMessage}/>
      </Container>
      <Snackbar anchorOrigin={{vertical:"bottom",horizontal:"center"}} autoHideDuration={2000} open={successOpen} onClose={handleSuccessClose}>
        <Alert severity="success">{successMessage}</Alert>
      </Snackbar>
      <Snackbar anchorOrigin={{vertical:"bottom",horizontal:"center"}} autoHideDuration={2000} open={failOpen}  onClose={handleFailClose}>
        <Alert severity="error">{failMessage}</Alert>
      </Snackbar>
    </ThemeProvider>
  )
}

export default App
