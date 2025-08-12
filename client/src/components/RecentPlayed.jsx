import { useContext } from "react"
import { handleIsPlaying, handleMusicPlay } from "../utils"
import { MusicContext } from "../MusicContext"
import { Link } from "react-router-dom"

export default function RecentPlayed({data}){
    const {music, isPlaying} = useContext(MusicContext)
    return(
        <div className="group bg-secondary/20 h-12 md:h-15 rounded-md relative transition hover:bg-secondary/30">
            <div className="flex items-center h-full w-full">
                <div className="flex h-full aspect-square overflow-hidden rounded-bl-md rounded-tl-md shrink-0">
                    <img className="object-cover w-full" src={"http://localhost:4000/" + data.thumbnailPath} alt="" />
                </div>

                <div className="p-2">
                    <Link to={'/music/'+data._id} className="hover:underline text-xs font-bold line-clamp-2">{data.name}</Link>
                </div>
            </div>


            {isPlaying && music._id === data._id ? (
                <button onClick={() => {
                    handleIsPlaying(false)
                    }} className="group-hover:flex h-10/12 rounded-full bg-main aspect-square absolute right-2 top-1/2 -translate-y-1/2 text-black hidden items-center justify-center shadow-md shad shadow-black hover:bg-green-300 transition">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                        <path fillRule="evenodd" d="M6.75 5.25a.75.75 0 0 1 .75-.75H9a.75.75 0 0 1 .75.75v13.5a.75.75 0 0 1-.75.75H7.5a.75.75 0 0 1-.75-.75V5.25Zm7.5 0A.75.75 0 0 1 15 4.5h1.5a.75.75 0 0 1 .75.75v13.5a.75.75 0 0 1-.75.75H15a.75.75 0 0 1-.75-.75V5.25Z" clipRule="evenodd" />
                    </svg>
                </button>
            ) : (
                <button onClick={() => {
                    handleMusicPlay(data, true)
                    }} className="group-hover:flex h-10/12 rounded-full bg-main aspect-square absolute right-2 top-1/2 -translate-y-1/2 text-black hidden items-center justify-center shadow-md shad shadow-black hover:bg-green-300 transition">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                        <path fillRule="evenodd" d="M4.5 5.653c0-1.427 1.529-2.33 2.779-1.643l11.54 6.347c1.295.712 1.295 2.573 0 3.286L7.28 19.99c-1.25.687-2.779-.217-2.779-1.643V5.653Z" clipRule="evenodd" />
                    </svg>
                </button>
            )}

        </div>
    )
}