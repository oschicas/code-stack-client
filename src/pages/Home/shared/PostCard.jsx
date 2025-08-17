import React from "react";
import { FaComments, FaThumbsDown, FaThumbsUp } from "react-icons/fa";
import { useNavigate } from "react-router";

const PostCard = ({ post }) => {
  const navigate = useNavigate();
  return (
    <div
      key={post._id}
      className="bg-primary rounded-lg shadow hover:shadow-lg transition-shadow duration-300 overflow-hidden cursor-pointer"
      onClick={() => navigate(`/post-details/${post._id}`)}
    >
      <div className="p-5">
        <div className="flex items-center gap-3 mb-3">
          <img
            src={post.authorImage}
            alt={post.authorName}
            className="w-10 h-10 rounded-full object-cover"
          />
          <div>
            <h4 className="font-medium text-gray-900 dark:text-white">
              {post.authorName}
            </h4>
            <time dateTime={post.createdAt} className="text-xs text-gray-500">
              {new Date(post.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </time>
          </div>
        </div>

        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 line-clamp-2">
          {post.title}
        </h3>
        <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-3 mb-4">
          {post.description}
        </p>

        <div className="flex justify-between text-sm text-gray-500 border-t border-gray-200 dark:border-gray-700 pt-3">
          <span className="flex items-center gap-1">
            <FaComments className="text-blue-500" />
            <span>{post.commentCount || 0}</span>
          </span>
          <div className="flex gap-4">
            <span className="flex items-center gap-1">
              <FaThumbsUp className="text-green-500" />
              <span>{post.upVote || 0}</span>
            </span>
            <span className="flex items-center gap-1">
              <FaThumbsDown className="text-red-500" />
              <span>{post.downVote || 0}</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
