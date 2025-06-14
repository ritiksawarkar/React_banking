import React from 'react';
import { Link } from 'react-router-dom';
import { FaLock, FaPhone, FaEnvelope, FaClock, FaQuestionCircle, FaExclamationTriangle, FaGlobe, FaUniversalAccess } from 'react-icons/fa';

const DashboardFooter = () => {
  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Security Note */}
        <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 mb-8">
          <div className="flex items-start space-x-3">
            <FaLock className="text-blue-600 mt-1 flex-shrink-0" />
            <p className="text-sm text-blue-800">
              This is a secure banking channel. Do not share your credentials with anyone. FinVerse will never ask for your password or OTP.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Customer Support */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-4">Customer Support</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <FaPhone className="text-gray-400" />
                <span className="text-sm text-gray-600">1800-123-4567</span>
              </div>
              <div className="flex items-center space-x-2">
                <FaEnvelope className="text-gray-400" />
                <span className="text-sm text-gray-600">support@finverse.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <FaClock className="text-gray-400" />
                <span className="text-sm text-gray-600">24x7 Support Available</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {[
                { path: '/privacy-policy', label: 'Privacy Policy' },
                { path: '/terms-of-service', label: 'Terms & Conditions' },
                { path: '/faq', label: 'FAQs / Help' },
                { path: '/grievance', label: 'Grievance Redressal' }
              ].map((link) => (
                <li key={link.path}>
                  <Link to={link.path} className="text-sm text-gray-600 hover:text-indigo-600">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Regulatory Info */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-4">Regulatory Information</h3>
            <div className="space-y-2">
              <p className="text-sm text-gray-600">
                RBI License No: RBI/2024/123456
              </p>
              <p className="text-sm text-gray-600">
                FinVerse is regulated by the Reserve Bank of India
              </p>
              <p className="text-sm text-gray-600">
                © 2024 FinVerse. All rights reserved.
              </p>
            </div>
          </div>

          {/* Language & Accessibility */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-4">Language & Accessibility</h3>
            <div className="space-y-4">
              {/* Language Switcher */}
              <div className="flex items-center space-x-2">
                <FaGlobe className="text-gray-400" />
                <div className="flex space-x-2">
                  <button className="text-sm text-indigo-600 font-medium">English</button>
                  <span className="text-gray-300">|</span>
                  <button className="text-sm text-gray-600 hover:text-indigo-600">हिंदी</button>
                  <span className="text-gray-300">|</span>
                  <button className="text-sm text-gray-600 hover:text-indigo-600">தமிழ்</button>
                </div>
              </div>
              
              {/* Accessibility */}
              <div className="flex items-center space-x-2">
                <FaUniversalAccess className="text-gray-400" />
                <div className="text-sm text-gray-600">
                  <p>Best viewed in Chrome 80+ or Firefox 90+</p>
                  <p className="mt-1">Accessibility features available</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <div className="flex items-start space-x-2">
            <FaExclamationTriangle className="text-yellow-500 mt-1 flex-shrink-0" />
            <p className="text-xs text-gray-500">
              Disclaimer: FinVerse is not responsible for any loss or damage arising from the use of this website. 
              Please read our Terms of Service and Privacy Policy carefully before using our services.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default DashboardFooter; 