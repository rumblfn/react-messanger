import { ChatIcon } from "@chakra-ui/icons";
import { Button, HStack, Input } from "@chakra-ui/react";
import { useRef } from "react";
import { useActions } from "../../hooks/useActions";
import socket from "../../socket";

export const SearchInput = ({ setSuccess, setErrorMsg }) => {
  const friendInputRef = useRef();

  const { addFriend, addConfirmation } = useActions();

  const getFriend = async (username) => {
    if (!username || username.length < 5) return;

    socket.emit(
      "add_friend",
      username,
      ({ errorMsg, done, friend, confirmation }) => {
        if (done) {
          if (friend) {
            addFriend(friend);
          }
          if (confirmation) {
            addConfirmation(confirmation);
          }
          setSuccess(errorMsg);
          setErrorMsg("");
          return;
        }
        setErrorMsg(errorMsg);
        setSuccess("");
      }
    );
  };

  return (
    <HStack w="100%" justify="space-evenly" pl="0.5rem" pr="0.5rem">
      <Input ref={friendInputRef} placeholder="Add friend" size="md" />
      <Button p={0} onClick={() => getFriend(friendInputRef.current.value)}>
        <ChatIcon />
      </Button>
    </HStack>
  );
};
