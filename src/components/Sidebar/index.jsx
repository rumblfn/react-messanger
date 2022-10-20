import {Accordion, useColorMode, useDisclosure, VStack} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useActions } from "../../hooks/useActions";
import socket from "../../socket";
import { Confirmations } from "./confirmations";
import { FriendList } from "./FriendList";
import { JoinRoomField } from "./JoinRoomField";
import { ConfirmationModal } from "./Modal";
import { ProfileTopPreview } from "./profileTopPreview";
import { SearchInput } from "./searchInput";
import { StatusMsg } from "./StatusField";
import {GroupsList} from "./GroupsList";
import {ModalCreateGroup} from "./ModalCreateGroup";

const Sidebar = () => {
  const { colorMode } = useColorMode();
  const { removeConfirmationAfterDecline } = useActions();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isCreateGroupOpen,
    onOpen: onCreateGroupOpen,
    onClose: onCreateGroupClose
  } = useDisclosure();

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
    <VStack
      py="0.5rem"
      bg={
        colorMode === "light"
          ? "var(--main-app-light-bg-color)"
          : "var(--main-app-dark-bg-color)"
      }
      h="100%"
    >
      <ProfileTopPreview />
       <JoinRoomField />
      <SearchInput setSuccess={setSuccess} setErrorMsg={setErrorMsg} />
      <StatusMsg success={success} errorMsg={errorMsg} />
      <Accordion allowToggle w="100%">
        <Confirmations
          setFriend={setFriend}
          onOpen={onOpen}
          acceptConfirmation={acceptConfirmation}
          declineConfirmation={declineConfirmation}
        />
        <FriendList />
        <GroupsList onOpen={onCreateGroupOpen} />
      </Accordion>
      <ConfirmationModal
        isOpen={isOpen}
        onClose={onClose}
        friend={friend}
        acceptConfirmation={acceptConfirmation}
        declineConfirmation={declineConfirmation}
      />
      <ModalCreateGroup
        isOpen={isCreateGroupOpen}
        onClose={onCreateGroupClose}
      />
    </VStack>
  );
};

export default Sidebar;
