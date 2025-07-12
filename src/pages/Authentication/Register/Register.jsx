import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router";
import SocialLogin from "../SocialLogin/SocialLogin";
import { Bounce, toast } from "react-toastify";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import useAuth from "../../../hooks/useAuth";
import axios from "axios";
// import axios from "axios";
// import useAxios from "../../../hooks/useAxios";
// import useAuth from "../../../hooks/useAuth";

const Register = () => {
  const { createUser, updateUserProfile, setUser, user } = useAuth();
  
  const [show, setShow] = useState(false);
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");
  //   const axiosInstance = useAxios();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location?.state?.from || "/";

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    if (!image) {
      return toast.error("Please upload profile pic");
    }

    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", "UserImage");
    formData.append("cloud_name", "dapbx8al2");

    const imageUploadUrl = 'https://api.cloudinary.com/v1_1/dapbx8al2/image/upload'
    

    const res = await axios.post(imageUploadUrl, formData);
    console.log("image upload response", res.data.url);
    const imageURL = res.data.url;

    // const imageUploadUrl = `https://api.imgbb.com/1/upload?key=${
    //   import.meta.env.VITE_Image_Upload_Key
    // }`;

    // const res = await axios.post(imageUploadUrl, formData);

    // setProfilePic(res.data.data.url);
    // const imageURL = res.data.data.url;

    // create user
    createUser(data.email, data.password)
      .then(async (result) => {
        const currentUser = result.user;

        // update userinfo in database
        // const userInfo = {
        //   email: data.email,
        //   role: "user", //default role
        //   created_at: new Date().toISOString(),
        //   last_log_in: new Date().toISOString(),
        // };

        // const userRes = await axiosInstance.post("/users", userInfo);
        // console.log(userRes.data);

        // update user profile in firebase
        updateUserProfile({ displayName: data.name, photoURL: imageURL });
        setUser({ ...user, displayName: data.name, photoURL: imageURL });
        toast.success(
          `successfully registered to user:${currentUser.displayName}`,
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
        reset();
        setPreview("");
        navigate(from);
      })
      .catch((error) => {
        console.error(error);
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

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    console.log("image file", file);

    if (file) {
      setImage(file);
      const previewUrl = URL.createObjectURL(file);
      setPreview(previewUrl);
    }
  };

  return (
    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
      <form onSubmit={handleSubmit(onSubmit)} className="card-body">
        <h1 className="text-3xl font-bold">Create an Account!</h1>
        <fieldset className="fieldset">
          {/* name field */}
          <label className="label">Name</label>
          <input
            type="text"
            {...register("name", { required: true })}
            className="input w-full"
            placeholder="Name"
          />
          {errors.name?.type === "required" && (
            <p className="text-red-500">name is required to this field</p>
          )}

          <label className="label">Profile Picture</label>
          <input
            type="file"
            onChange={handleImageChange}
            className="input w-full"
            placeholder="Your Profile Picture"
          />
          {preview && (
            <img src={preview} alt="Preview" className="w-1/3 h-auto rounded" />
          )}

          {/* email field */}
          <label className="label">Email</label>
          <input
            type="email"
            {...register("email", { required: true })}
            className="input w-full"
            placeholder="Email"
          />
          {errors.email?.type === "required" && (
            <p className="text-red-500">email is required to this field</p>
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
            <p className="text-red-500">password is required to this field</p>
          )}
          {errors.password?.type === "minLength" && (
            <p className="text-red-500">
              password is required to this field minimum 6 characters
            </p>
          )}
          {errors.password?.type === "maxLength" && (
            <p className="text-red-500">
              password is required to this field maximum 20 characters
            </p>
          )}
          {errors.password?.type === "pattern" && (
            <p className="text-red-500">
              Your password must have one (upper case, lower case, number,
              special characters)
            </p>
          )}

          <button type="submit" className="btn btn-primary mt-4">
            Register
          </button>
        </fieldset>
        <p>
          Already have an account?{" "}
          <Link
            className="hover:text-red-500 hover:underline font-bold"
            to={"/login"}
          >
            Login
          </Link>
        </p>
      </form>
      <SocialLogin></SocialLogin>
    </div>
  );
};

export default Register;
