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
import Peer from "simple-peer"
import { useEffect } from "react";
import { useRef } from "react";
import { useState } from "react";
import { useTimeToDay } from "../../hooks/useTimeToDay";
import socket from "../../socket";

export const TopUserInfo = ({ user }) => {
  const formattedDate = useTimeToDay(user.lastActiveDay);

  const [callAccepted, setCallAccepted] = useState(false);
  const [callEnded, setCallEnded] = useState(false);
  const [stream, setStream] = useState();
  const userVideo = useRef();
  const connectionRef = useRef();
  const myVideo = useRef();
  const [receivingCall, setReceivingCall] = useState(false);
  const [caller, setCaller] = useState("");
  const [callerSignal, setCallerSignal] = useState();
  const [ name, setName ] = useState("")

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        setStream(stream);
        myVideo.current.srcObject = stream;
      });

    socket.on("callUser", (data) => {
      setReceivingCall(true);
      setCaller(data.from);
      setName(data.name);
      setCallerSignal(data.signal);
    });
  }, []);

  const leaveCall = () => {
    setCallEnded(true)
	connectionRef.current.destroy()
  };

  const callUser = (userid) => {
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream: stream,
    });

    peer.on("signal", (data) => {
      socket.emit("callUser", {
        userToCall: userid,
        signalData: data,
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

  const answerCall =() =>  {
    setCallAccepted(true)
    const peer = new Peer({
        initiator: false,
        trickle: false,
        stream: stream
    })
    peer.on("signal", (data) => {
        socket.emit("answerCall", { signal: data, to: caller })
    })
    peer.on("stream", (stream) => {
        userVideo.current.srcObject = stream
    })

    peer.signal(callerSignal)
    connectionRef.current = peer
}

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
        {user.connected ? (
          <Text fontSize="xs" pl="0.15rem" color="green.500" w="100%">
            Online
          </Text>
        ) : (
          <Text fontSize="xs" color="gray.500" w="100%">
            last seen {formattedDate} at {user.formattedTime}
          </Text>
        )}
        <div className="video">
			{stream &&  <video playsInline muted ref={myVideo} autoPlay style={{ width: "300px" }} />}
		</div>
		<div className="video">
			{callAccepted && !callEnded ?
			    <video playsInline ref={userVideo} autoPlay style={{ width: "300px"}} />:
			null}
		</div>
        <h4 onChange={(e) => setName(e.target.value)}>
            {name}
        </h4>
        <div>
			{receivingCall && !callAccepted ? (
					<div className="caller">
					<h1 >{name} is calling...</h1>
					<Button variant="contained" color="primary" onClick={answerCall}>
						Answer
					</Button>
				</div>
			) : null}
		</div>
      </VStack>
      <Box>
        {callAccepted && !callEnded ? (
          <Button onClick={leaveCall}>End Call</Button>
        ) : (
          <Button onClick={() => callUser(user?.userid)}>
            <PhoneIcon fontSize="md" />
          </Button>
        )}
      </Box>
    </HStack>
  );
};
