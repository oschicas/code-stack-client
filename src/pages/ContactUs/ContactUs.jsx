import React, { useRef } from "react";
import { useForm } from "react-hook-form";
import {
  FaPaperPlane,
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaLinkedin,
  FaGithub,
  FaTwitter,
  FaFacebook,
} from "react-icons/fa";
import Swal from "sweetalert2";

const ContactUs = () => {
  const formRef = useRef();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    if (data.email && data.name && data.subject && data.message) {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Send successfully",
        showConfirmButton: false,
        timer: 1500,
      });
      reset();
    } else {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Please fill all the field in the form",
        showConfirmButton: false,
        timer: 1500,
      });
    }
    console.log("form data", data);
  };

  return (
    <div className="max-w-10/12 mx-auto space-y-5 py-24">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold mb-4">Contact Us</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Have questions or want to collaborate? We'd love to hear from you!
        </p>
      </div>

      {/* form and contact info */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* form */}
        <div className="card space-y-5">
          <h2 className="card-title text-2xl mb-6">Contact Information</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* name field */}
            <div>
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <br />
              <input
                type="text"
                placeholder="Enter your name"
                className="input focus:outline-0 w-full"
                {...register("name", { required: "First name is required" })}
              />
              {errors.name && (
                <p className="text-red-500">{errors.name.message}</p>
              )}
            </div>
            {/* email field */}
            <div>
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <br />
              <input
                type="email"
                placeholder="Enter your email"
                className="input focus:outline-0 w-full"
                {...register("email", { required: "Email is required" })}
              />
              {errors.email && (
                <p className="text-red-500">{errors.name.message}</p>
              )}
            </div>
            {/* select subject field */}
            <div>
              <label className="label">
                <span className="label-text">Subject</span>
              </label>
              <select
                className="select focus:outline-0 w-full"
                {...register("subject", { required: "Subject is required" })}
              >
                <option value="">Select a subject</option>
                <option>General Inquiry</option>
                <option>Technical Support</option>
                <option>Partnership</option>
                <option>Feedback</option>
                <option>Other</option>
              </select>
              {errors.subject && (
                <span className="text-error text-sm">
                  {errors.subject.message}
                </span>
              )}
            </div>
            {/* text area field */}
            <div>
              <label className="label">
                <span className="label-text">Message</span>
              </label>
              <textarea
                className="textarea focus:outline-0 w-full h-32"
                placeholder="Your message here..."
                {...register("message", {
                  required: "Message is required",
                })}
              ></textarea>
              {errors.message && (
                <span className="text-error text-sm">
                  {errors.message.message}
                </span>
              )}
            </div>
            {/* submit button */}
            <div className="card-actions justify-end">
              <button type="submit" className="btn btn-primary">
                <FaPaperPlane className="mr-2" />
                Send Message
              </button>
            </div>
          </form>
        </div>
        {/* Contact Info */}
        <div className="space-y-8 bg-base-300 rounded-xl">
          <div className="card">
            <div className="card-body">
              <h2 className="card-title text-2xl mb-6">Contact Information</h2>

              <div className="space-y-6">
                {/* Map Embed */}
                <div className="card bg-base-200">
                  <div className="card-body p-0">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d58356.57168896541!2d90.3946526!3d23.914934149999997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c4488706e2d9%3A0xee45004fa6ba8d03!2sTongi!5e0!3m2!1sen!2sbd!4v1755361148919!5m2!1sen!2sbd"
                      width="100%"
                      height="300"
                      style={{ border: 0 }}
                      allowFullScreen=""
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      className="rounded-b-2xl"
                    ></iframe>
                  </div>
                </div>
                {/* address */}
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-full bg-primary bg-opacity-10 text-primary">
                    <FaMapMarkerAlt color="white" size={20} />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">Our Location</h3>
                    <p className="text-gray-600">
                      123 Developer Street, Code City
                    </p>
                    <p className="text-gray-600">Techland, 10001</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-full bg-primary bg-opacity-10 text-primary">
                    <FaPhone color="white" size={20} />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">Phone</h3>
                    <a className="text-gray-600" href="tel:+8801872243808">
                      +880 1872243808
                    </a>
                    <p className="text-gray-600">Mon-Fri: 9am-5pm</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-full bg-primary bg-opacity-10 text-primary">
                    <FaEnvelope color="white" size={20} />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">Email</h3>
                    <a
                      className="text-gray-600"
                      href="mailto:parvez.alif.dev@gmail.com"
                    >
                      parvez.alif.dev@gmail.com
                    </a>
                  </div>
                </div>
              </div>

              <div className="divider">OR</div>
              {/* social media platform */}
              <div>
                <h3 className="font-bold text-lg mb-4">Connect with us</h3>
                <div className="flex gap-4">
                  <a
                    href="https://www.linkedin.com/in/parvez-hossain-alif/?locale=en_US"
                    target="_blank"
                    className="btn btn-ghost btn-circle text-2xl text-blue-600"
                  >
                    <FaLinkedin />
                  </a>
                  <a
                    href="https://www.facebook.com/mdparvez.hossain.77985741"
                    target="_blank"
                    className="btn btn-ghost btn-circle text-2xl text-blue-600"
                  >
                    <FaFacebook />
                  </a>
                  <a
                    href="https://x.com/Parvez19188"
                    target="_blank"
                    className="btn btn-ghost btn-circle text-2xl text-blue-400"
                  >
                    <FaTwitter />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
