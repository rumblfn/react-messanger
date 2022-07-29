import { HStack, Spinner, Text } from "@chakra-ui/react";
import React from "react";

export const LoadingPage = () => {
  return (
    <HStack
      alignItems="center"
      justify="center"
      pt="5rem"
      w="100%"
      textAlign="center"
      fontSize="lg"
    >
      <Text>Loading</Text>
      <Spinner />
    </HStack>
  );
};
