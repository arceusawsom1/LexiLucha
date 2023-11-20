import { Card, Typography } from '@mui/material'
import { PieChart } from '@mui/x-charts'
import { IGamestate } from '../../types'
import { useMemo } from 'react'

interface IProps {
    games: Array<IGamestate>
}
const PopularityByLanguage = (props: IProps) => {
    const {games} = props;
    let allUsedLangauges = useMemo(()=>{
        return [...new Set(games.map((game: IGamestate)=> game.language))]
    },[games])
    return (
        <Card sx={{p:2,m:1}}>
            <Typography variant="h3">Popularity of languages</Typography>
            <PieChart
                series={
                    [{                                
                        data: 
                            allUsedLangauges.map((language: string) => {
                                return {
                                    language, 
                                    value: games.filter(game=>game.language===language).length,
                                    label: language
                            }
                        }),
                        innerRadius:0,
                        outerRadius:40
                    },
                    {
                        data: 
                            allUsedLangauges.map((language: string) => {
                            return {
                                language, 
                                value: games
                                    .filter(game=>game.language===language)
                                    .flatMap(game=>game.players).length,
                            }
                        }),
                        innerRadius:50,
                        outerRadius:100

                    }]}
                width={400}
                height={200}
            />
        </Card>
    )
}

export default PopularityByLanguage