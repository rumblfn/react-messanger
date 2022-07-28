import {
  Box,
  TabPanel,
  TabPanels,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useActions } from "../../hooks/useActions";
import socket from "../../socket";
import { getFriendList, getMessages } from "../../store/chats/selectors";
import ChatBox from "./ChatBox";
import { EmptyChat } from "./EmptyChat";
import { TopUserInfo } from "./UserInfo";
import { ModalSendFiles } from "./ModalSendFiles";
import { Message } from "./Message";
import styles from "./style.module.css";
import { useContext } from "react";
import { ExpandFile } from "../ToExpandFile";

const Chat = ({ user }) => {
  const [files, setFiles] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const userid = user?.userid;

  const { readMessages } = useActions();
  const friendList = useSelector(getFriendList);
  const chat = useSelector(getMessages)[userid];

  const {msgBg, handleContextMenu} = useContext(ExpandFile)

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
    <VStack minW="325px" pt="0" h="100%" justify="end" spacing={0}>
      {user && <TopUserInfo user={user} />}
      <TabPanels h="100%" overflow="hidden" position="relative">
        {friendList.map((friend) => (
          <VStack
            className={styles.chat}
            p={0}
            pb={2}
            flexDirection="column-reverse"
            as={TabPanel}
            key={`chat:${friend?.userid}`}
            h="100%"
            spacing="0.5rem"
            overflowY="scroll"
          >
            {chat?.messages &&
              chat.messages.map((message, idx) => {
                if (message.type === "time") {
                  return (
                    <Message
                      key={`msg:${friend.userid}.${idx}`}
                      friend={friend}
                      message={message}
                    />
                  );
                }
                return (
                  <Box
                    style={{
                      backgroundColor: message.timestamp === msgBg.msgTimestamp && msgBg.color,
                      transition: "all 0.22s",
                    }}
                    onContextMenu={e => handleContextMenu(e, message.timestamp)}
                    w="100%"
                    key={`msg:${friend.userid}.${idx}`}
                  >
                    <Box w="80%" m="0 auto" maxW="1440px">
                      <Message friend={friend} message={message} />
                    </Box>
                  </Box>
                );
              })}
          </VStack>
        ))}
      </TabPanels>
      {userid && (
        <ModalSendFiles
          user={user}
          setFiles={setFiles}
          files={files}
          isOpen={isOpen}
          onClose={onClose}
        />
      )}
      {user?.userid && (
        <ChatBox setFiles={setFiles} onOpen={onOpen} user={user} />
      )}
    </VStack>
  ) : (
    <EmptyChat />
  );
};

export default Chat;
