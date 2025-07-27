import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router";
import { Bounce, toast } from "react-toastify";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import useAuth from "../../../hooks/useAuth";
import SocialLogin from "../SocialLogin/SocialLogin";
import useAxios from "../../../hooks/useAxios";

const Login = () => {
  const { LogIn } = useAuth();
  const [show, setShow] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const axiosInstance = useAxios();

  const from = location?.state?.from || "/";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    LogIn(data.email, data.password)
      .then(async(result) => {
        const currentUser = result?.user;
        
        // get token from backend
        const res = await axiosInstance.post('/jwt', {
          email: currentUser?.email
        });

        const token = res.data.token;

        // save token to local storage
        localStorage.setItem('access-token', token);


        toast.success(
          `successfully logged in user: ${currentUser.displayName}`,
          {
            position: "top-right",
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
    
      <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
        <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
          <h2 className="text-3xl font-bold">Login with CodeStack</h2>
          <fieldset className="fieldset">
            <label className="label">Email</label>
            <input
              type="email"
              {...register("email", { required: true })}
              className="input w-full"
              placeholder="Email"
            />
            {errors.email?.type === "required" && (
              <p className="text-red-500">Please Enter email address</p>
            )}

            
            {/* password field */}
          <label className="label">Password</label>
          <div className="relative">
            <input
              type={show ? "text" : "password"}
              {...register("password", {
                required: true,
                minLength: 6,
                maxLength: 20,
                pattern: /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z])/,
              })}
              className="input w-full"
              placeholder="Password"
            />
            <button
              type="button"
              onClick={() => setShow(!show)}
              className="z-40 absolute top-2 right-4 cursor-pointer"
            >
              {show ? (
                <FaEye size={20}></FaEye>
              ) : (
                <FaEyeSlash size={20}></FaEyeSlash>
              )}
            </button>
          </div>
          {errors.password?.type === "required" && (
              <p className="text-red-500">Password is Required</p>
            )}
            {errors.password?.type === "minLength" && (
              <p className="text-red-500">
                Password must be 6 character long or greater than 6 character
              </p>
            )}
            {errors.password?.type === "maxLength" && (
              <p className="text-red-500">
                Password must be 20 character long or less than 20 character
              </p>
            )}
            
            <div>
              <a className="link link-hover">Forgot password?</a>
            </div>
            <button className="btn btn-primary mt-4">Login</button>
          </fieldset>
          <p>
            Have an account{" "}
            <Link
              className="font-bold hover:text-red-500 hover:underline"
              to={"/register"}
              state={{from}}
            >
              Register
            </Link>
          </p>
        </form>
        <SocialLogin from={from}></SocialLogin>
      </div>
  );
};

export default Login;
