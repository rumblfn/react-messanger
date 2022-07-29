import { CheckIcon, CloseIcon } from "@chakra-ui/icons";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Spacer,
  Text,
} from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { getConfirmations } from "../../store/chats/selectors";
import React from "react";

export const Confirmations = ({
  setFriend,
  onOpen,
  acceptConfirmation,
  declineConfirmation,
}) => {
  const awaitingConfirmation = useSelector(getConfirmations);

  return (
    <Accordion m={1} allowToggle w="100%">
      <AccordionItem>
        <h2>
          <AccordionButton>
            <Box flex="1" textAlign="left" fontWeight={600}>
              Awaiting confirmations{" "}
              {awaitingConfirmation.length
                ? ` - ${awaitingConfirmation.length}`
                : ""}
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
  );
};
