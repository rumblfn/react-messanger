import {io} from "socket.io-client"

const socket = new io(`${process.env.REACT_APP_HOST_URL}`, {
    autoConnect: false,
    withCredentials: true
})

export default socket