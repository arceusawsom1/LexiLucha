import { Button, Chip, Container, Typography } from "@mui/material"
import { useState } from "react"
import createQuestion from "../utils.tsx/QuestionCreator";

const BasicPhraseQuestion = () => {
  const [question, setQuestion] = useState<IPhraseData>(createQuestion("Hola, me llamo ryan", "Hello my name is ryan", "some other words so its not clear"))
  const [selected, setSelected] = useState<string[]>([]);

  const onSelect = (wordIndex : number) => {
    console.log("word index");
    question.options[wordIndex].selected=true
    setQuestion({...question})
    setSelected([...selected, question.options[wordIndex].value])
  }
  const onUnselect = (wordIndex: number) => {
    setQuestion({...question, options: question.options.map(wordValue=>{if (wordValue.value===selected[wordIndex]) wordValue.selected=false; return wordValue})})
    setSelected([...selected.filter((unused,index)=>wordIndex!==index)])
  }
  const clearSelected = () => {
    setQuestion({...question, options: question.options.map(wordValue=>{wordValue.selected=false; return wordValue})})
    setSelected([])

  }
  return (
    <Container>
      <Typography>{question.phrase}</Typography>
      <Container  sx={{textAlign:"left", borderBottom:"1px solid gray",height:"40px"}}>
        {selected.map((word, wordIndex)=>
          <Chip sx={{ml:0,m:0.5}} key={wordIndex} label={word} onClick={()=>onUnselect(wordIndex)}/>
        )}
      </Container>
      <Container>
        {question.options.map((word, wordIndex)=>
          <Chip sx={{m:0.5, mt:2}} disabled={word.selected} key={wordIndex} label={word.value} onClick={()=>onSelect(wordIndex)}/>
        )}
      </Container>
      <Button variant="contained" onClick={()=>{console.log("clicked")}}>Submit</Button>
      <Button onClick={clearSelected}>Clear</Button>
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