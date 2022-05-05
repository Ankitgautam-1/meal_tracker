import React from "react";
import { useCookies } from "react-cookie";
import { Navigate } from "react-router-dom";

const Home = () => {
  const [cookies] = useCookies(["authenticated"]);
  if (cookies.authenticated === undefined || cookies.authenticated === false) {
    return <Navigate to="/login" />;
  }
  return <div>Home</div>;
};

export default Home;
