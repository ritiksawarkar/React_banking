import React from 'react';
import { FaChartLine, FaPiggyBank, FaShieldAlt, FaChartPie, FaChartBar, FaChartArea } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';

const Investments = () => {
  return (
    <Layout>
      <div >
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white py-24 px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Investment Solutions</h1>
          <p className="text-xl max-w-3xl mx-auto opacity-90">
            Grow your wealth with our expert investment solutions and personalized financial planning.
          </p>
        </section>

        <div className="max-w-7xl mx-auto px-4 py-16">
          {/* Investment Products Section */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-8">Our Investment Products</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white rounded-xl p-8 shadow-md">
                <FaChartLine className="text-4xl text-indigo-600 mb-6" />
                <h3 className="text-2xl font-semibold mb-4">Stocks & ETFs</h3>
                <p className="text-gray-600 mb-6">
                  Access global markets with our comprehensive stock trading platform and curated ETF selection.
                </p>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-center">
                    <span className="text-indigo-600 mr-2">•</span>
                    Real-time market data
                  </li>
                  <li className="flex items-center">
                    <span className="text-indigo-600 mr-2">•</span>
                    Commission-free trading
                  </li>
                  <li className="flex items-center">
                    <span className="text-indigo-600 mr-2">•</span>
                    Expert research reports
                  </li>
                </ul>
                <Link
                  to="/register"
                  className="block w-full bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors text-center"
                >
                  Start Trading
                </Link>
              </div>

              <div className="bg-white rounded-xl p-8 shadow-md">
                <FaPiggyBank className="text-4xl text-indigo-600 mb-6" />
                <h3 className="text-2xl font-semibold mb-4">Mutual Funds</h3>
                <p className="text-gray-600 mb-6">
                  Diversify your portfolio with our carefully selected mutual funds across various sectors.
                </p>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-center">
                    <span className="text-indigo-600 mr-2">•</span>
                    Professional management
                  </li>
                  <li className="flex items-center">
                    <span className="text-indigo-600 mr-2">•</span>
                    Regular income options
                  </li>
                  <li className="flex items-center">
                    <span className="text-indigo-600 mr-2">•</span>
                    Tax-efficient investing
                  </li>
                </ul>
                <Link
                  to="/register"
                  className="block w-full bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors text-center"
                >
                  Explore Funds
                </Link>
              </div>

              <div className="bg-white rounded-xl p-8 shadow-md">
                <FaShieldAlt className="text-4xl text-indigo-600 mb-6" />
                <h3 className="text-2xl font-semibold mb-4">Fixed Deposits</h3>
                <p className="text-gray-600 mb-6">
                  Secure your future with our competitive fixed deposit rates and flexible terms.
                </p>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-center">
                    <span className="text-indigo-600 mr-2">•</span>
                    Guaranteed returns
                  </li>
                  <li className="flex items-center">
                    <span className="text-indigo-600 mr-2">•</span>
                    Flexible tenures
                  </li>
                  <li className="flex items-center">
                    <span className="text-indigo-600 mr-2">•</span>
                    Auto-renewal options
                  </li>
                </ul>
                <Link
                  to="/register"
                  className="block w-full bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors text-center"
                >
                  Open FD
                </Link>
              </div>
            </div>
          </section>

          {/* Investment Tools Section */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-8">Investment Tools</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white rounded-xl p-8 shadow-md">
                <FaChartPie className="text-4xl text-indigo-600 mb-6" />
                <h3 className="text-2xl font-semibold mb-4">Portfolio Analyzer</h3>
                <p className="text-gray-600 mb-6">
                  Get detailed insights into your investment portfolio with our advanced analytics tools.
                </p>
                <Link
                  to="/register"
                  className="block w-full bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors text-center"
                >
                  Analyze Portfolio
                </Link>
              </div>

              <div className="bg-white rounded-xl p-8 shadow-md">
                <FaChartBar className="text-4xl text-indigo-600 mb-6" />
                <h3 className="text-2xl font-semibold mb-4">Market Research</h3>
                <p className="text-gray-600 mb-6">
                  Access comprehensive market research reports and expert analysis to make informed decisions.
                </p>
                <Link
                  to="/register"
                  className="block w-full bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors text-center"
                >
                  View Research
                </Link>
              </div>
            </div>
          </section>

          {/* Performance Section */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-8">Investment Performance</h2>
            <div className="bg-white rounded-xl p-8 shadow-md">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center">
                  <FaChartArea className="text-4xl text-indigo-600 mx-auto mb-4" />
                  <div className="text-3xl font-bold text-indigo-600 mb-2">12.5%</div>
                  <div className="text-gray-600">Average Annual Return</div>
                </div>
                <div className="text-center">
                  <FaChartLine className="text-4xl text-indigo-600 mx-auto mb-4" />
                  <div className="text-3xl font-bold text-indigo-600 mb-2">98%</div>
                  <div className="text-gray-600">Client Satisfaction</div>
                </div>
                <div className="text-center">
                  <FaChartPie className="text-4xl text-indigo-600 mx-auto mb-4" />
                  <div className="text-3xl font-bold text-indigo-600 mb-2">50K+</div>
                  <div className="text-gray-600">Active Investors</div>
                </div>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="bg-gray-50 rounded-xl p-12 text-center">
            <h2 className="text-3xl font-bold mb-4">Start Your Investment Journey</h2>
            <p className="text-gray-600 max-w-2xl mx-auto mb-8">
              Let our expert advisors help you build a portfolio that aligns with your financial goals.
            </p>
            <Link
              to="/register"
              className="inline-block bg-indigo-600 text-white px-8 py-4 rounded-lg text-lg font-medium hover:bg-indigo-700 transition-colors"
            >
              Schedule Consultation
            </Link>
          </section>
        </div>
      </div>
    </Layout>
  );
};

export default Investments; 