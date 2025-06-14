import React from 'react';
import { Link } from 'react-router-dom';
import { FaFileContract, FaUserCheck, FaShieldAlt, FaGavel, FaExclamationTriangle, FaEnvelope } from 'react-icons/fa';

const TermsOfService = () => {
  const sections = [
    {
      icon: <FaFileContract className="text-2xl text-blue-600" />,
      title: "Agreement to Terms",
      content: [
        {
          subtitle: "Acceptance",
          items: [
            "By accessing our services, you agree to these terms",
            "You must be at least 18 years old",
            "You must have legal capacity to enter into contracts",
            "You must provide accurate information"
          ]
        },
        {
          subtitle: "Changes to Terms",
          items: [
            "We may modify these terms at any time",
            "Changes will be effective upon posting",
            "Continued use implies acceptance",
            "Material changes will be notified"
          ]
        }
      ]
    },
    {
      icon: <FaUserCheck className="text-2xl text-blue-600" />,
      title: "Account Responsibilities",
      content: [
        {
          subtitle: "Account Security",
          items: [
            "Maintain confidentiality of credentials",
            "Notify us of unauthorized access",
            "Use strong passwords",
            "Enable two-factor authentication"
          ]
        },
        {
          subtitle: "Account Usage",
          items: [
            "Use services for lawful purposes",
            "Maintain accurate information",
            "Comply with all applicable laws",
            "Report suspicious activity"
          ]
        }
      ]
    },
    {
      icon: <FaShieldAlt className="text-2xl text-blue-600" />,
      title: "Service Usage",
      content: [
        {
          subtitle: "Permitted Activities",
          items: [
            "Personal banking transactions",
            "Bill payments",
            "Money transfers",
            "Account management"
          ]
        },
        {
          subtitle: "Prohibited Activities",
          items: [
            "Fraudulent transactions",
            "Money laundering",
            "Unauthorized access",
            "Service disruption"
          ]
        }
      ]
    },
    {
      icon: <FaGavel className="text-2xl text-blue-600" />,
      title: "Legal Compliance",
      content: [
        {
          subtitle: "Regulatory Requirements",
          items: [
            "Anti-money laundering laws",
            "Know Your Customer (KYC) rules",
            "Data protection regulations",
            "Financial services laws"
          ]
        },
        {
          subtitle: "Enforcement",
          items: [
            "Right to investigate violations",
            "Account suspension or termination",
            "Legal action for breaches",
            "Reporting to authorities"
          ]
        }
      ]
    },
    {
      icon: <FaExclamationTriangle className="text-2xl text-blue-600" />,
      title: "Limitations of Liability",
      content: [
        {
          subtitle: "Service Limitations",
          items: [
            "No guarantee of uninterrupted service",
            "Technical issues may occur",
            "Third-party service dependencies",
            "Force majeure events"
          ]
        },
        {
          subtitle: "Liability Exclusions",
          items: [
            "Indirect or consequential damages",
            "Lost profits or data",
            "Service interruptions",
            "Third-party actions"
          ]
        }
      ]
    },
    {
      icon: <FaEnvelope className="text-2xl text-blue-600" />,
      title: "Contact Information",
      content: [
        {
          subtitle: "Legal Inquiries",
          items: [
            "Email: legal@finverse.com",
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
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Terms of Service</h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Please read these terms carefully before using our services.
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
    </div>
  );
};

export default TermsOfService; 