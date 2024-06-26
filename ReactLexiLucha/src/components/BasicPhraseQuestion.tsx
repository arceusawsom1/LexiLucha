import { Button, Chip, CircularProgress, Container, Typography } from "@mui/material"
import { useCallback, useEffect, useState } from "react"
import SearchBar from "./SearchBar";
import { IGamestate, IOption, IPhraseData, ISimpleQuestion, IStats } from "../types";
import createQuestion from "../utils/QuestionCreator";
import { socket } from "../utils/socket";
import SmallLeaderboard from "./SmallLeaderboard";
import { motion } from "framer-motion"

interface IProps {
  correctHandler: (message: string)=>void,
  failHandler: (message: string)=>void,
  currentQuestion: ISimpleQuestion,
  gamestate: IGamestate,
  timer:[number, boolean],
  isMobile: boolean,
}



const BasicPhraseQuestion = (props : IProps) => {
  const [timer, timerActive] = props.timer
  const {gamestate, currentQuestion, isMobile} = props;
  const [question, setQuestion] = useState<IPhraseData>()
  const [selected, setSelected] = useState<IOption[]>([]);
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
      setSelected([...selected, question.options[wordIndex]])
      setTimeWordPicked(Date.now())
    }
  },[selected, question])

  const onUnselect = (wordIndex: number) => {
    setQuestion({...question!, options: question!.options.map(wordValue=>{if (wordValue.id===selected[wordIndex].id) wordValue.selected=false; return wordValue})})
    setSelected([...selected.filter((_unused,index)=>wordIndex!==index)])
  }

  const clearSelected = () => {
    setQuestion({...question!, options: question!.options.map(wordValue=>{wordValue.selected=false; return wordValue})})
    setSelected([])

  }

  
  const onSubmit = () => {
    setStage("submitted")
    socket.emit("submitAttempt", {data:selected.map((w:IOption)=>w.value).join(" ")})
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
              <Typography variant="h2" sx={{mb:3,mt:10}}>{timerActive ? timer/1000 : "--"}</Typography>
              <Typography variant="h3" sx={{mb:3,mt:10}}>{question.phrase}</Typography>
              <Container  sx={{textAlign:"left", borderBottom:"1px solid gray",height:"40px"}}>
                {selected.map((word, wordIndex)=>
                  <motion.div layoutId={word.id.toString()} key={word.id} style={{display:"inline-block"}}>
                    <Chip sx={{ml:0,m:0.5}} key={word.id} label={word.value} onClick={()=>onUnselect(wordIndex)}/>
                  </motion.div>
                )}
              </Container>
              {isMobile && <Container  sx={{textAlign:"left", borderBottom:"1px solid gray",height:"40px"}}></Container>}  {/* render a second answer line if the user is on mobile */}
              <Container sx={{my:2}}>
                {question.options.map((word, wordIndex)=>
                  <>
                    {!word.selected ? 
                      <motion.div animate={{transitionEnd:{display:"inline-block"}}} key={word.id} layoutId={word.id.toString()} style={{display:"inline-block"}}>
                        <Chip sx={{mt:0.5,mx:0.2}} key={word.id} disabled={word.selected} label={word.value} onClick={()=>onSelect(wordIndex)}/>
                      </motion.div>
                    :
                      <Chip sx={{mt:0.5,mx:0.2}} key={word.id} disabled={word.selected} label={word.value} onClick={()=>onSelect(wordIndex)}/>
                    }
                  </>

                )}
              </Container>
              { !isMobile && <Container>
                <Button variant="contained" onClick={onSubmit}>Submit</Button>
                <Button onClick={clearSelected}>Clear</Button>
              </Container>}
              { isMobile && <Container sx={{display:"flex",justifyContent:"space-evenly",backgroundColor:"#d8d8d8",position:"fixed",bottom:0,left:0,height:"80px"}}>
                <Button sx={{height:"80%",margin:"auto 0", width:"40%"}} variant="contained" onClick={onSubmit}>Submit</Button>
                <Button sx={{height:"80%",margin:"auto 0", width:"40%"}} variant="outlined" onClick={clearSelected}>Clear</Button>
              </Container>}
              
              {isMobile || <SearchBar timeWordPicked={timeWordPicked} question={question} selected={selected} onSubmit={onSubmit} onSelect={onSelect} onUnselect={onUnselect}/>}
              {/* <StatView stats={stats}/> */}
            </>
          }
          {stage==="submitted" &&
            <>
              <Typography variant="h2">Waiting for other player to submit</Typography>
              <CircularProgress />
            </>
          }
          <SmallLeaderboard gamestate={gamestate} />
        </>
      }
      </Container>
  )
}

export default BasicPhraseQuestion