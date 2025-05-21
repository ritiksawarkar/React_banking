import { useState, Suspense } from 'react'
import { Routes, Route, Link, NavLink } from 'react-router-dom'
import { FaShieldAlt, FaBolt, FaChartLine, FaMobileAlt, FaCreditCard, FaHeadset, FaCheckCircle, FaMapMarkerAlt, FaPhone, FaEnvelope, FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram, FaBars, FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import ErrorBoundary from './components/ErrorBoundary'
import Loading from './components/Loading'
import { AuthProvider } from './context/AuthContext'
import Accounts from './pages/Accounts'
import Cards from './pages/Cards'
import Loans from './pages/Loans'
import Investments from './pages/Investments'
import About from './pages/About'
import Login from './pages/Login'
import Register from './pages/Register'
import ForgotPassword from './pages/ForgotPassword'
import TermsOfService from './pages/TermsOfService'
import PrivacyPolicy from './pages/PrivacyPolicy'
import Careers from './pages/Careers'
import Press from './pages/Press'
import Blog from './pages/Blog'
import HelpCenter from './pages/HelpCenter'
import Security from './pages/Security'
import FAQs from './pages/FAQs'
import Community from './pages/Community'
import CookiePolicy from './pages/CookiePolicy'
import Compliance from './pages/Compliance'

// Header component
const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const navLinkClass = ({ isActive }) =>
    `text-gray-700 hover:text-blue-600 transition-colors ${isActive ? 'text-blue-600 font-medium' : ''}`;

  return (
    <header className="fixed w-full bg-white shadow-sm z-50">
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
            <NavLink to="/" className={navLinkClass}>Home</NavLink>
            <NavLink to="/accounts" className={navLinkClass}>Accounts</NavLink>
            <NavLink to="/cards" className={navLinkClass}>Cards</NavLink>
            <NavLink to="/loans" className={navLinkClass}>Loans</NavLink>
            <NavLink to="/investments" className={navLinkClass}>Investments</NavLink>
            <NavLink to="/about" className={navLinkClass}>About</NavLink>
            <NavLink to="/help-center" className={navLinkClass}>Help</NavLink>
          </nav>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex space-x-4">
            <NavLink to="/login" className={({ isActive }) =>
              `px-4 py-2 text-blue-600 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors ${isActive ? 'bg-gray-50' : ''}`
            }>
              Login
            </NavLink>
            <NavLink to="/register" className={({ isActive }) =>
              `px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors ${isActive ? 'bg-blue-700' : ''}`
            }>
              Register
            </NavLink>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-gray-700 hover:text-blue-600 transition-colors"
            onClick={toggleMobileMenu}
          >
            <FaBars className="w-6 h-6" />
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 py-4 border-t border-gray-200">
            <nav className="flex flex-col space-y-4">
              <NavLink to="/" onClick={() => setIsMobileMenuOpen(false)} className={navLinkClass}>Home</NavLink>
              <NavLink to="/accounts" onClick={() => setIsMobileMenuOpen(false)} className={navLinkClass}>Accounts</NavLink>
              <NavLink to="/cards" onClick={() => setIsMobileMenuOpen(false)} className={navLinkClass}>Cards</NavLink>
              <NavLink to="/loans" onClick={() => setIsMobileMenuOpen(false)} className={navLinkClass}>Loans</NavLink>
              <NavLink to="/investments" onClick={() => setIsMobileMenuOpen(false)} className={navLinkClass}>Investments</NavLink>
              <NavLink to="/about" onClick={() => setIsMobileMenuOpen(false)} className={navLinkClass}>About</NavLink>
              <NavLink to="/help-center" onClick={() => setIsMobileMenuOpen(false)} className={navLinkClass}>Help Center</NavLink>
              <NavLink to="/security" onClick={() => setIsMobileMenuOpen(false)} className={navLinkClass}>Security</NavLink>
              <NavLink to="/faqs" onClick={() => setIsMobileMenuOpen(false)} className={navLinkClass}>FAQs</NavLink>
              <NavLink to="/community" onClick={() => setIsMobileMenuOpen(false)} className={navLinkClass}>Community</NavLink>
              <div className="flex flex-col space-y-2 pt-4 border-t border-gray-200">
                <NavLink to="/login" onClick={() => setIsMobileMenuOpen(false)} className={({ isActive }) =>
                  `px-4 py-2 text-blue-600 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-center ${isActive ? 'bg-gray-50' : ''}`
                }>
                  Login
                </NavLink>
                <NavLink to="/register" onClick={() => setIsMobileMenuOpen(false)} className={({ isActive }) =>
                  `px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-center ${isActive ? 'bg-blue-700' : ''}`
                }>
                  Register
                </NavLink>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

// Footer component
const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between mb-12">
          <div className="mb-8 md:mb-0">
            <div className="text-2xl font-bold mb-4 relative inline-block">
              <span className="text-white">FinVerse</span>
              <div className="absolute bottom-0 left-0 w-1/2 h-0.5 bg-green-500 rounded"></div>
            </div>
            <p className="text-gray-400 mt-2">Banking for the digital age</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h4 className="text-lg font-semibold mb-4 relative inline-block">
                Company
                <div className="absolute bottom-0 left-0 w-8 h-0.5 bg-blue-600 rounded"></div>
              </h4>
              <ul className="space-y-2 mt-4">
                <li><Link to="/about" className="text-gray-400 hover:text-white transition-colors">About Us</Link></li>
                <li><Link to="/careers" className="text-gray-400 hover:text-white transition-colors">Careers</Link></li>
                <li><Link to="/press" className="text-gray-400 hover:text-white transition-colors">Press</Link></li>
                <li><Link to="/blog" className="text-gray-400 hover:text-white transition-colors">Blog</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4 relative inline-block">
                Products
                <div className="absolute bottom-0 left-0 w-8 h-0.5 bg-blue-600 rounded"></div>
              </h4>
              <ul className="space-y-2 mt-4">
                <li><Link to="/accounts" className="text-gray-400 hover:text-white transition-colors">Accounts</Link></li>
                <li><Link to="/cards" className="text-gray-400 hover:text-white transition-colors">Cards</Link></li>
                <li><Link to="/loans" className="text-gray-400 hover:text-white transition-colors">Loans</Link></li>
                <li><Link to="/investments" className="text-gray-400 hover:text-white transition-colors">Investments</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4 relative inline-block">
                Resources
                <div className="absolute bottom-0 left-0 w-8 h-0.5 bg-blue-600 rounded"></div>
              </h4>
              <ul className="space-y-2 mt-4">
                <li><Link to="/help-center" className="text-gray-400 hover:text-white transition-colors">Help Center</Link></li>
                <li><Link to="/security" className="text-gray-400 hover:text-white transition-colors">Security</Link></li>
                <li><Link to="/faqs" className="text-gray-400 hover:text-white transition-colors">FAQs</Link></li>
                <li><Link to="/community" className="text-gray-400 hover:text-white transition-colors">Community</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4 relative inline-block">
                Legal
                <div className="absolute bottom-0 left-0 w-8 h-0.5 bg-blue-600 rounded"></div>
              </h4>
              <ul className="space-y-2 mt-4">
                <li><Link to="/privacy-policy" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</Link></li>
                <li><Link to="/terms-of-service" className="text-gray-400 hover:text-white transition-colors">Terms of Service</Link></li>
                <li><Link to="/cookie-policy" className="text-gray-400 hover:text-white transition-colors">Cookie Policy</Link></li>
                <li><Link to="/compliance" className="text-gray-400 hover:text-white transition-colors">Compliance</Link></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400">&copy; {new Date().getFullYear()} FinVerse. All rights reserved.</p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <a href="#" className="flex items-center px-4 py-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors">
                <i className="fab fa-apple mr-2"></i>
                <span>App Store</span>
              </a>
              <a href="#" className="flex items-center px-4 py-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors">
                <i className="fab fa-google-play mr-2"></i>
                <span>Google Play</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

// Home page component
const Home = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0)

  const testimonials = [
    {
      content: "FinVerse has completely transformed how I manage my finances. The interface is intuitive, and the insights have helped me save more than ever before.",
      name: "Sarah Johnson",
      role: "Small Business Owner",
      avatar: "https://img.freepik.com/free-photo/portrait-smiling-businesswoman_23-2147965685.jpg"
    },
    {
      content: "The instant transfers and bill payment reminders have saved me from late fees countless times. FinVerse is truly banking made simple!",
      name: "Michael Chen",
      role: "Software Engineer",
      avatar: "https://img.freepik.com/free-photo/portrait-smiling-male-executive_23-2147965684.jpg"
    },
    {
      content: "As someone who travels frequently, having access to my accounts securely from anywhere in the world has been a game-changer. Highly recommend!",
      name: "Priya Sharma",
      role: "Travel Blogger",
      avatar: "https://img.freepik.com/free-photo/portrait-smiling-female-executive_23-2147965686.jpg"
    }
  ]

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <>
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-r from-blue-50 to-indigo-50">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Banking Reimagined for the Digital Age
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Experience seamless, secure, and smart banking with FinVerse
            </p>
            <div className="flex space-x-4">
              <Link to="/register" className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                Get Started
              </Link>
              <a href="#features" className="px-6 py-3 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50">
                Learn More
              </a>
            </div>
          </div>
          <div className="md:w-1/2">
            <img
              src="https://img.freepik.com/free-vector/banking-app-interface-concept-illustration_114360-1082.jpg"
              alt="Digital Banking Platform"
              className="w-full rounded-lg shadow-xl"
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose FinVerse?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <FaShieldAlt className="w-8 h-8" />,
                title: "Secure Banking",
                description: "Bank with confidence knowing your data is protected with industry-leading security measures."
              },
              {
                icon: <FaBolt className="w-8 h-8" />,
                title: "Instant Transfers",
                description: "Send and receive money instantly, anytime and anywhere with zero waiting time."
              },
              {
                icon: <FaChartLine className="w-8 h-8" />,
                title: "Financial Insights",
                description: "Gain valuable insights into your spending habits and financial health."
              },
              {
                icon: <FaMobileAlt className="w-8 h-8" />,
                title: "Mobile Banking",
                description: "Access all banking features on the go with our responsive mobile platform."
              },
              {
                icon: <FaCreditCard className="w-8 h-8" />,
                title: "Smart Cards",
                description: "Manage your cards, set limits, and enable/disable features with a single tap."
              },
              {
                icon: <FaHeadset className="w-8 h-8" />,
                title: "24/7 Support",
                description: "Our dedicated support team is available round the clock to assist you."
              }
            ].map((feature, index) => (
              <div key={index} className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <div className="text-blue-600 mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <h2 className="text-3xl font-bold mb-8">Experience the FinVerse Advantage</h2>
            <ul className="space-y-4 mb-8">
              {[
                "No hidden fees or charges",
                "Higher interest rates on savings",
                "Personalized financial advice",
                "Seamless integration with other financial tools",
                "Reward points on every transaction",
                "Paperless banking experience"
              ].map((benefit, index) => (
                <li key={index} className="flex items-center">
                  <FaCheckCircle className="text-green-500 mr-3" />
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
            <Link to="/register" className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              Open an Account
            </Link>
          </div>
          <div className="md:w-1/2">
            <img
              src="https://img.freepik.com/free-vector/banking-app-interface-concept-illustration_114360-1081.jpg"
              alt="Mobile Banking Benefits"
              className="w-full rounded-lg shadow-xl"
            />
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">What Our Customers Say</h2>
          <div className="relative max-w-3xl mx-auto">
            <div className="bg-white p-8 rounded-lg shadow-md">
              <p className="text-gray-600 mb-6">{testimonials[currentTestimonial].content}</p>
              <div className="flex items-center">
                <img
                  src={testimonials[currentTestimonial].avatar}
                  alt={testimonials[currentTestimonial].name}
                  className="w-12 h-12 rounded-full mr-4"
                />
                <div>
                  <h4 className="font-semibold">{testimonials[currentTestimonial].name}</h4>
                  <p className="text-gray-500">{testimonials[currentTestimonial].role}</p>
                </div>
              </div>
            </div>
            <div className="flex justify-center mt-6 space-x-4">
              <button
                onClick={prevTestimonial}
                className="p-2 rounded-full bg-gray-100 hover:bg-gray-200"
              >
                <FaChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={nextTestimonial}
                className="p-2 rounded-full bg-gray-100 hover:bg-gray-200"
              >
                <FaChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Get in Touch</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="flex items-center">
                <FaMapMarkerAlt className="text-blue-600 w-6 h-6 mr-4" />
                <p>123 Financial District, New York, NY 10004</p>
              </div>
              <div className="flex items-center">
                <FaPhone className="text-blue-600 w-6 h-6 mr-4" />
                <p>+1 (555) 123-4567</p>
              </div>
              <div className="flex items-center">
                <FaEnvelope className="text-blue-600 w-6 h-6 mr-4" />
                <p>support@finverse.com</p>
              </div>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-600 hover:text-blue-600">
                  <FaFacebookF className="w-6 h-6" />
                </a>
                <a href="#" className="text-gray-600 hover:text-blue-600">
                  <FaTwitter className="w-6 h-6" />
                </a>
                <a href="#" className="text-gray-600 hover:text-blue-600">
                  <FaLinkedinIn className="w-6 h-6" />
                </a>
                <a href="#" className="text-gray-600 hover:text-blue-600">
                  <FaInstagram className="w-6 h-6" />
                </a>
              </div>
            </div>
            <form className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                />
              </div>
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows="5"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  )
}

// NotFound component for handling 404 errors
const NotFound = () => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50 pt-24">
    <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-lg text-center">
      <h1 className="text-4xl font-bold text-gray-900 mb-4">404</h1>
      <p className="text-gray-600 mb-6">The page you're looking for doesn't exist.</p>
      <Link to="/" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
        Go Home
      </Link>
    </div>
  </div>
);

function App() {
  return (
    <AuthProvider>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow">
          <ErrorBoundary>
            <Suspense fallback={<Loading />}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/accounts" element={<Accounts />} />
                <Route path="/cards" element={<Cards />} />
                <Route path="/loans" element={<Loans />} />
                <Route path="/investments" element={<Investments />} />
                <Route path="/about" element={<About />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/terms-of-service" element={<TermsOfService />} />
                <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                <Route path="/careers" element={<Careers />} />
                <Route path="/press" element={<Press />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/help-center" element={<HelpCenter />} />
                <Route path="/security" element={<Security />} />
                <Route path="/faqs" element={<FAQs />} />
                <Route path="/community" element={<Community />} />
                <Route path="/cookie-policy" element={<CookiePolicy />} />
                <Route path="/compliance" element={<Compliance />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </ErrorBoundary>
        </main>
        <Footer />
      </div>
    </AuthProvider>
  );
}

export default App;
