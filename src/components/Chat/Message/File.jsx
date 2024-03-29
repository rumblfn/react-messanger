import { DownloadIcon } from "@chakra-ui/icons";
import { HStack, Spacer, Text } from "@chakra-ui/react";
import { faFileAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { MessageTime } from "./MessageTime";
import styles from "./style.module.css";

export const SimpleFile = ({ margins, filename, TimeParams, bgColor, src, icon }) => {

  return (
    <HStack color='var(--main-app-dark-bg-color)'
      className={styles.message}
      backgroundColor={bgColor}
      p="0.3rem 0.7rem"
      borderRadius="10px"
      maxW="70%"
      w='fit-content'
      m={margins}
    >
      <FontAwesomeIcon icon={icon || faFileAlt} />
      <Text fontSize="sm" wordBreak="break-all">
        {filename}
      </Text>
      <Spacer />
      <DownloadIcon
        onClick={() =>
          window.open(
            `${process.env.REACT_APP_HOST_URL}/media/getFile/${src}`,
            "_blank"
          )
        }
        cursor="pointer"
      />
      <MessageTime TimeParams={TimeParams} />
    </HStack>
  );
};
