import { useQuery } from "@tanstack/react-query";
import React from "react";
import { FaBullhorn } from "react-icons/fa";
import { MdAccessTime } from "react-icons/md";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const Announcements = () => {
  const axiosSecure = useAxiosSecure();

  const { data: announcements = [], isLoading } = useQuery({
    queryKey: ["announcements"],
    queryFn: async () => {
      const res = await axiosSecure.get("/announcements");
      return res.data;
    },
  });

  if (isLoading || announcements.length === 0) {
    return null; // 🔒 Hidden if no announcement
  }

  return (
    <section className="max-w-10/12 mx-auto p-6 mt-10">
      <div className="flex items-center gap-2 mb-6">
        <FaBullhorn className="text-2xl text-primary" />
        <h2 className="text-2xl font-bold">Latest Announcements</h2>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {announcements.map((announcement) => (
          <div
            key={announcement._id}
            className="bg-base-100 p-6 shadow-md rounded-xl flex flex-col sm:flex-row items-start gap-5"
          >
            <img
              src={announcement.authorImage}
              alt="author"
              className="w-24 h-24 rounded-full object-cover border-4 border-primary"
            />
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold">{announcement.title}</h3>
                <p className="text-sm flex items-center gap-1 text-gray-500">
                  <MdAccessTime />
                  {new Date(announcement.createdAt).toLocaleDateString()}
                </p>
              </div>
              <p className="text-sm text-gray-600 font-medium mt-1">
                by {announcement.authorName}
              </p>
              <p className="mt-2 text-gray-700">{announcement.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Announcements;
