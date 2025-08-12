import { Link, useOutletContext } from "react-router-dom";
import Mixes from "../components/Mixes";
import { useMeasure } from "@uidotdev/usehooks";
import RecentPlayed from "../components/RecentPlayed";
import { useContext } from "react";
import { UserContext } from "../UserContext";


export default function IndexPage(){
    const [ref, {width}] = useMeasure();
    const {ready, user} = useContext(UserContext);
    const {playlists} = useOutletContext();

    if(!ready){
        return 'Loading....';
    }

    function gridHandle(width){
        if(width >= 1700) return 'grid-cols-6'

        if(width >= 1400) return 'grid-cols-5'

        if(width >= 825) return 'grid-cols-4'

        if(width >= 620) return 'grid-cols-3'

        if(width >= 0) return 'grid-cols-2'
    }

    return(
        <>
            <span className="absolute h-[200px] w-full bg-gradient-to-b from-main/30 to-transparent z-0"></span>

            <div className="z-1 w-full h-full pl-4 md:pl-10 md:py-6 pt-6" ref={ref}>
                <div className="flex items-center justify-start h-fit gap-4">
                    <Link to={'/artist'} className="overflow-hidden h-10 aspect-square flex sm:hidden rounded-full border-main border">
                        <img className="object-cover w-10 rounded-full" src={user.profilePath ?  "http://localhost:4000/"+user.profilePath: "https://picsum.photos/200/400"} alt="" />
                    </Link>
                    <span className="px-2 sm:px-4 py-1 sm:py-2 text-sm bg-white rounded-full">All</span>
                    <span className="px-2 sm:px-4 py-1 sm:py-2 text-sm text-white bg-white/20 rounded-full">Musics</span>
                    <span className="px-2 sm:px-4 py-1 sm:py-2 text-sm text-white bg-white/20 rounded-full">Podcasts</span>
                </div>

                <div className= {`grid ${gridHandle(width)} w-full gap-2 mt-6 text-white pr-4 md:pr-10`}>
                    {user.history.length > 0 && [...user.history].reverse().map((history, index) => (
                        <RecentPlayed key={index} data={history}/>
                    ))}
                </div>

                <div className="mt-5">
                    <p className="text-white font-bold text-2xl">Your Playlists</p>
                    <Mixes datas={playlists}/>
                </div>
            </div>
        </>
    )
}