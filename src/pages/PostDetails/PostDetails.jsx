import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router";
import useAxios from "../../hooks/useAxios";
import { FacebookShareButton } from "react-share";
import {
  FaArrowLeft,
  FaFacebook,
  FaThumbsDown,
  FaThumbsUp,
} from "react-icons/fa";
import useAuth from "../../hooks/useAuth";
import { toast } from "react-toastify";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import PostCard from "../Home/shared/PostCard";

const PostDetails = () => {
  const { id } = useParams();
  const axiosInstance = useAxios();
  const axiosSecure = useAxiosSecure();
  const shareUrl = `${window.location.origin}/post-details/${id}`;
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [commentText, setCommentText] = useState("");
  const navigate = useNavigate();
  const currentPage = 1;
  const postPerPage = 8;

  // fetch post details
  const {
    data: post = {},
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["post", id],
    queryFn: async () => {
      const res = await axiosInstance(`/posts/${id}`);
      return res.data;
    },
  });

  //   handle upvote/downvote
  const voteMutation = useMutation({
    mutationFn: async (voteType) => {
      const res = await axiosSecure.patch(`/posts/vote/${id}`, {
        voteType,
        userEmail: user?.email,
      });
      return res.data;
    },
    onSuccess: () => {
      refetch();
      queryClient.invalidateQueries({ queryKey: ["post", id] });
    },
  });

  // handle vote
  const handleVote = (voteType) => {
    if (!user?.email) {
      return toast.error(`Login required to :${voteType}`);
    }
    voteMutation.mutate(voteType);
  };

  // fetch comment
  const { data: comments = [] } = useQuery({
    queryKey: ["comment", id],
    queryFn: async () => {
      const res = await axiosInstance.get(`/comments?postId=${id}`);
      return res.data;
    },
  });

  //   add comment
  const commentMutation = useMutation({
    mutationFn: async () => {
      const payload = {
        postId: id,
        postTitle: post?.title,
        name: user?.displayName,
        email: user?.email,
        userImage: user?.photoURL,
        comment: commentText,
        createdAt: new Date().toISOString(),
      };
      const res = await axiosSecure.post("/comments", payload);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comment", id] });
      toast.success("Comment Added");
      setCommentText("");
    },
    onError: (error) => {
      if (error?.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Failed to comment");
      }
    },
  });

  //   comment submit
  const handleCommentSubmit = () => {
    if (!user) {
      return toast.error("Log in to submit comment");
    }
    if (!commentText.trim()) {
      return toast.error("Write something to comment");
    }
    commentMutation.mutate();
  };

  // fetch posts
  const { data: posts = [], isLoading: postLoading } = useQuery({
    queryKey: ["popular-posts"],
    queryFn: async () => {
      const res = await axiosInstance.get(
        `/posts/home/popular?page=${currentPage}&limit=${postPerPage}`
      );
      return res.data;
    },
  });

  console.log("posts are: ", post);

  if (isLoading) {
    return (
      <div className="flex justify-center mt-10 py-24">
        <span className="loading loading-spinner text-primary"></span>
      </div>
    );
  }

  return (
    <div className="max-w-10/12 mx-auto space-y-6 pt-24 pb-8">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-3">
          {/* Go Back Button */}
          <div className="mb-4">
            <button
              onClick={() => navigate(-1)} // go one step back
              className="btn btn-sm btn-outline flex items-center gap-2"
            >
              <FaArrowLeft /> Go Back
            </button>
          </div>
          <div className="bg-base-100 shadow-md p-6 rounded-lg">
            <div className="flex items-center gap-4 mb-4">
              <img
                src={post.authorImage}
                className="w-12 h-12 rounded-full"
                alt="Author"
              />
              <div>
                <p className="font-semibold">{post.authorName}</p>
                <p className="text-sm text-gray-500">
                  {new Date(post.createdAt).toLocaleString()}
                </p>
              </div>
            </div>

            <h2 className="text-2xl font-bold">{post.title}</h2>
            <p className="mt-3 text-justify">{post.description}</p>
            <p className="mt-2 text-sm text-gray-600">
              Tag: <span className="badge badge-outline">{post.tag}</span>
            </p>

            <div className="flex flex-wrap gap-4 mt-5">
              <button
                onClick={() => handleVote("upvote")}
                className="btn btn-sm btn-outline flex items-center gap-1"
              >
                <FaThumbsUp /> {post.upVote || 0}
              </button>
              <button
                onClick={() => handleVote("downvote")}
                className="btn btn-sm btn-outline flex items-center gap-1"
              >
                <FaThumbsDown /> {post.downVote || 0}
              </button>

              {user ? (
                <FacebookShareButton url={shareUrl} quote={post.title}>
                  <span className="btn btn-sm btn-outline flex items-center gap-2">
                    <FaFacebook /> Share
                  </span>
                </FacebookShareButton>
              ) : (
                <button
                  className="btn btn-sm btn-outline flex items-center gap-2"
                  onClick={() => toast.error("Please login to share this post")}
                >
                  <FaFacebook /> Share
                </button>
              )}
            </div>
          </div>

          {/* Comments Section */}
          <div className="bg-base-100 shadow-md p-6 rounded-lg">
            <h3 className="text-xl font-bold mb-3">Comments</h3>

            {/* Comment input */}
            {user ? (
              <div className="flex flex-col gap-2 mb-4">
                <textarea
                  rows={5}
                  type="text"
                  className="textarea w-full focus:outline-0"
                  placeholder="Write a comment..."
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                ></textarea>
                <div className="text-end">
                  <button
                    onClick={handleCommentSubmit}
                    className="btn btn-primary"
                    disabled={commentMutation?.isPending}
                  >
                    Comment
                  </button>
                </div>
              </div>
            ) : (
              <p className="text-sm text-gray-500">Login to comment.</p>
            )}

            {/* Comment List */}
            <div className="space-y-3 mt-2">
              <p>Comment Lists</p>
              {comments.length === 0 ? (
                <p className="text-gray-500">No comments yet.</p>
              ) : (
                comments.map((c) => (
                  <div key={c?._id} className="bg-base-200 p-3 rounded-md">
                    <div className="flex items-center gap-2 mb-1">
                      <img src={c.userImage} className="w-8 h-8 rounded-full" />
                      <div>
                        <p className="text-sm font-medium">{c?.user}</p>
                        <p className="text-xs text-gray-400">
                          {new Date(c?.createdAt).toLocaleString()}
                        </p>
                      </div>
                    </div>
                    <p className="text-sm">{c?.comment}</p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
        {postLoading ? (
          <div className="flex justify-center mt-10 py-24">
            <span className="loading loading-spinner text-primary"></span>
          </div>
        ) : (
          <aside className="space-y-5">
            <h2 className="text-2xl font-bold">
              Popular Posts: ({posts?.posts.length})
            </h2>
            <div className="max-h-[100vh] overflow-y-auto space-y-5">
              {posts?.posts.map((post) => (
                <PostCard post={post}></PostCard>
              ))}
            </div>
          </aside>
        )}
      </div>
    </div>
  );
};

export default PostDetails;
