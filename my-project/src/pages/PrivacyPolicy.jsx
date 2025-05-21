import React from 'react';
import { Link } from 'react-router-dom';
import { FaShieldAlt, FaUserShield, FaLock, FaDatabase, FaCookieBite, FaUserCog } from 'react-icons/fa';

const PrivacyPolicy = () => {
  const sections = [
    {
      icon: <FaShieldAlt className="text-2xl text-blue-600" />,
      title: "Information We Collect",
      content: [
        {
          subtitle: "Personal Information",
          items: [
            "Name and contact information",
            "Date of birth and identification details",
            "Financial information and transaction history",
            "Account credentials and security information"
          ]
        },
        {
          subtitle: "Technical Information",
          items: [
            "IP address and device information",
            "Browser type and settings",
            "Operating system details",
            "Usage data and analytics"
          ]
        }
      ]
    },
    {
      icon: <FaUserShield className="text-2xl text-blue-600" />,
      title: "How We Use Your Information",
      content: [
        {
          subtitle: "Primary Uses",
          items: [
            "Provide and maintain our banking services",
            "Process transactions and manage accounts",
            "Verify your identity and prevent fraud",
            "Communicate important updates and notifications"
          ]
        },
        {
          subtitle: "Secondary Uses",
          items: [
            "Improve our services and user experience",
            "Develop new products and features",
            "Comply with legal obligations",
            "Send marketing communications (with consent)"
          ]
        }
      ]
    },
    {
      icon: <FaLock className="text-2xl text-blue-600" />,
      title: "Information Security",
      content: [
        {
          subtitle: "Security Measures",
          items: [
            "End-to-end encryption for data transmission",
            "Regular security audits and updates",
            "Multi-factor authentication",
            "Secure data storage and backup systems"
          ]
        },
        {
          subtitle: "Data Protection",
          items: [
            "Access controls and authentication",
            "Regular security training for staff",
            "Incident response procedures",
            "Compliance with industry standards"
          ]
        }
      ]
    },
    {
      icon: <FaDatabase className="text-2xl text-blue-600" />,
      title: "Data Sharing and Disclosure",
      content: [
        {
          subtitle: "When We Share",
          items: [
            "With your explicit consent",
            "To comply with legal requirements",
            "With service providers and partners",
            "During business transfers or mergers"
          ]
        },
        {
          subtitle: "Third-Party Services",
          items: [
            "Payment processors and financial institutions",
            "Cloud service providers",
            "Analytics and security services",
            "Customer support platforms"
          ]
        }
      ]
    },
    {
      icon: <FaCookieBite className="text-2xl text-blue-600" />,
      title: "Cookies and Tracking",
      content: [
        {
          subtitle: "Types of Cookies",
          items: [
            "Essential cookies for functionality",
            "Security and authentication cookies",
            "Analytics and performance cookies",
            "Marketing and preference cookies"
          ]
        },
        {
          subtitle: "Cookie Management",
          items: [
            "Browser settings for cookie control",
            "Opt-out options for tracking",
            "Cookie preferences dashboard",
            "Regular cookie policy updates"
          ]
        }
      ]
    },
    {
      icon: <FaUserCog className="text-2xl text-blue-600" />,
      title: "Your Rights and Choices",
      content: [
        {
          subtitle: "User Rights",
          items: [
            "Access your personal information",
            "Correct inaccurate data",
            "Request data deletion",
            "Object to data processing"
          ]
        },
        {
          subtitle: "Privacy Controls",
          items: [
            "Manage communication preferences",
            "Update privacy settings",
            "Export your data",
            "File privacy complaints"
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
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Privacy Policy</h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              We are committed to protecting your privacy and ensuring the security of your personal information.
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

            {/* Policy Sections */}
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
                If you have any questions about our Privacy Policy or how we handle your data, please contact us:
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

export default PrivacyPolicy; 