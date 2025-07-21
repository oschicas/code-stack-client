import React from "react";
import { createBrowserRouter } from "react-router";
import Home from "../pages/Home/Home/Home";
import RootLayout from "../layouts/RootLayout";
import AuthLayout from "../layouts/AuthLayout";
import Login from "../pages/Authentication/Login/Login";
import Register from "../pages/Authentication/Register/Register";
import DashBoardLayout from "../layouts/DashBoardLayout";
import AuthPrivate from "../PrivateRoute/AuthPrivate";
import AddPost from "../pages/DashBoard/NormalUser/AddPost/AddPost";
import MyPosts from "../pages/DashBoard/NormalUser/MyPosts/MyPosts";
import PostDetails from "../pages/PostDetails/PostDetails";
import MemberShip from "../pages/MemberShip/MemberShip";
import PostCommented from "../pages/DashBoard/NormalUser/PostCommented/PostCommented";
import UserProfile from "../pages/DashBoard/NormalUser/UserProfile/UserProfile";
import AdminProfile from "../pages/DashBoard/AdminUser/AdminProfile/AdminProfile";
import Forbidden from "../pages/Forbidden/Forbidden";
import AdminPrivateRoute from "../PrivateRoute/AdminPrivateRoute";
import UserPrivateRoute from "../PrivateRoute/UserPrivateRoute";
import ManageUsers from "../pages/DashBoard/AdminUser/ManageUsers/ManageUsers";
import ReportedComments from "../pages/DashBoard/AdminUser/ReportedComments/ReportedComments";
import MakeAnnouncement from "../pages/DashBoard/AdminUser/MakeAnnouncement/MakeAnnouncement";

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
        path: "/post-details/:id",
        element: <PostDetails></PostDetails>,
      },
      {
        path: "/membership",
        element: (
          <AuthPrivate>
            <MemberShip></MemberShip>
          </AuthPrivate>
        ),
      },
      {
        path: "/forbidden",
        element: <Forbidden></Forbidden>,
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
    element: (
      <AuthPrivate>
        <DashBoardLayout></DashBoardLayout>
      </AuthPrivate>
    ),
    children: [
      //   normal user routes
      {
        path: "user-profile",
        element: (
          <UserPrivateRoute>
            <UserProfile></UserProfile>
          </UserPrivateRoute>
        ),
      },
      {
        path: "add-post",
        element: (
          <UserPrivateRoute>
            <AddPost></AddPost>
          </UserPrivateRoute>
        ),
      },
      {
        path: "my-posts",
        element: (
          <UserPrivateRoute>
            <MyPosts></MyPosts>
          </UserPrivateRoute>
        ),
      },
      {
        path: "post-commented/:postId",
        element: (
          <UserPrivateRoute>
            <PostCommented></PostCommented>
          </UserPrivateRoute>
        ),
      },
      // admin user routes
      {
        path: "admin-profile",
        element: (
          <AdminPrivateRoute>
            <AdminProfile></AdminProfile>
          </AdminPrivateRoute>
        ),
      },
      {
        path: "manage-users",
        element: (
          <AdminPrivateRoute>
            <ManageUsers></ManageUsers>
          </AdminPrivateRoute>
        ),
      },
      {
        path: "reported-comments",
        element: (
          <AdminPrivateRoute>
            <ReportedComments></ReportedComments>
          </AdminPrivateRoute>
        ),
      },
      {
        path: "make-announcement",
        element: (
          <AdminPrivateRoute>
            <MakeAnnouncement></MakeAnnouncement>
          </AdminPrivateRoute>
        ),
      },
    ],
  },
]);

export default router;
