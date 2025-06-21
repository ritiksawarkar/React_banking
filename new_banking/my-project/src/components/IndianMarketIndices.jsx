import React from 'react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import MarketIndexCard from './MarketIndexCard';
import PropTypes from 'prop-types';

const IndianMarketIndices = ({
  indices,
  currentIndexPage,
  indicesPerPage,
  indicesToMove,
  onPrev,
  onNext,
  onPageDotClick,
  onSelectIndex,
  INDIAN_INDICES
}) => {
  // Calculate visible indices
  const start = currentIndexPage * indicesToMove;
  const visibleIndices = indices.slice(start, start + indicesPerPage);
  const maxPage = Math.ceil(INDIAN_INDICES.length / indicesPerPage) - 1;

  return (
    <div className="mb-6 sm:mb-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-3 sm:mb-4 gap-3 sm:gap-4">
        <div className="flex items-center space-x-2">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-900 text-left">Indian Market Indices</h2>
          <div className="flex items-center space-x-1 px-2 py-1 bg-green-100 rounded-full">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-xs font-medium text-green-700">LIVE</span>
          </div>
        </div>
        <div className="flex items-center space-x-2 w-full sm:w-auto">
          <div className="flex justify-between sm:justify-center items-center w-full sm:w-auto space-x-2 sm:space-x-4">
            <button
              onClick={onPrev}
              disabled={currentIndexPage === 0}
              className={`w-10 h-10 sm:w-8 sm:h-8 rounded-full bg-white shadow-md flex items-center justify-center transition-all duration-300 ${
                currentIndexPage === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100 hover:scale-110'
              }`}
            >
              <FaArrowLeft className="w-4 h-4 text-gray-600" />
            </button>
            <div className="flex items-center space-x-1 sm:space-x-2">
              {Array.from({ length: Math.ceil(INDIAN_INDICES.length / indicesToMove) }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => onPageDotClick(index * indicesToMove)}
                  className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full transition-all duration-300 ${
                    currentIndexPage === index * indicesToMove ? 'bg-purple-600 scale-125' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
            <button
              onClick={onNext}
              disabled={currentIndexPage >= maxPage}
              className={`w-10 h-10 sm:w-8 sm:h-8 rounded-full bg-white shadow-md flex items-center justify-center transition-all duration-300 ${
                currentIndexPage >= maxPage ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100 hover:scale-110'
              }`}
            >
              <FaArrowRight className="w-4 h-4 text-gray-600" />
            </button>
          </div>
        </div>
      </div>
      <div className="relative">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-2 sm:gap-3 overflow-hidden">
          <div 
            className="col-span-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-2 sm:gap-3 transition-transform duration-500 ease-in-out mb-2 sm:mb-3"
            style={{
              transform: `translateX(-${(currentIndexPage * 100) / indicesPerPage}%)`,
              width: `${(INDIAN_INDICES.length * 100) / indicesPerPage}%`
            }}
          >
            {visibleIndices.map((index) => (
              <MarketIndexCard
                key={index.symbol}
                index={index}
                onClick={() => onSelectIndex(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

IndianMarketIndices.propTypes = {
  indices: PropTypes.arrayOf(PropTypes.object).isRequired,
  currentIndexPage: PropTypes.number.isRequired,
  indicesPerPage: PropTypes.number.isRequired,
  indicesToMove: PropTypes.number.isRequired,
  onPrev: PropTypes.func.isRequired,
  onNext: PropTypes.func.isRequired,
  onPageDotClick: PropTypes.func.isRequired,
  onSelectIndex: PropTypes.func.isRequired,
  INDIAN_INDICES: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default IndianMarketIndices; 