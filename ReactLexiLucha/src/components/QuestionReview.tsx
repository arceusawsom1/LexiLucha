import { Card, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { IPhraseData } from "../types";

interface IProps {
    id: number,
    correct:boolean,
}
const QuestionReview = (props:IProps) => {
    const { id, correct } = props;
    const [question, setQuestion] = useState<IPhraseData>()
    useEffect(()=>{
        fetchData()
    },[])
    const fetchData = () => {
        const endpoint = BASE_URL + "question/" + id
        axios.get(endpoint)
            .then((response)=>{setQuestion(response.data);console.log(response.data)})
    }
    return(
        <Card sx={{my:2, backgroundColor:(correct)?"white":"#fff2f2"}}>
            <Typography variant="h5">{question?.phrase}</Typography>
            <Typography variant="h5">{question?.answer}</Typography>
        </Card>
    )
}
export default QuestionReview;