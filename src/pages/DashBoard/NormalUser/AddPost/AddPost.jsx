import React, { useState } from "react";
import { BounceLoader } from "react-spinners";
import useAuth from "../../../../hooks/useAuth";
import { useForm } from "react-hook-form";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router";

const AddPost = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [imgPreview, setImgPreview] = useState(null);
  const [img, setImg] = useState(null);

  // react hook form
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  // fetch post count and post badge
  const {
    data: postInfo,
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["users-post-count-and-post-badge", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const [postRes, userRes] = await Promise.all([
        axiosSecure.get(`/posts/count?email=${user?.email}`),
        axiosSecure.get(`/users/${user?.email}`),
      ]);

      return {
        postCount: postRes?.data || 0,
        badge: userRes?.data?.badge || "bronze",
      };
    },
  });

  console.log('post info', postInfo);

  //   post data to database
  const { mutateAsync: updatePost, isPending } = useMutation({
    mutationKey: ["post", user?.email],
    mutationFn: async (postData) => {
      const res = await axiosSecure.post("/posts", postData);
      return res.data;
    },
    onSuccess: () => {
      toast.success("successfully saved post!");
      queryClient.invalidateQueries({ queryKey: ["post", user.email] });
      setImgPreview(null);
      setImg(null);
      refetch();
      reset();
    },
    onError: () => toast.error("Failed to save post"),
  });

  const {data: tags=[]} = useQuery({
    queryKey: ['tags'],
    enabled: !!user?.email,
    queryFn: async() => {
      const res = await axiosSecure.get('/tags');
      return res.data;
    }
  });

  console.log(tags);

  // image change
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImg(file);
      const imgPreviewURL = URL.createObjectURL(file);
      setImgPreview(imgPreviewURL);
    }
  };

  const onSubmit = async (data) => {
    if (!img) {
      return toast.error("Please upload profile pic");
    }

    // make cloudinary image upload file format
    const formData = new FormData();
    formData.append("file", img);
    formData.append("upload_preset", "UserImage");
    formData.append("cloud_name", "dapbx8al2");

    // cloudinary image upload and response
    const imageUploadUrl =
      "https://api.cloudinary.com/v1_1/dapbx8al2/image/upload";
    const res = await axios.post(imageUploadUrl, formData);
    console.log("image upload response", res.data.url);
    const imageURL = res.data.url;

    // give post data to data base
    const postData = {
      authorName: user.displayName,
      authorEmail: user.email,
      authorImage: imageURL,
      ...data,
      upVote: 0,
      downVote: 0,
      createdAt: new Date().toISOString(),
    };
    refetch();
    await updatePost(postData);
  };

  if (postInfo?.postCount >= 5 && postInfo?.badge === 'bronze') {
    return (
      <div className="max-w-md mx-auto p-6 text-center bg-base-100 shadow-md rounded-lg mt-10">
        <p className="text-lg font-medium mb-4 text-red-500">
          You have reached the post limit (5 posts). Become a member to add
          more.
        </p>
        <button
          onClick={() => navigate("/membership")}
          className="btn btn-primary"
        >
          Become a Member
        </button>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex justify-center mt-10">
        <span className="loading loading-spinner text-primary"></span>
      </div>
    );
  }

  return (
    <div className="min-w-11/12 md:max-w-3xl mx-auto p-6 bg-base-100 shadow-md rounded-lg mt-10">
      <h2 className="text-2xl font-bold mb-6 text-center">Add New Post</h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 md:grid-cols-2 gap-5"
      >
        {/* author name field */}
        <div>
          <label className="label">Name</label>
          <input
            required
            type="text"
            className="input focus:outline-0 w-full"
            readOnly
            defaultValue={user.displayName}
          />
        </div>
        {/* author email field */}
        <div>
          <label className="label">Email</label>
          <input
            required
            type="email"
            className="input focus:outline-0 w-full"
            readOnly
            defaultValue={user.email}
          />
        </div>
        {/* author image field */}
        <div>
          <label className="label">Author Image</label>
          <input
            required
            onChange={handleImageChange}
            type="file"
            className="input w-full focus:outline-0"
          />
          {imgPreview && (
            <img src={imgPreview} className="w-32" alt={imgPreview} />
          )}
        </div>
        {/* tag select field */}
        <div>
          <label className="label">Post Tag</label>
          <select
            {...register("tag", { required: true })}
            className="select focus:outline-0 w-full"
            defaultValue={"Select Tag"}
          >
            <option value="Select Tag" disabled>
              Select Tag
            </option>
            {
              tags?.map(tag => <option key={tag?._id} value={tag?.tag}>{tag?.tag}</option>)
            }
          </select>
          {errors.tag?.type === "required" && (
            <p className="text-red-500">Please Enter Tag</p>
          )}
        </div>
        {/* title field */}
        <div className="md:col-span-2">
          <label className="label">Post Title</label>
          <input
            {...register("title", { required: true })}
            type="text"
            className="input focus:outline-0 w-full"
            placeholder="Enter Post Title"
          />
          {errors.title?.type === "required" && (
            <p className="text-red-500">Please Enter Title</p>
          )}
        </div>
        {/* description field */}
        <div className="md:col-span-2">
          <label className="label">Post Description</label>
          <textarea
            rows={4}
            {...register("description", { required: true })}
            type="text"
            className="textarea focus:outline-0 w-full"
            placeholder="Enter Post Description"
          />
          {errors.description?.type === "required" && (
            <p className="text-red-500">Please Enter Description</p>
          )}
        </div>
        {/* buttons (submit, reset) */}
        <div className="space-x-5">
          <button
            type="submit"
            className="btn btn-primary mt-4"
            disabled={isPending}
          >
            {isPending ? "Submitting Post" : "Submit Post"}
          </button>
          <button
            type="button"
            onClick={() => reset()}
            className="btn btn-primary btn-outline mt-4"
          >
            Reset Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddPost;
