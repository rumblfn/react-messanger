import { EditIcon } from "@chakra-ui/icons";
import { Box, Image, useDisclosure } from "@chakra-ui/react";
import styles from "./style.module.css";
import { UploadBannerModal } from "./UploadBannerModal";

export const Banner = ({ banner }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const bannerSrc = banner
    ? banner?.startsWith("data")
      ? banner
      : `${process.env.REACT_APP_HOST_URL}/images/banners/${banner}`
    : banner;

  return (
    <Box
      className={styles["banner-box"]}
      position="relative"
      boxShadow={banner ? "xs" : "outline"}
      borderRadius="12px"
      bg="transparent"
      borderBottomRadius="2px"
      minW="300px"
      w="100%"
      overflow="hidden"
      style={{ aspectRatio: "3 / 1" }}
    >
      {banner && (
        <Image
          w="100%"
          h="100%"
          objectFit="cover"
          alt="banner"
          crossOrigin="anonymous"
          src={bannerSrc}
        />
      )}
      <div onClick={onOpen} className={styles["edit-icon"]}>
        <EditIcon />
      </div>
      <UploadBannerModal
        currentBanner={bannerSrc}
        isOpen={isOpen}
        onClose={onClose}
      />
    </Box>
  );
};
