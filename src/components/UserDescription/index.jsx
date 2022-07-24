import { Box, Heading } from "@chakra-ui/react";

export const UserDescription = ({ text }) => {
  return (
    <Box
      w="100%"
      maxW="645px"
      style={{marginLeft: "auto", marginRight: "auto" }}
    >
      <Box
        w="100%"
        style={{ wordBreak: "break-all" }}
        wordBreak="break-all"
        padding="0.5rem 1rem"
      >
        {text}
      </Box>
    </Box>
  );
};
