import questions from "../assets/questions";
import { IPhraseData } from "../types";

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
export {fetchQuestion}