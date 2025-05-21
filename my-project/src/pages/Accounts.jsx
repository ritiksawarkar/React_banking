import React from 'react';
import { FaPiggyBank, FaBriefcase, FaGraduationCap, FaCheck } from 'react-icons/fa';

const Accounts = () => {
  return (
    <div className="pt-24">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white py-24 px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Banking Accounts</h1>
        <p className="text-xl max-w-3xl mx-auto opacity-90">
          Choose the perfect account that suits your financial needs and goals.
        </p>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        {/* Account Types */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {/* Savings Account */}
          <div className="bg-white rounded-xl p-8 shadow-md hover:shadow-lg transition-shadow">
            <FaPiggyBank className="text-4xl text-indigo-600 mb-6" />
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">Savings Account</h3>
            <p className="text-gray-600 mb-6">
              Grow your savings with competitive interest rates and zero maintenance fees.
            </p>
            <ul className="space-y-3 mb-6">
              <li className="flex items-center text-gray-600">
                <FaCheck className="text-green-500 mr-2" />
                High interest rates
              </li>
              <li className="flex items-center text-gray-600">
                <FaCheck className="text-green-500 mr-2" />
                Zero maintenance fees
              </li>
              <li className="flex items-center text-gray-600">
                <FaCheck className="text-green-500 mr-2" />
                Free ATM withdrawals
              </li>
              <li className="flex items-center text-gray-600">
                <FaCheck className="text-green-500 mr-2" />
                Mobile banking access
              </li>
            </ul>
            <button className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition-colors">
              Open Account
            </button>
          </div>

          {/* Business Account */}
          <div className="bg-white rounded-xl p-8 shadow-md hover:shadow-lg transition-shadow">
            <FaBriefcase className="text-4xl text-indigo-600 mb-6" />
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">Business Account</h3>
            <p className="text-gray-600 mb-6">
              Manage your business finances efficiently with our specialized accounts.
            </p>
            <ul className="space-y-3 mb-6">
              <li className="flex items-center text-gray-600">
                <FaCheck className="text-green-500 mr-2" />
                Business tools
              </li>
              <li className="flex items-center text-gray-600">
                <FaCheck className="text-green-500 mr-2" />
                Multi-user access
              </li>
              <li className="flex items-center text-gray-600">
                <FaCheck className="text-green-500 mr-2" />
                Invoice management
              </li>
              <li className="flex items-center text-gray-600">
                <FaCheck className="text-green-500 mr-2" />
                Business analytics
              </li>
            </ul>
            <button className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition-colors">
              Get Started
            </button>
          </div>

          {/* Student Account */}
          <div className="bg-white rounded-xl p-8 shadow-md hover:shadow-lg transition-shadow">
            <FaGraduationCap className="text-4xl text-indigo-600 mb-6" />
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">Student Account</h3>
            <p className="text-gray-600 mb-6">
              Perfect for students with zero fees and special benefits.
            </p>
            <ul className="space-y-3 mb-6">
              <li className="flex items-center text-gray-600">
                <FaCheck className="text-green-500 mr-2" />
                No minimum balance
              </li>
              <li className="flex items-center text-gray-600">
                <FaCheck className="text-green-500 mr-2" />
                Free debit card
              </li>
              <li className="flex items-center text-gray-600">
                <FaCheck className="text-green-500 mr-2" />
                Online banking
              </li>
              <li className="flex items-center text-gray-600">
                <FaCheck className="text-green-500 mr-2" />
                Student discounts
              </li>
            </ul>
            <button className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition-colors">
              Apply Now
            </button>
          </div>
        </div>

        {/* Benefits Section */}
        <section className="bg-gray-50 rounded-xl p-12 mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">Account Benefits</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">Digital Banking</h3>
              <p className="text-gray-600">
                Access your accounts anytime, anywhere with our mobile banking app.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">24/7 Support</h3>
              <p className="text-gray-600">
                Get assistance anytime with our round-the-clock customer support.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">Secure Transactions</h3>
              <p className="text-gray-600">
                Bank with confidence with our advanced security measures.
              </p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gray-50 rounded-xl p-12 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-8">
            Open your account today and experience the future of banking.
          </p>
          <button className="bg-indigo-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-indigo-700 transition-colors">
            Open an Account
          </button>
        </section>
      </div>
    </div>
  );
};

export default Accounts; 