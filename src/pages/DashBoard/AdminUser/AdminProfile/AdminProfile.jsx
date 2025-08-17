import React, { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import useAuth from "../../../../hooks/useAuth";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import {
  PieChart,
  Pie,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { FaEdit, FaRegCommentDots, FaRegUser } from "react-icons/fa";
import { MdPostAdd } from "react-icons/md";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28"];

const AdminProfile = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  // Separate form instances for profile and tag forms
  const {
    register: registerProfile,
    handleSubmit: handleProfileSubmit,
    reset: resetProfile,
  } = useForm();

  const {
    register: registerTag,
    handleSubmit: handleTagSubmit,
    reset: resetTag,
  } = useForm();

  const [isEditing, setIsEditing] = useState(false);

  // fetch admin and site stats
  const { data, refetch } = useQuery({
    queryKey: ["admin", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const [adminInfoRes, countRes] = await Promise.all([
        axiosSecure.get(`/users/${user?.email}`),
        axiosSecure.get(`/site-stats`),
      ]);
      return {
        adminInfo: adminInfoRes.data,
        postsCount: countRes.data.postsCount,
        commentsCount: countRes.data.commentsCount,
        usersCount: countRes.data.usersCount,
      };
    },
  });

  const chartData = [
    { name: "Posts", value: data?.postsCount || 0 },
    { name: "Comments", value: data?.commentsCount || 0 },
    { name: "Users", value: data?.usersCount || 0 },
  ];

  // Mutation to update admin info (name, phone, address, aboutMe)
  const { mutateAsync: updateInfo, isLoading: isUpdating } = useMutation({
    mutationFn: async (formData) => {
      const res = await axiosSecure.patch(`/users/${user?.email}`, formData);
      return res.data;
    },
    onSuccess: () => {
      toast.success("Profile updated successfully!");
      refetch();
      resetProfile();
      queryClient.invalidateQueries({ queryKey: ["admin", user?.email] });
      setIsEditing(false);
    },
    onError: () => toast.error("Failed to update profile"),
  });

  const onSubmitProfile = async (formData) => {
    await updateInfo(formData);
  };

  // Mutation to add a new tag
  const { mutateAsync: addTag, isLoading: isAddingTag } = useMutation({
    mutationKey: ["add-tag", user?.email],
    mutationFn: async (newTag) => {
      const tag = {
        tag: newTag.tag.trim().toLowerCase(),
        addedBy: user?.email,
        createdAt: new Date().toISOString(),
      };
      const res = await axiosSecure.post("/tags", tag);
      return res.data;
    },
    onSuccess: () => {
      toast.success("Successfully added a tag");
      resetTag();
    },
    onError: (err) => {
      if (err?.response?.status === 409) {
        toast.warning("⚠️ This tag already exists!");
      } else {
        toast.error("❌ Failed to add tag");
      }
    },
  });

  const onSubmitTag = (newTag) => {
    addTag(newTag);
  };

  return (
    <div className="w-full mx-auto space-y-5">
      {/* Admin Info */}
      <div className="flex flex-col md:flex-row items-center gap-6 bg-base-100 p-6 shadow-lg rounded-2xl">
        <img
          src={data?.adminInfo?.image || user?.photoURL}
          alt="Admin"
          className="w-32 h-32 rounded-full object-cover border-4 border-primary shadow-md"
        />
        <div>
          <h2 className="text-3xl font-bold mb-1">{data?.adminInfo?.name}</h2>
          <p className="text-gray-600 mb-1">{data?.adminInfo?.email}</p>
          <p className="text-gray-600 capitalize mb-1">
            Role: <span className="font-semibold">{data?.adminInfo?.role}</span>
          </p>
          <p className="text-gray-600">
            Joined:{" "}
            <span className="font-semibold">
              {new Date(data?.adminInfo?.created_at).toLocaleDateString()}
            </span>
          </p>
        </div>
      </div>

      {/* About Me / Profile Edit Section */}
      <div className="bg-base-100 shadow-md rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold">Profile Info</h3>
          {!isEditing && (
            <button
              onClick={() => {
                setIsEditing(true);
                resetProfile({
                  name: data?.adminInfo?.name || "",
                  phone: data?.adminInfo?.phone || "",
                  address: data?.adminInfo?.address || "",
                  aboutMe: data?.adminInfo?.aboutMe || "",
                });
              }}
              className="btn btn-sm btn-outline btn-primary flex items-center gap-2"
            >
              <FaEdit /> Edit
            </button>
          )}
        </div>

        {isEditing ? (
          <form onSubmit={handleProfileSubmit(onSubmitProfile)} className="space-y-4">
            <div className="flex items-center gap-5 flex-wrap md:flex-nowrap">
              <input
                {...registerProfile("name")}
                type="text"
                className="input w-full focus:outline-0"
                placeholder="Enter Name"
                defaultValue={data?.adminInfo?.name}
              />
              <input
                {...registerProfile("phone")}
                type="number"
                className="input w-full focus:outline-0"
                placeholder="Enter Phone Number"
                defaultValue={data?.adminInfo?.phone}
              />
              <input
                {...registerProfile("address")}
                type="text"
                className="input w-full focus:outline-0"
                placeholder="Enter Address"
                defaultValue={data?.adminInfo?.address}
              />
            </div>
            <textarea
              {...registerProfile("aboutMe")}
              className="textarea textarea-bordered w-full"
              rows="4"
              placeholder="Write something about yourself..."
              defaultValue={data?.adminInfo?.aboutMe}
            />
            <div className="flex gap-2">
              <button
                type="submit"
                className="btn btn-primary btn-sm"
                disabled={isUpdating}
              >
                {isUpdating ? "Saving..." : "Save"}
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
          <div className="space-y-2 text-gray-700">
            <p><strong>Name:</strong> {data?.adminInfo?.name}</p>
            {data?.adminInfo?.phone && <p><strong>Phone:</strong> {data?.adminInfo?.phone}</p>}
            {data?.adminInfo?.address && <p><strong>Address:</strong> {data?.adminInfo?.address}</p>}
            <p><strong>About Me:</strong> {data?.adminInfo?.aboutMe || "No information available."}</p>
          </div>
        )}
      </div>

      {/* Tag Add Form */}
      <div className="bg-base-100 p-6 shadow-lg rounded-2xl max-w-lg mx-auto">
        <h3 className="text-xl font-semibold mb-4 text-center">Add New Tag</h3>
        <form
          className="space-y-3"
          onSubmit={handleTagSubmit(onSubmitTag)}
        >
          <input
            type="text"
            placeholder="Enter Tag and don't give space"
            className="input focus:outline-0 w-full"
            {...registerTag("tag", { required: true })}
          />
          <button type="submit" className="btn btn-primary" disabled={isAddingTag}>
            {isAddingTag ? "Adding Tag" : "Add Tag"}
          </button>
        </form>
      </div>

      {/* Site Stats + Chart */}
      <div className="grid md:grid-cols-2 gap-8">
        {/* Stats */}
        <div className="bg-base-100 p-6 shadow-lg rounded-2xl space-y-4">
          <h3 className="text-2xl font-semibold text-center mb-4">
            Site Overview
          </h3>
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3 text-lg bg-base-100 p-6 shadow-lg rounded-2xl">
              <MdPostAdd size={50} className="text-2xl text-blue-600" />
              Total Posts:{" "}
              <span className="font-bold text-gray-800 ml-auto">
                {data?.postsCount || 0}
              </span>
            </div>
            <div className="flex items-center gap-3 text-lg bg-base-100 p-6 shadow-lg rounded-2xl">
              <FaRegCommentDots size={50} className="text-xl text-green-600" />
              Total Comments:{" "}
              <span className="font-bold text-gray-800 ml-auto">
                {data?.commentsCount || 0}
              </span>
            </div>
            <div className="flex items-center gap-3 text-lg bg-base-100 p-6 shadow-lg rounded-2xl">
              <FaRegUser size={50} className="text-xl text-yellow-600" />
              Total Users:{" "}
              <span className="font-bold text-gray-800 ml-auto">
                {data?.usersCount || 0}
              </span>
            </div>
          </div>
        </div>

        {/* Pie Chart */}
        <div className="bg-base-100 p-6 shadow-lg rounded-2xl">
          <h3 className="text-2xl font-semibold text-center mb-4">
            Distribution Chart
          </h3>
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                outerRadius={90}
                innerRadius={45}
                fill="#8884d8"
                dataKey="value"
                label={({ name, value }) => `${name}: ${value}`}
                labelLine={true}
              >
                {chartData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend verticalAlign="bottom" height={36} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;