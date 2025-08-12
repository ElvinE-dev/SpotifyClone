import { useMeasure } from "@uidotdev/usehooks";
import ArtistMusic from "../components/ArtistMusic";
import Mix from "../components/Mix";
import PlaylistMusic from "../components/PlaylistMusic";
import { Link, useParams } from "react-router-dom";
import { useContext, useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { handleIsPlaying, handleMusicPlay, handleQueue } from "../utils";
import { MusicContext } from "../MusicContext";

export default function ArtistPage(){
    const [ref, {width}] = useMeasure();
    const [artist, setArtist] = useState({});
    const {artistId} = useParams();
    const [musics, setMusics] = useState([]);
    const [latest, setLatest] = useState({});
    const {isPlaying} = useContext( MusicContext);
    useEffect(() => {
            axios.get('/artist/'+artistId).then(res => {
                setArtist(res.data);

                axios.get('/get-artist-music/'+res.data._id).then(res => {
                    setMusics(res.data)
                    setLatest(res.data[res.data.length - 1]);
                })
            });


    }, [artistId])

    return (
        <div className="w-full h-full" ref={ref}>
            <div className="bg-tertiary w-full h-5/12 flex items-end text-white font-bold relative">
                <div className="w-full h-full flex items-center justify-center absolute top-0 overflow-hidden">
                    <span className="w-full h-full bg-black absolute opacity-25"></span>
                    <img src={artist.profilePath ?  "http://localhost:4000/"+artist.profilePath: "https://picsum.photos/200/400"} alt="" className="object-cover w-full h-full" />
                </div>
                
                <div className="flex flex-col p-4 gap-2">
                    <p className="text-6xl z-1">{artist.username}</p>
                    {/* <p className="text-md z-1"> {totalCount} Monthly listeners</p> */}
                </div>
            </div>

            {musics.length > 0 ? (
                <div className="px-4 py-2 w-full h-fit flex flex-col">
                    {isPlaying ? (
                        <button onClick={() => {
                            
                            handleIsPlaying(false)
                        }} className="flex w-15 rounded-full bg-main aspect-square text-black items-center justify-center shadow-md shadow-black hover:bg-green-300 transition">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                                <path fillRule="evenodd" d="M6.75 5.25a.75.75 0 0 1 .75-.75H9a.75.75 0 0 1 .75.75v13.5a.75.75 0 0 1-.75.75H7.5a.75.75 0 0 1-.75-.75V5.25Zm7.5 0A.75.75 0 0 1 15 4.5h1.5a.75.75 0 0 1 .75.75v13.5a.75.75 0 0 1-.75.75H15a.75.75 0 0 1-.75-.75V5.25Z" clipRule="evenodd" />
                            </svg>
                        </button>
                    ) : (
                        <div onClick={() => {
                            handleMusicPlay(musics[0], true)
                            handleQueue(musics.slice(1))
                        }}

                        className="flex w-15 rounded-full bg-main aspect-square text-black items-center justify-center shadow-md shadow-black hover:bg-green-300 transition">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                                <path fillRule="evenodd" d="M4.5 5.653c0-1.427 1.529-2.33 2.779-1.643l11.54 6.347c1.295.712 1.295 2.573 0 3.286L7.28 19.99c-1.25.687-2.779-.217-2.779-1.643V5.653Z" clipRule="evenodd" />
                            </svg>
                        </div>
                    )}

                    

                    <div className={`w-full h-fit flex ${width < 1100 ? 'flex-col' : ''} gap-4 mt-4 pb-50`}>
                        <div className={`flex text-white flex-col ${width < 1100 ? '' : 'w-7/12'}`}>
                            <h1 className="text-2xl font-bold">Popular</h1>
                
                            <div className="flex flex-col px-4 py-2 w-full gap-2 ">
                                {musics.length > 0 && musics.map((music, index) => (
                                    <ArtistMusic music={music} index={index+1} key={music._id}/>
                                ))}
                            </div>
                        </div>

                        <div className="flex text-white flex-col gap-2">

                            {latest?.name !== undefined&& (
                                <>
                                    <h1 className="text-2xl font-bold">Latest Release</h1>
                                    <div className="flex items-center justify-center w-80 h-60 overflow-hidden rounded-md relative">
                                        <img src={"http://localhost:4000/"+ latest.thumbnailPath} alt="" className="object-cover w-full h-full" />

                                        <span className="absolute w-full h-full bg-gradient-to-t from-primary to-transparent top-0 flex items-end p-2">
                                            <div className="flex items-center gap-2">
                                                <div className="w-20 aspect-square rounded-md overflow-hidden flex items-center justify-center">
                                                    <img src={"http://localhost:4000/"+ latest.thumbnailPath} alt="" className="object-cover w-full h-full" />
                                                </div>

                                                <div className="flex justify-center flex-col">
                                                    <Link to={'/music/'+latest._id} className="text-md hover:underline">{latest.name}</Link>
                                                    <p className="text-secondary text-sm">Single</p>
                                                </div>
                                            </div>
                                        </span>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>

                </div>
            ): (
                <div className="h-[120px] w-full flex items-center justify-center">
                    <p className="text-white">This user has not posted any music</p>
                </div>
            )}
        </div>
    )
}