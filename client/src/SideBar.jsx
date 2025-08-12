import { useEffect, useState } from "react"
import Playlist from "./components/Playlist"
import { handleModal } from "./utils"

export default function SideBar({setFormVisible, playlists}){
    const [isShrink, setIsShrink] = useState(false)

    function adjustButtonShrink(isShrink){
        let className = "flex md:justify-between w-full items-center justify-center gap-1"
        if(isShrink){
            return className += " flex-col"
        }else{
            return className+= " flex-row"
        }
    }

    function adjustSideBarWidth(isShrink){
        let className = "album-container flex flex-col gap-2 overflow-auto "
        if(isShrink){
            return className += " w-full"
        }else{
            return className+= " w-full md:w-[250px]"
        }
    }
    //flex-col md:flex-row
    return(
        <div className={"w-fit hidden sm:flex flex-col items-center gap-8 rounded-2xl p-4  h-full bg-primary "}>
            <div className={adjustButtonShrink(isShrink)}>
                
                <button className="text-secondary p-2 cursor-pointer hidden md:block" onClick={() => setIsShrink(!isShrink)}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-8">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
                    </svg>
                </button>


                <button onClick={(ev) => handleModal('playlist')} className="bg-tertiary text-secondary p-2 rounded-full w-10 h-10 text-2xl flex items-center justify-center cursor-pointer hover:text-white hover:bg-secondary/20" >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>

                </button>
            </div>

            <div className={adjustSideBarWidth(isShrink)}>
                {playlists.length > 0 && playlists.map((playlist, index) => (
                    <Playlist isShrink={isShrink} key={index} isOnSideBar={true} data={playlist}/>
                ))}
            </div>
        </div>
    )
}