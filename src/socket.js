import {io} from "socket.io-client"
console.log(process.env.REACT_APP_HOST_URL)
const socket = new io(`${process.env.REACT_APP_HOST_URL}`, {
    autoConnect: false,
    withCredentials: true
})

export default socket