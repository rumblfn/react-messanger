import { Heading, Text, VStack } from "@chakra-ui/react";
import { useContext } from "react";
import { ExpandFile } from "../../ToExpandFile";
import { MessageTime } from "./MessageTime";
import styles from "./style.module.css";

export const Reply = ({ margins, bgColor, message, TimeParams }) => {
  const {handleScrollToReply} = useContext(ExpandFile)
  let reply = message.reply;

  return (
    <VStack
      className={styles.message}
      maxW="70%"
      m={margins}
      fontSize="md"
      bg={bgColor}
      borderRadius="10px"
      p="0.5rem 0.5rem 0.3rem"
      pos="relative"
      w="fit-content"
    >
        <VStack
          w="100%"
          cursor="pointer"
          spacing={0}
          p="0.2rem"
          bg="rgba(0, 0, 0, 0.1)"
          borderRadius="8px"
          onClick={() => handleScrollToReply(reply[2])}
        >
          <Heading m={margins} color="blue.500" size="xs">
            {reply[0]}
          </Heading>
          <Text m={margins}
            color="black"
            p={0}
            fontSize="14px"
            wordBreak="keep-all"
            overflow="hidden"
          >
            {reply[1]?.slice(0, 100)}
          </Text>
        </VStack>
      <Text m={margins} color="gray.900">
        {message?.content}
        <MessageTime TimeParams={TimeParams} />
      </Text>
    </VStack>
  );
};
