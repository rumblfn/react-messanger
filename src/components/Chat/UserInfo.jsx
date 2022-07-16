import { VStack } from "@chakra-ui/react";
import { Route, Routes } from "react-router-dom";
import { UserDescTop } from "./userDescTop";

export const TopUserInfo = ({user}) => {
  

  return (
    <VStack w="100%">
      <UserDescTop user={user} />
    </VStack>
  );
};
