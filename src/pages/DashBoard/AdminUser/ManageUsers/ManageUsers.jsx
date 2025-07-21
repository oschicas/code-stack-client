import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import useAuth from "../../../../hooks/useAuth";
import { FaSearch } from "react-icons/fa";
import { toast } from "react-toastify";
import { useDebounce } from "use-debounce";

const ManageUsers = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [search, setSearch] = useState("");
  const queryClient = useQueryClient();
  const [debouncedSearch] = useDebounce(search, 500);

  // fetch users by search
  const { data: users = [], isLoading } = useQuery({
    queryKey: ["users", debouncedSearch],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users?search=${search}`);
      return res.data;
    },
  });

  // patch users (admin <> user)
  const { mutateAsync: toggleAdmin, isPending } = useMutation({
    mutationFn: async (user) => {
      const res = await axiosSecure.patch(`/users/${user?._id}/toggle-admin`);
      return res.data;
    },
    onSuccess: () => {
      toast.success("User role updated");
      queryClient.invalidateQueries({ queryKey: ["users", search] });
    },
    onError: () => {
      toast.error("User role failed to update");
    },
  });

  // loading
  if (isLoading) {
    return (
      <div className="text-center py-4">
        <span className="loading loading-spinner text-primary"></span>
      </div>
    );
  }

  if (users?.length === 0) {
    return <p className="text-center py-4 text-gray-500">No users found.</p>;
  }
  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <h2 className="text-2xl font-bold mb-4">Manage Users</h2>

      {/* Search */}
      <label className="input border-0">
        <FaSearch size={20} className="text-gray-400"></FaSearch>
        <input
          type="search"
          placeholder="Search by user name or email"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </label>

      <div className="overflow-x-auto bg-base-100 shadow-md rounded-xl">
        <table className="table table-zebra">
          <thead>
            <tr>
              <th>#</th>
              <th>User Name</th>
              <th>Email</th>
              <th>Subscription</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users?.map((user, idx) => (
              <tr key={user._id}>
                <td>{idx + 1}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  <span
                    className={`badge ${
                      user.badge === "gold"
                        ? "badge-warning"
                        : "badge-secondary"
                    }`}
                  >
                    {user.badge || "bronze"}
                  </span>
                </td>
                <td>
                  <button
                    className={`btn btn-xs ${
                      user.role === "admin" ? "btn-error" : "btn-primary"
                    }`}
                    onClick={() => toggleAdmin(user)}
                    disabled={isPending}
                  >
                    {user.role === "admin" ? "Remove Admin" : "Make Admin"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUsers;
