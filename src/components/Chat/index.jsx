import {
  Divider,
  TabPanel,
  TabPanels,
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
import { TopUserInfo } from "./UserInfo";

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
  }, [userid, chat?.firstLoading]);

  useEffect(() => {
    readMessages(userid);
    socket.emit("readMessages", userid);
  }, [chat?.messages, userid, readMessages]);

  return friendList.length > 0 ? (
    <VStack minW='325px' pt="0" h="100%" justify="end">
      {user && <TopUserInfo user={user} />}
      <Divider p={0} />
      <TabPanels h="100%" overflowY="scroll">
        {friendList.map((friend) => (
          <VStack
            flexDirection="column-reverse"
            as={TabPanel}
            key={`chat:${friend?.userid}`}
            w="100%"
            h='100%'
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
