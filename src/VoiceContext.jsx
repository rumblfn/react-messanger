import { useEffect } from "react";
import { createContext, useState } from "react";
import socket from "./socket";

export const VoiceContext = createContext()

const VoiceChannelContext = ({children}) => {
    const [tryingToCall, setTryingToCall] = useState(false)
    const [awaitingAnswer, setAwaitingAnswer] = useState(false)
    const [user, setUser] = useState(null)

    const calUser = (user) => {
        if (user?.userid) {
            setTryingToCall(true)
            setUser(user)
            socket.emit('callUser', user.userid)
        }
    }

    const cancelCalling = () => {
        if (tryingToCall) {
            setTryingToCall(false)
            socket.emit('cancelUserCall', user?.userid)
        } else if (awaitingAnswer) {
            setAwaitingAnswer(false)
            socket.emit('cancelAwaitingCall', user?.userid)
        }
    }

    const acceptCalling = () => {

    }

    useEffect(() => {
        socket.on('callUser', user => {
            console.log(user)
            setAwaitingAnswer(true)
            setUser(user)
        })

        socket.on('cancelUserCall', user => {
            setAwaitingAnswer(false)
        })

        socket.on('cancelAwaitingCall', user => {
            setTryingToCall(false)
        })
    }, [])

    return <VoiceContext.Provider value={{calUser, tryingToCall, awaitingAnswer, user, cancelCalling, acceptCalling}}>
        {children}
    </VoiceContext.Provider>
}

export default VoiceChannelContext