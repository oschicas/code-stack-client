import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";

const MakeAnnouncement = () => {
  const axiosSecure = useAxiosSecure();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const [image, setImage] = useState("");
  const [imagePreview, setImagePreview] = useState("");

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    setImage(file);
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
    }
  };

  const onSubmit = async (data) => {
    if (!image) {
      return toast.warning("Please upload author image");
    }

    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", "UserImage");

    const imageUploadUrl =
      "https://api.cloudinary.com/v1_1/dapbx8al2/image/upload";

    try {
      const res = await axios.post(imageUploadUrl, formData);

      const imageUrl = res?.data?.secure_url;

      const announcementInfo = {
        authorImage: imageUrl,
        authorName: data?.authorName,
        title: data?.title,
        description: data?.description,
        createdAt: new Date().toISOString(),
      };

      const announcementRes = await axiosSecure.post(
        "/announcements",
        announcementInfo
      );

      if (announcementRes?.data?.insertedId) {
        toast.success("Announcement posted successfully");
        setImagePreview("");
        reset();
      } else {
        toast.error("❌ Failed to post");
      }
    } catch {
      toast.error("Server error");
    }
  };

  return (
    <div className="w-full mx-auto bg-base-100 shadow-xl rounded-xl p-4">
      <h2 className="text-2xl font-bold mb-6 text-center">
        Make an Announcement
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Author Image */}
        <div>
          <label className="font-medium">Author Image</label>
          <input
            type="file"
            className="input w-full focus:outline-0"
            defaultValue={imagePreview}
            onChange={(e) => handleImageChange(e)}
          />
          {imagePreview && <img className="w-16" src={imagePreview} />}
        </div>

        {/* Author Name */}
        <div>
          <label className="font-medium">Author Name</label>
          <input
            type="text"
            className="input w-full focus:outline-0"
            placeholder="Author Name"
            {...register("authorName", { required: true })}
          />
          {errors.authorName && (
            <p className="text-red-500 text-sm">Author name is required</p>
          )}
        </div>

        {/* Title */}
        <div>
          <label className="font-medium">Title</label>
          <input
            type="text"
            className="input w-full focus:outline-0"
            placeholder="Announcement Title"
            {...register("title", { required: true })}
          />
          {errors.title && (
            <p className="text-red-500 text-sm">Title is required</p>
          )}
        </div>

        {/* Description */}
        <div>
          <label className="font-medium">Description</label>
          <textarea
            rows={5}
            className="textarea focus:outline-0 w-full"
            placeholder="Write your announcement here..."
            {...register("description", { required: true })}
          ></textarea>
          {errors.description && (
            <p className="text-red-500 text-sm">Description is required</p>
          )}
        </div>

        <button type="submit" className="btn btn-primary w-full">
          Post Announcement
        </button>
      </form>
    </div>
  );
};

export default MakeAnnouncement;
