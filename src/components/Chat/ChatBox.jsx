import { Button, HStack, Input } from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
import { nanoid } from "nanoid";
import * as Yup from "yup";
import { useActions } from "../../hooks/useActions";
import socket from "../../socket";

const ChatBox = ({user}) => {
    const {addMessage} = useActions()

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
            timestamp: new Date().getTime()
        }

        socket.emit("dm", message, nanoid(8))
        addMessage({message, userid: message.to})

        actions.resetForm();
      }}
    >
      <HStack as={Form} w="100%" pb="1.4rem" px="1.4rem">
        <Input
          as={Field}
          name="message"
          placeholder="Type message here.."
          size="lg"
          autoComplete="off"
        />
        <Button type="submit" size="lg" colorScheme="teal">
          Send
        </Button>
      </HStack>
    </Formik>
  );
};

export default ChatBox;
