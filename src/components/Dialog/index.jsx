import { Box } from "@chakra-ui/react";
import { useRef } from "react";
import useDraggable from "../../hooks/useDraggable";

export const DraggableCallRequest = ({children}) => {

    const dialogRef = useRef(null)
    useDraggable(dialogRef)

  return (
    <Box
      ref={dialogRef}
      borderRadius="md"
      boxShadow="base"
      w="300px"
      h="200px"
      borderWidth="1px"
      p="0.5rem 0.75rem"
      position="absolute"
      left="3%"
      bottom="5%"
      bg="white"
      zIndex='10'
    >
      {children}
    </Box>
  );
};
