import React from 'react';

const MarketIndexCard = ({ index, onClick }) => {
  return (
    <div
      className="bg-white rounded-lg sm:rounded-xl p-2.5 sm:p-3 shadow-sm sm:shadow-md border border-gray-100 hover:shadow-md sm:hover:shadow-lg transition-all duration-300 cursor-pointer transform hover:scale-[1.02] sm:hover:scale-105"
      onClick={onClick}
    >
      <div className="flex items-center space-x-2 mb-1.5 sm:mb-2">
        <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-gray-50 flex items-center justify-center">
          <img src={index.logo} alt={index.name} className="w-5 h-5 sm:w-6 sm:h-6 object-contain" />
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="font-medium text-gray-900 text-xs sm:text-sm truncate text-left">{index.symbol}</h3>
          <p className="text-[10px] sm:text-xs text-gray-500 truncate text-left">{index.name}</p>
        </div>
      </div>
      <div className="space-y-0.5 sm:space-y-1">
        <div className="flex justify-between items-center">
          <span className="text-[10px] sm:text-xs text-gray-500 text-left">Price</span>
          <span className="font-medium text-gray-900 text-xs sm:text-sm text-right">₹{index.price.toFixed(2)}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-[10px] sm:text-xs text-gray-500 text-left">Change</span>
          <span className={`font-medium text-xs sm:text-sm text-right ${index.change >= 0 ? 'text-green-600' : 'text-red-600'}`}> 
            {index.change >= 0 ? '+' : ''}{index.change.toFixed(2)} ({index.changePercent.toFixed(2)}%)
          </span>
        </div>
      </div>
    </div>
  );
};

export default React.memo(MarketIndexCard); 