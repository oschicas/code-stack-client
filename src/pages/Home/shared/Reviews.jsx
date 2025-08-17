import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { FaQuoteLeft, FaStar } from "react-icons/fa";
import useAxios from "../../../hooks/useAxios";
import { MdOutlineRateReview } from "react-icons/md";

const Reviews = () => {
  const axiosInstance = useAxios();
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axiosInstance.get(`/all-comments`);
        setComments(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to load reviews");
        setLoading(false);
        console.error("Error fetching comments:", err);
      }
    };

    fetchComments();
  }, []);

  console.log("comments", comments);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="loading loading-spinner loading-lg text-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-10 text-error">
        <p>{error}</p>
        <button
          className="btn btn-sm btn-outline mt-4"
          onClick={() => window.location.reload()}
        >
          Retry
        </button>
      </div>
    );
  }

  if (comments.length === 0) {
    return (
      <div className="text-center py-10">
        <div className="max-w-md mx-auto">
          <svg
            className="mx-auto h-12 w-12 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
            />
          </svg>
          <h3 className="mt-2 text-lg font-medium text-gray-900">
            No reviews yet
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            Be the first to share your thoughts!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-11/12 max-w-7xl mx-auto space-y-5">
      <h2 className="text-2xl font-bold flex items-center gap-2">
        <span className="text-primary">
          <MdOutlineRateReview size={25} />
        </span>{" "}
        Our Reviews
      </h2>

      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={30}
        slidesPerView={1}
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        }}
        pagination={{
          clickable: true,
          el: ".swiper-pagination",
          type: "bullets",
        }}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
        loop={comments.length > 3}
        breakpoints={{
          640: {
            slidesPerView: 1,
          },
          768: {
            slidesPerView: 2,
          },
          1024: {
            slidesPerView: 4,
          },
        }}
        className="relative"
      >
        {comments.map((comment) => (
          <SwiperSlide key={comment._id}>
            <div
              className="bg-white p-8 rounded-xl shadow-lg h-full flex flex-col border border-gray-100 hover:shadow-xl transition-shadow duration-300"
              style={{ minHeight: "400px" }}
            >
              <div className="flex items-center mb-6">
                <div className="avatar mr-4">
                  <div className="w-16 h-16 rounded-full overflow-hidden ring-2 ring-primary ring-offset-2">
                    <img
                      src={comment.userImage}
                      alt={comment.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src = "https://via.placeholder.com/150"; // Fallback image
                      }}
                    />
                  </div>
                </div>
                <div>
                  <h3 className="font-bold text-lg text-gray-900">
                    {comment.name}
                  </h3>
                </div>
              </div>

              <div className="mb-6 flex-1">
                <h4 className="font-semibold text-gray-800 mb-2 line-clamp-1">
                  {comment.postTitle}
                </h4>
                <FaQuoteLeft className="text-gray-300 text-2xl mb-3" />
                <p className="text-gray-600 line-clamp-5">{comment.comment}</p>
              </div>

              <div className="text-sm text-gray-500 mt-auto">
                {new Date(comment.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </div>
            </div>
          </SwiperSlide>
        ))}

        {/* Custom Navigation Arrows */}
        <div className="swiper-button-prev !text-primary !left-0"></div>
        <div className="swiper-button-next !text-primary !right-0"></div>

        {/* Custom Pagination */}
        <div className="swiper-pagination !relative !mt-8"></div>
      </Swiper>
    </div>
  );
};

export default Reviews;
