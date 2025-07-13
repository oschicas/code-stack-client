import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { FaEdit, FaMedal } from "react-icons/fa";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";

const MyProfile = () => {
  const { user } = useAuth(); // user.email, user.displayName, user.photoURL
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const [isEditing, setIsEditing] = useState(false);
  const { register, handleSubmit, reset } = useForm();

  // Fetch user data
  const {
    data: userData,
    isLoading,
    error,
    refetch
  } = useQuery({
    queryKey: ["user", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${user.email}`);
      return res.data;
    },
  });

  // Mutation to update About Me
  const { mutateAsync: updateAboutMe, isPending } = useMutation({
    mutationFn: async (data) => {
      const res = await axiosSecure.patch(`/users/${user.email}`, data);
      return res.data;
    },
    onSuccess: () => {
      toast.success("About Me updated successfully!");
      refetch();
      queryClient.invalidateQueries({ queryKey: ["user", user.email] });
      setIsEditing(false);
    },
    onError: () => toast.error("Failed to update About Me"),
  });

  const onSubmit = async (formData) => {
    await updateAboutMe({ aboutMe: formData.aboutMe });
    reset();
  };

  // Badge rendering function
  const renderBadge = (badge) => {
    switch (badge) {
      case "bronze":
        return (
          <span className="inline-flex items-center gap-1 badge badge-ghost text-amber-700 border-amber-500 bg-amber-100">
            <FaMedal className="text-amber-500" /> Bronze
          </span>
        );
      case "gold":
        return (
          <span className="inline-flex items-center gap-1 badge badge-ghost text-yellow-800 border-yellow-500 bg-yellow-100">
            <FaMedal className="text-yellow-500" /> Gold
          </span>
        );
      default:
        return null;
    }
  };

  if (isLoading)
    return (
      <div className="flex justify-center mt-10">
        <span className="loading loading-spinner text-primary"></span>
      </div>
    );
  if (error)
    return <p className="text-center text-red-500">Failed to load profile.</p>;

  return (
    <div className="max-w-3xl mx-auto p-4">
      <div className="bg-base-100 shadow-md rounded-lg p-6 flex flex-col md:flex-row items-center gap-6">
        <img
          src={userData?.image || user?.photoURL}
          alt="Profile"
          className="w-32 h-32 rounded-full object-cover border-4 border-primary"
        />
        <div className="text-center md:text-left">
          <h2 className="text-2xl font-bold">
            {userData?.name || user?.displayName}
          </h2>
          <p className="text-sm text-gray-500">
            {userData?.email || user?.email}
          </p>
          <div className="mt-2">{renderBadge(userData?.badge)}</div>
        </div>
      </div>

      {/* About Me Section */}
      <div className="bg-base-100 shadow-md rounded-lg p-6 mt-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold">About Me</h3>
          {!isEditing && (
            <button
              onClick={() => {
                setIsEditing(true);
                reset({ aboutMe: userData?.aboutMe || "" });
              }}
              className="btn btn-sm btn-outline flex items-center gap-2"
            >
              <FaEdit /> Edit
            </button>
          )}
        </div>

        {isEditing ? (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <textarea
              {...register("aboutMe", { required: true })}
              className="textarea textarea-bordered w-full"
              rows="4"
              placeholder="Write something about yourself..."
              defaultValue={userData?.aboutMe}
            />
            <div className="flex gap-2">
              <button
                type="submit"
                className="btn btn-primary btn-sm"
                disabled={isPending}
              >
                {isPending ? "Saving..." : "Save"}
              </button>
              <button
                type="button"
                className="btn btn-ghost btn-sm"
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <p className="text-gray-700">
            {userData?.aboutMe || "No About Me information available."}
          </p>
        )}
      </div>
    </div>
  );
};

export default MyProfile;
