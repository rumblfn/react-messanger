import { Box } from "@chakra-ui/react";
import { MessageTime } from "./MessageTime";
import styles from "./style.module.css";
import {SimpleFile} from "./File";
import {faFileAudio} from "@fortawesome/free-solid-svg-icons";

export const AudioBox = ({filename, margins, TimeParams, bgColor, src }) => {
    const fullFilename = `${process.env.REACT_APP_HOST_URL}/media/getFile/${src}`;

    if (src.endsWith(".mp3")) {
      return (
        <Box m={margins} maxW="70%" maxH="60vh" className={styles.message}>
          <audio
            controls
            crossOrigin="anonymous"
            src={fullFilename}
            style={{width: '100%'}}
          />
          <MessageTime TimeParams={TimeParams} />
        </Box>
      );
    }

    return (
      <SimpleFile
        icon={faFileAudio}
        filename={filename}
        margins={margins}
        TimeParams={TimeParams}
        bgColor={bgColor}
        src={src}
      />
    );
};
