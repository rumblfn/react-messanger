import { CopyIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Container,
  HStack,
  Input,
  Spacer,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { useContext } from "react";
import { useRef } from "react";
import { useState } from "react";
import SimplePeer from "simple-peer";
import { AccountContext } from "../../components/AccountContext";
import BottomBar from "../../components/Chat/BottomBar";
import { ProfileTopPreview } from "../../components/Sidebar/profileTopPreview";
import socket from "../../socket";

const LiveRoom = () => {
  const [me, setMe] = useState("");
  const [stream, setStream] = useState();
  const [receivingCall, setReceivingCall] = useState(false);
  const [caller, setCaller] = useState("");
  const [callerSignal, setCallerSignal] = useState();
  const [callAccepted, setCallAccepted] = useState(false);
  const [idToCall, setIdToCall] = useState("");
  const [callEnded, setCallEnded] = useState(false);
  const { user } = useContext(AccountContext);
  const selfUsername = user.username;
  const [name, setName] = useState("");

  const myVideo = useRef();
  const userVideo = useRef();
  const connectionRef = useRef();

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        setStream(stream);
        myVideo.current.srcObject = stream;
      });

    socket.emit("me");

    socket.on("me", (id) => {
      setMe(id);
    });

    socket.on("callUser", (data) => {
      setReceivingCall(true);
      setCaller(data.from);
      setName(data.name);
      setCallerSignal(data.signal);
    });
  }, []);

  const callUser = (id) => {
    const peer = new SimplePeer({
      initiator: true,
      trickle: false,
      stream: stream,
    });

    peer.on("signal", (data) => {
      socket.emit("callUser", {
        userToCall: id,
        signalData: data,
        from: me,
        name: selfUsername,
      });
    });

    peer.on("stream", (stream) => {
      userVideo.current.srcObject = stream;
    });

    socket.on("callAccepted", (signal) => {
      setCallAccepted(true);
      peer.signal(signal);
    });

    connectionRef.current = peer;
  };

  const answerCall = () => {
    setCallAccepted(true);
    const peer = new SimplePeer({
      initiator: false,
      trickle: false,
      stream: stream,
    });

    peer.on("signal", (data) => {
      socket.emit("answerCall", {
        signal: data,
        to: caller,
      });
    });

    peer.on("stream", (stream) => {
      userVideo.current.srcObject = stream;
    });

    peer.signal(callerSignal);
    connectionRef.current = peer;
  };

  const leaveCall = () => {
    setCallEnded(true);
    connectionRef.current.destroy();
  };

  return (
    <VStack py="0.5rem" w="100%" maxW="1440px" m="auto" h="100vh">
      <ProfileTopPreview />
      <VStack w="100%" h="100%" pl={2} pr={2}>
        <HStack w="100%" mt={4}>
          <Spacer />
          {stream && (
            <div style={{ width: "50%", borderRadius: 8, overflow: "hidden" }}>
              <video
                playsInline
                muted
                ref={myVideo}
                autoPlay
                style={{ width: "100%" }}
              />
            </div>
          )}
          {callAccepted && !callEnded && (
            <div style={{ width: "50%", borderRadius: 8, overflow: "hidden" }}>
              <video
                muted
                playsInline
                ref={userVideo}
                autoPlay
                style={{ width: "100%" }}
              />
            </div>
          )}
          <Spacer />
        </HStack>
        <BottomBar/>
        <Spacer />
        <Container>
          <HStack mt={10} mb={1}>
            <Text
              w="100%"
              bg="gray.100"
              p="0.5rem 1rem"
              style={{
                display: "flex",
                alignItems: "center",
                borderRadius: 12,
              }}
            >
              <span>
                Your ID: <b>{me}</b>
              </span>
            </Text>
            <Button onClick={() => navigator.clipboard.writeText(me)} bg="green.300" p={0}>
              <CopyIcon />
            </Button>
          </HStack>
        </Container>
        <Container>
          <HStack mb={2}>
            <Input
              placeholder="paste yout friend id here"
              onChange={(e) => setIdToCall(e.target.value)}
              value={idToCall}
            />
            {callAccepted && !callEnded ? (
              <Button bg="red.300" onClick={leaveCall}>
                End Call
              </Button>
            ) : (
              <Button bg="green.200" onClick={() => callUser(idToCall)}>
                Call User
              </Button>
            )}
            {idToCall}
          </HStack>
        </Container>
        <Container>
          {receivingCall && !callAccepted && (
            <HStack>
              <Text>
                <b>{name}</b> is calling ...{" "}
              </Text>
              <Spacer />
              <Button bg="purple.300" p="0.25rem 0.65rem" onClick={answerCall}>Answer</Button>
            </HStack>
          )}
        </Container>
      </VStack>
    </VStack>
  );
};

export default LiveRoom;
