import { useContext, useEffect } from "react";
import { AccountContext } from "../components/AccountContext";
import socket from "../socket";
import { useActions } from "./useActions";

let lastMessageId;
let lastAddedChat;
let lastAddedGroup;
let lastConfirmationAdded;

const useSocketSetup = (playMessageSound) => {
  const { setUser, user } = useContext(AccountContext);
  const {
    addGroup,
    addFriend,
    addMessage,
    setMessages,
    setGroupList,
    deleteMessage,
    setFriendList,
    addConfirmation,
    setConfirmations,
    setUnreadMessages,
    changeFriendAvatar,
    changeFriendBanner,
    changeFriendAbout,
    changeFriendStatus,
    removeConfirmationAfterDecline,
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
      socket.off("groups")
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

    socket.on("unreadMessages", unreadMessages => {
      setUnreadMessages(unreadMessages)
      socket.off("unreadMessages")
    });

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

    socket.on("add_group", async group => {
      if (lastAddedGroup !== group.id) {
        lastAddedGroup = group.id
        await addGroup(group)
      }
    })

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
      socket.off("dm");
      socket.off("add_chat");
      socket.off("connected");
      socket.off("chatMessages");
      socket.off("about-changed");
      socket.off("connect_error");
      socket.off("avatar-changed");
      socket.off("banner-changed");
      socket.off("delete-message");
      socket.off("unreadMessages");
      socket.off("add_confirmation");
      socket.off("remove_confirmation");
    };
  }, [
    user,
    setUser,
    addGroup,
    addFriend,
    addMessage,
    setMessages,
    setGroupList,
    deleteMessage,
    setFriendList,
    addConfirmation,
    setConfirmations,
    playMessageSound,
    changeFriendAbout,
    setUnreadMessages,
    changeFriendBanner,
    changeFriendAvatar,
    changeFriendStatus,
    removeConfirmationAfterDecline,
  ]); // TODO: remove subs, make clearly
};

export default useSocketSetup;
