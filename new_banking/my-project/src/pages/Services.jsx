import React from 'react';
import { Link } from 'react-router-dom';
import { FaCreditCard, FaMoneyBillWave, FaChartLine, FaShieldAlt, FaMobileAlt, FaGlobe } from 'react-icons/fa';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Services = () => {
  const services = [
    {
      icon: <FaCreditCard className="text-2xl text-blue-600" />,
      title: "Personal Banking",
      content: [
        {
          subtitle: "Account Services",
          items: [
            "Savings accounts with competitive rates",
            "Checking accounts with no hidden fees",
            "Debit cards with cashback rewards",
            "Mobile check deposit"
          ]
        },
        {
          subtitle: "Digital Features",
          items: [
            "24/7 online banking access",
            "Real-time transaction alerts",
            "Bill payment automation",
            "Budget tracking tools"
          ]
        }
      ]
    },
    {
      icon: <FaMoneyBillWave className="text-2xl text-blue-600" />,
      title: "Loans & Credit",
      content: [
        {
          subtitle: "Personal Loans",
          items: [
            "Personal loans with flexible terms",
            "Home improvement financing",
            "Debt consolidation options",
            "Quick approval process"
          ]
        },
        {
          subtitle: "Credit Services",
          items: [
            "Credit cards with rewards",
            "Credit line increases",
            "Balance transfer options",
            "Credit score monitoring"
          ]
        }
      ]
    },
    {
      icon: <FaChartLine className="text-2xl text-blue-600" />,
      title: "Investment Services",
      content: [
        {
          subtitle: "Investment Options",
          items: [
            "Retirement accounts (IRA, 401k)",
            "Mutual funds and ETFs",
            "Stock trading platform",
            "Investment advisory services"
          ]
        },
        {
          subtitle: "Wealth Management",
          items: [
            "Portfolio management",
            "Financial planning",
            "Tax optimization strategies",
            "Estate planning services"
          ]
        }
      ]
    },
    {
      icon: <FaShieldAlt className="text-2xl text-blue-600" />,
      title: "Business Banking",
      content: [
        {
          subtitle: "Business Accounts",
          items: [
            "Business checking accounts",
            "Merchant services",
            "Payroll solutions",
            "Business credit cards"
          ]
        },
        {
          subtitle: "Business Solutions",
          items: [
            "Business loans and lines of credit",
            "Equipment financing",
            "Commercial real estate loans",
            "Business insurance"
          ]
        }
      ]
    },
    {
      icon: <FaMobileAlt className="text-2xl text-blue-600" />,
      title: "Digital Banking",
      content: [
        {
          subtitle: "Mobile Banking",
          items: [
            "Mobile app for iOS and Android",
            "Biometric authentication",
            "Mobile wallet integration",
            "Quick transfer features"
          ]
        },
        {
          subtitle: "Online Services",
          items: [
            "Secure online banking",
            "Digital document storage",
            "Online account opening",
            "Virtual assistant support"
          ]
        }
      ]
    },
    {
      icon: <FaGlobe className="text-2xl text-blue-600" />,
      title: "International Services",
      content: [
        {
          subtitle: "Global Banking",
          items: [
            "International wire transfers",
            "Foreign currency accounts",
            "Global payment solutions",
            "International trade services"
          ]
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="pt-24 pb-16 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Services</h1>
              <p className="text-xl text-blue-100 max-w-3xl mx-auto">
                Discover our comprehensive range of banking and financial services designed to meet your needs.
              </p>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="prose prose-blue max-w-none">
              {/* Services Sections */}
              {services.map((service, index) => (
                <div key={index} className="mb-16">
                  <div className="flex items-center mb-6 pb-4 border-b border-gray-200">
                    <div className="bg-blue-50 p-3 rounded-lg">
                      {service.icon}
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 ml-4">{service.title}</h2>
                  </div>
                  
                  {service.content.map((content, contentIndex) => (
                    <div key={contentIndex} className="mb-8">
                      <h3 className="text-xl font-semibold text-gray-800 mb-4">{content.subtitle}</h3>
                      <ul className="space-y-3">
                        {content.items.map((item, itemIndex) => (
                          <li key={itemIndex} className="flex items-start">
                            <span className="flex-shrink-0 w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 mr-3"></span>
                            <span className="text-gray-600">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              ))}

              {/* CTA Section */}
              <div className="mt-12 pt-8 border-t border-gray-200">
                <div className="bg-blue-50 rounded-lg p-6 text-center">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Ready to Get Started?</h2>
                  <p className="text-gray-600 mb-6">
                    Explore our services and find the perfect solution for your financial needs.
                  </p>
                  <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
                    <Link
                      to="/contact"
                      className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                    >
                      Contact Us
                    </Link>
                    <Link
                      to="/about"
                      className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                    >
                      Learn More
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Services; 