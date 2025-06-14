import React from 'react';
import { FaCreditCard, FaShieldAlt, FaLock, FaBell, FaArrowRight, FaChartLine, FaUserShield, FaCheck } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';

const Cards = () => {
  return (
    <Layout>
      <div>
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white py-24 px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Smart Banking Cards</h1>
          <p className="text-xl max-w-3xl mx-auto opacity-90">
            Experience seamless transactions with our range of feature-rich banking cards.
          </p>
        </section>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 py-16">
          {/* Card Types */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {/* Credit Card */}
            <div className="bg-white rounded-xl p-8 shadow-md hover:shadow-lg transition-shadow border border-gray-200 hover:border-indigo-200">
              <div className="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mb-6 border border-indigo-200">
                <FaCreditCard className="text-3xl text-indigo-600" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Credit Cards</h3>
              <p className="text-gray-600 mb-6">
                Enjoy premium benefits and rewards with our range of credit cards.
              </p>
              <ul className="space-y-3 mb-6">
                <li className="flex items-center text-gray-600">
                  <FaCheck className="text-green-500 mr-2" />
                  Cashback rewards
                </li>
                <li className="flex items-center text-gray-600">
                  <FaCheck className="text-green-500 mr-2" />
                  Travel benefits
                </li>
                <li className="flex items-center text-gray-600">
                  <FaCheck className="text-green-500 mr-2" />
                  Zero annual fee
                </li>
                <li className="flex items-center text-gray-600">
                  <FaCheck className="text-green-500 mr-2" />
                  Contactless payments
                </li>
              </ul>
              <Link
                to="/register"
                className="block w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition-colors text-center group"
              >
                <span className="flex items-center justify-center">
                  Apply Now
                  <FaArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
            </div>

            {/* Debit Card */}
            <div className="bg-white rounded-xl p-8 shadow-md hover:shadow-lg transition-shadow border border-gray-200 hover:border-indigo-200">
              <div className="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mb-6 border border-indigo-200">
                <FaCreditCard className="text-3xl text-indigo-600" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Debit Cards</h3>
              <p className="text-gray-600 mb-6">
                Access your funds instantly with our secure debit cards.
              </p>
              <ul className="space-y-3 mb-6">
                <li className="flex items-center text-gray-600">
                  <FaCheck className="text-green-500 mr-2" />
                  Zero transaction fees
                </li>
                <li className="flex items-center text-gray-600">
                  <FaCheck className="text-green-500 mr-2" />
                  ATM access worldwide
                </li>
                <li className="flex items-center text-gray-600">
                  <FaCheck className="text-green-500 mr-2" />
                  Real-time alerts
                </li>
                <li className="flex items-center text-gray-600">
                  <FaCheck className="text-green-500 mr-2" />
                  Digital wallet support
                </li>
              </ul>
              <Link
                to="/register"
                className="block w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition-colors text-center group"
              >
                <span className="flex items-center justify-center">
                  Get Started
                  <FaArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
            </div>

            {/* Prepaid Card */}
            <div className="bg-white rounded-xl p-8 shadow-md hover:shadow-lg transition-shadow border border-gray-200 hover:border-indigo-200">
              <div className="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mb-6 border border-indigo-200">
                <FaCreditCard className="text-3xl text-indigo-600" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Prepaid Cards</h3>
              <p className="text-gray-600 mb-6">
                Manage your expenses with our reloadable prepaid cards.
              </p>
              <ul className="space-y-3 mb-6">
                <li className="flex items-center text-gray-600">
                  <FaCheck className="text-green-500 mr-2" />
                  No credit check
                </li>
                <li className="flex items-center text-gray-600">
                  <FaCheck className="text-green-500 mr-2" />
                  Budget control
                </li>
                <li className="flex items-center text-gray-600">
                  <FaCheck className="text-green-500 mr-2" />
                  Online reloading
                </li>
                <li className="flex items-center text-gray-600">
                  <FaCheck className="text-green-500 mr-2" />
                  Family accounts
                </li>
              </ul>
              <Link
                to="/register"
                className="block w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition-colors text-center group"
              >
                <span className="flex items-center justify-center">
                  Learn More
                  <FaArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
            </div>
          </div>

          {/* Benefits Section */}
          <section className="bg-white rounded-xl p-12 mb-16 shadow-md border border-gray-200 hover:border-indigo-200 transition-colors">
            <h2 className="text-3xl font-bold text-center mb-12">Card Benefits</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-gradient-to-br from-indigo-50 to-white p-6 rounded-lg shadow-sm border border-indigo-100 hover:border-indigo-200 transition-colors">
                <div className="bg-indigo-100 w-12 h-12 rounded-full flex items-center justify-center mb-4 border border-indigo-200">
                  <FaChartLine className="text-xl text-indigo-600" />
                </div>
                <h3 className="text-xl font-semibold mb-4">Rewards Program</h3>
                <p className="text-gray-600">
                  Earn points on every transaction and redeem them for exciting rewards.
                </p>
              </div>
              <div className="bg-gradient-to-br from-indigo-50 to-white p-6 rounded-lg shadow-sm border border-indigo-100 hover:border-indigo-200 transition-colors">
                <div className="bg-indigo-100 w-12 h-12 rounded-full flex items-center justify-center mb-4 border border-indigo-200">
                  <FaUserShield className="text-xl text-indigo-600" />
                </div>
                <h3 className="text-xl font-semibold mb-4">Travel Insurance</h3>
                <p className="text-gray-600">
                  Enjoy comprehensive travel insurance coverage with premium cards.
                </p>
              </div>
              <div className="bg-gradient-to-br from-indigo-50 to-white p-6 rounded-lg shadow-sm border border-indigo-100 hover:border-indigo-200 transition-colors">
                <div className="bg-indigo-100 w-12 h-12 rounded-full flex items-center justify-center mb-4 border border-indigo-200">
                  <FaShieldAlt className="text-xl text-indigo-600" />
                </div>
                <h3 className="text-xl font-semibold mb-4">24/7 Support</h3>
                <p className="text-gray-600">
                  Get assistance anytime with our round-the-clock customer support.
                </p>
              </div>
            </div>
          </section>

          {/* Security Features Section */}
          <section className="bg-white rounded-xl p-12 mb-16 shadow-md border border-gray-200 hover:border-indigo-200 transition-colors">
            <h2 className="text-3xl font-bold text-center mb-12">Security Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-gradient-to-br from-indigo-50 to-white p-6 rounded-lg shadow-sm border border-indigo-100 hover:border-indigo-200 transition-colors">
                <div className="bg-indigo-100 w-12 h-12 rounded-full flex items-center justify-center mb-4 border border-indigo-200">
                  <FaShieldAlt className="text-xl text-indigo-600" />
                </div>
                <h3 className="text-xl font-semibold mb-4">Fraud Protection</h3>
                <p className="text-gray-600">
                  Advanced fraud detection and protection for all your transactions.
                </p>
              </div>
              <div className="bg-gradient-to-br from-indigo-50 to-white p-6 rounded-lg shadow-sm border border-indigo-100 hover:border-indigo-200 transition-colors">
                <div className="bg-indigo-100 w-12 h-12 rounded-full flex items-center justify-center mb-4 border border-indigo-200">
                  <FaLock className="text-xl text-indigo-600" />
                </div>
                <h3 className="text-xl font-semibold mb-4">Secure Transactions</h3>
                <p className="text-gray-600">
                  End-to-end encryption for all your card transactions.
                </p>
              </div>
              <div className="bg-gradient-to-br from-indigo-50 to-white p-6 rounded-lg shadow-sm border border-indigo-100 hover:border-indigo-200 transition-colors">
                <div className="bg-indigo-100 w-12 h-12 rounded-full flex items-center justify-center mb-4 border border-indigo-200">
                  <FaBell className="text-xl text-indigo-600" />
                </div>
                <h3 className="text-xl font-semibold mb-4">Instant Alerts</h3>
                <p className="text-gray-600">
                  Real-time notifications for all your card activities.
                </p>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="bg-gradient-to-br from-indigo-50 to-white rounded-xl p-12 text-center shadow-md border border-indigo-100 hover:border-indigo-200 transition-colors">
            <h2 className="text-3xl font-bold mb-4">Get Your Card Today</h2>
            <p className="text-gray-600 max-w-2xl mx-auto mb-8">
              Choose the perfect card for your needs and start enjoying exclusive benefits.
            </p>
            <Link
              to="/register"
              className="inline-block bg-indigo-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-indigo-700 transition-colors group"
            >
              <span className="flex items-center justify-center">
                Apply for a Card
                <FaArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
          </section>
        </div>
      </div>
    </Layout>
  );
};

export default Cards; 