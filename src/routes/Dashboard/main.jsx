import { Heading, TabPanel, TabPanels } from "@chakra-ui/react";
import { AccountSettings } from "./MainLayoutComponents/AccountSettings";

export const MainLayout = () => {
  return (
    <TabPanels h="100%">
      <TabPanel w="100%" h="100%">
        <AccountSettings />
      </TabPanel>
      <TabPanel w="100%" h="100%">
        <Heading size='lg'>User Profile</Heading>
      </TabPanel>
      <TabPanel w="100%" h="100%">
        <Heading size='lg'>User Accounts</Heading>
      </TabPanel>
    </TabPanels>
  );
};
