import React from 'react';
import { Link } from 'react-router-dom';
import { FaCookie, FaShieldAlt, FaCog, FaHistory, FaEnvelope, FaFileContract } from 'react-icons/fa';

const CookiePolicy = () => {
  const sections = [
    {
      icon: <FaCookie className="text-2xl text-blue-600" />,
      title: "What Are Cookies",
      content: [
        {
          subtitle: "Definition and Purpose",
          items: [
            "Small text files stored on your device",
            "Help provide better user experience",
            "Enable essential website functionality",
            "Remember your preferences and settings"
          ]
        },
        {
          subtitle: "How They Work",
          items: [
            "Placed on your device when you visit our site",
            "Store information about your preferences",
            "Help us understand how you use our site",
            "Enable personalized features and services"
          ]
        }
      ]
    },
    {
      icon: <FaShieldAlt className="text-2xl text-blue-600" />,
      title: "How We Use Cookies",
      content: [
        {
          subtitle: "Essential Functions",
          items: [
            "Maintain your session and login status",
            "Remember your preferences",
            "Enable secure transactions",
            "Protect against fraud"
          ]
        },
        {
          subtitle: "Analytics and Improvement",
          items: [
            "Analyze website usage patterns",
            "Improve our services",
            "Enhance user experience",
            "Develop new features"
          ]
        }
      ]
    },
    {
      icon: <FaCog className="text-2xl text-blue-600" />,
      title: "Types of Cookies",
      content: [
        {
          subtitle: "Essential Cookies",
          items: [
            "Required for basic website functionality",
            "Cannot be disabled",
            "Enable secure login",
            "Maintain session information"
          ]
        },
        {
          subtitle: "Optional Cookies",
          items: [
            "Functional cookies for preferences",
            "Analytics cookies for usage data",
            "Marketing cookies for advertising",
            "Social media integration cookies"
          ]
        }
      ]
    },
    {
      icon: <FaCog className="text-2xl text-blue-600" />,
      title: "Managing Cookies",
      content: [
        {
          subtitle: "Browser Settings",
          items: [
            "Control cookie preferences",
            "Delete existing cookies",
            "Block specific types",
            "Set privacy preferences"
          ]
        },
        {
          subtitle: "Third-Party Tools",
          items: [
            "Cookie management extensions",
            "Privacy protection tools",
            "Analytics opt-out options",
            "Marketing preference centers"
          ]
        }
      ]
    },
    {
      icon: <FaHistory className="text-2xl text-blue-600" />,
      title: "Policy Updates",
      content: [
        {
          subtitle: "Changes to Policy",
          items: [
            "Regular policy reviews",
            "Notification of significant changes",
            "Updated last modified date",
            "Continued use implies acceptance"
          ]
        },
        {
          subtitle: "Your Rights",
          items: [
            "Right to be informed",
            "Right to access",
            "Right to control preferences",
            "Right to withdraw consent"
          ]
        }
      ]
    },
    {
      icon: <FaEnvelope className="text-2xl text-blue-600" />,
      title: "Contact Information",
      content: [
        {
          subtitle: "Questions and Support",
          items: [
            "Email: privacy@finverse.com",
            "Phone: +1 (555) 123-4567",
            "Hours: Monday - Friday, 9:00 AM - 5:00 PM EST",
            "Address: 123 Financial Street, Banking City, BC 12345"
          ]
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-24">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Cookie Policy</h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Learn how we use cookies to enhance your browsing experience and protect your privacy.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="prose prose-blue max-w-none">
            <p className="text-gray-600 mb-8">
              Last updated: {new Date().toLocaleDateString()}
            </p>

            {/* Cookie Sections */}
            {sections.map((section, index) => (
              <div key={index} className="mb-12">
                <div className="flex items-center mb-6">
                  {section.icon}
                  <h2 className="text-2xl font-bold text-gray-900 ml-3">{section.title}</h2>
                </div>
                
                {section.content.map((content, contentIndex) => (
                  <div key={contentIndex} className="mb-6">
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">{content.subtitle}</h3>
                    <ul className="list-disc list-inside space-y-2 text-gray-600">
                      {content.items.map((item, itemIndex) => (
                        <li key={itemIndex}>{item}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            ))}

            {/* Contact Section */}
            <div className="mt-12 pt-8 border-t border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Us</h2>
              <p className="text-gray-600 mb-4">
                If you have any questions about our Cookie Policy, please contact us:
              </p>
              <div className="space-y-2">
                <p className="text-gray-600">Email: privacy@finverse.com</p>
                <p className="text-gray-600">Phone: +1 (555) 123-4567</p>
                <p className="text-gray-600">Address: 123 Financial Street, Banking City, BC 12345</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer CTA */}
      <section className="bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Need More Information?</h2>
          <p className="text-gray-600 mb-8">
            Visit our Help Center or contact our support team for assistance.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link
              to="/help-center"
              className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
            >
              Visit Help Center
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
              Contact Support
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CookiePolicy; 