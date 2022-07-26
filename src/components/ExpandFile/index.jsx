import { Image } from "@chakra-ui/react";
import React, { useContext } from "react";
import { ExpandFile } from "../ToExpandFile";
import styles from "./style.module.css";

export const ExpandFilename = () => {
  const { filename, setFilename } = useContext(ExpandFile);

  if (!filename) return

  return (
    <div className={styles["image-box"]} onClick={() => {setFilename('')}}>
      <Image onClick={(e) => e.stopPropagation()}
        borderRadius="10px"
        className={styles.image}
        crossOrigin="anonymous"
        src={filename}
      />
    </div>
  );
};
