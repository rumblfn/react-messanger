import { ArrowBackIcon, SettingsIcon } from "@chakra-ui/icons";
import {
  Avatar,
  Button,
  Heading,
  HStack,
  Image,
  Spacer,
  useMediaQuery,
} from "@chakra-ui/react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AccountContext } from "../AccountContext";
import styles from "./style.module.css";
import React from "react";
import { ExpandFile } from "../ToExpandFile";

export const ProfileTopPreview = () => {
  const [tablet] = useMediaQuery("(max-width: 888px)");
  const navigate = useNavigate();
  const { user } = useContext(AccountContext);
  const {toggleSidebar, showSidebar} = useContext(ExpandFile)
  let avatarSrc;

  if (user?.avatar) {
    if (user.avatar.startsWith("data")) {
      avatarSrc = user.avatar;
    } else {
      avatarSrc = `${process.env.REACT_APP_HOST_URL}/images/avatars/${user.avatar}`;
    }
  }

  return (
    <HStack p="0 0.5rem" w="100%">
      <HStack alignItems="center" spacing={1}>
        {avatarSrc ? (
          <Image
            className={styles["avatar-image"]}
            crossOrigin="anonymous"
            src={avatarSrc}
          />
        ) : (
          <Avatar size="md" name={user.username} src={avatarSrc} />
        )}
        <Heading fontSize="md" wordBreak="break-all">
          {user.username}
        </Heading>
      </HStack>
      <Spacer />
      <Button
        size="md"
        p={0}
        onClick={() => navigate("/dashboard")}
        colorScheme="teal"
      >
        <SettingsIcon />
      </Button>
      <Button
        onClick={() => toggleSidebar()}
        zIndex='100'
        position="relative"
        display={tablet ? "block" : "none"}
        right={showSidebar ? '0px' : '-78px'}
        top={showSidebar ? '0px' : '-8px'}
        p={0}
        style={{transition: 'all 0.22s ease'}}
        variant="outline"
      >
        <ArrowBackIcon />
      </Button>
    </HStack>
  );
};
