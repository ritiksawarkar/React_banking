import React from 'react';
import ReactApexChart from 'react-apexcharts';
import { FaHeart, FaPlus, FaTimes } from 'react-icons/fa';

const StockGrid = ({
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
}) => {
  // Desktop Table View
  const renderTable = () => (
    <div className="hidden lg:block bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
      <table className="min-w-full divide-y divide-gray-100">
        <thead>
          <tr className="text-xs font-semibold text-gray-500 uppercase">
            <th className="px-2 py-3 text-center">Select</th>
            <th className="px-4 py-3 text-left">Company</th>
            <th className="px-2 py-3 text-center">Trend</th>
            <th className="px-2 py-3 text-right">Price</th>
            <th className="px-2 py-3 text-right">Volume</th>
            <th className="px-2 py-3 text-right">Market Cap</th>
            <th className="px-2 py-3 text-right">P/E</th>
            <th className="px-2 py-3 text-center">Sector</th>
            <th className="px-2 py-3 text-center">Rating</th>
            <th className="px-2 py-3 text-center">Watchlist</th>
            <th className="px-2 py-3 text-center">Buy</th>
            <th className="px-2 py-3 text-center">Sell</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {(filteredStocks.length > 0 ? filteredStocks : stocks).map((stock) => {
            const isSelected = selectedStocksForComparison.some(s => s.symbol === stock.symbol);
            const isDisabled = !isSelected && selectedStocksForComparison.length >= 4;
            return (
              <tr
                key={stock.symbol}
                className="hover:bg-gray-50 transition cursor-pointer"
                onClick={() => {
                  setSelectedStock(stock);
                  setActiveTab('overview');
                }}
              >
                {/* Select Checkbox */}
                <td className="px-2 py-3 text-center" onClick={e => e.stopPropagation()}>
                  <label className="inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={isSelected}
                      disabled={isDisabled}
                      onChange={() => {
                        if (isSelected) {
                          setSelectedStocksForComparison(selectedStocksForComparison.filter(s => s.symbol !== stock.symbol));
                        } else if (selectedStocksForComparison.length < 4) {
                          setSelectedStocksForComparison([...selectedStocksForComparison, stock]);
                        }
                      }}
                      className="hidden"
                    />
                    <span className={`w-5 h-5 flex items-center justify-center border-2 rounded ${isSelected ? 'border-purple-600 bg-purple-50' : 'border-gray-300 bg-white'} ${isDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
                          style={{ transition: 'all 0.2s' }}>
                      {isSelected ? (
                        <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      ) : null}
                    </span>
                  </label>
                </td>
                {/* Company */}
                <td className="px-4 py-3 whitespace-nowrap text-left">
                  <div className="flex items-center gap-2">
                    <img src={stock.logo} alt={stock.name} className="w-6 h-6 rounded bg-gray-50 object-contain" />
                    <div className="min-w-0">
                      <div
                        className="text-sm font-medium text-gray-900 truncate max-w-[120px]"
                        title={stock.name}
                      >
                        {stock.name}
                      </div>
                      <div className="text-xs text-gray-500">{stock.symbol}</div>
                    </div>
                  </div>
                </td>
                {/* Trend */}
                <td className="px-2 py-3 text-center">
                  <div className="w-20 h-6 mx-auto">
                    <ReactApexChart
                      options={{
                        chart: {
                          type: 'area',
                          sparkline: { enabled: true },
                          toolbar: { show: false },
                          animations: { enabled: false }
                        },
                        stroke: {
                          curve: 'smooth',
                          width: 2,
                          colors: [stock.change >= 0 ? '#10B981' : '#EF4444']
                        },
                        fill: {
                          type: 'gradient',
                          gradient: {
                            shadeIntensity: 0.7,
                            opacityFrom: 0.5,
                            opacityTo: 0,
                            stops: [0, 100],
                            colorStops: [
                              {
                                offset: 0,
                                color: stock.change >= 0 ? '#10B981' : '#EF4444',
                                opacity: 0.25
                              },
                              {
                                offset: 100,
                                color: stock.change >= 0 ? '#10B981' : '#EF4444',
                                opacity: 0
                              }
                            ]
                          }
                        },
                        grid: { show: false },
                        xaxis: { show: false },
                        yaxis: { show: false },
                        tooltip: { enabled: false },
                        markers: { size: 0 },
                        dataLabels: { enabled: false }
                      }}
                      series={[{ data: validateChartData(stock.dailyTrend, stock.symbol) }]}
                      type="area" height={24} width={80}
                    />
                  </div>
                </td>
                {/* Price */}
                <td className="px-2 py-3 text-right">
                  <div className="text-sm font-semibold text-gray-900">₹{stock.price.toFixed(2)}</div>
                  <div className={`text-xs ${stock.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {stock.change >= 0 ? '+' : ''}{stock.change.toFixed(2)}%
                  </div>
                </td>
                {/* Volume */}
                <td className="px-2 py-3 text-right">
                  <div className="text-xs text-gray-900">{stock.volume}</div>
                </td>
                {/* Market Cap */}
                <td className="px-2 py-3 text-right">
                  <div className="text-xs text-gray-900">{stock.marketCap}</div>
                </td>
                {/* P/E */}
                <td className="px-2 py-3 text-right">
                  <div className="text-xs text-gray-900">{stock.peRatio}</div>
                </td>
                {/* Sector */}
                <td className="px-2 py-3 text-center">
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    {stock.sector}
                  </span>
                </td>
                {/* Rating */}
                <td className="px-2 py-3 text-center">
                  {(() => {
                    const rating = Math.floor(Math.random() * 3) + 1;
                    const colors = { 1: 'text-red-600 bg-red-100', 2: 'text-yellow-600 bg-yellow-100', 3: 'text-green-600 bg-green-100' };
                    const labels = { 1: 'Sell', 2: 'Hold', 3: 'Buy' };
                    return (
                      <span className={`inline-flex items-center px-1.5 py-0.5 rounded text-xs font-medium ${colors[rating]}`}>
                        {labels[rating]}
                      </span>
                    );
                  })()}
                </td>
                {/* Watchlist */}
                <td className="px-2 py-3 text-center align-middle">
                  <button
                    onClick={e => { e.preventDefault(); e.stopPropagation(); handleAddToWatchlist(stock.symbol); }}
                    className="w-6 h-6 flex items-center justify-center rounded-full border border-gray-200 hover:bg-purple-50 text-purple-600 hover:text-purple-800 transition mx-auto"
                    type="button"
                  >
                    {watchlist.includes(stock.symbol) ? <FaHeart className="w-3 h-3 text-red-500" /> : <FaPlus className="w-3 h-3" />}
                  </button>
                </td>
                {/* Buy */}
                <td className="px-2 py-3 text-center">
                  <button
                    onClick={e => { e.stopPropagation(); onBuy && onBuy(stock); }}
                    className="px-2 py-1 bg-green-600 text-white rounded hover:bg-green-700 text-xs font-semibold"
                  >
                    Buy
                  </button>
                </td>
                {/* Sell */}
                <td className="px-2 py-3 text-center">
                  <button
                    onClick={e => { e.stopPropagation(); onSell && onSell(stock); }}
                    className="px-2 py-1 bg-red-600 text-white rounded hover:bg-red-700 text-xs font-semibold"
                  >
                    Sell
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  // Mobile/Tablet Card View
  const renderCards = () => (
    <div className="lg:hidden space-y-3">
      {(selectedSector || filteredStocks.length > 0) && (
        <div className="mb-4 flex items-center justify-between bg-purple-50 rounded-lg p-4 border border-purple-200">
          <div className="flex items-center space-x-3">
            <span className="text-sm font-medium text-purple-900">
              {selectedSector ? `Showing stocks from: ${selectedSector}` : `Search results for: "${searchQuery}"`}
            </span>
            <span className="text-sm text-purple-600">
              ({selectedSector ? filteredStocks.length : filteredStocks.length} stocks found)
            </span>
          </div>
          <button
            onClick={() => {
              clearSectorFilter();
              clearAdvancedFilters();
              setSearchQuery('');
              setFilteredStocks([]);
            }}
            className="flex items-center space-x-2 px-3 py-1.5 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm"
          >
            <FaTimes className="w-3 h-3" />
            <span>Clear Filter</span>
          </button>
        </div>
      )}
      {(selectedSector || filteredStocks.length > 0 ? filteredStocks : stocks).map((stock) => {
        const isSelected = selectedStocksForComparison.some(s => s.symbol === stock.symbol);
        const isDisabled = !isSelected && selectedStocksForComparison.length >= 4;
        return (
          // Card hover/transition animation for mobile/tablet
          <div
            key={stock.symbol}
            className="bg-white rounded-xl p-4 shadow-sm border border-gray-200 hover:shadow-lg hover:scale-[1.025] focus-within:shadow-lg focus-within:scale-[1.025] transition-all duration-200 cursor-pointer transform"
            onClick={() => {
              setSelectedStock(stock);
              setActiveTab('overview');
            }}
          >
            {/* Select Checkbox */}
            <div className="flex items-center mb-2">
              <label className="inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={isSelected}
                  disabled={isDisabled}
                  onChange={e => {
                    e.stopPropagation();
                    if (isSelected) {
                      setSelectedStocksForComparison(selectedStocksForComparison.filter(s => s.symbol !== stock.symbol));
                    } else if (selectedStocksForComparison.length < 4) {
                      setSelectedStocksForComparison([...selectedStocksForComparison, stock]);
                    }
                  }}
                  className="hidden"
                />
                <span className={`w-5 h-5 flex items-center justify-center border-2 rounded ${isSelected ? 'border-purple-600 bg-purple-50' : 'border-gray-300 bg-white'} ${isDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
                      style={{ transition: 'all 0.2s' }}>
                  {isSelected ? (
                    <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  ) : null}
                </span>
              </label>
            </div>
            {/* Header */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <img src={stock.logo} alt={stock.name} className="w-10 h-10 rounded-lg bg-gray-50 object-contain" />
                <div className="text-left">
                  <h3 className="font-semibold text-gray-900">{stock.name}</h3>
                  <p className="text-sm text-gray-500">{stock.symbol}</p>
                </div>
              </div>
              <button
                onClick={e => { e.preventDefault(); e.stopPropagation(); handleAddToWatchlist(stock.symbol); }}
                className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-200 hover:bg-purple-50 text-purple-600 hover:text-purple-800 transition"
                type="button"
              >
                {watchlist.includes(stock.symbol) ? <FaHeart className="w-4 h-4 text-red-500" /> : <FaPlus className="w-4 h-4" />}
              </button>
            </div>
            {/* Price and Trend */}
            <div className="flex items-center justify-between mb-3">
              <div className="text-left">
                <div className="text-lg font-bold text-gray-900">₹{stock.price.toFixed(2)}</div>
                <div className={`text-sm font-medium ${stock.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {stock.change >= 0 ? '+' : ''}{stock.change.toFixed(2)} ({stock.changePercent.toFixed(2)}%)
                </div>
              </div>
              <div className="w-24 h-12">
                <ReactApexChart
                  options={{
                    chart: { type: 'line', sparkline: { enabled: true }, toolbar: { show: false }, animations: { enabled: false } },
                    stroke: { curve: 'smooth', width: 2, colors: [stock.change >= 0 ? '#10B981' : '#EF4444'] },
                    grid: { show: false }, xaxis: { show: false }, yaxis: { show: false },
                    tooltip: { enabled: false }, markers: { size: 0 }, dataLabels: { enabled: false }
                  }}
                  series={[{ data: validateChartData(stock.dailyTrend, stock.symbol) }]}
                  type="line" height={48} width={96}
                />
              </div>
            </div>
            {/* Key Metrics Grid */}
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500 text-left">Volume:</span>
                <span className="font-medium text-gray-900 text-right">{stock.volume}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500 text-left">Market Cap:</span>
                <span className="font-medium text-gray-900 text-right">{stock.marketCap}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500 text-left">P/E Ratio:</span>
                <span className="font-medium text-gray-900 text-right">{stock.peRatio}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500 text-left">Div Yield:</span>
                <span className="font-medium text-gray-900 text-right">{stock.dividendYield}%</span>
              </div>
            </div>
            {/* Bottom Row */}
            <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                {stock.sector}
              </span>
              <div className="flex items-center gap-2">
                {(() => {
                  const rating = Math.floor(Math.random() * 3) + 1;
                  const colors = { 1: 'text-red-600 bg-red-100', 2: 'text-yellow-600 bg-yellow-100', 3: 'text-green-600 bg-green-100' };
                  const labels = { 1: 'Sell', 2: 'Hold', 3: 'Buy' };
                  return (
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${colors[rating]}`}>
                      {labels[rating]}
                    </span>
                  );
                })()}
                <span className="text-xs text-gray-400">
                  {Math.floor(Math.random() * 60) + 1}m ago
                </span>
              </div>
            </div>
            {/* Buy/Sell Buttons */}
            <div className="flex items-center justify-end gap-2 mt-4">
              <button
                onClick={e => { e.stopPropagation(); onBuy && onBuy(stock); }}
                className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 text-xs font-semibold"
              >
                Buy
              </button>
              <button
                onClick={e => { e.stopPropagation(); onSell && onSell(stock); }}
                className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 text-xs font-semibold"
              >
                Sell
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );

  return (
    <>
      {renderTable()}
      {renderCards()}
    </>
  );
};

export default React.memo(StockGrid); 