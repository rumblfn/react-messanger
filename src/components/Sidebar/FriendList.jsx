import {
  AccordionButton, AccordionIcon,
  AccordionItem, AccordionPanel, Box,
  HStack,
  Spacer,
  Tab,
  TabList,
  Tabs,
  Text,
} from "@chakra-ui/react";
import {useSelector} from "react-redux";
import {useActions} from "../../hooks/useActions";
import {
  getFriendIndex,
  getFriendList,
  getUnreadMessages,
} from "../../store/chats/selectors";
import React from "react";

export const FriendList = () => {
  const {setFriendIndex} = useActions();
  const friendList = useSelector(getFriendList);
  const friendIndex = useSelector(getFriendIndex);
  const unreadMessages = useSelector(getUnreadMessages);

  const friendListLength = friendList.length

  return (
    <AccordionItem>
      <h2>
        <AccordionButton>
          <Box flex="1" textAlign="left" fontWeight={600}>
            Personal chats
          </Box>
          <AccordionIcon/>
          <Text fontWeight={500}>{friendListLength}</Text>
        </AccordionButton>
      </h2>
      {friendListLength ?
        <Tabs
          index={friendIndex}
          onChange={(index) => setFriendIndex(index)}
          variant="soft-rounded"
          w="100%"
        >
          <TabList w="100%" flexDirection='column'>
            {friendList.map((friend, idx) => (
              <HStack w="100%" pt={2} px={2}
                      pb={(idx + 1) === friendListLength ? 2 : 0}
                      as={AccordionPanel} key={friend?.username}
              >
                <Tab w="100%" bg={friend?.connected ? "green.100" : ""}>
                  <Text align="start" w="100%">
                    {friend?.username}
                  </Text>
                  <Spacer/>
                  <Text>{unreadMessages[friend?.userid]}</Text>
                </Tab>
              </HStack>
            ))}
          </TabList>
        </Tabs>
        : <AccordionPanel pb={2}>
          <Text align="center" w="100%">
            No Chats
          </Text>
        </AccordionPanel>
      }
    </AccordionItem>
  );
};
