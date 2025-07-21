import { useMutation, useQuery } from "@tanstack/react-query";
import React from "react";
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
import { FaRegCommentDots } from "react-icons/fa";
import { FaRegUser } from "react-icons/fa6";
import { MdPostAdd } from "react-icons/md";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28"];

const AdminProfile = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  // fetch admin and site stats
  const { data } = useQuery({
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

  //   post tag
  const { mutateAsync: addTag, isPending: isAdding } = useMutation({
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
      reset();
    },
    onError: (err) => {
      if (err?.response?.status === 409) {
        toast.warning("⚠️ This tag already exists!");
      } else {
        toast.error("❌ Failed to add tag");
      }
    },
  });

  const onSubmit = (newTag) => {
    console.log("tag added", newTag);
    addTag(newTag);
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-10 space-y-10">
      {/* Admin Info */}
      <div className="flex flex-col md:flex-row items-center gap-6 bg-base-100 p-6 shadow-lg rounded-2xl">
        <img
          src={data?.adminInfo?.image}
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

      {/* tag add form */}
      <div className="bg-base-100 p-6 shadow-lg rounded-2xl max-w-lg mx-auto">
        <h3 className="text-xl font-semibold mb-4 text-center">Add New Tag</h3>
        <form className="space-y-3" onSubmit={handleSubmit(onSubmit)}>
          <input
            type="text"
            placeholder="Enter Tag and don't give space"
            className="input focus:outline-0 w-full"
            {...register("tag", { required: true })}
          />
          {errors.tag?.type === "required" && (
            <p className="text-red-500 font-bold">Please Add a Tag</p>
          )}
          <button type="submit" className="btn btn-primary" disabled={isAdding}>
            {isAdding ? "Adding Tag" : "Add Tag"}
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
