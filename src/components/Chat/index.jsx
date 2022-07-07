import { TabPanel, TabPanels, Text, VStack } from "@chakra-ui/react";
import { useContext, useEffect, useRef } from "react";
import { FriendContext, MessagesContext } from "../../routes/Home";
import ChatBox from "./ChatBox";

const Chat = ({userid}) => {
  const { friendList } = useContext(FriendContext);
  const { messages } = useContext(MessagesContext);
  const bottomDiv = useRef(null)

  useEffect(() => {
    bottomDiv.current?.scrollIntoView();
  })

  return friendList.length > 0 ? 
    <VStack pt="3rem" h="100%" justify="end">
      <TabPanels h="100%" overflowY="scroll">
        {friendList.map(friend => 
          <VStack
            flexDirection="column-reverse"
            as={TabPanel}
            key={`chat:${friend.username}`}
            w="100%"
          >
            <div ref={bottomDiv}/>
            {messages
              .filter(msg => msg.to === friend.userid || msg.from === friend.userid)
              .map((message, idx) => (
                <Text
                  maxW="60%"
                  m={message.to === friend.userid ? "1rem 0 0 auto !important" : "1rem auto 0 0 !important"}
                  fontSize="lg"
                  key={`msg:${friend.userid}.${idx}`}
                  bg={message.to ===  friend.userid ? "blue.100" : "gray.100"}
                  color="gray.900"
                  borderRadius="10px"
                  p="0.5rem 1rem"
                >
                  {message.content}
                </Text>
              ))}
          </VStack>
        )}
      </TabPanels>
      <ChatBox userid={userid}/>
    </VStack>
  : 
    <VStack
      justify="center"
      pt="5rem"
      w="100%"
      textAlign="center"
      fontSize="lg"
    >
      <TabPanels>
        <TabPanel>
          <Text>Add friend to start chatting</Text>
        </TabPanel>
      </TabPanels>
    </VStack>
};

export default Chat;
