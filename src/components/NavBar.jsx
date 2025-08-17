import React, { useEffect, useRef, useState } from "react";
import { Link, NavLink } from "react-router";
import { Bounce, toast } from "react-toastify";
import useAuth from "../hooks/useAuth";
import CodeStackLogo from "./CodeStackLogo";
import { IoNotificationsCircleSharp } from "react-icons/io5";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../hooks/useAxiosSecure";
import useUserRole from "../hooks/useUserRole";

const NavBar = () => {
  const { user, loading, logOut } = useAuth();
  const [toggle, setToggle] = useState(false);
  const dropDownRef = useRef(null);
  const axiosSecure = useAxiosSecure();
  const { role, roleLoading } = useUserRole();

  // fetch announcements
  const { data: announcements = [] } = useQuery({
    queryKey: ["announcement"],
    queryFn: async () => {
      const res = await axiosSecure("/announcements");
      return res.data;
    },
  });

  console.log(announcements);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!dropDownRef.current.contains(event.target)) {
        setToggle(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    logOut()
      .then(() => {
        toast.success("Successfully Logged out", {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
      })
      .catch((error) => {
        toast.success(error.message, {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
      });
  };

  const navItems = (
    <>
      <li>
        <NavLink
          to={"/"}
          className={({ isActive }) =>
            `nav-item ${
              isActive ? "active font-bold text-[#0B213A]" : "text-white"
            }`
          }
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to={"/all-posts"}
          className={({ isActive }) =>
            `nav-item ${
              isActive ? "active font-bold text-[#0B213A]" : "text-white"
            }`
          }
        >
          All Posts
        </NavLink>
      </li>
      {role === "user" && !roleLoading && (
        <li>
          <NavLink
            to={"/membership"}
            className={({ isActive }) =>
              `nav-item ${
                isActive ? "active font-bold text-[#0B213A]" : "text-white"
              }`
            }
          >
            Membership
          </NavLink>
        </li>
      )}

      <li>
        <NavLink
          to={"/resources"}
          className={({ isActive }) =>
            `nav-item ${
              isActive ? "active font-bold text-[#0B213A]" : "text-white"
            }`
          }
        >
          Resources
        </NavLink>
      </li>
      <li>
        <NavLink
          to={"/privacy"}
          className={({ isActive }) =>
            `nav-item ${
              isActive ? "active font-bold text-[#0B213A]" : "text-white"
            }`
          }
        >
          Privacy
        </NavLink>
      </li>
      <li>
        <NavLink
          to={"/terms"}
          className={({ isActive }) =>
            `nav-item ${
              isActive ? "active font-bold text-[#0B213A]" : "text-white"
            }`
          }
        >
          Terms
        </NavLink>
      </li>
      <li>
        <NavLink
          to={"/contact-us"}
          className={({ isActive }) =>
            `nav-item ${
              isActive ? "active font-bold text-[#0B213A]" : "text-white"
            }`
          }
        >
          Contact Us
        </NavLink>
      </li>

      {/* if user is logged in this route will show */}

      {user?.email && (
        <li>
          <NavLink
            to={"/dashboard"}
            className={({ isActive }) =>
              `nav-item ${
                isActive ? "active font-bold text-[#0B213A]" : "text-white"
              }`
            }
          >
            DashBoard
          </NavLink>
        </li>
      )}
    </>
  );
  return (
    <div className="navbar max-w-10/12 mx-auto px-0">
      <div className="navbar-start">
        <div className="dropdown">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost lg:hidden px-0"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />{" "}
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-[#0B213A] rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            {navItems}
          </ul>
        </div>
        <div to={"/"} className="btn btn-ghost px-0 text-xl">
          <CodeStackLogo></CodeStackLogo>
        </div>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{navItems}</ul>
      </div>
      <div className="navbar-end gap-3">
        {/* dark theme */}
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
        {/* notification icon */}
        <div className="relative">
          <IoNotificationsCircleSharp size={35} />
          <p className="absolute -top-3 text-white font-bold">
            {announcements ? announcements.length : 0}
          </p>
        </div>

        {loading ? (
          <span className="loading loading-spinner loading-xl"></span>
        ) : user ? (
          <>
            {/* toggle block onclick show and hide */}
            <div className="relative" ref={dropDownRef}>
              <div
                onClick={() => setToggle(!toggle)}
                className="avatar cursor-pointer"
                title={user?.displayName}
              >
                <div className="ring-primary ring-offset-base-100 w-8 rounded-full ring-2 ring-offset-2">
                  <img src={user?.photoURL} />
                </div>
              </div>
              {toggle && (
                <div className="bg-[#0B203A] absolute rounded-md -ml-24 top-0 mt-12 text-white px-5 py-2 flex flex-col z-[1000]">
                  <h2 className="text-nowrap">User: {user?.displayName}</h2>
                  <Link to={"/dashboard"} className="hover:bg-[#0d233d71]">
                    Dashboard
                  </Link>
                  <button
                    className="cursor-pointer text-start hover:bg-[#0d233d71]"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </>
        ) : (
          <>
            <Link
              to={"/login"}
              className="btn btn-primary btn-outline rounded-full"
            >
              Join US
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default NavBar;
