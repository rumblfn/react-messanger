import { useContext, useEffect } from "react";
import { AccountContext } from "../components/AccountContext";
import socket from "../socket";
import { useActions } from "./useActions";

let lastMessageId = null;
let lastAddedChat = null;
let lastConfirmationAdded = null;

const useSocketSetup = (playMessageSound) => {
  const { setUser } = useContext(AccountContext);
  const {
    setFriendList,
    setMessages,
    addMessage,
    changeFriendStatus,
    addFriend,
    setConfirmations,
    addConfirmation,
    removeConfirmationAfterDecline,
    setUnreadMessages,
    changeFriendAvatar,
    changeFriendBanner,
    changeFriendAbout,
    deleteMessage
  } = useActions();

  useEffect(() => {
    socket.connect();

    socket.on("friends", (friendList) => {
      setFriendList(friendList);
    });

    socket.on("confirmations", (confirmations) => {
      setConfirmations(confirmations);
    });

    socket.on("add_confirmation", (confirmation) => {
      if (lastConfirmationAdded !== confirmation.userid) {
        addConfirmation(confirmation);
        lastConfirmationAdded = confirmation.userid;
      }
    });

    socket.on("unreadMessages", (unreadMessages) =>
      setUnreadMessages(unreadMessages)
    );

    socket.on("remove_confirmation", (username) => {
      removeConfirmationAfterDecline(username);
    });

    socket.on("add_chat", (friend) => {
      if (lastAddedChat !== friend.userid) {
        lastAddedChat = friend.userid;
        friend.connected = true;
        addFriend(friend);
      }
    });

    socket.on("dm", (message, id) => {
      if (lastMessageId !== id) {
        lastMessageId = id;
        playMessageSound.play();
        addMessage({ message, userid: message.from });
      }
    });

    socket.on("delete-message", (index, userid) => {
      deleteMessage({index, userid})
    })

    socket.on("chatMessages", (userid, messages, lastindex) => {
      setMessages({ userid, messages, lastindex });
    });

    socket.on("connected", (status, username) => {
      changeFriendStatus({ status, username });
    });

    socket.on("connect_error", () => {
      setUser({ loggedIn: false });
    });

    socket.on("avatar-changed", (filename, username) => {
      changeFriendAvatar({
        filename,
        username,
      });
    });

    socket.on("banner-changed", (filename, username) => {
      changeFriendBanner({
        filename,
        username,
      });
    });

    socket.on("about-changed", (about, username) => {
      changeFriendAbout({
        about,
        username,
      });
    });

    return () => {
      socket.off("connect_error");
      socket.off("connected");
      socket.off("friends");
      socket.off("chatMessages");
      socket.off("dm");
      socket.off("add_chat");
      socket.off("remove_confirmation");
      socket.off("unreadMessages");
      socket.off("add_confirmation");
      socket.off("confirmations");
    };
  }, [
    setMessages,
    setUser,
    addMessage,
    setFriendList,
    changeFriendStatus,
    addFriend,
    playMessageSound,
    addConfirmation,
    removeConfirmationAfterDecline,
    setConfirmations,
    setUnreadMessages,
    changeFriendAbout,
    changeFriendAvatar,
    changeFriendBanner,
  ]); // remove subs, make clearly
};

export default useSocketSetup;
