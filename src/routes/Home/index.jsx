import { Box, HStack, Tabs, useDisclosure, useMediaQuery } from "@chakra-ui/react";
import {useContext, useRef} from "react";
import { useSelector } from "react-redux";
import Chat from "../../components/Chat";
import { MessageView } from "../../components/MessageView";
import Sidebar from "../../components/Sidebar";
import { ExpandFile } from "../../components/ToExpandFile";
import { getFriendIndex, getFriendList } from "../../store/chats/selectors";
import React from "react";
import { DeleteMessage } from "./ModalDeleteMessage";
import styles from './style.module.css'

export default function Home() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [phone] = useMediaQuery('(max-width: 550px)')
  const pageRef = useRef()

  const friendIndex = useSelector(getFriendIndex);
  const friendList = useSelector(getFriendList);

  const { handleLeftClick, msgBg, messageToDelete, showSidebar } = useContext(ExpandFile);

  const { clientX, clientY } = msgBg;

  return (
    <Box overflow='hidden' ref={pageRef}>
      <HStack spacing={0}
        className={styles.box}
        onClick={handleLeftClick}
        as={Tabs}
        index={friendIndex}
        position='relative'
        left={showSidebar ? '0px' : phone ? '-100%' : '-400px'}
      >
      <Box className={styles.sidebar}>
        <Sidebar />
      </Box>
      <Box className={styles.main}>
        <Chat user={friendList[friendIndex]} />
      </Box>
      {clientX && clientY && (
        <MessageView
          showSidebar={showSidebar}
          pageRef={pageRef}
          onOpen={onOpen}
          clientX={clientX}
          clientY={clientY}
        />
      )}
      <DeleteMessage
        messageToDelete={messageToDelete}
        onClose={onClose}
        isOpen={isOpen}
        username={friendList[friendIndex]?.username}
        userid={friendList[friendIndex]?.userid}
      />
    </HStack>
    </Box>
  );
}
