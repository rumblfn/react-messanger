import { Text, useColorMode } from "@chakra-ui/react";
import { useTimeToDay } from "../../hooks/useTimeToDay";
import styles from "./style.module.css";

export const OneMessage = ({ message, friend }) => {
  const { colorMode } = useColorMode()
  const formattedDate = useTimeToDay(message.time)

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
      fontSize="lg"
      bg={message.to === friend.userid ? "blue.100" : "gray.100"}
      color="gray.900"
      borderRadius="10px"
      p="0.5rem 1rem"
    >
      {message.content}
      <span
        className={styles["message-time"]}
        style={{
          color: colorMode === 'light' ? 'gray.700' : 'white',
          left: message.to === friend.userid ? "-60px" : "",
          right: message.to === friend.userid ? "" : "-60px",
          top: -2
        }}
      >
        {message.formattedTime}
      </span>
    </Text>
  );
};