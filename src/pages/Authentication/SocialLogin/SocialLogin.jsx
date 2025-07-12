import React from "react";
import { Bounce, toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router";
import useAuth from "../../../hooks/useAuth";
import { FaGoogle } from "react-icons/fa";

const SocialLogin = () => {
  const { signInWithGoogle } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  // const axiosInstance = useAxios();
  // console.log(location);

  const from = location?.state?.from || "/";

  const handleGoogleSignIn = () => {
    signInWithGoogle()
      .then(async (result) => {
        const currentUser = result.user;

        // update userinfo in database
        // const userInfo = {
        //   email: currentUser.email,
        //   role: "user", //default role
        //   created_at: new Date().toISOString(),
        //   last_log_in: new Date().toISOString(),
        // };

        // const res = await axiosInstance.post("/users", userInfo);
        // console.log("user update info", res.data);

        toast.success(`Logged in ${currentUser.displayName}`, {
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
        navigate(from);
      })
      .catch((error) => {
        toast.error(`${error.message}`, {
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
  return (
    <div className="text-center p-6">
      <div className="divider">OR</div>
      {/* Google */}
      <button
        onClick={handleGoogleSignIn}
        className="btn w-full bg-white text-black border-[#e5e5e5]"
      >
        <FaGoogle size={25}></FaGoogle>
        Login with Google
      </button>
    </div>
  );
};

export default SocialLogin;
