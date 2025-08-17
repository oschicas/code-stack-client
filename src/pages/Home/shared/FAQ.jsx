import React, { useState } from "react";
import { FaChevronDown, FaChevronUp, FaQuestionCircle } from "react-icons/fa";
import faqImage from "../../../assets/faq-image/faq.png";
import { Link } from "react-router";

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqItems = [
    {
      question: "How do I create an account?",
      answer:
        "Creating an account is simple. Click on the 'Join Us' button in the top right corner. It will take you to login page. In the login page 'login' button under you will find a text 'Have an account Register'. Just click to 'Register' this will take you to register page. Just fill up the form that's it.",
    },
    {
      question: "What payment methods do you accept?",
      answer:
        "We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and bank transfers. All transactions are securely processed through our payment gateway is 'Stripe'.",
    },
    {
      question: "Can I cancel my subscription anytime?",
      answer:
        "No, you can't. We have a privacy & policy it is in the footer section below you will find it. Just click on it. This this navigate you privacy & policy page. Read it carefully",
    },
    {
      question: "How to post in this web application?",
      answer:
        "To post you just need to register then login. Then can simply go the dashboard and add post button in the left(for mobile and tablet you just need to click on hamburger icon you will find it) you can post your necessary post.",
    },
    {
      question: "Can I like or comment in a post?",
      answer:
        "Of course you can. You just need to login the page and you can vote(like, dislike) and can comment in a post only one comment per post.",
    },
    {
      question: "After creating a post what if I want to delete the post?",
      answer:
        "Yes you can. You just need to simply login with user & password or google login. Then in the dashboard in the left you will find My posts button(for the mobile and tablet top hamburger icon click on it you will find it). There are all the post are created by you. You can see the post and also delete the post.",
    },
  ];

  return (
    <div className="w-10/12 max-w-7xl mx-auto">
      <h2 className="text-2xl font-bold mb-5 flex items-center gap-2"><span className="text-primary"><FaQuestionCircle /></span> Frequently Asked Questions</h2>

      <div className="flex flex-col lg:flex-row gap-12">
        {/* FAQ Accordion */}
        <div className="flex-1">
          <div className="space-y-4">
            {faqItems.map((item, index) => (
              <div
                key={index}
                className="border border-gray-200 rounded-lg overflow-hidden"
              >
                <button
                  className="flex justify-between items-center w-full p-6 text-left bg-gray-50 hover:bg-gray-100 transition-colors duration-200"
                  onClick={() => toggleAccordion(index)}
                >
                  <h3 className="text-lg font-medium text-gray-900">
                    {item.question}
                  </h3>
                  <span className="text-gray-500">
                    {activeIndex === index ? (
                      <FaChevronUp />
                    ) : (
                      <FaChevronDown />
                    )}
                  </span>
                </button>
                {activeIndex === index && (
                  <div className="p-6 bg-white">
                    <p className="text-gray-600">{item.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Image and Static Content */}
        <div className="lg:w-1/3 flex flex-col">
          <div className="bg-blue-50 rounded-lg p-8 h-full flex flex-col">
            <div className="mb-8">
              <img
                src={faqImage}
                alt="FAQ Illustration"
                className="w-full h-auto object-contain"
              />
            </div>

            <div className="mt-auto space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Still have questions?
                </h3>
                <p className="text-gray-600">
                  Can't find what you're looking for? Our support team is
                  available 24/7 to help you.  <Link to={'/contact-us'} className="underline">Contact Us</Link>
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="mt-1 flex-shrink-0">
                    <svg
                      className="h-6 w-6 text-blue-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Email Support</h4>
                    <a className="text-gray-600" href="mailto:parvez.alif.dev@gmail.com">parvez.alif.dev@gmail.com</a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="mt-1 flex-shrink-0">
                    <svg
                      className="h-6 w-6 text-blue-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Phone Support</h4>
                    <a className="text-gray-600" href="tel:+8801872243808">+880 1872243808</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
