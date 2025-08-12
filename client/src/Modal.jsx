import axios from "axios";
import { handleModal } from "./utils";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "./UserContext";
import { Navigate } from "react-router-dom";
import { MusicContext } from "./MusicContext";

export default function Modal({formVisible, playlists}){

    const [name, setName]= useState('');
    const [description, setDescription] = useState('');
    const {user,ready} = useContext(UserContext);
    const {music, queueMusic} = useContext(MusicContext);
    const [file, setFile] = useState([]);

    const [profile, setProfile] = useState([]);

    const [userDescription, setUserDescription] = useState('')


    const [selectedPlaylist, setSelectedPlaylist] = useState('')

    if(ready && !user){
        return <Navigate to={'/login'} />
    }

    function createPlaylist(ev){
        ev.preventDefault();

        axios.post('/create-playlist', {name, description, maker:user._id, playlist:file[0]}, {
            headers: {
                'Content-Type' : 'multipart/form-data'
            }
        })
    }

    function addIntoPlaylist(ev){
        ev.preventDefault();

        axios.post('/add-to-playlist', {selectedPlaylist, music:queueMusic})
    }

    function updateUser(ev){
        ev.preventDefault();

        axios.post('/update-profile', {profile:profile[0], userDescription}, {
            'headers' : {
                'Content-Type' : 'multipart/form-data'
            }
        });
    }

    function setForm(formVisible){
        if(formVisible === 'playlist'){
            return (
                <form onSubmit={createPlaylist} encType="multipart/form-data" className=" w-11/12 sm:w-130 h-130 sm:h-105 bg-primary z-12 text-white flex p-4 flex-col gap-4 justify-around">
                    <div className="flex justify-between">
                        <p className="font-bold text-2xl">Add Playlist</p>

                        <div className="cursor-pointer" onClick={(ev) => handleModal('')}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                                <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
                            </svg>
                        </div>
                    </div>

                    <div className="flex flex-col gap-4 sm:gap-2 overflow-y-auto modal-form">
                        <div className="flex items-center justify-between gap-4 flex-col sm:flex-row">
                            <label htmlFor="image-upload" className="h-45 aspect-square overflow-hidden flex items-center justify-center rounded-md shadow-[0_0_100px_rgba(0,0,0,0.4)]">
                                <img src="https://picsum.photos/200/300" alt="" className="object-cover"/>
                            </label>

                            <input type="file" onChange={(ev) =>{setFile([ev.target.files[0]])}} name="playlist" id="image-upload" hidden/>

                            <div className="flex flex-col text-white gap-4.5 grow w-full sm:w-fit">
                                <input onChange={(ev) => {setName(ev.target.value)}} type="text" name="title" className="bg-secondary/20 p-2 h-10" defaultValue={'Playlist'}/>
                                <textarea onChange={(ev) => {setDescription(ev.target.value)}} name="description" id="" className="bg-secondary/20 rounded-md resize-none h-30 p-2"></textarea>
                            </div>

                        </div>

                        <button className="bg-white text-tertiary px-4 py-2 rounded-full grow-0 w-30 self-center sm:self-end">Save</button>
                    </div>

                    <p className="text-xs font-bold">Dengan melanjutkan, berarti kamu setuju untuk memberi Spotify akses ke gambar yang kamu pilih untuk di-upload. Pastikan kamu memiliki hak untuk meng-upload gambar.</p>
                </form>
            )
        }else if(formVisible === 'playlists'){
            return(
                <form onSubmit={addIntoPlaylist} encType="multipart/form-data" className=" w-11/12 sm:w-130 h-130 sm:h-105 bg-primary z-12 text-white flex p-4 flex-col gap-4 justify-around">
                    <select name="" id="" className="bg-tertiary" onChange={(ev) => {
                        setSelectedPlaylist(ev.target.value)
                        console.log(ev.target.value)
                        console.log(queueMusic)
                    }}>
                        
                        {playlists.length && playlists.map(playlist => (
                            <option value={playlist._id}>{playlist.name}</option>
                        ))}
                    </select>

                    <button className="px-4 py-2 bg-white text-tertiary w-fit rounded-full">Save</button>
                </form>
            )
        }else if(formVisible === 'profile'){
            return(
                <form encType="multipart/form-data" onSubmit={updateUser} className=" w-11/12 sm:w-130 h-130 sm:h-105 bg-primary z-12 text-white flex p-4 flex-col gap-4 justify-around">

                    <p>PROFILE</p>

                    <div className="w-full flex">
                        <input type="file" className="px-4 py-2 border border-secondary rounded-sm" name="profile" id="" onChange={(ev) => {setProfile([ev.target.files[0]])}} />
                        <textarea type="text" className="px-4 py-2 border border-secondary rounded-sm resize-none" onChange={(ev) => {setUserDescription(ev.target.value)}}/>
                    </div>

                    <button className="px-4 py-2 bg-white text-tertiary w-fit rounded-full">Save</button>
                </form>
            )
        }else if(formVisible === 'credits'){
            return(
                <div className=" w-11/12 sm:w-130 h-130 sm:h-105 bg-primary z-12 text-white flex p-4 flex-col gap-4">
                    <div className="flex justify-between border-b border-secondary pb-4">
                        <p className="font-bold text-2xl">Credits</p>

                        <div className="cursor-pointer" onClick={(ev) => handleModal('')}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                                <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
                            </svg>
                        </div>
                    </div>

                    <div className=" text-2xl gap-4">{queueMusic.name}</div>
                    {queueMusic.credits.length > 0 && queueMusic.credits.map(credit => (
                        <div className="">
                            <h1 className="font-bold text-2xl">{credit.role}</h1>
                            <p className="font-bold text-md text-secondary">{credit.name}</p>
                        </div>
                    ))}
                </div>
            )
        }
    }

    return(
        <div className="fixed w-screen h-screen top-0 left-0 flex flex-col bg-black/20 items-center justify-center z-11">
                <span className="w-screen h-screen z-11 absolute" onClick={(ev) => handleModal('')}></span>
                {setForm(formVisible)}
        </div>
    )
}