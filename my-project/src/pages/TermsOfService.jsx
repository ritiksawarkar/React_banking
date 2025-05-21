import React from 'react';
import { Link } from 'react-router-dom';
import { FaFileContract, FaUserCheck, FaMoneyBillWave, FaShieldAlt, FaExclamationTriangle, FaSync } from 'react-icons/fa';

const TermsOfService = () => {
  const sections = [
    {
      icon: <FaFileContract className="text-2xl text-blue-600" />,
      title: "Acceptance of Terms",
      content: [
        {
          subtitle: "Agreement to Terms",
          items: [
            "By accessing or using our services, you agree to be bound by these Terms",
            "You must be at least 18 years old to use our services",
            "You must have the legal capacity to enter into binding contracts",
            "You must comply with all applicable laws and regulations"
          ]
        },
        {
          subtitle: "Changes to Terms",
          items: [
            "We may modify these Terms at any time",
            "Continued use of services after changes constitutes acceptance",
            "We will notify you of significant changes",
            "You can review the current Terms at any time"
          ]
        }
      ]
    },
    {
      icon: <FaUserCheck className="text-2xl text-blue-600" />,
      title: "Account Registration",
      content: [
        {
          subtitle: "Account Requirements",
          items: [
            "Provide accurate and complete information",
            "Maintain the security of your account credentials",
            "Notify us immediately of any unauthorized access",
            "Keep your contact information up to date"
          ]
        },
        {
          subtitle: "Account Restrictions",
          items: [
            "One account per individual",
            "No sharing of account credentials",
            "No automated account creation",
            "No impersonation of others"
          ]
        }
      ]
    },
    {
      icon: <FaMoneyBillWave className="text-2xl text-blue-600" />,
      title: "Services and Fees",
      content: [
        {
          subtitle: "Service Description",
          items: [
            "Online banking and financial services",
            "Mobile banking applications",
            "Payment processing services",
            "Financial management tools"
          ]
        },
        {
          subtitle: "Fee Structure",
          items: [
            "Transaction fees and service charges",
            "Account maintenance fees",
            "Overdraft and penalty fees",
            "Third-party service fees"
          ]
        }
      ]
    },
    {
      icon: <FaShieldAlt className="text-2xl text-blue-600" />,
      title: "User Responsibilities",
      content: [
        {
          subtitle: "Security Obligations",
          items: [
            "Protect your account credentials",
            "Use secure devices and networks",
            "Report suspicious activity",
            "Maintain updated security software"
          ]
        },
        {
          subtitle: "Prohibited Activities",
          items: [
            "No fraudulent transactions",
            "No unauthorized access attempts",
            "No service interference",
            "No violation of laws or regulations"
          ]
        }
      ]
    },
    {
      icon: <FaExclamationTriangle className="text-2xl text-blue-600" />,
      title: "Limitation of Liability",
      content: [
        {
          subtitle: "Service Limitations",
          items: [
            "No guarantee of uninterrupted service",
            "No liability for third-party actions",
            "No responsibility for lost profits",
            "Limited liability for indirect damages"
          ]
        },
        {
          subtitle: "Indemnification",
          items: [
            "You agree to indemnify us",
            "Cover legal costs and damages",
            "Defend against third-party claims",
            "Protect our intellectual property"
          ]
        }
      ]
    },
    {
      icon: <FaSync className="text-2xl text-blue-600" />,
      title: "Termination and Suspension",
      content: [
        {
          subtitle: "Account Termination",
          items: [
            "We may terminate accounts for violations",
            "You may close your account at any time",
            "Termination may affect access to services",
            "Outstanding obligations remain after termination"
          ]
        },
        {
          subtitle: "Service Suspension",
          items: [
            "Temporary suspension for investigation",
            "Suspension for security concerns",
            "Suspension for policy violations",
            "Notice of suspension when possible"
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
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Terms of Service</h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Please read these terms carefully before using our banking services.
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

            {/* Terms Sections */}
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
                If you have any questions about our Terms of Service, please contact us:
              </p>
              <div className="space-y-2">
                <p className="text-gray-600">Email: legal@finverse.com</p>
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

export default TermsOfService; 