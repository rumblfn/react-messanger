import { Heading, HStack, useColorMode, VStack } from "@chakra-ui/react";
import { faReply, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext } from "react";
import { ExpandFile } from "../ToExpandFile";
import styles from "./style.module.css";
import React from "react";

export const MessageView = ({ clientX, clientY, onOpen, pageRef, showSidebar }) => {
  const { colorMode } = useColorMode();
  const {handleReplyMessage, handleMessageToDelete} = useContext(ExpandFile)

  let translateX = '0%'
  let translateY = '0%'

  if ((clientX / window.innerWidth) > 0.75) {
    translateX = '-100%'
  }

  if ((clientY / window.innerHeight) > 0.8) {
    translateY = '-100%'
  }

  return (
    <VStack
      bg={
        colorMode === "light"
          ? "var(--main-app-light-bg-color)"
          : "var(--bg-color-1)"
      }
      className={styles.main}
      left={showSidebar ? clientX : clientX + (pageRef?.current?.scrollWidth - window.innerWidth)}
      top={clientY}
      style={{transform: `translate(${translateX}, ${translateY}) scale(0.7)`}}
      boxShadow="md"
    >
      <HStack onClick={handleReplyMessage}
        _hover={{
          backgroundColor:
            colorMode === "light" ? "whitesmoke" : "var(--hover-bg-color-1)",
        }}
        color={
          colorMode === "light"
            ? "var(--main-app-dark-bg-color)"
            : "var(--main-app-light-bg-color)"
        }
        className={styles.item}
        w="100%"
      >
        <FontAwesomeIcon icon={faReply} />
        <Heading size="xs">Reply</Heading>
      </HStack>
      <HStack onClick={() => {
        handleMessageToDelete()
        onOpen()
      }}
        _hover={{
          backgroundColor:
            colorMode === "light" ? "whitesmoke" : "var(--hover-bg-color-1)",
        }}
        color={
          colorMode === "light"
            ? "var(--main-app-dark-bg-color)"
            : "var(--main-app-light-bg-color)"
        }
        className={styles.item}
        w="100%"
      >
        <FontAwesomeIcon icon={faTrash} />
        <Heading size="xs">Delete</Heading>
      </HStack>
    </VStack>
  );
};
