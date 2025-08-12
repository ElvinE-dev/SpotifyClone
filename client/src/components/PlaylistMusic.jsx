import { Link, useOutletContext } from "react-router-dom";
import { handleMenuPopup, handleQueueMusic } from "../utils";
import { useEffect, useState } from "react";
import { formatDistance, parseISO } from 'date-fns'

export default function PlaylistMusic({index, data}){
    const {setPosition} = useOutletContext()

    const [music, setMusic] = useState({})
    useEffect(() => {
        setMusic(data.music);
    }, [data])
    

    function formatDuration(secs){
        const minute = Math.floor(secs / 60);
        const second = secs % 60;
        return `${minute}:${second.toString().padStart(2, '0')}`
    }
    
    return(
        <>
            {music.path && (
            <div className="flex items-center justify-around py-2 hover:bg-secondary/20 rounded-md px-4 gap-1" onContextMenu={(ev) => {
                handleMenuPopup(ev, setPosition)
                handleQueueMusic(music)
            }}>
                <div className="w-1/12 h-full">
                    {index}
                    {/* <div className="text-main">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                            <path d="M18.375 2.25c-1.035 0-1.875.84-1.875 1.875v15.75c0 1.035.84 1.875 1.875 1.875h.75c1.035 0 1.875-.84 1.875-1.875V4.125c0-1.036-.84-1.875-1.875-1.875h-.75ZM9.75 8.625c0-1.036.84-1.875 1.875-1.875h.75c1.036 0 1.875.84 1.875 1.875v11.25c0 1.035-.84 1.875-1.875 1.875h-.75a1.875 1.875 0 0 1-1.875-1.875V8.625ZM3 13.125c0-1.036.84-1.875 1.875-1.875h.75c1.036 0 1.875.84 1.875 1.875v6.75c0 1.035-.84 1.875-1.875 1.875h-.75A1.875 1.875 0 0 1 3 19.875v-6.75Z" />
                        </svg>
                    </div>
                    
                    <div>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                            <path fillRule="evenodd" d="M4.5 5.653c0-1.427 1.529-2.33 2.779-1.643l11.54 6.347c1.295.712 1.295 2.573 0 3.286L7.28 19.99c-1.25.687-2.779-.217-2.779-1.643V5.653Z" clipRule="evenodd" />
                        </svg>
                    
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                            <path fillRule="evenodd" d="M6.75 5.25a.75.75 0 0 1 .75-.75H9a.75.75 0 0 1 .75.75v13.5a.75.75 0 0 1-.75.75H7.5a.75.75 0 0 1-.75-.75V5.25Zm7.5 0A.75.75 0 0 1 15 4.5h1.5a.75.75 0 0 1 .75.75v13.5a.75.75 0 0 1-.75.75H15a.75.75 0 0 1-.75-.75V5.25Z" clipRule="evenodd" />
                        </svg>
                    </div> */}
    
                </div>
                <div className="w-10/12 md:w-6/12 h-full flex items-center gap-2">
                    <div className="flex items-center justify-center h-10 aspect-square overflow-hidden rounded-md">
                        <img className="w-full object-cover h-full" src={"http://localhost:4000/"+music.thumbnailPath} alt="" />
                    </div>
                    
                    <div className="flex flex-col">
                        <Link to={'/music/'+music._id} className="text-main hover:underline">{music.name}</Link>
                        <Link to={'/artist/'+music.artist._id} className="text-sm text-secondary hover:underline">{music.artist.username}</Link>
                    </div>
                </div>
                    
                <div className="hidden md:block w-2/12 h-full text-xs truncate">
                    {music.album}
                </div>
                    
                <div className="hidden md:block w-2/12 h-full text-xs truncate">
                    {formatDistance(parseISO(data.addedAt), Date.now())}
                </div>
                    
                <div className="w-1/12 h-full text-xs text-end">
                    {formatDuration(music.duration)}
                </div>
            </div>
            )}
        </>
    )
}