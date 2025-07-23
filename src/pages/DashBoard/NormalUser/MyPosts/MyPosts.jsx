import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import useAuth from "../../../../hooks/useAuth";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import {
  FaChevronLeft,
  FaChevronRight,
  FaComments,
  FaTrash,
} from "react-icons/fa";
import { toast } from "react-toastify";
import { AiOutlineDislike, AiOutlineLike } from "react-icons/ai";
import { Link } from "react-router";

const MyPosts = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const [currentPage, setCurrentPage] = useState(1);
  const postPerPage = 10;

  // get posts from api
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["my-posts", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/posts?email=${user?.email}&page=${currentPage}&limit=${postPerPage}`
      );
      return res.data;
    },
  });

  // posts
  const posts = data?.posts || [];

  // page
  const totalPosts = data?.total;
  const totalPages = Math.ceil(totalPosts / postPerPage);

  // page change
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // post delete by api
  const { mutateAsync: deletePost, isPending } = useMutation({
    mutationFn: async (postId) => {
      const res = await axiosSecure.delete(`/posts/${postId}`);
      return res.data;
    },
    onSuccess: () => {
      toast.success("Post deleted");
      refetch();
      queryClient.invalidateQueries({
        queryKey: ["my-posts", user?.email],
      });
    },
    onError: () => {
      toast.error("Failed to delete post");
    },
  });

  // post delete function
  const handleDelete = (postId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#2563eb",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        // deleteMutation.mutate(postId);
        console.log(postId);
        await deletePost(postId);
      }
    });
  };

  if (isLoading) {
    return (
      <div className="flex justify-center mt-10">
        <span className="loading loading-spinner text-primary"></span>
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="bg-base-100 p-6 rounded-lg shadow text-center text-gray-500">
        You haven’t posted anything yet.
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-4">
      <h2 className="text-3xl font-bold mb-6 text-center">My Posts</h2>

      <div className="overflow-x-auto bg-base-100 shadow rounded-lg mb-6">
        <table className="table">
          <thead className="bg-base-200 text-base">
            <tr>
              <th>No.</th>
              <th>Post Title</th>
              <th>Votes</th>
              <th>Comments</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post, index) => (
              <tr key={post._id} className="hover">
                <td>{index + 1}</td>
                <td className="font-semibold">{post.title}</td>
                <td>
                  <span className="badge badge-outline text-green-700 w-40">
                    {post.upVote || 0} <AiOutlineLike size={20} /> /{" "}
                    {post.downVote || 0} <AiOutlineDislike size={20} />
                  </span>
                </td>
                <td>
                  <Link
                    to={`/dashboard/post-commented/${post?._id}`}
                    className="btn btn-sm btn-outline flex items-center gap-1 text-blue-600 hover:text-white hover:bg-blue-500"
                  >
                    <FaComments /> Comment
                  </Link>
                </td>
                <td>
                  <button
                    onClick={() => handleDelete(post._id)}
                    className="btn btn-sm btn-error text-white flex items-center gap-1"
                    disabled={isPending}
                  >
                    {isPending ? (
                      "Deleting"
                    ) : (
                      <>
                        <FaTrash /> Delete
                      </>
                    )}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* pagination feature */}
      <div className="bg-base-100 py-4 px-3 shadow-md flex justify-between items-center">
        <div className="flex items-center gap-1">
          Showing: <p>{currentPage}-{totalPosts} of {totalPages}</p>
        </div>
        <div className="flex items-center gap-3">
          {/* left button */}
          <div className="flex items-center gap-2">
            <button
              className="btn btn-outline btn-primary btn-sm"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <FaChevronLeft />
            </button>
          </div>
          {/* page numbers */}
          <div>
            {[...Array(totalPages).keys()].map((page) => (
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
          {/* right button */}
          <div>
            <button
              className="btn btn-sm btn-outline btn-primary"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              <FaChevronRight />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyPosts;
