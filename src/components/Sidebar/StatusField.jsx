import { Heading } from "@chakra-ui/react";
import React from "react";

export const StatusMsg = ({errorMsg, success}) => {
  return (
    <>
      {success && (
        <Heading
          fontSize="m"
          as="p"
          p="0.5rem"
          color="green.700"
          textAlign="center"
        >
          {success}
        </Heading>
      )}
      {errorMsg && (
        <Heading
          fontSize="m"
          p="0.5rem"
          as="p"
          color="red.900"
          textAlign="center"
        >
          {errorMsg}
        </Heading>
      )}
    </>
  );
};
