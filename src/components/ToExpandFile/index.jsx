import { createContext, useState } from "react";

export const ExpandFile = createContext();

const ExpandContext = ({ children }) => {
  const [filename, setFilename] = useState("");
  const [msgBg, setMsgBg] = useState({
    msgTimestamp: null,
    color: null,
  });

  const handleLeftClick = (e) => {
    setMsgBg({
      msgTimestamp: null,
      color: null,
    });
  };

  const handleContextMenu = (e, msgTimestamp) => {
    setMsgBg({
      msgTimestamp,
      color: "rgba(200, 220, 255, 0.25)",
    });
    console.log(e);
    e.preventDefault();
  };

  return (
    <ExpandFile.Provider
      value={{
        filename,
        setFilename,
        handleLeftClick,
        msgBg,
        handleContextMenu,
      }}
    >
      {children}
    </ExpandFile.Provider>
  );
};

export default ExpandContext;
