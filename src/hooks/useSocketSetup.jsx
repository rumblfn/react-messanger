import { useContext, useEffect } from "react";
import { AccountContext } from "../components/AccountContext";
import socket from "../socket";
import { useActions } from "./useActions";

let lastMessageId = null;
let lastAddedChat = null;
let lastConfirmationAdded = null

const useSocketSetup = () => {
  const { setUser } = useContext(AccountContext);
  const { setFriendList, setMessages, addMessage, changeFriendStatus, addFriend, setConfirmations, addConfirmation, removeConfirmationAfterDecline } =
    useActions();

  useEffect(() => {
    socket.connect();

    socket.on("friends", (friendList) => {
      setFriendList(friendList);
    });

    socket.on("confirmations", (confirmations) => {
      setConfirmations(confirmations)
    })

    socket.on("add_confirmation", (confirmation) => {
      if (lastConfirmationAdded !== confirmation.userid) {
        addConfirmation(confirmation)
        lastConfirmationAdded = confirmation.userid
      }
    })

    socket.on('remove_confirmation', username => {
      removeConfirmationAfterDecline(username)
    })

    socket.on("add_chat", friend => {
      if (lastAddedChat !== friend.userid) {
        lastAddedChat = friend.userid
        addFriend(friend)
      }
    })

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
  }, [setMessages, setUser, addMessage, setFriendList, changeFriendStatus, addFriend]); // remove subs
};

export default useSocketSetup;
