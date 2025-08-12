import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const MusicContext = createContext({});

export default function MusicContextProvider({children}){
    const [isPlaying, setIsPlaying] = useState(false);
    const [music, setMusic] = useState({});
    const [queue, setQueue] = useState([]);
    const [queueMusic, setQueueMusic] = useState({});
    useEffect(() => {
        axios.get('/onplaying').then(res => {
            setMusic(res.data);
        })

        axios.get('/musics').then(res => {
            setQueue([...res.data])
        })
    }, [])



    return (
        <MusicContext.Provider value={{ isPlaying, setIsPlaying, music, setMusic, queue, setQueue, queueMusic, setQueueMusic }}>
            {children}
        </MusicContext.Provider>
    )
}