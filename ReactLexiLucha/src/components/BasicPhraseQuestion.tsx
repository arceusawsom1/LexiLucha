import { Button, Chip, CircularProgress, Container, Typography, useMediaQuery } from "@mui/material"
import { useCallback, useEffect, useState } from "react"
import SearchBar from "./SearchBar";
import { IGamestate, IPhraseData, ISimpleQuestion, IStats } from "../types";
import createQuestion from "../utils/QuestionCreator";
import { socket } from "../utils/socket";
import SmallLeaderboard from "./SmallLeaderboard";

interface IProps {
  correctHandler: (message: string)=>void,
  failHandler: (message: string)=>void,
  currentQuestion: ISimpleQuestion,
  gamestate: IGamestate,
  timer:number,
}

const BasicPhraseQuestion = ({ currentQuestion, gamestate, timer } : IProps) => {
  const [question, setQuestion] = useState<IPhraseData>()
  const [selected, setSelected] = useState<string[]>([]);
  const mobileDevice = useMediaQuery('(max-width:600px)');
  const [stage, setStage] = useState<string>("question");
  const [_stats, setStats] = useState<IStats>({totalAttempts:0, correct:0, incorrect:0, streak:0, maxStreak: 0})
  const [timeWordPicked, setTimeWordPicked] = useState<number>(Date.now())

  useEffect(()=>{
    setSelected([])
    setStage("question")
    setQuestion(createQuestion(currentQuestion.phrase, currentQuestion.options))
  },[currentQuestion.id])

  useEffect(()=>{
    setStats({
      totalAttempts:0,
      correct:0,
      incorrect:0,
      streak:0,
      maxStreak:0,
    })
  },[])

  const onSelect = useCallback((wordIndex : number) => {
    if (question){
      question.options[wordIndex].selected=true
      setQuestion({...question})
      setSelected([...selected, question.options[wordIndex].value])
      setTimeWordPicked(Date.now())
    }
  },[selected, question])

  const onUnselect = (wordIndex: number) => {
    setQuestion({...question!, options: question!.options.map(wordValue=>{if (wordValue.value===selected[wordIndex]) wordValue.selected=false; return wordValue})})
    setSelected([...selected.filter((_unused,index)=>wordIndex!==index)])
  }

  const clearSelected = () => {
    setQuestion({...question!, options: question!.options.map(wordValue=>{wordValue.selected=false; return wordValue})})
    setSelected([])

  }

  
  const onSubmit = () => {
    setStage("submitted")
    socket.emit("submitAttempt", {data:selected.join(" ")})
  }

  // const loadNewQuestion = (index ?: number) => {
  //   let question = popQuestion(index);
  //   setSelected([])
  //   setQuestion(question)
  // }
  
  return (
    <Container sx={{height:"100%"}}>
      {question !==undefined && 
        <>
          {stage==="question" && 
            <>
              <Typography variant="h2" sx={{mb:3,mt:10}}>{timer/1000}</Typography>
              <Typography variant="h3" sx={{mb:3,mt:10}}>{question.phrase}</Typography>
              <Container  sx={{textAlign:"left", borderBottom:"1px solid gray",height:"40px"}}>
                {selected.map((word, wordIndex)=>
                  <Chip sx={{ml:0,m:0.5}} key={wordIndex} label={word} onClick={()=>onUnselect(wordIndex)}/>
                )}
              </Container>
              <Container sx={{my:2}}>
                {question.options.map((word, wordIndex)=>
                  <Chip sx={{mt:0.5,mx:0.2}} disabled={word.selected} key={wordIndex} label={word.value} onClick={()=>onSelect(wordIndex)}/>
                )}
              </Container>
              <Button variant="contained" onClick={onSubmit}>Submit</Button>
              <Button onClick={clearSelected}>Clear</Button>
              {mobileDevice || <SearchBar timeWordPicked={timeWordPicked} question={question} selected={selected} onSubmit={onSubmit} onSelect={onSelect} onUnselect={onUnselect}/>}
              {/* <StatView stats={stats}/> */}
            </>
          }
          {stage==="submitted" &&
            <>
              <Typography variant="h2">Waiting for other player to submit</Typography>
              <CircularProgress />
            </>
          }
          <SmallLeaderboard players={gamestate.players} />
        </>
      }
      </Container>
  )
}

export default BasicPhraseQuestion