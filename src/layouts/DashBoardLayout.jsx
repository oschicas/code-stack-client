import React, { useState } from "react";
import { NavLink, Outlet } from "react-router";
import {
  FaUserCircle,
  FaPlusCircle,
  FaClipboardList,
  FaBars,
  FaUserShield,
  FaUsers,
  FaBullhorn,
  FaExclamationTriangle,
} from "react-icons/fa";
import CodeStackLogo from "../components/CodeStackLogo";
import useAuth from "../hooks/useAuth";
import { toast } from "react-toastify";
import useUserRole from "../hooks/useUserRole";

const DashBoardLayout = () => {
  const { logOut } = useAuth();

  const [open, setOpen] = useState(false);
  const { role, roleLoading } = useUserRole();

  const handleLogout = () => {
    logOut()
      .then(() => {
        toast.success("Successfully Logged out");
      })
      .catch((error) => {
        toast.error(`${error.message}`);
      });
  };

  const dashBoardNavItems = (
    <>
      {/* normal user links */}
      {role === "user" && !roleLoading && (
        <>
          <li>
            <NavLink
              to="/dashboard/user-profile"
              className={({ isActive }) =>
                `flex items-center gap-2 p-2 rounded ${
                  isActive ? "bg-primary text-white" : "hover:bg-base-300"
                }`
              }
            >
              <FaUserCircle /> My Profile
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard/add-post"
              className={({ isActive }) =>
                `flex items-center gap-2 p-2 rounded ${
                  isActive ? "bg-primary text-white" : "hover:bg-base-300"
                }`
              }
            >
              <FaPlusCircle /> Add Post
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard/my-posts"
              className={({ isActive }) =>
                `flex items-center gap-2 p-2 rounded ${
                  isActive ? "bg-primary text-white" : "hover:bg-base-300"
                }`
              }
            >
              <FaClipboardList /> My Posts
            </NavLink>
          </li>
        </>
      )}
      {/* admin user links */}
      {role === "admin" && !roleLoading && (
        <>
          <li>
            <NavLink
              to="/dashboard/admin-profile"
              className={({ isActive }) =>
                `flex items-center gap-2 p-2 rounded ${
                  isActive ? "bg-primary text-white" : "hover:bg-base-300"
                }`
              }
            >
              <FaUserShield /> Admin Profile
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard/manage-users"
              className={({ isActive }) =>
                `flex items-center gap-2 p-2 rounded ${
                  isActive ? "bg-primary text-white" : "hover:bg-base-300"
                }`
              }
            >
              <FaUsers /> Manage Users
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/dashboard/make-announcement"
              className={({ isActive }) =>
                `flex items-center gap-2 p-2 rounded ${
                  isActive ? "bg-primary text-white" : "hover:bg-base-300"
                }`
              }
            >
              <FaBullhorn /> Make Announcement
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/dashboard/reported-comments"
              className={({ isActive }) =>
                `flex items-center gap-2 p-2 rounded ${
                  isActive ? "bg-primary text-white" : "hover:bg-base-300"
                }`
              }
            >
              <FaExclamationTriangle /> Reported Comments
            </NavLink>
          </li>
        </>
      )}

      {/* logout button */}
      <li>
        <button
          onClick={handleLogout}
          className="btn btn-primary btn-outline w-full"
        >
          Logout
        </button>
      </li>
    </>
  );

  return (
    <div className="min-h-screen bg-base-200 flex flex-col md:flex-row">
      {/* Mobile Navbar */}
      <div className="md:hidden bg-base-100 p-4 flex justify-between items-center shadow">
        {/* logo to go home route */}
        <div>
          <CodeStackLogo></CodeStackLogo>
        </div>
        <button className="btn btn-sm btn-ghost px-0" onClick={() => setOpen(!open)}>
          <FaBars size={20} />
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {open && (
        <>
          <h2 className="text-xl font-bold px-4 py-2 flex items-center justify-between">
            Dashboard {/* dark theme */}
            <div>
              <label className="swap swap-rotate">
                {/* this hidden checkbox controls the state */}
                <input
                  type="checkbox"
                  className="theme-controller"
                  value="night"
                />

                {/* sun icon */}
                <svg
                  className="swap-off h-10 w-8 fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
                </svg>

                {/* moon icon */}
                <svg
                  className="swap-on h-10 w-8 fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
                </svg>
              </label>
            </div>
          </h2>
          <ul className="md:hidden bg-base-100 shadow p-4 space-y-2">
            {dashBoardNavItems}
          </ul>
        </>
      )}

      {/* Sidebar (Desktop) */}
      <div className="hidden md:block w-64 bg-base-100 shadow-md p-4 space-y-5">
        <h2 className="text-2xl font-bold text-center flex justify-between items-center">
          Dashboard {/* dark theme */}
          <div>
            <label className="swap swap-rotate">
              {/* this hidden checkbox controls the state */}
              <input
                type="checkbox"
                className="theme-controller"
                value="night"
              />

              {/* sun icon */}
              <svg
                className="swap-off h-10 w-8 fill-current"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
              </svg>

              {/* moon icon */}
              <svg
                className="swap-on h-10 w-8 fill-current"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
              </svg>
            </label>
          </div>
        </h2>
        {/* logo to go home route */}
        <div>
          <CodeStackLogo></CodeStackLogo>
        </div>
        <ul className="space-y-2">{dashBoardNavItems}</ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-4">
        <Outlet />
      </div>
    </div>
  );
};

export default DashBoardLayout;
