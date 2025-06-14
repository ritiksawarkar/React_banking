import React, { useState } from 'react';
import { FaShieldAlt, FaLock, FaFingerprint, FaMobileAlt, FaKey, FaHistory, FaBell, FaExclamationTriangle, FaCheckCircle } from 'react-icons/fa';
import DashboardHeader from '../components/DashboardHeader';

const AccountSecurity = () => {
  const [securitySettings, setSecuritySettings] = useState({
    twoFactorAuth: {
      enabled: false,
      method: 'app', // 'app' or 'sms'
      backupCodes: ['123456', '234567', '345678', '456789', '567890'],
    },
    loginSecurity: {
      biometricEnabled: true,
      deviceTrusted: true,
      lastPasswordChange: '2024-03-15',
      passwordExpiryDays: 90,
    },
    sessionSecurity: {
      activeSessions: [
        { id: 1, device: 'Chrome on Windows', location: 'Pune, India', lastActive: '2024-03-21 15:30' },
        { id: 2, device: 'Safari on iPhone', location: 'Mumbai, India', lastActive: '2024-03-21 14:45' },
      ],
      autoLogout: 30, // minutes
    },
    alerts: {
      loginAlerts: true,
      transactionAlerts: true,
      securityAlerts: true,
      unusualActivityAlerts: true,
    },
  });

  const handleToggle = (category, setting) => {
    setSecuritySettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [setting]: !prev[category][setting]
      }
    }));
  };

  const handleSelect = (category, setting, value) => {
    setSecuritySettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [setting]: value
      }
    }));
  };

  const handleTerminateSession = (sessionId) => {
    setSecuritySettings(prev => ({
      ...prev,
      sessionSecurity: {
        ...prev.sessionSecurity,
        activeSessions: prev.sessionSecurity.activeSessions.filter(session => session.id !== sessionId)
      }
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-50">
      <DashboardHeader />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-24">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Account Security</h1>
          
          {/* Two-Factor Authentication */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-6">
            <div className="bg-gradient-to-r from-indigo-600 to-blue-600 px-6 py-4">
              <div className="flex items-center space-x-3">
                <FaShieldAlt className="w-6 h-6 text-white" />
                <h2 className="text-xl font-semibold text-white">Two-Factor Authentication</h2>
              </div>
            </div>
            <div className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">Enable 2FA</h3>
                  <p className="text-sm text-gray-500">Add an extra layer of security to your account</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={securitySettings.twoFactorAuth.enabled}
                    onChange={() => handleToggle('twoFactorAuth', 'enabled')}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                </label>
              </div>
              {securitySettings.twoFactorAuth.enabled && (
                <>
                  <div>
                    <label className="block text-lg font-medium text-gray-900 mb-2">
                      Authentication Method
                    </label>
                    <select
                      value={securitySettings.twoFactorAuth.method}
                      onChange={(e) => handleSelect('twoFactorAuth', 'method', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    >
                      <option value="app">Authenticator App</option>
                      <option value="sms">SMS</option>
                    </select>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-medium text-gray-900 mb-2">Backup Codes</h4>
                    <p className="text-sm text-gray-500 mb-3">Save these codes in a secure place. You can use them to access your account if you lose your 2FA device.</p>
                    <div className="grid grid-cols-2 gap-2">
                      {securitySettings.twoFactorAuth.backupCodes.map((code, index) => (
                        <div key={index} className="bg-white p-2 rounded border border-gray-200 text-center font-mono">
                          {code}
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Login Security */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-6">
            <div className="bg-gradient-to-r from-indigo-600 to-blue-600 px-6 py-4">
              <div className="flex items-center space-x-3">
                <FaLock className="w-6 h-6 text-white" />
                <h2 className="text-xl font-semibold text-white">Login Security</h2>
              </div>
            </div>
            <div className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">Biometric Login</h3>
                  <p className="text-sm text-gray-500">Use fingerprint or face recognition to login</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={securitySettings.loginSecurity.biometricEnabled}
                    onChange={() => handleToggle('loginSecurity', 'biometricEnabled')}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                </label>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">Trusted Device</h3>
                  <p className="text-sm text-gray-500">This device is trusted for login</p>
                </div>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                  <FaCheckCircle className="w-4 h-4 mr-1" />
                  Trusted
                </span>
              </div>
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <FaExclamationTriangle className="h-5 w-5 text-yellow-400" />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-yellow-700">
                      Your password was last changed on {securitySettings.loginSecurity.lastPasswordChange}. 
                      Consider changing it every {securitySettings.loginSecurity.passwordExpiryDays} days for better security.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Active Sessions */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-6">
            <div className="bg-gradient-to-r from-indigo-600 to-blue-600 px-6 py-4">
              <div className="flex items-center space-x-3">
                <FaHistory className="w-6 h-6 text-white" />
                <h2 className="text-xl font-semibold text-white">Active Sessions</h2>
              </div>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {securitySettings.sessionSecurity.activeSessions.map((session) => (
                  <div key={session.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="flex-shrink-0">
                        <FaMobileAlt className="w-6 h-6 text-indigo-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{session.device}</p>
                        <p className="text-sm text-gray-500">{session.location}</p>
                        <p className="text-xs text-gray-400">Last active: {session.lastActive}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => handleTerminateSession(session.id)}
                      className="px-3 py-1 text-sm text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      Terminate
                    </button>
                  </div>
                ))}
              </div>
              <div className="mt-4">
                <label className="block text-lg font-medium text-gray-900 mb-2">
                  Auto Logout After (minutes)
                </label>
                <select
                  value={securitySettings.sessionSecurity.autoLogout}
                  onChange={(e) => handleSelect('sessionSecurity', 'autoLogout', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="15">15 minutes</option>
                  <option value="30">30 minutes</option>
                  <option value="60">1 hour</option>
                  <option value="120">2 hours</option>
                </select>
              </div>
            </div>
          </div>

          {/* Security Alerts */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="bg-gradient-to-r from-indigo-600 to-blue-600 px-6 py-4">
              <div className="flex items-center space-x-3">
                <FaBell className="w-6 h-6 text-white" />
                <h2 className="text-xl font-semibold text-white">Security Alerts</h2>
              </div>
            </div>
            <div className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">Login Alerts</h3>
                  <p className="text-sm text-gray-500">Get notified when someone logs into your account</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={securitySettings.alerts.loginAlerts}
                    onChange={() => handleToggle('alerts', 'loginAlerts')}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                </label>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">Transaction Alerts</h3>
                  <p className="text-sm text-gray-500">Get notified for all transactions</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={securitySettings.alerts.transactionAlerts}
                    onChange={() => handleToggle('alerts', 'transactionAlerts')}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                </label>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">Security Alerts</h3>
                  <p className="text-sm text-gray-500">Get notified about security-related events</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={securitySettings.alerts.securityAlerts}
                    onChange={() => handleToggle('alerts', 'securityAlerts')}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                </label>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">Unusual Activity Alerts</h3>
                  <p className="text-sm text-gray-500">Get notified about suspicious activities</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={securitySettings.alerts.unusualActivityAlerts}
                    onChange={() => handleToggle('alerts', 'unusualActivityAlerts')}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                </label>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AccountSecurity; 