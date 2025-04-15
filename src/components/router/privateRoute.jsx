import React from "react";
import { Outlet } from "react-router";

const PrivateRoute = () => {
  const auth = true;
  return auth ? <Outlet /> : <div>Access denied!</div>;
};

export default PrivateRoute;
