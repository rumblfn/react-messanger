import { ArrowForwardIcon } from "@chakra-ui/icons";
import { Button, Container, Flex, Grid, GridItem, Spacer, Tabs, VStack } from "@chakra-ui/react";
import React, { useContext } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AccountContext } from "../../components/AccountContext";
import ToggleColorMode from "../../components/ColorModeToggler";
import { useActions } from "../../hooks/useActions";
import { getDashboard } from "../../store/dashboard";
import { Sidebar } from "./sidebar";

const Dashboard = () => {
  const navigate = useNavigate();
  const { setUser } = useContext(AccountContext);
  const { clearChats } = useActions();

  const dashboardInformation = useSelector(getDashboard);

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

  useEffect(() => {
    console.log(dashboardInformation);
  }, []);

  return (
    <Container maxW="1280px" p={3}>
      <VStack>
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
        <Grid
          templateColumns="repeat(10, 1fr)"
          as={Tabs}
        >
          <GridItem colSpan='3' borderRight="1px solid gray">
            <Sidebar />
          </GridItem>
          <GridItem colSpan='7' maxH="100vh">

          </GridItem>
        </Grid>
      </VStack>
    </Container>
  );
};

export default Dashboard;
