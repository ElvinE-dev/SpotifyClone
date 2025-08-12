import { useCallback, useState } from "react"
import Modal from '../Modal'
import axios from "axios"
import debounce from 'lodash.debounce'

export default function AdminPage(){
    const [name, setName] = useState('')
    const [artistId, setArtistId] = useState('')
    const [album, setAlbum] = useState('')
    const [file, setFile] = useState([]);
    const [credits, setCredits] = useState([])
    const [credit, setCredit] = useState({})
    const [searchResult, setSearchResult] = useState([]);
    const [release, setRelease] = useState('')
    const [thumbnail, setThumbnail] = useState([]);
    const [lyric, setLyric] = useState('');

    function submitCredit(credit){
        if(Object.keys(credit).length > 1) {
            setCredits((prev) => [...prev, credit])
        }
        setCredit({}) // reset
    }
    function submitMusic(ev){
        ev.preventDefault();

        axios.post('/submit-music', {name, artistId, album, credits, music:file[0], release, thumbnail:thumbnail[0], lyric}, {
            headers: {
                "Content-Type": 'multipart/form-data',
            }
        })
        // .then(res => setMessage(res.data.message))
    }

    const search = useCallback(
        debounce(async (value) => {
            axios.get('/artists/'+value).then(res => {
                setSearchResult(res.data)
            });
        }, 300), []
    )

    

    return(
        <div className="w-full h-full flex flex-col p-2"> 
            <form className="flex flex-col text-white gap-2"  onSubmit={submitMusic} encType="multipart/form-data">
                <div>
                    <p>Music Name</p>
                    <input type="text" className="border border-secondary px-4 py-2" onChange={(ev) => {setName(ev.target.value)}}/>
                </div>

                <div>
                    <p>Artist Name</p>
                    <input type="text" placeholder="search name here..." className="border border-secondary px-4 py-2" onChange={(ev) => {search(ev.target.value)}}/>
                </div>

                <select className="flex flex-col bg-tertiary text-white" onChange={(ev) => {
                    setArtistId(ev.target.value)
                    console.log(ev.target.value)
                    }}>
                    {searchResult.length > 0 && searchResult.map((artist, index) => (
                        <option key={index} className="w-full h-[35px] p-2 flex " selected={index === 1 ? true : false} value={artist._id}>
                            {artist.username}
                        </option>
                    ))}
                </select>
                
                <div>
                    <p>Album Name</p>
                    <input type="text" className="border border-secondary px-4 py-2" onChange={(ev) => {setAlbum(ev.target.value)}}/>
                </div>

                <div>
                    <p>Release Year</p>
                    <input type="number" max={2025} className="border border-secondary px-4 py-2" onChange={(ev) => {setRelease(ev.target.value)}}/>
                </div>

                <div>
                    <p>Lyric</p>
                    <textarea type="text" name="" value={lyric} id="" className="border border-secondary p-2 resize-none w-full h-30" onChange={(ev) => {setLyric(ev.target.value)}}/>
                </div>

                <div>
                    <p>Music File</p>
                    <input type="file" className="border border-secondary p-2" name="music" id="" onChange={(ev) => {setFile([ev.target.files[0]])}}/>
                </div>

                <div>
                    <p>Thumbnail</p>
                    <input type="file" name="thumbnail" id="" className="border border-secondary p-2" onChange={(ev) => {setThumbnail([ev.target.files[0]])}}/>
                </div>
                <button className="w-full p-2 bg-main rounded-full">Add Music</button>
            </form>

            <form action="" className="flex flex-col gap-4" onSubmit={(ev) =>{
                ev.preventDefault()
                submitCredit(credit)
                }}>
                <h1 className="text-2xl text-white font-bold">Credits</h1>

                <div className="flex w-full gap-2 text-white">
                    <input type="text" value={credit.name|| ''} className="border rounded-md border-secondary px-4 py-2 w-1/2" onChange={(ev) => {setCredit((prev) => ({...prev, name:ev.target.value}))}}/>
                    <input type="text" value={credit.role || ''} className="border rounded-md border-secondary px-4 py-2 w-1/2" onChange={(ev) => {setCredit((prev) => ({...prev, role:ev.target.value}))}}/>
                </div>

                <div className="flex flex-col bg-tertiary">
                    <div className="w-full h-[35px] p-2 flex ">
                        <p className="text-secondary w-1/2">Artist</p>
                        <p className="text-secondary w-1/2">Role</p>
                    </div>
                    {credits.length > 0 && credits.map((credit, index) => (
                        <div key={index} className="w-full h-[35px] p-2 flex ">
                            <p className="text-secondary w-1/2">{credit.name}</p>
                            <p className="text-secondary w-1/2">{credit.role}</p>
                        </div>
                    ))}
                </div>

                <button className="w-full p-2 bg-main rounded-full">Add Credit</button>
            </form>
        </div>
    )
}