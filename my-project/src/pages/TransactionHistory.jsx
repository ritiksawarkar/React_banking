import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { 
  FaHistory, FaDownload, FaFilter, FaSearch,
  FaArrowUp, FaArrowDown, FaCalendarAlt, FaClock,
  FaCheckCircle, FaTimesCircle, FaSpinner, FaFileExport,
  FaMoneyBillWave, FaExchangeAlt, FaCreditCard, FaShoppingCart,
  FaHome, FaUtensils, FaCar, FaPlane, FaGift, FaGraduationCap,
  FaHospital, FaShoppingBag, FaGamepad, FaFilm
} from 'react-icons/fa';

const TransactionHistory = () => {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [dateRange, setDateRange] = useState({ start: '', end: '' });

  // Transaction Categories
  const categories = [
    { id: 'all', name: 'All Transactions', icon: <FaHistory /> },
    { id: 'transfer', name: 'Transfers', icon: <FaExchangeAlt /> },
    { id: 'payment', name: 'Payments', icon: <FaMoneyBillWave /> },
    { id: 'card', name: 'Card Transactions', icon: <FaCreditCard /> },
    { id: 'shopping', name: 'Shopping', icon: <FaShoppingCart /> }
  ];

  // Transaction Types with Icons
  const transactionIcons = {
    transfer: <FaExchangeAlt className="w-5 h-5" />,
    payment: <FaMoneyBillWave className="w-5 h-5" />,
    shopping: <FaShoppingCart className="w-5 h-5" />,
    food: <FaUtensils className="w-5 h-5" />,
    travel: <FaPlane className="w-5 h-5" />,
    entertainment: <FaFilm className="w-5 h-5" />,
    education: <FaGraduationCap className="w-5 h-5" />,
    healthcare: <FaHospital className="w-5 h-5" />,
    gift: <FaGift className="w-5 h-5" />,
    gaming: <FaGamepad className="w-5 h-5" />
  };

  // Sample Transactions
  const transactions = [
    {
      id: 1,
      type: 'transfer',
      amount: 5000.00,
      description: 'Transfer to Savings Account',
      date: '2024-03-15',
      time: '09:30 AM',
      status: 'completed',
      category: 'Transfer',
      recipient: 'Savings Account',
      reference: 'TRF-2024-001'
    },
    {
      id: 2,
      type: 'payment',
      amount: 2500.00,
      description: 'Electricity Bill Payment',
      date: '2024-03-14',
      time: '02:15 PM',
      status: 'completed',
      category: 'Bill Payment',
      recipient: 'State Power Board',
      reference: 'BILL-2024-002'
    },
    {
      id: 3,
      type: 'shopping',
      amount: 1500.00,
      description: 'Grocery Shopping',
      date: '2024-03-13',
      time: '11:45 AM',
      status: 'completed',
      category: 'Shopping',
      recipient: 'SuperMart',
      reference: 'POS-2024-003'
    },
    {
      id: 4,
      type: 'food',
      amount: 800.00,
      description: 'Restaurant Dinner',
      date: '2024-03-12',
      time: '08:30 PM',
      status: 'completed',
      category: 'Food & Dining',
      recipient: 'Food Court',
      reference: 'POS-2024-004'
    },
    {
      id: 5,
      type: 'travel',
      amount: 3500.00,
      description: 'Flight Booking',
      date: '2024-03-11',
      time: '03:20 PM',
      status: 'completed',
      category: 'Travel',
      recipient: 'Air Travels',
      reference: 'POS-2024-005'
    }
  ];

  const handleExport = () => {
    // Implement export functionality
    console.log('Exporting transactions...');
  };

  const handleFilter = (filter) => {
    setSelectedFilter(filter);
  };

  const filteredTransactions = transactions.filter(transaction => {
    const matchesSearch = transaction.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         transaction.recipient.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         transaction.reference.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = selectedFilter === 'all' || transaction.type === selectedFilter;
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
                  <FaHistory className="w-8 h-8 text-white" />
                </div>
                <div className="text-center md:text-left">
                  <h1 className="text-2xl font-bold text-white">Transaction History</h1>
                  <p className="text-blue-100 mt-1">View and manage your transaction history</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Filters and Search */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="p-6">
                <div className="flex flex-col md:flex-row gap-4">
                  {/* Search */}
                  <div className="flex-1">
                    <div className="relative">
                      <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Search transactions..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                  </div>

                  {/* Date Range */}
                  <div className="flex gap-4">
                    <input
                      type="date"
                      value={dateRange.start}
                      onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
                      className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                    <input
                      type="date"
                      value={dateRange.end}
                      onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
                      className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  {/* Export Button */}
                  <button
                    onClick={handleExport}
                    className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <FaFileExport className="w-5 h-5 mr-2" />
                    Export
                  </button>
                </div>
              </div>
            </div>

            {/* Transactions List */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="p-6">
                <div className="space-y-4">
                  {filteredTransactions.map((transaction) => (
                    <div
                      key={transaction.id}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:shadow-sm transition-all duration-300"
                    >
                      <div className="flex items-center space-x-4">
                        <div className={`w-10 h-10 rounded-full ${
                          transaction.type === 'transfer' ? 'bg-blue-100 text-blue-600' :
                          transaction.type === 'payment' ? 'bg-green-100 text-green-600' :
                          transaction.type === 'shopping' ? 'bg-purple-100 text-purple-600' :
                          'bg-gray-100 text-gray-600'
                        } flex items-center justify-center`}>
                          {transactionIcons[transaction.type]}
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{transaction.description}</p>
                          <div className="flex items-center space-x-2 mt-1">
                            <span className="text-sm text-gray-500">{transaction.recipient}</span>
                            <span className="text-sm text-gray-500">•</span>
                            <span className="text-sm text-gray-500">{transaction.date}</span>
                            <span className="text-sm text-gray-500">•</span>
                            <span className="text-sm text-gray-500">{transaction.time}</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className={`font-medium ${
                          transaction.type === 'transfer' ? 'text-red-600' : 'text-green-600'
                        }`}>
                          {transaction.type === 'transfer' ? '-' : '+'}₹{transaction.amount.toLocaleString()}
                        </p>
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium mt-1 bg-green-100 text-green-800">
                          <FaCheckCircle className="w-3 h-3 mr-1" />
                          {transaction.status}
                        </span>
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

            {/* Transaction Summary */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-100">
                <h2 className="text-xl font-semibold text-gray-900">Summary</h2>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Total Transactions</span>
                    <span className="font-medium text-gray-900">{transactions.length}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Total Spent</span>
                    <span className="font-medium text-red-600">₹13,300.00</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Total Received</span>
                    <span className="font-medium text-green-600">₹5,000.00</span>
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

export default TransactionHistory; 