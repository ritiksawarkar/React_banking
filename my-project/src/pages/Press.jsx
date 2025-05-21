import React from 'react';
import { Link } from 'react-router-dom';
import { FaNewspaper, FaDownload, FaEnvelope, FaTwitter, FaLinkedinIn, FaFacebookF } from 'react-icons/fa';

const Press = () => {
  const pressReleases = [
    {
      date: "March 15, 2024",
      title: "FinVerse Launches Revolutionary AI-Powered Banking Features",
      description: "FinVerse introduces cutting-edge AI capabilities to enhance personal finance management.",
      link: "#"
    },
    {
      date: "February 28, 2024",
      title: "FinVerse Expands to European Market",
      description: "Digital banking platform announces expansion into key European markets.",
      link: "#"
    },
    {
      date: "February 10, 2024",
      title: "FinVerse Raises $50M in Series B Funding",
      description: "Investment will fuel product development and market expansion.",
      link: "#"
    }
  ];

  const mediaResources = [
    {
      title: "Company Logo",
      description: "Download our logo in various formats and sizes",
      icon: <FaDownload className="w-8 h-8" />
    },
    {
      title: "Brand Guidelines",
      description: "Access our brand guidelines and style guide",
      icon: <FaNewspaper className="w-8 h-8" />
    },
    {
      title: "Press Kit",
      description: "Download our complete press kit and media assets",
      icon: <FaDownload className="w-8 h-8" />
    }
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-r from-blue-50 to-indigo-50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Press & Media
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Latest news, press releases, and media resources from FinVerse
            </p>
          </div>
        </div>
      </section>

      {/* Latest Press Releases Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Latest Press Releases</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {pressReleases.map((release, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <p className="text-blue-600 mb-2">{release.date}</p>
                <h3 className="text-xl font-semibold mb-3">{release.title}</h3>
                <p className="text-gray-600 mb-4">{release.description}</p>
                <Link
                  to={release.link}
                  className="text-blue-600 hover:text-blue-700 font-medium"
                >
                  Read More →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Media Resources Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Media Resources</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {mediaResources.map((resource, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow text-center">
                <div className="text-blue-600 mb-4 flex justify-center">{resource.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{resource.title}</h3>
                <p className="text-gray-600 mb-4">{resource.description}</p>
                <Link
                  to="#"
                  className="text-blue-600 hover:text-blue-700 font-medium"
                >
                  Download →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-8">
            Media Inquiries
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
            For press inquiries, please contact our media relations team
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link
              to="mailto:press@finverse.com"
              className="px-6 py-3 bg-white text-blue-600 rounded-lg hover:bg-blue-50 flex items-center justify-center"
            >
              <FaEnvelope className="mr-2" />
              press@finverse.com
            </Link>
            <div className="flex space-x-4">
              <a href="#" className="p-3 bg-white/10 rounded-lg hover:bg-white/20">
                <FaTwitter className="w-6 h-6" />
              </a>
              <a href="#" className="p-3 bg-white/10 rounded-lg hover:bg-white/20">
                <FaLinkedinIn className="w-6 h-6" />
              </a>
              <a href="#" className="p-3 bg-white/10 rounded-lg hover:bg-white/20">
                <FaFacebookF className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Press; 