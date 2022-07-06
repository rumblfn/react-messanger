import { ChatIcon } from "@chakra-ui/icons";
import {
  Button,
  Divider,
  Heading,
  HStack,
  Input,
  Tab,
  TabList,
  Tabs,
  Text,
  VStack,
} from "@chakra-ui/react";
import { nanoid } from "nanoid";
import React, { useContext, useRef, useState } from "react";
import { FriendContext } from "../../routes/Home";
import socket from "../../socket";

const Sidebar = () => {
  const { friendList, setFriendList } = useContext(FriendContext);
  const friendInputRef = useRef()
  const [success, setSuccess] = useState('')
  const [errorMsg, setErrorMsg] = useState('')

  const getFriend = async (username) => {
    if(username.length < 5) return
    socket.emit("add_friend", username, ({errorMsg, done}) => {
      if (done) {
        setSuccess(`${username} request sent`)
        setFriendList(prev => [username, ...prev])
        setErrorMsg('')
        return
      }
      setErrorMsg(errorMsg)
      setSuccess('')
    })
  }

  return (
    <VStack py="1rem">
      <HStack w="100%" justify="space-evenly" pl="0.5rem" pr="0.5rem">
        <Input
          ref={friendInputRef}
          placeholder="Add friend"
          size="md"
        />
        <Button onClick={() => getFriend(friendInputRef.current.value)}>
          <ChatIcon />
        </Button>
      </HStack>
      {
        success &&
        <Heading fontSize="m" as="p" p="0.5rem" color="green.700" textAlign="center">
          {success}
        </Heading>
      }
      {
        errorMsg &&
        <Heading fontSize="m" p="0.5rem" as="p" color="red.900" textAlign="center">
          {errorMsg}
        </Heading>
      }
      <Divider />
      <Tabs variant="soft-rounded" w="100%">
        <VStack as={TabList} w="100%" p="0.5rem">
          {friendList.map((friend) => (
            <HStack w="100%" key={friend}>
              <Tab w="100%" bg={friend.connected ? "green.100" : ""}>
                <Text align="start" w="100%">
                  {friend}
                </Text>
              </Tab>
            </HStack>
          ))}
        </VStack>
      </Tabs>
    </VStack>
  );
};

export default Sidebar;
