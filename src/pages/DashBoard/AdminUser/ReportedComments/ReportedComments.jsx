import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { MdDeleteForever } from "react-icons/md";
import { FaCheckCircle } from "react-icons/fa";
import { toast } from "react-toastify";

const ReportedComments = () => {
  const axiosSecure = useAxiosSecure();
  const [expandedId, setExpandedId] = useState(null);
  const queryClient = useQueryClient();

  // fetch reported comments
  const { data: reports = [], isLoading } = useQuery({
    queryKey: ["reported-comments"],
    queryFn: async () => {
      const res = await axiosSecure.get("/reported-comments");
      return res.data;
    },
  });

  // mutation delete a reported comment
  const { mutateAsync: deleteComment, isPending: isDeleting } = useMutation({
    mutationFn: async (id) => {
      const res = await axiosSecure.delete(`/comments/${id}/delete-report`);
      return res.data;
    },
    onSuccess: () => {
      toast.success("Successfully deleted");
      queryClient.invalidateQueries({ queryKey: ["reported-comments"] });
    },
    onError: () => {
      toast.error("Deletion failed");
    },
  });

  // mutation to dismiss report
  const { mutateAsync: dismissReport, isPending: isDismissing } = useMutation({
    mutationFn: async (id) => {
      const res = await axiosSecure.patch(`/comments/${id}/dismiss-report`);
      return res.data;
    },
    onSuccess: () => {
      toast.success("Report Dismissed");
      queryClient.invalidateQueries({ queryKey: ["reported-comments"] });
    },
    onError: () => {
      toast.error("Failed to report dismiss");
    },
  });

  // loading spinner
  if (isLoading) {
    return (
      <div className="text-center py-4">
        <span className="loading loading-spinner text-primary"></span>
      </div>
    );
  }

  if (reports.length === 0) {
    return (
      <p className="text-center text-gray-500 mt-10">No reported comments.</p>
    );
  }
  return (
    <div className="w-full mx-auto">
      <h2 className="text-2xl font-bold mb-6">Reported Comments</h2>
      <div className="space-y-6">
        {reports.map((report) => (
          <div
            key={report._id}
            className="bg-base-100 p-6 shadow-lg rounded-xl flex flex-col gap-3"
          >
            <div className="flex items-center gap-4">
              <img
                src={report.userImage}
                alt="User"
                className="w-16 h-16 rounded-full object-cover border"
              />
              <div>
                <h3 className="font-semibold text-lg">{report.name}</h3>
                <p className="text-sm text-gray-500">{report.email}</p>
              </div>
            </div>

            <p className="text-sm text-gray-600">
              <span className="font-semibold">Reported Reason:</span>{" "}
              {report.reportReason}
            </p>

            <p className="text-sm text-gray-600">
              <span className="font-semibold">On Post:</span> {report.postTitle}
            </p>

            <p className="text-sm text-gray-700">
              <span className="font-semibold">Comment:</span>{" "}
              {report?.comment.length > 20 && expandedId !== report?._id ? (
                <>
                  {report?.comment.slice(0, 20)}...
                  <button
                    onClick={() => setExpandedId(report?._id)}
                    className="text-blue-500 ml-2 hover:cursor-pointer"
                  >
                    Read more
                  </button>
                </>
              ) : (
                <>
                  {report?.comment}
                  <button
                    onClick={() => setExpandedId(null)}
                    className="text-blue-500 ml-2 hover:cursor-pointer"
                  >
                    Read less
                  </button>
                </>
              )}
            </p>

            <div className="flex justify-between items-center mt-2">
              <p className="text-sm text-gray-500">
                Reported at: {new Date(report.reportedAt).toLocaleString()}
              </p>

              <div className="flex gap-3">
                <button
                  onClick={() => deleteComment(report._id)}
                  className="btn btn-sm btn-error flex items-center gap-1 hover:text-white"
                  disabled={isDeleting}
                >
                  <MdDeleteForever size={20} />{" "}
                  {isDeleting ? "Deleting" : "Delete"}
                </button>
                <button
                  onClick={() => dismissReport(report._id)}
                  className="btn btn-sm btn-outline btn-success flex items-center gap-1"
                  disabled={isDismissing}
                >
                  <FaCheckCircle size={20} />{" "}
                  {isDismissing ? "Dismissing" : "Dismiss"}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReportedComments;
