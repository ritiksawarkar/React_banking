import React, { Suspense } from 'react';
import PortfolioAnalytics from './PortfolioAnalytics';
import StockGrid from './StockGrid';
import LoadingSkeleton from './LoadingSkeleton';
import PropTypes from 'prop-types';

const StockGridSection = ({
  loading,
  orders,
  stocks,
  filteredStocks,
  selectedSector,
  searchQuery,
  selectedStocksForComparison,
  setSelectedStocksForComparison,
  watchlist,
  handleAddToWatchlist,
  setSelectedStock,
  setActiveTab,
  clearSectorFilter,
  clearAdvancedFilters,
  setSearchQuery,
  setFilteredStocks,
  validateChartData,
  onBuy,
  onSell
}) => (
  <div className="mb-8">
    {loading ? (
      <LoadingSkeleton />
    ) : (
      <>
        <Suspense fallback={<div>Loading...</div>}>
          <PortfolioAnalytics orders={orders} stocks={stocks} />
        </Suspense>
        <StockGrid
          stocks={stocks}
          filteredStocks={filteredStocks}
          selectedSector={selectedSector}
          searchQuery={searchQuery}
          selectedStocksForComparison={selectedStocksForComparison}
          setSelectedStocksForComparison={setSelectedStocksForComparison}
          watchlist={watchlist}
          handleAddToWatchlist={handleAddToWatchlist}
          setSelectedStock={setSelectedStock}
          setActiveTab={setActiveTab}
          clearSectorFilter={clearSectorFilter}
          clearAdvancedFilters={clearAdvancedFilters}
          setSearchQuery={setSearchQuery}
          setFilteredStocks={setFilteredStocks}
          validateChartData={validateChartData}
          onBuy={onBuy}
          onSell={onSell}
        />
      </>
    )}
  </div>
);

StockGridSection.propTypes = {
  loading: PropTypes.bool.isRequired,
  orders: PropTypes.arrayOf(PropTypes.object).isRequired,
  stocks: PropTypes.arrayOf(PropTypes.object).isRequired,
  filteredStocks: PropTypes.arrayOf(PropTypes.object).isRequired,
  selectedSector: PropTypes.string,
  searchQuery: PropTypes.string.isRequired,
  selectedStocksForComparison: PropTypes.arrayOf(PropTypes.object).isRequired,
  setSelectedStocksForComparison: PropTypes.func.isRequired,
  watchlist: PropTypes.arrayOf(PropTypes.string).isRequired,
  handleAddToWatchlist: PropTypes.func.isRequired,
  setSelectedStock: PropTypes.func.isRequired,
  setActiveTab: PropTypes.func.isRequired,
  clearSectorFilter: PropTypes.func.isRequired,
  clearAdvancedFilters: PropTypes.func.isRequired,
  setSearchQuery: PropTypes.func.isRequired,
  setFilteredStocks: PropTypes.func.isRequired,
  validateChartData: PropTypes.func.isRequired,
  onBuy: PropTypes.func.isRequired,
  onSell: PropTypes.func.isRequired,
};

export default StockGridSection; 