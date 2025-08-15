import { Link, useNavigate, useOutletContext, useParams } from "react-router-dom";
import Playlist from "../components/Playlist";
import HistoryMusic from "../components/HistoryMusic";
import { useCallback, useContext, useEffect, useState } from "react";
import debounce from "lodash.debounce";
import { useMeasure } from "@uidotdev/usehooks";
import axios from "axios";
import { handleMenuPopup, handleModal, handleMusicPlay, handleQueueMusic, handleUpdateSearchHistory, registerSetSearchHistory } from "../utils";
import { UserContext } from "../UserContext";
import App from "../App";

export default function HistoryPage(){
    const {setPosition} = useOutletContext();
    const navigate = useNavigate();
    const [search, setSearch] = useState('');
    const {searchParam} = useParams();
    const [ref, {width}] = useMeasure();
    const [music, setMusic] = useState([])
    const [topResult, setTopResult] = useState({});
    const {ready, user} = useContext(UserContext);
    const [searchHistory, setSearchHistory] = useState([])

    useEffect(() => {
            axios.get('/search/'+searchParam).then(res => {
                setMusic(res.data)
                setTopResult(res.data[0]);
            });
    }, [searchParam])

    useEffect(() => {
        if(user?.searchHistory){
            setSearchHistory(user.searchHistory)
        }
    }, [user])

    useEffect(() => {
        registerSetSearchHistory(setSearchHistory);
    }, [])

    const searchFunc = useCallback(
        debounce(
            (ev) => {
                navigate('/search/recent/'+ encodeURIComponent(ev.target.value))
            }, 500
        )
    )
    
    if(!ready){
        return "Loading...."
    }
    


    function formatDuration(secs){
        const minute = Math.floor(secs / 60);
        const second = secs % 60;
        return `${minute}:${second.toString().padStart(2, '0')}`
    }

    function updateHistory(musicItem){

        axios.post('/update-search-history', { searchData: musicItem })
        .then(() => {
            // Optionally re-fetch from server if you want to sync
            return axios.get('/profile');
        })
        .then(res => {
            handleUpdateSearchHistory(prev => [...prev, musicItem])
        });
    }
    return(
        <div className="flex flex-col relative w-full h-fit" ref={ref}>
                <form action="" className="sticky top-0 bg-tertiary text-secondary p-2 w-full h-[50px] flex items-center gap-2 z-1">
                    <Link to={'/search'} className="text-white w-1/12">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                            <path fillRule="evenodd" d="M11.03 3.97a.75.75 0 0 1 0 1.06l-6.22 6.22H21a.75.75 0 0 1 0 1.5H4.81l6.22 6.22a.75.75 0 1 1-1.06 1.06l-7.5-7.5a.75.75 0 0 1 0-1.06l7.5-7.5a.75.75 0 0 1 1.06 0Z" clipRule="evenodd" />
                        </svg>
                    </Link>
                    <input type="text" onChange={(ev) => {searchFunc(ev)}} placeholder="What do you want to listen to" className="w-11/12 outline-0"/>
                </form>

                {searchParam ? (
                    <>
                    {music.length > 0 ? (
                    <div className="flex flex-row h-fit w-full px-4 py-2 gap-2">
                        <div className={`h-[30vh] w-full ${width >= 750? "flex": "flex flex-col"} gap-2`}>
                            <div className="w-[400px] flex flex-col shrink-0 grow-0 gap-2">
                                <p className="text-white font-bold text-2xl">Top Result</p>

                                <div className=" group h-full w-full p-4 rounded-md hover:bg-secondary/20 bg-tertiary flex flex-col justify-around relative">

                                    <button onClick={() => {
                                        handleMusicPlay(topResult)
                                        }} className=" group-hover:flex hidden w-15 rounded-full absolute right-4 bottom-4 bg-main aspect-square text-black items-center justify-center shadow-md shadow-black hover:bg-green-300 transition">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                                            <path fillRule="evenodd" d="M4.5 5.653c0-1.427 1.529-2.33 2.779-1.643l11.54 6.347c1.295.712 1.295 2.573 0 3.286L7.28 19.99c-1.25.687-2.779-.217-2.779-1.643V5.653Z" clipRule="evenodd" />
                                        </svg>
                                    </button>

                                    <div className="w-20 h-20 flex items-center justify-center overflow-hidden rounded-md">
                                        <img src={topResult.thumbnailPath ? "http://localhost:4000/"+topResult.thumbnailPath : "https://picsum.photos/200/400"} className="w-full h-full object-cover" alt="" />
                                    </div>
                                    
                                    <div className="flex flex-col">
                                        <Link onClick={() => {updateHistory(topResult)}} to={'/music/'+topResult._id} className="text-white text-2xl font-bold truncate hover:underline">{topResult.name}</Link>
                                        <Link onClick={() => {updateHistory(topResult)}} to={'/artist/'+topResult.artist._id} className="text-secondary text-sm font-bold hover:underline">{topResult.artist.username}</Link>
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col gap-2 w-full grow-0 h-full ">
                                <p className="text-white font-bold text-2xl">Other Result</p>

                                {music.map(music => (
                                <div  className={`${width >= 750? "h-1/4 max-h-1/4": ""}  grow bg-tertiary rounded-md p-2 flex items-center justify-between`}>
                                    <div className="flex items-center gap-2 w-full">
                                        <div className="w-10 h-10 flex items-center justify-center overflow-hidden rounded-md shrink-0">
                                            <img className="h-full w-full object-cover" src={music.thumbnailPath ? "http://localhost:4000/"+music.thumbnailPath : "https://picsum.photos/200/400"} alt="" />
                                        </div>

                                        <div className="text-white flex flex-col ">
                                            <span className="text-md font-bold truncate" style={{ maxWidth: `${Math.floor(width/5)}px` }}>{music.name}</span>
                                            <span className="text-sm">{music.artist.username}</span>
                                        </div>
                                    </div>

                                    <div className="flex text-white gap-2">
                                        <button onClick={() => {
                                            handleModal('playlists');
                                            handleQueueMusic(music)
                                        }}>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                            </svg>
                                        </button>

                                        <p>{formatDuration(music.duration)}</p>

                                        <button onClick={(ev) => {
                                            handleMenuPopup(ev, setPosition)
                                            handleQueueMusic(music)
                                        }}>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    ) : (
                        <div className="w-full flex text-white items-center justify-center">No music Matched</div>
                    )}
                    </>
                ): (
                    <div className="w-full h-full flex flex-col p-2 gap-4 mt-4">
                        <h1 className="text-xl font-bold text-white">Recent search</h1>

                        {searchHistory.length > 0 && searchHistory.map((history, index) => (
                        
                        <HistoryMusic data={history} key={index}/>
                        
                        ))}
                    </div>
                )}
        </div>
    )
}