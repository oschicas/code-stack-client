import React from "react";
import useAxios from "../../../hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import PostCard from "./PostCard";
import { BsPostcardHeartFill } from "react-icons/bs";

const PopularPosts = () => {
  const axiosInstance = useAxios();

  const currentPage = 1;
  const postPerPage = 4;

  const { data: posts = [], isLoading } = useQuery({
    queryKey: ["popular-posts"],
    queryFn: async () => {
      const res = await axiosInstance.get(
        `/posts/home/popular?page=${currentPage}&limit=${postPerPage}`
      );
      return res.data;
    },
  });

  if (isLoading) {
    return (
      <div className="flex justify-center mt-10 py-24">
        <span className="loading loading-spinner text-primary"></span>
      </div>
    );
  }

  return (
    <div className="w-10/12 mx-auto space-y-5">
      <h2 className="text-2xl font-bold flex items-center gap-2">
        <span className="text-primary">
          <BsPostcardHeartFill size={25} />
        </span>
        Popular Posts
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {posts?.posts.map((post) => (
          <PostCard post={post}></PostCard>
        ))}
      </div>
    </div>
  );
};

export default PopularPosts;
