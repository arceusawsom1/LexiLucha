import { IPhraseData } from "../components/BasicPhraseQuestion";

const createQuestion= (phrase: string, answer: string, otherOptions: string="") : IPhraseData => {
    const question : IPhraseData = {
        phrase: phrase,
        answer: answer,
        options: []
    }
    const arr: string[] = [
        ...answer.split(" "),
        ...otherOptions.split(" "),
    ]
    shuffle(arr)
    arr.forEach(item=>question.options.push({value: item, selected: false}))
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