import {
  Avatar,
  Heading,
  HStack,
  Image,
  useMediaQuery,
} from "@chakra-ui/react";
import styles from "./style.module.css";

export const AvatarBox = ({ username, avatar }) => {
  const [smallTablet] = useMediaQuery("(min-width: 725px)");

  const ImageWidth = smallTablet
    ? "88px"
    : "66px";

  return (
    <HStack
      className={styles["avatar-box"]}
      position="relative"
      left="15%"
      w='100%'
      maxW='645px'
      style={{ marginLeft: 'auto', marginRight: 'auto' }}
    >
      {avatar ? (
        <Image
          style={{
            width: ImageWidth,
            aspectRatio: "1 / 1",
          }}
          className={styles["avatar-image"]}
          crossOrigin="anonymous"
          src={`${process.env.REACT_APP_HOST_URL}/images/avatars/${avatar}`}
        />
      ) : (
        <Avatar
          cursor="pointer"
          className={styles.avatar}
          size={smallTablet ? "lg" : "md"}
          name={username}
        />
      )}
      <Heading
        pt={smallTablet ? "55px" : "40px"}
        fontSize={smallTablet ? "3xl" : "xl"}
        wordBreak="break-all"
      >
        {username.length > 10 ? username.slice(0, 9) + ".." : username}
      </Heading>
    </HStack>
  );
};
