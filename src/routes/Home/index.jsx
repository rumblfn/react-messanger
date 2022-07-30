import { Box, HStack, Tabs, useDisclosure } from "@chakra-ui/react";
import { useContext } from "react";
import { useSelector } from "react-redux";
import Chat from "../../components/Chat";
import { MessageView } from "../../components/MessageView";
import Sidebar from "../../components/Sidebar";
import { ExpandFile } from "../../components/ToExpandFile";
import { getFriendIndex, getFriendList } from "../../store/chats/selectors";
import React from "react";
import { DeleteMessage } from "./ModalDeleteMessage";

export default function Home() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const friendIndex = useSelector(getFriendIndex);
  const friendList = useSelector(getFriendList);

  const { handleLeftClick, msgBg, messageToDelete } =
    useContext(ExpandFile);

  const { clientX, clientY } = msgBg;

  return (
    <HStack
      onClick={handleLeftClick}
      overflowY="hidden"
      h="100vh"
      as={Tabs}
      index={friendIndex}
    >
      <Box borderRight="1px solid gray" h="100vh">
        <Sidebar />
      </Box>
      <Box h="100vh" w="100%" style={{ marginLeft: 0 }}>
        <Chat user={friendList[friendIndex]} />
      </Box>
      {clientX && clientY && (
        <MessageView
          onOpen={onOpen}
          clientX={clientX}
          clientY={clientY}
        />
      )}
      <DeleteMessage
        messageToDelete={messageToDelete}
        onClose={onClose}
        isOpen={isOpen}
        username={friendList[friendIndex]?.username}
        userid={friendList[friendIndex]?.userid}
      />
    </HStack>
  );
}
