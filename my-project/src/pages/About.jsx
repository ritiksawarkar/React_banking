import { FaUsers, FaLightbulb, FaShieldAlt, FaLinkedin, FaTwitter } from 'react-icons/fa'

const About = () => {
  return (
    <div className="pt-24">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white py-24 px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">About FinVerse</h1>
        <p className="text-xl max-w-3xl mx-auto opacity-90">
          Revolutionizing digital banking with innovation and customer-centric solutions.
        </p>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-16">
        {/* Mission Section */}
        <section className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
          <p className="text-gray-600 max-w-3xl mx-auto leading-relaxed">
            At FinVerse, we're committed to making banking simpler, smarter, and more accessible for everyone. 
            We believe in leveraging technology to provide innovative financial solutions that empower our 
            customers to achieve their financial goals.
          </p>
        </section>

        {/* Values Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-8 shadow-md text-center">
              <FaUsers className="text-4xl text-indigo-600 mx-auto mb-6" />
              <h3 className="text-2xl font-semibold mb-4">Customer First</h3>
              <p className="text-gray-600">
                We put our customers at the heart of everything we do, ensuring their needs are always our top priority.
              </p>
            </div>
            <div className="bg-white rounded-xl p-8 shadow-md text-center">
              <FaLightbulb className="text-4xl text-indigo-600 mx-auto mb-6" />
              <h3 className="text-2xl font-semibold mb-4">Innovation</h3>
              <p className="text-gray-600">
                We continuously innovate to provide cutting-edge solutions that make banking more efficient and enjoyable.
              </p>
            </div>
            <div className="bg-white rounded-xl p-8 shadow-md text-center">
              <FaShieldAlt className="text-4xl text-indigo-600 mx-auto mb-6" />
              <h3 className="text-2xl font-semibold mb-4">Trust & Security</h3>
              <p className="text-gray-600">
                We maintain the highest standards of security and transparency in all our operations.
              </p>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">Our Leadership Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-8 shadow-md text-center">
              <img
                src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop&crop=faces"
                alt="John Smith"
                className="w-32 h-32 rounded-full mx-auto mb-6 object-cover"
              />
              <h3 className="text-xl font-semibold mb-2">John Smith</h3>
              <p className="text-gray-600 mb-4">Chief Executive Officer</p>
              <div className="flex justify-center space-x-4">
                <a href="#" className="text-indigo-600 hover:text-indigo-700">
                  <FaLinkedin className="text-xl" />
                </a>
                <a href="#" className="text-indigo-600 hover:text-indigo-700">
                  <FaTwitter className="text-xl" />
                </a>
              </div>
            </div>
            <div className="bg-white rounded-xl p-8 shadow-md text-center">
              <img
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop&crop=faces"
                alt="Sarah Johnson"
                className="w-32 h-32 rounded-full mx-auto mb-6 object-cover"
              />
              <h3 className="text-xl font-semibold mb-2">Sarah Johnson</h3>
              <p className="text-gray-600 mb-4">Chief Technology Officer</p>
              <div className="flex justify-center space-x-4">
                <a href="#" className="text-indigo-600 hover:text-indigo-700">
                  <FaLinkedin className="text-xl" />
                </a>
                <a href="#" className="text-indigo-600 hover:text-indigo-700">
                  <FaTwitter className="text-xl" />
                </a>
              </div>
            </div>
            <div className="bg-white rounded-xl p-8 shadow-md text-center">
              <img
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=faces"
                alt="Michael Chen"
                className="w-32 h-32 rounded-full mx-auto mb-6 object-cover"
              />
              <h3 className="text-xl font-semibold mb-2">Michael Chen</h3>
              <p className="text-gray-600 mb-4">Chief Financial Officer</p>
              <div className="flex justify-center space-x-4">
                <a href="#" className="text-indigo-600 hover:text-indigo-700">
                  <FaLinkedin className="text-xl" />
                </a>
                <a href="#" className="text-indigo-600 hover:text-indigo-700">
                  <FaTwitter className="text-xl" />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="bg-gray-50 rounded-xl p-12 mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">Our Impact</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-indigo-600 mb-2">1M+</div>
              <div className="text-gray-600">Happy Customers</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-indigo-600 mb-2">50+</div>
              <div className="text-gray-600">Countries Served</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-indigo-600 mb-2">24/7</div>
              <div className="text-gray-600">Customer Support</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-indigo-600 mb-2">99.9%</div>
              <div className="text-gray-600">Uptime</div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gray-50 rounded-xl p-12 text-center">
          <h2 className="text-3xl font-bold mb-4">Join Our Team</h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-8">
            Be part of our mission to revolutionize digital banking.
          </p>
          <button className="bg-indigo-600 text-white px-8 py-4 rounded-lg text-lg font-medium hover:bg-indigo-700 transition-colors">
            View Careers
          </button>
        </section>
      </div>
    </div>
  )
}

export default About 