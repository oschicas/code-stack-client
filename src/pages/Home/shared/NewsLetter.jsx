import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FaPaperPlane, FaCheckCircle, FaNewspaper } from "react-icons/fa";
import { toast } from "react-toastify";

const NewsLetter = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);

  const onSubmit = async (data) => {
    setIsLoading(true);
    console.log("news letter form", data);
    try {
      toast.success(
        <div className="flex items-center gap-2">
          <FaCheckCircle className="text-green-500" />
          Successfully subscribed!
        </div>,
        { icon: false }
      );
      reset();
      setIsSubscribed(true);
    } catch (error) {
      toast.error("Subscription failed. Please try again later.", {
        className: "bg-error text-white",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (isSubscribed) {
    return (
      <div className="card bg-base-100 shadow-xl w-10/12 md:max-w-2xl mx-auto my-12">
        <div className="card-body text-center p-8">
          <FaCheckCircle className="text-5xl text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold">Thank You for Subscribing!</h2>
          <p className="text-gray-600 mb-6">
            You'll now receive our latest updates and coding resources directly
            to your inbox.
          </p>
          <button
            onClick={() => setIsSubscribed(false)}
            className="btn btn-ghost text-primary"
          >
            Subscribe another email
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-10/12 mx-auto space-y-5">
      <h2 className="text-2xl font-bold flex items-center gap-2">
        <span className="text-primary">
          <FaNewspaper size={25} />
        </span>{" "}
        Our Newsletter
      </h2>
      <div className="bg-gradient-to-r from-primary to-[#0B213A] text-primary-content py-12 px-4 rounded-box ">
        <div className="w-10/12 lg:max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row gap-8 items-center">
            {/* Text Content */}
            <div className="flex-1">
              <h2 className="text-3xl font-bold mb-3">Stay Updated</h2>
              <p className="text-lg opacity-90 mb-4">
                Subscribe to our newsletter for the latest coding tutorials,
                resources, and platform updates.
              </p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <span className="badge badge-sm badge-accent">✓</span>
                  Weekly coding tips
                </li>
                <li className="flex items-center gap-2">
                  <span className="badge badge-sm badge-accent">✓</span>
                  Exclusive tutorials
                </li>
                <li className="flex items-center gap-2">
                  <span className="badge badge-sm badge-accent">✓</span>
                  No spam - unsubscribe anytime
                </li>
              </ul>
            </div>

            {/* Subscription Form */}
            <div className="flex-1 w-full">
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="card bg-base-100 shadow-xl"
              >
                <div className="p-6 text-black">
                  <div>
                    <label className="label">
                      <span>Your Name (Optional)</span>
                    </label>
                    <input
                      type="text"
                      placeholder="John Doe"
                      className="input focus:outline-0 w-full"
                      {...register("name")}
                    />
                  </div>

                  <div>
                    <label className="label">
                      <span>Email Address*</span>
                    </label>
                    <input
                      type="email"
                      placeholder="your@email.com"
                      className={`input focus:outline-0 w-full ${
                        errors.email ? "input-error" : ""
                      }`}
                      {...register("email", {
                        required: "Email is required",
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: "Invalid email address",
                        },
                      })}
                    />
                    <br />
                    {errors.email && (
                      <span className="text-error text-sm mt-1">
                        {errors.email.message}
                      </span>
                    )}
                  </div>

                  <div className="form-control mt-4">
                    <button
                      type="submit"
                      className={`btn btn-primary ${
                        isLoading ? "loading" : ""
                      }`}
                      disabled={isLoading}
                    >
                      {!isLoading && (
                        <>
                          <FaPaperPlane className="mr-2" />
                          Subscribe Now
                        </>
                      )}
                    </button>
                  </div>

                  <p className="text-xs text-gray-500 mt-2">
                    We respect your privacy. Unsubscribe at any time.
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsLetter;
