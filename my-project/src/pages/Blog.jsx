import React from 'react';
import { Link } from 'react-router-dom';
import { FaSearch, FaCalendarAlt, FaUser, FaTag, FaArrowRight } from 'react-icons/fa';

const Blog = () => {
  const featuredPosts = [
    {
      title: "The Future of Digital Banking in 2024",
      excerpt: "Explore the latest trends and innovations shaping the future of digital banking.",
      author: "Sarah Johnson",
      date: "March 15, 2024",
      category: "Technology",
      image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    },
    {
      title: "How AI is Transforming Personal Finance",
      excerpt: "Discover how artificial intelligence is revolutionizing the way we manage our money.",
      author: "Michael Chen",
      date: "March 10, 2024",
      category: "Innovation",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    },
    {
      title: "Building Financial Resilience in Uncertain Times",
      excerpt: "Learn practical strategies to strengthen your financial position in today's economy.",
      author: "Emma Rodriguez",
      date: "March 5, 2024",
      category: "Personal Finance",
      image: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    }
  ];

  const categories = [
    "Technology",
    "Personal Finance",
    "Investment",
    "Security",
    "Innovation",
    "Market Trends"
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-r from-blue-50 to-indigo-50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              FinVerse Blog
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Insights, news, and updates from the world of digital banking
            </p>
            <div className="relative max-w-xl mx-auto">
              <input
                type="text"
                placeholder="Search articles..."
                className="w-full px-4 py-3 pl-12 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Posts Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Featured Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredPosts.map((post, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <div className="flex items-center text-sm text-gray-500 mb-3">
                    <FaCalendarAlt className="mr-2" />
                    {post.date}
                    <span className="mx-2">•</span>
                    <FaUser className="mr-2" />
                    {post.author}
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{post.title}</h3>
                  <p className="text-gray-600 mb-4">{post.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                      <FaTag className="mr-2" />
                      {post.category}
                    </span>
                    <Link
                      to="#"
                      className="text-blue-600 hover:text-blue-700 font-medium inline-flex items-center"
                    >
                      Read More
                      <FaArrowRight className="ml-2" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Categories</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((category, index) => (
              <Link
                key={index}
                to="#"
                className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow text-center"
              >
                {category}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-8">
            Stay Updated
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
            Subscribe to our newsletter for the latest insights and updates
          </p>
          <div className="max-w-md mx-auto">
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button className="px-6 py-3 bg-white text-blue-600 rounded-lg hover:bg-blue-50 font-medium">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Blog; 