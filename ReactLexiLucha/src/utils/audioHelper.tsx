const CORRECT_BING : HTMLAudioElement = new Audio("audio/ding.mp3")
const THUD : HTMLAudioElement = new Audio("audio/thud.mp3")
const BEEP : HTMLAudioElement = new Audio("audio/beep.mp3")
const BAD_BEEP : HTMLAudioElement = new Audio("audio/badBeeps.mp3")

CORRECT_BING.preload = 'auto';
THUD.preload = 'auto';
BEEP.preload = 'auto';
BAD_BEEP.preload = 'auto';

BEEP.volume=0.01


const playThud = () => {
    const temp : HTMLAudioElement = THUD.cloneNode() as HTMLAudioElement
    temp.play()
}
const playBeep = () => {
    const temp : HTMLAudioElement = BEEP.cloneNode() as HTMLAudioElement
    temp.volume=0.1
    temp.play()
}
const playBadBeep = () => {
    const temp : HTMLAudioElement = BAD_BEEP.cloneNode() as HTMLAudioElement
    temp.volume=0.5
    temp.play()
}

export {CORRECT_BING, playThud, playBeep,playBadBeep}