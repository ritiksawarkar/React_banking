import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { 
  FaCalendarAlt, FaPlus, FaEdit, FaTrash, FaSearch,
  FaMoneyBillWave, FaExchangeAlt, FaCreditCard, FaShoppingCart,
  FaHome, FaUtensils, FaCar, FaPlane, FaGift, FaGraduationCap,
  FaHospital, FaShoppingBag, FaGamepad, FaFilm, FaBell,
  FaClock, FaCheckCircle, FaTimesCircle, FaSpinner
} from 'react-icons/fa';

const ScheduledPayments = () => {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);

  // Payment Categories
  const categories = [
    { id: 'all', name: 'All Payments', icon: <FaMoneyBillWave /> },
    { id: 'bills', name: 'Bills', icon: <FaHome /> },
    { id: 'transfer', name: 'Transfers', icon: <FaExchangeAlt /> },
    { id: 'subscription', name: 'Subscriptions', icon: <FaCreditCard /> },
    { id: 'loan', name: 'Loan Payments', icon: <FaMoneyBillWave /> }
  ];

  // Payment Types with Icons
  const paymentIcons = {
    bills: <FaHome className="w-5 h-5" />,
    transfer: <FaExchangeAlt className="w-5 h-5" />,
    subscription: <FaCreditCard className="w-5 h-5" />,
    loan: <FaMoneyBillWave className="w-5 h-5" />,
    shopping: <FaShoppingCart className="w-5 h-5" />,
    food: <FaUtensils className="w-5 h-5" />,
    travel: <FaPlane className="w-5 h-5" />,
    entertainment: <FaFilm className="w-5 h-5" />,
    education: <FaGraduationCap className="w-5 h-5" />,
    healthcare: <FaHospital className="w-5 h-5" />
  };

  // Sample Scheduled Payments
  const scheduledPayments = [
    {
      id: 1,
      type: 'bills',
      amount: 2500.00,
      description: 'Electricity Bill Payment',
      scheduledDate: '2024-03-25',
      frequency: 'Monthly',
      status: 'scheduled',
      category: 'Bill Payment',
      recipient: 'State Power Board',
      reference: 'BILL-2024-001'
    },
    {
      id: 2,
      type: 'transfer',
      amount: 5000.00,
      description: 'Monthly Savings Transfer',
      scheduledDate: '2024-03-28',
      frequency: 'Monthly',
      status: 'scheduled',
      category: 'Transfer',
      recipient: 'Savings Account',
      reference: 'TRF-2024-001'
    },
    {
      id: 3,
      type: 'subscription',
      amount: 999.00,
      description: 'Netflix Subscription',
      scheduledDate: '2024-04-01',
      frequency: 'Monthly',
      status: 'scheduled',
      category: 'Subscription',
      recipient: 'Netflix',
      reference: 'SUB-2024-001'
    },
    {
      id: 4,
      type: 'loan',
      amount: 15000.00,
      description: 'Home Loan EMI',
      scheduledDate: '2024-03-30',
      frequency: 'Monthly',
      status: 'scheduled',
      category: 'Loan Payment',
      recipient: 'HDFC Bank',
      reference: 'LOAN-2024-001'
    },
    {
      id: 5,
      type: 'bills',
      amount: 800.00,
      description: 'Internet Bill',
      scheduledDate: '2024-04-05',
      frequency: 'Monthly',
      status: 'scheduled',
      category: 'Bill Payment',
      recipient: 'Airtel',
      reference: 'BILL-2024-002'
    }
  ];

  const handleAddPayment = () => {
    setShowAddModal(true);
  };

  const handleEditPayment = (paymentId) => {
    // Implement edit functionality
    console.log('Editing payment:', paymentId);
  };

  const handleDeletePayment = (paymentId) => {
    // Implement delete functionality
    console.log('Deleting payment:', paymentId);
  };

  const handleFilter = (filter) => {
    setSelectedFilter(filter);
  };

  const filteredPayments = scheduledPayments.filter(payment => {
    const matchesSearch = payment.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         payment.recipient.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         payment.reference.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = selectedFilter === 'all' || payment.type === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-50">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-24">
        {/* Page Header */}
        <div className="mb-8">
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-8">
              <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6">
                <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border-4 border-white/30">
                  <FaCalendarAlt className="w-8 h-8 text-white" />
                </div>
                <div className="text-center md:text-left">
                  <h1 className="text-2xl font-bold text-white">Scheduled Payments</h1>
                  <p className="text-blue-100 mt-1">Manage your upcoming and recurring payments</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Search and Add Button */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="p-6">
                <div className="flex flex-col md:flex-row gap-4">
                  {/* Search */}
                  <div className="flex-1">
                    <div className="relative">
                      <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Search scheduled payments..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                  </div>

                  {/* Add Payment Button */}
                  <button
                    onClick={handleAddPayment}
                    className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <FaPlus className="w-5 h-5 mr-2" />
                    Schedule Payment
                  </button>
                </div>
              </div>
            </div>

            {/* Scheduled Payments List */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="p-6">
                <div className="space-y-4">
                  {filteredPayments.map((payment) => (
                    <div
                      key={payment.id}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:shadow-sm transition-all duration-300"
                    >
                      <div className="flex items-center space-x-4">
                        <div className={`w-10 h-10 rounded-full ${
                          payment.type === 'bills' ? 'bg-blue-100 text-blue-600' :
                          payment.type === 'transfer' ? 'bg-green-100 text-green-600' :
                          payment.type === 'subscription' ? 'bg-purple-100 text-purple-600' :
                          payment.type === 'loan' ? 'bg-red-100 text-red-600' :
                          'bg-gray-100 text-gray-600'
                        } flex items-center justify-center`}>
                          {paymentIcons[payment.type]}
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{payment.description}</p>
                          <div className="flex items-center space-x-2 mt-1">
                            <span className="text-sm text-gray-500">{payment.recipient}</span>
                            <span className="text-sm text-gray-500">•</span>
                            <span className="text-sm text-gray-500">{payment.scheduledDate}</span>
                            <span className="text-sm text-gray-500">•</span>
                            <span className="text-sm text-gray-500">{payment.frequency}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="text-right">
                          <p className="font-medium text-gray-900">₹{payment.amount.toLocaleString()}</p>
                          <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium mt-1 bg-blue-100 text-blue-800">
                            <FaClock className="w-3 h-3 mr-1" />
                            {payment.status}
                          </span>
                        </div>
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleEditPayment(payment.id)}
                            className="p-2 text-gray-600 hover:text-blue-600 transition-colors"
                          >
                            <FaEdit className="w-5 h-5" />
                          </button>
                          <button
                            onClick={() => handleDeletePayment(payment.id)}
                            className="p-2 text-gray-600 hover:text-red-600 transition-colors"
                          >
                            <FaTrash className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Categories */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-100">
                <h2 className="text-xl font-semibold text-gray-900">Categories</h2>
              </div>
              <div className="p-6">
                <div className="space-y-2">
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => handleFilter(category.id)}
                      className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                        selectedFilter === category.id
                          ? 'bg-blue-50 text-blue-600'
                          : 'hover:bg-gray-50'
                      }`}
                    >
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        selectedFilter === category.id
                          ? 'bg-blue-100 text-blue-600'
                          : 'bg-gray-100 text-gray-600'
                      }`}>
                        {category.icon}
                      </div>
                      <span className="font-medium">{category.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Payment Summary */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-100">
                <h2 className="text-xl font-semibold text-gray-900">Summary</h2>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Total Scheduled</span>
                    <span className="font-medium text-gray-900">{scheduledPayments.length}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Total Amount</span>
                    <span className="font-medium text-gray-900">₹24,299.00</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Next Payment</span>
                    <span className="font-medium text-blue-600">₹2,500.00</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ScheduledPayments; 