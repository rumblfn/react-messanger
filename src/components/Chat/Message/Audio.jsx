import { DownloadIcon } from "@chakra-ui/icons";
import { Box, HStack, Spacer, Text } from "@chakra-ui/react";
import { faFilm } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { MessageTime } from "./MessageTime";
import styles from "./style.module.css";

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
        <HStack
            className={styles.message}
            backgroundColor={bgColor}
            p="0.3rem 0.7rem"
            borderRadius="10px"
            maxW="70%"
            m={margins}
        >
            <FontAwesomeIcon icon={faFilm} />
            <Text fontSize="sm" wordBreak="break-all">
                {filename}
            </Text>
            <Spacer />
            <DownloadIcon
                onClick={() => window.open(fullFilename, "_blank")}
                cursor="pointer"
            />
            <MessageTime TimeParams={TimeParams} />
        </HStack>
    );
};
