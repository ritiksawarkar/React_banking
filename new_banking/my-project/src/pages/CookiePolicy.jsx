import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

const CookiePolicy = () => {
  const sections = [
    {
      title: "1. What Are Cookies",
      content: "Cookies are small text files that are placed on your computer or mobile device when you visit our website. They are widely used to make websites work more efficiently and provide a better user experience. Cookies can be 'persistent' or 'session' cookies. Persistent cookies remain on your device when you go offline, while session cookies are deleted as soon as you close your web browser."
    },
    {
      title: "2. How We Use Cookies",
      content: "We use cookies for several purposes, including: to enable certain functions of the website, to provide analytics, to store your preferences, to enable advertisements delivery, and to share on social media platforms. We use both session and persistent cookies on our website."
    },
    {
      title: "3. Types of Cookies We Use",
      content: "Essential cookies: Required for the website to function properly. These cookies enable core functionality such as security, network management, and accessibility. Analytics cookies: Help us understand how visitors interact with our website by collecting and reporting information anonymously. Preference cookies: Enable our website to remember information that changes the way the website behaves or looks. Marketing cookies: Used to track visitors across websites to display relevant advertisements."
    },
    {
      title: "4. Third-Party Cookies",
      content: "In addition to our own cookies, we may also use various third-party cookies to report usage statistics of the website, deliver advertisements on and through the website, and so on. These cookies are placed by third-party services that appear on our pages."
    },
    {
      title: "5. Managing Cookies",
      content: "Most web browsers allow you to control cookies through their settings preferences. However, limiting cookies may impact your experience using our website. You can set your browser to refuse all or some browser cookies, or to alert you when websites set or access cookies."
    },
    {
      title: "6. Cookie Duration",
      content: "The length of time a cookie will stay on your computer or mobile device depends on whether it is a 'persistent' or 'session' cookie. Session cookies will only stay on your device until you stop browsing. Persistent cookies stay on your device until they expire or are deleted."
    },
    {
      title: "7. Updates to This Policy",
      content: "We may update this Cookie Policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons. Please visit this Cookie Policy regularly to stay informed about our use of cookies and related technologies."
    },
    {
      title: "8. Contact Us",
      content: "If you have any questions about our use of cookies or other technologies, please contact us at privacy@finverse.com or through our contact form."
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
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Cookie Policy</h1>
              <p className="text-xl text-blue-100 max-w-3xl mx-auto">
                Learn how we use cookies and similar technologies on our website
              </p>
            </div>
          </div>
        </section>

        {/* Cookie Policy Content */}
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
                to="/privacy"
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                Privacy Policy
              </Link>
              <Link
                to="/terms"
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                Terms of Service
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

export default CookiePolicy; 