import {
  Avatar,
  Heading,
  HStack,
  Image,
  useDisclosure,
  useMediaQuery,
} from "@chakra-ui/react";
import styles from "./style.module.css";
import { UploadAvatarModal } from "./UploadAvatarModal";
import React from "react";

export const AvatarBox = ({ username, avatar }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [laptop] = useMediaQuery("(min-width: 1280px)");
  const [tablet] = useMediaQuery("(min-width: 1056px)");
  const [smallTablet] = useMediaQuery("(min-width: 725px)");

  const ImageWidth = laptop
    ? "176px"
    : tablet
    ? "132px"
    : smallTablet
    ? "88px"
    : "66px";

  const avatarSrc = avatar
    ? avatar?.startsWith("data")
      ? avatar
      : `${process.env.REACT_APP_HOST_URL}/images/avatars/${avatar}`
    : avatar;

  return (
    <HStack
      position="relative"
      left="15%"
      className={styles["avatar-box"]}
      style={{ margin: 0 }}
    >
      {avatar ? (
        <Image
          onClick={onOpen}
          style={{
            width: ImageWidth,
            aspectRatio: "1 / 1",
          }}
          className={styles["avatar-image"]}
          crossOrigin="anonymous"
          src={avatarSrc}
        />
      ) : (
        <Avatar
          onClick={onOpen}
          cursor="pointer"
          className={styles.avatar}
          size={laptop ? "2xl" : tablet ? "xl" : smallTablet ? "lg" : "md"}
          name={username}
        />
      )}
      <Heading
        pt={laptop ? "96px" : tablet ? "72px" : smallTablet ? "55px" : "40px"}
        fontSize={laptop ? "6xl" : tablet ? "5xl" : smallTablet ? "3xl" : "xl"}
        wordBreak="break-all"
      >
        {username.length > 10 ? username.slice(0, 9) + ".." : username}
      </Heading>
      <UploadAvatarModal
        currentAvatar={avatarSrc}
        isOpen={isOpen}
        onClose={onClose}
      />
    </HStack>
  );
};
