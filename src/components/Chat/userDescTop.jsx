import { PhoneIcon } from "@chakra-ui/icons";
import {
  Avatar,
  Box,
  Button,
  Heading,
  HStack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useTimeToDay } from "../../hooks/useTimeToDay";

export const UserDescTop = ({ user }) => {
  const formattedDate = useTimeToDay(user.lastActiveDay);
  const navigate = useNavigate()

  return (
    <HStack w="100%" p="0.5rem 1rem 0">
      <VStack w="100%">
        <HStack alignItems="center" w="100%">
          <Avatar
            size="xs"
            name={user?.username || ""}
            // src="https://bit.ly/dan-abramov"
          />
          <Heading fontSize="md" wordBreak="break-all">
            {user?.username || ""}
          </Heading>
        </HStack>
        {user?.connected ? (
          <Text fontSize="xs" pl="0.15rem" color="green.500" w="100%">
            Online
          </Text>
        ) : (
          <Text fontSize="xs" color="gray.500" w="100%">
            last seen {formattedDate} at {user?.formattedTime}
          </Text>
        )}
      </VStack>
      <Box>
        {<Button onClick={() => navigate('voice')}>
            <PhoneIcon fontSize="md" />
        </Button>}
      </Box>
    </HStack>
  );
};
