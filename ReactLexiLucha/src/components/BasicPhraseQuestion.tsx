import { Button, Chip, Container, Typography } from "@mui/material"
import { ChangeEvent, useCallback, useEffect, useRef, useState } from "react"
import createQuestion from "../utils.tsx/QuestionCreator";
import questions from "../assets/questions";
import StatView from "./StatView";

interface IProps {
  correctHandler: (message: string)=>void,
  failHandler: (message: string)=>void,
}
type IStats = {
  totalAttempts: number,
  correct: number,
  incorrect: number,
  streak: number,
}
const BasicPhraseQuestion = ({correctHandler, failHandler} : IProps) => {
  const [question, setQuestion] = useState<IPhraseData>()
  const [selected, setSelected] = useState<string[]>([]);
  const [currentSearch, setCurrentSearch] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);
  const [stats, setStats] = useState<IStats>({totalAttempts:0, correct:0, incorrect:0, streak:0})
  useEffect(()=>{
    loadNewQuestion(5);
    setStats({
      totalAttempts:0,
      correct:0,
      incorrect:0,
      streak:0,
    })
  },[])

  const onSelect = useCallback((wordIndex : number) => {
    if (question){
      question.options[wordIndex].selected=true
      setQuestion({...question})
      setSelected([...selected, question.options[wordIndex].value])
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

  //This is where we handle the "smart autocomplete" feature
  const handleKeypress = (e: { target: { value: string; }; }) => {
    // get the most up to date search
    let newSearch = e.target.value
    
    //We are going to find out if the last character was a space (which is the user's way of saying "ive finished typing my word")
    let spacePushed = false;
    if (newSearch.charAt(newSearch.length-1)===' '){
      newSearch = newSearch.substring(0,newSearch.length-1) //remove the space from the end of the search, since we don't actually want it
      spacePushed=true;
    }
    
    //A condition for comparing the search against he start of all the options
    const matches = (search : string, item : IOption) => item.value.substring(0, search.length).toLowerCase()===search.toLowerCase() && !item.selected
    
    //Get a list of all of the words that match
    const arrMatches = new Set(question!.options
      .map(option=> {if (matches(newSearch, option)) return option.value})
      .filter(item=>item!==undefined) //Filter out undefined
    )
    
    //If there is only one option left (duplicates are ok), or the spacebar was pushed
    if (arrMatches.size===1 || spacePushed){
      question!.options.some((option, optionIndex)=>{
        if (matches(newSearch, option) && (newSearch.length===option.value.length || !spacePushed)){
          onSelect(optionIndex);
          newSearch="" //This means that a search was found
          return true; //Make sure it only effects the first matching word
        }
      })
    }
    setCurrentSearch(newSearch)
  }
  const handleKeydown = (e:any )=>{
    if (e.code==="Enter"){
      onSubmit();
    }
    if (e.code==="Backspace" && e.target.value.length===0){
      onUnselect(selected.length-1)
    }
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
  }

  const fetchQuestion = (index ?: number) : IPhraseData => {
    let newQuestion;
    if (index===undefined){
      newQuestion=questions[Math.floor(Math.random()*questions.length)]
    } else {
      newQuestion =questions[index]
    }
    newQuestion.options = newQuestion.options.map(item=>{item.selected=false;return item})
    return newQuestion;
  }
  return (
    <Container sx={{height:"100%"}}>
      <Typography variant="h1">Lexi Lucha</Typography>
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
          <input ref={inputRef} onBlur={()=>{if (inputRef.current!==null) inputRef.current.focus()}}  autoFocus value={currentSearch} onChange={handleKeypress} onKeyDown={handleKeydown}/>
          
          <StatView stats={stats}/>
        </>
      }
      </Container>
  )
}
type IOption = {
  value: string,
  selected: boolean
}
type IPhraseData = {
  phrase : string,
  options: IOption[],
  answer: string,
}

export default BasicPhraseQuestion
export type {IPhraseData, IStats}