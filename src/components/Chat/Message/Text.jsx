import { Text } from "@chakra-ui/react";
import { MessageTime } from "./MessageTime";
import styles from "./style.module.css";

export const TextBox = ({ margins, bgColor, text, TimeParams }) => {
  return (
    <Text
      className={styles.message}
      pos="relative"
      maxW="70%"
      m={margins}
      fontSize="md"
      bg={bgColor}
      color="gray.900"
      borderRadius="10px"
      p="0.3rem 0.75rem"
    >
      {text}
      <MessageTime TimeParams={TimeParams} />
    </Text>
  );
};
