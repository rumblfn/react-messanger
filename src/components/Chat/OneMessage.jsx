import { DownloadIcon } from "@chakra-ui/icons";
import {
  HStack,
  Image,
  Link,
  Spacer,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import ReactPlayer from "react-player";
import { useTimeToDay } from "../../hooks/useTimeToDay";
import styles from "./style.module.css";

export const OneMessage = ({ message, friend }) => {
  const { colorMode } = useColorMode();
  const formattedDate = useTimeToDay(message.time);

  if (message.type === "time") {
    return (
      <Text
        m={2}
        fontSize="xs"
        bg="blue.50"
        color="gray.900"
        borderRadius="10px"
        p="0.25rem 0.5rem"
        textAlign="center"
      >
        {formattedDate}
      </Text>
    );
  }

  if (message.type === "IMAGE") {
    return (
      <Image
        className={styles.message}
        borderRadius="10px"
        m={
          message.to === friend.userid
            ? "1rem 0 0 auto !important"
            : "1rem auto 0 0 !important"
        }
        maxW="70%"
        crossOrigin="anonymous"
        src={`${process.env.REACT_APP_HOST_URL}/media/getFile/${message.content}`}
      />
    );
  }

  if (message.type === "VIDEO" || message.type === "FILE") {
    return (
      <HStack
        backgroundColor="gray.400"
        p="0.5rem 0.75rem"
        borderRadius="10px"
        border="2px solid black"
        maxW="70%"
        m={
          message.to === friend.userid
            ? "1rem 0 0 auto !important"
            : "1rem auto 0 0 !important"
        }
      >
        <Text wordBreak="break-all">{message.content}</Text>
        <Spacer />
        <DownloadIcon
          onClick={() =>
            window.open(
              `${process.env.REACT_APP_HOST_URL}/media/getFile/${message.content}`,
              "_blank"
            )
          }
          cursor="pointer"
        />
      </HStack>
    );
  }

  return (
    <Text
      className={styles.message}
      pos="relative"
      maxW="70%"
      m={
        message.to === friend.userid
          ? "1rem 0 0 auto !important"
          : "1rem auto 0 0 !important"
      }
      fontSize="sm"
      bg={message.to === friend.userid ? "blue.100" : "gray.100"}
      color="gray.900"
      borderRadius="10px"
      p="0.5rem 1rem"
    >
      {message.content}
      <span
        className={styles["message-time"]}
        style={{
          color: colorMode === "light" ? "gray.700" : "white",
          left: message.to === friend.userid ? "-60px" : "",
          right: message.to === friend.userid ? "" : "-60px",
          top: -2,
        }}
      >
        {message.formattedTime}
      </span>
    </Text>
  );
};
