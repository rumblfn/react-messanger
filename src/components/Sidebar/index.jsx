import {
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useActions } from "../../hooks/useActions";
import socket from "../../socket";
import { Confirmations } from "./confirmations";
import { FriendList } from "./FriendList";
import { ConfirmationModal } from "./Modal";
import { ProfileTopPreview } from "./profileTopPreview";
import { SearchInput } from "./searchInput";
import { StatusMsg } from "./StatusField";

const Sidebar = () => {
  const { removeConfirmationAfterDecline } = useActions();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const [friend, setFriend] = useState(null);

  const [success, setSuccess] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const cleanMessages = () => {
    setSuccess("");
    setErrorMsg("");
  };

  useEffect(() => {
    setTimeout(() => cleanMessages(), 3000);
  }, [errorMsg, success]);

  const acceptConfirmation = (user) => {
    socket.emit("accept_confirmation", user);
  };

  const declineConfirmation = (user) => {
    socket.emit("decline_confirmation", user);
    removeConfirmationAfterDecline(user.username);
  };

  return (
    <VStack py="0.5rem">
      <ProfileTopPreview />
      <SearchInput setSuccess={setSuccess} setErrorMsg={setErrorMsg} />
      <StatusMsg success={success} errorMsg={errorMsg} />
      <Confirmations
        setFriend={setFriend}
        onOpen={onOpen}
        acceptConfirmation={acceptConfirmation}
        declineConfirmation={declineConfirmation}
      />
      <FriendList />
      <ConfirmationModal
        isOpen={isOpen}
        onClose={onClose}
        friend={friend}
        acceptConfirmation={acceptConfirmation}
        declineConfirmation={declineConfirmation}
      />
    </VStack>
  );
};

export default Sidebar;
