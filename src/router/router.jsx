import React from "react";
import { createBrowserRouter } from "react-router";
import Home from "../pages/Home/Home/Home";
import RootLayout from "../layouts/RootLayout";
import AuthLayout from "../layouts/AuthLayout";
import Login from "../pages/Authentication/Login/Login";
import Register from "../pages/Authentication/Register/Register";
import DashBoardLayout from "../layouts/DashBoardLayout";
import MyProfile from "../pages/DashBoard/MyProfile/MyProfile";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout></RootLayout>,
    children: [
      {
        index: true,
        element: <Home></Home>,
      },
    ],
  },
  //   authentication layout and it's routes (login & register)
  {
    path: "/",
    element: <AuthLayout></AuthLayout>,
    children: [
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/register",
        element: <Register></Register>,
      },
    ],
  },
  //   dashboard layout and it's routes
  {
    path: "/dashboard",
    element: <DashBoardLayout></DashBoardLayout>,
    children: [
        {
            index: true,
            element: <MyProfile></MyProfile>
        },
    ]
  },
]);

export default router;
