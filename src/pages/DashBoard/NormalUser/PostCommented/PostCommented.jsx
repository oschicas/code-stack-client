import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import { useParams } from "react-router";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { toast } from "react-toastify";

const PostCommented = () => {
  const { postId } = useParams();
  const axiosSecure = useAxiosSecure();
  const [selectedComment, setSelectedComment] = useState(null);
  const [reported, setReported] = useState({});
  const queryClient = useQueryClient();

  console.log("reported object", reported);

  // fetch comments by postId
  const {
    data: comments = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["comments", postId],
    queryFn: async () => {
      const res = await axiosSecure.get(`/comments?postId=${postId}`);
      return res.data;
    },
  });

  const truncateComment = (cmtText) => {
    const length = 20;
    return cmtText.length > length ? cmtText.slice(0, 20) + "..." : cmtText;
  };

  //   static feedback dropdown menu array
  const staticFeedbacks = [
    "Inappropriate Language",
    "Spam or Irrelevant",
    "Offensive or Harassment",
  ];

  const handleFeedbackChange = (commentId, feedback, email) => {
    setReported({ [commentId]: feedback, email });
  };

  //   post comment feedback
  const { mutateAsync: reportComment, isPending: isReporting } = useMutation({
    mutationFn: async ({ commentId, feedback }) => {
      const reportedInfo = {
        commentId,
        feedback,
      };
      const res = await axiosSecure.patch("/comments/report", reportedInfo);
      return res.data;
    },
    onSuccess: () => {
      refetch();
      toast.success("Reported Successful");
      queryClient.invalidateQueries(["comments", postId]);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleReport = (commentId) => {
    const feedback = reported[commentId];
    console.log("report done", feedback, commentId);
    if (!feedback) {
      return toast.error("Please give feedback from drop down menu");
    }
    // report comment by mutation
    reportComment({ commentId, feedback });
  };

  //   loading state for fetching data
  if (isLoading) {
    return (
      <div className="text-center">
        <span className="loading loading-spinner text-primary"></span>
      </div>
    );
  }

  //   if not comments are available
  if (comments.length === 0) {
    return <p>No comments found for this post.</p>;
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">All Comments for Post</h2>
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>#</th>
              <th>Email</th>
              <th>Comment</th>
              <th>Feedback</th>
              <th>Report</th>
            </tr>
          </thead>
          <tbody>
            {comments.map((cmt, idx) => (
              <tr key={cmt._id}>
                <td>{idx + 1}</td>
                <td>{cmt.email}</td>
                <td>
                  {cmt.comment.length > 20 ? (
                    <>
                      {truncateComment(cmt.comment)}{" "}
                      <button
                        className="text-blue-500 underline text-sm hover:cursor-pointer"
                        onClick={() => setSelectedComment(cmt.comment)}
                      >
                        Read More
                      </button>
                    </>
                  ) : (
                    cmt.comment
                  )}
                </td>
                <td>
                  <select
                    className="select select-sm focus:outline-0"
                    defaultValue="Select Feedback"
                    onChange={(e) =>
                      handleFeedbackChange(cmt?._id, e.target.value, cmt?.email)
                    }
                  >
                    <option value="Select Feedback" disabled>
                      Select FeedBack
                    </option>
                    {staticFeedbacks.map((fb, i) => (
                      <option key={i}>{fb}</option>
                    ))}
                  </select>
                </td>
                <td>
                  <button
                    className="btn btn-sm btn-error text-white"
                    disabled={
                      !reported[cmt._id] || isReporting || cmt?.isReported
                    }
                    onClick={() => handleReport(cmt._id)}
                  >
                    {
                        cmt?.isReported ? 'Reported' : 'Report'
                    }
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal for full comment */}
      {selectedComment && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50 ">
          <div className="bg-white rounded p-6 max-w-lg w-full max-h-60 overflow-auto">
            <h3 className="text-xl font-semibold mb-4">Full Comment</h3>
            <p className="mb-4">{selectedComment}</p>
            <div className="text-right">
              <button
                onClick={() => setSelectedComment(null)}
                className="btn btn-sm btn-primary"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostCommented;
