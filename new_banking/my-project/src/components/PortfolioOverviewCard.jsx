import React from 'react';
import { FaChartLine, FaInfoCircle, FaRegArrowAltCircleUp, FaRegArrowAltCircleDown } from 'react-icons/fa';
import ReactApexChart from 'react-apexcharts';

const PortfolioOverviewCard = ({ MOCK_PORTFOLIO, avgBuyPrice, totalInvested, profitLoss, pieData, portfolioChart }) => {
  // Mock analytics
  const annualizedReturn = 8.2; // %
  const xirr = 9.1; // %
  const niftyReturn = 12.5; // %
  const sensexReturn = 11.8; // %

  return (
    <div className="bg-white rounded-xl shadow p-6 flex flex-col gap-3 border border-yellow-100">
      <div className="flex items-center gap-2 mb-2">
        <FaChartLine className="text-blue-500" />
        <span className="font-semibold text-blue-900">Portfolio Overview</span>
        <FaInfoCircle className="text-gray-400 ml-1" title="Shows your gold & bond allocation" />
      </div>
      <div className="h-24">
        <ReactApexChart
          options={pieData.options}
          series={pieData.series}
          type="pie"
          height={100}
        />
      </div>
      <div className="flex justify-between text-xs mt-2">
        <span>Total Value</span>
        <span className="font-semibold text-gray-900">₹{MOCK_PORTFOLIO.totalValue.toLocaleString()}</span>
      </div>
      <div className="flex justify-between text-xs">
        <span>Returns</span>
        <span className={MOCK_PORTFOLIO.returns >= 0 ? 'text-green-600 flex items-center gap-1' : 'text-red-600 flex items-center gap-1'}>
          {MOCK_PORTFOLIO.returns >= 0 ? <FaRegArrowAltCircleUp /> : <FaRegArrowAltCircleDown />}
          {MOCK_PORTFOLIO.returns >= 0 ? '+' : ''}{MOCK_PORTFOLIO.returns}%
        </span>
      </div>
      <div className="flex flex-col gap-1 mt-2 text-xs">
        <div className="flex justify-between"><span>Avg Buy Price</span><span>₹{avgBuyPrice}</span></div>
        <div className="flex justify-between"><span>Total Invested</span><span>₹{totalInvested}</span></div>
        <div className="flex justify-between"><span>Profit/Loss</span><span className={profitLoss >= 0 ? 'text-green-600' : 'text-red-600'}>{profitLoss >= 0 ? '+' : ''}₹{profitLoss}</span></div>
      </div>
      <div className="h-16 mt-2">
        <ReactApexChart
          options={portfolioChart.options}
          series={portfolioChart.series}
          type="area"
          height={60}
        />
      </div>
      {/* Detailed Analytics */}
      <div className="mt-4 p-3 rounded-lg bg-blue-50 text-xs text-blue-900">
        <div className="font-semibold mb-1">Detailed Analytics</div>
        <div className="flex flex-col gap-1">
          <div className="flex justify-between"><span>Annualized Return</span><span>{annualizedReturn}%</span></div>
          <div className="flex justify-between"><span>XIRR (mock)</span><span>{xirr}%</span></div>
          <div className="flex justify-between"><span>Nifty 1Y Return</span><span>{niftyReturn}%</span></div>
          <div className="flex justify-between"><span>Sensex 1Y Return</span><span>{sensexReturn}%</span></div>
        </div>
      </div>
    </div>
  );
};
export default PortfolioOverviewCard; 