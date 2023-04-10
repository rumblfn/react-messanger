import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import React from "react";

const paths = ['/', '/register']
export const AccountContext = createContext()

const UserContext = ({children}) => {
    const navigate = useNavigate()
    const [user, setUser] = useState({
        loggedIn: null,
    })

    useEffect(() => {
        if (paths.includes(window.location.pathname) && user.loggedIn) {
            navigate("/home")
        }
    }, [user]);


    useEffect(() => {
        fetch(`${process.env.REACT_APP_HOST_URL}/auth/login`, {
            credentials: "include",
        }).catch(err => {
            setUser({loggedIn: false})
            return
        })
        .then(res => {
            if (!res || !res.ok || !res.status >= 400) {
                setUser({loggedIn: false})
                return
            }
            return res.json()
        })
        .then(data => {
            if (!data) {
                setUser({loggedIn: false})
                return
            } else {
                setUser({ ...data })
            }
        })
    }, [])

    return <AccountContext.Provider value={{user, setUser}}>
        {children}
    </AccountContext.Provider>
}

export default UserContext