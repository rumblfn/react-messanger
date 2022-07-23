import { Box, Image } from "@chakra-ui/react";

export const Banner = ({ banner }) => {
  if (!banner) {
    return <Box w='100%' position='relative' h='50px'/>
  };

  return (
    <Box
      w="100%"
      maxW="645px"
      maxH="215px"
      position="relative"
      boxShadow={banner ? "xs" : "outline"}
      borderRadius="12px"
      bg="transparent"
      borderBottomRadius="2px"
      minW="300px"
      overflow="hidden"
      style={{ aspectRatio: "3 / 1", marginLeft: "auto", marginRight: "auto" }}
    >
      <Image
        w="100%"
        h="100%"
        objectFit="cover"
        alt="banner"
        crossOrigin="anonymous"
        src={`${process.env.REACT_APP_HOST_URL}/images/banners/${banner}`}
      />
    </Box>
  );
};
