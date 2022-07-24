import { Box, Text } from "@chakra-ui/react";
import styles from "./style.module.css";

export const DragAndDropFiles = ({
  onDropHandler,
  dragStartHandler,
  dragLeaveHandler,
}) => {
  return (
    <Box
      onDrop={(e) => onDropHandler(e)}
      onDragStart={(e) => dragStartHandler(e)}
      onDragLeave={(e) => dragLeaveHandler(e)}
      onDragOver={(e) => dragStartHandler(e)}
      position="absolute"
      left="0"
      top="0"
      w="100%"
      h="100%"
      p="1rem"
      style={{ backgroundColor: "white" }}
    >
      <Box
        className={styles["drag-and-drop-box"]}
        alignItems="center"
        borderRadius={12}
        w="100%"
        h="100%"
        border="3px dashed gray"
        display="flex"
        justifyContent="center"
      >
        <Text color="gray.600" fontWeight={500}>
          Drop file, to load it
        </Text>
      </Box>
    </Box>
  );
};
