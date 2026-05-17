import React from "react";
import { Navigate } from "react-router";
import { useAuth } from "../hooks/useAuth";
import "../../../style/LoginLoader.scss";

const Protected = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <main className="loading-screen">
        <div className="loader"></div>
        <h1>Signing you in.</h1>
      </main>
    );
  }

  if (!user) {
    return <Navigate to={"/login"} />;
  }
  return children;
};

export default Protected;
