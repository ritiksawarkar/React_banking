import React from 'react';
import { Link } from 'react-router-dom';
import { FaShieldAlt, FaUserShield, FaDatabase, FaLock, FaHistory, FaEnvelope } from 'react-icons/fa';

const PrivacyPolicy = () => {
  const sections = [
    {
      icon: <FaShieldAlt className="text-2xl text-blue-600" />,
      title: "Information We Collect",
      content: [
        {
          subtitle: "Personal Information",
          items: [
            "Name and contact details",
            "Account information",
            "Transaction history",
            "Identification documents"
          ]
        },
        {
          subtitle: "Usage Information",
          items: [
            "Device and browser information",
            "IP address and location data",
            "Website usage patterns",
            "Communication preferences"
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
            "Provide banking services",
            "Process transactions",
            "Maintain your account",
            "Send important notifications"
          ]
        },
        {
          subtitle: "Secondary Uses",
          items: [
            "Improve our services",
            "Personalize your experience",
            "Prevent fraud",
            "Comply with legal obligations"
          ]
        }
      ]
    },
    {
      icon: <FaDatabase className="text-2xl text-blue-600" />,
      title: "Information Sharing",
      content: [
        {
          subtitle: "With Service Providers",
          items: [
            "Payment processors",
            "Cloud storage providers",
            "Security services",
            "Customer support platforms"
          ]
        },
        {
          subtitle: "Legal Requirements",
          items: [
            "Law enforcement requests",
            "Regulatory compliance",
            "Court orders",
            "Legal proceedings"
          ]
        }
      ]
    },
    {
      icon: <FaLock className="text-2xl text-blue-600" />,
      title: "Data Security",
      content: [
        {
          subtitle: "Protection Measures",
          items: [
            "Encryption of sensitive data",
            "Secure data centers",
            "Access controls",
            "Regular security audits"
          ]
        },
        {
          subtitle: "Your Responsibilities",
          items: [
            "Keep login credentials secure",
            "Report suspicious activity",
            "Update contact information",
            "Use secure networks"
          ]
        }
      ]
    },
    {
      icon: <FaHistory className="text-2xl text-blue-600" />,
      title: "Data Retention",
      content: [
        {
          subtitle: "Retention Periods",
          items: [
            "Account information while active",
            "Transaction records for 7 years",
            "Communication history for 2 years",
            "Analytics data for 1 year"
          ]
        },
        {
          subtitle: "Data Deletion",
          items: [
            "Right to request deletion",
            "Process for data removal",
            "Impact on services",
            "Backup retention"
          ]
        }
      ]
    },
    {
      icon: <FaEnvelope className="text-2xl text-blue-600" />,
      title: "Contact Information",
      content: [
        {
          subtitle: "Privacy Inquiries",
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
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Privacy Policy</h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Learn how we protect your privacy and handle your personal information.
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

            {/* Privacy Sections */}
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
                If you have any questions about our Privacy Policy, please contact us:
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
    </div>
  );
};

export default PrivacyPolicy; 