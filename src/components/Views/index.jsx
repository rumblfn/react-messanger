import { Text } from "@chakra-ui/react";
import React, { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import PrivateRoutes from "../../hocs/PrivateRoutes";
import Login from "../../routes/Auth/Login";
import SignUp from "../../routes/Auth/SignUp";
import Dashboard from "../../routes/Dashboard";
import Home from "../../routes/Home";
import { AccountContext } from "../AccountContext";

export const Views = () => {
  const { user } = useContext(AccountContext);
  return user.loggedIn === null ? (
    <Text>Loading...</Text>
  ) : (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<SignUp />} />
      <Route element={<PrivateRoutes />}>
        <Route path="/home" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Route>
      <Route path="*" element={<Login />} />
    </Routes>
  );
};

export default Views;
