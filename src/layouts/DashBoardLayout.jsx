import React, { useState } from "react";
import { NavLink, Outlet } from "react-router";
import {
  FaUserCircle,
  FaPlusCircle,
  FaClipboardList,
  FaBars,
  FaUserShield,
} from "react-icons/fa";
import CodeStackLogo from "../components/CodeStackLogo";
import useAuth from "../hooks/useAuth";
import { toast } from "react-toastify";

const DashBoardLayout = () => {
  const { logOut } = useAuth();

  const [open, setOpen] = useState(false);

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
      <li>
        {/* normal user links */}
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
      {/* admin user links */}
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
        <button className="btn btn-sm btn-ghost" onClick={() => setOpen(!open)}>
          <FaBars size={20} />
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {open && (
        <>
          <h2 className="text-xl font-bold px-4 py-2">Dashboard</h2>
          <ul className="md:hidden bg-base-100 shadow p-4 space-y-2">
            {dashBoardNavItems}
          </ul>
        </>
      )}

      {/* Sidebar (Desktop) */}
      <div className="hidden md:block w-64 bg-base-100 shadow-md p-4 space-y-5">
        <h2 className="text-2xl font-bold text-center">Dashboard</h2>
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
