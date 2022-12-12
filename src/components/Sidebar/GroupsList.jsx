import {
  AccordionButton,
  AccordionIcon,
  AccordionItem, AccordionPanel,
  Box, HStack, Spacer, Tab, TabList, Tabs,
  Text
} from "@chakra-ui/react";
import React from "react";
import {AddIcon} from "@chakra-ui/icons";
import {useSelector} from "react-redux";
import {getGroupList} from "../../store/groups/selectors";
import {nanoid} from "nanoid";

export const GroupsList = ({onOpen}) => {
  const groups = useSelector(getGroupList)
  const groupsLength = groups.length

  return <AccordionItem>
    <h2>
      <AccordionButton>
        <Box flex="1" textAlign="left" fontWeight={600}>
          Groups
        </Box>
        <AccordionIcon/>
        <Text fontWeight={500}></Text>
        <AddIcon
          p={0} ml={2}
          onClick={e => {
            onOpen()
            e.stopPropagation()
          }}
        />
      </AccordionButton>
    </h2>
    {groupsLength ?
      <Tabs
        variant="soft-rounded"
        w="100%"
      >
        <TabList w="100%" flexDirection='column'>
          {groups.map((group, idx) => (
            <HStack w="100%" pt={2} px={2}
              pb={(idx + 1) === groupsLength ? 2 : 0}
              as={AccordionPanel} key={group?.id || nanoid()}
            >
              <Tab w="100%">
                <Text align="start" w="100%">
                  {group?.name}
                </Text>
                <Spacer/>
                <Text>{group?.unreadMessages}</Text>
              </Tab>
            </HStack>
          ))}
        </TabList>
      </Tabs>
      : <AccordionPanel pb={2}>
        <Text align="center" w="100%">
          No Groups
        </Text>
      </AccordionPanel>
    }
  </AccordionItem>
}