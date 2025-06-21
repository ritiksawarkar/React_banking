import React, { Suspense } from 'react';
import OrderModal from './OrderModal';
import TransactionHistoryModal from './TransactionHistoryModal';
import FilterModal from './FilterModal';
import CompareModal from './CompareModal';
import StockScreenerModal from './StockScreenerModal';
import WatchlistModal from './WatchlistModal';

const StocksModals = ({
  showOrderModal, selectedStock, orderType, orderQuantity, orderPrice, orderTotal, orderStatus,
  onQuantityChange, onPriceChange, onPlaceOrder, onCloseOrderModal, calculateHoldings,
  showTransactionHistory, orders, onCloseTransactionHistory,
  showFilterModal, advancedFilters, setAdvancedFilters, applyAdvancedFilters, clearAdvancedFilters, onCloseFilterModal,
  showCompareModal, selectedStocksForComparison, removeFromComparison, clearComparison, stocks,
  showStockScreenerModal, onCloseStockScreenerModal, setFilteredStocks,
  showWatchlistModal, watchlist, onCloseWatchlistModal, handleAddToWatchlist
}) => (
  <Suspense fallback={<div style={{position: 'fixed', inset: 0, zIndex: 9999, background: 'rgba(0,0,0,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>Loading...</div>}>
    {showOrderModal && (
      <OrderModal
        show={showOrderModal}
        selectedStock={selectedStock}
        orderType={orderType}
        orderQuantity={orderQuantity}
        orderPrice={orderPrice}
        orderTotal={orderTotal}
        orderStatus={orderStatus}
        onQuantityChange={onQuantityChange}
        onPriceChange={onPriceChange}
        onPlaceOrder={onPlaceOrder}
        onClose={onCloseOrderModal}
        calculateHoldings={calculateHoldings}
      />
    )}
    {showTransactionHistory && (
      <TransactionHistoryModal
        show={showTransactionHistory}
        orders={orders}
        onClose={onCloseTransactionHistory}
      />
    )}
    {showFilterModal && (
      <FilterModal
        show={showFilterModal}
        advancedFilters={advancedFilters}
        setAdvancedFilters={setAdvancedFilters}
        applyAdvancedFilters={applyAdvancedFilters}
        clearAdvancedFilters={clearAdvancedFilters}
        onClose={onCloseFilterModal}
      />
    )}
    {showCompareModal && (
      <CompareModal
        show={showCompareModal}
        selectedStocksForComparison={selectedStocksForComparison}
        removeFromComparison={removeFromComparison}
        clearComparison={clearComparison}
        stocks={stocks}
      />
    )}
    {showStockScreenerModal && (
      <StockScreenerModal
        show={showStockScreenerModal}
        onClose={onCloseStockScreenerModal}
        stocks={stocks}
        setFilteredStocks={setFilteredStocks}
      />
    )}
    <WatchlistModal
      show={showWatchlistModal}
      watchlist={watchlist}
      stocks={stocks}
      onClose={onCloseWatchlistModal}
      handleAddToWatchlist={handleAddToWatchlist}
    />
  </Suspense>
);

export default StocksModals; 