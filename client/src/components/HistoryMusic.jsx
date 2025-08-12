import { Link } from "react-router-dom";

export default function HistoryMusic({data}){
    return (
        <div className="w-full h-[71px] flex items-center gap-2 justify-between group cursor-pointer hover:bg-secondary/20 p-2 rounded-md">
            <div className="flex gap-2 h-full w-11/12">
                <div className="h-full aspect-square overflow-hidden flex items-center justify-center rounded-md relative">
                    <span className="  group-hover:opacity-100 opacity-0 w-full h-full bg-black/20 absolute top-0 flex items-center justify-center text-white">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-8">
                            <path fillRule="evenodd" d="M4.5 5.653c0-1.427 1.529-2.33 2.779-1.643l11.54 6.347c1.295.712 1.295 2.573 0 3.286L7.28 19.99c-1.25.687-2.779-.217-2.779-1.643V5.653Z" clipRule="evenodd" />
                        </svg>
                    </span>
                    <img className="object-cover w-full h-full z-0" src={data.thumbnailPath ? "http://localhost:4000/" + data.thumbnailPath : "https://picsum.photos/200/300"} alt="" />
                </div>

                <div className="h-full flex justify-center flex-col">
                    <Link to={'/music/'+data._id}><p className="text-white truncate hover:underline">{data.name}</p></Link>
                    <Link to={'/artist/'+data.artist._id}><p className="text-secondary truncate hover:underline">{data.artist.username}</p></Link>
                </div>
            </div>

            <button className="text-secondary hover:text-white">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                    <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
                </svg>
            </button>
        </div>
    )
}