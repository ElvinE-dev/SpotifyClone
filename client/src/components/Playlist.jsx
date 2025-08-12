import { Link, useLocation } from "react-router-dom";

export default function Playlist({isShrink, isOnSideBar, data}){
    let className = ''
    if(!isOnSideBar){
        className += "block"
    }else{
        className += "hidden md:block"
    }

    
    return (
                <Link to={'/playlist/'+data._id} className="flex items-center gap-2 hover:bg-tertiary w-full p-2 rounded-md">
                    <div className="flex w-15 h-15 aspect-square overflow-hidden rounded-md shrink-0">
                        <img className="object-cover w-full h-full" src={data.thumbnailPath ? "http://localhost:4000/"+data.thumbnailPath : "http://localhost:4000/uploads/playlist/default.jpg"} alt="" />
                    </div>

                    {!isShrink && (
                    <div className={className}>
                        <h3 className="text-white">{data.name}</h3>
                        <p className="text-secondary text-sm">{data.musics.length} songs • {data.maker.username}</p>
                    </div>
                    )}

                </Link>
    ) 
}