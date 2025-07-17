import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import bannerImg from "../../../assets/banner_image/banner_image.png";
import { toast } from "react-toastify";

const Banner = ({ setSearchedTag }) => {
  const [isFocused, setIsFocused] = useState(false);
  const [searchedText, setSearchedText] = useState("");
  
  const handleSearch = (e) => {
    e.preventDefault();
    // if (!searchedText.trim()) {
    //   return toast.error("Search field can not be empty to search");
    // }
    setSearchedTag(searchedText.trim());
  };
  return (
    <div
      className="relative bg-cover bg-center min-h-[70vh] lg:min-h-screen "
      style={{
        backgroundImage: `url(${bannerImg})`,
      }}
    >
      <div
        className={`absolute inset-0  ${
          isFocused ? "bg-black/60" : "bg-black/45"
        } flex items-center justify-center text-white px-4`}
      >
        <div className="max-w-2xl w-full text-center space-y-6">
          <h1 className="text-3xl md:text-4xl font-bold">
            Search Your Desired Post By Tag
          </h1>
          <p className="text-lg md:text-xl">
            Search here to get answers to your questions
          </p>

          {/* Search Bar */}
          <form className="relative mt-6" onSubmit={handleSearch}>
            <input
              type="search"
              placeholder="Search your desired post..."
              className="input input-bordered w-full rounded-full px-5 py-7 text-black focus:outline-0"
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              value={searchedText}
              onChange={(e) => setSearchedText(e.target.value)}
            />
            <button type="submit" className="absolute z-50 top-2 right-3 btn btn-primary rounded-full">
              <FaSearch /> Search
            </button>
          </form>

          {/* Popular Keywords */}
          <div className="text-sm mt-2">
            <span className="font-semibold">Popular:</span>{" "}
            <span className="link link-hover text-gray-200 hover:text-white">
              Code
            </span>
            ,{" "}
            <span className="link link-hover text-gray-200 hover:text-white">
              Basic
            </span>
            ,{" "}
            <span className="link link-hover text-gray-200 hover:text-white">
              Blog
            </span>
            ,{" "}
            <span className="link link-hover text-gray-200 hover:text-white">
              WordPress
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
