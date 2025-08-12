import axios from "axios";
import { createContext } from "react";
import { useState, useEffect } from "react";

export const UserContext = createContext({})

export default function UserContextProvider({children}){
    const [user, setUser] = useState(null);
    const [ready, setReady] = useState(false);
    useEffect(() => {
        if(!user){
            axios.get('/profile').then(userData => {
                setUser(userData.data);
                setReady(true);
            })
        }
    }, [])

    return (
        <UserContext.Provider value={{ ready, user, setUser }}>
            {children}
        </UserContext.Provider>
    )
}