import { Text } from "@chakra-ui/react";
import styles from "./style.module.css";

export const OneMessage = ({ message, friend }) => {
  if (message.type === "time") {
    return (
      <Text
        m={2}
        fontSize="xs"
        bg="gray.50"
        color="gray.900"
        borderRadius="10px"
        p={1}
        textAlign="center"
      >
        {message.time || '00.00.1970'}
      </Text>
    );
  }

  return (
    <Text
        className={styles.message}
      pos="relative"
      maxW="60%"
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
          left: message.to === friend.userid ? "-70px" : "",
          right: message.to === friend.userid ? "" : "-70px",
        }}
      >
        {message.formattedTime}
      </span>
    </Text>
  );
};
