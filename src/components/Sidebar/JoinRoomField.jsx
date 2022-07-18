import { Button, Heading, HStack, Input, Text, VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import socket from "../../socket";

export const JoinRoomField = () => {
  const navigate = useNavigate();
  const [roomName, setRoomName] = useState('');
  const [err, setErr] = useState();
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    socket.on("FE-error-user-exist", ({ error, username, roomName }) => {
      if (!error) {
        navigate(`/room/${roomName}`);
      } else {
        setErr(error);
        setErrMsg("User already connected");
      }
    });
  }, [navigate]);

  const clickJoin = () => {
    if (roomName) {
      socket.emit("BE-check-user", { roomId: roomName });
    } else {
      setErr(true);
      setErrMsg("Enter Room Name");
    }
  };

  const clearErrors = () => {
    setErr(false);
    setErrMsg("");
  };

  return (
    <VStack>
      <Heading size="md" w="100%" pl={4}>
        Enter room name
      </Heading>
      <HStack w="100%" pl={2} pr={2}>
        <Input
          placeholder="create or join room"
          value={roomName}
          onChange={(e) => {
            clearErrors();
            setRoomName(e.target.value);
          }}
        />
        <Button pl={6} pr={6} bg="blue.200" onClick={clickJoin}>
          Join Room
        </Button>
      </HStack>
      {err && (
        <Text color="red.700" fontWeight={500}>
          {errMsg}
        </Text>
      )}
    </VStack>
  );
};
