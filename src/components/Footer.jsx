import React from "react";
import { IoLogoFacebook, IoLogoInstagram } from "react-icons/io5";
import { FaSquareXTwitter } from "react-icons/fa6";
import logo from "../assets/logo/CodeStack Logo.png";
import { Link } from "react-router";

const Footer = () => {
  return (
    <footer className="footer footer-horizontal footer-center bg-[#0B213A] text-primary-content p-10">
      <aside>
        <Link to={'/'}>
          <img className="w-16" src={logo} alt="" />
        </Link>
        <p className="font-bold text-2xl">CodeStack</p>
        <span className="text-lg">Providing reliable tech posts to read and interact</span>
        <p>Copyright © {new Date().getFullYear()} - All right reserved</p>
      </aside>
      <nav>
        <div className="grid grid-flow-col gap-4">
          <IoLogoFacebook size={30} />
          <IoLogoInstagram size={30} />
          <FaSquareXTwitter size={30} />
        </div>
      </nav>
    </footer>
  );
};

export default Footer;
