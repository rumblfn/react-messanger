import {
  Avatar,
  Box,
  Divider,
  Heading,
  HStack,
  TabPanel,
  TabPanels,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { useActions } from "../../hooks/useActions";
import socket from "../../socket";
import { getFriendList, getMessages } from "../../store/chats/selectors";
import ChatBox from "./ChatBox";
import { EmptyChat } from "./EmptyChat";
import { OneMessage } from "./OneMessage";

const Chat = ({ user }) => {
  const userid = user?.userid;

  const { readMessages } = useActions();
  const friendList = useSelector(getFriendList);
  const chat = useSelector(getMessages)[userid];

  const bottomDiv = useRef(null);

  useEffect(() => {
    bottomDiv.current?.scrollIntoView();
  });

  useEffect(() => {
    if (!chat?.firstLoading) {
      socket.emit("chatMessages", userid);
    }
  }, [userid]);

  useEffect(() => {
    readMessages(userid);
    socket.emit("readMessages", userid);
  }, [chat?.messages, userid, readMessages]);

  return friendList.length > 0 ? (
    <VStack pt="0" h="100%" justify="end">
      {user && (
        <VStack w="100%" p="0.5rem 1rem 0">
          <HStack alignItems="center" w="100%">
            <Avatar
              size="xs"
              name={user?.username || ""}
              // src="https://bit.ly/dan-abramov"
            />
            <Heading fontSize="md" wordBreak="break-all">
              {user?.username || ""}
            </Heading>
          </HStack>
          {user.connected ? (
            <Text fontSize="xs" pl="0.15rem" color="green.500" w="100%">Online</Text>
          ) : (
            <Text fontSize="xs" color="gray.500" w="100%">
              last seen {user.lastActiveDay} at {user.formattedTime}
            </Text>
          )}
        </VStack>
      )}
      <Divider p={0} />
      <TabPanels h="100%" overflowY="scroll">
        {friendList.map((friend) => (
          <VStack
            flexDirection="column-reverse"
            as={TabPanel}
            key={`chat:${friend.userid}`}
            w="100%"
          >
            <div ref={bottomDiv} />
            {chat &&
              chat.messages &&
              chat.messages.map((message, idx) => (
                <OneMessage
                  friend={friend}
                  message={message}
                  key={`msg:${friend.userid}.${idx}`}
                />
              ))}
          </VStack>
        ))}
      </TabPanels>
      {user?.userid && <ChatBox user={user} />}
    </VStack>
  ) : (
    <EmptyChat />
  );
};

export default Chat;
