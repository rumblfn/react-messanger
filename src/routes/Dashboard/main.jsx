import { TabPanel, TabPanels } from "@chakra-ui/react";

export const MainLayout = () => {
  return (
    <TabPanels h="100%">
      <TabPanel w="100%" h="100%">
        My Account
      </TabPanel>
      <TabPanel w="100%" h="100%">
        User Profile
      </TabPanel>
      <TabPanel w="100%" h="100%">
        User Accounts
      </TabPanel>
    </TabPanels>
  );
};
