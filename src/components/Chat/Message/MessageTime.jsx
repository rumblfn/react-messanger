import { useColorMode } from "@chakra-ui/react";
import styles from "./style.module.css";

export const MessageTime = ({ TimeParams }) => {
  const { colorMode } = useColorMode();

  return (
    <span
      className={styles["message-time"]}
      style={{
        color: colorMode === "light" ? "gray.700" : "white",
        left: TimeParams.left,
        right: TimeParams.right
      }}
    >
      {TimeParams.formattedTime}
    </span>
  );
};
