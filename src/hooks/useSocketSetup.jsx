import { useContext, useEffect } from "react";
import { AccountContext } from "../components/AccountContext";
import socket from "../socket";
import { useActions } from "./useActions";

let lastMessageId = null;

const useSocketSetup = () => {
  const { setUser } = useContext(AccountContext);
  const { setFriendList, setMessages, addMessage, changeFriendStatus } =
    useActions();

  useEffect(() => {
    socket.connect();

    socket.on("friends", (friendList) => {
      setFriendList(friendList);
    });

    socket.on("messages", (messages) => {
      setMessages(messages);
    });

    socket.on("dm", (message, id) => {
      if (lastMessageId !== id) {
        addMessage(message);
        lastMessageId = id;
      }
    });

    socket.on("connected", (status, username) => {
      changeFriendStatus({status, username});
    });

    socket.on("connect_error", () => {
      setUser({ loggedIn: false });
    });

    return () => {
      socket.off("connect_error");
      socket.off("connected");
      socket.off("friends");
      socket.off("messages");
    };
  }, [setMessages, setUser, addMessage, setFriendList, changeFriendStatus]); // remove subs
};

export default useSocketSetup;
