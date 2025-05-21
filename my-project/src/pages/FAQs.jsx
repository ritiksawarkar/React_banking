import React, { useState } from 'react';
import { FaChevronDown, FaChevronUp, FaSearch } from 'react-icons/fa';

const FAQs = () => {
  const [expandedCategory, setExpandedCategory] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const faqCategories = [
    {
      title: "Account & Security",
      faqs: [
        {
          question: "How do I create an account?",
          answer: "To create an account, click on the 'Sign Up' button in the top right corner. You'll need to provide your email address, create a password, and verify your identity. Follow the step-by-step instructions to complete the registration process."
        },
        {
          question: "How do I reset my password?",
          answer: "If you've forgotten your password, click on the 'Forgot Password' link on the login page. Enter your email address, and we'll send you instructions to reset your password. Make sure to check your spam folder if you don't receive the email."
        },
        {
          question: "Is my account secure?",
          answer: "Yes, we take security very seriously. We use industry-standard encryption, two-factor authentication, and regular security audits to protect your account. We also monitor for suspicious activity and notify you of any unusual login attempts."
        }
      ]
    },
    {
      title: "Transactions & Payments",
      faqs: [
        {
          question: "How do I make a transfer?",
          answer: "To make a transfer, log in to your account and navigate to the 'Transfers' section. Select the account you want to transfer from and to, enter the amount, and confirm the transfer. You can also set up recurring transfers for regular payments."
        },
        {
          question: "What are the transfer limits?",
          answer: "Transfer limits vary based on your account type and verification level. Standard accounts typically have a daily limit of $10,000 and a monthly limit of $50,000. You can view your specific limits in the 'Account Settings' section."
        },
        {
          question: "How long do transfers take?",
          answer: "Domestic transfers are typically processed within 1-2 business days. International transfers may take 3-5 business days. You can track the status of your transfer in the 'Transaction History' section."
        }
      ]
    },
    {
      title: "Fees & Charges",
      faqs: [
        {
          question: "What are the account fees?",
          answer: "We offer various account types with different fee structures. Basic accounts have no monthly maintenance fee, while premium accounts may have a monthly fee but offer additional benefits. You can view the complete fee schedule in the 'Fees & Charges' section."
        },
        {
          question: "Are there any hidden fees?",
          answer: "No, we believe in complete transparency. All fees are clearly disclosed in our fee schedule and terms of service. You'll be notified of any applicable fees before completing a transaction."
        }
      ]
    }
  ];

  const filteredFAQs = faqCategories.map(category => ({
    ...category,
    faqs: category.faqs.filter(faq =>
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(category => category.faqs.length > 0);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-r from-blue-50 to-indigo-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Find answers to common questions about our services
            </p>
            <div className="relative max-w-2xl mx-auto">
              <input
                type="text"
                placeholder="Search FAQs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-6 py-4 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <FaSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Categories */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {filteredFAQs.map((category, categoryIndex) => (
              <div key={categoryIndex} className="mb-12">
                <h2 className="text-2xl font-bold mb-6">{category.title}</h2>
                <div className="space-y-4">
                  {category.faqs.map((faq, faqIndex) => (
                    <div
                      key={faqIndex}
                      className="bg-white rounded-lg shadow-md overflow-hidden"
                    >
                      <button
                        className="w-full px-6 py-4 text-left flex justify-between items-center focus:outline-none"
                        onClick={() =>
                          setExpandedCategory(
                            expandedCategory === `${categoryIndex}-${faqIndex}`
                              ? null
                              : `${categoryIndex}-${faqIndex}`
                          )
                        }
                      >
                        <span className="font-semibold text-lg">{faq.question}</span>
                        {expandedCategory === `${categoryIndex}-${faqIndex}` ? (
                          <FaChevronUp className="text-blue-600" />
                        ) : (
                          <FaChevronDown className="text-blue-600" />
                        )}
                      </button>
                      {expandedCategory === `${categoryIndex}-${faqIndex}` && (
                        <div className="px-6 py-4 bg-gray-50">
                          <p className="text-gray-600">{faq.answer}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Support */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Still have questions?</h2>
            <p className="text-xl text-gray-600 mb-8">
              Our support team is here to help you 24/7
            </p>
            <button className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors">
              Contact Support
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FAQs; 