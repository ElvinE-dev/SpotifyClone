import axios from "axios";

// Declare module-level variables (outside any function)
let __registerSetFormVisible = null;
let __registerSetMusicData = null;
let __registerSetIsPlaying = null;
let __registerSetQueue = null;
let __registerSetQueueMusic = null;

export function handleMenuPopup(ev, setPosition) {
        ev.preventDefault()
        let element = ev.target
        // let imageBoundingRect = element.getBoundingClientRect()
        if((element.closest('button') && element.id === 'next-music-menu')){
            setPosition({x: ev.clientX, y: ev.clientY - 278});
        }else if(element.tagName){
            setPosition({x: ev.clientX, y: ev.clientY + 30});
        }else{
            setPosition({})
        }
}

export function registerSetFormVisible(fn){
    __registerSetFormVisible = fn;
}

export function handleModal(formVisible, music){
    __registerSetFormVisible?.(formVisible);
    if(music){
        __registerSetQueueMusic(music)
    }
}

export function registerSetMusicData(fn){
    __registerSetMusicData = fn;
}

export function registerSetIsPlaying(fn){
    __registerSetIsPlaying = fn;
}

export function handleMusicData(data){
    __registerSetMusicData?.(data)
}

export function registerSetQueue(fn){
    __registerSetQueue = fn;
}

export function handleQueue(music){
    __registerSetQueue(music);
}

export function handleIsPlaying(isPlaying){
    __registerSetIsPlaying?.(isPlaying);
}

export function handleMusicPlay(music, isPlaying){
        handleMusicData(music)

        setTimeout(() => {
            handleIsPlaying(isPlaying)
        }, 200)
        handleIsPlaying(false)
        axios.post('/update-music-history', {musicId: music._id});
        axios.post('/increment-music-count', {musicId: music._id});
} 

export function registerSetQueueMusic(fn){
    __registerSetQueueMusic = fn;
}

export function handleQueueMusic(music){
        __registerSetQueueMusic(music);
}

export const copyToClipboard = async (text) => {
    try {
        await navigator.clipboard.writeText(text);
        alert("Copied to clipboard");
    } catch (err) {
        console.error("Failed to copy:", err);
    }
};