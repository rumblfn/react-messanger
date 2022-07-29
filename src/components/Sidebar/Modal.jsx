import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import React from "react";

export const ConfirmationModal = ({
  isOpen,
  onClose,
  friend,
  acceptConfirmation,
  declineConfirmation,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Confirmation</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {friend?.username} - {friend?.type} request
        </ModalBody>

        <ModalFooter>
          {friend?.type === "outgoing" && (
            <Button
              onClick={() => {
                acceptConfirmation(friend);
                onClose();
              }}
              colorScheme="teal"
              mr={3}
            >
              Add to friends
            </Button>
          )}
          <Button
            onClick={() => {
              declineConfirmation(friend);
              onClose();
            }}
            variant="ghost"
          >
            Remove
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
