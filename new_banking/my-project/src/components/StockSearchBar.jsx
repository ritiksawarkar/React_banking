import React from 'react';
import { FaSearch, FaTimes, FaFilter, FaChartBar, FaHeart } from 'react-icons/fa';
import PropTypes from 'prop-types';

const StockSearchBar = ({
  searchQuery,
  onSearchChange,
  searchResults,
  onSelectSuggestion,
  onClear,
  onShowFilterModal,
  onShowStockScreenerModal,
  onShowWatchlistModal,
  onShowCompareModal,
  watchlistLength,
  compareLength,
  showClearAll
}) => (
  <div className="mb-6">
    <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
      <div className="flex flex-col lg:flex-row gap-3 items-center">
        {/* Search Bar */}
        <div className="relative flex-1 w-full">
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search stocks by symbol, name, or sector..."
            value={searchQuery}
            onChange={onSearchChange}
            className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 bg-white shadow-sm text-sm"
          />
          {searchQuery && (
            <button
              onClick={onClear}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <FaTimes className="w-6 h-6" />
            </button>
          )}
          {/* Stock Suggestions Dropdown */}
          {searchQuery && searchResults.length > 0 && (
            <div className="absolute z-20 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden max-h-64">
              <div className="max-h-64 overflow-y-auto">
                {searchResults.slice(0, 8).map((stock) => (
                  <div
                    key={stock.symbol}
                    className="p-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0 transition-colors"
                    onClick={() => onSelectSuggestion(stock)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center">
                          <img src={stock.logo} alt={stock.name} className="w-6 h-6 object-contain" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900 text-sm">{stock.symbol}</p>
                          <p className="text-xs text-gray-500 truncate max-w-32">{stock.name}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-gray-900 text-sm">₹{stock.price.toFixed(2)}</p>
                        <p className={`text-xs ${stock.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {stock.change >= 0 ? '+' : ''}{stock.change.toFixed(2)} ({stock.changePercent.toFixed(2)}%)
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        {/* Action Buttons */}
        <div className="flex flex-wrap gap-2 w-full lg:w-auto">
          <button
            onClick={onShowFilterModal}
            className="flex items-center space-x-2 px-3 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm"
          >
            <FaFilter className="w-3 h-3" />
            <span>Filters</span>
          </button>
          <button
            onClick={onShowStockScreenerModal}
            className="flex items-center space-x-2 px-3 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors text-sm"
          >
            <FaChartBar className="w-3 h-3" />
            <span>Stock Screener</span>
          </button>
          <button
            onClick={onShowWatchlistModal}
            className="flex items-center space-x-2 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
          >
            <FaHeart className="w-3 h-3" />
            <span>Watchlist ({watchlistLength})</span>
          </button>
          <button
            onClick={onShowCompareModal}
            className="flex items-center space-x-2 px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm"
          >
            <FaChartBar className="w-3 h-3" />
            <span>Compare ({compareLength}/4)</span>
          </button>
          {showClearAll && (
            <button
              onClick={onClear}
              className="flex items-center space-x-2 px-3 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors text-sm"
            >
              <FaTimes className="w-3 h-3" />
              <span>Clear All</span>
            </button>
          )}
        </div>
      </div>
    </div>
  </div>
);

StockSearchBar.propTypes = {
  searchQuery: PropTypes.string.isRequired,
  onSearchChange: PropTypes.func.isRequired,
  searchResults: PropTypes.arrayOf(PropTypes.object).isRequired,
  onSelectSuggestion: PropTypes.func.isRequired,
  onClear: PropTypes.func.isRequired,
  onShowFilterModal: PropTypes.func.isRequired,
  onShowStockScreenerModal: PropTypes.func.isRequired,
  onShowWatchlistModal: PropTypes.func.isRequired,
  onShowCompareModal: PropTypes.func.isRequired,
  watchlistLength: PropTypes.number.isRequired,
  compareLength: PropTypes.number.isRequired,
  showClearAll: PropTypes.bool.isRequired,
};

export default StockSearchBar; 