import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  VStack,
} from "@chakra-ui/react";
import { useActions } from "../../hooks/useActions";
import socket from "../../socket";

export const DeleteMessage = ({
  isOpen,
  onClose,
  username,
  messageToDelete,
  userid
}) => {
  const {deleteMessage} = useActions()

  const handleDeleteForMe = () => {
    socket.emit("delete-message-me", messageToDelete);
    deleteMessage({index: messageToDelete.index, userid})
    onClose()
  };

  const handleDeleteForMeAndUser = () => {
    socket.emit("delete-message-me-and-user", messageToDelete);
    deleteMessage({index: messageToDelete.index, userid})
    onClose()
  };

  return (
    <Modal isCentered isOpen={isOpen} onClose={onClose}>
      <ModalOverlay backdropFilter="hue-rotate(50deg)" />
      <ModalContent>
        <ModalHeader>Delete message</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack alignItems="start">
            <Button onClick={handleDeleteForMe} colorScheme="red">
              For me
            </Button>
            <Button onClick={handleDeleteForMeAndUser} colorScheme="red">
              For me and {username}
            </Button>
          </VStack>
        </ModalBody>
        <ModalFooter>
          <Button onClick={onClose}>Close</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
