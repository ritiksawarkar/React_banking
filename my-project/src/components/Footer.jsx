import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-gray-800 to-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
              FinVerse
            </h3>
            <p className="text-gray-400 leading-relaxed">
              Banking reimagined for the digital age. Experience the future of finance with us.
            </p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4 text-blue-400">Company</h4>
            <ul className="space-y-3">
              {[
                { path: '/about', label: 'About Us' },
                { path: '/careers', label: 'Careers' },
                { path: '/press', label: 'Press' },
                { path: '/blog', label: 'Blog' }
              ].map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className="text-gray-400 hover:text-white transition-colors duration-200 flex items-center space-x-2 group"
                  >
                    <span className="w-1 h-1 bg-blue-500 rounded-full group-hover:w-2 transition-all duration-200"></span>
                    <span>{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4 text-blue-400">Legal</h4>
            <ul className="space-y-3">
              {[
                { path: '/privacy', label: 'Privacy Policy' },
                { path: '/terms', label: 'Terms of Service' },
                { path: '/security', label: 'Security' }
              ].map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className="text-gray-400 hover:text-white transition-colors duration-200 flex items-center space-x-2 group"
                  >
                    <span className="w-1 h-1 bg-blue-500 rounded-full group-hover:w-2 transition-all duration-200"></span>
                    <span>{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4 text-blue-400">Connect</h4>
            <div className="flex space-x-4">
              {[
                {
                  icon: 'fab fa-facebook-f',
                  href: '#',
                  label: 'Facebook',
                  color: 'hover:bg-[#1877F2]',
                  hoverColor: 'hover:text-white'
                },
                {
                  icon: 'fab fa-twitter',
                  href: '#',
                  label: 'Twitter',
                  color: 'hover:bg-[#1DA1F2]',
                  hoverColor: 'hover:text-white'
                },
                {
                  icon: 'fab fa-linkedin-in',
                  href: '#',
                  label: 'LinkedIn',
                  color: 'hover:bg-[#0A66C2]',
                  hoverColor: 'hover:text-white'
                },
                {
                  icon: 'fab fa-instagram',
                  href: '#',
                  label: 'Instagram',
                  color: 'hover:bg-gradient-to-tr from-[#F58529] via-[#DD2A7B] to-[#8134AF]',
                  hoverColor: 'hover:text-white'
                }
              ].map((social) => (
                <div key={social.label} className="relative group">
                  <a
                    href={social.href}
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-gray-400 transition-all duration-300 ${social.color} ${social.hoverColor} transform hover:scale-110 hover:shadow-lg`}
                    aria-label={social.label}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className={`${social.icon} text-lg`}></i>
                  </a>
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1 bg-gray-900 text-white text-sm rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none">
                    {social.label}
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-900"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-gray-700 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} FinVerse. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 