import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import axios from 'axios';
import { useContext } from "react";
import { UserContext } from "../UserContext";

export default function RegisterPage(){

    const [phase, setPhase] = useState('start');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [redirect, setRedirect] = useState(false)
    const [username, setUsername] = useState('');
    const [gender, setGender] = useState('');

    const {setUser} = useContext(UserContext);

    const navigate = useNavigate()

    async function CreateAccount(ev){
        ev.preventDefault()

        try{
            const {data} = await axios.post('/register', {username, email, gender, password})

            setUser(data)
            setRedirect(true);
        }catch(err){
            console.log(err)
        }
    }

    if(redirect){
        return window.location.href = '/';
    }

    return (
        <div className="w-screen h-screen bg-primary text-white p-8 flex items-center justify-center">
            <div className="flex items-center justify-center flex-col gap-10 w-90 ">
                <div className="flex items-center flex-col justify-center gap-4 w-full">
                    <div>
                        <svg xmlns="http://www.w3.org/2000/svg" className="size-8" fill="currentColor" viewBox="0 0 16 16">
                            <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0m3.669 11.538a.5.5 0 0 1-.686.165c-1.879-1.147-4.243-1.407-7.028-.77a.499.499 0 0 1-.222-.973c3.048-.696 5.662-.397 7.77.892a.5.5 0 0 1 .166.686m.979-2.178a.624.624 0 0 1-.858.205c-2.15-1.321-5.428-1.704-7.972-.932a.625.625 0 0 1-.362-1.194c2.905-.881 6.517-.454 8.986 1.063a.624.624 0 0 1 .206.858m.084-2.268C10.154 5.56 5.9 5.419 3.438 6.166a.748.748 0 1 1-.434-1.432c2.825-.857 7.523-.692 10.492 1.07a.747.747 0 1 1-.764 1.288"/>
                        </svg>
                    </div>
                    {phase === 'start' ? (
                        <p className="font-bold text-4xl">Register to Spotify</p>
                    ) : (
                        <div className="w-full h-fit flex flex-col gap-4">
                            <span className="w-full h-[1px] bg-main block"></span>

                            <div className="flex items-center gap-2">
                                {phase === 'password' ? (
                                    <>
                                        <button onClick={() => {setPhase('start')}} className="text-secondary font-bold cursor-pointer">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                                                <path fillRule="evenodd" d="M7.72 12.53a.75.75 0 0 1 0-1.06l7.5-7.5a.75.75 0 1 1 1.06 1.06L9.31 12l6.97 6.97a.75.75 0 1 1-1.06 1.06l-7.5-7.5Z" clipRule="evenodd" />
                                            </svg>
                                        </button>
                                    </>
                                ) : phase === 'information' && (
                                    <>
                                        <button onClick={() => {setPhase('password')}} className="text-secondary font-bold cursor-pointer">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                                                <path fillRule="evenodd" d="M7.72 12.53a.75.75 0 0 1 0-1.06l7.5-7.5a.75.75 0 1 1 1.06 1.06L9.31 12l6.97 6.97a.75.75 0 1 1-1.06 1.06l-7.5-7.5Z" clipRule="evenodd" />
                                            </svg>
                                        </button>
                                    </>
                                )}
                                

                                <div className="flex flex-col">
                                    {phase === 'password' ? (
                                        <>
                                            <p className="text-secondary">Step 1 Out of 2</p>
                                            <p className="font-bold">Make a Password</p>
                                        </>
                                    ) : phase === 'information' && (
                                        <>
                                            <p className="text-secondary">Step 2 Out of 2</p>
                                            <p className="font-bold">Personal information</p>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            {phase ==='start' && (
                <>
                    <div className="w-full flex flex-col gap-8">
        
                        
                        <form className="w-full h-fit flex flex-col gap-4" onSubmit={(ev)=>{
                                ev.preventDefault()
                                setPhase('password')
                                }}>

                            <div>
                                <p>Email address</p>
                                <input type="email" required defaultValue={email} className="w-full px-6 py-2 rounded-sm border border-secondary" placeholder="name@domain.com" onChange={(e) => {setEmail(e.target.value)}}/>
                            </div>
                            <button className="bg-main cursor-pointer text-primary px-6 py-2 rounded-full font-bold">Continue</button>
                        </form>
                    </div>
        
                    <span className="w-full h-[1px] bg-secondary"></span>

                    <div className="flex flex-col gap-2 w-full">
                            <button className="px-6 py-2 border border-white rounded-full w-full">
                                <div>
        
                                </div>
        
                                <p>Login with Google</p>
                            </button>
                            <button className="px-6 py-2 border border-white rounded-full w-full">
                                <div>
        
                                </div>
        
                                <p>Login with Apple</p>
                            </button>
                    </div>

                    <p className="text-secondary">Already have an account? <Link to={'/login'} className="text-white underline font-bold">Login Here</Link></p>
                </>
            )}

            {phase === 'password' && (
                <div className="w-10/12">
                    <div className="w-full h-fit flex flex-col gap-4">
                        <form className="flex flex-col gap-2" onSubmit={(ev)=>{
                                ev.preventDefault()
                                setPhase('password')
                                }}>
                            <p className="font-bold">Password</p>
                            <input type="password" pattern="[A-Za-z0-9!@#$%^&*+\-]{10,}" required defaultValue={password} className="w-full px-6 py-2 rounded-sm border border-secondary" placeholder="Password" onChange={(e) => {setPassword(e.target.value)}}/>
                        </form>

                        <div className="gap-2 flex flex-col">
                            <p className="font-bold">
                                Password should be atleast
                            </p>

                            <div className="flex gap-1 items-center">
                                {/[A-za-z]/.test(password) ? (
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-4 text-main">
                                        <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" clipRule="evenodd" />
                                    </svg>
                                ): (
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                    </svg>
                                )}


                                <p className="text-sm">1 alphabet</p>
                            </div>

                            <div className="flex gap-1 items-center">
                                {/[!@#$%^&*()_+]/.test(password) ? (
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-4 text-main">
                                        <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" clipRule="evenodd" />
                                    </svg>
                                ): (
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                    </svg>
                                )}

                                
                                <p className="text-sm">1 special character (example:# ? ! &)</p>
                            </div>

                            <div className="flex gap-1 items-center">
                                {/^.{10,}$/.test(password) ? (
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-4 text-main">
                                        <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" clipRule="evenodd" />
                                    </svg>
                                ): (
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                    </svg>
                                )}


                                <p className="text-sm">10 character</p>
                            </div>
                        </div>
                        <button disabled={!/^(?=.*[A-za-z])(?=.*[!@#$%^&*()_+]).{10,}$/.test(password)} className="disabled:bg-main/50 disabled:cursor-default bg-main cursor-pointer text-primary px-6 py-2 rounded-full font-bold" onClick={()=>{setPhase('information')}}>Continue</button>
                    </div>
                </div>
            )}

            {phase === 'information' && (
                <form className="flex flex-col w-10/12 gap-4" onSubmit={CreateAccount}>
                    <div className="w-full h-fit flex flex-col gap-4">
                        <div className="flex flex-col gap-2">
                            <div className="flex flex-col">
                                <p className="font-bold">Name</p>
                                <p className="text-sm text-secondary">This name will display on your profile</p>
                            </div>
                            <input type="text" defaultValue={username} required className="w-full px-6 py-2 rounded-sm border border-secondary" placeholder="Username" onChange={(e) => {setUsername(e.target.value)}}/>
                        </div>
                    </div>
                    <div className="w-full h-fit flex flex-col gap-4">
                        <div>
                            <p className="font-bold">Gender</p>
                            <p className="text-sm text-secondary">Kami memakai gendermu untuk membantu mempersonalisasi rekomendasi konten dan iklan kami untukmu.</p>
                        </div>

                        <div className="flex gap-2">
                            <span className="flex gap-2">
                                <input type="radio" name="gender" id="" value={'man'} required onChange={(e) => {setGender(e.target.value)}} checked={'man' === gender}/>
                                <p>Man</p>
                            </span>
                            <span className="flex gap-2">
                                <input type="radio" name="gender" id="" value={'woman'} onChange={(e) => {setGender(e.target.value)}} checked={'woman' === gender}/>
                                <p>Woman</p>
                            </span>
                            <span className="flex gap-2">
                                <input type="radio" name="gender" id="" value={'non-binary'} onChange={(e) => {setGender(e.target.value)}} checked={'non-binary' === gender}/>
                                <p>Non-binary</p>
                            </span>
                        </div>

                        <span className="flex gap-2">
                            <input type="radio" name="gender" id="" value={'others'} onChange={(e) => {setGender(e.target.value)}} checked={'others' === gender}/>
                            <p>Others</p>
                        </span>

                        <span className="flex gap-2">
                            <input type="radio" name="gender" id="" value={'prefer-not'} onChange={(e) => {setGender(e.target.value)}} checked={'prefer-not' === gender}/>
                            <p>Choosing to not answer</p>
                        </span>

                    </div>

                    <button className="bg-main cursor-pointer text-primary px-6 py-2 rounded-full font-bold">Continue</button>
                </form>
            )}

            </div>
        </div>
    )
}