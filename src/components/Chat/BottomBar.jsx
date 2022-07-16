import { Button, HStack } from "@chakra-ui/react";
import {
  faDesktop,
  faMicrophone,
  faMicrophoneSlash,
  faPhoneSlash,
  faTurnDown,
  faVideo,
  faVideoSlash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const BottomBar = ({
  goToBack,
  toggleCameraAudio,
  userVideoAudio,
  clickScreenSharing,
  screenShare,
}) => {
  return (
    <HStack>
      <Button
        data-switch="video"
        color={!userVideoAudio.video && "red.500"}
        p={0}
        onClick={toggleCameraAudio}
      >
        <FontAwesomeIcon
          data-switch="video"
          onClick={toggleCameraAudio}
          icon={userVideoAudio.video ? faVideo : faVideoSlash}
        />
      </Button>
      <Button
        data-switch="audio"
        color={!userVideoAudio.audio && "red.500"}
        p={0}
        onClick={toggleCameraAudio}
      >
        <FontAwesomeIcon
          icon={userVideoAudio.audio ? faMicrophone : faMicrophoneSlash}
        />
      </Button>
      <Button
        color={screenShare && "red.500"}
        p={0}
        onClick={clickScreenSharing}
      >
        <FontAwesomeIcon icon={faDesktop} />
      </Button>
      <Button color="red.500" p={0} onClick={goToBack}>
        <FontAwesomeIcon icon={faPhoneSlash} />
      </Button>
    </HStack>
  );
};

export default BottomBar;
