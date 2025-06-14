import React, { useState } from 'react';
import { FaHeadset, FaQuestionCircle, FaBook, FaPhone, FaEnvelope, FaComments, FaSearch, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import DashboardHeader from '../components/DashboardHeader';

const HelpSupport = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedFaq, setExpandedFaq] = useState(null);

  const faqs = [
    {
      question: "How do I reset my password?",
      answer: "To reset your password, click on the 'Forgot Password' link on the login page. You'll receive an email with instructions to reset your password. Make sure to use a strong password that includes a mix of letters, numbers, and special characters."
    },
    {
      question: "How do I enable two-factor authentication?",
      answer: "You can enable two-factor authentication in your Account Security settings. Go to Settings > Security > Two-Factor Authentication and follow the setup process. We recommend using an authenticator app for enhanced security."
    },
    {
      question: "What should I do if I notice unauthorized transactions?",
      answer: "If you notice any unauthorized transactions, immediately contact our 24/7 support team. We'll help you secure your account and investigate the issue. You can also freeze your card temporarily through the mobile app or website."
    },
    {
      question: "How do I update my contact information?",
      answer: "You can update your contact information by going to Profile > Personal Information. Make sure to verify your new email or phone number through the verification process to ensure your account remains secure."
    },
    {
      question: "What are the transaction limits?",
      answer: "Transaction limits vary based on your account type and verification level. You can view your current limits in the Account Settings > Transaction Limits section. Contact support if you need to request a limit increase."
    }
  ];

  const supportChannels = [
    {
      title: "24/7 Customer Support",
      description: "Get immediate assistance from our support team",
      icon: <FaHeadset className="w-6 h-6" />,
      contact: "1800-123-4567",
      availability: "Available 24/7"
    },
    {
      title: "Email Support",
      description: "Send us an email and we'll respond within 24 hours",
      icon: <FaEnvelope className="w-6 h-6" />,
      contact: "support@finverse.com",
      availability: "Response within 24 hours"
    },
    {
      title: "Live Chat",
      description: "Chat with our support team in real-time",
      icon: <FaComments className="w-6 h-6" />,
      contact: "Start Chat",
      availability: "Available 8 AM - 10 PM"
    }
  ];

  const handleFaqToggle = (index) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };

  const filteredFaqs = faqs.filter(faq =>
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-50">
      <DashboardHeader />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-24">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Help & Support</h1>

          {/* Search Section */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-8">
            <div className="p-6">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search for help topics..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
                <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
            </div>
          </div>

          {/* Support Channels */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {supportChannels.map((channel, index) => (
              <div key={index} className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="p-3 bg-indigo-100 rounded-lg text-indigo-600">
                      {channel.icon}
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">{channel.title}</h3>
                  </div>
                  <p className="text-gray-600 mb-4">{channel.description}</p>
                  <div className="space-y-2">
                    <p className="text-indigo-600 font-medium">{channel.contact}</p>
                    <p className="text-sm text-gray-500">{channel.availability}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* FAQs Section */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="bg-gradient-to-r from-indigo-600 to-blue-600 px-6 py-4">
              <div className="flex items-center space-x-3">
                <FaQuestionCircle className="w-6 h-6 text-white" />
                <h2 className="text-xl font-semibold text-white">Frequently Asked Questions</h2>
              </div>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {filteredFaqs.map((faq, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg">
                    <button
                      onClick={() => handleFaqToggle(index)}
                      className="w-full px-6 py-4 text-left focus:outline-none"
                    >
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-medium text-gray-900">{faq.question}</h3>
                        {expandedFaq === index ? (
                          <FaChevronUp className="w-5 h-5 text-gray-500" />
                        ) : (
                          <FaChevronDown className="w-5 h-5 text-gray-500" />
                        )}
                      </div>
                    </button>
                    {expandedFaq === index && (
                      <div className="px-6 pb-4">
                        <p className="text-gray-600">{faq.answer}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Additional Resources */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="p-3 bg-green-100 rounded-lg text-green-600">
                    <FaBook className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">Knowledge Base</h3>
                </div>
                <p className="text-gray-600 mb-4">Browse our comprehensive knowledge base for detailed guides and tutorials.</p>
                <button className="text-indigo-600 hover:text-indigo-700 font-medium">
                  Visit Knowledge Base →
                </button>
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="p-3 bg-purple-100 rounded-lg text-purple-600">
                    <FaPhone className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">Emergency Support</h3>
                </div>
                <p className="text-gray-600 mb-4">For urgent assistance, contact our emergency support team.</p>
                <button className="text-indigo-600 hover:text-indigo-700 font-medium">
                  Contact Emergency Support →
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default HelpSupport; 