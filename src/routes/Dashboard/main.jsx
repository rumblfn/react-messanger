import { TabPanel, TabPanels } from "@chakra-ui/react";
import { AccountSettings } from "./MainLayoutComponents/AccountSettings/AccountSettings";
import { UserAccounts } from "./MainLayoutComponents/UserAccounts";
import { UserProfile } from "./MainLayoutComponents/UserProfile";
import React from "react";

export const MainLayout = () => {
  return (
    <TabPanels h="100%" w="100%">
      <TabPanel w="100%" h="100%">
        <AccountSettings />
      </TabPanel>
      <TabPanel w="100%" h="100%">
        <UserProfile />
      </TabPanel>
      <TabPanel w="100%" h="100%">
        <UserAccounts />
      </TabPanel>
    </TabPanels>
  );
};
