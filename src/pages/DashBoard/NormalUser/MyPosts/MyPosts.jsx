import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";
import useAuth from "../../../../hooks/useAuth";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { FaComments, FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";

const MyPosts = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  // get posts from api
  const {
    data: posts = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["my-posts", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/posts?email=${user?.email}`);
      return res.data;
    },
  });

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
  return (
    <div className="max-w-5xl mx-auto p-4">
      <h2 className="text-3xl font-bold mb-6 text-center">My Posts</h2>

      {posts.length === 0 ? (
        <div className="bg-base-100 p-6 rounded-lg shadow text-center text-gray-500">
          You haven’t posted anything yet.
        </div>
      ) : (
        <div className="overflow-x-auto bg-base-100 shadow rounded-lg">
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
                      {post.upVote || 0} 👍 / {post.downVote || 0} 👎
                    </span>
                  </td>
                  <td>
                    <button className="btn btn-sm btn-outline flex items-center gap-1 text-blue-600 hover:text-white hover:bg-blue-500">
                      <FaComments /> Comment
                    </button>
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
      )}
    </div>
  );
};

export default MyPosts;
