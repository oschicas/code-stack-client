import React, { useState } from "react";
import {
  FaBook,
  FaTools,
  FaLaptopCode,
  FaDatabase,
  FaPalette,
  FaBriefcase,
} from "react-icons/fa";
import { SiFreelancer, SiUdemy } from "react-icons/si";
import { useDebounce } from "use-debounce";

const Resources = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm] = useDebounce(searchTerm, 500);
  // Sample resource data
  const resourceCategories = [
    {
      title: "Documentation",
      icon: <FaBook className="text-blue-500" size={24} />,
      items: [
        {
          name: "MDN Web Docs",
          url: "https://developer.mozilla.org",
          description:
            "The bible for web developers. Covers HTML, CSS, JS, and APIs.",
        },
        {
          name: "DevDocs",
          url: "https://devdocs.io",
          description: "All-in-one API documentation with offline support.",
        },
        {
          name: "React Official Docs",
          url: "https://react.dev",
          description: "Latest React documentation with interactive examples.",
        },
      ],
    },
    {
      title: "Interactive Learning",
      icon: <FaLaptopCode className="text-green-500" size={24} />,
      items: [
        {
          name: "freeCodeCamp",
          url: "https://www.freecodecamp.org",
          description: "Free coding challenges and certifications.",
        },
        {
          name: "Codecademy",
          url: "https://www.codecademy.com",
          description: "Interactive courses for multiple languages.",
        },
        {
          name: "Frontend Mentor",
          url: "https://www.frontendmentor.io",
          description: "Practice frontend with real-world projects.",
        },
      ],
    },
    {
      title: "Tools",
      icon: <FaTools className="text-purple-500" size={24} />,
      items: [
        {
          name: "CodePen",
          url: "https://codepen.io",
          description: "Frontend playground for HTML/CSS/JS snippets.",
        },
        {
          name: "JSFiddle",
          url: "https://jsfiddle.net",
          description: "Another great code sandbox for quick prototyping.",
        },
        {
          name: "JSON Formatter",
          url: "https://jsonformatter.org",
          description: "Validate and format JSON data.",
        },
      ],
    },
    {
      title: "APIs & Databases",
      icon: <FaDatabase className="text-amber-500" size={24} />,
      items: [
        {
          name: "RapidAPI Hub",
          url: "https://rapidapi.com/hub",
          description: "Discover and test thousands of APIs.",
        },
        {
          name: "MockAPI",
          url: "https://mockapi.io",
          description: "Generate fake REST APIs for prototyping.",
        },
        {
          name: "Supabase",
          url: "https://supabase.com",
          description: "Open-source Firebase alternative.",
        },
      ],
    },
    {
      title: "UI/Design",
      icon: <FaPalette className="text-pink-500" size={24} />,
      items: [
        {
          name: "Figma",
          url: "https://figma.com",
          description: "Collaborative design tool with dev-friendly features.",
        },
        {
          name: "CSS-Tricks",
          url: "https://css-tricks.com",
          description: "Daily articles about CSS and frontend design.",
        },
        {
          name: "UI Gradients",
          url: "https://uigradients.com",
          description: "Beautiful color gradients for your projects.",
        },
      ],
    },
    {
      title: "Career",
      icon: <FaBriefcase className="text-indigo-500" size={24} />,
      items: [
        {
          name: "LeetCode",
          url: "https://leetcode.com",
          description: "Practice coding interview questions.",
        },
        {
          name: "LinkedIn Learning",
          url: "https://www.linkedin.com/learning",
          description: "Professional courses with certifications.",
        },
        {
          name: "AngelList",
          url: "https://angel.co",
          description: "Find jobs at startups and tech companies.",
        },
      ],
    },
  ];

  const filteredCategories = resourceCategories.map((category) => {
    return {
      ...category,
      items: category.items.filter((item) =>
        item.name.toLowerCase().includes(debouncedSearchTerm.toLocaleLowerCase())
      ),
    };
  });

  return (
    <div className="max-w-10/12 mx-auto space-y-5 py-24">
      <h1 className="text-3xl font-bold text-center mb-8">
        Developer Resources
      </h1>

      {/* Search Bar */}
      <div className="flex justify-center mb-8">
        <div className="join w-full max-w-md rounded-full">
          <input
            type="text"
            placeholder="Search resources..."
            className="input input-bordered join-item w-full rounded-l-full focus:outline-0"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="btn btn-primary join-item rounded-r-full">
            Search
          </button>
        </div>
      </div>
      {/* Resource Categories */}
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {filteredCategories?.map(
          (category) =>
            category.items.length > 0 && (
              <div key={category.title} className="card bg-base-100 shadow-xl">
                <div className="card-body">
                  <div className="flex items-center gap-2 mb-4">
                    {category.icon}
                    <h2 className="card-title">{category.title}</h2>
                  </div>
                  <div className="space-y-4">
                    {category.items.map((item) => (
                      <a
                        key={item.name}
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block p-4 hover:bg-base-200 rounded-lg transition-colors"
                      >
                        <h3 className="font-semibold">{item.name}</h3>
                        <p className="text-sm opacity-70">{item.description}</p>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            )
        )}
      </div>
    </div>
  );
};

export default Resources;
