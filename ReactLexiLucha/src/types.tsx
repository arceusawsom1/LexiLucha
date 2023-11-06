type IOption = {
    value: string,
    selected: boolean
}
type IPhraseData = {
    phrase : string,
    options: IOption[],
    answer: string,
}
type IStats = {
    totalAttempts: number,
    correct: number,
    incorrect: number,
    streak: number,
}
export type {IPhraseData, IStats, IOption}