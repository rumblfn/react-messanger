import {
  Box,
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
import { useEffect } from "react";
import { useRef, useState } from "react";
import { AccountContext } from "../../../../components/AccountContext";
import socket from "../../../../socket";
import { UpdateImageFromFile, validateFile } from "./common";
import React from "react";

export const UploadBannerModal = ({currentBanner, isOpen, onClose }) => {
  const { setUser } = useContext(AccountContext);
  const [image, setImage] = useState(currentBanner);
  const [error, setError] = useState("");
  const [file, setFile] = useState();
  const InputRef = useRef(null);

  useEffect(() => {
    if (file) {
      UpdateImageFromFile(file, setImage);
    }
  }, [file]);

  const handleSubmit = () => {
    const formData = new FormData();
    formData.append("banner", file);

    fetch(`${process.env.REACT_APP_HOST_URL}/user/update-banner`, {
      method: "POST",
      body: formData,
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "success") {
          socket.emit('banner-changed', data.path)
          setUser(user => ({
            ...user, banner: image
          }))
          onClose()
        } else if (data.status === 'error') {
            setError('Some errors on server')
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <Modal isCentered isOpen={isOpen} onClose={onClose}>
      <ModalOverlay bg="blackAlpha.400" backdropFilter="hue-rotate(70deg)" />
      <ModalContent>
        <ModalHeader>Upload banner image</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Box
            mb={4}
            position="relative"
            boxShadow="outline"
            borderRadius="12px"
            bg="transparent"
            borderBottomRadius="2px"
            minW="300px"
            w="100%"
            overflow="hidden"
            style={{ aspectRatio: "3 / 1" }}
          >
            {image && (
              <Image
                crossOrigin="anonymous"
                w="100%"
                h="100%"
                objectFit="cover"
                alt="banner"
                src={image}
              />
            )}
          </Box>
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
