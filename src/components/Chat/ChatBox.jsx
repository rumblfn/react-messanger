import { AttachmentIcon } from "@chakra-ui/icons";
import { Button, HStack, Input } from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
import { nanoid } from "nanoid";
import { useRef } from "react";
import * as Yup from "yup";
import { useActions } from "../../hooks/useActions";
import socket from "../../socket";

const ChatBox = ({ user, setFiles, onOpen }) => {
  let fileRef = useRef();

  const { addMessage } = useActions();

  const handleFile = (e) => {
    const file = fileRef.files[0];
    setFiles([{
      file, loaded: 0
    }])
    onOpen()
  };

  return (
    <Formik
      initialValues={{ message: "" }}
      validationSchema={Yup.object({
        message: Yup.string().min(1),
      })}
      onSubmit={(values, actions) => {
        const message = {
          username: user.username,
          connected: user?.connected,
          to: user?.userid,
          from: null,
          content: values.message,
          timestamp: new Date().getTime(),
          type: "MESSAGE",
        };

        socket.emit("dm", message, nanoid(8));
        addMessage({ message, userid: message.to });

        actions.resetForm();
      }}
    >
      <HStack as={Form} w="100%" pb="0.8rem" px="1rem" pr="1.6rem">
        <input
          ref={(input) => (fileRef = input)}
          style={{ display: "none" }}
          type="file"
          onChange={handleFile}
        />
        <Button onClick={() => fileRef.click()} size="md">
          <AttachmentIcon />
        </Button>
        <Input
          as={Field}
          name="message"
          placeholder="Type message here.."
          size="md"
          autoComplete="off"
        />
        <Button type="submit" size="md" colorScheme="teal">
          Send
        </Button>
      </HStack>
    </Formik>
  );
};

export default ChatBox;
