import { CheckIcon, CloseIcon } from "@chakra-ui/icons";
import {
  Button,
  Heading,
  HStack,
  Input,
  Spinner,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useContext } from "react";
import { useState } from "react";
import { AccountContext } from "../../../../components/AccountContext";
import React from "react";

export const Email = ({ currentEmail }) => {
  const [emailErr, setEmailErr] = useState("");
  const [email, setEmail] = useState(currentEmail || "");
  const [sent, setSent] = useState(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");
  const [emailChanged, setEmailChanged] = useState(false)

  const {setUser} = useContext(AccountContext)

  const handleInitialLoading = () => {
    setLoading(true);
    setSent(null);
    setError(false);
    setEmailErr("");
  };

  const handleError = () => {
    setLoading(false);
    setSent(false);
    setError(true);
    setEmailErr("Some errors");
  };

  const handleSuccess = () => {
    setLoading(false);
    setSent(true);
    setError(false);
    setEmailErr("");
  };

  const handleSuccessVerify = () => {
    setLoading(false);
    setSent(false);
    setError(false);
    setEmailErr("");
    setEmailChanged(true)

    setUser(prev => ({
      ...prev,
      email
    }))
  }

  const handleEmail = () => {
    if (email !== currentEmail && validateEmail(email)) {
      handleInitialLoading();
      fetch(`${process.env.REACT_APP_HOST_URL}/auth/change-email`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
        }),
      })
        .catch((err) => {
          handleError();
          return;
        })
        .then((res) => {
          if (!res || !res.ok || res.status >= 400) {
            handleError();
            return;
          }
          return res.json();
        })
        .then((data) => {
          if (data && data.sent) {
            handleSuccess();
          } else {
            handleError();
          }
        });
    } else {
      setEmailErr("Not valid email");
    }
  };

  const verifyCode = () => {
    fetch(`${process.env.REACT_APP_HOST_URL}/auth/verify-email-code`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        code: verificationCode,
      }),
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
        if (data.status === false) {
          setEmailErr(data.error)
        } else if (data.status === true) {
          handleSuccessVerify()
        }
      });
  };

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  return (
    <VStack w="100%" alignItems="start" p={2} pt={0}>
      <Heading size="md">Email</Heading>
      {emailErr && <Text color="red.600">{emailErr}</Text>}
      <HStack w="100%">
        <Input
          onChange={(e) => setEmail(e.target.value)}
          placeholder={currentEmail ? "Your email here.." : "Email not connected"}
          value={email}
        />
        <Button
          disabled={email === currentEmail || sent === true}
          onClick={handleEmail}
          colorScheme="messenger"
        >
          {loading && <Spinner size="sm" />}
          {error && <CloseIcon />}
          {emailChanged && <CheckIcon />}
          {!loading && !error && !emailChanged && <span>Confirm</span>}
        </Button>
      </HStack>
      {sent && !error && !loading && (
        <VStack w="100%" alignItems="center">
          <HStack w="80%">
            <Input
              onChange={(e) => setVerificationCode(e.target.value)}
              value={verificationCode}
              placeholder="paste verification code here.."
            />
            <Button onClick={verifyCode} colorScheme="messenger">
              Verify
            </Button>
          </HStack>
        </VStack>
      )}
    </VStack>
  );
};
