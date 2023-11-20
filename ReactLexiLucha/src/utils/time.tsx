const prettyFormat = (miliseconds: number) : string => {
    let seconds : number = Math.floor(miliseconds/1000)
    const minutes : number = Math.floor(seconds/60)
    seconds-=minutes*60
    if (minutes>1000){
        return "way too long"
    }
    if (minutes>100){
        return "too long"
    }
    return minutes + "m" + seconds + "s"
}
export {prettyFormat}