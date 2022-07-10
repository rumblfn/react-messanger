import { ChatIcon, CheckIcon, CloseIcon, SettingsIcon } from "@chakra-ui/icons";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Avatar,
  Box,
  Button,
  Divider,
  Heading,
  HStack,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spacer,
  Tab,
  TabList,
  Tabs,
  Text,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import React, { useContext, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useActions } from "../../hooks/useActions";
import socket from "../../socket";
import {
  getConfirmations,
  getFriendIndex,
  getFriendList,
} from "../../store/chats/selectors";
import { AccountContext } from "../AccountContext";

const Sidebar = () => {
  const navigate = useNavigate();
  const {
    setFriendIndex,
    addFriend,
    addConfirmation,
    removeConfirmationAfterDecline,
  } = useActions();
  const friendList = useSelector(getFriendList);
  const friendIndex = useSelector(getFriendIndex);
  const friendInputRef = useRef();
  const [success, setSuccess] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const { isOpen, onOpen, onClose } = useDisclosure();
  const { user } = useContext(AccountContext);

  const [friend, setFriend] = useState(null);

  const cleanMessages = () => {
    setSuccess("");
    setErrorMsg("");
  };

  const getFriend = async (username) => {
    if (!username || username.length < 5) return;

    socket.emit(
      "add_friend",
      username,
      ({ errorMsg, done, friend, confirmation }) => {
        if (done) {
          if (friend) {
            addFriend(friend);
          }
          if (confirmation) {
            addConfirmation(confirmation);
          }
          setSuccess(errorMsg);
          setErrorMsg("");
          return;
        }
        setErrorMsg(errorMsg);
        setSuccess("");
      }
    );
  };

  useEffect(() => {
    setTimeout(() => cleanMessages(), 3000);
  }, [errorMsg, success]);

  const awaitingConfirmation = useSelector(getConfirmations);

  const acceptConfirmation = (user) => {
    socket.emit("accept_confirmation", user);
  };

  const declineConfirmation = (user) => {
    socket.emit("decline_confirmation", user);
    removeConfirmationAfterDecline(user.username);
  };

  return (
    <VStack py="1rem">
      <Box
        pl="0.5rem"
        pr="0.5rem"
        w="100%"
        alignItems="center"
        display="flex"
        gap={2}
      >
        <Box display="flex" alignItems="center" gap={2}>
          <Avatar name={user.username} src="https://bit.ly/dan-abramov" />
          <Heading fontSize="md" wordBreak="break-all">{user.username}</Heading>
        </Box>
        <Spacer />
        <Button p={0} onClick={() => navigate("/dashboard")} colorScheme="teal">
          <SettingsIcon />
        </Button>
      </Box>
      <HStack w="100%" justify="space-evenly" pl="0.5rem" pr="0.5rem">
        <Input ref={friendInputRef} placeholder="Add friend" size="md" />
        <Button p={0} onClick={() => getFriend(friendInputRef.current.value)}>
          <ChatIcon />
        </Button>
      </HStack>
      {success && (
        <Heading
          fontSize="m"
          as="p"
          p="0.5rem"
          color="green.700"
          textAlign="center"
        >
          {success}
        </Heading>
      )}
      {errorMsg && (
        <Heading
          fontSize="m"
          p="0.5rem"
          as="p"
          color="red.900"
          textAlign="center"
        >
          {errorMsg}
        </Heading>
      )}
      <Accordion m={1} allowToggle w="100%">
        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box flex="1" textAlign="left" fontWeight={600}>
                Awaiting confirmations
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          {awaitingConfirmation.length ? (
            awaitingConfirmation.map((user) => (
              <AccordionPanel
                onClick={() => {
                  setFriend(user);
                  onOpen();
                }}
                key={user.userid}
                pb={2}
              >
                <Box display="flex" alignItems="center" gap={2}>
                  <Text wordBreak="break-all" fontSize="md" fontWeight={500}>
                    {user.username}
                  </Text>
                  <Text fontSize="sm">{user.type}</Text>
                  <Spacer />
                  {user.type === "outgoing" && (
                    <Button
                      size="sm"
                      p={0}
                      onClick={(e) => {
                        e.stopPropagation();
                        acceptConfirmation(user);
                      }}
                    >
                      <CheckIcon />
                    </Button>
                  )}
                  <Button
                    size="sm"
                    p={0}
                    onClick={(e) => {
                      e.stopPropagation();
                      declineConfirmation(user);
                    }}
                  >
                    <CloseIcon />
                  </Button>
                </Box>
              </AccordionPanel>
            ))
          ) : (
            <AccordionPanel pb={2}>
              <Text align="center" w="100%">
                No confirmations
              </Text>
            </AccordionPanel>
          )}
        </AccordionItem>
      </Accordion>
      <Tabs
        index={friendIndex}
        onChange={(index) => setFriendIndex(index)}
        variant="soft-rounded"
        w="100%"
      >
        <VStack as={TabList} w="100%" p="0.5rem">
          {friendList.map((friend) => (
            <HStack w="100%" key={friend.username}>
              <Tab w="100%" bg={friend.connected ? "green.100" : ""}>
                <Text align="start" w="100%">
                  {friend.username}
                </Text>
              </Tab>
            </HStack>
          ))}
        </VStack>
      </Tabs>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Confirmation</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {friend?.username} - {friend?.type} request
          </ModalBody>

          <ModalFooter>
            {friend?.type === "outgoing" && (
              <Button
                onClick={() => {
                  acceptConfirmation(friend)
                  onClose()
                }}
                colorScheme="teal"
                mr={3}
              >
                Add to friends
              </Button>
            )}
            <Button onClick={() => {
              declineConfirmation(friend)
              onClose()
            }} variant="ghost">
              Remove
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </VStack>
  );
};

export default Sidebar;
