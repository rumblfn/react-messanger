import { Box, Image } from "@chakra-ui/react";
import { useContext } from "react";
import { ExpandFile } from "../../ToExpandFile";
import { MessageTime } from "./MessageTime";
import styles from "./style.module.css";

export const ImageBox = ({ margins, TimeParams, src }) => {
  const {setFilename} = useContext(ExpandFile)

  const fullFilename = `${process.env.REACT_APP_HOST_URL}/media/getFile/${src}`

  return (
    <Box w="100%" className={styles.message}>
      <Image onClick={() => setFilename(fullFilename)}
        className={styles.image} loading="lazy"
        m={margins}
        borderRadius="10px"
        maxW="70%"
        maxH='60vh'
        crossOrigin="anonymous"
        src={fullFilename}
      />
      <MessageTime TimeParams={TimeParams} />
    </Box>
  );
};
