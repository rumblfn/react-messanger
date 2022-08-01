import {
  Button,
  Heading,
  HStack,
  Input,
  useColorMode,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { useContext } from "react";
import { AccountContext } from "../../../../components/AccountContext";
import { NewPasswordModal } from "./CustomModal";
import { Email } from "./Email";
import React from "react";

export const AccountSettings = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {colorMode} = useColorMode
  const { user } = useContext(AccountContext);

  return (
    <VStack alignItems="start">
      <Heading borderBottom={`4px solid ${colorMode === 'light' ? 'black' : 'white'}`} size="lg">
        My Account
      </Heading>
      <VStack w="100%" alignItems="start" p={2} pb={1}>
        <Heading size="md">Username</Heading>
        <Input value={user.username} disabled />
      </VStack>
      <Email currentEmail={user.email} />
      <HStack justifyContent="space-between" w="100%" p={2}>
        <Heading size="md">Password</Heading>
        <Button onClick={onOpen}>Change</Button>
      </HStack>
      <NewPasswordModal isOpen={isOpen} onClose={onClose} />
    </VStack>
  );
};
