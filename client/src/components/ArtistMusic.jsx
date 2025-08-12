import { Link } from "react-router-dom";

export default function ArtistMusic({music, index}){
    
    function formatDuration(secs) {
        const minutes = Math.floor(secs / 60);
        const seconds = secs % 60;
        return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    }

    return(
        <div className="flex items-center text-secondary gap-2 justify-between p-2 hover:bg-secondary/20 rounded-md">
            <div className="flex items-center gap-4 w-7/12">
                <p>{index}</p>

                <div className="w-10 aspect-square flex items-center justify-center overflow-hidden rounded-md shrink-0">
                    <img src={"http://localhost:4000/"+music.thumbnailPath} alt="" className="object-cover w-full h-full" />
                </div>

                <Link to={'/music/'+music._id} className="text-white truncate hover:underline">{music.name}</Link>
            </div>

            <p>{music.count}</p>

            <div className="flex items-center gap-4 w-4/12 justify-end">
                <div className="text-main">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                        <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" clipRule="evenodd" />
                    </svg>
                </div>

                <p>{formatDuration(music.duration)}</p>
            </div>
        </div>
    )
}