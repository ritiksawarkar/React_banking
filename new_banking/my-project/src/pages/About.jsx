import React from 'react';
import { Link } from 'react-router-dom';
import { FaBuilding, FaUsers, FaChartLine, FaAward, FaHandshake, FaGlobe, FaCheck, FaArrowRight } from 'react-icons/fa';
import Layout from '../components/Layout';

const About = () => {
  const sections = [
    {
      icon: <FaBuilding className="text-3xl text-indigo-600" />,
      title: "Our Story",
      content: [
        {
          subtitle: "Company History",
          items: [
            "Founded in 2010 with a vision to revolutionize banking",
            "Started as a small team of banking innovators",
            "Grew to serve millions of customers worldwide",
            "Continuously evolving with technology"
          ]
        },
        {
          subtitle: "Our Mission",
          items: [
            "Make banking accessible to everyone",
            "Provide innovative financial solutions",
            "Ensure security and trust",
            "Drive financial inclusion"
          ]
        }
      ]
    },
    {
      icon: <FaUsers className="text-3xl text-indigo-600" />,
      title: "Our Team",
      content: [
        {
          subtitle: "Leadership",
          items: [
            "Experienced banking professionals",
            "Technology innovators",
            "Customer service experts",
            "Financial advisors"
          ]
        },
        {
          subtitle: "Our Culture",
          items: [
            "Customer-first approach",
            "Innovation-driven mindset",
            "Collaborative environment",
            "Continuous learning"
          ]
        }
      ]
    },
    {
      icon: <FaChartLine className="text-3xl text-indigo-600" />,
      title: "Growth & Achievements",
      content: [
        {
          subtitle: "Milestones",
          items: [
            "Serving 1M+ customers globally",
            "Processing $1B+ in transactions",
            "Multiple industry awards",
            "Expansion to 20+ countries"
          ]
        },
        {
          subtitle: "Recognition",
          items: [
            "Best Digital Bank 2023",
            "Innovation Excellence Award",
            "Customer Service Champion",
            "Top Employer Award"
          ]
        }
      ]
    }
  ];

  return (
    <Layout>
      <div>
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white py-24 px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">About Us</h1>
          <p className="text-xl max-w-3xl mx-auto opacity-90">
            Discover our journey, values, and commitment to transforming banking for the better.
          </p>
        </section>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 py-16">
          {/* About Sections */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {sections.map((section, index) => (
              <div key={index} className="bg-white rounded-xl p-8 shadow-md hover:shadow-lg transition-shadow border border-gray-200 hover:border-indigo-200">
                <div className="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mb-6 border border-indigo-200">
                  {section.icon}
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">{section.title}</h3>
                {section.content.map((content, contentIndex) => (
                  <div key={contentIndex} className="mb-6">
                    <h4 className="text-xl font-semibold text-gray-800 mb-4">{content.subtitle}</h4>
                    <ul className="space-y-3">
                      {content.items.map((item, itemIndex) => (
                        <li key={itemIndex} className="flex items-center text-gray-600">
                          <FaCheck className="text-green-500 mr-2" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            ))}
          </div>

          {/* Values Section */}
          <section className="bg-white rounded-xl p-12 mb-16 shadow-md border border-gray-200 hover:border-indigo-200 transition-colors">
            <h2 className="text-3xl font-bold text-center mb-12">Our Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-gradient-to-br from-indigo-50 to-white p-6 rounded-lg shadow-sm border border-indigo-100 hover:border-indigo-200 transition-colors">
                <div className="bg-indigo-100 w-12 h-12 rounded-full flex items-center justify-center mb-4 border border-indigo-200">
                  <FaAward className="text-xl text-indigo-600" />
                </div>
                <h3 className="text-xl font-semibold mb-4">Excellence</h3>
                <p className="text-gray-600">
                  We strive for excellence in everything we do, from customer service to innovation.
                </p>
              </div>
              <div className="bg-gradient-to-br from-indigo-50 to-white p-6 rounded-lg shadow-sm border border-indigo-100 hover:border-indigo-200 transition-colors">
                <div className="bg-indigo-100 w-12 h-12 rounded-full flex items-center justify-center mb-4 border border-indigo-200">
                  <FaHandshake className="text-xl text-indigo-600" />
                </div>
                <h3 className="text-xl font-semibold mb-4">Integrity</h3>
                <p className="text-gray-600">
                  We conduct our business with the highest standards of integrity and transparency.
                </p>
              </div>
              <div className="bg-gradient-to-br from-indigo-50 to-white p-6 rounded-lg shadow-sm border border-indigo-100 hover:border-indigo-200 transition-colors">
                <div className="bg-indigo-100 w-12 h-12 rounded-full flex items-center justify-center mb-4 border border-indigo-200">
                  <FaGlobe className="text-xl text-indigo-600" />
                </div>
                <h3 className="text-xl font-semibold mb-4">Global Impact</h3>
                <p className="text-gray-600">
                  We aim to make a positive impact on communities worldwide through our services.
                </p>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="bg-gradient-to-br from-indigo-50 to-white rounded-xl p-12 text-center shadow-md border border-indigo-100 hover:border-indigo-200 transition-colors">
            <h2 className="text-3xl font-bold mb-4">Join Our Journey</h2>
            <p className="text-gray-600 max-w-2xl mx-auto mb-8">
              Be part of our mission to transform banking for the better.
            </p>
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <Link
                to="/careers"
                className="inline-flex items-center justify-center px-8 py-4 bg-indigo-600 text-white rounded-lg text-lg font-semibold hover:bg-indigo-700 transition-colors group"
              >
                <span className="flex items-center justify-center">
                  View Careers
                  <FaArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center justify-center px-8 py-4 bg-white text-indigo-600 rounded-lg text-lg font-semibold hover:bg-indigo-50 transition-colors border border-indigo-200 group"
              >
                <span className="flex items-center justify-center">
                  Contact Us
                  <FaArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
            </div>
          </section>
        </div>
      </div>
    </Layout>
  );
};

export default About; 