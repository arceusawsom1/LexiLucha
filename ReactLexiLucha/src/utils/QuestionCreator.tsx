import { IPhraseData } from "../types"
const createQuestion= (phrase: string, answer: string) : IPhraseData => {
    const question : IPhraseData = {
        phrase: phrase,
        answer: answer,
        options: []
    }
    console.log(answer.split(" "))
    const arr: string[] = [
        ...answer.split(" "),
    ]
    shuffle(arr)
    arr.forEach((item,index)=>question.options.push({id:index,value: item, selected: false}))
    return question
}

const shuffle = (array: string[]) => { 
    for (let i = array.length - 1; i > 0; i--) { 
        const j = Math.floor(Math.random() * (i + 1)); 
        [array[i], array[j]] = [array[j], array[i]]; 
    } 
    return array; 
}; 

export default createQuestion;