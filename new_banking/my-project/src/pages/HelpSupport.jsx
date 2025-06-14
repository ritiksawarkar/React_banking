import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { FaQuestionCircle, FaPhone, FaEnvelope, FaComments, FaSearch, FaChevronRight, FaShieldAlt, FaUserCircle, FaIdCard, FaFileAlt, FaChartLine, FaCog, FaSignOutAlt, FaArrowUp, FaArrowDown, FaClock, FaCalendarAlt, FaMoneyBillWave, FaUser } from 'react-icons/fa';
import DashboardHeader from '../components/DashboardPageHeader';
import DashboardPageFooter from '../components/DashboardPageFooter';

const HelpSupport = () => {
  useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Topics', icon: FaQuestionCircle },
    { id: 'account', name: 'Account & Security', icon: FaShieldAlt },
    { id: 'transactions', name: 'Transactions', icon: FaMoneyBillWave },
    { id: 'cards', name: 'Cards & Payments', icon: FaIdCard },
    { id: 'loans', name: 'Loans & Credit', icon: FaFileAlt },
    { id: 'investments', name: 'Investments', icon: FaChartLine }
  ];

  const faqs = [
    {
      id: 1,
      question: 'How do I reset my password?',
      answer: 'To reset your password, go to the login page and click on "Forgot Password". Follow the instructions sent to your registered email address.',
      category: 'account'
    },
    {
      id: 2,
      question: 'How do I enable two-factor authentication?',
      answer: 'Go to Account Security settings and click on "Enable Two-Factor Authentication". Follow the setup instructions to complete the process.',
      category: 'account'
    },
    {
      id: 3,
      question: 'How do I transfer money to another account?',
      answer: 'Go to the Transfer section, select the recipient account, enter the amount and follow the verification steps to complete the transfer.',
      category: 'transactions'
    },
    {
      id: 4,
      question: 'What are the transaction limits?',
      answer: 'Transaction limits vary based on your account type and verification level. You can check your specific limits in the Account Settings.',
      category: 'transactions'
    },
    {
      id: 5,
      question: 'How do I report a lost card?',
      answer: 'Immediately call our 24/7 customer support or use the mobile app to report a lost card. We will block the card and issue a replacement.',
      category: 'cards'
    }
  ];

  const filteredFaqs = faqs.filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-50">
      <DashboardHeader />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-24">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Help & Support</h1>

          {/* Search Bar */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-6">
            <div className="p-6">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search for help..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
                <FaSearch className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
              </div>
            </div>
          </div>

          {/* Categories */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-6">
            <div className="bg-gradient-to-r from-indigo-600 to-blue-600 px-6 py-4">
              <div className="flex items-center space-x-3">
                <FaQuestionCircle className="w-6 h-6 text-white" />
                <h2 className="text-xl font-semibold text-white">Categories</h2>
              </div>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`flex items-center space-x-3 p-4 rounded-lg transition-colors duration-200 ${
                      selectedCategory === category.id
                        ? 'bg-indigo-50 text-indigo-700'
                        : 'hover:bg-gray-50'
                    }`}
                  >
                    <category.icon className="w-6 h-6" />
                    <span className="font-medium">{category.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* FAQs */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="bg-gradient-to-r from-indigo-600 to-blue-600 px-6 py-4">
              <div className="flex items-center space-x-3">
                <FaComments className="w-6 h-6 text-white" />
                <h2 className="text-xl font-semibold text-white">Frequently Asked Questions</h2>
              </div>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {filteredFaqs.map((faq) => (
                  <div key={faq.id} className="border border-gray-200 rounded-lg">
                    <button
                      className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 rounded-lg"
                      onClick={() => {
                        // Handle FAQ expansion
                      }}
                    >
                      <div>
                        <h3 className="text-lg font-medium text-gray-900">{faq.question}</h3>
                        <p className="mt-1 text-sm text-gray-500">{faq.answer}</p>
                      </div>
                      <FaChevronRight className="w-5 h-5 text-gray-400" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Support */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <FaPhone className="w-6 h-6 text-indigo-600" />
                  <h3 className="text-lg font-medium text-gray-900">Call Us</h3>
                </div>
                <p className="text-gray-500 mb-4">Our customer support team is available 24/7</p>
                <a
                  href="tel:+1800123456"
                  className="text-indigo-600 hover:text-indigo-700 font-medium"
                >
                  +1 (800) 123-456
                </a>
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <FaEnvelope className="w-6 h-6 text-indigo-600" />
                  <h3 className="text-lg font-medium text-gray-900">Email Us</h3>
                </div>
                <p className="text-gray-500 mb-4">We'll respond within 24 hours</p>
                <a
                  href="mailto:support@bank.com"
                  className="text-indigo-600 hover:text-indigo-700 font-medium"
                >
                  support@bank.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>
      <DashboardPageFooter />
    </div>
  );
};

export default HelpSupport; 