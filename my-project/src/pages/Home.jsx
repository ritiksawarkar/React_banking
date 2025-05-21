import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';

const Home = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:60px_60px]"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                Banking Reimagined for the{' '}
                <span className="bg-gradient-to-r from-blue-200 to-white bg-clip-text text-transparent">
                  Digital Age
                </span>
              </h1>
              <p className="text-xl text-blue-100 leading-relaxed">
                Experience seamless, secure, and smart banking with FinVerse. Your financial future starts here.
              </p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <Link
                  to="/register"
                  className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-blue-50 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl text-center"
                >
                  Get Started
                </Link>
                <Link
                  to="#features"
                  className="border-2 border-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transform hover:scale-105 transition-all duration-200 text-center"
                >
                  Learn More
                </Link>
              </div>
            </div>
            <div className="hidden md:block relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-blue-800/20 rounded-2xl transform rotate-3"></div>
              <img
                src="https://img.freepik.com/free-vector/banking-app-interface-concept-illustration_114360-1082.jpg"
                alt="Digital Banking Platform"
                className="rounded-2xl shadow-2xl transform -rotate-3 hover:rotate-0 transition-all duration-500"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose <span className="text-blue-600">FinVerse</span>?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover the features that make us the preferred choice for modern banking
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="text-blue-600 text-3xl mb-4">
                  <i className={feature.icon}></i>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                Experience the{' '}
                <span className="text-blue-600">FinVerse Advantage</span>
              </h2>
              <ul className="space-y-6">
                {benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start space-x-4 group">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center group-hover:bg-blue-600 transition-colors duration-200">
                      <i className="fas fa-check text-blue-600 group-hover:text-white transition-colors duration-200"></i>
                    </div>
                    <span className="text-gray-700 text-lg">{benefit}</span>
                  </li>
                ))}
              </ul>
              <Link
                to="/register"
                className="inline-block bg-gradient-to-r from-blue-600 to-blue-800 text-white px-8 py-4 rounded-lg font-semibold hover:from-blue-700 hover:to-blue-900 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                Open an Account
              </Link>
            </div>
            <div className="hidden md:block relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-blue-800/20 rounded-2xl transform -rotate-3"></div>
              <img
                src="https://img.freepik.com/free-vector/banking-app-interface-concept-illustration_114360-1081.jpg"
                alt="Mobile Banking Benefits"
                className="rounded-2xl shadow-2xl transform rotate-3 hover:rotate-0 transition-all duration-500"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">
            Ready to Transform Your Banking Experience?
          </h2>
          <p className="text-xl text-blue-100 mb-12 max-w-3xl mx-auto">
            Join thousands of satisfied customers who have already made the switch to FinVerse.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link
              to="/register"
              className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-blue-50 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              Get Started Now
            </Link>
            <Link
              to="/contact"
              className="border-2 border-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transform hover:scale-105 transition-all duration-200"
            >
              Contact Sales
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

const features = [
  {
    icon: 'fas fa-shield-alt',
    title: 'Secure Banking',
    description: 'Bank with confidence knowing your data is protected with industry-leading security measures.',
  },
  {
    icon: 'fas fa-bolt',
    title: 'Instant Transfers',
    description: 'Send and receive money instantly, anytime and anywhere with zero waiting time.',
  },
  {
    icon: 'fas fa-chart-line',
    title: 'Financial Insights',
    description: 'Gain valuable insights into your spending habits and financial health.',
  },
  {
    icon: 'fas fa-mobile-alt',
    title: 'Mobile Banking',
    description: 'Access all banking features on the go with our responsive mobile platform.',
  },
  {
    icon: 'fas fa-credit-card',
    title: 'Smart Cards',
    description: 'Manage your cards, set limits, and enable/disable features with a single tap.',
  },
  {
    icon: 'fas fa-headset',
    title: '24/7 Support',
    description: 'Our dedicated support team is available round the clock to assist you.',
  },
];

const benefits = [
  'No hidden fees or charges',
  'Higher interest rates on savings',
  'Personalized financial advice',
  'Seamless integration with other financial tools',
  'Reward points on every transaction',
  'Paperless banking experience',
];

export default Home; 