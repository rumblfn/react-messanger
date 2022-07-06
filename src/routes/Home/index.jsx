import { Grid, GridItem, Tabs } from "@chakra-ui/react";
import React, { createContext, useState } from "react";
import Chat from "../../components/Chat";
import Sidebar from "../../components/Sidebar";
import useSocketSetup from "../../hooks/useSocketSetup";

export const FriendContext = createContext()

export default function Home() {
  const [friendList, setFriendList] = useState([])

  useSocketSetup(setFriendList)

  return <FriendContext.Provider
    value={{ friendList, setFriendList }}
  >
    <Grid templateColumns="repeat(10, 1fr)" h="100vh" as={Tabs}>
      <GridItem colSpan="3" borderRight="1px solid gray">
        <Sidebar/>
      </GridItem>
      <GridItem colSpan="7">
        <Chat />
      </GridItem>
    </Grid>
  </FriendContext.Provider>;
}
