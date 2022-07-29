import { SettingsIcon } from "@chakra-ui/icons";
import { Avatar, Box, Button, Heading, Image, Spacer } from "@chakra-ui/react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AccountContext } from "../AccountContext";
import styles from "./style.module.css";
import React from "react";

export const ProfileTopPreview = () => {
  const navigate = useNavigate();
  const { user } = useContext(AccountContext);
  let avatarSrc;

  if (user?.avatar) {
    if (user.avatar.startsWith("data")) {
      avatarSrc = user.avatar;
    } else {
      avatarSrc = `${process.env.REACT_APP_HOST_URL}/images/avatars/${user.avatar}`;
    }
  }

  return (
    <Box
      pl="0.5rem"
      pr="0.5rem"
      w="100%"
      alignItems="center"
      display="flex"
      gap={2}
    >
      <Box display="flex" alignItems="center" gap={2}>
        {avatarSrc ? (
          <Image
            className={styles["avatar-image"]}
            style={{
              width: 66,
              aspectRatio: "1 / 1",
            }}
            crossOrigin="anonymous"
            src={avatarSrc}
          />
        ) : (
          <Avatar name={user.username} src={avatarSrc} />
        )}
        <Heading fontSize="md" wordBreak="break-all">
          {user.username}
        </Heading>
      </Box>
      <Spacer />
      <Button p={0} onClick={() => navigate("/dashboard")} colorScheme="teal">
        <SettingsIcon />
      </Button>
    </Box>
  );
};
