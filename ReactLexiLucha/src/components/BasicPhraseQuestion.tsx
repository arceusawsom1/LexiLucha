import { Button, Chip, Container, Typography, useMediaQuery } from "@mui/material"
import { useCallback, useEffect, useState } from "react"
import StatView from "./StatView";
import SearchBar from "./SearchBar";
import { IPhraseData, IStats } from "../types";
import { fetchQuestion } from "../utils/mockdb";

interface IProps {
  correctHandler: (message: string)=>void,
  failHandler: (message: string)=>void,
}

const BasicPhraseQuestion = ({correctHandler, failHandler} : IProps) => {
  const [question, setQuestion] = useState<IPhraseData>()
  const [selected, setSelected] = useState<string[]>([]);
  const mobileDevice = useMediaQuery('(max-width:600px)');

  const [stats, setStats] = useState<IStats>({totalAttempts:0, correct:0, incorrect:0, streak:0, maxStreak: 0})
  const [timeWordPicked, setTimeWordPicked] = useState<number>(Date.now())
  
  useEffect(()=>{
    loadNewQuestion();
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
    const attempt = selected.join(" ");
    let newStats = stats;
    newStats.totalAttempts+=0
    newStats.streak+=1
    if (attempt.toLowerCase()===question!.answer.toLowerCase()){
      loadNewQuestion();
      correctHandler("Correct!")
      newStats.correct+=1
      if (newStats.streak > newStats.maxStreak){
        newStats.maxStreak = newStats.streak;
      }
    } else {
      newStats.streak=0
      newStats.incorrect+=1
      failHandler("Incorrect answer!")
    }
    setStats({...newStats});
  }

  const loadNewQuestion = (index ?: number) => {
    let question = fetchQuestion(index);
    console.log(question.answer)
    setSelected([])
    setQuestion(question)
    console.log(mobileDevice)
  }
  
  return (
    <Container sx={{height:"100%"}}>
      {question !==undefined && 
        <>
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
          <StatView stats={stats}/>
          <Typography></Typography>
        </>
      }
      </Container>
  )
}

export default BasicPhraseQuestion