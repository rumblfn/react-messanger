import { Box, Image } from "@chakra-ui/react";
import { MessageTime } from "./MessageTime";
import styles from "./style.module.css";

export const ImageBox = ({ filename, margins, TimeParams }) => {
  return (
    <Box w="100%" className={styles.message}>
      <Image
        m={margins}
        borderRadius="10px"
        maxW="70%"
        maxH='60vh'
        crossOrigin="anonymous"
        src={`${process.env.REACT_APP_HOST_URL}/media/getFile/${filename}`}
      />
      <MessageTime TimeParams={TimeParams} />
    </Box>
  );
};
