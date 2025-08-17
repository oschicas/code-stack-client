import React from "react";
import { Bounce, toast } from "react-toastify";
import { useNavigate } from "react-router";
import useAuth from "../../../hooks/useAuth";
import { FaGoogle } from "react-icons/fa";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAxios from "../../../hooks/useAxios";

const SocialLogin = ({ from }) => {
  const { signInWithGoogle } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const axiosInstance = useAxios();

  const handleGoogleSignIn = () => {
    signInWithGoogle()
      .then(async (result) => {
        const currentUser = result.user;

        // get token from backend
        const res = await axiosInstance.post('/jwt', {
          email: currentUser?.email
        });

        const token = res.data.token;

        // save to local storage
        localStorage.setItem('access-token', token)

        // give userinfo in database
        const userInfo = {
          name: currentUser.displayName,
          email: currentUser.email,
          image: currentUser.photoURL,
          badge: "bronze",
          role: "user", //default role
          created_at: new Date().toISOString(),
        };

        try {
          const userRes = await axiosSecure.post("/users", userInfo);
          console.log(userRes.data);
        } catch (error) {
          if(error.message === 'Request failed with status code 409'){
            navigate(from)
          }
        }

        toast.success(
          `Successfully Logged in User:${currentUser.displayName}`,
          {
            position: "bottom-left",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
          }
        );
        navigate(from);
      })
      .catch((error) => {
        toast.error(`${error.message}`, {
          position: "bottom-left",
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
