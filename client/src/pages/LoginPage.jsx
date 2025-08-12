import { useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from 'axios';
import { useState } from "react";
import { useContext } from "react";
import { UserContext } from "../UserContext";

export default function LoginPage(){
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [redirect, setRedirect] = useState(false)
    const {setUser} = useContext(UserContext);
    const [ready, setReady] = useState(true);

    async function Login(ev){
        ev.preventDefault();
        setReady(false)
        try{
            const {data} = await axios.post('/login', {email, password})
            
            setUser(data)
            setReady(true)
            
            setRedirect(true)
            
        }catch(err){
            console.log(err)
            setReady(true)
        }
    }

    if(redirect){
        return window.location.href = '/';
    }
    return (
        <div className="w-screen h-screen bg-gradient-to-b from-tertiary to-black text-white p-8 flex items-center justify-center">
            <div className="px-40 py-8 bg-primary rounded-md">
                <div className="flex items-center justify-center flex-col gap-10 w-90 ">
                    <div className="w-full flex flex-col gap-8">
                        <div className="flex items-center flex-col justify-center gap-4">
                            <div>
                                <svg xmlns="http://www.w3.org/2000/svg" className="size-8" fill="currentColor" viewBox="0 0 16 16">
                                    <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0m3.669 11.538a.5.5 0 0 1-.686.165c-1.879-1.147-4.243-1.407-7.028-.77a.499.499 0 0 1-.222-.973c3.048-.696 5.662-.397 7.77.892a.5.5 0 0 1 .166.686m.979-2.178a.624.624 0 0 1-.858.205c-2.15-1.321-5.428-1.704-7.972-.932a.625.625 0 0 1-.362-1.194c2.905-.881 6.517-.454 8.986 1.063a.624.624 0 0 1 .206.858m.084-2.268C10.154 5.56 5.9 5.419 3.438 6.166a.748.748 0 1 1-.434-1.432c2.825-.857 7.523-.692 10.492 1.07a.747.747 0 1 1-.764 1.288"/>
                                </svg>
                            </div>
                            <p className="font-bold text-4xl">Login to Spotify</p>
                        </div>

                        <div className="flex flex-col gap-2 w-full">
                            <button className="px-6 py-2 border border-white rounded-full w-full">
                                <div>

                                </div>

                                <p>Login with Google</p>
                            </button>
                            <button className="px-6 py-2 border border-white rounded-full w-full">
                                <div>

                                </div>

                                <p>Login with Facebook</p>
                            </button>
                            <button className="px-6 py-2 border border-white rounded-full w-full">
                                <div>

                                </div>

                                <p>Login with Apple</p>
                            </button>
                            <button className="px-6 py-2 border border-white rounded-full w-full">
                                <div>

                                </div>

                                <p>Login using phone number</p>
                            </button>
                        </div>
                    </div>

                    <span className="w-full h-[1px] bg-secondary"></span>

                    <form action="" className="w-full h-fit flex flex-col gap-4" onSubmit={Login}>
                        <div>
                            <p>Email</p>
                            <input type="text" required onChange={(ev) => {setEmail(ev.target.value)}} className="w-full px-6 py-2 rounded-sm border border-secondary" placeholder="Email or username"/>
                        </div>
                        <div>
                            <p>Password</p>
                            <input type="password" required onChange={(ev) => {setPassword(ev.target.value)}} className="w-full px-6 py-2 rounded-sm border border-secondary" placeholder="Password"/>
                        </div>
                        <input type="submit" disabled={!ready} value="Login" className={!ready ? "bg-main/50 text-primary px-6 py-2 rounded-full font-bold cursor-pointer": "bg-main text-primary px-6 py-2 rounded-full font-bold cursor-pointer"} />
                    </form>

                    <p className="text-secondary">Dont have an account? <Link to={'/register'} className="text-white underline font-bold">Register to Spotify</Link></p>
                </div>
            </div>
        </div>
    )
}