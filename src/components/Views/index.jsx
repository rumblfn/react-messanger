import React, { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import PrivateRoutes from "../../hocs/PrivateRoutes";
import Login from "../../routes/Auth/Login";
import SignUp from "../../routes/Auth/SignUp";
import Dashboard from "../../routes/Dashboard";
import Home from "../../routes/Home";
import LiveRoom from "../../routes/Room";
import { AccountContext } from "../AccountContext";
import { LoadingPage } from "./LoadingPage";

export const Views = () => {
  const { user } = useContext(AccountContext);
  return user.loggedIn === null ? (
    <LoadingPage />
  ) : (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<SignUp />} />
      <Route element={<PrivateRoutes />}>
        <Route path="/home/*" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/live" element={<LiveRoom/>} />
      </Route>
      <Route path="*" element={<Login />} />
    </Routes>
  );
};

export default Views;
