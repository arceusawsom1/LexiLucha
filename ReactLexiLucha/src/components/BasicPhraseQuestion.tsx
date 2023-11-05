import { Button, Chip, Container, Typography } from "@mui/material"
import { ChangeEvent, useCallback, useEffect, useRef, useState } from "react"
import createQuestion from "../utils.tsx/QuestionCreator";

const BasicPhraseQuestion = () => {
  const [question, setQuestion] = useState<IPhraseData>(createQuestion("Hola, me llamo ryan", "Hello my name is ryan", "some other words so its not clear"))
  const [selected, setSelected] = useState<string[]>([]);
  const [currentSearch, setCurrentSearch] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);
  const onSelect = useCallback((wordIndex : number) => {
    question.options[wordIndex].selected=true
    setQuestion({...question})
    setSelected([...selected, question.options[wordIndex].value])
  },[selected, question])

  const onUnselect = (wordIndex: number) => {
    setQuestion({...question, options: question.options.map(wordValue=>{if (wordValue.value===selected[wordIndex]) wordValue.selected=false; return wordValue})})
    setSelected([...selected.filter((_unused,index)=>wordIndex!==index)])
  }

  const clearSelected = () => {
    setQuestion({...question, options: question.options.map(wordValue=>{wordValue.selected=false; return wordValue})})
    setSelected([])

  }

  const handleKeypress = (e: { target: { value: string; }; }) => {
    let newSearch = e.target.value
    // console.log("Search: '" + newSearch + "'")
    const matches = (search : string, item : IOption) => item.value.substring(0, search.length).toLowerCase()===search.toLowerCase() && !item.selected
    const numMatches = question.options.filter(option=> matches(newSearch, option)).length

    //We only want this to run if there is exactly one match
    if (numMatches===1){
      question.options.some((option, optionIndex)=>{
        if (matches(newSearch, option)){
          onSelect(optionIndex);
          newSearch="" //This means that a search was found
          return true;
        }
      })
    }
    setCurrentSearch(newSearch)
  }
  const handleKeydown = (e:any )=>{
    if (e.code==="Backspace" && e.target.value.length===0){
      onUnselect(selected.length-1)
    }
  }
  return (
    <Container sx={{height:"100%"}}>
      <Typography variant="h1">Lexi Lucha</Typography>
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
      <Button variant="contained" onClick={()=>{console.log("clicked")}}>Submit</Button>
      <Button onClick={clearSelected}>Clear</Button>
      <input ref={inputRef} onBlur={()=>{if (inputRef.current!==null) inputRef.current.focus()}}  autoFocus value={currentSearch} onChange={handleKeypress} onKeyDown={handleKeydown}/>
    </Container>
  )
}
type IOption = {
  value: string,
  selected: boolean
}
type IPhraseData = {
  phrase : string,
  options: IOption[]
}

export default BasicPhraseQuestion
export type {IPhraseData}