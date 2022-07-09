import { Grid, GridItem, Tabs } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import Chat from "../../components/Chat";
import Sidebar from "../../components/Sidebar";
import useSocketSetup from "../../hooks/useSocketSetup";
import { getFriendIndex, getFriendList } from "../../store/chats/selectors";

export default function Home() {
  const friendIndex = useSelector(getFriendIndex)
  const friendList = useSelector(getFriendList)

  useSocketSetup(friendList);

  return (
    <Grid
      templateColumns="repeat(10, 1fr)"
      h="100vh"
      as={Tabs}
      index={friendIndex}
    >
      <GridItem colSpan="3" borderRight="1px solid gray">
        <Sidebar />
      </GridItem>
      <GridItem colSpan="7" maxH="100vh">
        <Chat
          userid={friendList[friendIndex]?.userid}
        />
      </GridItem>
    </Grid>
  );
}
