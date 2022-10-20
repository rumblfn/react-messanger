import {CheckIcon, CloseIcon} from "@chakra-ui/icons";
import {
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  HStack,
  Spacer,
  Text,
  VStack,
} from "@chakra-ui/react";
import {useSelector} from "react-redux";
import {getConfirmations} from "../../store/chats/selectors";
import React from "react";

export const Confirmations = ({
  setFriend, onOpen, acceptConfirmation, declineConfirmation,
}) => {
  const awaitingConfirmation = useSelector(getConfirmations);

  return (
    <AccordionItem>
      <h2>
        <AccordionButton>
          <Box flex="1" textAlign="left" fontWeight={600}>
            Awaiting confirmations
          </Box>
          <AccordionIcon/>
          <Text fontWeight={500}>{awaitingConfirmation.length}</Text>
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
            pt={0}
            px={3}
            pb={2}
          >
            <VStack w='100%' alignItems='start' spacing={0}>
              <Text wordBreak="break-all" fontSize="md" fontWeight={500}>
                {user.username}
              </Text>
              <HStack w='100%'>
                <Text fontSize="sm">{user.type}</Text>
                <Spacer/>
                {user.type === "outgoing" && (
                  <Button
                    size="sm"
                    p={0}
                    onClick={(e) => {
                      e.stopPropagation();
                      acceptConfirmation(user);
                    }}
                  >
                    <CheckIcon/>
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
                  <CloseIcon/>
                </Button>
              </HStack>
            </VStack>
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
  );
};
