import React from 'react';
import { Link } from 'react-router-dom';
import { FaHeadset, FaSearch, FaBook, FaQuestionCircle, FaPhone, FaEnvelope, FaComments } from 'react-icons/fa';
import Header from '../components/Header';
import Footer from '../components/Footer';

const HelpCenter = () => {
  const helpCategories = [
    {
      icon: <FaBook className="w-8 h-8" />,
      title: "Getting Started",
      description: "Learn the basics of using FinVerse and set up your account.",
      link: "#getting-started"
    },
    {
      icon: <FaSearch className="w-8 h-8" />,
      title: "Account Management",
      description: "Manage your account settings, security, and preferences.",
      link: "#account-management"
    },
    {
      icon: <FaComments className="w-8 h-8" />,
      title: "Transactions",
      description: "Learn about making transfers, payments, and managing your money.",
      link: "#transactions"
    },
    {
      icon: <FaQuestionCircle className="w-8 h-8" />,
      title: "Troubleshooting",
      description: "Find solutions to common issues and error messages.",
      link: "#troubleshooting"
    }
  ];

  const contactOptions = [
    {
      icon: <FaPhone className="w-6 h-6" />,
      title: "Phone Support",
      description: "Available 24/7",
      contact: "+1 (555) 123-4567"
    },
    {
      icon: <FaEnvelope className="w-6 h-6" />,
      title: "Email Support",
      description: "Response within 24 hours",
      contact: "support@finverse.com"
    },
    {
      icon: <FaHeadset className="w-6 h-6" />,
      title: "Live Chat",
      description: "Available 8 AM - 8 PM EST",
      contact: "Start Chat"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="pt-24 pb-16 bg-gradient-to-r from-blue-50 to-indigo-50">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                How can we help you?
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Find answers to your questions and get support for your FinVerse account
              </p>
              <div className="relative max-w-2xl mx-auto">
                <input
                  type="text"
                  placeholder="Search for help..."
                  className="w-full px-6 py-4 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-blue-600">
                  <FaSearch className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Help Categories */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Help Categories</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {helpCategories.map((category, index) => (
                <div
                  key={index}
                  className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
                >
                  <div className="text-blue-600 mb-4">{category.icon}</div>
                  <h3 className="text-xl font-semibold mb-2">{category.title}</h3>
                  <p className="text-gray-600 mb-4">{category.description}</p>
                  <Link
                    to={category.link}
                    className="text-blue-600 hover:text-blue-700 font-medium inline-flex items-center"
                  >
                    Learn more
                    <svg
                      className="w-4 h-4 ml-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Options */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Contact Us</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {contactOptions.map((option, index) => (
                <div
                  key={index}
                  className="bg-white p-6 rounded-lg shadow-md text-center"
                >
                  <div className="text-blue-600 mb-4 flex justify-center">
                    {option.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{option.title}</h3>
                  <p className="text-gray-600 mb-4">{option.description}</p>
                  <div className="text-blue-600 font-medium">{option.contact}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Preview */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12">
                Frequently Asked Questions
              </h2>
              <div className="space-y-6">
                {[
                  {
                    question: "How do I reset my password?",
                    answer:
                      "You can reset your password by clicking on the 'Forgot Password' link on the login page. Follow the instructions sent to your registered email address."
                  },
                  {
                    question: "How do I update my contact information?",
                    answer:
                      "You can update your contact information by going to Settings > Profile > Contact Information. Make sure to verify your new contact details."
                  },
                  {
                    question: "What should I do if I notice unauthorized transactions?",
                    answer:
                      "If you notice any unauthorized transactions, please contact our support team immediately. We'll help you secure your account and investigate the issue."
                  }
                ].map((faq, index) => (
                  <div
                    key={index}
                    className="bg-white p-6 rounded-lg shadow-md"
                  >
                    <h3 className="text-xl font-semibold mb-2">{faq.question}</h3>
                    <p className="text-gray-600">{faq.answer}</p>
                  </div>
                ))}
              </div>
              <div className="text-center mt-8">
                <Link
                  to="/faqs"
                  className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium"
                >
                  View all FAQs
                  <svg
                    className="w-4 h-4 ml-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default HelpCenter; 