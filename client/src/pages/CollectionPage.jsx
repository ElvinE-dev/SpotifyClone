import { Link } from "react-router-dom";
import Playlist from "../components/Playlist";
import { handleModal } from "../utils";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { UserContext } from "../UserContext";

export default function CollectionPage(){
    const [playlists, setPlaylists] = useState([]);
    const {user, ready} = useContext(UserContext);
    useEffect(() => {
        axios.get('/get-playlist').then(res => {
            setPlaylists(res.data);
        })
    }, [])


    if(!ready){
        return 'Loading....'
    }


    return(
        <div className="flex flex-col w-full">
            <div className="sticky top-0 z-16 w-full h-[79px] bg-primary shadow-sm shadow-black text-white flex flex-col justify-center py-2 px-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link to={'/artist'} className="w-10 aspect-square rounded-full overflow-hidden fles items-center justify-center">
                            <img className="object-cover w-full h-full" src={user.profilePath ? "http://localhost:4000/"+user.profilePath : "https://picsum.photos/200/300"} alt="" />
                        </Link>

                        <h1 className="text-2xl font-bold">Your Collection</h1>
                    </div>

                    <div className="flex items-center gap-4">
                        <Link to={'/search/recent'}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                                <path fillRule="evenodd" d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z" clipRule="evenodd" />
                            </svg>
                        </Link>

                        <button onClick={() => {handleModal('playlist')}}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                                <path fillRule="evenodd" d="M12 3.75a.75.75 0 0 1 .75.75v6.75h6.75a.75.75 0 0 1 0 1.5h-6.75v6.75a.75.75 0 0 1-1.5 0v-6.75H4.5a.75.75 0 0 1 0-1.5h6.75V4.5a.75.75 0 0 1 .75-.75Z" clipRule="evenodd" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
            <div className="album-container flex flex-col gap-2 overflow-auto p-2  h-full w-full overflow-y-auto">
                {playlists.length > 0 && playlists.map((playlist,index) => (
                    <Playlist data={playlist} key={index}/>
                ))}
            </div>
        </div>
    )
}