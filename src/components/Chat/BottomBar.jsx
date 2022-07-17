import { Button, HStack } from "@chakra-ui/react";
import {
  faDesktop,
  faMicrophone,
  faMicrophoneSlash,
  faPhoneSlash,
  faVideo,
  faVideoSlash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const BottomBar = () => {
  return (
    <HStack pt={2}>
      <Button
        data-switch="video"
        color={!true && "red.500"}
        p={0}
      >
        <FontAwesomeIcon
          data-switch="video"
          icon={true ? faVideo : faVideoSlash}
        />
      </Button>
      <Button
        data-switch="audio"
        color={!true && "red.500"}
        p={0}
      >
        <FontAwesomeIcon
          icon={true ? faMicrophone : faMicrophoneSlash}
        />
      </Button>
      <Button
        color={true && "red.500"}
        p={0}
      >
        <FontAwesomeIcon icon={faDesktop} />
      </Button>
      <Button color="red.500" p={0}>
        <FontAwesomeIcon icon={faPhoneSlash} />
      </Button>
    </HStack>
  );
};

export default BottomBar;
