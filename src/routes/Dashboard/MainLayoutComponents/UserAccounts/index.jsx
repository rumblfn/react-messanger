import { Heading, useColorMode, VStack } from "@chakra-ui/react";
import React from "react";

export const UserAccounts = () => {
  const {colorMode} = useColorMode
  return (
    <VStack w="100%" alignItems="start">
      <Heading borderBottom={`4px solid ${colorMode === 'light' ? 'black' : 'white'}`} size="xl">Your Accounts</Heading>
      <Heading pt={10} size="3xl">Oops..</Heading>
      <Heading size="2xl">It's an empty page</Heading>
      <Heading pt={4} size="xl">Will be soon</Heading>
    </VStack>
  );
};
