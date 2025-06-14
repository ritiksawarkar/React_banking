import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaShieldAlt, FaBolt, FaChartLine, FaMobileAlt, FaCreditCard, FaHeadset, FaCheckCircle, FaMapMarkerAlt, FaPhone, FaEnvelope, FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import Layout from '../components/Layout';

const Home = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const testimonials = [
    {
      content: "FinVerse has completely transformed how I manage my finances. The interface is intuitive, and the insights have helped me save more than ever before.",
      name: "Sarah Johnson",
      role: "Small Business Owner",
      avatar: "https://img.freepik.com/free-photo/portrait-smiling-businesswoman_23-2147965685.jpg"
    },
    {
      content: "The instant transfers and bill payment reminders have saved me from late fees countless times. FinVerse is truly banking made simple!",
      name: "Michael Chen",
      role: "Software Engineer",
      avatar: "https://img.freepik.com/free-photo/portrait-smiling-male-executive_23-2147965684.jpg"
    },
    {
      content: "As someone who travels frequently, having access to my accounts securely from anywhere in the world has been a game-changer. Highly recommend!",
      name: "Priya Sharma",
      role: "Travel Blogger",
      avatar: "https://img.freepik.com/free-photo/portrait-smiling-female-executive_23-2147965686.jpg"
    }
  ];

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

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
            {[
              {
                icon: <FaShieldAlt className="w-8 h-8" />,
                title: "Secure Banking",
                description: "Bank with confidence knowing your data is protected with industry-leading security measures."
              },
              {
                icon: <FaBolt className="w-8 h-8" />,
                title: "Instant Transfers",
                description: "Send and receive money instantly, anytime and anywhere with zero waiting time."
              },
              {
                icon: <FaChartLine className="w-8 h-8" />,
                title: "Financial Insights",
                description: "Gain valuable insights into your spending habits and financial health."
              },
              {
                icon: <FaMobileAlt className="w-8 h-8" />,
                title: "Mobile Banking",
                description: "Access all banking features on the go with our responsive mobile platform."
              },
              {
                icon: <FaCreditCard className="w-8 h-8" />,
                title: "Smart Cards",
                description: "Manage your cards, set limits, and enable/disable features with a single tap."
              },
              {
                icon: <FaHeadset className="w-8 h-8" />,
                title: "24/7 Support",
                description: "Our dedicated support team is available round the clock to assist you."
              }
            ].map((feature, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="text-blue-600 text-3xl mb-4">
                  {feature.icon}
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
                {[
                  "No hidden fees or charges",
                  "Higher interest rates on savings",
                  "Personalized financial advice",
                  "Seamless integration with other financial tools",
                  "Reward points on every transaction",
                  "Paperless banking experience"
                ].map((benefit, index) => (
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

      {/* Testimonials Section */}
      <section id="testimonials" className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">What Our Customers Say</h2>
          <div className="relative max-w-3xl mx-auto">
            <div className="bg-white p-8 rounded-lg shadow-md">
              <p className="text-gray-600 mb-6">{testimonials[currentTestimonial].content}</p>
              <div className="flex items-center">
                <img
                  src={testimonials[currentTestimonial].avatar}
                  alt={testimonials[currentTestimonial].name}
                  className="w-12 h-12 rounded-full mr-4"
                />
                <div>
                  <h4 className="font-semibold">{testimonials[currentTestimonial].name}</h4>
                  <p className="text-gray-500">{testimonials[currentTestimonial].role}</p>
                </div>
              </div>
            </div>
            <div className="flex justify-center mt-6 space-x-4">
              <button
                onClick={prevTestimonial}
                className="p-2 rounded-full bg-gray-100 hover:bg-gray-200"
              >
                <FaChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={nextTestimonial}
                className="p-2 rounded-full bg-gray-100 hover:bg-gray-200"
              >
                <FaChevronRight className="w-4 h-4" />
              </button>
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

export default Home; 