import { Link } from "react-router-dom";
import Queue from "./Queue";
import { handleMenuPopup, handleModal, handleMusicData, handleQueue, handleQueueMusic } from "./utils";
import { useEffect, useState } from "react";

export default function ({isVisible, isQueueVisible, toggleQueue, setPosition, position, music, queue}){
    const [latestQueue, setLatestQueue] = useState({});

    useEffect(() => {
        setLatestQueue(queue[0]);
    }, [queue])
    


    return(
        // <div className="bg-primary w-2/10 h-10/12 pb-5 pl-5 pr-2 overflow-auto relative music-info-container hidden lg:block">
        <>
        {music.name &&  (
            <div className={isVisible ?  "bg-primary lg:w-[300px] xl:w-[400px] min-w-[230px]  h-full pb-5 pl-5 pr-2 overflow-auto overflow-x-hidden relative music-info-container hidden lg:block shrink-0": "hidden"} >
                {isQueueVisible ?  (
                    <Queue queue={queue} handleMenuPopup={handleMenuPopup} position={position} setPosition={setPosition} toggleQueue={toggleQueue}/>
                ) : (
                <div>
                    <div className="sticky h-8 py-5 left-0 top-0 w-full bg-primary flex items-center justify-between text-white font-bold z-11 mt-2">
                        <p>{music.name}</p>
                        <button className="text-white p-2 hover:bg-secondary/20 rounded-full" onClick={(ev) => {
                            handleMenuPopup(ev, setPosition)
                            handleQueueMusic(music);
                        }}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6" onClick={(ev) => handleMenuPopup(ev, setPosition)}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                            </svg>
                        </button>
                    </div>
                    <div className="gap-5 flex flex-col w-full">
                        <div className="flex w-full aspect-square overflow-hidden rounded-2xl shrink-0 justify-center items-center">
                            <img className="object-cover w-full h-full" src={"http://localhost:4000/"+music.thumbnailPath} alt="" onContextMenu={(ev) => {
                                handleMenuPopup(ev, setPosition)
                                handleQueueMusic(music);
                                }}/>
                        </div>

                        <div className="text-white flex items-center justify-between">
                            <div>
                                <h1 className="text-2xl font-bold">{music.name}</h1>
                                <Link to={'/artist/'+music.artist._id} className="text-secondary">{music.artist.username}</Link>
                            </div>

                            <button onClick={() => {
                                handleModal('playlists')
                                handleQueueMusic(music);
                            }} className="text-secondary hover:text-white cursor-pointer">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                </svg>
                            </button>
                        </div>

                        <div className="rounded-2xl bg-tertiary text-white gap-5 flex flex-col">
                            <div className="flex w-full aspect-square overflow-hidden rounded-tl-2xl rounded-tr-2xl shrink-0 relative">
                            <span className="absolute bg-gradient-to-b from-black/70 to-transparent top-0 h-20 w-full py-7 px-5 font-bold">
                                Artist info
                            </span>
                                <img className="object-cover w-full h-full" src={music.artist.profilePath ?  "http://localhost:4000/"+music.artist.profilePath: "https://picsum.photos/200/400"} alt="" />
                            </div>

                            <div className="p-5">
                                <div className="flex gap-4 flex-col">
                                    <p className="font-bold">{music.artist.username}</p>
                                    {/* <p className="text-secondary font-bold">{music.count} Monthly listeners</p> */}
                                    <p className="text-secondary font-bold line-clamp-3">{music.artist.description}</p>
                                </div>
                            </div>
                        </div>

                        <div className="rounded-2xl bg-tertiary text-white p-5 gap-5 flex flex-col">
                            <p className="font-bold">Credits</p>

                            {music.credits.length > 0 && music.credits.map((credit, index) => (
                                <div className="" key={index}>
                                    <p className="text-lg">{credit.name}</p>
                                    <p className="text-secondary font-semibold text-sm">{credit.role}</p>
                                </div>
                            ))}
                        </div>

                        <div className="rounded-2xl bg-tertiary text-white p-5 flex flex-col gap-4">
                            <div className="flex justify-between w-full">
                                <p className="font-bol truncate w-6/12">Next in queue</p>
                                <div className="text-xs text-secondary font-bold w-6/12 text-end flex justify-end">
                                    <button className=" hover:text-white" onClick={toggleQueue}>
                                        Open Queue
                                    </button>
                                </div>
                            </div>

                            {latestQueue === undefined ? (

                            <p>No queue available</p>

                            ) : (
                                <div className="flex items-center gap-1 group hover:bg-secondary/10 p-2 rounded-md">
                                <div className="w-3/12 shrink-0 rounded-md aspect-square overflow-hidden relative">
                                    <button onClick={() => {
                                        handleMusicData(latestQueue);

                                        handleQueue(prev => [...prev].slice(1));
                                    }} className="absolute w-full h-full bg-black/60 text-white flex opacity-0 transition group-hover:opacity-100 items-center justify-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                                            <path fillRule="evenodd" d="M4.5 5.653c0-1.427 1.529-2.33 2.779-1.643l11.54 6.347c1.295.712 1.295 2.573 0 3.286L7.28 19.99c-1.25.687-2.779-.217-2.779-1.643V5.653Z" clipRule="evenodd" />
                                        </svg>
                                    </button>
                                    <img className="object-cover h-full w-full" src={latestQueue.thumbnailPath ? "http://localhost:4000/"+latestQueue.thumbnailPath : "https://picsum.photos/200/300"} alt="" id="music-image"/>
                                </div>

                                <div className="flex justify-between items-center w-9/12 lg:gap-2 xl:gap-4">
                                    <div className="w-8/12">
                                        <h1 className="text-start truncate text-md">{latestQueue.name}</h1>
                                        <p className="text-sm text-secondary truncate text-start">{latestQueue.artist.username}</p>
                                    </div>

                                    <button className="flex justify-end hover:bg-secondary/20 p-2 rounded-full" onClick={(ev) => {
                                        handleMenuPopup(ev, setPosition)
                                        handleQueueMusic(latestQueue)
                                        }} id="next-music-menu">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="lg:size-4 xl:size-6" id="next-music-menu">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                            )}
                        </div>
                    </div>
                </div>
                )}
            </div>
        )}
        </>
    )
}