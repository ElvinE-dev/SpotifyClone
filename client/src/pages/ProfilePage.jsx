import { useContext } from "react";
import Mixes from "../components/Mixes";
import { UserContext } from "../UserContext";
import { copyToClipboard, handleModal } from "../utils";
import { useOutletContext } from "react-router-dom";

export default function ProfilePage(){
    const {user, ready} = useContext(UserContext)
    const {playlists} = useOutletContext();


    if(!ready){
        return 'Loading...'
    }

    
    return(
        <div className="h-full w-full flex flex-col">
            <div className="flex bg-gradient-to-b from-secondary to-transparent h-1/3 w-full p-5 items-center text-white gap-4 ">
                <div className="flex w-30 h-30 md:w-45 md:h-45 shrink-0 overflow-hidden">
                    <img className="object-cover w-full h-full rounded-full" src={user.profilePath ?  "http://localhost:4000/"+user.profilePath: "https://picsum.photos/200/400"} alt="" />
                </div>

                <div className="flex flex-col gap-3 w-1/2" >
                    <h1>Profile</h1>
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold break-all">{user.username}</h1>
                    <p className="text-xs text-secondary">{user.description}</p>
                    <p className="text-secondary">{playlists.length} Playlist</p>
                </div>
            </div>
            <div className="flex h-2/3 w-full bg-gradient-to-b from-secondary/5 to-30% to-transparent flex-col">
                <div className="text-secondary mx-8 my-4 flex h-fit sm:h-10 gap-4 items-start sm:items-center flex-col sm:flex-row">
                    <button onClick={() => {handleModal('profile')}} className="flex items-center justify-center rounded-full hover:text-white transition gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                        </svg>

                        <span>Edit profile</span>
                    </button>

                    <span className="w-8/12 h-[1px] sm:w-[1px] sm:h-8/12 bg-secondary/20"></span>

                    <button onClick={() => {
                        copyToClipboard(`http://localhost:5173/artist/${user._id}`)
                    }} className="flex items-center justify-center rounded-full hover:text-white transition gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.666 3.888A2.25 2.25 0 0 0 13.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 0 1-.75.75H9a.75.75 0 0 1-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 0 1-2.25 2.25H6.75A2.25 2.25 0 0 1 4.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 0 1 1.927-.184" />
                        </svg>

                        <span>Copy profile URL</span>
                    </button>
                </div>

                <div className="flex flex-col pl-6 mt-5">
                    <h1 className="text-white font-bold text-3xl pl-2">Playlists</h1>
                    <Mixes datas={playlists}/>

                </div>
            </div>
        </div>
    )
}