import { useRef, useState } from "react";
import Mix from "./Mix";

export default function Mixes({datas}){
    const playlist = useRef(null);
    const [scrollDistance, setScrollDistance] = useState(0)
    return(
        <div className="flex flex-col gap-4 relative justify-center items-center select-none group/parent">
                    <span className="h-full w-50 bg-gradient-to-l from-black/50 to-transparent absolute -right-0 z-10 pointer-events-none"></span>
                    <button onClick={() => {
                        
                        playlist.current?.scrollWidth - playlist.current?.clientWidth >= scrollDistance + (playlist.current?.children[0].clientWidth*2) ? setScrollDistance(scrollDistance + (playlist.current?.children[0].clientWidth*2)) : ''
                        
                        playlist.current?.scrollTo({left: scrollDistance + (playlist.current?.children[0].clientWidth*2), behavior:'smooth'})

                        }} className="absolute cursor-pointer group-hover/parent:opacity-100 opacity-0 z-11 right-5 w-12.5 rounded-full bg-tertiary aspect-square text-white transition flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                            <path fillRule="evenodd" d="M16.28 11.47a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 0 1-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 0 1 1.06-1.06l7.5 7.5Z" clipRule="evenodd" />
                        </svg>
                    </button>

                    <button onClick={() => {
                        
                        1 <= scrollDistance - (playlist.current?.children[0].clientWidth*2) ? setScrollDistance(scrollDistance - (playlist.current?.children[0].clientWidth*2)) : ''
                        
                        playlist.current?.scrollTo({left: scrollDistance - (playlist.current?.children[0].clientWidth*2), behavior:'smooth'})

                        }} className="absolute cursor-pointer group-hover/parent:opacity-100 opacity-0 z-11 left-5 w-12.5 rounded-full bg-tertiary aspect-square text-white transition flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                            <path fillRule="evenodd" d="M7.72 12.53a.75.75 0 0 1 0-1.06l7.5-7.5a.75.75 0 1 1 1.06 1.06L9.31 12l6.97 6.97a.75.75 0 1 1-1.06 1.06l-7.5-7.5Z" clipRule="evenodd" />
                        </svg>
                    </button>
                    <div className="overflow-x-auto w-full h-full flex items-center playlist" ref={playlist}>

                        {datas.length > 0 && datas.map((data, index) => (
                            <Mix key={index} data={data}/>
                        ))}
                    </div>
                </div>
    )
}