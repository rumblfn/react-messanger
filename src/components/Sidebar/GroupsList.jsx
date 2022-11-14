import {
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  Box,
  Text
} from "@chakra-ui/react";
import React from "react";
import {AddIcon} from "@chakra-ui/icons";

export const GroupsList = ({onOpen}) => {
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

  </AccordionItem>
}