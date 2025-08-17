import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import bannerImg from "../../../assets/banner_image/banner_image.png";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import useAxios from "../../../hooks/useAxios";

const Banner = ({ setSearchedTag }) => {
  const [isFocused, setIsFocused] = useState(false);
  const [searchedText, setSearchedText] = useState("");
  const axiosInstance = useAxios();
  const queryClient = useQueryClient();

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchedTag(searchedText.trim());
    if (!searchedText.trim()) {
      return;
    }
    searchedMutation(searchedText.trim());
  };
  // get searched tags
  const { data: tags = [], refetch } = useQuery({
    queryKey: ["searched-tag", searchedText],
    queryFn: async () => {
      const res = await axiosInstance.get("/searched-tag-get");
      return res.data;
    },
  });

  console.log("all tags that were searched", tags);

  // post searched tag
  const { mutateAsync: searchedMutation } = useMutation({
    mutationKey: ["searched", handleSearch],
    mutationFn: async (searched) => {
      const searchedInfo = {
        tag: searched,
        createdAt: new Date().toISOString(),
      };
      const res = await axiosInstance.post("/searched-tag-save", searchedInfo);
      return res.data;
    },
    onSuccess: () => {
      // saved to database
      queryClient.invalidateQueries({ queryKey: ["searched-tag"] });
      refetch();
    },
  });

  return (
    <div
      className="relative bg-cover bg-center min-h-[70vh] md:min-h-screen"
      style={{
        backgroundImage: `url(${bannerImg})`,
      }}
    >
      <div
        className={`absolute inset-0  ${
          isFocused ? "bg-gray-900/60" : "bg-gray-900/50"
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
            <button
              type="submit"
              className="absolute z-10 top-2 right-3 btn btn-primary rounded-full"
            >
              <FaSearch /> Search
            </button>
          </form>

          {/* Popular Keywords */}
          <div className="mt-2 space-x-1 text-lg">
            <span className="font-semibold">Popular Topics:</span>{" "}
            {tags?.slice(0, 3).map((tag, index) => (
              <span onClick={() => setSearchedTag(tag?.tag)} key={index} className="link link-hover text-gray-200 hover:text-white">
                {tag?.tag},
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
