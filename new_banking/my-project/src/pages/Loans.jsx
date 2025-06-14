import React, { useState } from 'react';
import { FaHome, FaCar, FaBriefcase, FaCheck } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';

const Loans = () => {
  const [loanAmount, setLoanAmount] = useState('');
  const [interestRate, setInterestRate] = useState('');
  const [loanTenure, setLoanTenure] = useState('');
  const [emi, setEmi] = useState(null);
  const [totalAmount, setTotalAmount] = useState(null);
  const [totalInterest, setTotalInterest] = useState(null);

  const calculateEMI = (e) => {
    e.preventDefault();
    
    // Convert inputs to numbers
    const P = parseFloat(loanAmount);
    const r = parseFloat(interestRate) / 12 / 100; // Monthly interest rate
    const n = parseFloat(loanTenure) * 12; // Total number of months

    if (P && r && n) {
      // EMI = P * r * (1 + r)^n / ((1 + r)^n - 1)
      const emiAmount = P * r * Math.pow(1 + r, n) / (Math.pow(1 + r, n) - 1);
      const totalAmount = emiAmount * n;
      const totalInterestAmount = totalAmount - P;

      setEmi(emiAmount.toFixed(2));
      setTotalAmount(totalAmount.toFixed(2));
      setTotalInterest(totalInterestAmount.toFixed(2));
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(amount);
  };

  return (
    <Layout>
      <div >
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white py-24 px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Flexible Loan Solutions</h1>
          <p className="text-xl max-w-3xl mx-auto opacity-90">
            Get the financial support you need with our competitive loan options and quick approval process.
          </p>
        </section>

        <div className="max-w-7xl mx-auto px-4 py-16">
          {/* Loan Types */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="bg-white rounded-xl p-8 shadow-md hover:shadow-lg transition-shadow">
              <FaHome className="text-4xl text-indigo-600 mb-6" />
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Home Loans</h3>
              <p className="text-gray-600 mb-6">Turn your dream home into reality with our competitive home loan options.</p>
              <ul className="space-y-3 mb-6">
                <li className="flex items-center text-gray-600">
                  <FaCheck className="text-green-500 mr-2" /> Low interest rates
                </li>
                <li className="flex items-center text-gray-600">
                  <FaCheck className="text-green-500 mr-2" /> Flexible repayment terms
                </li>
                <li className="flex items-center text-gray-600">
                  <FaCheck className="text-green-500 mr-2" /> Quick approval process
                </li>
                <li className="flex items-center text-gray-600">
                  <FaCheck className="text-green-500 mr-2" /> No hidden charges
                </li>
              </ul>
              <Link
                to="/register"
                className="block w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition-colors text-center"
              >
                Apply Now
              </Link>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-md hover:shadow-lg transition-shadow">
              <FaCar className="text-4xl text-indigo-600 mb-6" />
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Auto Loans</h3>
              <p className="text-gray-600 mb-6">Drive your dream car with our hassle-free auto loan solutions.</p>
              <ul className="space-y-3 mb-6">
                <li className="flex items-center text-gray-600">
                  <FaCheck className="text-green-500 mr-2" /> Competitive rates
                </li>
                <li className="flex items-center text-gray-600">
                  <FaCheck className="text-green-500 mr-2" /> Zero processing fee
                </li>
                <li className="flex items-center text-gray-600">
                  <FaCheck className="text-green-500 mr-2" /> Fast disbursement
                </li>
                <li className="flex items-center text-gray-600">
                  <FaCheck className="text-green-500 mr-2" /> Flexible EMI options
                </li>
              </ul>
              <Link
                to="/register"
                className="block w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition-colors text-center"
              >
                Get Started
              </Link>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-md hover:shadow-lg transition-shadow">
              <FaBriefcase className="text-4xl text-indigo-600 mb-6" />
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Business Loans</h3>
              <p className="text-gray-600 mb-6">Fuel your business growth with our tailored business loan solutions.</p>
              <ul className="space-y-3 mb-6">
                <li className="flex items-center text-gray-600">
                  <FaCheck className="text-green-500 mr-2" /> High loan amounts
                </li>
                <li className="flex items-center text-gray-600">
                  <FaCheck className="text-green-500 mr-2" /> Minimal documentation
                </li>
                <li className="flex items-center text-gray-600">
                  <FaCheck className="text-green-500 mr-2" /> Quick processing
                </li>
                <li className="flex items-center text-gray-600">
                  <FaCheck className="text-green-500 mr-2" /> Business support
                </li>
              </ul>
              <Link
                to="/register"
                className="block w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition-colors text-center"
              >
                Learn More
              </Link>
            </div>
          </div>

          {/* Loan Calculator Section */}
          <section className="bg-gray-50 rounded-xl p-8 mb-16">
            <h2 className="text-3xl font-bold text-center mb-8">Loan Calculator</h2>
            <div className="max-w-4xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Calculator Form */}
                <div className="bg-white rounded-xl p-6 shadow-md">
                  <h3 className="text-xl font-semibold mb-6">EMI Calculator</h3>
                  <form onSubmit={calculateEMI} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Loan Amount ($)</label>
                      <input
                        type="number"
                        value={loanAmount}
                        onChange={(e) => setLoanAmount(e.target.value)}
                        placeholder="Enter amount"
                        min="0"
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Interest Rate (%)</label>
                      <input
                        type="number"
                        value={interestRate}
                        onChange={(e) => setInterestRate(e.target.value)}
                        placeholder="Enter rate"
                        min="0"
                        max="100"
                        step="0.1"
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Loan Tenure (years)</label>
                      <input
                        type="number"
                        value={loanTenure}
                        onChange={(e) => setLoanTenure(e.target.value)}
                        placeholder="Enter tenure"
                        min="1"
                        max="30"
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition-colors"
                    >
                      Calculate EMI
                    </button>
                  </form>
                </div>

                {/* Results Display */}
                <div className="bg-white rounded-xl p-6 shadow-md">
                  <h3 className="text-xl font-semibold mb-6">Loan Summary</h3>
                  {emi ? (
                    <div className="space-y-6">
                      <div className="p-4 bg-gray-50 rounded-lg">
                        <p className="text-sm text-gray-600">Monthly EMI</p>
                        <p className="text-2xl font-bold text-indigo-600">{formatCurrency(emi)}</p>
                      </div>
                      <div className="p-4 bg-gray-50 rounded-lg">
                        <p className="text-sm text-gray-600">Total Interest</p>
                        <p className="text-2xl font-bold text-indigo-600">{formatCurrency(totalInterest)}</p>
                      </div>
                      <div className="p-4 bg-gray-50 rounded-lg">
                        <p className="text-sm text-gray-600">Total Amount</p>
                        <p className="text-2xl font-bold text-indigo-600">{formatCurrency(totalAmount)}</p>
                      </div>
                      <div className="mt-6">
                        <p className="text-sm text-gray-600 mb-2">Loan Details:</p>
                        <ul className="space-y-2 text-sm text-gray-600">
                          <li>• Principal Amount: {formatCurrency(loanAmount)}</li>
                          <li>• Interest Rate: {interestRate}% per annum</li>
                          <li>• Loan Tenure: {loanTenure} years</li>
                          <li>• Number of Payments: {parseInt(loanTenure) * 12} months</li>
                        </ul>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-gray-500">Enter loan details to calculate EMI</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </section>

          {/* Benefits Section */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-8">Why Choose FinVerse Loans?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white rounded-xl p-8 shadow-md">
                <h3 className="text-xl font-semibold mb-4">Quick Approval</h3>
                <p className="text-gray-600">Get your loan approved within 24 hours with minimal documentation.</p>
              </div>
              <div className="bg-white rounded-xl p-8 shadow-md">
                <h3 className="text-xl font-semibold mb-4">Competitive Rates</h3>
                <p className="text-gray-600">Enjoy the best interest rates in the market with flexible repayment options.</p>
              </div>
              <div className="bg-white rounded-xl p-8 shadow-md">
                <h3 className="text-xl font-semibold mb-4">Digital Process</h3>
                <p className="text-gray-600">Complete the entire loan process online with our user-friendly platform.</p>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="bg-gray-50 rounded-xl p-12 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Apply?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto mb-8">
              Take the first step towards achieving your financial goals with our easy loan application process.
            </p>
            <Link
              to="/register"
              className="inline-block bg-indigo-600 text-white px-8 py-4 rounded-lg text-lg font-medium hover:bg-indigo-700 transition-colors"
            >
              Apply for a Loan
            </Link>
          </section>
        </div>
      </div>
    </Layout>
  );
};

export default Loans; 