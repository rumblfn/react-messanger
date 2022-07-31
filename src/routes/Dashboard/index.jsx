import { Box, Container, HStack, Tabs, VStack } from "@chakra-ui/react";
import React from "react";
// import { useSelector } from "react-redux";
// import { getDashboard } from "../../store/dashboard";
import { MainLayout } from "./main";
import { Sidebar } from "./sidebar";
import { TopPanel } from "./topPanel";
import styles from './style.module.css'

const Dashboard = () => {
  // const dashboardInformation = useSelector(getDashboard);

  return (
    <Container minH="100vh" maxW="1280px" p={3}>
      <VStack h="100%">
        <TopPanel />
        <Box
          className={styles.box}
          w="100%"
          h="100%"
          as={Tabs}
          variant="enclosed"
        >
          <Sidebar />
          <MainLayout />
        </Box>
      </VStack>
    </Container>
  );
};

export default Dashboard;
