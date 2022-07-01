import { Button, ButtonGroup, Heading, VStack } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import React, { useContext } from "react";
import TextField from "./TextField";
import { useNavigate } from "react-router-dom";
import { AccountContext } from "../../components/AccountContext";

export default function Login() {
  const { setUser } = useContext(AccountContext);
  const navigate = useNavigate();

  return (
    <Formik
      initialValues={{
        username: "",
        password: "",
      }}
      validationSchema={Yup.object({
        username: Yup.string()
          .required("Username required!")
          .min(5, "short username!")
          .max(30, "Username too long"),
        password: Yup.string()
          .required("Password required!")
          .min(8, "short password!"),
      })}
      onSubmit={(values, actions) => {
        const vals = { ...values };
        actions.resetForm();

        fetch("http://localhost:4000/auth/login", {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(vals),
        })
          .catch((err) => {
            return;
          })
          .then((res) => {
            if (!res || !res.ok || res.status >= 400) {
              return;
            }
            return res.json();
          })
          .then((data) => {
            if (!data || !data.loggedIn) return;
            console.log(data);
            setUser({...data})
            navigate("/home");
          });
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
        <Heading>Log In</Heading>

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

        <ButtonGroup pt="1rem">
          <Button colorScheme="teal" type="submit">
            Log In
          </Button>
          <Button onClick={() => navigate("/register")}>Create Account</Button>
        </ButtonGroup>
      </VStack>
    </Formik>
  );
}
