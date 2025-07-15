import React from 'react';
import { FaSearch } from 'react-icons/fa';
import bannerImg from '../../../assets/banner_image/banner_image.png'

const Banner = () => {
  return (
    <div
      className="relative bg-cover bg-center min-h-screen flex items-center justify-center text-white px-4"
      style={{
        backgroundImage: `url(${bannerImg})`,
      }}
    >
      <div className="max-w-2xl w-full text-center space-y-6">
        <h1 className="text-3xl md:text-4xl font-bold">Search Your Desired Post By Tag</h1>
        <p className="text-lg md:text-xl">
          Search here to get answers to your questions
        </p>

        {/* Search Bar */}
        <div className="relative mt-6">
          <input
            type="text"
            placeholder="Search your desired post..."
            className="input input-bordered w-full rounded-full px-5 py-7 text-black focus:outline-0"
          />
          <button className="absolute z-50 top-2 right-3 btn btn-primary rounded-full">
            <FaSearch /> Search
          </button>
        </div>

        {/* Popular Keywords */}
        <div className="text-sm mt-2">
          <span className="font-semibold">Popular:</span>{' '}
          <span className="link link-hover text-gray-200 hover:text-white">Code</span>,{' '}
          <span className="link link-hover text-gray-200 hover:text-white">Basic</span>,{' '}
          <span className="link link-hover text-gray-200 hover:text-white">Blog</span>,{' '}
          <span className="link link-hover text-gray-200 hover:text-white">WordPress</span>
        </div>
      </div>
    </div>
  );
};

export default Banner;
