import { HStack, Spacer, VStack } from "@chakra-ui/react";
import { useEffect } from "react";
import { useContext, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { AccountContext } from "../../components/AccountContext";
import { ProfileTopPreview } from "../../components/Sidebar/profileTopPreview";
import socket from "../../socket";
import styled from 'styled-components';
import VideoCard from "./VideoCard";
import SimplePeer from "simple-peer";

export const Room = () => {
  const { user } = useContext(AccountContext);
  const currentUser = user.username;
  const [peers, setPeers] = useState([]);
  const [userVideoAudio, setUserVideoAudio] = useState({
    localUser: { video: true, audio: true },
  });
  const [videoDevices, setVideoDevices] = useState([]);
  const [displayChat, setDisplayChat] = useState(false);
  const [screenShare, setScreenShare] = useState(false);
  const [showVideoDevices, setShowVideoDevices] = useState(false);
  const peersRef = useRef([]);
  const userVideoRef = useRef();
  const screenTrackRef = useRef();
  const userStream = useRef();
  const { roomId } = useParams();

  useEffect(() => {
    navigator.mediaDevices.enumerateDevices().then((devices) => {
      const filtered = devices.filter((device) => device.kind === "videoinput");
      setVideoDevices(filtered);
    });

    window.addEventListener("popstate", goToBack);

    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        userVideoRef.current.srcObject = stream;
        userStream.current = stream;

        socket.emit("BE-join-room", { roomId });
        socket.on("FE-user-join", (users) => {
          const peers = [];
          users.forEach(({ userId, info }) => {
            let { userName, video, audio } = info;

            if (userName !== currentUser) {
              const peer = createPeer(userId, socket.id, stream);

              peer.userName = userName;
              peer.peerID = userId;

              peersRef.current.push({
                peerID: userId,
                peer,
                userName,
              });
              peers.push(peer);

              setUserVideoAudio((preList) => {
                return {
                  ...preList,
                  [peer.userName]: { video, audio },
                };
              });
            }
          });

          setPeers(peers);
        });

        socket.on("FE-receive-call", ({ signal, from, info }) => {
          let { userName, video, audio } = info;
          const peerIdx = findPeer(from);

          if (!peerIdx) {
            const peer = addPeer(signal, from, stream);
            console.log(peer);

            peer.userName = userName;

            peersRef.current.push({
              peerID: from,
              peer,
              userName: userName,
            });
            setPeers((users) => {
              return [...users, peer];
            });
            setUserVideoAudio((preList) => {
              return {
                ...preList,
                [peer.userName]: { video, audio },
              };
            });
          }
        });

        socket.on("FE-user-leave", ({ userId }) => {
          const peerIdx = findPeer(userId);

          peerIdx.peer.destroy();
          setPeers((users) => {
            users = users.filter((user) => user.peerID !== peerIdx.peer.peerID);
            return [...users];
          });
          peersRef.current = peersRef.current.filter(
            ({ peerID }) => peerID !== userId
          );
        });
      });
  }, []);

  const addPeer = (incomingSignal, callerId, stream) => {
    const peer = new SimplePeer({
      initiator: false,
      trickle: false,
      stream: stream,
    });

    peer.on("signal", (signal) => {
      socket.emit("BE-accept-call", { signal, to: callerId });
    });

    peer.on("disconnect", () => {
      peer.destroy();
    });

    peer.signal(incomingSignal);

    return peer;
  };

  const createPeer = (userId, caller, stream) => {
    const peer = new SimplePeer({
      initiator: true,
      trickle: false,
      stream: stream,
    });

    peer.on("signal", (signal) => {
      socket.emit("BE-call-user", {
        userToCall: userId,
        from: caller,
        signal,
      });
    });
    peer.on("disconnect", () => {
      peer.destroy();
    });

    return peer;
  };

  const findPeer = (id) => {
    return peersRef.current.find((p) => p.peerID === id);
  };

  const goToBack = (e) => {
    e.preventDefault();
    socket.emit("BE-leave-room", { roomId });
    window.location.href = "/home";
  };

  const writeUserName = (userName, index) => {
    if (userVideoAudio.hasOwnProperty(userName)) {
      if (!userVideoAudio[userName].video) {
        return <UserName key={userName}>{userName}</UserName>;
      }
    }
  }

  const createUserVideo = (peer, index, arr) => {
    return (
      <VideoBox
        className={`width-peer${peers.length > 8 ? '' : peers.length}`}
        key={index}
      >
        {writeUserName(peer.userName)}
        <VideoCard key={index} peer={peer} number={arr.length} />
      </VideoBox>
    );
  }

  return (
    <VStack py="0.5rem" w="100%" maxW="1440px" m="auto" h="100vh">
      <ProfileTopPreview />
      <VStack w="100%" h="100%" pl={2} pr={2}>
        <HStack w="100%" mt={4}>
          <Spacer />
          <VideoBox
            className={`width-peer${peers.length > 8 ? '' : peers.length}`}
          >
            {userVideoAudio['localUser'].video ? null : (
              <UserName>{currentUser}</UserName>
            )}
            <MyVideo
              ref={userVideoRef}
              muted
              autoPlay
              playInline
            ></MyVideo>
          </VideoBox>
          {/* Joined User Vidoe */}
          {peers &&
            peers.map((peer, index, arr) => createUserVideo(peer, index, arr))}
          <Spacer />
        </HStack>
      </VStack>
    </VStack>
  );
};

const UserName = styled.div`
  position: absolute;
  font-size: calc(20px + 5vmin);
  z-index: 1;
`;

const VideoBox = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  > video {
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  :hover {
    > i {
      display: block;
    }
  }
`;

const MyVideo = styled.video``;