import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { FaShieldAlt, FaLock, FaBell, FaCreditCard, FaHistory, FaCheckCircle, FaUserCircle, FaIdCard, FaFileAlt, FaChartLine, FaCog, FaSignOutAlt, FaArrowUp, FaArrowDown, FaClock, FaCalendarAlt, FaMoneyBillWave, FaUser, FaTimes, FaCheck, FaFingerprint, FaMobileAlt, FaKey, FaUserShield, FaEye, FaEyeSlash, FaQrcode } from 'react-icons/fa';
import DashboardHeader from '../components/DashboardPageHeader';
import DashboardPageFooter from '../components/DashboardPageFooter';

const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-xl max-w-md w-full mx-4">
        <div className="flex items-center justify-between p-6 border-b">
          <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            <FaTimes className="w-5 h-5" />
          </button>
        </div>
        <div className="p-6">
          {children}
        </div>
      </div>
    </div>
  );
};

const AccountSecurity = () => {
  useAuth();
  const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);
  const [showTwoFactorModal, setShowTwoFactorModal] = useState(false);
  const [securityScore] = useState(85);
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handlePasswordChange = (e) => {
    e.preventDefault();
    // Handle password change logic here
    setShowChangePasswordModal(false);
  };

  const handleTwoFactorSetup = (e) => {
    e.preventDefault();
    // Handle two-factor setup logic here
    setShowTwoFactorModal(false);
  };

  const securityFeatures = [
    {
      id: 1,
      title: 'Two-Factor Authentication',
      description: 'Add an extra layer of security to your account',
      enabled: false,
      icon: FaFingerprint
    },
    {
      id: 2,
      title: 'Biometric Login',
      description: 'Use fingerprint or face recognition to login',
      enabled: true,
      icon: FaMobileAlt
    },
    {
      id: 3,
      title: 'Password Manager',
      description: 'Securely store and manage your passwords',
      enabled: true,
      icon: FaKey
    }
  ];

  const recentActivity = [
    {
      id: 1,
      type: 'login',
      device: 'iPhone 12',
      location: 'Mumbai, India',
      time: '2 hours ago',
      status: 'success'
    },
    {
      id: 2,
      type: 'password_change',
      device: 'MacBook Pro',
      location: 'Mumbai, India',
      time: '1 day ago',
      status: 'success'
    },
    {
      id: 3,
      type: 'login_attempt',
      device: 'Unknown',
      location: 'New Delhi, India',
      time: '2 days ago',
      status: 'failed'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-50">
      <DashboardHeader />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-24">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Account Security</h1>

          {/* Security Score */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-6">
            <div className="bg-gradient-to-r from-indigo-600 to-blue-600 px-6 py-4">
              <div className="flex items-center space-x-3">
                <FaShieldAlt className="w-6 h-6 text-white" />
                <h2 className="text-xl font-semibold text-white">Security Score</h2>
              </div>
            </div>
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">Your Security Score</h3>
                  <p className="text-sm text-gray-500">Based on your security settings and activity</p>
                </div>
                <div className="text-3xl font-bold text-indigo-600">{securityScore}%</div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div
                  className="bg-indigo-600 h-2.5 rounded-full"
                  style={{ width: `${securityScore}%` }}
                ></div>
              </div>
            </div>
          </div>

          {/* Security Features */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-6">
            <div className="bg-gradient-to-r from-indigo-600 to-blue-600 px-6 py-4">
              <div className="flex items-center space-x-3">
                <FaLock className="w-6 h-6 text-white" />
                <h2 className="text-xl font-semibold text-white">Security Features</h2>
              </div>
            </div>
            <div className="p-6 space-y-4">
              {securityFeatures.map((feature) => (
                <div key={feature.id} className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="p-2 bg-indigo-100 rounded-lg">
                      <feature.icon className="w-6 h-6 text-indigo-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">{feature.title}</h3>
                      <p className="text-sm text-gray-500">{feature.description}</p>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={feature.enabled}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="bg-gradient-to-r from-indigo-600 to-blue-600 px-6 py-4">
              <div className="flex items-center space-x-3">
                <FaHistory className="w-6 h-6 text-white" />
                <h2 className="text-xl font-semibold text-white">Recent Activity</h2>
              </div>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className={`p-2 rounded-lg ${
                        activity.status === 'success' ? 'bg-green-100' : 'bg-red-100'
                      }`}>
                        {activity.status === 'success' ? (
                          <FaCheckCircle className="w-6 h-6 text-green-600" />
                        ) : (
                          <FaTimes className="w-6 h-6 text-red-600" />
                        )}
                      </div>
                      <div>
                        <h3 className="text-lg font-medium text-gray-900 capitalize">{activity.type.replace('_', ' ')}</h3>
                        <p className="text-sm text-gray-500">
                          {activity.device} • {activity.location} • {activity.time}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Change Password Modal */}
      <Modal
        isOpen={showChangePasswordModal}
        onClose={() => setShowChangePasswordModal(false)}
        title="Change Password"
      >
        <form onSubmit={handlePasswordChange} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Current Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-500"
              >
                {showPassword ? <FaEyeSlash className="w-5 h-5" /> : <FaEye className="w-5 h-5" />}
              </button>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              New Password
            </label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Confirm New Password
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={() => setShowChangePasswordModal(false)}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg"
            >
              Change Password
            </button>
          </div>
        </form>
      </Modal>

      {/* Two-Factor Authentication Modal */}
      <Modal
        isOpen={showTwoFactorModal}
        onClose={() => setShowTwoFactorModal(false)}
        title="Set Up Two-Factor Authentication"
      >
        <form onSubmit={handleTwoFactorSetup} className="space-y-4">
          <div className="text-center">
            <div className="w-32 h-32 mx-auto bg-gray-100 rounded-lg flex items-center justify-center">
              <FaQrcode className="w-20 h-20 text-gray-400" />
            </div>
            <p className="mt-4 text-sm text-gray-500">
              Scan this QR code with your authenticator app
            </p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Enter 6-digit code
            </label>
            <input
              type="text"
              maxLength="6"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={() => setShowTwoFactorModal(false)}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg"
            >
              Enable 2FA
            </button>
          </div>
        </form>
      </Modal>
      <DashboardPageFooter />
    </div>
  );
};

export default AccountSecurity; 