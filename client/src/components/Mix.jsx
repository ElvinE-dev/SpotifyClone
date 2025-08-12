import { Link } from "react-router-dom";
import { handleMusicPlay, handleQueue } from "../utils";
import PlaylistPlay from "./PlaylistPlay";

export default function Mix({data}){
    return (
        <div className="group flex-col flex items-start justify-center p-2 hover:bg-secondary/20 rounded-md gap-2 relative w-fit">
            <Link to={'/playlist/'+data._id} className="w-28 lg:w-35 xl:w-45 aspect-square overflow-hidden rounded-md flex items-center justify-center">
                <img className="object-cover w-full h-full" src={data.thumbnailPath ? "http://localhost:4000/"+data.thumbnailPath : "http://localhost:4000/uploads/playlist/default.jpg"} alt="" />
            </Link>

            <Link to={'/artist/'+data.maker._id} className="text-secondary text-sm hover:underline">{data.maker.username}</Link>

            <PlaylistPlay data={data} type={'mix'} />
        </div>
    )
}