import React from 'react';
import { FaCreditCard, FaShieldAlt, FaLock, FaBell } from 'react-icons/fa';

const Cards = () => {
  return (
    <div className="pt-24">
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
          <div className="bg-white rounded-xl p-8 shadow-md hover:shadow-lg transition-shadow relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-600 to-blue-600"></div>
            <FaCreditCard className="text-4xl text-indigo-600 mb-6" />
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">Credit Cards</h3>
            <p className="text-gray-600 mb-6">
              Enjoy premium benefits and rewards with our range of credit cards.
            </p>
            <ul className="space-y-3 mb-6">
              <li className="flex items-center text-gray-600">
                <FaShieldAlt className="text-green-500 mr-2" />
                Cashback rewards
              </li>
              <li className="flex items-center text-gray-600">
                <FaShieldAlt className="text-green-500 mr-2" />
                Travel benefits
              </li>
              <li className="flex items-center text-gray-600">
                <FaShieldAlt className="text-green-500 mr-2" />
                Zero annual fee
              </li>
              <li className="flex items-center text-gray-600">
                <FaShieldAlt className="text-green-500 mr-2" />
                Contactless payments
              </li>
            </ul>
            <button className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition-colors">
              Apply Now
            </button>
          </div>

          {/* Debit Card */}
          <div className="bg-white rounded-xl p-8 shadow-md hover:shadow-lg transition-shadow relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-600 to-blue-600"></div>
            <FaCreditCard className="text-4xl text-indigo-600 mb-6" />
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">Debit Cards</h3>
            <p className="text-gray-600 mb-6">
              Access your funds instantly with our secure debit cards.
            </p>
            <ul className="space-y-3 mb-6">
              <li className="flex items-center text-gray-600">
                <FaShieldAlt className="text-green-500 mr-2" />
                Zero transaction fees
              </li>
              <li className="flex items-center text-gray-600">
                <FaShieldAlt className="text-green-500 mr-2" />
                ATM access worldwide
              </li>
              <li className="flex items-center text-gray-600">
                <FaShieldAlt className="text-green-500 mr-2" />
                Real-time alerts
              </li>
              <li className="flex items-center text-gray-600">
                <FaShieldAlt className="text-green-500 mr-2" />
                Digital wallet support
              </li>
            </ul>
            <button className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition-colors">
              Get Started
            </button>
          </div>

          {/* Prepaid Card */}
          <div className="bg-white rounded-xl p-8 shadow-md hover:shadow-lg transition-shadow relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-600 to-blue-600"></div>
            <FaCreditCard className="text-4xl text-indigo-600 mb-6" />
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">Prepaid Cards</h3>
            <p className="text-gray-600 mb-6">
              Manage your expenses with our reloadable prepaid cards.
            </p>
            <ul className="space-y-3 mb-6">
              <li className="flex items-center text-gray-600">
                <FaShieldAlt className="text-green-500 mr-2" />
                No credit check
              </li>
              <li className="flex items-center text-gray-600">
                <FaShieldAlt className="text-green-500 mr-2" />
                Budget control
              </li>
              <li className="flex items-center text-gray-600">
                <FaShieldAlt className="text-green-500 mr-2" />
                Online reloading
              </li>
              <li className="flex items-center text-gray-600">
                <FaShieldAlt className="text-green-500 mr-2" />
                Family accounts
              </li>
            </ul>
            <button className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition-colors">
              Learn More
            </button>
          </div>
        </div>

        {/* Benefits Section */}
        <section className="bg-gray-50 rounded-xl p-12 mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">Card Benefits</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">Rewards Program</h3>
              <p className="text-gray-600">
                Earn points on every transaction and redeem them for exciting rewards.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">Travel Insurance</h3>
              <p className="text-gray-600">
                Enjoy comprehensive travel insurance coverage with premium cards.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">24/7 Support</h3>
              <p className="text-gray-600">
                Get assistance anytime with our round-the-clock customer support.
              </p>
            </div>
          </div>
        </section>

        {/* Security Features Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">Security Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <FaShieldAlt className="text-3xl text-indigo-600 mb-4" />
              <h3 className="text-xl font-semibold mb-4">Fraud Protection</h3>
              <p className="text-gray-600">
                Advanced fraud detection and protection for all your transactions.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <FaLock className="text-3xl text-indigo-600 mb-4" />
              <h3 className="text-xl font-semibold mb-4">Secure Transactions</h3>
              <p className="text-gray-600">
                End-to-end encryption for all your card transactions.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <FaBell className="text-3xl text-indigo-600 mb-4" />
              <h3 className="text-xl font-semibold mb-4">Instant Alerts</h3>
              <p className="text-gray-600">
                Real-time notifications for all your card activities.
              </p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gray-50 rounded-xl p-12 text-center">
          <h2 className="text-3xl font-bold mb-4">Get Your Card Today</h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-8">
            Choose the perfect card for your needs and start enjoying exclusive benefits.
          </p>
          <button className="bg-indigo-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-indigo-700 transition-colors">
            Apply for a Card
          </button>
        </section>
      </div>
    </div>
  );
};

export default Cards; 