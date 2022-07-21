import {
  Button,
  Heading,
  HStack,
  Input,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";
import { useContext } from "react";
import { AccountContext } from "../../../components/AccountContext";
import { NewPasswordModal } from "./Modal";

export const AccountSettings = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { user } = useContext(AccountContext);

  const [email, setEmail] = useState('')

  return (
    <VStack alignItems="start">
      <Heading size="lg">My Account</Heading>
      <VStack w="100%" alignItems="start" p={2} pb={1}>
        <Heading size="md">Username</Heading>
        <Input value={user.username} disabled />
      </VStack>
      <VStack w="100%" alignItems="start" p={2} pt={0}>
        <Heading size="md">Email</Heading>
        <Input onChange={e => setEmail(e.target.value)} placeholder="Email not connected" value={email} />
      </VStack>
      <HStack justifyContent="space-between" w="100%" p={2}>
        <Heading size="md">Password</Heading>
        <Button onClick={onOpen}>Change password</Button>
      </HStack>
      <NewPasswordModal isOpen={isOpen} onClose={onClose} />
    </VStack>
  );
};
