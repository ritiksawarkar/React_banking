import React from 'react';
import { FaRupeeSign, FaArrowUp, FaBell, FaRegBell } from 'react-icons/fa';
import ReactApexChart from 'react-apexcharts';

const GoldPriceWidget = ({ displayGoldUnit, displayGoldPrice, currency, setCurrency, usdRate, priceSource, goldHistory, priceAlert, setPriceAlert, alertActive, setAlertActive }) => (
  <div className="bg-white rounded-xl shadow p-6 flex flex-col gap-3 border border-yellow-100 relative group">
    <div className="flex items-center gap-2">
      <FaRupeeSign className="text-yellow-500 w-6 h-6" />
      <span className="text-lg font-semibold text-yellow-800 bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
        {displayGoldUnit}{displayGoldPrice.toFixed(2)} /g (24K)
      </span>
      <span className="ml-2 px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-700 flex items-center gap-1">
        <FaArrowUp className="w-3 h-3" /> LIVE
      </span>
      <span className="ml-2 px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-700 flex items-center gap-1">
        Source: {priceSource}
      </span>
    </div>
    <div className="flex items-center gap-2 mt-1">
      <button
        className={`px-2 py-1 rounded text-xs font-semibold border ${currency === 'INR' ? 'bg-yellow-100 border-yellow-400' : 'bg-white border-gray-200'} transition`}
        onClick={() => setCurrency('INR')}
      >INR</button>
      <button
        className={`px-2 py-1 rounded text-xs font-semibold border ${currency === 'USD' ? 'bg-yellow-100 border-yellow-400' : 'bg-white border-gray-200'} transition`}
        onClick={() => setCurrency('USD')}
      >USD</button>
      <span className="text-xs text-gray-400 ml-2">1 USD = ₹{usdRate}</span>
    </div>
    <div className="h-24">
      <ReactApexChart
        options={{
          chart: { type: 'line', sparkline: { enabled: true }, toolbar: { show: false } },
          stroke: { curve: 'smooth', width: 2, colors: ['#FFD700'] },
          fill: { type: 'gradient', gradient: { shadeIntensity: 0.7, opacityFrom: 0.5, opacityTo: 0, stops: [0, 100] } },
          grid: { show: false },
          xaxis: { show: false },
          yaxis: { show: false },
          tooltip: { enabled: false },
          markers: { size: 0 },
          dataLabels: { enabled: false },
        }}
        series={[{ data: goldHistory }]}
        type="line"
        height={80}
      />
    </div>
    <div className="flex items-center gap-2 mt-2">
      <input
        type="number"
        placeholder="Set price alert (₹)"
        value={priceAlert}
        onChange={e => setPriceAlert(e.target.value)}
        className="px-2 py-1 border border-yellow-200 rounded text-xs focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400"
      />
      <button
        className="px-2 py-1 bg-yellow-500 hover:bg-yellow-600 text-white rounded text-xs font-semibold flex items-center gap-1"
        onClick={() => setAlertActive(true)}
        disabled={!priceAlert || alertActive}
      >
        <FaBell /> Set Alert
      </button>
      {alertActive && (
        <span className="text-xs text-green-600 flex items-center gap-1"><FaRegBell /> Alert active</span>
      )}
    </div>
    <div className="text-xs text-gray-500">Gold price updates every 3 seconds (mock data)</div>
  </div>
);
export default GoldPriceWidget; 