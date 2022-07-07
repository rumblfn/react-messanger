import { useContext, useEffect } from "react";
import { AccountContext } from "../components/AccountContext";
import socket from "../socket";

const useSocketSetup = (setFriendList, setMessages) => {
  const { setUser } = useContext(AccountContext);

  useEffect(() => {
    socket.connect();

    socket.on("friends", friendList => {
      setFriendList(friendList)
    })

    socket.on("messages", messages => {
      setMessages(messages)
    })

    socket.on("dm", message => {
      console.log('dm')
      setMessages(prevMsgs => [message, ...prevMsgs])
    })

    socket.on('connected', (status, username) => {
      console.log(status, username)
      setFriendList(prevFriends => {
        const friends = [...prevFriends]
        return friends.map(friend => {
          if (friend.username === username) {
            friend.connected = status
          }
          return friend
        })
      })
    })

    socket.on("connect_error", () => {
      setUser({ loggedIn: false });
    });

    return () => {
      socket.off("connect_error");
      socket.off("connected")
      socket.off("friends")
      socket.off("messages")
    };
  }, [setUser, setFriendList, setMessages]);
};

export default useSocketSetup;
