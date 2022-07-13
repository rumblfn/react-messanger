import { Text } from "@chakra-ui/react";

export const OneMessage = ({ message, idx, friend }) => {
  return (
    <Text
      maxW="60%"
      m={
        message.to === friend.userid
          ? "1rem 0 0 auto !important"
          : "1rem auto 0 0 !important"
      }
      fontSize="lg"
      key={`msg:${friend.userid}.${idx}`}
      bg={message.to === friend.userid ? "blue.100" : "gray.100"}
      color="gray.900"
      borderRadius="10px"
      p="0.5rem 1rem"
    >
      {message.content}
    </Text>
  );
};
