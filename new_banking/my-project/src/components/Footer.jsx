import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram, FaEnvelope, FaPhone, FaMapMarkerAlt, FaArrowRight } from 'react-icons/fa';

// Footer data configuration
const footerData = {
  company: {
    name: "FinVerse",
    description: "Your trusted partner in digital banking solutions. We're committed to making banking simpler, faster, and more secure.",
    socialLinks: [
      { icon: FaFacebook, href: '#', label: 'Facebook' },
      { icon: FaTwitter, href: '#', label: 'Twitter' },
      { icon: FaLinkedin, href: '#', label: 'LinkedIn' },
      { icon: FaInstagram, href: '#', label: 'Instagram' }
    ]
  },
  quickLinks: [
    { to: '/about', label: 'About Us' },
    { to: '/services', label: 'Services' },
    { to: '/contact', label: 'Contact' },
    { to: '/careers', label: 'Careers' }
  ],
  supportLinks: [
    { to: '/help', label: 'Help Center' },
    { to: '/faq', label: 'FAQ' },
    { to: '/security', label: 'Security' },
    { to: '/privacy', label: 'Privacy Policy' }
  ],
  contactInfo: [
    { icon: FaEnvelope, text: 'support@finverse.com' },
    { icon: FaPhone, text: '+1 (555) 123-4567' },
    { icon: FaMapMarkerAlt, text: '123 Banking Street, Financial District, NY 10004' }
  ],
  legalLinks: [
    { to: '/terms', label: 'Terms of Service' },
    { to: '/privacy', label: 'Privacy Policy' },
    { to: '/cookies', label: 'Cookie Policy' }
  ]
};

// Footer Section Components
const CompanyInfo = ({ data }) => (
  <div className="space-y-6">
    <h3 className="text-2xl font-bold text-white">{data.name}</h3>
    <p className="text-base text-gray-300 leading-relaxed">{data.description}</p>
    <div className="flex space-x-4">
      {data.socialLinks.map((social, index) => (
        <a
          key={index}
          href={social.href}
          className="text-gray-300 hover:text-white transition-all duration-300 transform hover:scale-110 bg-gray-800 p-2 rounded-full hover:bg-indigo-600"
          aria-label={social.label}
        >
          <social.icon className="w-5 h-5" />
        </a>
      ))}
    </div>
  </div>
);

const FooterLinks = ({ title, links }) => (
  <div>
    <h4 className="text-xl font-semibold mb-6 text-white">{title}</h4>
    <ul className="space-y-4">
      {links.map((link, index) => (
        <li key={index}>
          <Link
            to={link.to}
            className="text-base text-gray-300 hover:text-white transition-all duration-200 flex items-center group"
          >
            <FaArrowRight className="w-3 h-3 mr-2 text-indigo-500 transform group-hover:translate-x-1 transition-transform" />
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  </div>
);

const ContactInfo = ({ contacts }) => (
  <div>
    <h4 className="text-xl font-semibold mb-6 text-white">Contact Us</h4>
    <ul className="space-y-4">
      {contacts.map((contact, index) => (
        <li key={index} className="flex items-start group">
          <contact.icon className="w-5 h-5 mr-3 text-indigo-500 mt-0.5" />
          <span className="text-base text-gray-300 group-hover:text-white transition-colors">{contact.text}</span>
        </li>
      ))}
    </ul>
  </div>
);

const BottomBar = ({ legalLinks }) => {
  const currentYear = new Date().getFullYear();
  
  return (
    <div className="border-t border-gray-700 mt-12 pt-8">
      <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
        <p className="text-sm text-gray-400">
          &copy; {currentYear} FinVerse. All rights reserved.
        </p>
        <div className="flex flex-wrap justify-center sm:justify-end gap-6">
          {legalLinks.map((link, index) => (
            <Link
              key={index}
              to={link.to}
              className="text-sm text-gray-400 hover:text-white transition-colors duration-200 hover:underline"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
          <CompanyInfo data={footerData.company} />
          <FooterLinks title="Quick Links" links={footerData.quickLinks} />
          <FooterLinks title="Support" links={footerData.supportLinks} />
          <ContactInfo contacts={footerData.contactInfo} />
        </div>
        <BottomBar legalLinks={footerData.legalLinks} />
      </div>
    </footer>
  );
};

export default Footer; 