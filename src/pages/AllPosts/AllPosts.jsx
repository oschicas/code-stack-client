import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useRef, useState } from "react";
import { FaComments, FaThumbsDown, FaThumbsUp } from "react-icons/fa";
import { useNavigate } from "react-router";
import useAxios from "../../hooks/useAxios";

const AllPosts = () => {
  const axiosInstance = useAxios();
  const [currentPage, setCurrentPage] = useState(1);
  const [sortByPopularity, setSortByPopularity] = useState(false);
  const postPerPage = 8;
  const topRef = useRef(null);
  const navigate = useNavigate();

  // Fetch posts data
  const { data, isLoading, isError } = useQuery({
    queryKey: ["all-posts", currentPage, sortByPopularity],
    queryFn: async () => {
      const endpoint = sortByPopularity ? "/posts/home/popular" : "/posts/home";
      const res = await axiosInstance.get(
        `${endpoint}?page=${currentPage}&limit=${postPerPage}`
      );
      return res.data;
    },
    keepPreviousData: true,
    staleTime: 1000 * 60 * 5 // 5 minutes cache
  });

  const totalPages = Math.ceil((data?.total || 0) / postPerPage);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // Scroll to top on page change
  useEffect(() => {
    if (topRef.current) {
      topRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [currentPage]);

  const toggleSort = () => {
    setSortByPopularity(prev => !prev);
    setCurrentPage(1);
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[300px]">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  // Error state
  if (isError) {
    return (
      <div className="text-center py-10">
        <div className="alert alert-error max-w-md mx-auto">
          <div>
            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>Failed to load posts. Please try again.</span>
          </div>
        </div>
        <button 
          className="btn btn-primary mt-4"
          onClick={() => window.location.reload()}
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="w-10/12 max-w-7xl mx-auto pb-8 pt-24" ref={topRef}>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">All Posts</h1>
        <button 
          className={`btn ${sortByPopularity ? 'btn-primary' : 'btn-outline'}`}
          onClick={toggleSort}
        >
          {sortByPopularity ? 'Newest First' : 'Most Popular'}
        </button>
      </div>

      {/* Posts Grid */}
      {data?.posts?.length === 0 ? (
        <div className="text-center py-16">
          <div className="max-w-md mx-auto">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="mt-2 text-lg font-medium text-gray-900 dark:text-white">No posts available</h3>
            <p className="mt-1 text-sm text-gray-500">There are currently no posts to display.</p>
          </div>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {data?.posts?.map((post) => (
              <div
                key={post._id}
                className="bg-white dark:bg-[#0B213A] rounded-lg shadow hover:shadow-lg transition-shadow duration-300 overflow-hidden cursor-pointer"
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
                      <time 
                        dateTime={post.createdAt}
                        className="text-xs text-gray-500"
                      >
                        {new Date(post.createdAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric'
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
            ))}
          </div>

          {/* Pagination */}
          {data?.posts?.length > 0 && (
            <div className="flex justify-center items-center gap-2 mt-10">
              <button
                className="btn btn-outline flex items-center gap-1"
                disabled={currentPage === 1}
                onClick={() => handlePageChange(currentPage - 1)}
              >
                <span className="hidden sm:inline">Previous</span>
              </button>

              {[...Array(totalPages).keys()].map((page) => (
                <button
                  key={page}
                  className={`btn ${currentPage === page + 1 ? 'btn-primary' : 'btn-outline'}`}
                  onClick={() => handlePageChange(page + 1)}
                >
                  {page + 1}
                </button>
              ))}

              <button
                className="btn btn-outline flex items-center gap-1"
                disabled={currentPage === totalPages}
                onClick={() => handlePageChange(currentPage + 1)}
              >
                <span className="hidden sm:inline">Next</span>
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default AllPosts;