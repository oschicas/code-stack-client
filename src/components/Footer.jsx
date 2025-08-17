import React from "react";
import {
  IoLogoFacebook,
  IoLogoGithub,
  IoLogoLinkedin,
  IoMailOutline,
  IoCallOutline,
  IoLocationOutline,
} from "react-icons/io5";
import { FaSquareXTwitter } from "react-icons/fa6";
import logo from "../assets/logo/CodeStack Logo.png";
import { Link } from "react-router";
import { toast } from "react-toastify";
import { FaCheckCircle } from "react-icons/fa";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: "Home", path: "/" },
    { name: "Resources", path: "/resources" },
    { name: "Dashboard", path: "/dashboard" },
    { name: "Membership", path: "/membership" },
    { name: "Contact Us", path: "/contact-us" },
  ];

  const socialLinks = [
    {
      icon: <IoLogoFacebook size={22} />,
      url: "https://www.facebook.com/mdparvez.hossain.77985741",
    },
    { icon: <FaSquareXTwitter size={20} />, url: "https://x.com/Parvez19188" },
    {
      icon: <IoLogoLinkedin size={22} />,
      url: "https://www.linkedin.com/in/parvez-hossain-alif/?locale=en_US",
    },
    {
      icon: <IoLogoGithub size={22} />,
      url: "https://github.com/Parvez141300",
    },
  ];

  const handleNewsLetter = (e) => {
    console.log(e.target);
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const formInfo = Object.fromEntries(formData.entries());
    console.log(formInfo);
    if (formInfo.email) {
      toast.success(
        <div className="flex items-center gap-2">
          <FaCheckCircle className="text-green-500" />
          Successfully subscribed!
        </div>,
        { icon: false }
      );
      form.reset();
    } else {
      toast.error("Subscription failed. Please try again later.", {
        className: "bg-error text-white",
      });
    }
  };

  return (
    <footer className="bg-[#0B213A] text-gray-300 pt-16 pb-8">
      <div className="w-10/12 lg:max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Brand Column */}
        <div className="space-y-4">
          <Link to="/" className="flex items-center gap-2">
            <img src={logo} alt="CodeStack Logo" className="w-12 h-auto" />
            <span className="text-2xl font-bold text-white">CodeStack</span>
          </Link>
          <p className="text-sm leading-relaxed">
            Empowering developers with quality resources, tutorials, and a
            vibrant community.
          </p>
          <div className="flex gap-4 pt-2">
            {socialLinks.map((social, index) => (
              <a
                key={index}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary transition-colors duration-300"
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-white">Quick Links</h3>
          <ul className="space-y-2">
            {quickLinks.map((link) => (
              <li key={link.name}>
                <Link
                  to={link.path}
                  className="hover:text-primary transition-colors duration-300 text-sm"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Info */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-white">Contact Us</h3>
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <IoMailOutline className="mt-1 flex-shrink-0" />
              <a className="text-sm" href="mailto:parvez.alif.dev@gmail.com">
                parvez.alif.dev@gmail.com
              </a>
            </li>
            <li className="flex items-start gap-3">
              <IoCallOutline className="mt-1 flex-shrink-0" />
              <a className="text-sm" href="tel:+8801872243808">
                +880 1872243808
              </a>
            </li>
            <li className="flex items-start gap-3">
              <IoLocationOutline className="mt-1 flex-shrink-0" />
              <span className="text-sm">
                Tongi, Gazipur
                <br />
                Dhaka
              </span>
            </li>
          </ul>
        </div>

        {/* Newsletter */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-white">Newsletter</h3>
          <p className="text-sm">
            Subscribe to get updates on new resources and tutorials.
          </p>
          <form className="flex gap-2" onSubmit={handleNewsLetter}>
            <input
              name="email"
              type="email"
              placeholder="Your email"
              className="input input-bordered input-sm w-full max-w-xs bg-gray-700 border-gray-600 text-white"
              required
            />
            <button type="submit" className="btn btn-primary btn-sm">
              Subscribe
            </button>
          </form>
          <p className="text-xs text-gray-400">
            We'll never share your email. Unsubscribe anytime.
          </p>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-gray-700 mt-12 pt-6 text-center">
        <p className="text-sm text-gray-400">
          &copy; {currentYear} CodeStack. All rights reserved.
          <span className="block sm:inline-block sm:ml-4 mt-2 sm:mt-0">
            <Link
              to="/privacy"
              className="hover:text-primary transition-colors"
            >
              Privacy Policy
            </Link>
            {" | "}
            <Link to="/terms" className="hover:text-primary transition-colors">
              Terms of Service
            </Link>
          </span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
