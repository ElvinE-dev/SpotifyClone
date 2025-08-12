import { useCallback, useContext, useEffect, useState } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { UserContext } from "./UserContext";
import HistoryMusic from "./components/HistoryMusic";
import debounce from "lodash.debounce";
import axios from "axios";

export default function Header(){
    const {pathname} = useLocation();
    const {ready, user} = useContext(UserContext);
    const navigate = useNavigate();

    const searchQuery = useCallback(
        debounce((value) => {
            navigate('/search/recent/'+encodeURIComponent(value))
        }, 500)
    )
    if(!ready){
        return 'Loading....'
    }

    if(ready && !user){
        return <Navigate to={'/login'}/>
    }

    return(
        <div className="hidden text-white h-1/12 sm:flex items-center justify-between w-full py-2 px-8 shr" id="header">
            <div className="flex items-center justify-between w-full">
            <Link to={'/'} className="text-white">
                <svg xmlns="http://www.w3.org/2000/svg" className="size-8" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0m3.669 11.538a.5.5 0 0 1-.686.165c-1.879-1.147-4.243-1.407-7.028-.77a.499.499 0 0 1-.222-.973c3.048-.696 5.662-.397 7.77.892a.5.5 0 0 1 .166.686m.979-2.178a.624.624 0 0 1-.858.205c-2.15-1.321-5.428-1.704-7.972-.932a.625.625 0 0 1-.362-1.194c2.905-.881 6.517-.454 8.986 1.063a.624.624 0 0 1 .206.858m.084-2.268C10.154 5.56 5.9 5.419 3.438 6.166a.748.748 0 1 1-.434-1.432c2.825-.857 7.523-.692 10.492 1.07a.747.747 0 1 1-.764 1.288"/>
                </svg>
            </Link>

            <div className="searchBox flex items-center justify-center text-white h-full grow gap-2 px-8 xl:absolute xl:left-1/2 xl:-translate-x-1/2 min-w-[400px] xl:min-w-[450px]">
                <Link to={'/'} className="text-white bg-tertiary rounded-full p-2">
                    {pathname === "/" ? (
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-7">
                            <path d="M11.47 3.841a.75.75 0 0 1 1.06 0l8.69 8.69a.75.75 0 1 0 1.06-1.061l-8.689-8.69a2.25 2.25 0 0 0-3.182 0l-8.69 8.69a.75.75 0 1 0 1.061 1.06l8.69-8.689Z" />
                            <path d="m12 5.432 8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 0 1-.75-.75v-4.5a.75.75 0 0 0-.75-.75h-3a.75.75 0 0 0-.75.75V21a.75.75 0 0 1-.75.75H5.625a1.875 1.875 0 0 1-1.875-1.875v-6.198a2.29 2.29 0 0 0 .091-.086L12 5.432Z" />
                        </svg>
                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-7">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                        </svg>
                    )}

                </Link>

                <div className="flex items-center text-secondary w-full relative">
                    <label htmlFor="search" className="bg-tertiary rounded-tl-full rounded-bl-full py-2 pr-2 pl-4">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-7">
                            <path fillRule="evenodd" d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z" clipRule="evenodd" />
                        </svg>
                    </label>

                    <input type="text" className="bg-tertiary p-2.5 w-full outline-0 " id="search" onChange={(ev) => {
                        searchQuery(ev.target.value);
                        }}/> 
                    
                    <div className="history-search w-full h-fit absolute top-10 bg-tertiary rounded-sm shadow-xl hidden">
                        {user.searchHistory.length > 0 && user.searchHistory.map((history, index) => {
                            
                            if(index > 2){
                                return ;
                            }else{
                                return <HistoryMusic data={history} key={index}/>
                            }
                        
                        })}
                    </div>

                    <span className="bg-tertiary py-1.5 pr-4 pl-2 flex items-center gap-2 rounded-br-full rounded-tr-full">
                        <span className=" w-[1px] h-8 bg-secondary"></span>
                        {pathname === '/search/recent' ||pathname === '/search/recent/' ? (
                            <Link to={'/'}>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-7 text-white">
                                    <path d="M3.375 3C2.339 3 1.5 3.84 1.5 4.875v.75c0 1.036.84 1.875 1.875 1.875h17.25c1.035 0 1.875-.84 1.875-1.875v-.75C22.5 3.839 21.66 3 20.625 3H3.375Z" />
                                    <path fillRule="evenodd" d="m3.087 9 .54 9.176A3 3 0 0 0 6.62 21h10.757a3 3 0 0 0 2.995-2.824L20.913 9H3.087Zm6.163 3.75A.75.75 0 0 1 10 12h4a.75.75 0 0 1 0 1.5h-4a.75.75 0 0 1-.75-.75Z" clipRule="evenodd" />
                                </svg>
                            </Link>
                        ) : (
                            <Link to={'/search/recent'}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-7">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z" />
                                </svg>
                            </Link>
                        )}

                    </span>
                </div>

            </div>

            <div className="flex items-center justify-center text-secondary gap-4">
                <span className="bg-white text-black py-1.5 px-4 rounded-full font-bold text-sm md:text-md">Explore Premium</span>
                <span className="flex font-bold gap-1 hover:text-white justify-center items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 shrink-0">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m9 12.75 3 3m0 0 3-3m-3 3v-7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>

                    Download Apps
                </span>

                <Link to={'/artist'} className="flex min-w-8 aspect-square overflow-hidden rounded-full shrink-0 bg-tertiary p-2">
                    <img className="object-cover w-10 rounded-full" src={user.profilePath ?  "http://localhost:4000/"+user.profilePath: "https://picsum.photos/200/400"} alt="" />
                </Link>
            </div>
            </div>
        </div>
    )
}