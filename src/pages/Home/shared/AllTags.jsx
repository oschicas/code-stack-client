import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxios from "../../../hooks/useAxios";
import { IoMdPricetags } from "react-icons/io";

const AllTags = ({ setSearchedTag }) => {
  const axiosInstance = useAxios();

  const { data: tags = [], isLoading } = useQuery({
    queryKey: ["tags"],
    queryFn: async () => {
      const res = await axiosInstance.get("/tags");
      return res.data;
    },
  });

  if (isLoading) {
    return (
      <div className="flex justify-center py-10">
        <span className="loading loading-spinner text-primary"></span>
      </div>
    );
  }

  return (
    <div className="max-w-10/12 mx-auto">
      <h2 className="text-2xl font-bold flex items-center gap-2">
        <span className="text-primary">
          <IoMdPricetags size={25} />
        </span>
        Browse By Tags
      </h2>
      <div className="flex flex-wrap gap-3">
        {tags?.map((tag, index) => (
          <button
            key={index}
            onClick={() => setSearchedTag(tag?.tag)}
            className="btn btn-sm btn-outline rounded-full"
          >
            {tag?.tag}
          </button>
        ))}
        <button
          onClick={() => setSearchedTag("")}
          className="btn btn-sm btn-primary rounded-full"
        >
          Reset Tag
        </button>
      </div>
    </div>
  );
};

export default AllTags;
