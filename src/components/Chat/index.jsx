import { TabPanel, TabPanels, Text, VStack } from "@chakra-ui/react";
import { useContext } from "react";
import { FriendContext } from "../../routes/Home";

const Chat = () => {
  const { friendList } = useContext(FriendContext);

  return friendList.length > 0 ? (
    <VStack pt="3rem">
      <TabPanels>
        <TabPanel>Friend one</TabPanel>
      </TabPanels>
    </VStack>
  ) : (
    <VStack justify="center" pt="5rem" w="100%" textAlign="center" fontSize="lg">
      <TabPanels>
        <TabPanel>
          <Text>Add friend to start chatting</Text>
        </TabPanel>
      </TabPanels>
    </VStack>
  );
};

export default Chat;
