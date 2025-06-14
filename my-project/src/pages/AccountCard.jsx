import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { 
  FaCreditCard, FaPlus, FaSearch, FaFilter,
  FaLock, FaUnlock, FaEye, FaEyeSlash,
  FaMoneyBillWave, FaExchangeAlt, FaChartBar,
  FaHistory, FaBell, FaClock, FaCheckCircle,
  FaTimesCircle, FaSpinner, FaInfoCircle, FaCog
} from 'react-icons/fa';

const AccountCard = () => {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [showCardDetails, setShowCardDetails] = useState({});

  // Card Categories
  const categories = [
    { id: 'all', name: 'All Cards', icon: <FaCreditCard /> },
    { id: 'credit', name: 'Credit Cards', icon: <FaMoneyBillWave /> },
    { id: 'debit', name: 'Debit Cards', icon: <FaExchangeAlt /> },
    { id: 'virtual', name: 'Virtual Cards', icon: <FaCreditCard /> }
  ];

  // Sample Cards Data
  const cards = [
    {
      id: 1,
      name: 'FinVerse Platinum',
      type: 'credit',
      number: '4532 •••• •••• 7890',
      fullNumber: '4532 1234 5678 7890',
      expiryDate: '12/25',
      cvv: '123',
      balance: 25000,
      limit: 50000,
      status: 'active',
      lastUsed: '2024-03-15 14:30:00'
    },
    {
      id: 2,
      name: 'FinVerse Debit',
      type: 'debit',
      number: '5678 •••• •••• 1234',
      fullNumber: '5678 9012 3456 1234',
      expiryDate: '09/26',
      cvv: '456',
      balance: 15000,
      limit: 15000,
      status: 'active',
      lastUsed: '2024-03-14 10:15:00'
    },
    {
      id: 3,
      name: 'FinVerse Virtual',
      type: 'virtual',
      number: '8901 •••• •••• 5678',
      fullNumber: '8901 2345 6789 5678',
      expiryDate: '06/25',
      cvv: '789',
      balance: 5000,
      limit: 5000,
      status: 'active',
      lastUsed: '2024-03-13 16:45:00'
    }
  ];

  const handleToggleCardDetails = (cardId) => {
    setShowCardDetails(prev => ({
      ...prev,
      [cardId]: !prev[cardId]
    }));
  };

  const handleFilter = (filter) => {
    setSelectedFilter(filter);
  };

  const filteredCards = cards.filter(card => {
    const matchesSearch = card.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = selectedFilter === 'all' || card.type === selectedFilter;
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
                  <FaCreditCard className="w-8 h-8 text-white" />
                </div>
                <div className="text-center md:text-left">
                  <h1 className="text-2xl font-bold text-white">Account Cards</h1>
                  <p className="text-blue-100 mt-1">Manage your credit and debit cards</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Search and Filters */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="p-6">
                <div className="flex flex-col md:flex-row gap-4">
                  {/* Search */}
                  <div className="flex-1">
                    <div className="relative">
                      <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Search cards..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                  </div>

                  {/* Add Card Button */}
                  <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    <FaPlus className="w-5 h-5 mr-2" />
                    Add New Card
                  </button>
                </div>
              </div>
            </div>

            {/* Cards List */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="p-6">
                <div className="space-y-6">
                  {filteredCards.map((card) => (
                    <div
                      key={card.id}
                      className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl p-6 text-white shadow-lg"
                    >
                      <div className="flex justify-between items-start mb-6">
                        <div>
                          <h3 className="text-xl font-semibold">{card.name}</h3>
                          <p className="text-blue-100 mt-1">{card.type.charAt(0).toUpperCase() + card.type.slice(1)} Card</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => handleToggleCardDetails(card.id)}
                            className="p-2 text-blue-100 hover:text-white transition-colors"
                          >
                            {showCardDetails[card.id] ? <FaEyeSlash className="w-5 h-5" /> : <FaEye className="w-5 h-5" />}
                          </button>
                          <button className="p-2 text-blue-100 hover:text-white transition-colors">
                            <FaLock className="w-5 h-5" />
                          </button>
                        </div>
                      </div>

                      <div className="mb-6">
                        <p className="text-2xl font-mono tracking-wider mb-2">
                          {showCardDetails[card.id] ? card.fullNumber : card.number}
                        </p>
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="text-sm text-blue-100">Expiry Date</p>
                            <p className="font-mono">{showCardDetails[card.id] ? card.expiryDate : '••/••'}</p>
                          </div>
                          <div>
                            <p className="text-sm text-blue-100">CVV</p>
                            <p className="font-mono">{showCardDetails[card.id] ? card.cvv : '•••'}</p>
                          </div>
                        </div>
                      </div>

                      <div className="flex justify-between items-center pt-4 border-t border-blue-500/30">
                        <div>
                          <p className="text-sm text-blue-100">Available Balance</p>
                          <p className="text-xl font-semibold">₹{card.balance.toLocaleString()}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-blue-100">Credit Limit</p>
                          <p className="text-xl font-semibold">₹{card.limit.toLocaleString()}</p>
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

            {/* Card Security */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-100">
                <h2 className="text-xl font-semibold text-gray-900">Card Security</h2>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-full bg-green-100 text-green-600 flex items-center justify-center">
                        <FaLock className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">Card Lock</p>
                        <p className="text-sm text-gray-500">Lock your card temporarily</p>
                      </div>
                    </div>
                    <button className="p-2 text-gray-400 hover:text-gray-600">
                      <FaUnlock className="w-5 h-5" />
                    </button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
                        <FaBell className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">Transaction Alerts</p>
                        <p className="text-sm text-gray-500">Get notified for transactions</p>
                      </div>
                    </div>
                    <button className="p-2 text-gray-400 hover:text-gray-600">
                      <FaCog className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Transactions */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-100">
                <h2 className="text-xl font-semibold text-gray-900">Recent Transactions</h2>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-900">Amazon Shopping</p>
                      <p className="text-sm text-gray-500">Today, 2:30 PM</p>
                    </div>
                    <p className="font-medium text-red-600">-₹1,499</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-900">Swiggy Food</p>
                      <p className="text-sm text-gray-500">Today, 1:15 PM</p>
                    </div>
                    <p className="font-medium text-red-600">-₹350</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-900">Salary Credit</p>
                      <p className="text-sm text-gray-500">Yesterday, 10:00 AM</p>
                    </div>
                    <p className="font-medium text-green-600">+₹45,000</p>
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

export default AccountCard; 