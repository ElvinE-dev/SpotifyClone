import { useContext } from "react";
import QueueMusic from "./components/QueueMusic";
import Dropdown from "./Dropdown";
import { MusicContext } from "./MusicContext";

export default function Queue({handleMenuPopup, position, setPosition, toggleQueue}){

    const { queue, music } = useContext(MusicContext);
    return(
        <div className="w-full h-full flex gap-4 flex-col mt-2 relative">
            <div className="sticky h-8 py-5 left-0 top-0 w-full bg-primary flex items-center justify-between text-white z-11 mt-2">
                <p className="font-bold">Queue</p>
                <button className="text-white p-2 hover:bg-secondary/20 rounded-full" onClick={toggleQueue}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                        <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
                    </svg>
                </button>
            </div>

            <Dropdown position={position} onClick={setPosition} />

            <div className="flex flex-col w-full">
                <div>
                    <p className="text-white font-bold">Now Playing</p>
                </div>

                <QueueMusic setPosition={setPosition} data={music}/>
            </div>

            <div>
                <p className="text-white font-bold">Upcoming</p>
            </div>

            <div className="flex flex-col w-full">
                {queue.length > 0 && queue.map((queue, index) => (
                    <QueueMusic data={queue} key={index} setPosition={setPosition}/>
                ))}
            </div>
        </div>
    )
}