import './App.css'
import { Container, ThemeProvider, createTheme } from '@mui/material'
import BasicPhraseQuestion from './components/BasicPhraseQuestion'

function App() {
  const theme = createTheme({
    
  })
  return (
    <ThemeProvider theme = {theme}>
      <Container>
        <BasicPhraseQuestion />
      </Container>
    </ThemeProvider>
  )
}

export default App
