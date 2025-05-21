import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaBars } from 'react-icons/fa';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className={`fixed w-full bg-white z-50 transition-all duration-200 ${
      isScrolled ? 'shadow-md' : 'shadow-sm'
    }`}>
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-bold text-blue-600 relative">
              FinVerse
              <div className="absolute bottom-0 left-0 w-1/2 h-0.5 bg-green-500 rounded"></div>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link to="/" className="text-gray-700 hover:text-blue-600 transition-colors">Home</Link>
            <Link to="/accounts" className="text-gray-700 hover:text-blue-600 transition-colors">Accounts</Link>
            <Link to="/cards" className="text-gray-700 hover:text-blue-600 transition-colors">Cards</Link>
            <Link to="/loans" className="text-gray-700 hover:text-blue-600 transition-colors">Loans</Link>
            <Link to="/investments" className="text-gray-700 hover:text-blue-600 transition-colors">Investments</Link>
            <Link to="/about" className="text-gray-700 hover:text-blue-600 transition-colors">About</Link>
          </nav>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex space-x-4">
            <Link to="/login" className="px-4 py-2 text-blue-600 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              Login
            </Link>
            <Link to="/register" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              Register
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-gray-700 hover:text-blue-600 transition-colors"
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
          >
            <FaBars className="w-6 h-6" />
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 py-4 border-t border-gray-200">
            <nav className="flex flex-col space-y-4">
              <Link to="/" className="text-gray-700 hover:text-blue-600 transition-colors">Home</Link>
              <Link to="/accounts" className="text-gray-700 hover:text-blue-600 transition-colors">Accounts</Link>
              <Link to="/cards" className="text-gray-700 hover:text-blue-600 transition-colors">Cards</Link>
              <Link to="/loans" className="text-gray-700 hover:text-blue-600 transition-colors">Loans</Link>
              <Link to="/investments" className="text-gray-700 hover:text-blue-600 transition-colors">Investments</Link>
              <Link to="/about" className="text-gray-700 hover:text-blue-600 transition-colors">About</Link>
              <div className="flex flex-col space-y-2 pt-4 border-t border-gray-200">
                <Link to="/login" className="px-4 py-2 text-blue-600 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-center">
                  Login
                </Link>
                <Link to="/register" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-center">
                  Register
                </Link>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header; 