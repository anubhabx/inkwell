import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const ProtectRoute = () => {
  const { user } = useSelector((state) => state.user);

  return user ? <Outlet /> : <Navigate to="/sign-in" />;
};

export default ProtectRoute;
