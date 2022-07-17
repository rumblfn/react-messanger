import { nanoid } from "nanoid";
import { useEffect } from "react";
import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import socket from "./socket";

export const VoiceContext = createContext();

const VoiceChannelContext = ({ children }) => {
  const [tryingToCall, setTryingToCall] = useState(false);
  const [awaitingAnswer, setAwaitingAnswer] = useState(false);
  const [user, setUser] = useState(null);
  const [roomId, setRoomId] = useState(null)
  const [userPeer, setUserPeer] = useState(null)
  const navigate = useNavigate()

  const calUser = (user) => {
    if (user?.userid) {
      const newRoomId = nanoid()
      navigate(`room/${newRoomId}`)
      setTryingToCall(true);
      setUser(user);
      socket.emit("callUser", user.userid, newRoomId);
    }
  };

  const cancelCalling = () => {
    if (tryingToCall) {
      setTryingToCall(false);
      socket.emit("cancelUserCall", user?.userid);
    } else if (awaitingAnswer) {
      setAwaitingAnswer(false);
      socket.emit("cancelAwaitingCall", user?.userid);
    }
  };

  const acceptCalling = () => {
    navigate(`room/${roomId}`)
    setTryingToCall(false);
    setAwaitingAnswer(false);
    socket.emit('call accepted', user.userid)
  };

  useEffect(() => {
    socket.on("callUser", (user, newRoomId) => {
      setRoomId(newRoomId)
      setAwaitingAnswer(true);
      setUser(user);
    });

    socket.on('user peer id', data => {
      setUserPeer(data)
    })

    socket.on("cancelUserCall", (user) => {
      setAwaitingAnswer(false);
    });

    socket.on("cancelAwaitingCall", (user) => {
      setTryingToCall(false);
    });

    socket.on('call accepted', () => {
        setTryingToCall(false);
        setAwaitingAnswer(false);
    })
  }, []);

  return (
    <VoiceContext.Provider
      value={{
        calUser,
        tryingToCall,
        awaitingAnswer,
        user,
        cancelCalling,
        acceptCalling,
        userPeer
      }}
    >
      {children}
    </VoiceContext.Provider>
  );
};

export default VoiceChannelContext;
