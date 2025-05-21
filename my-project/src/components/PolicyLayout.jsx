import React, { useState, useEffect } from 'react';
import { FaArrowUp } from 'react-icons/fa';

const PolicyLayout = ({ title, children, sections }) => {
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-8 relative inline-block">
            {title}
            <div className="absolute bottom-0 left-0 w-1/2 h-0.5 bg-blue-600 rounded"></div>
          </h1>
          
          <div className="prose prose-indigo max-w-none">
            <p className="text-gray-600 mb-6">Last updated: {new Date().toLocaleDateString()}</p>

            {/* Table of Contents */}
            <div className="bg-gray-50 rounded-lg p-6 mb-8 sticky top-24 z-10 border border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 relative inline-block">
                Table of Contents
                <div className="absolute bottom-0 left-0 w-8 h-0.5 bg-blue-600 rounded"></div>
              </h2>
              <ul className="space-y-2">
                {sections.map((section) => (
                  <li key={section.id}>
                    <a
                      href={`#${section.id}`}
                      className="text-gray-600 hover:text-blue-600 transition-colors duration-200"
                    >
                      {section.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {children}

            {/* Back to Top Button */}
            {showBackToTop && (
              <button
                onClick={scrollToTop}
                className="fixed bottom-8 right-8 bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition-all duration-200 transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                aria-label="Back to top"
              >
                <FaArrowUp className="h-5 w-5" />
              </button>
            )}

            {/* Print Button */}
            <div className="mt-8 pt-8 border-t border-gray-200">
              <button
                onClick={() => window.print()}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Print this page
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PolicyLayout; 