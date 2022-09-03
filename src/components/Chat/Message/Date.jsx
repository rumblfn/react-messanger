import {Box, Text} from "@chakra-ui/react";
import { useTimeToDay } from "../../../hooks/useTimeToDay";

export const TimeDateMiddle = ({ time }) => {
  const formattedDate = useTimeToDay(time);

  return (
    <Box>
      <Text
        m='0.5rem auto'
        fontSize="xs"
        bg="blue.50"
        color="gray.900"
        borderRadius="10px"
        p="0.25rem 0.5rem"
        textAlign="center"
        w='fit-content'
      >
        {formattedDate}
      </Text>
    </Box>
  );
};
