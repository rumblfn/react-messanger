import React, {useState} from "react";
import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay, VStack
} from "@chakra-ui/react";
import * as Yup from "yup";
import { Form, Formik } from "formik";

export const ModalCreateGroup = ({
  isOpen, onClose
}) => {
  const [error, setError] = useState()

  return <Modal isOpen={isOpen} onClose={onClose}>
    <ModalOverlay/>
    <ModalContent>
      <ModalHeader>Create group</ModalHeader>
      <ModalCloseButton />
      <ModalBody>
        <Formik
          initialValues={{
            name: "",
          }}
          validationSchema={Yup.object({
            name: Yup.string()
              .required('Name required')
              .min(4, 'short name!')
              .max(67, "Name is too long")
          })}
          onSubmit={(values, actions) => {
            const vals = {...values}
            actions.resetForm()

            fetch(`${process.env.REACT_APP_HOST_URL}/new_group`, {

            }).catch((err) => {
              return console.error(err)
            }).then((res) => {
              if (!res || !res.ok || res.status >= 400) {
                return
              }
              return res.json();
            }).then(data => {
              if (!data || data.loggedIn) {
                setError(data.status)
                return
              }
              onClose()
            })
          }}
        >
          <VStack as={Form} w={{base: "90%", md: "500px"}}>

          </VStack>
        </Formik>
      </ModalBody>
      <ModalFooter>
        <Button
          onClick={onClose}
          variant="ghost"
        >
          Create
        </Button>
      </ModalFooter>
    </ModalContent>
  </Modal>
}