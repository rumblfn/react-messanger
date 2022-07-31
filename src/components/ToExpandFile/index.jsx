import React from "react";
import { createContext, useState } from "react";

export const ExpandFile = createContext();

const ExpandContext = ({ children }) => {
  const [showSidebar, setShowSidebar] = useState(true)
  const [filename, setFilename] = useState("");
  const [messageToDelete, setMessaeToDelete] = useState()
  const [msgBg, setMsgBg] = useState({
    msgTimestamp: null,
    color: null,
  });

  const handleLeftClick = (e) => {
    setMsgBg(prev => ({
      messageToReply: prev?.messageToReply,
      replyTimestamp: prev?.replyTimestamp,
      replyColor: "rgba(180, 170, 255, 0.25)"
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
      replyTimestamp: prev?.replyTimestamp,
      color: "rgba(200, 220, 255, 0.25)",
      replyColor: "rgba(180, 170, 255, 0.25)"
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

  const handleMessageToDelete = (e) => {
    const {message} = msgBg
    if (message) {
      setMessaeToDelete(message)
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

  const handleScrollToReply = (timestamp) => {
    setMsgBg(prev => ({
      ...prev,
      replyTimestamp: timestamp,
      replyColor: "rgba(180, 170, 255, 0.25)"
    }));
  }

  const handleRemoveReply = (e) => {
    setMsgBg({})
  }

  const toggleSidebar = () => {
    setShowSidebar(prev => !prev)
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
        handleScrollMessageBg,
        handleScrollToReply,
        messageToDelete, setMessaeToDelete, handleMessageToDelete,
        toggleSidebar, showSidebar
      }}
    >
      {children}
    </ExpandFile.Provider>
  );
};

export default ExpandContext;
