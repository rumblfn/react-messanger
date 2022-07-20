import {
  Box,
  Button,
  Heading,
  HStack,
  Input,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useActions } from "../../hooks/useActions";
import socket from "../../socket";
import { Confirmations } from "./confirmations";
import { FriendList } from "./FriendList";
import { JoinRoomField } from "./JoinRoomField";
import { ConfirmationModal } from "./Modal";
import { ProfileTopPreview } from "./profileTopPreview";
import { SearchInput } from "./searchInput";
import { StatusMsg } from "./StatusField";

const Sidebar = () => {
  const navigate = useNavigate();
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
    <VStack py="0.5rem" minW='325px'>
      <ProfileTopPreview />
      <JoinRoomField />
      {/* <Box w="100%" pl={2} pr={2}>
        <Button bg="blue.100" onClick={() => navigate("/live")} w="100%">
          Go to Live
        </Button>
      </Box> */}
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
