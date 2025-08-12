import { Navigate, Outlet } from "react-router-dom";
import SideBar from "./SideBar";
import MusicInfo from "./MusicInfo";
import Header from "./Header";
import MusicPlayer from "./MusicPlayer";
import { useEffect, useState } from "react";
import Modal from "./Modal";
import Dropdown from "./Dropdown";
import { registerSetMusicData, registerSetFormVisible, registerSetIsPlaying, registerSetQueue, registerSetQueueMusic, handleQueue, handleIsPlaying, handleMusicPlay } from "./utils";
import { useContext } from "react";
import { UserContext } from "./UserContext";
import { MusicContext } from "./MusicContext";
import axios from "axios";


export default function Layout(){

    const [isVisible, setIsVisible] = useState(true)
    const [isQueueVisible, setIsQueueVisible] = useState(false)
    const [position, setPosition] = useState({})
    const [formVisible, setFormVisible] = useState('')
    const {user, ready} = useContext(UserContext)
    const {music, isPlaying, setIsPlaying, setMusic, setQueue, queue, queueMusic, setQueueMusic} = useContext(MusicContext);
    const [progress, setProgress] = useState(0);
    const [playlists, setPlaylists] = useState({});
    const [currentIndex, setCurrentIndex] = useState(0);
    const [history, setHistory] = useState([]);

    // const audio = 

    
    function musicControl(isPlaying){
        if(isPlaying){
            document.getElementById('musicElement').play()
            console.log('hai')
        }else{
            document.getElementById('musicElement').pause()
            console.log('hai1')
        }
    }

    function handleTimeUpdate(ev){
        // console.log(ev) BESOKKELARIN MUSIC SYSTEM
        setProgress(ev.target.currentTime)
    }

    useEffect(() => {
        window.oncontextmenu = function(ev){
            ev.preventDefault()
        }

        registerSetFormVisible(setFormVisible);
        registerSetMusicData(setMusic);
        registerSetQueue(setQueue);
        registerSetQueueMusic(setQueueMusic)
        registerSetIsPlaying(setIsPlaying)

        musicControl(isPlaying)
    }, [isPlaying])

    useEffect(() => {
        axios.get('/get-playlist').then(res => {
            setPlaylists(res.data);
        })

        setHistory(queue);
    }, [])
    
    if(ready && !user){
        return <Navigate to={'/login'}/>
    }
    
    return(
        <div className="w-screen h-screen flex items-center flex-col overflow-hidden">
            {formVisible && (
                <Modal key={1} playlists={playlists} formVisible={formVisible} setPostion={setPosition}/>
            )}

                <audio 
                    src={'http://localhost:4000/'+music.path} 
                    id="musicElement" 
                    hidden
                    onTimeUpdate={handleTimeUpdate}
                    onEnded={() => {
                        if(queue.length > 0){
                            setHistory(prev => [music,...prev]);
                            setQueue(prev => prev.slice(1));
                            handleMusicPlay(queue[0], true);
                            // handleQueue(current);

                            console.log(queue)
                        }else{
                            handleIsPlaying(false);
                        }
                    }}
                ></audio>
            
            <Header />
            <div className="sm:px-2 w-full h-full sm:h-10/12 flex items-center justify-between gap-2">
                <Dropdown position={position} onClick={setPosition} music={music}/>
                <SideBar playlists={playlists}/>
                <div className="indexpage bg-primary flex grow min-w-3/12 h-full sm:rounded-2xl relative overflow-y-auto overflow-x-hidden ">
                    <Outlet  context={{ setPosition, playlists }}/>
                </div>
                <MusicInfo queue={queue} music={music} isVisible={isVisible} isQueueVisible={isQueueVisible} toggleQueue={() => setIsQueueVisible(!isQueueVisible)}  position={position} setPosition={setPosition}/>
            </div>
            <MusicPlayer setHistory={setHistory} history={history} setCurrentIndex={setCurrentIndex} currentIndex={currentIndex} queue={queue} isPlaying={isPlaying} setProgress={setProgress} progress={progress} music={music} toggleMusicInfo={() => setIsVisible(!isVisible)} isVisible={isVisible} toggleQueue={() => setIsQueueVisible(!isQueueVisible) } isQueueVisible={isQueueVisible} />
        </div>

    )
}