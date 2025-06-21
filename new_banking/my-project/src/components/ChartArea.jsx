import React, { useEffect, useState } from 'react';
import { FaCoins } from 'react-icons/fa';
import PropTypes from 'prop-types';
import ReactApexChart from 'react-apexcharts';

const SYMBOLS = [
  { label: 'BTC/USDT', value: 'BTCUSDT' },
  { label: 'ETH/USDT', value: 'ETHUSDT' },
  { label: 'BNB/USDT', value: 'BNBUSDT' },
  { label: 'ADA/USDT', value: 'ADAUSDT' },
  { label: 'XRP/USDT', value: 'XRPUSDT' },
];

const TIME_RANGES = [
  { label: '15m', interval: '15m', limit: 32 },
  { label: '1H', interval: '1h', limit: 24 },
  { label: '4H', interval: '4h', limit: 42 },
  { label: '1D', interval: '1d', limit: 30 },
  { label: '1W', interval: '1w', limit: 26 },
];

const candlestickOptions = {
  chart: {
    type: 'candlestick',
    toolbar: { show: true },
    zoom: { enabled: true },
    background: 'transparent',
  },
  plotOptions: {
    candlestick: {
      colors: {
        upward: '#00b746',
        downward: '#ef403c',
      },
    },
  },
  xaxis: {
    type: 'datetime',
    labels: { show: true },
    axisBorder: { show: false },
    axisTicks: { show: false },
  },
  yaxis: {
    tooltip: { enabled: true },
    labels: { show: true },
  },
  grid: { show: true },
  tooltip: { enabled: true },
};

const ChartArea = ({ price, change, high, low, volume }) => {
  const [candles, setCandles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedSymbol] = useState(SYMBOLS[0].value);
  const [selectedRange, setSelectedRange] = useState(TIME_RANGES[1]); // Default to 1H

  useEffect(() => {
    const fetchCandles = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `https://api.binance.com/api/v3/klines?symbol=${selectedSymbol}&interval=${selectedRange.interval}&limit=${selectedRange.limit}`
        );
        const data = await res.json();
        setCandles(
          data.map((c) => ({
            x: new Date(c[0]),
            y: [parseFloat(c[1]), parseFloat(c[2]), parseFloat(c[3]), parseFloat(c[4])],
          }))
        );
      } catch {
        setCandles([]);
      }
      setLoading(false);
    };
    fetchCandles();
  }, [selectedSymbol, selectedRange]);

  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-200 p-4 mb-4 flex flex-col md:flex-row gap-6">
      <div className="flex-1">
        <div className="flex items-center gap-6 mb-4 pb-2 border-b border-gray-100">
          {/* Coin Logo and Symbol */}
          <div className="flex items-center gap-2 min-w-[180px]">
            <img src="/crypto-logos/bitcoin-btc-logo.png" alt="BTC" className="w-7 h-7" />
            <span className="font-semibold text-gray-700 text-lg">BTCUSD Perpetual</span>
          </div>
          <div className="border-l h-8 mx-4" />
          {/* Price and Change */}
          <div className="flex flex-col min-w-[120px]">
            <span className="text-xl font-bold text-gray-900">${price.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})} USD</span>
            <span className={`text-sm font-semibold ${change < 0 ? 'text-red-500' : 'text-green-500'}`}>{change > 0 ? '+' : ''}{change} <span className="align-middle">{change < 0 ? '↓' : '↑'}</span></span>
          </div>
          <div className="border-l h-8 mx-4" />
          {/* High */}
          <div className="flex flex-col min-w-[100px]">
            <span className="text-xs text-gray-500">High</span>
            <span className="font-semibold text-gray-700">{high.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})} USD</span>
          </div>
          <div className="border-l h-8 mx-4" />
          {/* Low */}
          <div className="flex flex-col min-w-[100px]">
            <span className="text-xs text-gray-500">Low</span>
            <span className="font-semibold text-gray-700">{low.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})} USD</span>
          </div>
          <div className="border-l h-8 mx-4" />
          {/* Volume */}
          <div className="flex flex-col min-w-[140px]">
            <span className="text-xs text-gray-500">24H Volume</span>
            <span className="font-semibold text-gray-700">{volume} BTC</span>
          </div>
        </div>
        {/* Time Range Selectors */}
        <div className="flex gap-2 mb-2">
          {TIME_RANGES.map((range) => (
            <button
              key={range.label}
              onClick={() => setSelectedRange(range)}
              className={`px-4 py-1 rounded font-semibold text-xs border transition ${selectedRange.label === range.label ? 'bg-blue-600 text-white border-blue-600' : 'bg-gray-100 text-gray-700 border-gray-200 hover:bg-blue-50'}`}
            >
              {range.label}
            </button>
          ))}
        </div>
        {/* Real Candlestick Chart */}
        <div className="bg-gray-50 rounded-lg border-2 border-gray-200 p-6 w-full shadow-md">
          {loading ? (
            <div className="flex items-center justify-center h-64">
              <span className="text-gray-400">Loading chart...</span>
            </div>
          ) : (
            <ReactApexChart
              options={candlestickOptions}
              series={[{ data: candles }]}
              type="candlestick"
              width="100%"
              height={300}
            />
          )}
        </div>
      </div>
    </div>
  );
};

ChartArea.propTypes = {
  price: PropTypes.number.isRequired,
  change: PropTypes.number.isRequired,
  high: PropTypes.number.isRequired,
  low: PropTypes.number.isRequired,
  volume: PropTypes.number.isRequired,
};

export default ChartArea; 