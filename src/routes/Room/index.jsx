import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ProfileTopPreview } from "../../components/Sidebar/profileTopPreview";
import { Box, Button, Container, HStack, Text, VStack } from "@chakra-ui/react";
import { useEffect } from "react";
import Peer from "peerjs";
import socket from "../../socket";
import { useContext } from "react";
import { VoiceContext } from "../../VoiceContext";
import { useRef } from "react";

const Room = () => {
  const navigate = useNavigate();
  const { roomID } = useParams();
  const { userPeer: userPeerId } = useContext(VoiceContext);

  let peerRef = useRef();
  const connRef = useRef();

  const myVideo = useRef();
  const userVideo = useRef();

  const [stream, setStream] = useState();

  const [callEnded, setCallEnded] = useState(false);

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        setStream(stream);
        try {
          myVideo.current.srcObject = stream;
        } catch {}
      });

    peerRef.current = new Peer();

    peerRef.current.on("open", (id) => {
      socket.emit("send peer id", { roomID, id });
    });

    peerRef.current.on("call", (call) => {
      call.answer(stream);
    });
  }, []);

  useEffect(() => {
    if (peerRef.current && userPeerId && stream) {
      connRef.current = peerRef.current.connect(userPeerId);
      var call = peerRef.current.call(userPeerId, stream);

      call.on("stream", (stream) => {
        userVideo.current.srcObject = stream;
      });
    }
  }, [userPeerId, stream]);

  return (
    <Container>
      <VStack pt={1}>
        <HStack w="100%">
          <ProfileTopPreview />
          <Button
            onClick={() => {
              navigate("/home");
            }}
          >
            <Text>Home</Text>
          </Button>
        </HStack>
        <Box>
          {stream && (
            <video
              playsInline
              muted
              ref={myVideo}
              autoPlay
              style={{ width: 300, height: 200 }}
            />
          )}
          {!callEnded && (
            <video
              muted
              playsInline
              ref={userVideo}
              autoPlay
              style={{ width: 300, height: 200 }}
            />
          )}
        </Box>
      </VStack>
    </Container>
  );
};

export default Room;
