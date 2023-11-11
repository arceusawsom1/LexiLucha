import { useMemo, useState } from "react";
import questions from "../assets/questions";
import { IPhraseData } from "../types";

const useQuestions = () => {
    const [questionPool, setQuestionPool] = useState<Array<IPhraseData>>(questions)

    const popQuestion = (index ?: number): IPhraseData =>{
        let newQuestion;
        if (index===undefined){
            index = Math.floor(Math.random()*questionPool.length)
        }
        newQuestion =questionPool[index]
        newQuestion.options = newQuestion.options.map(item=>{item.selected=false;return item})
        setQuestionPool([...questionPool.slice(0,index), ...questionPool.slice(index+1)])
        return newQuestion;
    }
    const questionsRemaining = useMemo((): number => {
        return questionPool.length;
    }, [questionPool])

    return {popQuestion, questionsRemaining};
}
export {useQuestions}