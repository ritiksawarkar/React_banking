import React from 'react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import MyPortfolioStockCard from './MyPortfolioStockCard';
import PropTypes from 'prop-types';

const MySelectedStocks = ({
  myPortfolioStocks,
  currentPage,
  mySelectedStocksPerPage,
  mySelectedStocksToMove,
  onPrev,
  onNext,
  onPageDotClick,
  onSelectStock
}) => {
  const start = currentPage;
  const visibleStocks = myPortfolioStocks.slice(start, start + mySelectedStocksPerPage);
  const maxPage = Math.ceil(myPortfolioStocks.length / mySelectedStocksPerPage) - 1;

  return (
    <div className="mb-6 sm:mb-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-3 sm:mb-4 gap-3 sm:gap-4">
        <div className="flex items-center space-x-2">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-900 text-left">My Selected Stocks</h2>
          <div className="flex items-center space-x-1 px-2 py-1 bg-green-100 rounded-full">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-xs font-medium text-green-700">LIVE</span>
          </div>
        </div>
        <div className="flex items-center space-x-2 w-full sm:w-auto">
          <div className="flex justify-between sm:justify-center items-center w-full sm:w-auto space-x-2 sm:space-x-4">
            <button
              onClick={onPrev}
              disabled={currentPage === 0}
              className={`w-10 h-10 sm:w-8 sm:h-8 rounded-full bg-white shadow-md flex items-center justify-center transition-all duration-300 ${
                currentPage === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100 hover:scale-110'
              }`}
            >
              <FaArrowLeft className="w-4 h-4 text-gray-600" />
            </button>
            <div className="flex items-center space-x-1 sm:space-x-2">
              {Array.from({ length: Math.ceil(myPortfolioStocks.length / mySelectedStocksToMove) }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => onPageDotClick(index * mySelectedStocksToMove)}
                  className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full transition-all duration-300 ${
                    currentPage === index * mySelectedStocksToMove ? 'bg-purple-600 scale-125' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
            <button
              onClick={onNext}
              disabled={currentPage >= maxPage}
              className={`w-10 h-10 sm:w-8 sm:h-8 rounded-full bg-white shadow-md flex items-center justify-center transition-all duration-300 ${
                currentPage >= maxPage ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100 hover:scale-110'
              }`}
            >
              <FaArrowRight className="w-4 h-4 text-gray-600" />
            </button>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-2 sm:gap-3">
        {visibleStocks.map((stock) => (
          <MyPortfolioStockCard
            key={stock.symbol}
            stock={stock}
            onClick={() => onSelectStock(stock)}
          />
        ))}
      </div>
    </div>
  );
};

MySelectedStocks.propTypes = {
  myPortfolioStocks: PropTypes.arrayOf(PropTypes.object).isRequired,
  currentPage: PropTypes.number.isRequired,
  mySelectedStocksPerPage: PropTypes.number.isRequired,
  mySelectedStocksToMove: PropTypes.number.isRequired,
  onPrev: PropTypes.func.isRequired,
  onNext: PropTypes.func.isRequired,
  onPageDotClick: PropTypes.func.isRequired,
  onSelectStock: PropTypes.func.isRequired,
};

export default MySelectedStocks; 