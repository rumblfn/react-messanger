import { Box, Heading } from "@chakra-ui/react";

export const UserDescription = ({ text }) => {
  return (
    <Box
      w="100%"
      maxW="645px"
      style={{marginLeft: "auto", marginRight: "auto", marginTop: 6 }}
    >
      <Box
        w="100%"
        style={{ wordBreak: "break-all" }}
        wordBreak="break-all"
        borderRadius="12px"
        h="150px" overflow='hidden'
        padding="0.5rem 1rem"
        boxShadow="outline"
      >
        {text}
      </Box>
    </Box>
  );
};
