import React, { useEffect, useRef, useState } from "react";
import { Link, NavLink } from "react-router";
import { Bounce, toast } from "react-toastify";
import useAuth from "../hooks/useAuth";
import CodeStackLogo from "./CodeStackLogo";
import { IoNotificationsCircleSharp } from "react-icons/io5";

const NavBar = () => {
  const { user, loading, logOut } = useAuth();
  const [toggle, setToggle] = useState(false);
  const dropDownRef = useRef(null);

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
            `nav-item ${isActive ? "active font-bold text-[#0D233C]" : ""}`
          }
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to={"/membership"}
          className={({ isActive }) =>
            `nav-item ${isActive ? "active font-bold text-[#0D233C]" : ""}`
          }
        >
          Membership
        </NavLink>
      </li>
      {/* if user is logged in this route will show */}

      {user?.email && (
        <li>
          <NavLink
            to={"/dashboard"}
            className={({ isActive }) =>
              `nav-item ${isActive ? "active font-bold text-[#0D233C]" : ""}`
            }
          >
            DashBoard
          </NavLink>
        </li>
      )}
    </>
  );
  return (
    <div className="navbar w-11/12 mx-auto">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
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
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
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
        <div className="relative">
          <IoNotificationsCircleSharp size={35} />
          <p className="absolute -top-3">0</p>
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
                <div className="bg-[#0B203A] absolute -ml-24 top-0 mt-12 z-50 text-white px-5 py-2 flex flex-col">
                  <h2 className="text-nowrap">User: {user?.displayName}</h2>
                  <Link to={'/dashboard'}>Dashboard</Link>
                  <button
                    className="cursor-pointer text-start"
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
