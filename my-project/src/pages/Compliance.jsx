import React from 'react';
import { Link } from 'react-router-dom';
import { FaShieldAlt, FaUserShield, FaGavel, FaLock, FaHistory, FaEnvelope } from 'react-icons/fa';

const Compliance = () => {
  const sections = [
    {
      icon: <FaShieldAlt className="text-2xl text-blue-600" />,
      title: "Regulatory Framework",
      content: [
        {
          subtitle: "Banking Regulations",
          items: [
            "Bank Secrecy Act (BSA)",
            "Anti-Money Laundering (AML)",
            "Know Your Customer (KYC)",
            "Office of Foreign Assets Control (OFAC)"
          ]
        },
        {
          subtitle: "Data Protection",
          items: [
            "General Data Protection Regulation (GDPR)",
            "California Consumer Privacy Act (CCPA)",
            "Payment Card Industry (PCI) DSS",
            "Financial Industry Regulatory Authority (FINRA)"
          ]
        }
      ]
    },
    {
      icon: <FaUserShield className="text-2xl text-blue-600" />,
      title: "Customer Protection",
      content: [
        {
          subtitle: "Security Measures",
          items: [
            "Multi-factor authentication",
            "Encryption protocols",
            "Secure data storage",
            "Regular security audits"
          ]
        },
        {
          subtitle: "Privacy Controls",
          items: [
            "Data minimization",
            "Access controls",
            "Privacy by design",
            "Regular privacy assessments"
          ]
        }
      ]
    },
    {
      icon: <FaGavel className="text-2xl text-blue-600" />,
      title: "Legal Compliance",
      content: [
        {
          subtitle: "Regulatory Reporting",
          items: [
            "Suspicious Activity Reports (SARs)",
            "Currency Transaction Reports (CTRs)",
            "Annual compliance reviews",
            "Regulatory filings"
          ]
        },
        {
          subtitle: "Risk Management",
          items: [
            "Risk assessments",
            "Compliance monitoring",
            "Internal controls",
            "Audit trails"
          ]
        }
      ]
    },
    {
      icon: <FaLock className="text-2xl text-blue-600" />,
      title: "Security Standards",
      content: [
        {
          subtitle: "Technical Controls",
          items: [
            "Network security",
            "Application security",
            "Endpoint protection",
            "Cloud security"
          ]
        },
        {
          subtitle: "Operational Controls",
          items: [
            "Access management",
            "Change control",
            "Incident response",
            "Disaster recovery"
          ]
        }
      ]
    },
    {
      icon: <FaHistory className="text-2xl text-blue-600" />,
      title: "Monitoring and Reporting",
      content: [
        {
          subtitle: "Compliance Monitoring",
          items: [
            "Transaction monitoring",
            "Customer due diligence",
            "Sanctions screening",
            "Risk-based reviews"
          ]
        },
        {
          subtitle: "Reporting Requirements",
          items: [
            "Regulatory reporting",
            "Internal reporting",
            "Audit reporting",
            "Compliance metrics"
          ]
        }
      ]
    },
    {
      icon: <FaEnvelope className="text-2xl text-blue-600" />,
      title: "Contact Information",
      content: [
        {
          subtitle: "Compliance Inquiries",
          items: [
            "Email: compliance@finverse.com",
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
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Compliance</h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Our commitment to regulatory compliance and security standards.
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

            {/* Compliance Sections */}
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
                If you have any questions about our compliance policies, please contact us:
              </p>
              <div className="space-y-2">
                <p className="text-gray-600">Email: compliance@finverse.com</p>
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
            Visit our Help Center or contact our compliance team for assistance.
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
              Contact Compliance Team
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Compliance; 