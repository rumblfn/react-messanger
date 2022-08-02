import { Box, Container, Tabs, useMediaQuery, VStack } from "@chakra-ui/react";
import React from "react";
// import { useSelector } from "react-redux";
// import { getDashboard } from "../../store/dashboard";
import { MainLayout } from "./main";
import { Sidebar } from "./sidebar";
import { TopPanel } from "./topPanel";
import styles from "./style.module.css";

const Dashboard = () => {
  const [phone] = useMediaQuery("(max-width: 670px)");
  // const dashboardInformation = useSelector(getDashboard);

  return (
    <Container minH="100vh" maxW="1280px" p={3}>
      <VStack h="100%" w="100%">
        <TopPanel />
        <Box
          display={phone ? "flex" : "grid"}
          as={Tabs}
          className={styles.box}
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
