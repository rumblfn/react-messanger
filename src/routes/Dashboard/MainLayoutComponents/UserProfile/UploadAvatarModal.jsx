import {
  Avatar,
  Button,
  Heading,
  HStack,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import { useContext } from "react";
import { useEffect, useRef, useState } from "react";
import { AccountContext } from "../../../../components/AccountContext";
import { UpdateImageFromFile, validateFile } from "./common";
import styles from "./style.module.css";
import socket from '../../../../socket'

export const UploadAvatarModal = ({ currentAvatar, isOpen, onClose }) => {
  const [image, setImage] = useState(currentAvatar);
  const [error, setError] = useState("");
  const [file, setFile] = useState();
  const InputRef = useRef(null);
  const { setUser } = useContext(AccountContext);

  useEffect(() => {
    if (file) {
      UpdateImageFromFile(file, setImage);
    }
  }, [file]);

  const handleSubmit = () => {
    const formData = new FormData();
    formData.append("avatar", file);

    fetch(`${process.env.REACT_APP_HOST_URL}/user/update-avatar`, {
      method: "POST",
      body: formData,
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "success") {
          socket.emit('avatar-changed', data.path)
          setUser((user) => ({
            ...user,
            avatar: image,
          }));
          onClose();
        } else if (data.status === "error") {
          setError("Some errors on server");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <Modal isCentered isOpen={isOpen} onClose={onClose}>
      <ModalOverlay bg="blackAlpha.500" backdropFilter="hue-rotate(130deg)" />
      <ModalContent>
        <ModalHeader>Upload banner image</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <HStack mb={6} justifyContent="center">
            {image ? (
              <Image
                style={{
                  width: '176px',
                  aspectRatio: "1 / 1",
                }}
                className={styles["avatar-image"]}
                crossOrigin="anonymous"
                src={image}
              />
            ) : (
              <Avatar size="2xl" />
            )}
          </HStack>
          <Input
            onChange={(e) => validateFile(e.target.files[0], setError, setFile)}
            ref={InputRef}
            type="file"
            style={{ display: "none" }}
          />
          <HStack>
            <Button
              overflow="hidden"
              colorScheme="purple"
              onClick={() => InputRef.current.click()}
            >
              Upload image
            </Button>
            <Heading size="xs">
              {(file && file.name.slice(0, 24)) || "No file selected"}
            </Heading>
          </HStack>
          {error && (
            <Text pt={4} fontWeight={500} color="red.600">
              {error}
            </Text>
          )}
        </ModalBody>
        <ModalFooter>
          <Button onClick={onClose} mr={3}>
            Close
          </Button>
          <Button colorScheme="pink" onClick={handleSubmit}>
            Submit
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
