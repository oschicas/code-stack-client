import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useRef, useState } from "react";
import { FaComments, FaThumbsDown, FaThumbsUp } from "react-icons/fa";
import { MdArrowBackIos, MdArrowForwardIos } from "react-icons/md";
import { useNavigate } from "react-router";
import useAxios from "../../../hooks/useAxios";

const HomePosts = ({searchedTag}) => {
  const axiosInstance = useAxios();
  const [currentPage, setCurrentPage] = useState(1);
  const [sortByPopularity, setSortByPopularity] = useState(false);
  const postPerPage = 5;
  const topRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if(searchedTag){
      setCurrentPage(1);
    }
  }, [searchedTag])

  //   fetching post by normal, popular and by search
  const { data, isLoading } = useQuery({
    queryKey: ["posts", currentPage, sortByPopularity, searchedTag],
    queryFn: async () => {
      if(searchedTag){
        const res = await axiosInstance.get(`/posts/search?tag=${searchedTag}`);
        return {posts: res.data, total: res.data.length}
      }

      const route = sortByPopularity ? "popular" : "";
      const res = await axiosInstance.get(
        `/posts/home/${route}?page=${currentPage}&limit=${postPerPage}`
      );
      return res.data;
    },
  });



  console.log(data?.posts);
  console.log(data?.total);

  const totalPages = Math.ceil((data?.total || 0) / postPerPage);

  const handlePageChange = (page) => {
    console.log(page);
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  //   current page change scroll to top
  useEffect(() => {
    if (topRef.current) {
      topRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [currentPage]);

  const handleToggle = () => {
    setSortByPopularity((prv) => !prv);
    setCurrentPage(1);
  };

  //   loading
  if (isLoading) {
    return (
      <div className="flex justify-center mt-10">
        <span className="loading loading-spinner text-primary"></span>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-4 space-y-5" ref={topRef}>
      <div className="flex justify-between items-center mb-4 flex-wrap gap-2">
        <h2 className="text-2xl font-bold">All Posts</h2>
        <button className="btn btn-sm btn-outline" onClick={handleToggle}>
          {sortByPopularity ? "Sort by Newest" : "Sort by Popularity"}
        </button>
      </div>

      {/* all posts start */}
      {data?.posts?.length === 0 ? (
        <p className="text-center text-gray-500">No posts available.</p>
      ) : (
        // post card start
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {data?.posts.map((post) => (
            <div
              key={post?._id}
              className="bg-base-100 p-4 shadow rounded-lg hover:cursor-pointer hover:scale-105 hover:shadow-xl transition-all duration-500"
              onClick={() => navigate(`/post-details/${post?._id}`)}
            >
              <div className="flex items-center gap-3 mb-2">
                <img
                  src={post?.authorImage}
                  alt="Author"
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <p className="font-semibold">{post.authorName}</p>
                  <p className="text-xs text-gray-500">
                    Posted: {new Date(post?.createdAt).toLocaleString()}
                  </p>
                </div>
              </div>

              <h3 className="text-lg font-bold mb-1">{post?.title}</h3>
              <p className="text-sm text-gray-600 mb-2">
                Description:{" "}
                <span className="text-black">
                  {post?.description.slice(0, 100)}...
                </span>
              </p>
              <p className="text-sm text-gray-600 mb-2">
                Tag: <span className="badge badge-ghost">{post?.tag}</span>
              </p>

              <div className="flex gap-4 text-sm text-gray-600 mt-2">
                <span className="flex items-center gap-1">
                  <FaComments /> {post?.commentCount || 0}
                </span>
                <span className="flex items-center gap-1">
                  <FaThumbsUp /> {post?.upVote || 0}
                </span>
                <span className="flex items-center gap-1">
                  <FaThumbsDown /> {post?.downVote || 0}
                </span>
              </div>
            </div>
          ))}
        </div>
        // post card end
      )}
      {/* all posts end */}

      {/* pagination feature start */}

      <div className="flex justify-center items-center gap-2">
        {/* previous page arrow start */}
        <button
          className="btn btn-sm btn-outline flex items-center gap-1"
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
        >
          <MdArrowBackIos /> <span className="hidden sm:inline">Prev</span>
        </button>
        {/* previous page arrow end */}

        {/* page numbers start */}
        {[...Array(totalPages).keys()]?.map((page) => (
          <button
            key={page}
            className={`btn ${
              currentPage === page + 1 ? "btn-primary" : "btn-outline"
            }`}
            onClick={() => handlePageChange(page + 1)}
          >
            {page + 1}
          </button>
        ))}
        {/* page numbers end */}

        {/* next page arrow start */}
        <button
          className="btn btn-sm btn-outline flex items-center gap-1"
          disabled={currentPage === totalPages}
          onClick={() => handlePageChange(currentPage + 1)}
        >
          <span className="hidden sm:inline">Next</span> <MdArrowForwardIos />
        </button>
        {/* next page arrow end */}
      </div>
      {/* pagination feature end */}
    </div>
  );
};

export default HomePosts;
