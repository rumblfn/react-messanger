import {
  TabPanel,
  TabPanels,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";
import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { useActions } from "../../hooks/useActions";
import socket from "../../socket";
import { getFriendList, getMessages } from "../../store/chats/selectors";
import ChatBox from "./ChatBox";
import { EmptyChat } from "./EmptyChat";
import { TopUserInfo } from "./UserInfo";
import { ModalSendFiles } from "./ModalSendFiles";
import { DragAndDropFiles } from "../DragAndDropFiles";
import { Message } from "./Message";

const Chat = ({ user }) => {
  const [files, setFiles] = useState([]);
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
    if (userid) {
      e.preventDefault();
      setDrag(true);
    }
  };

  const dragLeaveHandler = (e) => {
    e.preventDefault();
    setDrag(false);
  };

  const onDropHandler = (e) => {
    e.preventDefault();
    let files = [...e.dataTransfer.files].map((file) => ({
      file,
      loaded: 0,
    }));
    setFiles(files);

    onOpen();
    setDrag(false);
  };

  return friendList.length > 0 ? (
    <VStack minW="325px" pt="0" h="100%" justify="end" spacing={0}>
      {user && <TopUserInfo user={user} />}
      <TabPanels
        onDragStart={(e) => dragStartHandler(e)}
        onDragLeave={(e) => dragLeaveHandler(e)}
        onDragOver={(e) => dragStartHandler(e)}
        h="100%"
        overflow="hidden"
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
            {chat?.messages &&
              chat.messages.map((message, idx) => (
                <Message
                  friend={friend}
                  message={message}
                  key={`msg:${friend.userid}.${idx}`}
                />
              ))}
          </VStack>
        ))}
        {drag && (
          <DragAndDropFiles
            onDropHandler={onDropHandler}
            dragLeaveHandler={dragLeaveHandler}
            dragStartHandler={dragStartHandler}
          />
        )}
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
      {user?.userid && <ChatBox user={user} />}
    </VStack>
  ) : (
    <EmptyChat />
  );
};

export default Chat;
