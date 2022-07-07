import { ArrowForwardIcon } from "@chakra-ui/icons";
import {
  Button,
  Container,
  Flex,
  Spacer
} from "@chakra-ui/react";
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AccountContext } from "../../components/AccountContext";
import ToggleColorMode from "../../components/ColorModeToggler";

const Dashboard = () => {
    const navigate = useNavigate()
    const { setUser } = useContext(AccountContext);

    const logout = () => {
        fetch(`${process.env.REACT_APP_HOST_URL}/auth/logout`, {
            credentials: "include",
        }).catch(err => {
            return
        })
        .then(res => {
            if (!res || !res.ok || !res.status >= 400) {
                return
            }
            return res.json()
        })
        .then(data => {
            if (!data) {
                return
            } else {
                setUser({loggedIn: false})
            }
        })
    }

  return (
    <Container maxW='1280px' p={3}>
      <Flex gap={2} display="flex">
        <Button onClick={() => navigate('/home')} colorScheme="teal">
            Home
        </Button>
        <Spacer/>
        <Button onClick={() => logout()}>
            <span>Log out</span> <ArrowForwardIcon/>
        </Button>
        <ToggleColorMode />
      </Flex>
    </Container>
  );
};

export default Dashboard;
