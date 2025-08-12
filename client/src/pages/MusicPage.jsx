import { Link, useOutletContext, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useMeasure } from "@uidotdev/usehooks";
import { handleMenuPopup, handleModal, handleMusicPlay  } from "../utils";
import axios from "axios";
import PlayButton from "../components/PlayButton";

export default function MusicPage(){
    const {musicId} = useParams();
    const [ref, {width}] = useMeasure();
    const {setPosition} = useOutletContext();
    const [music, setMusic] = useState({});
    const [artist, setArtist] = useState({});

    useEffect(() => {
        axios.get('/music/'+musicId).then(res => {
            setMusic(res.data);
            setArtist(res.data.artist)
        })
    }, [musicId])

    function formatDuration(secs){
        const minute = Math.floor(secs / 60);
        const second = secs % 60;
        return `${minute}:${second.toString().padStart(2, '0')}`
    }

    



    return(
        <div className="flex flex-col relative w-full h-full ">
            <span className="w-full h-1/2 absolute top-0 bg-gradient-to-b from-purple-500 to-transparent z-2"></span>

            <div className="flex text-white relative p-6 z-4 gap-4 items-center">
                <div className="overflow-hidden w-30 h-30 md:h-45 md:w-45 aspect-square shadow-md shadow-black/40 shrink-0 flex justify-center items-center">
                    <img src={"http://localhost:4000/"+music.thumbnailPath} alt="" className="object-cover w-full h-full" />
                </div>

                <div className="flex flex-col gap-4 justify-end">
                    <p className="text-white">Music</p>
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold">{music.name}</h1>
                    <p><Link to={'/artist/'+artist._id} className="hover:underline">{artist.username}</Link> <span className="text-secondary">• {music.name}</span> <span className="text-secondary">• {music.release} • {formatDuration(music.duration)} • {music.count}</span></p>
                </div>
            </div>

            <div className="w-full h-fit bg-primary/20 text-white z-4 pb-50">
                <div className="text-secondary flex justify-between p-4">
                    <div className="flex items-center gap-4">
                        
                        <PlayButton music={music}/>

                        <button onClick={() => { 
                            handleModal('playlists', music)
                        }} className="hover:text-white">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-8 shrink-0">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                            </svg>
                        </button>

                        <div className="hover:text-white">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-8 shrink-0">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m9 12.75 3 3m0 0 3-3m-3 3v-7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                            </svg>
                        </div>

                        <button className="cursor-pointer hover:text-white" onClick={(ev) => {handleMenuPopup(ev, setPosition)}}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-8 shrink-0">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                            </svg>
                        </button>
                    </div>

                </div>

                <div className={`flex w-full h-fit py-2 px-4  ${width >= 606  ? 'gap-[25%]' : 'flex-col gap-4'}`} ref={ref}>
                    <div className={`${width >= 606 ? 'w-4/12' : 'w-10/12'}`}>
                        <p className="text-secondary text-sm">
                            {music.lyric ? (
                                <>
                                    {music.lyric}
                                </>
                            ) : (
                                <>
                                -
                                </>
                            )}
                        </p>
                    </div>

                    <div className={`${width >= 606 ? 'w-4/12' : 'w-10/12'}`}>
                        <Link to={'/artist/'+artist._id} className="flex items-center gap-2 hover:bg-secondary/20 p-2 rounded-md">
                            <div className="flex items-center justify-center w-20 aspect-square overflow-hidden rounded-full">
                                <img src={artist.profilePath ? "http://localhost:4000/" + artist.profilePath : "https://picsum.photos/200/300"} alt="" className="object-cover w-full h-full" />
                            </div>

                            <div>
                                <p className="font-bold text-secondary text-sm">Artist</p>
                                <p className="font-bold text-xl">{artist.username}</p>
                            </div>
                        </Link>
                    </div> 
                </div>
            </div>
        </div>    
)
}