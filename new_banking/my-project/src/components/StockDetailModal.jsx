import React from 'react';
import { FaTimes } from 'react-icons/fa';
import ReactApexChart from 'react-apexcharts';
import StockNews from './StockNews';

const StockDetailModal = ({
  selectedStock,
  activeTab,
  setActiveTab,
  onClose,
  processCandlestickData,
  getChartOptions,
  timeRange,
  setTimeRange
}) => {
  if (!selectedStock) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-lg bg-gray-50 flex items-center justify-center">
              <img src={selectedStock.logo} alt={selectedStock.name} className="w-10 h-10 object-contain" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{selectedStock.symbol}</h2>
              <p className="text-sm text-gray-500">{selectedStock.name}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500 p-2 rounded-full hover:bg-gray-100"
          >
            <FaTimes className="w-6 h-6" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex space-x-4 border-b border-gray-200 mb-6">
          {['overview', 'chart', 'financials', 'news', 'about'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 text-sm font-medium ${activeTab === tab
                  ? 'text-purple-600 border-b-2 border-purple-600'
                  : 'text-gray-500 hover:text-gray-700'
                }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="space-y-6">
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="p-4 bg-gray-50 rounded-lg border border-gray-100">
                  <h4 className="text-sm font-medium text-gray-900 mb-2">Price Information</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">LTP</span>
                      <span className="font-medium text-gray-900">₹{selectedStock.price.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">Day High/Low</span>
                      <span className="font-medium text-gray-900">₹{selectedStock.dayLow} / ₹{selectedStock.dayHigh}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">52W High/Low</span>
                      <span className="font-medium text-gray-900">₹{selectedStock.yearHigh} / ₹{selectedStock.yearLow}</span>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-gray-50 rounded-lg border border-gray-100">
                  <h4 className="text-sm font-medium text-gray-900 mb-2">Key Metrics</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Market Cap</p>
                      <p className="font-medium text-gray-900">{selectedStock.marketCap}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">P/E Ratio</p>
                      <p className="font-medium text-gray-900">{selectedStock.peRatio}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">EPS</p>
                      <p className="font-medium text-gray-900">₹{selectedStock.eps}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Dividend Yield</p>
                      <p className="font-medium text-gray-900">{selectedStock.dividendYield}%</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="p-4 bg-gray-50 rounded-lg border border-gray-100">
                  <h4 className="text-sm font-medium text-gray-900 mb-2">Trading Volume</h4>
                  <div className="h-48">
                    <ReactApexChart
                      options={{
                        chart: {
                          type: 'bar',
                          toolbar: { show: false }
                        },
                        plotOptions: {
                          bar: {
                            borderRadius: 4,
                            horizontal: false
                          }
                        },
                        dataLabels: { enabled: false },
                        xaxis: {
                          categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri']
                        }
                      }}
                      series={[{
                        name: 'Volume',
                        data: [45, 38, 42, 35, 40]
                      }]}
                      type="bar"
                      height="100%"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'chart' && (
            <div className="space-y-4">
              <div className="flex space-x-2 mb-4">
                {['1D', '1W', '1M', '1Y'].map((range) => (
                  <button
                    key={range}
                    onClick={() => setTimeRange(range)}
                    className={`px-4 py-2 rounded-lg ${timeRange === range
                        ? 'bg-purple-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                  >
                    {range}
                  </button>
                ))}
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                <div className="h-[400px] w-full">
                  <ReactApexChart
                    options={getChartOptions()}
                    series={[{
                      name: 'Price',
                      data: processCandlestickData(selectedStock.historical)
                    }]}
                    type="candlestick"
                    height="100%"
                    width="100%"
                  />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'financials' && (
            <div className="space-y-4">
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-100">
                <h4 className="text-sm font-medium text-gray-900 mb-4">Financial Highlights</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h5 className="text-sm font-medium text-gray-700 mb-2">Revenue Growth</h5>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500">YoY Growth</span>
                        <span className="font-medium text-green-600">+15.2%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500">Quarterly Growth</span>
                        <span className="font-medium text-green-600">+8.4%</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h5 className="text-sm font-medium text-gray-700 mb-2">Profitability</h5>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500">Net Profit Margin</span>
                        <span className="font-medium text-gray-900">21.5%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500">ROE</span>
                        <span className="font-medium text-gray-900">28.3%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'news' && (
            <div className="space-y-4">
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-100">
                <h4 className="text-sm font-medium text-gray-900 mb-4">Latest News</h4>
                <StockNews symbol={selectedStock.symbol} />
              </div>
            </div>
          )}

          {activeTab === 'about' && (
            <div className="space-y-4">
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-100">
                <h4 className="text-sm font-medium text-gray-900 mb-4">Company Overview</h4>
                <p className="text-sm text-gray-600">
                  {selectedStock.name} is a leading technology company that designs, manufactures, and markets smartphones,
                  personal computers, tablets, wearables, and accessories worldwide. The company also sells various related
                  services, including cloud services, digital content, and payment services.
                </p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-100">
                <h4 className="text-sm font-medium text-gray-900 mb-4">Key Information</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Sector</p>
                    <p className="font-medium text-gray-900">{selectedStock.sector}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Market Cap</p>
                    <p className="font-medium text-gray-900">{selectedStock.marketCap}</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StockDetailModal; 