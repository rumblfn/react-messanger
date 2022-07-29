import { Spacer, Tab, TabList, Text, VStack } from "@chakra-ui/react";
import { faIdCard, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

export const Sidebar = ({ index, setIndex }) => {
  return (
    <VStack as={TabList} w="100%" p="0.5rem" style={{borderBottom: 0}}>
      <Tab w="100%">
        <Text align="start" w="100%">
          My Account
        </Text>
        <Spacer />
        <FontAwesomeIcon icon={faUser} />
      </Tab>
      <Tab w="100%">
        <Text align="start" w="100%">
          Profile
        </Text>
        <Spacer />
        <FontAwesomeIcon icon={faIdCard} />
      </Tab>
      {/* <Tab w="100%">
        <Text align="start" w="100%">
          Accounts
        </Text>
        <Spacer />
        <FontAwesomeIcon icon={faUsers} />
      </Tab> */}
      <Spacer />
    </VStack>
  );
};
