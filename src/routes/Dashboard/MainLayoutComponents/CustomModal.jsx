import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { useState } from "react";
import TextField from "../../Auth/TextField";
import * as Yup from "yup";

export const NewPasswordModal = ({ isOpen, onClose }) => {
  const [error, setError] = useState("");

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <Formik
          initialValues={{
            oldPassword: "",
            newPassword: "",
          }}
          validationSchema={Yup.object({
            oldPassword: Yup.string()
              .required("Old password required!")
              .min(8, "short password!"),
            newPassword: Yup.string()
              .required("New password required!")
              .min(8, "short password!"),
          })}
          onSubmit={(values, actions) => {
            const vals = { ...values };
            actions.resetForm();
            setError("");

            fetch(`${process.env.REACT_APP_HOST_URL}/auth/change-password`, {
              method: "POST",
              credentials: "include",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(vals),
            })
              .catch((err) => {
                setError("Some errors");
                return;
              })
              .then((res) => {
                if (!res || !res.ok || res.status >= 400) {
                  setError("Some errors");
                  return;
                }
                return res.json();
              })
              .then((data) => {
                if (!data) {
                  setError("Some errors");
                  return;
                }
                if (!data || !data.loggedIn) {
                  setError(data.status);
                  return;
                }
                onClose();
              });
          }}
        >
          <Form>
            <ModalHeader>Change Password</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Text as="p" color="red.500">
                {error}
              </Text>
              <TextField
                type="password"
                label="Old password"
                autoComplete="off"
                placeholder="type old password here ..."
                name="oldPassword"
              />
              <TextField
                type="password"
                label="New Password"
                autoComplete="off"
                placeholder="type new password here ..."
                name="newPassword"
              />
            </ModalBody>
            <ModalFooter>
              <Button onClick={onClose} variant="ghost" mr={3}>
                Cancel
              </Button>
              <Button type="submit" colorScheme="messenger">
                Confirm
              </Button>
            </ModalFooter>
          </Form>
        </Formik>
      </ModalContent>
    </Modal>
  );
};
