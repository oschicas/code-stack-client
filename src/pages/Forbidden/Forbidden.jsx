import React from "react";
import { Link } from "react-router";
import { FaLock } from "react-icons/fa";

const Forbidden = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 text-center bg-gray-100 dark:bg-gray-900">
      <div className="max-w-md w-full space-y-6 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
        <div className="flex justify-center">
          <div className="text-primary text-7xl">
            <FaLock />
          </div>
        </div>

        <h1 className="text-6xl font-bold text-red-500">403</h1>
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">
          Forbidden Access
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          You don’t have permission to access this page.
        </p>

        <Link
          to="/"
          className="inline-block mt-4 px-6 py-3 bg-primary text-white font-semibold rounded-lg shadow hover:bg-primary/90 transition duration-300"
        >
          ⬅ Go to Home
        </Link>
      </div>
    </div>
  );
};

export default Forbidden;
