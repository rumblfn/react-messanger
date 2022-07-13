import { TabPanel, TabPanels, Text, VStack } from "@chakra-ui/react";

export const EmptyChat = () => {
  return (
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
  );
};
