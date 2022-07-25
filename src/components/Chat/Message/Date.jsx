import { Text } from "@chakra-ui/react";
import { useTimeToDay } from "../../../hooks/useTimeToDay";

export const TimeDateMiddle = ({ time }) => {
  const formattedDate = useTimeToDay(time);

  return (
    <Text
      m={2}
      fontSize="xs"
      bg="blue.50"
      color="gray.900"
      borderRadius="10px"
      p="0.25rem 0.5rem"
      textAlign="center"
    >
      {formattedDate}
    </Text>
  );
};
