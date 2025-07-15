import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";
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

  // fetch post details
  const { data: post = {}, isLoading, refetch } = useQuery({
    queryKey: ["post", id],
    queryFn: async () => {
      const res = await axiosInstance(`/posts/${id}`);
      return res.data;
    },
  });

  //   handle upvote/downvote
  const voteMutation = useMutation({
    mutationFn: async(voteType) => {
        const res = await axiosSecure.patch(`/posts/vote/${id}`, {
            voteType,
            userEmail: user?.email
        });
        return res.data;
    },
    onSuccess: () => {
        refetch();
        queryClient.invalidateQueries(['post', id]);
    }
  })

  // handle vote
  const handleVote = (voteType) => {
    if (!user?.email) {
      return toast.error(`Login required to :${voteType}`);
    }
    voteMutation.mutate(voteType)
  };

  console.log(post);
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
          <FacebookShareButton url={shareUrl} quote={post.title}>
            <span className="btn btn-sm btn-outline flex items-center gap-2">
              <FaFacebook /> Share
            </span>
          </FacebookShareButton>
        </div>
      </div>
    </div>
  );
};

export default PostDetails;
