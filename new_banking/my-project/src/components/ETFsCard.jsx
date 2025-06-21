import React from 'react';
import { FaChartLine, FaArrowUp, FaArrowDown, FaMinus } from 'react-icons/fa';
import ReactApexChart from 'react-apexcharts';

const ETFsCard = ({ ETF_LIST, MOCK_PORTFOLIO, setShowEtfDetail, setBuyAsset, setBuyPrice, setShowBuyModal, setSellAsset, setSellQty, setShowSellModal, watchlist, toggleWatchlist }) => (
  <div className="bg-white rounded-xl shadow p-6 border border-yellow-100 flex flex-col gap-3 group hover:shadow-lg transition">
    <div className="flex items-center gap-2 mb-2">
      <FaChartLine className="text-blue-500" />
      <span className="font-semibold text-blue-900">Gold ETFs</span>
    </div>
    <div className="flex flex-col gap-2">
      {ETF_LIST.map(etf => {
        const inWatchlist = watchlist && watchlist.some(w => w.id === etf.symbol && w.type === 'ETF');
        return (
          <div key={etf.symbol} className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-2 rounded-lg border border-gray-100 bg-gray-50 group hover:bg-blue-50 transition">
            <div className="flex-1">
              <div className="font-semibold text-gray-900 cursor-pointer hover:underline" onClick={() => setShowEtfDetail(etf)}>{etf.name} <span className="text-xs text-gray-400">({etf.symbol})</span></div>
              <div className="flex items-center gap-2 text-xs">
                <span className="text-gray-500">Price:</span>
                <span className="font-medium text-gray-900">₹{etf.price.toFixed(2)}</span>
                <span className={etf.change >= 0 ? 'text-green-600' : 'text-red-600'}>
                  {etf.change >= 0 ? <FaArrowUp /> : <FaArrowDown />} {etf.change} ({etf.changePercent}%)
                </span>
              </div>
            </div>
            <div className="flex flex-col items-end">
              <div className="h-8 w-24">
                <ReactApexChart
                  options={{
                    chart: { type: 'line', sparkline: { enabled: true }, toolbar: { show: false } },
                    stroke: { curve: 'smooth', width: 2, colors: ['#60A5FA'] },
                    grid: { show: false },
                    xaxis: { show: false },
                    yaxis: { show: false },
                    tooltip: { enabled: false },
                    markers: { size: 0 },
                    dataLabels: { enabled: false },
                  }}
                  series={[{ data: etf.chart }]}
                  type="line"
                  height={32}
                  width={96}
                />
              </div>
              <button
                className="mt-1 px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded text-xs font-semibold"
                onClick={() => { setBuyAsset(etf.symbol); setBuyPrice(etf.price); setShowBuyModal(true); }}
              >Buy</button>
              <button
                className="mt-1 px-3 py-1 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded text-xs font-semibold border border-gray-300"
                onClick={() => { setSellAsset(etf.symbol); setSellQty(1); setShowSellModal(true); }}
              >Sell</button>
              <button
                className={`mt-1 px-3 py-1 text-xs font-semibold rounded border ${inWatchlist ? 'bg-yellow-100 border-yellow-400 text-yellow-900' : 'bg-white border-gray-200 text-gray-500'}`}
                onClick={() => toggleWatchlist({ id: etf.symbol, name: etf.name, type: 'ETF' })}
              >{inWatchlist ? 'Remove from Watchlist' : 'Add to Watchlist'}</button>
            </div>
          </div>
        );
      })}
    </div>
    <div className="flex justify-between items-center mt-2">
      <span>Holdings:</span>
      <span className="font-semibold">{MOCK_PORTFOLIO.etf} units</span>
    </div>
  </div>
);
export default ETFsCard; 