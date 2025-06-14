import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

const PrivacyPolicy = () => {
  const sections = [
    {
      title: "1. Information We Collect",
      content: "We collect information that you provide directly to us, including but not limited to: name, email address, phone number, address, financial information, and any other information you choose to provide. We also collect information about your use of our services, including transaction history, account activity, and device information."
    },
    {
      title: "2. How We Use Your Information",
      content: "We use the information we collect to: provide, maintain, and improve our services; process transactions and send related information; send administrative information; respond to comments and questions; personalize your experience; monitor and analyze trends; detect, prevent, and address technical issues; and comply with legal obligations."
    },
    {
      title: "3. Information Sharing",
      content: "We do not sell or rent your personal information to third parties. We may share your information with: service providers who perform services on our behalf; business partners with whom we jointly offer products or services; in connection with a business transaction; and when required by law."
    },
    {
      title: "4. Data Security",
      content: "We implement appropriate technical and organizational measures to protect your personal information against unauthorized or unlawful processing, accidental loss, destruction, or damage. However, no method of transmission over the Internet or electronic storage is 100% secure."
    },
    {
      title: "5. Your Rights",
      content: "You have the right to: access your personal information; correct inaccurate information; request deletion of your information; object to processing of your information; request restriction of processing; request data portability; and withdraw consent. To exercise these rights, please contact us."
    },
    {
      title: "6. Cookies and Tracking",
      content: "We use cookies and similar tracking technologies to track activity on our services and hold certain information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our services."
    },
    {
      title: "7. Children's Privacy",
      content: "Our services are not directed to children under 13. We do not knowingly collect personal information from children under 13. If you are a parent or guardian and you are aware that your child has provided us with personal information, please contact us."
    },
    {
      title: "8. Changes to This Policy",
      content: "We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the 'Last Updated' date. You are advised to review this Privacy Policy periodically for any changes."
    },
    {
      title: "9. International Transfers",
      content: "Your information may be transferred to and processed in countries other than the country in which you reside. These countries may have data protection laws that are different from the laws of your country. We will take appropriate steps to ensure that your information receives an adequate level of protection."
    },
    {
      title: "10. Contact Us",
      content: "If you have any questions about this Privacy Policy, please contact us at privacy@finverse.com or through our contact form."
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
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Privacy Policy</h1>
              <p className="text-xl text-blue-100 max-w-3xl mx-auto">
                Learn how we collect, use, and protect your personal information
              </p>
            </div>
          </div>
        </section>

        {/* Privacy Content */}
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="prose prose-lg max-w-none">
              {sections.map((section, index) => (
                <div key={index} className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">{section.title}</h2>
                  <p className="text-gray-600">{section.content}</p>
                </div>
              ))}
            </div>

            {/* Last Updated */}
            <div className="mt-12 pt-8 border-t border-gray-200">
              <p className="text-gray-500 text-sm">
                Last updated: {new Date().toLocaleDateString()}
              </p>
            </div>

            {/* Related Links */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
              <Link
                to="/terms"
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                Terms of Service
              </Link>
              <Link
                to="/cookies"
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                Cookie Policy
              </Link>
              <Link
                to="/contact"
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default PrivacyPolicy; 