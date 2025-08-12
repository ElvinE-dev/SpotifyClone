import { Link, useParams } from "react-router-dom";
import Playlist from "../components/Playlist";
import { useEffect, useState } from "react";
import PlaylistMusic from "../components/PlaylistMusic";
import axios from "axios";
import { handleMusicPlay, handleQueue } from "../utils";
import PlaylistPlay from "../components/PlaylistPlay";

export default function PlaylistPage(){
    const {playlistId} = useParams();

    const [isPlaying, setIsPlaying] = useState(false);
    const [musicPlayingNow, setMusicPlayingNow] = useState(1);
    const [playlistData, setPlaylistData] = useState({});
    const [maker, setMaker] = useState({})
    const [musics, setMusics] = useState([])
    

    useEffect(() => {
        axios.get('/get-playlist/'+playlistId).then(res => {
            setPlaylistData(res.data)
            setMusics(res.data.musics)
            setMaker(res.data.maker)

        })
    }, [playlistId])

    
    return(
        <div className="flex flex-col relative w-full h-full">
            <span className="w-full h-1/2 absolute top-0 bg-gradient-to-b from-purple-500 to-transparent z-2"></span>

            <div className="flex text-white relative p-6 z-4 gap-4 items-center">
                <div className="overflow-hidden w-30 h-30 md:h-45 md:w-45 aspect-square shadow-md shadow-black/40 shrink-0 flex justify-center items-center">
                    <img src={playlistData.thumbnailPath ? "http://localhost:4000/"+playlistData.thumbnailPath : "http://localhost:4000/uploads/playlist/default.jpg"} alt="" className="object-cover w-full h-full" />
                </div>

                <div className="flex flex-col gap-4 justify-end">
                    <p className="text-white">Playlist</p>
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold">{playlistData.name}</h1>
                    <p><Link to={'/artist/'+maker._id}>{maker.username}</Link> <span className="text-secondary">• {musics.length} Songs</span></p>
                </div>
            </div>

            <div className="w-full h-fit bg-primary/20 text-white z-4">
                <div className="text-secondary flex justify-between p-4">
                    <div className="flex items-center gap-4">
                        {/* <button onClick={() => {
                            handleMusicPlay(playlistData.musics[0].music)
                            handleQueue(playlistData.musics.map(item => item.music).slice(1))
                        }} className="flex w-15 rounded-full bg-main aspect-square text-black items-center justify-center shadow-md shadow-black hover:bg-green-300 transition">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                                <path fillRule="evenodd" d="M4.5 5.653c0-1.427 1.529-2.33 2.779-1.643l11.54 6.347c1.295.712 1.295 2.573 0 3.286L7.28 19.99c-1.25.687-2.779-.217-2.779-1.643V5.653Z" clipRule="evenodd" />
                            </svg>
                        </button> */}

                        <PlaylistPlay data={playlistData} type={'playlist'} />

                        <div className="">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-8 shrink-0">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m9 12.75 3 3m0 0 3-3m-3 3v-7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                            </svg>
                        </div>
                    </div>

                    <div className="flex gap-2 items-center">
                        <p>Lists</p>

                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0ZM3.75 12h.007v.008H3.75V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm-.375 5.25h.007v.008H3.75v-.008Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                            </svg>
                        </div>
                    </div>


                </div>
                <div className="w-full px-8 pb-50">
                    <div className="flex items-center justify-around mb-5 p-4 border-b border-secondary w-full h-10 text-secondary">
                        <p className="text-md w-1/12">#</p>
                        <p className="text-md w-10/12 md:w-6/12">Name</p>
                        <p className="text-md hidden md:block w-2/12">Album</p>
                        <p className="text-md hidden md:block w-2/12 truncate">Added date</p>
                        <div className="flex justify-end w-1/12">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                            </svg>
                        </div>
                    </div>

                    <div className="flex flex-col text-secondary w-full gap-4">
                        {musics.length > 0 && musics.map((music, index) => (
                            <PlaylistMusic index={index + 1} key={index} data={music}/>
                        ))}
                    </div>
                </div>
            </div>
        </div>    
)
}