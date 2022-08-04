import { Box } from "@chakra-ui/react";
import {faFilm} from "@fortawesome/free-solid-svg-icons";
import { MessageTime } from "./MessageTime";
import styles from "./style.module.css";
import {SimpleFile} from "./File";

export const VideoBox = ({filename, margins, TimeParams, bgColor, src }) => {
  const fullFilename = `${process.env.REACT_APP_HOST_URL}/media/getFile/${src}`;

  if (src.endsWith(".mp4")) {
    return (
      <Box m={margins} maxW="70%" maxH="60vh" className={styles.message}>
        <Box borderRadius="10px" overflow="hidden">
          <video
            playsInline
            controls
            style={{ width: "100%", height: "100%" }}
            crossOrigin="anonymous"
            src={fullFilename}
          />
        </Box>
        <MessageTime TimeParams={TimeParams} />
      </Box>
    );
  }

  return (
    <SimpleFile
      icon={faFilm}
      filename={filename}
      margins={margins}
      TimeParams={TimeParams}
      bgColor={bgColor}
      src={src}
    />
  );
};
