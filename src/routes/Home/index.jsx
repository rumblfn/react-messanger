import { Grid, GridItem, Tabs } from "@chakra-ui/react";
import React, { createContext, useState } from "react";
import Chat from "../../components/Chat";
import Sidebar from "../../components/Sidebar";
import useSocketSetup from "../../hooks/useSocketSetup";

export const FriendContext = createContext();
export const MessagesContext = createContext();

export default function Home() {
  const [friendList, setFriendList] = useState([]);
  const [messages, setMessages] = useState([]);

  const [friendIndex, setFriendIndex] = useState(0);

  useSocketSetup(setFriendList, setMessages);

  return (
    <FriendContext.Provider value={{ friendList, setFriendList }}>
      <Grid
        templateColumns="repeat(10, 1fr)"
        h="100vh"
        as={Tabs}
        index={friendIndex}
        onChange={(index) => {console.log(index)}}
      >
        <GridItem colSpan="3" borderRight="1px solid gray">
          <Sidebar setFriendIndex={setFriendIndex} />
        </GridItem>
        <GridItem colSpan="7" maxH="100vh">
          <MessagesContext.Provider 
            value={{
              messages,
              setMessages
            }}
          >
            <Chat
              userid={friendList[friendIndex]?.userid}
            />
          </MessagesContext.Provider>
        </GridItem>
      </Grid>
    </FriendContext.Provider>
  );
}
