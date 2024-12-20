import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ element }) => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  return currentUser ? element : <Navigate to="/login" />;
};

export default PrivateRoute;
