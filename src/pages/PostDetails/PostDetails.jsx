import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import { useParams } from "react-router";
import useAxios from "../../hooks/useAxios";
import { FacebookShareButton } from "react-share";
import { FaFacebook, FaThumbsDown, FaThumbsUp } from "react-icons/fa";
import useAuth from "../../hooks/useAuth";
import { toast } from "react-toastify";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const PostDetails = () => {
  const { id } = useParams();
  const axiosInstance = useAxios();
  const axiosSecure = useAxiosSecure();
  const shareUrl = `${window.location.origin}/post-details/${id}`;
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [commentText, setCommentText] = useState("");

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
      queryClient.invalidateQueries(["post", id]);
    },
  });

  // handle vote
  const handleVote = (voteType) => {
    if (!user?.email) {
      return toast.error(`Login required to :${voteType}`);
    }
    voteMutation.mutate(voteType);
  };

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
      queryClient.invalidateQueries(["comment", id]);
      toast.success("Comment Added");
      setCommentText('');
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

  if (isLoading) {
    return (
      <div className="flex justify-center mt-10">
        <span className="loading loading-spinner text-primary"></span>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6 pt-24">
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
      </div>
    </div>
  );
};

export default PostDetails;
