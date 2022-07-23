import { Heading, VStack } from "@chakra-ui/react";
import { useContext } from "react";
import { AccountContext } from "../../../../components/AccountContext";
import { AboutMeBox } from "./AboutMe";
import { AvatarBox } from "./AvatarBox";
import { Banner } from "./banner";

export const UserProfile = () => {
  const { user } = useContext(AccountContext);

  return (
    <VStack alignItems="start">
      <Heading size="lg">User Profile</Heading>
      <Banner banner={user.banner} />
      <AvatarBox avatar={user.avatar} username={user.username || ""} />
      <AboutMeBox text={user.description || ''}/>
    </VStack>
  );
};
