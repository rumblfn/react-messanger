import { DeleteIcon } from "@chakra-ui/icons";
import {
  Button,
  CircularProgress,
  CircularProgressLabel,
  Heading,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spacer,
  VStack,
} from "@chakra-ui/react";
import axios from "axios";
import { nanoid } from "nanoid";
import { useEffect } from "react";
import { useState } from "react";
import { useActions } from "../../hooks/useActions";
import socket from "../../socket";
import { DragAndDropFiles } from "../DragAndDropFiles";

export const ModalSendFiles = ({ files, isOpen, onClose, setFiles, user }) => {
  const { addMessage } = useActions();

  const [send, setSend] = useState(false);
  const [drag, setDrag] = useState(false);

  useEffect(() => {
    if (!files.length) {
      setSend(false);
      onClose();
    }
  }, [files]);

  const dragStartHandler = (e) => {
    e.preventDefault();
    setDrag(true);
  };

  const dragLeaveHandler = (e) => {
    e.preventDefault();
    setDrag(false);
  };

  const onDropHandler = (e) => {
    e.preventDefault();
    let files = [...e.dataTransfer.files].map((file) => ({
      file,
      loaded: 0,
    }));
    setFiles((prev) => [...prev, ...files]);
    setDrag(false);
  };

  const removeFile = (index) => {
    setFiles((prev) => [
      ...prev.slice(0, index),
      ...prev.slice(index + 1, prev.length),
    ]);
  };

  const handleSend = () => {
    setSend(true);
    for (let idx in files) {
      startUploadFile(files[idx].file, idx);
    }
  };

  const startUploadFile = (file, index) => {
    let formData = new FormData();
    formData.append("file", file);

    axios
      .post(
        `${process.env.REACT_APP_HOST_URL}/media/uploadFile/${user?.userid}`,
        formData,
        {
          withCredentials: true,
          onUploadProgress: (data) => {
            const loaded = parseInt((data.loaded / data.total) * 100);
            setFiles((prev) => [
              ...prev.slice(0, index),
              { ...prev[index], loaded },
              ...prev.slice(index + 1, prev.length),
            ]);
          },
        }
      )
      .then((res) => {
        if (res.data.status === "success") {
          const { path, fileType } = res.data;

          setFiles((prev) => [
            ...prev.slice(0, index),
            ...prev.slice(index + 1, prev.length),
          ]);

          console.log(path, fileType);
          const message = {
            username: user.username,
            connected: user?.connected,
            to: user?.userid,
            from: null,
            content: path,
            timestamp: new Date().getTime(),
            type: fileType,
          };

          socket.emit("dm", message, nanoid(8));
          addMessage({ message, userid: message.to });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent
        overflow="hidden"
        onDragStart={(e) => dragStartHandler(e)}
        onDragLeave={(e) => dragLeaveHandler(e)}
        onDragOver={(e) => dragStartHandler(e)}
        position="relative"
      >
        <ModalHeader>Send file</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack>
            {files.map((file, index) => (
              <HStack w="100%" key={index}>
                <Heading wordBreak="break-all" size="xs">
                  {file.file.name}
                </Heading>
                <Spacer />
                {send ? (
                  <CircularProgress value={file.loaded} color="green.400">
                    <CircularProgressLabel>
                      {file.loaded}%
                    </CircularProgressLabel>
                  </CircularProgress>
                ) : (
                  <DeleteIcon
                    cursor="pointer"
                    onClick={() => removeFile(index)}
                  />
                )}
              </HStack>
            ))}
          </VStack>
        </ModalBody>
        <ModalFooter>
          <Button mr={3} onClick={onClose} variant="ghost">
            Cancel
          </Button>
          <Button onClick={handleSend} colorScheme="messenger" disabled={send}>
            Send
          </Button>
        </ModalFooter>
        {drag && (
          <DragAndDropFiles
            onDropHandler={onDropHandler}
            dragLeaveHandler={dragLeaveHandler}
            dragStartHandler={dragStartHandler}
          />
        )}
      </ModalContent>
    </Modal>
  );
};
