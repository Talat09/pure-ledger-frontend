/* eslint-disable react/prop-types */
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("token"); // Get the token from localStorage

  return token ? children : <Navigate to="/" />; // If token exists, render children, else redirect to login
};

export default PrivateRoute;
