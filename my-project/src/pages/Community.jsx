import React from 'react';
import { FaUsers, FaComments, FaLightbulb, FaCalendarAlt, FaBook, FaTrophy } from 'react-icons/fa';

const Community = () => {
  const communityFeatures = [
    {
      icon: <FaUsers className="w-8 h-8" />,
      title: "Community Forums",
      description: "Join discussions with other members about banking, investments, and financial planning",
      link: "#forums"
    },
    {
      icon: <FaComments className="w-8 h-8" />,
      title: "Expert Q&A",
      description: "Get answers to your financial questions from industry experts",
      link: "#qa"
    },
    {
      icon: <FaLightbulb className="w-8 h-8" />,
      title: "Success Stories",
      description: "Read inspiring stories from our community members",
      link: "#stories"
    },
    {
      icon: <FaCalendarAlt className="w-8 h-8" />,
      title: "Events",
      description: "Participate in webinars, workshops, and networking events",
      link: "#events"
    }
  ];

  const upcomingEvents = [
    {
      title: "Financial Planning Workshop",
      date: "March 15, 2024",
      time: "2:00 PM EST",
      type: "Webinar"
    },
    {
      title: "Investment Strategies Seminar",
      date: "March 20, 2024",
      time: "3:00 PM EST",
      type: "Virtual Event"
    },
    {
      title: "Community Meetup",
      date: "March 25, 2024",
      time: "6:00 PM EST",
      type: "In-Person"
    }
  ];

  const successStories = [
    {
      title: "From Savings to Investment",
      author: "Sarah Johnson",
      excerpt: "How I turned my savings into a successful investment portfolio..."
    },
    {
      title: "Financial Freedom Journey",
      author: "Michael Chen",
      excerpt: "My path to achieving financial independence through smart planning..."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-r from-blue-50 to-indigo-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Join Our Community
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Connect with like-minded individuals and grow your financial knowledge
            </p>
          </div>
        </div>
      </section>

      {/* Community Features */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Community Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {communityFeatures.map((feature, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="text-blue-600 mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600 mb-4">{feature.description}</p>
                <a
                  href={feature.link}
                  className="text-blue-600 hover:text-blue-700 font-medium inline-flex items-center"
                >
                  Learn more
                  <svg
                    className="w-4 h-4 ml-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Upcoming Events</h2>
            <div className="space-y-6">
              {upcomingEvents.map((event, index) => (
                <div
                  key={index}
                  className="bg-white p-6 rounded-lg shadow-md"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
                      <div className="text-gray-600">
                        <p>{event.date}</p>
                        <p>{event.time}</p>
                      </div>
                    </div>
                    <span className="px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm">
                      {event.type}
                    </span>
                  </div>
                  <button className="mt-4 text-blue-600 hover:text-blue-700 font-medium">
                    Register Now
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Success Stories</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {successStories.map((story, index) => (
                <div
                  key={index}
                  className="bg-white p-6 rounded-lg shadow-md"
                >
                  <div className="text-blue-600 mb-4">
                    <FaTrophy className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{story.title}</h3>
                  <p className="text-gray-600 mb-4">By {story.author}</p>
                  <p className="text-gray-600 mb-4">{story.excerpt}</p>
                  <button className="text-blue-600 hover:text-blue-700 font-medium">
                    Read Full Story
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Join Community */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Join?</h2>
            <p className="text-xl text-gray-600 mb-8">
              Become part of our growing community and start your journey to financial success
            </p>
            <button className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors">
              Join Now
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Community; 