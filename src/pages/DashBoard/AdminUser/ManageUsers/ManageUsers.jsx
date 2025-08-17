import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useEffect, useRef, useState } from "react";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import useAuth from "../../../../hooks/useAuth";
import { FaChevronCircleLeft, FaChevronCircleRight, FaSearch } from "react-icons/fa";
import { toast } from "react-toastify";
import { useDebounce } from "use-debounce";

const ManageUsers = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [search, setSearch] = useState("");
  const queryClient = useQueryClient();
  const [debouncedSearch] = useDebounce(search, 1000);
  const [currentPage, setCurrentPage] = useState(1);
  const topRef = useRef(null);

  const itemsPerPage = 10;

  // fetch users by search and pages
  const { data, isLoading } = useQuery({
    queryKey: ["users", debouncedSearch, currentPage],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/users?search=${search}&page=${currentPage}&limit=${itemsPerPage}`
      );
      return res.data;
    },
  });

  // users
  const users = data?.users || [];

  // users pages
  const totalUser = data?.total || 0;
  const totalPages = Math.ceil(totalUser / itemsPerPage);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // page change scroll to top smooth
  useEffect(() => {
    if (topRef.current) {
      topRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [currentPage]);

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
    <div className="w-full mx-auto space-y-5" ref={topRef}>
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
      {/* pagination feature */}
      <div className="bg-gray-100 py-4 px-2 shadow-md rounded-xl flex items-center justify-between">
        <div>
          <p>
            Showing: {currentPage}-{totalUser} of {totalPages}
          </p>
        </div>
        <div className="flex items-center gap-2">
          {/* previous button */}
          <div>
            <button
              className="btn btn-sm btn-outline btn-primary"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <FaChevronCircleLeft size={20} />
            </button>
          </div>
          {/* page numbers button */}
          <div className="space-x-2">
            {[...Array(totalPages).keys()]?.map((page) => (
              <button
                key={page}
                className={`btn ${
                  currentPage === page + 1
                    ? "btn-primary"
                    : "btn-outline btn-primary"
                }`}
                onClick={() => handlePageChange(page + 1)}
              >
                {page + 1}
              </button>
            ))}
          </div>
          {/* next button */}
          <div>
            <button
              className="btn btn-sm btn-outline btn-primary"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              <FaChevronCircleRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageUsers;
