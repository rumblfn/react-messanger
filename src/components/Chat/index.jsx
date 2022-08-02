import React from "react";
import {
  Box,
  TabPanel,
  TabPanels,
  useDisclosure,
  useMediaQuery,
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
import { useRef } from "react";

const Chat = ({ user }) => {
  const messageRef = useRef();
  const replyRef = useRef()
  const [tablet] = useMediaQuery("(max-width: 1040px)");

  const [files, setFiles] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const userid = user?.userid;

  const { readMessages } = useActions();
  const friendList = useSelector(getFriendList);
  const chat = useSelector(getMessages)[userid];

  const {
    msgBg,
    handleContextMenu,
    handleScroll,
    handleScrollMessageBg,
  } = useContext(ExpandFile);

  useEffect(() => {
    if (!chat?.firstLoading) {
      socket.emit("chatMessages", userid);
    }
  }, [userid, chat?.firstLoading]);

  useEffect(() => {
    readMessages(userid);
    socket.emit("readMessages", userid);
  }, [chat?.messages, userid, readMessages]);

  const handleChatBoxReplyClick = () => {
    messageRef.current?.scrollIntoView({behavior: "smooth" });
    handleScrollMessageBg();
  };

  if (friendList.length > 0) {
    return (
      <VStack minW="325px" pt="0" pb={4} h="100%" justify="end" spacing={0}>
        {user && <TopUserInfo user={user} />}
        <TabPanels h="100%" overflow="hidden" position="relative">
          {friendList.map((friend) => (
            <VStack
              px={2}
              onScroll={handleScroll}
              className={styles.chat}
              flexDirection="column-reverse"
              as={TabPanel}
              key={`chat:${friend?.userid}`}
              spacing={0}
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
                      ref={
                        message?.timestamp === msgBg?.messageToReply?.timestamp
                          ? messageRef
                          : message?.timestamp === msgBg?.replyTimestamp ? replyRef : null
                      }
                      key={`msg:${friend.userid}.${idx}`}
                      style={{
                        backgroundColor:
                          message.timestamp === msgBg.msgTimestamp ?
                          msgBg.color
                          : message?.timestamp === msgBg?.replyTimestamp && msgBg?.replyColor,
                        transition: "all 0.22s",
                      }}
                      onContextMenu={(e) => handleContextMenu(e, message)}
                      w="100%"
                    >
                      <Box w={tablet ? "95%" : "80%"} m="0 auto" maxW="1440px">
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
          <ChatBox newmessageindex={chat?.newmessageindex}
            handleChatBoxReplyClick={handleChatBoxReplyClick}
            setFiles={setFiles}
            onOpen={onOpen}
            user={user}
          />
        )}
      </VStack>
    );
  }
  return <EmptyChat />;
};

export default Chat;
