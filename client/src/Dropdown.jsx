import { useContext, useState } from "react"
import { copyToClipboard, handleModal, handleQueue } from "./utils"
import { MusicContext } from "./MusicContext"
import { Link, Navigate } from "react-router-dom";

export default function Dropdown({position, onClick, music}){

    const {queueMusic} = useContext(MusicContext);

    return(
        <>
            {position.x && position.y && queueMusic && (
                <div className="w-screen h-screen fixed hidden sm:block top-0 left-0 z-99" onClick={() => {onClick({})}}>

                    <div className=' drop-shadow-md drop-shadow-black/50 w-50 h-[278px] bg-tertiary fixed z-10 rounded-sm flex flex-col items-center justify-center gap-1 p-1 text-secondary' style={{ top: position.y , left: position.x - 200 }}>
                        <button onClick={() => {handleModal('playlists')}} className="w-full h-10 flex items-center gap-4 hover:bg-secondary/10 rounded-sm px-1 py-2" >
                            <div>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-5">
                                    <path fillRule="evenodd" d="M12 3.75a.75.75 0 0 1 .75.75v6.75h6.75a.75.75 0 0 1 0 1.5h-6.75v6.75a.75.75 0 0 1-1.5 0v-6.75H4.5a.75.75 0 0 1 0-1.5h6.75V4.5a.75.75 0 0 1 .75-.75Z" clipRule="evenodd" />
                                </svg>
                            </div>

                            <p className="text-white text-sm">Add to playlist</p>
                        </button>

                        <button className="w-full h-10 flex items-center gap-4 hover:bg-secondary/10 rounded-sm px-1 py-2">
                            <div>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                </svg>
                            </div>

                            <p className="text-white text-sm">Add to favorites</p>
                        </button>

                        <button onClick={() => {
                            handleQueue(prev => [queueMusic, ...prev])
                        }} className="w-full h-10 flex items-center gap-4 hover:bg-secondary/10 rounded-sm px-1 py-2">
                            <div>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 0 1 0 3.75H5.625a1.875 1.875 0 0 1 0-3.75Z" />
                                </svg>
                            </div>

                            <p className="text-white text-sm">Add to queue</p>
                        </button>

                        <div className="w-full bg-secondary/15 h-[1px]"></div>

                        <Link to={'/artist/'+queueMusic?.artist._id} className="w-full h-10 flex items-center gap-4 hover:bg-secondary/10 rounded-sm px-1 py-2">
                            <div>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                                </svg>
                            </div>

                            <p className="text-white text-sm">Visit artist</p>
                        </Link>

                        <button onClick={() => {
                            handleModal('credits')
                        }} className="w-full h-10 flex items-center gap-4 hover:bg-secondary/10 rounded-sm px-1 py-2">
                            <div>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0ZM3.75 12h.007v.008H3.75V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm-.375 5.25h.007v.008H3.75v-.008Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                                </svg>
                            </div>

                            <p className="text-white text-sm">Open credit</p>
                        </button>

                        <div className="w-full bg-secondary/15 h-[1px]"></div>

                        <button onClick={() => {
                            copyToClipboard('http://localhost:5173/music/'+queueMusic._id)
                        }} className="w-full h-10 flex items-center gap-4 hover:bg-secondary/10 rounded-sm px-1 py-2">
                            <div>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
                                </svg>
                            </div>

                            <p className="text-white text-sm">Share</p>
                        </button>
                    </div>

                </div>
            )}
        </>

    )
}