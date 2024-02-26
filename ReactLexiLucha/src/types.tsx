type IOption = {
    value: string,
    selected: boolean
}
type IPhraseData = {
    id?: number,
    phrase : string,
    options: IOption[],
    answer: string,
    noiseWords?: string,
}
type IStats = {
    totalAttempts: number,
    correct: number,
    incorrect: number,
    streak: number,
    maxStreak: number,
}
type IGamestate = {
    language: string,
    currentQuestionSimple: ISimpleQuestion,
    finishedQuestions: Array<number>,
    startTime: number,
    createdTime: number,
    finishedTime: number,
    phase: number,
    players: Array<IPlayer>
}
type ISimpleQuestion = {
    id: number,
    phrase: string,
    options: string,
}
//If we want more info in player, stat should eventually also be available
type IPlayer = {
    name: string,
    ready:boolean,
    stat: IStat,
    active: boolean,
    type: string,
    custom?:ICustomBoard,
}
type IStat = {
    score: number,
    completions: Array<ICompletedQuestion>
}
type ICompletedQuestion = {
    timeTaken: number,
    correct: boolean,
}
type IBearer = {
    bearer: string,
}
type IUser = {
    username:string,
    custom:ICustomBoard,
    money:number,
}
type ICustomBoard = {
    textColor: ITextColor,
    backgroundColor: IBackgroundColor,
    borderColor: IBorderColor,

}
type IShopItem = {
    title:string,
    description:string,
    price:number,
    id:number,
}
type ITextColor = IShopItem & {
    color:string
}
type IBackgroundColor = IShopItem & {
    color:string
}
type IBorderColor = IShopItem & {
    color:string
}
export type {IUser, IBackgroundColor, IBorderColor, ITextColor, IShopItem, IBearer as IBearer, IPhraseData, IStats, IOption, IGamestate, IPlayer, ISimpleQuestion, IStat, ICompletedQuestion, ICustomBoard}