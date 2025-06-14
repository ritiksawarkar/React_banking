import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { 
  FaCoins, FaPlus, FaSearch, FaFilter,
  FaArrowUp, FaArrowDown, FaStar, FaRegStar,
  FaMoneyBillWave, FaExchangeAlt, FaChartBar,
  FaHistory, FaBell, FaClock, FaCheckCircle,
  FaTimesCircle, FaSpinner, FaInfoCircle
} from 'react-icons/fa';

const Crypto = () => {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [watchlist, setWatchlist] = useState([]);

  // Crypto Categories
  const categories = [
    { id: 'all', name: 'All Crypto', icon: <FaCoins /> },
    { id: 'defi', name: 'DeFi', icon: <FaExchangeAlt /> },
    { id: 'nft', name: 'NFT', icon: <FaChartBar /> },
    { id: 'gaming', name: 'Gaming', icon: <FaMoneyBillWave /> },
    { id: 'layer1', name: 'Layer 1', icon: <FaInfoCircle /> }
  ];

  // Sample Cryptocurrency Data
  const cryptocurrencies = [
    {
      id: 1,
      symbol: 'BTC',
      name: 'Bitcoin',
      price: 65432.50,
      change: 2.5,
      changePercent: 1.45,
      volume: '$45.2B',
      marketCap: '$1.2T',
      category: 'layer1',
      lastUpdated: '2024-03-15 14:30:00'
    },
    {
      id: 2,
      symbol: 'ETH',
      name: 'Ethereum',
      price: 3456.78,
      change: -1.2,
      changePercent: -0.29,
      volume: '$28.5B',
      marketCap: '$415B',
      category: 'layer1',
      lastUpdated: '2024-03-15 14:30:00'
    },
    {
      id: 3,
      symbol: 'UNI',
      name: 'Uniswap',
      price: 12.45,
      change: 0.8,
      changePercent: 0.41,
      volume: '$1.2B',
      marketCap: '$8.5B',
      category: 'defi',
      lastUpdated: '2024-03-15 14:30:00'
    },
    {
      id: 4,
      symbol: 'AXS',
      name: 'Axie Infinity',
      price: 8.75,
      change: -0.5,
      changePercent: -0.32,
      volume: '$850M',
      marketCap: '$1.2B',
      category: 'gaming',
      lastUpdated: '2024-03-15 14:30:00'
    },
    {
      id: 5,
      symbol: 'APE',
      name: 'ApeCoin',
      price: 2.80,
      change: 1.2,
      changePercent: 1.15,
      volume: '$150M',
      marketCap: '$850M',
      category: 'nft',
      lastUpdated: '2024-03-15 14:30:00'
    }
  ];

  const handleAddToWatchlist = (cryptoId) => {
    if (!watchlist.includes(cryptoId)) {
      setWatchlist([...watchlist, cryptoId]);
    } else {
      setWatchlist(watchlist.filter(id => id !== cryptoId));
    }
  };

  const handleFilter = (filter) => {
    setSelectedFilter(filter);
  };

  const filteredCryptos = cryptocurrencies.filter(crypto => {
    const matchesSearch = crypto.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         crypto.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = selectedFilter === 'all' || crypto.category === selectedFilter;
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
                  <FaCoins className="w-8 h-8 text-white" />
                </div>
                <div className="text-center md:text-left">
                  <h1 className="text-2xl font-bold text-white">Cryptocurrency</h1>
                  <p className="text-blue-100 mt-1">Trade digital assets securely</p>
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
                        placeholder="Search cryptocurrencies..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                  </div>

                  {/* Filter Button */}
                  <button className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                    <FaFilter className="w-5 h-5 mr-2 text-gray-600" />
                    Filter
                  </button>
                </div>
              </div>
            </div>

            {/* Cryptocurrencies List */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="p-6">
                <div className="space-y-4">
                  {filteredCryptos.map((crypto) => (
                    <div
                      key={crypto.id}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:shadow-sm transition-all duration-300"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
                          {crypto.symbol.charAt(0)}
                        </div>
                        <div>
                          <div className="flex items-center space-x-2">
                            <p className="font-medium text-gray-900">{crypto.symbol}</p>
                            <button
                              onClick={() => handleAddToWatchlist(crypto.id)}
                              className="text-gray-400 hover:text-yellow-500 transition-colors"
                            >
                              {watchlist.includes(crypto.id) ? <FaStar className="w-4 h-4" /> : <FaRegStar className="w-4 h-4" />}
                            </button>
                          </div>
                          <p className="text-sm text-gray-500">{crypto.name}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-8">
                        <div className="text-right">
                          <p className="font-medium text-gray-900">${crypto.price.toLocaleString()}</p>
                          <div className={`flex items-center text-sm ${
                            crypto.change >= 0 ? 'text-green-600' : 'text-red-600'
                          }`}>
                            {crypto.change >= 0 ? <FaArrowUp className="w-3 h-3 mr-1" /> : <FaArrowDown className="w-3 h-3 mr-1" />}
                            <span>{Math.abs(crypto.change)} ({Math.abs(crypto.changePercent)}%)</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-gray-500">Volume</p>
                          <p className="font-medium text-gray-900">{crypto.volume}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-gray-500">Market Cap</p>
                          <p className="font-medium text-gray-900">{crypto.marketCap}</p>
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

            {/* Market Summary */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-100">
                <h2 className="text-xl font-semibold text-gray-900">Market Summary</h2>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Total Market Cap</span>
                    <div className="text-right">
                      <p className="font-medium text-gray-900">$2.4T</p>
                      <p className="text-sm text-green-600">+2.1%</p>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">24h Volume</span>
                    <div className="text-right">
                      <p className="font-medium text-gray-900">$85.2B</p>
                      <p className="text-sm text-green-600">+5.3%</p>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">BTC Dominance</span>
                    <div className="text-right">
                      <p className="font-medium text-gray-900">48.2%</p>
                      <p className="text-sm text-red-600">-0.8%</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Watchlist */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-100">
                <h2 className="text-xl font-semibold text-gray-900">Watchlist</h2>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {cryptocurrencies.filter(crypto => watchlist.includes(crypto.id)).map((crypto) => (
                    <div key={crypto.id} className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-gray-900">{crypto.symbol}</p>
                        <p className="text-sm text-gray-500">${crypto.price.toLocaleString()}</p>
                      </div>
                      <div className="text-right">
                        <p className={`text-sm ${crypto.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {crypto.change >= 0 ? '+' : ''}{crypto.change}%
                        </p>
                      </div>
                    </div>
                  ))}
                  {watchlist.length === 0 && (
                    <p className="text-gray-500 text-center py-4">No cryptocurrencies in watchlist</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Crypto; 