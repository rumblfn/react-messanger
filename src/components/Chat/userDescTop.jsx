import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Avatar,
  Box,
  Heading,
  HStack,
  Image,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useTimeToDay } from "../../hooks/useTimeToDay";
import styles from "./style.module.css";
import { Banner } from "../UserBanner";
import { AvatarBox } from "../UserAvatar";
import { UserDescription } from "../UserDescription";

export const UserDescTop = ({ user }) => {
  const formattedDate = useTimeToDay(user.lastActiveDay);

  return (
    <Accordion allowToggle w="100%">
      <AccordionItem>
        <AccordionButton>
          <VStack w="100%">
            <HStack alignItems="center" w="100%">
              {user?.avatar ? (
                <Image
                  className={styles["avatar-image"]}
                  style={{
                    width: 33,
                    aspectRatio: "1 / 1",
                  }}
                  crossOrigin="anonymous"
                  src={`${process.env.REACT_APP_HOST_URL}/images/avatars/${user.avatar}`}
                />
              ) : (
                <Avatar size="xs" name={user?.username || ""} />
              )}
              <Heading fontSize="md" wordBreak="break-all">
                {user?.username || ""}
              </Heading>
            </HStack>
            {user?.connected ? (
              <Text fontSize="xs" pl="0.15rem" color="green.500" w="100%">
                Online
              </Text>
            ) : (
              <Text fontSize="xs" color="gray.500" w="100%" textAlign="start">
                last seen {formattedDate} at {user?.formattedTime}
              </Text>
            )}
          </VStack>
          <AccordionIcon />
        </AccordionButton>
        <AccordionPanel pb={0} style={{ height: user?.banner ? 300 : 130 }}>
          <Box>
            <Banner banner={user?.banner} />
            <AvatarBox avatar={user?.avatar} username={user?.username || ""} />
          </Box>
        </AccordionPanel>
        {user?.description && (
          <AccordionPanel pt={0}>
            <UserDescription
              text={user.description || ""}
              username={user?.username || ""}
            />
          </AccordionPanel>
        )}
      </AccordionItem>
    </Accordion>
  );
};
