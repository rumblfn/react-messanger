import { ArrowForwardIcon } from "@chakra-ui/icons";
import { Button, Flex, Spacer } from "@chakra-ui/react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AccountContext } from "../../components/AccountContext";
import ToggleColorMode from "../../components/ColorModeToggler";
import { useActions } from "../../hooks/useActions";
import React from "react";

export const TopPanel = () => {
  const { setUser } = useContext(AccountContext);
  const { clearChats } = useActions();
  const navigate = useNavigate()

  const logout = () => {
    clearChats();
    fetch(`${process.env.REACT_APP_HOST_URL}/auth/logout`, {
      credentials: "include",
    })
      .catch((err) => {
        return;
      })
      .then((res) => {
        if (!res || !res.ok || !res.status >= 400) {
          return;
        }
        return res.json();
      })
      .then((data) => {
        if (!data) {
          return;
        } else {
          document.location.reload();
          setUser({ loggedIn: false });
        }
      });
  };

  return (
    <Flex gap={2} display="flex" w="100%">
      <Button onClick={() => navigate("/home")} colorScheme="teal">
        Home
      </Button>
      <Spacer />
      <Button onClick={() => logout()}>
        <span>Log out</span> <ArrowForwardIcon />
      </Button>
      <ToggleColorMode />
    </Flex>
  );
};
