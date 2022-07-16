import {
  HStack,
  Spacer,
  Tab,
  TabList,
  Tabs,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { useActions } from "../../hooks/useActions";
import {
  getFriendIndex,
  getFriendList,
  getUnreadMessages,
} from "../../store/chats/selectors";

export const FriendList = () => {
  const { setFriendIndex } = useActions();
  const friendList = useSelector(getFriendList);
  const friendIndex = useSelector(getFriendIndex);
  const unreadMessages = useSelector(getUnreadMessages);

  return (
    <Tabs
      index={friendIndex}
      onChange={(index) => setFriendIndex(index)}
      variant="soft-rounded"
      w="100%"
    >
      <VStack as={TabList} w="100%" p="0.5rem">
        {friendList.map((friend) => (
          <HStack w="100%" key={friend?.username}>
            <Tab w="100%" bg={friend?.connected ? "green.100" : ""}>
              <Text align="start" w="100%">
                {friend?.username}
              </Text>
              <Spacer />
              <Text>{unreadMessages[friend?.userid]}</Text>
            </Tab>
          </HStack>
        ))}
      </VStack>
    </Tabs>
  );
};
