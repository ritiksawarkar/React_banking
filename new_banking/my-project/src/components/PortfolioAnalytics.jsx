import React, { useMemo } from 'react';
import ReactApexChart from 'react-apexcharts';

function calculatePortfolio(orders, stocks) {
  const holdings = {};
  orders.forEach(order => {
    if (!holdings[order.symbol]) {
      holdings[order.symbol] = { quantity: 0, totalCost: 0 };
    }
    if (order.type === 'buy') {
      holdings[order.symbol].quantity += order.quantity;
      holdings[order.symbol].totalCost += order.total;
    } else {
      holdings[order.symbol].quantity -= order.quantity;
      holdings[order.symbol].totalCost -= order.total;
    }
  });
  const portfolio = Object.entries(holdings).map(([symbol, holding]) => {
    const stock = stocks.find(s => s.symbol === symbol);
    const currentValue = stock ? holding.quantity * stock.price : 0;
    const gainLoss = currentValue - holding.totalCost;
    return {
      symbol,
      name: stock ? stock.name : symbol,
      quantity: holding.quantity,
      totalCost: holding.totalCost,
      currentValue,
      gainLoss,
      price: stock ? stock.price : 0
    };
  }).filter(item => item.quantity > 0);
  return portfolio;
}

function downloadCSV(data) {
  const header = Object.keys(data[0]).join(',');
  const rows = data.map(row => Object.values(row).join(','));
  const csv = [header, ...rows].join('\n');
  const blob = new Blob([csv], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'portfolio.csv';
  a.click();
  URL.revokeObjectURL(url);
}

const PortfolioAnalytics = ({ orders, stocks }) => {
  const portfolio = useMemo(() => calculatePortfolio(orders, stocks), [orders, stocks]);
  const totalValue = portfolio.reduce((sum, p) => sum + p.currentValue, 0);
  const totalCost = portfolio.reduce((sum, p) => sum + p.totalCost, 0);
  const overallGainLoss = totalValue - totalCost;
  const bestPerformer = portfolio.reduce((best, p) => (p.gainLoss > (best?.gainLoss || -Infinity) ? p : best), null);
  const worstPerformer = portfolio.reduce((worst, p) => (p.gainLoss < (worst?.gainLoss || Infinity) ? p : worst), null);

  const chartOptions = {
    chart: { type: 'pie' },
    labels: portfolio.map(p => p.symbol),
    legend: { position: 'bottom' },
    tooltip: { y: { formatter: val => `₹${val.toFixed(2)}` } }
  };
  const chartSeries = portfolio.map(p => p.currentValue);

  if (!portfolio.length) {
    return (
      <div className="p-6 bg-white rounded-xl border border-gray-200 text-center">
        {/* SVG Illustration */}
        <svg width="80" height="80" viewBox="0 0 80 80" fill="none" className="mx-auto mb-4" xmlns="http://www.w3.org/2000/svg">
          <circle cx="40" cy="40" r="40" fill="#F3F4F6" />
          <rect x="28" y="32" width="24" height="24" rx="4" fill="#A78BFA" />
          <rect x="34" y="38" width="12" height="4" rx="2" fill="#C4B5FD" />
          <rect x="34" y="44" width="8" height="4" rx="2" fill="#C4B5FD" />
        </svg>
        <h3 className="text-lg font-semibold mb-2">No Holdings Yet</h3>
        <p className="text-gray-500 mb-2">You don't have any stocks in your portfolio yet.</p>
        <p className="text-gray-400 text-sm">Buy stocks to see your portfolio analytics here.</p>
      </div>
    );
  }

  return (
    <div className="p-6 bg-white rounded-xl border border-gray-200">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <h3 className="text-lg font-semibold mb-4 md:mb-0">Portfolio Analytics</h3>
        <button
          onClick={() => downloadCSV(portfolio)}
          className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 text-sm"
        >
          Download CSV
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <ReactApexChart options={chartOptions} series={chartSeries} type="pie" height={260} />
        </div>
        <div className="space-y-3">
          <div>
            <span className="text-gray-500">Total Value:</span>
            <span className="ml-2 font-bold">₹{totalValue.toFixed(2)}</span>
          </div>
          <div>
            <span className="text-gray-500">Overall Gain/Loss:</span>
            <span className={`ml-2 font-bold ${overallGainLoss >= 0 ? 'text-green-600' : 'text-red-600'}`}>{overallGainLoss >= 0 ? '+' : ''}₹{overallGainLoss.toFixed(2)}</span>
          </div>
          <div>
            <span className="text-gray-500">Best Performer:</span>
            <span className="ml-2 font-bold">{bestPerformer?.symbol} ({bestPerformer?.gainLoss >= 0 ? '+' : ''}₹{bestPerformer?.gainLoss.toFixed(2)})</span>
          </div>
          <div>
            <span className="text-gray-500">Worst Performer:</span>
            <span className="ml-2 font-bold">{worstPerformer?.symbol} ({worstPerformer?.gainLoss >= 0 ? '+' : ''}₹{worstPerformer?.gainLoss.toFixed(2)})</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortfolioAnalytics; 