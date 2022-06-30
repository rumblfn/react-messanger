import { Button, ButtonGroup, Heading, VStack } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import React from "react";
import TextField from "./TextField";
import { useNavigate } from "react-router-dom";

export default function SignUp() {
    const navigate = useNavigate()

  return (
    <Formik
      initialValues={{
        username: "",
        password: "",
        passwordConfirmation: ""
      }}
      validationSchema={Yup.object({
        username: Yup.string()
          .required("Username required!")
          .min(5, "short username!")
          .max(30, "Username too long"),
        password: Yup.string()
          .required("Password required!")
          .min(8, "short password!"),
        passwordConfirmation: Yup.string()
          .oneOf([Yup.ref('password'), null], "Password don't match")
          .required("Password confirmation required!")
      })}
      onSubmit={(values, actions) => {
        alert(JSON.stringify(values, null, 2));
        actions.resetForm();
      }}
    >
      <VStack
        as={Form}
        w={{ base: "90%", md: "500px" }}
        m="auto"
        justify="center"
        h="100vh"
        spacing="1rem"
      >
        <Heading>Sign Up</Heading>

        <TextField
          name="username"
          placeholder="Type your username"
          autoComplete="off"
          label="Username"
        />
        <TextField
          name="password"
          placeholder="Type your password"
          autoComplete="off"
          label="Password"
          type="password"
        />
        <TextField
          name="passwordConfirmation"
          placeholder="Repeat your password"
          autoComplete="off"
          label="Password confirmation"
          type="password"
        />

        <ButtonGroup pt="1rem">
          <Button colorScheme="teal" type="submit">
            Create Account
          </Button>
          <Button onClick={() => navigate("/")}>Back</Button>
        </ButtonGroup>
      </VStack>
    </Formik>
  );
}
