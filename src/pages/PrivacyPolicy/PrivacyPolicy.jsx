import React from "react";
import { Link } from "react-router";
import {
  FaShieldAlt,
  FaUserLock,
  FaCookieBite,
  FaQuestionCircle,
} from "react-icons/fa";

const PrivacyPolicy = () => {
  return (
    <div className="max-w-10/12 mx-auto pt-24 pb-8 text-gray-300 space-y-5">
      <div className="text-center">
        <h1 className="text-4xl text-black font-bold mb-4 flex items-center justify-center gap-3">
          <FaShieldAlt className="text-blue-400" /> Privacy Policy
        </h1>
        <p className="text-lg text-gray-600">
          Last Updated: {new Date().toLocaleDateString()}
        </p>
      </div>

      <div className="rounded-xl shadow-xl p-8 sm:p-10 space-y-8 text-black">
        {/* Introduction */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-black flex items-center gap-2">
            <FaUserLock className="text-blue-400" /> Introduction
          </h2>
          <p>
            At CodeStack, we take your privacy seriously. This Privacy Policy
            explains how we collect, use, disclose, and safeguard your
            information when you use our platform. Please read this policy
            carefully.
          </p>
        </section>

        {/* Information Collection */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-black">
            1. Information We Collect
          </h2>
          <p>We may collect the following types of information:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong>Personal Data:</strong> Name, email address, profile
              picture when you register
            </li>
            <li>
              <strong>Usage Data:</strong> Pages visited, time spent, features
              used
            </li>
            <li>
              <strong>Technical Data:</strong> IP address, browser type, device
              information
            </li>
            <li>
              <strong>Cookies:</strong> As described in our Cookie Policy below
            </li>
          </ul>
        </section>

        {/* Data Usage */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-black">
            2. How We Use Your Information
          </h2>
          <p>Your information helps us:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Provide and maintain our service</li>
            <li>Improve user experience</li>
            <li>Communicate with you about updates</li>
            <li>Monitor usage and analyze trends</li>
            <li>Prevent fraudulent activity</li>
          </ul>
        </section>

        {/* Data Sharing */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-black">
            3. Data Sharing & Disclosure
          </h2>
          <p>
            We do not sell your personal data. We may share information with:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Service providers who assist in our operations</li>
            <li>Legal authorities when required by law</li>
            <li>Business partners in anonymized, aggregated form</li>
          </ul>
        </section>

        {/* Cookies */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-white flex items-center gap-2">
            <FaCookieBite className="text-blue-400" /> 4. Cookie Policy
          </h2>
          <p>We use cookies to:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Remember your preferences</li>
            <li>Analyze site traffic</li>
            <li>Enable social media features</li>
          </ul>
          <p>You can control cookies through your browser settings.</p>
        </section>

        {/* User Rights */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-white">5. Your Rights</h2>
          <p>You have the right to:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Access your personal data</li>
            <li>Request correction or deletion</li>
            <li>Object to processing</li>
            <li>Request data portability</li>
            <li>Withdraw consent</li>
          </ul>
        </section>

        {/* Security */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-white">
            6. Data Security
          </h2>
          <p>
            We implement industry-standard security measures including
            encryption, access controls, and regular security audits.
          </p>
        </section>

        {/* Changes */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-white">
            7. Policy Changes
          </h2>
          <p>
            We may update this policy periodically. We'll notify you of
            significant changes through our platform or via email.
          </p>
        </section>

        {/* Contact */}
        <section className="space-y-4 pt-6">
          <h2 className="text-2xl font-semibold text-white flex items-center gap-2">
            <FaQuestionCircle className="text-blue-400" /> Contact Us
          </h2>
          <p>
            For privacy-related questions, contact our Data Protection Officer
            at:
          </p>
          <a className="font-medium" href="mailto:parvez.alif.dev@gmail.com">
            parvez.alif.dev@gmail.com
          </a>
          <p>
            Or visit our{" "}
            <Link to="/contact-us" className="text-blue-400 hover:underline">
              Contact Page
            </Link>
          </p>
        </section>

        <div className="pt-8 text-center text-sm text-gray-400">
          <p>
            By using CodeStack, you acknowledge you have read and understood
            this Privacy Policy.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
