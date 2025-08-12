import { useCallback, useEffect, useState } from "react"
import { Link, useLocation } from "react-router-dom"
import { handleIsPlaying, handleModal, handleMusicPlay, handleQueue, handleQueueMusic } from "./utils"

export default function MusicPlayer({setHistory, history, toggleMusicInfo, setCurrentIndex, currentIndex, isVisible, toggleQueue, isQueueVisible, isPlaying, music, progress, setProgress, queue}){
    const [range, setRange] = useState(0)
    const [maxRange, setMaxRange] = useState(0)
    const [maxVolume, setMaxVolume] = useState(100)
    const [volume, setVolume] = useState(100)
    const [altBarProgress, setAltBarProgress]= useState(0);
    const [altBarVisible, setAltBarVisible] = useState(false)
    const {pathname} = useLocation()

    useEffect(() => {
        setRange(Math.floor(progress))
    }, [progress])

    
    useEffect(() => {
        if(music){
            setMaxRange(music.duration);
        }
    }, [music])

    function formatDuration(secs) {
        const minutes = Math.floor(secs / 60);
        const seconds = secs % 60;
        return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    }


    return(
        <div className="w-full h-[180px] sm:h-[79px] fixed bottom-0 sm:static z-15">
            <div className="hidden sm:flex items-center justify-between w-full h-full py-2 px-4">

                {music.path ? (
                <div className="flex items-center w-3/12 h-full text-white gap-4">
                        <div className="flex h-full aspect-square overflow-hidden rounded-md shrink-0">
                            <img className="object-cover w-full" src={"http://localhost:4000/" + music.thumbnailPath} alt="" />
                        </div>

                        <div>
                            <h3>{music.name}</h3>
                            <p className="text-sm text-secondary">{music.artist.username}</p>
                        </div>

                    <button className="text-secondary hover:text-white" onClick={(ev) => {
                        handleModal('playlists')
                        handleQueueMusic(music);
                        }}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>
                    </button>
                </div>
                ): (
                <div className="flex items-center w-3/12 h-full text-white gap-4">
                </div>
                )}

                <div className="flex flex-col w-4/12 items-center justify-center gap-4">
                    <div className="text-secondary flex gap-4">

                        <button className="Shuffle text-secondary/50 hover:text-white">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                                <path fillRule="evenodd" d="M15.97 2.47a.75.75 0 0 1 1.06 0l4.5 4.5a.75.75 0 0 1 0 1.06l-4.5 4.5a.75.75 0 1 1-1.06-1.06l3.22-3.22H7.5a.75.75 0 0 1 0-1.5h11.69l-3.22-3.22a.75.75 0 0 1 0-1.06Zm-7.94 9a.75.75 0 0 1 0 1.06l-3.22 3.22H16.5a.75.75 0 0 1 0 1.5H4.81l3.22 3.22a.75.75 0 1 1-1.06 1.06l-4.5-4.5a.75.75 0 0 1 0-1.06l4.5-4.5a.75.75 0 0 1 1.06 0Z" clipRule="evenodd" />
                            </svg>
                        </button>

                        <button onClick={() => {
                            if (history.length > 0) {
                                let prevSong = history[0];
                                setHistory(h => h.slice(1))
                                handleQueue(prev => [music, ...prev]);
                                handleMusicPlay(prevSong, true);
                            }
                        }} className="Backward hover:text-white">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-8">
                                <path d="M9.195 18.44c1.25.714 2.805-.189 2.805-1.629v-2.34l6.945 3.968c1.25.715 2.805-.188 2.805-1.628V8.69c0-1.44-1.555-2.343-2.805-1.628L12 11.029v-2.34c0-1.44-1.555-2.343-2.805-1.628l-7.108 4.061c-1.26.72-1.26 2.536 0 3.256l7.108 4.061Z" />
                            </svg>
                        </button>

                        {isPlaying ? (

                        <button onClick={() => {handleIsPlaying(false)}} className="text-white Play">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-8">
                                <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12ZM9 8.25a.75.75 0 0 0-.75.75v6c0 .414.336.75.75.75h.75a.75.75 0 0 0 .75-.75V9a.75.75 0 0 0-.75-.75H9Zm5.25 0a.75.75 0 0 0-.75.75v6c0 .414.336.75.75.75H15a.75.75 0 0 0 .75-.75V9a.75.75 0 0 0-.75-.75h-.75Z" clipRule="evenodd" />
                            </svg>
                        </button>
                        ) :(
                        <button onClick={() => {handleIsPlaying(true)}} className="text-white Play">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-8">
                                <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm14.024-.983a1.125 1.125 0 0 1 0 1.966l-5.603 3.113A1.125 1.125 0 0 1 9 15.113V8.887c0-.857.921-1.4 1.671-.983l5.603 3.113Z" clipRule="evenodd" />
                            </svg>
                        </button>
                        )}

                        <button onClick={() => {
                            setHistory(prev => [music, ...prev]);
                            handleQueue(prev => prev.slice(1));
                            handleMusicPlay(queue[0], true);
                            
                        }} className="Forward hover:text-white">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-8">
                                <path d="M5.055 7.06C3.805 6.347 2.25 7.25 2.25 8.69v8.122c0 1.44 1.555 2.343 2.805 1.628L12 14.471v2.34c0 1.44 1.555 2.343 2.805 1.628l7.108-4.061c1.26-.72 1.26-2.536 0-3.256l-7.108-4.061C13.555 6.346 12 7.249 12 8.689v2.34L5.055 7.061Z" />
                            </svg>
                        </button>

                        <button className="Loop text-secondary/50 hover:text-white">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                                <path fillRule="evenodd" d="M12 5.25c1.213 0 2.415.046 3.605.135a3.256 3.256 0 0 1 3.01 3.01c.044.583.077 1.17.1 1.759L17.03 8.47a.75.75 0 1 0-1.06 1.06l3 3a.75.75 0 0 0 1.06 0l3-3a.75.75 0 0 0-1.06-1.06l-1.752 1.751c-.023-.65-.06-1.296-.108-1.939a4.756 4.756 0 0 0-4.392-4.392 49.422 49.422 0 0 0-7.436 0A4.756 4.756 0 0 0 3.89 8.282c-.017.224-.033.447-.046.672a.75.75 0 1 0 1.497.092c.013-.217.028-.434.044-.651a3.256 3.256 0 0 1 3.01-3.01c1.19-.09 2.392-.135 3.605-.135Zm-6.97 6.22a.75.75 0 0 0-1.06 0l-3 3a.75.75 0 1 0 1.06 1.06l1.752-1.751c.023.65.06 1.296.108 1.939a4.756 4.756 0 0 0 4.392 4.392 49.413 49.413 0 0 0 7.436 0 4.756 4.756 0 0 0 4.392-4.392c.017-.223.032-.447.046-.672a.75.75 0 0 0-1.497-.092c-.013.217-.028.434-.044.651a3.256 3.256 0 0 1-3.01 3.01 47.953 47.953 0 0 1-7.21 0 3.256 3.256 0 0 1-3.01-3.01 47.759 47.759 0 0 1-.1-1.759L6.97 15.53a.75.75 0 0 0 1.06-1.06l-3-3Z" clipRule="evenodd" />
                            </svg>
                        </button>

                    </div>

                    {music.path ? (
                        <div className="w-full  h-1 flex items-center gap-4">
                            <p className="text-secondary text-xs w-1/12 text-center">{formatDuration(range)}</p>
                            <div className="w-10/12 relative flex items-center">
                                <input type="range" name="" max={maxRange} defaultValue={0} 
                                    onMouseUp={async (ev) => {
                                        await setProgress(Number(ev.target.value))

                                        document.getElementById('musicElement').currentTime = ev.target.value
                                        
                                        setAltBarVisible(false)
                                    }} 

                                    onChange={(ev) => {
                                        setAltBarProgress(Number(ev.target.value))
                                        setAltBarVisible(true)
                                    }}
                                    className="music-range w-full h-1 absolute z-2" id="music-range" />
                                <span  className={altBarVisible ? "music-track bg-white hover:bg-main block h-1 absolute t-0 z-1 rounded-full" : 'hidden'} style={{ width:altBarProgress/maxRange*100 +"%" }}></span>

                                <label htmlFor="music-range" className={
                                        altBarVisible ? 'hidden' : 'music-track bg-white hover:bg-main block h-1 absolute t-0 z-1 rounded-full'
                                    } style={{ width:range/maxRange*100 +"%" }}></label>
                                <span className="block w-full h-1 bg-tertiary rounded-full"></span>
                            </div>
                            <p className="text-secondary text-xs w-1/12 text-center">{formatDuration(maxRange)}</p>
                        </div>
                    ) : (
                        <div className="w-full  h-1 flex items-center gap-4">
                            <p className="text-secondary text-xs w-1/12 text-center">-:--</p>
                            <div className="w-10/12 relative flex items-center">
                                <span className="block w-full h-1 bg-tertiary rounded-full"></span>
                            </div>
                            <p className="text-secondary text-xs w-1/12 text-center">-:--</p>
                        </div>

                    )}
                </div>

                <div className="w-3/12 gap-4 flex text-secondary items-center justify-end">

                {music.path ? (
                    <button className={isVisible ? "cursor-pointer text-main hidden lg:block" : "cursor-pointer hidden lg:block"} onClick={toggleMusicInfo}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4.5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
                        </svg>
                    </button>
                ):(
                    <button className={"cursor-not-allowed text-secondary/50 hidden lg:block"} onClick={toggleMusicInfo}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4.5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
                        </svg>
                    </button>
                )}

                    <button className={isQueueVisible ? "cursor-pointer text-main hidden lg:block" : "cursor-pointer hidden lg:block"} onClick={toggleQueue}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-4.5">
                            <path d="M5.625 3.75a2.625 2.625 0 1 0 0 5.25h12.75a2.625 2.625 0 0 0 0-5.25H5.625ZM3.75 11.25a.75.75 0 0 0 0 1.5h16.5a.75.75 0 0 0 0-1.5H3.75ZM3 15.75a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75a.75.75 0 0 1-.75-.75ZM3.75 18.75a.75.75 0 0 0 0 1.5h16.5a.75.75 0 0 0 0-1.5H3.75Z" />
                        </svg>
                    </button>
                    <div className="w-7/12 lg:w-4/12 text-secondary flex gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-4.5 shrink-0">
                            <path d="M13.5 4.06c0-1.336-1.616-2.005-2.56-1.06l-4.5 4.5H4.508c-1.141 0-2.318.664-2.66 1.905A9.76 9.76 0 0 0 1.5 12c0 .898.121 1.768.35 2.595.341 1.24 1.518 1.905 2.659 1.905h1.93l4.5 4.5c.945.945 2.561.276 2.561-1.06V4.06ZM18.584 5.106a.75.75 0 0 1 1.06 0c3.808 3.807 3.808 9.98 0 13.788a.75.75 0 0 1-1.06-1.06 8.25 8.25 0 0 0 0-11.668.75.75 0 0 1 0-1.06Z" />
                            <path d="M15.932 7.757a.75.75 0 0 1 1.061 0 6 6 0 0 1 0 8.486.75.75 0 0 1-1.06-1.061 4.5 4.5 0 0 0 0-6.364.75.75 0 0 1 0-1.06Z" />
                        </svg>

                        <div className="w-full relative flex items-center">
                                <input type="range" name="" max={maxVolume} defaultValue={maxVolume} onChange={ev => {
                                    document.getElementById('musicElement').volume = ev.target.value/100
                                    setVolume(ev.target.value)
                                    }} className="music-range w-full h-1 absolute z-2" id="music-range" />
                                <label htmlFor="music-range" className="music-track bg-white hover:bg-main block h-1 absolute t-0 z-1 rounded-full" style={{ width:volume/maxVolume*100 +"%" }}></label>
                                <span className="block w-full h-1 bg-tertiary rounded-full"></span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="h-full w-full text-secondary flex sm:hidden items-center justify-end flex-col ">
            {music.path ? (
                <div className="p-2 w-full h-fit">
                    <div className="h-[65px] w-full bg-blue-800 rounded-md flex items-center justify-between px-2 gap-2">
                        <div className="flex items-center gap-2 w-8/12">
                            <div className="w-[55px] rounded-md aspect-square flex items-center justify-center overflow-hidden shrink-0">
                                <img className="object-cover w-full h-full" src={"http://localhost:4000/" + music.thumbnailPath} alt=""/>
                            </div>

                            <div className="w-7/10 flex flex-col">
                                <Link to={'/music/'+music._id} className="hover:underline text-white truncate">{music.name}</Link>
                                <Link to={'/artist/'+music.artist._id} className="hover:underline">{music.artist.username}</Link>
                            </div>
                        </div>

                        <div className="flex text-white gap-2 w-3/12 justify-center">
                            <button onClick={()=>{
                                handleQueueMusic(music)
                                handleModal('playlists')
                                }}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-8">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                </svg>
                            </button>

                            <button onClick={() => {
                                handleIsPlaying()
                                }}>
                                {isPlaying ? (
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-8">
                                        <path fillRule="evenodd" d="M6.75 5.25a.75.75 0 0 1 .75-.75H9a.75.75 0 0 1 .75.75v13.5a.75.75 0 0 1-.75.75H7.5a.75.75 0 0 1-.75-.75V5.25Zm7.5 0A.75.75 0 0 1 15 4.5h1.5a.75.75 0 0 1 .75.75v13.5a.75.75 0 0 1-.75.75H15a.75.75 0 0 1-.75-.75V5.25Z" clipRule="evenodd" />
                                    </svg>
                                ): (
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-8">
                                        <path fillRule="evenodd" d="M4.5 5.653c0-1.427 1.529-2.33 2.779-1.643l11.54 6.347c1.295.712 1.295 2.573 0 3.286L7.28 19.99c-1.25.687-2.779-.217-2.779-1.643V5.653Z" clipRule="evenodd" />
                                    </svg>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            ):(
                ''
            )}
                <div className="flex items-center justify-around w-full h-[79px] bg-black/80">
                    <Link to={'/'} className={pathname === '/' ? "flex items-center flex-col text-white " : "flex items-center flex-col hover:text-white"} >
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                                <path d="M11.47 3.841a.75.75 0 0 1 1.06 0l8.69 8.69a.75.75 0 1 0 1.06-1.061l-8.689-8.69a2.25 2.25 0 0 0-3.182 0l-8.69 8.69a.75.75 0 1 0 1.061 1.06l8.69-8.689Z" />
                                <path d="m12 5.432 8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 0 1-.75-.75v-4.5a.75.75 0 0 0-.75-.75h-3a.75.75 0 0 0-.75.75V21a.75.75 0 0 1-.75.75H5.625a1.875 1.875 0 0 1-1.875-1.875v-6.198a2.29 2.29 0 0 0 .091-.086L12 5.432Z" />
                            </svg>
                        </div>
                        <p>Home</p>
                    </Link>

                    <Link to={'/search/recent'} className={pathname === '/search/recent' ? "flex items-center flex-col text-white " : "flex items-center flex-col hover:text-white"} >
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                                <path fillRule="evenodd" d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <p>Search</p>
                    </Link>

                    <Link to={'/playlist'} className={pathname === '/playlist' || pathname === '/playlist/' ? "flex items-center flex-col text-white " : "flex items-center flex-col hover:text-white"} >
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                                <path d="M5.625 3.75a2.625 2.625 0 1 0 0 5.25h12.75a2.625 2.625 0 0 0 0-5.25H5.625ZM3.75 11.25a.75.75 0 0 0 0 1.5h16.5a.75.75 0 0 0 0-1.5H3.75ZM3 15.75a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75a.75.75 0 0 1-.75-.75ZM3.75 18.75a.75.75 0 0 0 0 1.5h16.5a.75.75 0 0 0 0-1.5H3.75Z" />
                            </svg>
                        </div>
                        <p>Collection</p>
                    </Link>

                    <button className="flex items-center flex-col hover:text-white" onClick={(ev) => {handleModal('playlist')}}>
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                                <path fillRule="evenodd" d="M12 3.75a.75.75 0 0 1 .75.75v6.75h6.75a.75.75 0 0 1 0 1.5h-6.75v6.75a.75.75 0 0 1-1.5 0v-6.75H4.5a.75.75 0 0 1 0-1.5h6.75V4.5a.75.75 0 0 1 .75-.75Z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <p>Create</p>
                    </button>
                </div>
            </div>
        </div>
    )
}