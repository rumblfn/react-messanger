import { AttachmentIcon, CloseIcon } from "@chakra-ui/icons";
import {
  Button,
  Heading,
  HStack,
  Input,
  Text,
  useMediaQuery,
  VStack,
} from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
import { nanoid } from "nanoid";
import { useContext } from "react";
import { useRef } from "react";
import * as Yup from "yup";
import { useActions } from "../../hooks/useActions";
import socket from "../../socket";
import { AccountContext } from "../AccountContext";
import { ExpandFile } from "../ToExpandFile";

const ChatBox = ({ user, setFiles, onOpen, handleChatBoxReplyClick, newmessageindex }) => {
  const [tablet] = useMediaQuery("(max-width: 1040px)");
  const { user: currentUser } = useContext(AccountContext);
  let fileRef = useRef();
  const { msgBg, handleRemoveReply } = useContext(ExpandFile);
  const messageToReply = msgBg?.messageToReply;
  let messageToReplyUsername = user.username;

  if (messageToReply?.from === currentUser?.userid) {
    messageToReplyUsername = currentUser?.username
  }

  const { addMessage } = useActions();

  const handleFile = (e) => {
    const file = fileRef.files[0];

    setFiles([
      {
        file,
        loaded: 0,
      },
    ]);
    onOpen();
  };

  return (
    <Formik
      initialValues={{ message: "" }}
      validationSchema={Yup.object({
        message: Yup.string().min(1),
      })}
      onSubmit={(values, actions) => {
        const message = {
          index: newmessageindex,
          username: user.username,
          connected: user?.connected,
          to: user?.userid,
          from: null,
          content: values.message,
          timestamp: new Date().getTime(),
          type: messageToReply
            ? `REPLY:${messageToReplyUsername}:${messageToReply.content.slice(0, 100).split('.')[0]}:${
                messageToReply.timestamp
              }`
            : "MESSAGE",
        };

        handleRemoveReply()
        socket.emit("dm", message, nanoid(8));
        addMessage({ message, userid: message.to });

        actions.resetForm();
      }}
    >
      <VStack w={tablet ? "100%" : "90%"} maxW="1600px" p="0.6rem" pt={0}>
        {messageToReply && (
          <HStack p={1} w="100%">
            <CloseIcon
              onClick={handleRemoveReply}
              color="blue.500"
              cursor="pointer"
            />
            <Heading color="blue.500" size="xs">
              {messageToReplyUsername}
            </Heading>
            <Text cursor='pointer'
              onClick={handleChatBoxReplyClick}
              p={0}
              size="xs"
              w="100%"
              wordBreak="keep-all"
              overflow="hidden"
            >
              {messageToReply.content.slice(0, 100)}
            </Text>
          </HStack>
        )}
        <HStack gap="12px" spacing={0} as={Form} w="100%">
          <input
            m={0}
            ref={(input) => (fileRef = input)}
            style={{ display: "none" }}
            type="file"
            onChange={handleFile}
          />
          <Button onClick={() => fileRef.click()} size="md" p={0}>
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
      </VStack>
    </Formik>
  );
};

export default ChatBox;
