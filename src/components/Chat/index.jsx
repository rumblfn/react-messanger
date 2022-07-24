import { Box, TabPanel, TabPanels, Text, useDisclosure, VStack } from "@chakra-ui/react";
import { useState } from "react";
import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { useActions } from "../../hooks/useActions";
import socket from "../../socket";
import { getFriendList, getMessages } from "../../store/chats/selectors";
import ChatBox from "./ChatBox";
import { EmptyChat } from "./EmptyChat";
import { OneMessage } from "./OneMessage";
import { TopUserInfo } from "./UserInfo";
import styles from "./style.module.css";
import { ModalSendFiles } from "./ModalSendFiles";

const Chat = ({ user }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [drag, setDrag] = useState(false);
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

  const dragStartHandler = (e) => {
    e.preventDefault();
    setDrag(true);
  };

  const dragLeaveHandler = (e) => {
    e.preventDefault();
    setDrag(false);
  };

  const onDropHandler = (e) => {
    e.preventDefault()
    let files = [...e.dataTransfer.files]
    console.log(files)

    onOpen()
    setDrag(false)
  }

  return friendList.length > 0 ? (
    <VStack minW="325px" pt="0" h="100%" justify="end">
      {user && <TopUserInfo user={user} />}
      <TabPanels
        onDragStart={(e) => dragStartHandler(e)}
        onDragLeave={(e) => dragLeaveHandler(e)}
        onDragOver={(e) => dragStartHandler(e)}
        h="100%"
        overflowY="scroll"
        position="relative"
      >
        {friendList.map((friend) => (
          <VStack
            flexDirection="column-reverse"
            as={TabPanel}
            key={`chat:${friend?.userid}`}
            w="100%"
            h="100%"
            overflowY="scroll"
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
        {drag && (
          <Box
            onDrop={e => onDropHandler(e)}
            onDragStart={(e) => dragStartHandler(e)}
            onDragLeave={(e) => dragLeaveHandler(e)}
            onDragOver={(e) => dragStartHandler(e)}
            position="absolute"
            left="0"
            top="0"
            w="100%"
            h="100%"
            p="1rem"
            style={{ backgroundColor: "white" }}
          >
            <Box
              className={styles["drag-and-drop-box"]}
              alignItems="center"
              borderRadius={12}
              w="100%"
              h="100%"
              border="3px dashed gray"
              display="flex"
              justifyContent="center"
            >
              <Text color="gray.600" fontWeight={500}>
                Drop file, to load it
              </Text>
            </Box>
          </Box>
        )}
      </TabPanels>
      <ModalSendFiles isOpen={isOpen} onClose={onClose} />
      {user?.userid && <ChatBox user={user} />}
    </VStack>
  ) : (
    <EmptyChat />
  );
};

export default Chat;
