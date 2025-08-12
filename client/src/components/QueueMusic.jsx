import { Link } from "react-router-dom";
import { handleMenuPopup, handleQueueMusic } from "../utils";

export default function({setPosition, data}){
    
    return(
        <>
        {data && (
        <div className="group w-full h-17 hover:bg-tertiary rounded-md p-2 flex items-center gap-2 justify-between">
            <div className="h-full flex items-center gap-2 w-9/12" onContextMenu={(ev) => handleMenuPopup(ev, setPosition)}>
                <div className="h-full aspect-square overflow-hidden rounded-md flex items-center justify-center shrink-0">
                    <img className="object-cover h-full w-full" src={data.thumbnailPath ? 'http://localhost:4000/'+data.thumbnailPath : "https://picsum.photos/200/300"} alt=""/>
                </div>

                <div className="w-8/12 flex flex-col">
                    <Link to={'/music/'+data._id} className="hover:underline text-main truncate">{data.name}</Link>
                    <Link to={'/artist/'+data.artist._id} className="hover:underline text-secondary text-sm">{data.artist.username}</Link>
                </div>
            </div>

            <div className="group-hover:block hidden">
                <button className=" flex justify-end text-white hover:bg-secondary/20 p-2 rounded-full" onClick={(ev) => {
                    handleMenuPopup(ev, setPosition)
                    handleQueueMusic(data)
                    }} id="">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                    </svg>
                </button>
            </div>
        </div>
        )}
        </>
    )
}