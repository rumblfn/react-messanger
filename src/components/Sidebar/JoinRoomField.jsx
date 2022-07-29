import { Button, Heading, HStack, Input, Text, VStack } from "@chakra-ui/react";
import { useContext } from "react";
import { useRef } from "react";
import { useState } from "react";
import { AccountContext } from "../AccountContext";
import React from "react";

export const JoinRoomField = () => {
  const roomRef = useRef();
  const [err, setErr] = useState(false);
  const [errMsg, setErrMsg] = useState('');

  const clickJoin = () => {
    const roomName = roomRef.current.value;

    if (!roomName) {
      setErr(true);
      setErrMsg('Enter Room Name');
    } else {
      window.open(`${process.env.REACT_APP_VIDEO_HOST_URL}/${roomName}`, "_blank")
    }
  };

  return (
    <VStack w="100%">
      <Heading size="md" w="100%" pl={4}>
        Enter room name
      </Heading>
      <HStack w="100%" pl={2} pr={2}>
        <Input
          placeholder="create or join room"
          ref={roomRef}
        />
        <Button style={{overflow: 'hidden'}} pl={6} pr={6} bg="blue.200" onClick={clickJoin}>
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
