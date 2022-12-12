import { useContext, useEffect } from "react";
import { AccountContext } from "../components/AccountContext";
import socket from "../socket";
import { useActions } from "./useActions";

let lastMessageId;
let lastAddedChat;
let lastConfirmationAdded;

const useSocketSetup = (playMessageSound) => {
  const { setUser, user } = useContext(AccountContext);
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
    deleteMessage,
    setGroupList
  } = useActions();

  useEffect(() => {
    if (!user.loggedIn) return
    socket.connect();

    socket.on("friends", async friendList => {
      await setFriendList(friendList)
      socket.off("friends")
    });

    socket.on("groups", async groups => {
      await setGroupList(groups)
    })

    socket.on("confirmations", async confirmations => {
      await setConfirmations(confirmations)
      socket.off("confirmations")
    });

    socket.on("add_confirmation", async confirmation => {
      if (lastConfirmationAdded !== confirmation.userid) {
        await addConfirmation(confirmation);
        lastConfirmationAdded = confirmation.userid;
      }
    });

    socket.on("unreadMessages", unreadMessages =>
      setUnreadMessages(unreadMessages)
    );

    socket.on("remove_confirmation", async username => {
      await removeConfirmationAfterDecline(username)
    });

    socket.on("add_chat", async friend => {
      if (lastAddedChat !== friend.userid) {
        lastAddedChat = friend.userid;
        friend.connected = true;
        await addFriend(friend)
      }
    });

    socket.on("dm", async (message, id) => {
      if (lastMessageId !== id) {
        lastMessageId = id;
        playMessageSound.play();
        await addMessage({ message, userid: message.from });
      }
    });

    socket.on("delete-message", async (index, userid) => {
      await deleteMessage({ index, userid });
    });

    socket.on("chatMessages", async (userid, messages, lastindex) => {
      await setMessages({ userid, messages, lastindex });
    });

    socket.on("connected", async (status, data) => {
      await changeFriendStatus({status, data});
    });

    socket.on("connect_error", () => {
      setUser({ loggedIn: false });
    });

    socket.on("avatar-changed", async (filename, username) => {
      await changeFriendAvatar({
        filename,
        username,
      });
    });

    socket.on("banner-changed", async (filename, username) => {
      await changeFriendBanner({
        filename,
        username,
      });
    });

    socket.on("about-changed", async (about, username) => {
      await changeFriendAbout({
        about,
        username,
      });
    });

    return () => {
      socket.off("avatar-changed");
      socket.off("banner-changed");
      socket.off("about-changed");
      socket.off("delete-message");
      socket.off("connect_error");
      socket.off("connected");
      socket.off("chatMessages");
      socket.off("dm");
      socket.off("add_chat");
      socket.off("remove_confirmation");
      socket.off("unreadMessages");
      socket.off("add_confirmation");
    };
  }, [
    user,
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
    deleteMessage,
  ]); // remove subs, make clearly
};

export default useSocketSetup;
