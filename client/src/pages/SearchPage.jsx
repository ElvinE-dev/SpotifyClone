import { Link } from "react-router-dom";
import { useMeasure } from "@uidotdev/usehooks";
import { useEffect } from "react";

export default function SearchPage(){
    const [ref, {width}] = useMeasure(); 
    
    function gridHandle(width){
        if(width >= 1700) return 'grid-cols-6'

        if(width >= 1400) return 'grid-cols-5'

        if(width >= 825) return 'grid-cols-4'

        if(width >= 620) return 'grid-cols-3'

        if(width >= 0) return 'grid-cols-2'
    }
    return (
        <div ref={ref} className="w-full min-h-screen">
            <div className="w-full h-[79px] bg-primary text-white flex flex-col justify-center py-2 px-4">
                <div className="flex items-center">
                    <div className="flex items-center gap-4">
                        <Link to={'/profile'} className="w-10 aspect-square rounded-full overflow-hidden fles items-center justify-center">
                            <img className="object-cover w-full" src="https://picsum.photos/200/300" alt="" />
                        </Link>

                        <h1 className="text-2xl font-bold">Search</h1>
                    </div>
                </div>
            </div>

            <div className="sticky top-0 w-full h-[79px] bg-primary text-white flex flex-col justify-center py-2 px-4">
                <Link to={'/search/recent'} className="p-2 bg-white w-full h-[40px] text-primary rounded-md flex items-center gap-2">
                    <div>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                            <path fillRule="evenodd" d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z" clipRule="evenodd" />
                        </svg>
                    </div>

                    <p className="font-semibold">Search Music</p>
                </Link>
            </div>

            <div className={` ${gridHandle(width)} grid w-full p-4 gap-2`}>
                <Link to={'/genre/a'} className="w-full h-[120px] bg-white rounded-md flex relative overflow-hidden">
                    <div className="h-full flex items-start justify-start p-2 w-7/10">
                        <p className="font-bold text-md sm:text-xl">Genre Genre Genre Genre</p>
                    </div>

                    <div className="w-[90px] sm:w-4/10 aspect-square absolute -bottom-3 -right-3 rotate-z-12 flex items-center justify-center overflow-hidden">
                        <img className="object-cover w-full" src="https://picsum.photos/200/200" alt=""/>
                    </div>
                </Link>
            </div>
        </div>
    )
}