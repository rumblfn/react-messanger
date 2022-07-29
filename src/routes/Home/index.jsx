import { Box, HStack, Tabs } from "@chakra-ui/react";
import { useContext } from "react";
import { useSelector } from "react-redux";
import Chat from "../../components/Chat";
import { MessageView } from "../../components/MessageView";
import Sidebar from "../../components/Sidebar";
import { ExpandFile } from "../../components/ToExpandFile";
import { getFriendIndex, getFriendList } from "../../store/chats/selectors";
import React from "react";

export default function Home() {
  const friendIndex = useSelector(getFriendIndex);
  const friendList = useSelector(getFriendList);

  const { handleLeftClick, msgBg } = useContext(ExpandFile);

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
        <MessageView clientX={clientX} clientY={clientY} />
      )}
    </HStack>
  );
}
