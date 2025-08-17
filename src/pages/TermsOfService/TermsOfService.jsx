import React from "react";
import { Link } from "react-router";
import { 
  FaGavel, 
  FaExclamationTriangle, 
  FaUserCheck,
  FaBan,
  FaBalanceScale,
  FaHandshake
} from "react-icons/fa";

const TermsOfService = () => {
  const currentDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="max-w-10/12 mx-auto pt-24 pb-8 text-gray-300 space-y-5">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-black mb-4 flex items-center justify-center gap-3">
          <FaGavel className="text-blue-400" /> Terms of Service
        </h1>
        <p className="text-lg text-gray-600">Effective Date: {currentDate}</p>
      </div>

      <div className="rounded-xl shadow-xl p-8 sm:p-10 space-y-8 text-black">
        {/* Introduction */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-black flex items-center gap-2">
            <FaHandshake className="text-blue-400" /> 1. Acceptance of Terms
          </h2>
          <p>
            By accessing or using CodeStack ("the Platform"), you agree to be bound by these Terms of Service. 
            If you disagree with any part, you may not access the Platform.
          </p>
        </section>

        {/* User Responsibilities */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-black flex items-center gap-2">
            <FaUserCheck className="text-blue-400" /> 2. User Responsibilities
          </h2>
          <p>As a user, you agree to:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Provide accurate registration information</li>
            <li>Maintain the confidentiality of your account</li>
            <li>Not share your login credentials</li>
            <li>Use the Platform for lawful purposes only</li>
            <li>Not engage in harassment, spamming, or harmful behavior</li>
          </ul>
        </section>

        {/* Prohibited Conduct */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-black flex items-center gap-2">
            <FaBan className="text-blue-400" /> 3. Prohibited Activities
          </h2>
          <p>You may not:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Reverse engineer or attempt to extract source code</li>
            <li>Use bots, scrapers, or other automated tools</li>
            <li>Upload malicious content or viruses</li>
            <li>Violate intellectual property rights</li>
            <li>Impersonate other individuals or entities</li>
          </ul>
        </section>

        {/* Content Ownership */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-black">4. Content Ownership</h2>
          <div className="space-y-2">
            <p>
              <strong>Your Content:</strong> You retain ownership of content you post, but grant us a 
              worldwide license to use, display, and distribute it on the Platform.
            </p>
            <p>
              <strong>Our Content:</strong> All Platform software, design, and content are owned by 
              CodeStack or its licensors and protected by copyright laws.
            </p>
          </div>
        </section>

        {/* Payments & Subscriptions */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-black">5. Payments & Refunds</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>All fees are non-refundable except as required by law</li>
            <li>We may change subscription prices with 30 days notice</li>
            <li>You're responsible for any taxes associated with purchases</li>
          </ul>
        </section>

        {/* Termination */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-black">6. Termination</h2>
          <p>
            We may suspend or terminate your account at our discretion if you violate these Terms. 
            You may terminate your account at any time through your dashboard.
          </p>
        </section>

        {/* Disclaimers */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-black flex items-center gap-2">
            <FaExclamationTriangle className="text-blue-400" /> 7. Disclaimers
          </h2>
          <p>
            THE PLATFORM IS PROVIDED "AS IS" WITHOUT WARRANTIES OF ANY KIND. WE DO NOT GUARANTEE:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>That the Platform will be error-free or uninterrupted</li>
            <li>The accuracy of user-generated content</li>
            <li>That the Platform will meet your specific requirements</li>
          </ul>
        </section>

        {/* Limitation of Liability */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-black flex items-center gap-2">
            <FaBalanceScale className="text-blue-400" /> 8. Limitation of Liability
          </h2>
          <p>
            TO THE MAXIMUM EXTENT PERMITTED BY LAW, CODESTACK SHALL NOT BE LIABLE FOR ANY INDIRECT, 
            INCIDENTAL, SPECIAL, OR CONSEQUENTIAL DAMAGES RESULTING FROM YOUR USE OF THE PLATFORM.
          </p>
        </section>

        {/* Governing Law */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-black">9. Governing Law</h2>
          <p>
            These Terms shall be governed by the laws of [Your State/Country] without regard to 
            its conflict of law provisions.
          </p>
        </section>

        {/* Changes */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-black">10. Changes to Terms</h2>
          <p>
            We reserve the right to modify these Terms at any time. Continued use after changes 
            constitutes acceptance of the new Terms.
          </p>
        </section>

        {/* Contact */}
        <section className="space-y-4 pt-6">
          <h2 className="text-2xl font-semibold text-black">Contact Information</h2>
          <p>
            For questions about these Terms, contact us at:
          </p>
          <a className="font-medium" href="mailto:parvez.alif.dev@gmail.com">
            parvez.alif.dev@gmail.com
          </a>
          <p>
            Or visit our <Link to="/contact-us" className="text-blue-400 hover:underline">Contact Page</Link>
          </p>
        </section>

        <div className="pt-8 text-center text-sm text-gray-400">
          <p>
            By using CodeStack, you acknowledge you have read, understood, and agree to be bound by these Terms.
          </p>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;