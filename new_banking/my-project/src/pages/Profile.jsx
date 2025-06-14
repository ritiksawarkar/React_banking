import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { 
  FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaEdit, FaCamera, 
  FaShieldAlt, FaLock, FaBell, FaCreditCard, FaHistory, FaCheckCircle,
  FaUserCircle, FaIdCard, FaFileAlt, FaChartLine, FaCog, FaSignOutAlt,
  FaArrowUp, FaArrowDown, FaClock, FaCalendarAlt, FaMoneyBillWave,
  FaUserShield, FaTimes, FaCheck
} from 'react-icons/fa';
import DashboardHeader from '../components/DashboardPageHeader';
import DashboardPageFooter from '../components/DashboardPageFooter';

// Modal Component
const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500 focus:outline-none"
          >
            <FaTimes className="w-5 h-5" />
          </button>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
};

const Profile = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');
  const [isChangePasswordOpen, setIsChangePasswordOpen] = useState(false);
  const [profileData, setProfileData] = useState({
    fullName: user?.displayName || 'John Doe',
    email: user?.email || 'john.doe@example.com',
    phone: '+91 98765 43210',
    address: '123 Main Street, Pune, Maharashtra, India',
    dateOfBirth: '1990-01-01',
    kycStatus: 'Verified',
    lastLogin: '2024-05-21 20:42',
    accountCreated: '2023-01-15',
    accountType: 'Premium',
    accountNumber: '1234567890',
    ifscCode: 'FINV0001234',
    branch: 'Pune Main Branch',
    accountStatus: 'Active',
    lastUpdated: new Date().toLocaleDateString(),
    availableBalance: 24800.00,
    pendingTransactions: 200.00
  });

  const handleSave = (e) => {
    e.preventDefault();
    // Here you would typically make an API call to update the profile
    setIsEditing(false);
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const tabs = [
    { id: 'profile', label: 'Profile', icon: <FaUserCircle /> },
    { id: 'security', label: 'Security', icon: <FaShieldAlt /> },
    { id: 'documents', label: 'Documents', icon: <FaFileAlt /> },
    { id: 'activity', label: 'Activity', icon: <FaChartLine /> }
  ];

  // Recent Activity Data
  const recentActivity = [
    {
      id: 1,
      type: 'profile',
      title: 'Profile Updated',
      description: 'Your profile information was updated',
      date: '2 hours ago',
      icon: <FaUserCircle className="w-5 h-5 text-green-600" />
    },
    {
      id: 2,
      type: 'security',
      title: 'Password Changed',
      description: 'Your password was successfully changed',
      date: '1 day ago',
      icon: <FaLock className="w-5 h-5 text-blue-600" />
    },
    {
      id: 3,
      type: 'document',
      title: 'Document Verified',
      description: 'Your Aadhaar card was verified',
      date: '3 days ago',
      icon: <FaCheckCircle className="w-5 h-5 text-indigo-600" />
    }
  ];

  // Security Settings
  const securitySettings = [
    {
      id: 1,
      title: 'Password',
      description: 'Last changed 3 months ago',
      icon: <FaLock className="w-5 h-5 text-indigo-600" />,
      action: 'Change'
    },
    {
      id: 2,
      title: 'Two-Factor Authentication',
      description: 'Add an extra layer of security',
      icon: <FaBell className="w-5 h-5 text-indigo-600" />,
      action: 'Enable'
    },
    {
      id: 3,
      title: 'Login History',
      description: 'View your recent login activity',
      icon: <FaShieldAlt className="w-5 h-5 text-indigo-600" />,
      action: 'View'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-50">
      <DashboardHeader />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-24">
        {/* Profile Header */}
        <div className="mb-8">
          <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200 hover:border-indigo-200 transition-colors duration-200">
            <div className="bg-gradient-to-r from-indigo-600 to-blue-600 px-6 py-8">
              <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6">
                <div className="relative">
                  <div className="w-32 h-32 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border-4 border-white/30 hover:border-white/40 transition-colors duration-200">
                    <FaUser className="w-16 h-16 text-white" />
                  </div>
                  <button className="absolute bottom-0 right-0 p-3 bg-white rounded-full shadow-lg hover:bg-gray-50 transition-all duration-200 hover:scale-110">
                    <FaCamera className="w-5 h-5 text-indigo-600" />
                  </button>
                </div>
                <div className="text-center md:text-left">
                  <h1 className="text-2xl font-bold text-white">{profileData.fullName}</h1>
                  <p className="text-indigo-100 mt-1">{profileData.email}</p>
                  <div className="flex flex-wrap gap-2 mt-3 justify-center md:justify-start">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-white/20 text-white backdrop-blur-sm hover:bg-white/30 transition-colors duration-200">
                      <FaShieldAlt className="w-4 h-4 mr-1" />
                      {profileData.kycStatus}
                    </span>
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-white/20 text-white backdrop-blur-sm hover:bg-white/30 transition-colors duration-200">
                      <FaIdCard className="w-4 h-4 mr-1" />
                      {profileData.accountType}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200 hover:border-indigo-200 transition-colors duration-200">
              <nav className="p-4">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg mb-2 transition-all duration-200 ${
                      activeTab === tab.id
                        ? 'bg-indigo-50 text-indigo-600 border border-indigo-200'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-indigo-600 border border-transparent hover:border-indigo-200'
                    }`}
                  >
                    {tab.icon}
                    <span className="font-medium">{tab.label}</span>
                  </button>
                ))}
              </nav>
              <div className="p-4 border-t border-gray-100">
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center space-x-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200 border border-transparent hover:border-red-200"
                >
                  <FaSignOutAlt />
                  <span className="font-medium">Sign Out</span>
                </button>
              </div>
            </div>

            {/* Account Status */}
            <div className="mt-8 bg-white rounded-xl shadow-sm p-6 border border-gray-200 hover:border-indigo-200 transition-colors duration-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Account Status</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-gradient-to-br from-indigo-50 to-white rounded-lg border border-indigo-100 hover:border-indigo-200 transition-all duration-200">
                  <div className="flex items-center space-x-3">
                    <FaUserShield className="w-5 h-5 text-indigo-600" />
                    <div>
                      <p className="text-sm text-gray-600">Status</p>
                      <p className="text-sm font-medium text-gray-900">{profileData.accountStatus}</p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between p-3 bg-gradient-to-br from-indigo-50 to-white rounded-lg border border-indigo-100 hover:border-indigo-200 transition-all duration-200">
                  <div className="flex items-center space-x-3">
                    <FaClock className="w-5 h-5 text-indigo-600" />
                    <div>
                      <p className="text-sm text-gray-600">Last Updated</p>
                      <p className="text-sm font-medium text-gray-900">{profileData.lastUpdated}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {activeTab === 'profile' && (
              <>
                <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200 hover:border-indigo-200 transition-colors duration-200">
                  <div className="px-6 py-4 border-b border-gray-100 bg-gradient-to-r from-indigo-50 to-white">
                    <div className="flex items-center justify-between">
                      <h2 className="text-xl font-semibold text-gray-900">Profile Information</h2>
                      <button
                        onClick={() => setIsEditing(!isEditing)}
                        className="flex items-center space-x-2 px-4 py-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all duration-200 border border-transparent hover:border-indigo-200"
                      >
                        <FaEdit className="w-4 h-4" />
                        <span className="font-medium">{isEditing ? 'Cancel' : 'Edit Profile'}</span>
                      </button>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <form onSubmit={handleSave} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Full Name
                          </label>
                          <input
                            type="text"
                            value={profileData.fullName}
                            onChange={(e) => setProfileData({...profileData, fullName: e.target.value})}
                            disabled={!isEditing}
                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 disabled:bg-gray-50 transition-all duration-200"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Email
                          </label>
                          <input
                            type="email"
                            value={profileData.email}
                            onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                            disabled={!isEditing}
                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 disabled:bg-gray-50 transition-all duration-200"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Phone Number
                          </label>
                          <input
                            type="tel"
                            value={profileData.phone}
                            onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                            disabled={!isEditing}
                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 disabled:bg-gray-50 transition-all duration-200"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Date of Birth
                          </label>
                          <input
                            type="date"
                            value={profileData.dateOfBirth}
                            onChange={(e) => setProfileData({...profileData, dateOfBirth: e.target.value})}
                            disabled={!isEditing}
                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 disabled:bg-gray-50 transition-all duration-200"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Address
                        </label>
                        <textarea
                          value={profileData.address}
                          onChange={(e) => setProfileData({...profileData, address: e.target.value})}
                          disabled={!isEditing}
                          rows={3}
                          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 disabled:bg-gray-50 transition-all duration-200"
                        />
                      </div>

                      {isEditing && (
                        <div className="flex justify-end space-x-3">
                          <button
                            type="button"
                            onClick={() => setIsEditing(false)}
                            className="px-4 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all duration-200"
                          >
                            Cancel
                          </button>
                          <button
                            type="submit"
                            className="px-4 py-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all duration-200"
                          >
                            Save Changes
                          </button>
                        </div>
                      )}
                    </form>
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200 hover:border-indigo-200 transition-colors duration-200">
                  <div className="px-6 py-4 border-b border-gray-100 bg-gradient-to-r from-indigo-50 to-white">
                    <h2 className="text-xl font-semibold text-gray-900">Account Details</h2>
                  </div>
                  <div className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="p-4 bg-gradient-to-br from-indigo-50 to-white rounded-lg border border-indigo-100 hover:border-indigo-200 transition-all duration-200 hover:shadow-md">
                        <p className="text-sm text-gray-600">Account Number</p>
                        <p className="text-lg font-semibold text-gray-900 mt-1">{profileData.accountNumber}</p>
                      </div>
                      <div className="p-4 bg-gradient-to-br from-indigo-50 to-white rounded-lg border border-indigo-100 hover:border-indigo-200 transition-all duration-200 hover:shadow-md">
                        <p className="text-sm text-gray-600">IFSC Code</p>
                        <p className="text-lg font-semibold text-gray-900 mt-1">{profileData.ifscCode}</p>
                      </div>
                      <div className="p-4 bg-gradient-to-br from-indigo-50 to-white rounded-lg border border-indigo-100 hover:border-indigo-200 transition-all duration-200 hover:shadow-md">
                        <p className="text-sm text-gray-600">Branch</p>
                        <p className="text-lg font-semibold text-gray-900 mt-1">{profileData.branch}</p>
                      </div>
                      <div className="p-4 bg-gradient-to-br from-indigo-50 to-white rounded-lg border border-indigo-100 hover:border-indigo-200 transition-all duration-200 hover:shadow-md">
                        <p className="text-sm text-gray-600">Account Type</p>
                        <p className="text-lg font-semibold text-gray-900 mt-1">{profileData.accountType}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}

            {activeTab === 'security' && (
              <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200 hover:border-indigo-200 transition-colors duration-200">
                <div className="px-6 py-4 border-b border-gray-100 bg-gradient-to-r from-indigo-50 to-white">
                  <h2 className="text-xl font-semibold text-gray-900">Security Settings</h2>
                </div>
                <div className="p-6 space-y-6">
                  {securitySettings.map((setting) => (
                    <div key={setting.id} className="flex items-center justify-between p-4 bg-gradient-to-br from-indigo-50 to-white rounded-lg border border-indigo-100 hover:border-indigo-200 transition-all duration-200 hover:shadow-md">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center border border-indigo-200">
                          {setting.icon}
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-900">{setting.title}</h3>
                          <p className="text-sm text-gray-600">{setting.description}</p>
                        </div>
                      </div>
                      <button 
                        onClick={() => setting.title === 'Password' && setIsChangePasswordOpen(true)}
                        className="px-4 py-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all duration-200 border border-transparent hover:border-indigo-200"
                      >
                        {setting.action}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'documents' && (
              <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200 hover:border-indigo-200 transition-colors duration-200">
                <div className="px-6 py-4 border-b border-gray-100 bg-gradient-to-r from-indigo-50 to-white">
                  <h2 className="text-xl font-semibold text-gray-900">Documents</h2>
                </div>
                <div className="p-6 space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="p-4 bg-gradient-to-br from-indigo-50 to-white rounded-lg border border-indigo-100 hover:border-indigo-200 transition-all duration-200 hover:shadow-md">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="font-medium text-gray-900">Aadhaar Card</h3>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 border border-green-200">
                          <FaCheckCircle className="w-3 h-3 mr-1" />
                          Verified
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-4">Government-issued ID proof</p>
                      <button className="text-indigo-600 hover:text-indigo-700 text-sm font-medium transition-colors duration-200">
                        View Document
                      </button>
                    </div>

                    <div className="p-4 bg-gradient-to-br from-indigo-50 to-white rounded-lg border border-indigo-100 hover:border-indigo-200 transition-all duration-200 hover:shadow-md">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="font-medium text-gray-900">PAN Card</h3>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 border border-green-200">
                          <FaCheckCircle className="w-3 h-3 mr-1" />
                          Verified
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-4">Tax identification number</p>
                      <button className="text-indigo-600 hover:text-indigo-700 text-sm font-medium transition-colors duration-200">
                        View Document
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'activity' && (
              <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200 hover:border-indigo-200 transition-colors duration-200">
                <div className="px-6 py-4 border-b border-gray-100 bg-gradient-to-r from-indigo-50 to-white">
                  <h2 className="text-xl font-semibold text-gray-900">Recent Activity</h2>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    {recentActivity.map((activity) => (
                      <div key={activity.id} className="flex items-center space-x-4 p-4 bg-gradient-to-br from-indigo-50 to-white rounded-lg border border-indigo-100 hover:border-indigo-200 transition-all duration-200 hover:shadow-md">
                        <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center border border-indigo-200">
                          {activity.icon}
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-gray-900">{activity.title}</p>
                          <p className="text-sm text-gray-600">{activity.description}</p>
                        </div>
                        <span className="text-sm text-gray-500">{activity.date}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Change Password Modal */}
      <Modal
        isOpen={isChangePasswordOpen}
        onClose={() => setIsChangePasswordOpen(false)}
        title="Change Password"
      >
        <form className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Current Password
            </label>
            <input
              type="password"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              New Password
            </label>
            <input
              type="password"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Confirm New Password
            </label>
            <input
              type="password"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
            />
          </div>
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={() => setIsChangePasswordOpen(false)}
              className="px-4 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all duration-200"
            >
              Update Password
            </button>
          </div>
        </form>
      </Modal>
      <DashboardPageFooter />
    </div>
  );
};

export default Profile; 