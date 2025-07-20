import React from "react";
import useAuth from "../hooks/useAuth";
import useUserRole from "../hooks/useUserRole";
import LoadingSpinner from "../components/LoadingSpinner";
import { Navigate } from "react-router";

const UserPrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const { role, roleLoading } = useUserRole();

  if (loading || roleLoading) {
    return <LoadingSpinner></LoadingSpinner>;
  }

  if (!user?.email || role !== "user") {
    return <Navigate to={"/forbidden"}></Navigate>;
  }

  return children;
};

export default UserPrivateRoute;
