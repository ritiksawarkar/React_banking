import React from 'react';
import { FaMinus } from 'react-icons/fa';

const WatchlistStockCard = ({ stock, onRemove }) => {
  return (
    <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-3">
          <img src={stock.logo} alt={stock.name} className="w-10 h-10 rounded-lg bg-white object-contain" />
          <div>
            <h3 className="font-medium text-gray-900">{stock.symbol}</h3>
            <p className="text-sm text-gray-500">{stock.name}</p>
          </div>
        </div>
        <button
          onClick={onRemove}
          className="text-red-500 hover:text-red-600"
        >
          <FaMinus className="w-4 h-4" />
        </button>
      </div>
      <div className="space-y-2">
        <div className="flex justify-between">
          <span className="text-sm text-gray-500">Price</span>
          <span className="font-medium text-gray-900">₹{stock.price.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-sm text-gray-500">Change</span>
          <span className={`font-medium text-sm ${stock.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            {stock.change >= 0 ? '+' : ''}{stock.change.toFixed(2)} ({stock.changePercent.toFixed(2)}%)
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-sm text-gray-500">Sector</span>
          <span className="text-sm text-gray-900">{stock.sector}</span>
        </div>
      </div>
    </div>
  );
};

export default WatchlistStockCard; 