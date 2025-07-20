import React from "react";
import { createBrowserRouter } from "react-router";
import Home from "../pages/Home/Home/Home";
import RootLayout from "../layouts/RootLayout";
import AuthLayout from "../layouts/AuthLayout";
import Login from "../pages/Authentication/Login/Login";
import Register from "../pages/Authentication/Register/Register";
import DashBoardLayout from "../layouts/DashBoardLayout";
import MyProfile from "../pages/DashBoard/MyProfile/MyProfile";
import AuthPrivate from "../PrivateRoute/AuthPrivate";
import AddPost from "../pages/DashBoard/NormalUser/AddPost/AddPost";
import MyPosts from "../pages/DashBoard/NormalUser/MyPosts/MyPosts";
import PostDetails from "../pages/PostDetails/PostDetails";
import MemberShip from "../pages/MemberShip/MemberShip";
import PostCommented from "../pages/DashBoard/NormalUser/PostCommented/PostCommented";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout></RootLayout>,
    children: [
      {
        index: true,
        element: <Home></Home>,
      },
      {
        path: '/post-details/:id',
        element: <PostDetails></PostDetails>
      },
      {
        path: '/membership',
        element: <AuthPrivate><MemberShip></MemberShip></AuthPrivate>
      }
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
    element: (
      <AuthPrivate>
        <DashBoardLayout></DashBoardLayout>
      </AuthPrivate>
    ),
    children: [
      {
        path: 'my-profile',
        element: <MyProfile></MyProfile>,
      },
      //   normal user routes
      {
        path: "add-post",
        element: <AddPost></AddPost>,
      },
      {
        path: "my-posts",
        element: <MyPosts></MyPosts>,
      },
      {
        path: "post-commented/:postId",
        element: <PostCommented></PostCommented>
      },
    ],
  },
]);

export default router;
