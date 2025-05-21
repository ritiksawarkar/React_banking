import React from 'react';
import { Link } from 'react-router-dom';
import { FaBriefcase, FaUsers, FaGraduationCap, FaChartLine, FaHeart, FaLightbulb } from 'react-icons/fa';

const Careers = () => {
  const jobOpenings = [
    {
      title: "Senior Software Engineer",
      department: "Engineering",
      location: "New York, NY",
      type: "Full-time",
      description: "Join our engineering team to build the future of digital banking."
    },
    {
      title: "Product Manager",
      department: "Product",
      location: "Remote",
      type: "Full-time",
      description: "Lead product development and strategy for our banking platform."
    },
    {
      title: "UX/UI Designer",
      department: "Design",
      location: "San Francisco, CA",
      type: "Full-time",
      description: "Create beautiful and intuitive user experiences for our banking products."
    }
  ];

  const benefits = [
    {
      icon: <FaUsers className="w-8 h-8" />,
      title: "Collaborative Culture",
      description: "Work with talented individuals in a supportive and inclusive environment."
    },
    {
      icon: <FaGraduationCap className="w-8 h-8" />,
      title: "Learning & Development",
      description: "Continuous learning opportunities and professional development programs."
    },
    {
      icon: <FaChartLine className="w-8 h-8" />,
      title: "Career Growth",
      description: "Clear career paths and opportunities for advancement within the company."
    },
    {
      icon: <FaHeart className="w-8 h-8" />,
      title: "Health & Wellness",
      description: "Comprehensive health benefits and wellness programs for all employees."
    },
    {
      icon: <FaLightbulb className="w-8 h-8" />,
      title: "Innovation",
      description: "Work on cutting-edge technologies and shape the future of banking."
    },
    {
      icon: <FaBriefcase className="w-8 h-8" />,
      title: "Work-Life Balance",
      description: "Flexible work arrangements and generous time-off policies."
    }
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-r from-blue-50 to-indigo-50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Join Our Team at FinVerse
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Be part of a team that's revolutionizing the future of banking
            </p>
            <Link
              to="#openings"
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              View Open Positions
            </Link>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Work With Us?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <div className="text-blue-600 mb-4">{benefit.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Job Openings Section */}
      <section id="openings" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Current Openings</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {jobOpenings.map((job, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-semibold mb-2">{job.title}</h3>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm">
                    {job.department}
                  </span>
                  <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm">
                    {job.location}
                  </span>
                  <span className="px-3 py-1 bg-green-100 text-green-600 rounded-full text-sm">
                    {job.type}
                  </span>
                </div>
                <p className="text-gray-600 mb-4">{job.description}</p>
                <Link
                  to="/apply"
                  className="text-blue-600 hover:text-blue-700 font-medium"
                >
                  Apply Now →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-8">
            Don't See the Perfect Role?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
            We're always looking for talented individuals to join our team. Send us your resume and we'll keep you in mind for future opportunities.
          </p>
          <Link
            to="/contact"
            className="px-6 py-3 bg-white text-blue-600 rounded-lg hover:bg-blue-50"
          >
            Submit Your Resume
          </Link>
        </div>
      </section>
    </>
  );
};

export default Careers; 