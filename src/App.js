import { CheckIcon, CloseIcon } from "@chakra-ui/icons";
import { Button, HStack, Spacer, Text, VStack } from "@chakra-ui/react";
import { Howl } from "howler";
import { useContext } from "react";
import { DraggableCallRequest } from "./components/Dialog";
import Views from "./components/Views";
import useSocketSetup from "./hooks/useSocketSetup";
import { VoiceContext } from "./VoiceContext";

function App() {
  let messageSound = new Howl({
    src: ['/sounds/message-sound.mp3']
  })
  useSocketSetup(messageSound);

  const {tryingToCall, awaitingAnswer, user, cancelCalling, acceptCalling} = useContext(VoiceContext)

  const renderDialog = (type) => {
    if (type === 'tt') {
      return <VStack w="100%" h="100%">
        <Spacer/>
        <Text>Trying to call - <b>{user.username}</b></Text>
        <Spacer />
        <HStack w="100%">
          <Button onClick={cancelCalling} p="0" mb="1">
            <CloseIcon />
          </Button>
        </HStack>
      </VStack>
    } else if (type === 'aa') {
      return <VStack w="100%" h="100%">
        <Spacer/>
        <Text>Awaiting answer - <b>{user.username}</b></Text>
        <Spacer />
        <HStack w="100%">
          <Button onClick={cancelCalling} p="0" mb="1">
            <CloseIcon />
          </Button>
          <Spacer />
          <Button onClick={acceptCalling} p="0" mb="1">
            <CheckIcon />
          </Button>
        </HStack>
      </VStack>
    }
  }

  return <>
    {tryingToCall &&
      <DraggableCallRequest>
        {renderDialog('tt')}
      </DraggableCallRequest>
    }
    {
      awaitingAnswer && 
      <DraggableCallRequest>
        {renderDialog('aa')}
      </DraggableCallRequest>
    }
    <Views />
  </>
}

export default App;
