import { Box, Container, HStack, Tabs, VStack } from "@chakra-ui/react";
import React from "react";
import { useSelector } from "react-redux";
import { getDashboard } from "../../store/dashboard";
import { MainLayout } from "./main";
import { Sidebar } from "./sidebar";
import { TopPanel } from "./topPanel";

const Dashboard = () => {
  const dashboardInformation = useSelector(getDashboard);

  return (
    <Container minH="100vh" maxW="1280px" p={3}>
      <VStack h="100%">
        <TopPanel />
        <HStack
          w="100%"
          h="100%"
          as={Tabs}
          variant="enclosed"
          alignItems="start"
        >
          <Box w="350px" h="100%">
            <Sidebar />
          </Box>
          <MainLayout />
        </HStack>
      </VStack>
    </Container>
  );
};

export default Dashboard;
