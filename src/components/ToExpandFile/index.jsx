import { useTimeout } from "@chakra-ui/react";
import { useEffect } from "react";
import { createContext, useState } from "react";

export const ExpandFile = createContext();

const ExpandContext = ({ children }) => {
  const [filename, setFilename] = useState("");
  const [msgBg, setMsgBg] = useState({
    msgTimestamp: null,
    color: null,
  });

  const handleLeftClick = (e) => {
    setMsgBg(prev => ({
      messageToReply: prev.messageToReply
    }));
  };

  const handleContextMenu = (e, message) => {
    setMsgBg(prev => ({
      messageToReply: prev.messageToReply,
      msgTimestamp: message.timestamp,
      message,
      color: "rgba(200, 220, 255, 0.25)",
      clientX: e.clientX,
      clientY: e.clientY
    }));
    e.preventDefault();
  };

  const handleScroll = (e) => {
    setMsgBg(prev => ({
      msgTimestamp: prev?.messageToReply?.timestamp,
      messageToReply: prev.messageToReply,
      color: "rgba(200, 220, 255, 0.25)",
    }));
    e.preventDefault();
  }

  const handleReplyMessage = (e) => {
    e.stopPropagation()
    const {message} = msgBg
    if (message) {
      setMsgBg(prev => ({
        ...prev,
        messageToReply: message
      }))
    }
  }

  const handleScrollMessageBg = (e) => {
    setMsgBg(prev => ({
      ...prev,
      msgTimestamp: prev?.messageToReply?.timestamp,
      color: "rgba(200, 220, 255, 0.25)"
    }));
    e.preventDefault();
  }

  const handleRemoveReply = (e) => {
    setMsgBg({})
    e.stopPropagation()
  }

  return (
    <ExpandFile.Provider
      value={{
        filename,
        setFilename,
        handleLeftClick,
        msgBg,
        handleContextMenu,
        handleReplyMessage,
        handleRemoveReply,
        handleScroll,
        handleScrollMessageBg
      }}
    >
      {children}
    </ExpandFile.Provider>
  );
};

export default ExpandContext;
