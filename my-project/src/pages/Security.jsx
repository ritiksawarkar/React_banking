import React from 'react';
import { FaShieldAlt, FaLock, FaUserShield, FaMobileAlt, FaBell, FaHistory } from 'react-icons/fa';

const Security = () => {
  const securityFeatures = [
    {
      icon: <FaShieldAlt className="w-8 h-8" />,
      title: "Two-Factor Authentication",
      description: "Add an extra layer of security to your account with 2FA",
      status: "Enabled"
    },
    {
      icon: <FaLock className="w-8 h-8" />,
      title: "Password Protection",
      description: "Strong password requirements and regular updates",
      status: "Active"
    },
    {
      icon: <FaUserShield className="w-8 h-8" />,
      title: "Account Verification",
      description: "Multi-step verification process for new devices",
      status: "Enabled"
    },
    {
      icon: <FaMobileAlt className="w-8 h-8" />,
      title: "Device Management",
      description: "Monitor and manage devices connected to your account",
      status: "3 devices"
    }
  ];

  const securityAlerts = [
    {
      icon: <FaBell className="w-6 h-6" />,
      title: "Login Alerts",
      description: "Get notified of new logins and suspicious activities",
      enabled: true
    },
    {
      icon: <FaHistory className="w-6 h-6" />,
      title: "Transaction Monitoring",
      description: "Real-time monitoring of account transactions",
      enabled: true
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-r from-blue-50 to-indigo-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Security Center
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Protect your account and manage your security settings
            </p>
          </div>
        </div>
      </section>

      {/* Security Features */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Security Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {securityFeatures.map((feature, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="text-blue-600 mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600 mb-4">{feature.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-green-600 font-medium">{feature.status}</span>
                  <button className="text-blue-600 hover:text-blue-700 font-medium">
                    Manage
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Security Alerts */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Security Alerts</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {securityAlerts.map((alert, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-lg shadow-md"
              >
                <div className="flex items-start">
                  <div className="text-blue-600 mr-4">{alert.icon}</div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">{alert.title}</h3>
                    <p className="text-gray-600 mb-4">{alert.description}</p>
                    <div className="flex items-center">
                      <span className={`mr-2 ${alert.enabled ? 'text-green-600' : 'text-red-600'}`}>
                        {alert.enabled ? 'Enabled' : 'Disabled'}
                      </span>
                      <button className="text-blue-600 hover:text-blue-700 font-medium">
                        Configure
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Security Tips */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">
              Security Best Practices
            </h2>
            <div className="space-y-6">
              {[
                {
                  title: "Use Strong Passwords",
                  description: "Create unique, complex passwords and change them regularly. Never share your passwords with anyone."
                },
                {
                  title: "Enable Two-Factor Authentication",
                  description: "Add an extra layer of security by requiring a second form of verification when logging in."
                },
                {
                  title: "Monitor Your Account",
                  description: "Regularly review your account activity and report any suspicious transactions immediately."
                }
              ].map((tip, index) => (
                <div
                  key={index}
                  className="bg-white p-6 rounded-lg shadow-md"
                >
                  <h3 className="text-xl font-semibold mb-2">{tip.title}</h3>
                  <p className="text-gray-600">{tip.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Security; 