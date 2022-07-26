import { Box, HStack, Tabs } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import Chat from "../../components/Chat";
import Sidebar from "../../components/Sidebar";
import { getFriendIndex, getFriendList } from "../../store/chats/selectors";

export default function Home() {
  const friendIndex = useSelector(getFriendIndex);
  const friendList = useSelector(getFriendList);

  return (
    <HStack overflowY="hidden" h="100vh" as={Tabs} index={friendIndex}>
      <Box borderRight="1px solid gray" h="100vh">
        <Sidebar />
      </Box>
      <Box h="100vh" w="100%" style={{ marginLeft: 0 }}>
        <Chat user={friendList[friendIndex]} />
      </Box>
    </HStack>
  );
}
