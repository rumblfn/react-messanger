import { SettingsIcon } from "@chakra-ui/icons";
import { Avatar, Box, Button, Heading, Spacer } from "@chakra-ui/react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AccountContext } from "../AccountContext";

export const ProfileTopPreview = () => {
  const navigate = useNavigate();
  const { user } = useContext(AccountContext);

  return (
    <Box
      pl="0.5rem"
      pr="0.5rem"
      w="100%"
      alignItems="center"
      display="flex"
      gap={2}
    >
      <Box display="flex" alignItems="center" gap={2}>
        <Avatar
          name={user.username}
          // src="https://bit.ly/dan-abramov"
        />
        <Heading fontSize="md" wordBreak="break-all">
          {user.username}
        </Heading>
      </Box>
      <Spacer />
      <Button p={0} onClick={() => navigate("/dashboard")} colorScheme="teal">
        <SettingsIcon />
      </Button>
    </Box>
  );
};
