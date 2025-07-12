import React from "react";
import { Link, Outlet } from "react-router";
import logo from '../assets/logo/CodeStack Logo.png'

const AuthLayout = () => {
  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      <div className="bg-[#0e233df6] min-h-screen flex flex-col justify-center items-center text-white">
        {/* logo */}
        <Link to={'/'} className="flex flex-col justify-center items-center gap-2">
            <img className="w-24" src={logo} alt={logo} />
            <p className="font-bold">CodeStack</p>
        </Link>
        {/* content */}
        <div className="text-white text-center space-y-3">
          <h2 className="text-3xl font-bold">Welcome Back</h2>
          <p>
            To keep connected with us please login with your <br /> personal
            info
          </p>
        </div>
      </div>
      <div className="flex justify-center items-center lg:col-span-2">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default AuthLayout;
