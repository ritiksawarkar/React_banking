import React, { useState } from 'react';
import DashboardPageHeader from '../components/DashboardPageHeader';
import DashboardPageFooter from '../components/DashboardPageFooter';
import { FaChartPie, FaCalendarAlt, FaFilter, FaArrowUp, FaArrowDown, FaWallet, FaChevronDown, FaChevronUp, FaInfoCircle, FaChartLine, FaListUl, FaSyncAlt, FaSearch, FaUser, FaMoneyBillWave, FaShoppingCart, FaUtensils, FaCar, FaHome, FaHeartbeat, FaBook, FaGift, FaBus, FaMobileAlt, FaBolt, FaGasPump, FaPlane, FaPiggyBank, FaRegSmile, FaRegSadTear } from 'react-icons/fa';
import ReactApexChart from 'react-apexcharts';

// --- Placeholder Data ---
const categories = [
  { key: 'shopping', label: 'Shopping', icon: <FaShoppingCart className="text-pink-500" /> },
  { key: 'food', label: 'Food & Dining', icon: <FaUtensils className="text-yellow-500" /> },
  { key: 'transport', label: 'Transport', icon: <FaCar className="text-blue-500" /> },
  { key: 'bills', label: 'Bills', icon: <FaBolt className="text-indigo-500" /> },
  { key: 'health', label: 'Health', icon: <FaHeartbeat className="text-red-500" /> },
  { key: 'education', label: 'Education', icon: <FaBook className="text-green-500" /> },
  { key: 'gifts', label: 'Gifts', icon: <FaGift className="text-purple-500" /> },
  { key: 'travel', label: 'Travel', icon: <FaPlane className="text-cyan-500" /> },
  { key: 'others', label: 'Others', icon: <FaListUl className="text-gray-400" /> },
];

const months = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
];

const spendingData = [
  { month: 'Jan', shopping: 3200, food: 1800, transport: 900, bills: 1200, health: 400, education: 0, gifts: 200, travel: 0, others: 300 },
  { month: 'Feb', shopping: 2800, food: 1600, transport: 950, bills: 1100, health: 600, education: 0, gifts: 0, travel: 0, others: 250 },
  { month: 'Mar', shopping: 3500, food: 2000, transport: 1000, bills: 1300, health: 300, education: 0, gifts: 0, travel: 0, others: 400 },
  { month: 'Apr', shopping: 4000, food: 2100, transport: 1100, bills: 1400, health: 500, education: 0, gifts: 0, travel: 0, others: 350 },
  { month: 'May', shopping: 3700, food: 1900, transport: 1050, bills: 1250, health: 450, education: 0, gifts: 0, travel: 0, others: 300 },
  { month: 'Jun', shopping: 3900, food: 2200, transport: 1200, bills: 1500, health: 700, education: 0, gifts: 0, travel: 0, others: 500 },
];

const recentTransactions = [
  { id: 1, date: '2024-06-01', category: 'shopping', amount: 1200, description: 'Amazon Order', type: 'debit' },
  { id: 2, date: '2024-05-29', category: 'food', amount: 450, description: 'Swiggy', type: 'debit' },
  { id: 3, date: '2024-05-28', category: 'bills', amount: 800, description: 'Electricity Bill', type: 'debit' },
  { id: 4, date: '2024-05-27', category: 'transport', amount: 200, description: 'Uber', type: 'debit' },
  { id: 5, date: '2024-05-26', category: 'health', amount: 300, description: 'Pharmacy', type: 'debit' },
  { id: 6, date: '2024-05-25', category: 'shopping', amount: 900, description: 'Flipkart', type: 'debit' },
  { id: 7, date: '2024-05-24', category: 'food', amount: 350, description: 'Zomato', type: 'debit' },
  { id: 8, date: '2024-05-23', category: 'bills', amount: 600, description: 'Mobile Bill', type: 'debit' },
  { id: 9, date: '2024-05-22', category: 'gifts', amount: 500, description: 'Birthday Gift', type: 'debit' },
  { id: 10, date: '2024-05-21', category: 'others', amount: 150, description: 'Miscellaneous', type: 'debit' },
];

const insights = [
  { id: 1, type: 'positive', message: 'You spent 12% less on shopping this month compared to last month.' },
  { id: 2, type: 'neutral', message: 'Your food & dining expenses are consistent with your average.' },
  { id: 3, type: 'warning', message: 'Transport spending increased by 18% this month.' },
  { id: 4, type: 'positive', message: 'You paid all your bills on time this month.' },
  { id: 5, type: 'info', message: 'Try setting a monthly budget for shopping to save more.' },
];

// --- Analytics Page Component ---
const Analytics = () => {
  // Filters
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [dateRange, setDateRange] = useState({ from: '2024-01-01', to: '2024-06-30' });
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [showDateDropdown, setShowDateDropdown] = useState(false);

  // Chart Data
  const pieSeries = categories.map(cat =>
    spendingData.reduce((sum, m) => sum + (m[cat.key] || 0), 0)
  );
  const pieLabels = categories.map(cat => cat.label);

  const lineSeries = categories.map(cat => ({
    name: cat.label,
    data: spendingData.map(m => m[cat.key] || 0),
  }));

  // Filtered Transactions
  const filteredTransactions = recentTransactions.filter(txn =>
    (selectedCategory === 'all' || txn.category === selectedCategory)
  );

  // --- Render ---
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-50 flex flex-col">
      <DashboardPageHeader />
      <main className="flex-1 max-w-6xl mx-auto w-full px-4 py-8 pt-28">
        {/* Page Title & Filters */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-1 flex items-center gap-2">
              <FaChartPie className="text-indigo-500" /> Analytics
            </h1>
            <p className="text-gray-600">Track your spending, trends, and insights</p>
          </div>
          <div className="flex gap-3 flex-wrap">
            {/* Category Filter */}
            <div className="relative">
              <button
                className="flex items-center px-4 py-2 bg-white border border-gray-200 rounded-lg shadow-sm text-gray-700 hover:bg-gray-50 focus:outline-none"
                onClick={() => setShowCategoryDropdown(v => !v)}
              >
                <FaFilter className="mr-2 text-gray-400" />
                {selectedCategory === 'all' ? 'All Categories' : categories.find(c => c.key === selectedCategory)?.label}
                {showCategoryDropdown ? <FaChevronUp className="ml-2" /> : <FaChevronDown className="ml-2" />}
              </button>
              {showCategoryDropdown && (
                <div className="absolute z-10 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg">
                  <button
                    className={`w-full text-left px-4 py-2 hover:bg-indigo-50 ${selectedCategory === 'all' ? 'bg-indigo-50 font-semibold' : ''}`}
                    onClick={() => { setSelectedCategory('all'); setShowCategoryDropdown(false); }}
                  >
                    All Categories
                  </button>
                  {categories.map(cat => (
                    <button
                      key={cat.key}
                      className={`w-full text-left px-4 py-2 hover:bg-indigo-50 flex items-center gap-2 ${selectedCategory === cat.key ? 'bg-indigo-50 font-semibold' : ''}`}
                      onClick={() => { setSelectedCategory(cat.key); setShowCategoryDropdown(false); }}
                    >
                      {cat.icon} {cat.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
            {/* Date Range Filter (static for now) */}
            <div className="relative">
              <button
                className="flex items-center px-4 py-2 bg-white border border-gray-200 rounded-lg shadow-sm text-gray-700 hover:bg-gray-50 focus:outline-none"
                onClick={() => setShowDateDropdown(v => !v)}
              >
                <FaCalendarAlt className="mr-2 text-gray-400" />
                {new Date(dateRange.from).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })} - {new Date(dateRange.to).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                {showDateDropdown ? <FaChevronUp className="ml-2" /> : <FaChevronDown className="ml-2" />}
              </button>
              {showDateDropdown && (
                <div className="absolute z-10 mt-2 w-64 bg-white border border-gray-200 rounded-lg shadow-lg p-4">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">From</label>
                      <input
                        type="date"
                        value={dateRange.from}
                        onChange={(e) => setDateRange(prev => ({ ...prev, from: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">To</label>
                      <input
                        type="date"
                        value={dateRange.to}
                        onChange={(e) => setDateRange(prev => ({ ...prev, to: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                      />
                    </div>
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => {
                          setDateRange({ from: '2024-01-01', to: '2024-06-30' });
                          setShowDateDropdown(false);
                        }}
                        className="px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-50 rounded-lg"
                      >
                        Reset
                      </button>
                      <button
                        onClick={() => setShowDateDropdown(false)}
                        className="px-3 py-1.5 text-sm text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg"
                      >
                        Apply
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Spending Summary */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-white rounded-xl shadow p-6 border border-gray-200 flex flex-col items-center">
            <FaWallet className="text-3xl text-indigo-500 mb-2" />
            <div className="text-sm text-gray-500 mb-1">Total Spent (6 months)</div>
            <div className="text-2xl font-bold text-gray-900 mb-2">₹{pieSeries.reduce((a, b) => a + b, 0).toLocaleString()}</div>
            <div className="flex gap-2 text-xs text-gray-500">
              <span>Avg. per month: ₹{Math.round(pieSeries.reduce((a, b) => a + b, 0) / 6).toLocaleString()}</span>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow p-6 border border-gray-200 flex flex-col items-center">
            <FaArrowDown className="text-3xl text-red-500 mb-2" />
            <div className="text-sm text-gray-500 mb-1">Highest Category</div>
            <div className="text-2xl font-bold text-gray-900 mb-2">{categories[pieSeries.indexOf(Math.max(...pieSeries))]?.label}</div>
            <div className="flex gap-2 text-xs text-gray-500">
              <span>₹{Math.max(...pieSeries).toLocaleString()}</span>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow p-6 border border-gray-200 flex flex-col items-center">
            <FaArrowUp className="text-3xl text-green-500 mb-2" />
            <div className="text-sm text-gray-500 mb-1">Lowest Category</div>
            <div className="text-2xl font-bold text-gray-900 mb-2">{categories[pieSeries.indexOf(Math.min(...pieSeries))]?.label}</div>
            <div className="flex gap-2 text-xs text-gray-500">
              <span>₹{Math.min(...pieSeries).toLocaleString()}</span>
            </div>
          </div>
        </section>

        {/* Charts Section */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
          {/* Pie Chart */}
          <div className="bg-white rounded-xl shadow p-6 border border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2"><FaChartPie className="text-indigo-500" /> Category-wise Spending</h2>
            <ReactApexChart
              options={{
                chart: { type: 'pie' },
                labels: pieLabels,
                legend: { position: 'bottom' },
                colors: ['#f472b6', '#fbbf24', '#60a5fa', '#818cf8', '#ef4444', '#22c55e', '#a78bfa', '#06b6d4', '#9ca3af'],
                dataLabels: { enabled: true },
                tooltip: { y: { formatter: val => `₹${val.toLocaleString()}` } },
              }}
              series={pieSeries}
              type="pie"
              height={320}
            />
          </div>
          {/* Line Chart */}
          <div className="bg-white rounded-xl shadow p-6 border border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2"><FaChartLine className="text-indigo-500" /> Monthly Trends</h2>
            <ReactApexChart
              options={{
                chart: { type: 'line', toolbar: { show: false } },
                xaxis: { categories: months },
                legend: { position: 'bottom' },
                colors: ['#f472b6', '#fbbf24', '#60a5fa', '#818cf8', '#ef4444', '#22c55e', '#a78bfa', '#06b6d4', '#9ca3af'],
                stroke: { width: 2 },
                tooltip: { y: { formatter: val => `₹${val.toLocaleString()}` } },
              }}
              series={lineSeries}
              type="line"
              height={320}
            />
          </div>
        </section>

        {/* Recent Transactions Table */}
        <section className="mb-10">
          <div className="bg-white rounded-xl shadow p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2"><FaListUl className="text-indigo-500" /> Recent Transactions</h2>
              <div className="flex items-center gap-2">
                <FaSearch className="text-gray-400" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="px-3 py-1 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                  // Add search logic if needed
                />
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="text-left text-gray-500 border-b">
                    <th className="py-2">Date</th>
                    <th className="py-2">Category</th>
                    <th className="py-2">Description</th>
                    <th className="py-2">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredTransactions.map(txn => (
                    <tr key={txn.id} className="border-b last:border-b-0">
                      <td className="py-2">{new Date(txn.date).toLocaleDateString()}</td>
                      <td className="py-2 flex items-center gap-2">{categories.find(c => c.key === txn.category)?.icon} {categories.find(c => c.key === txn.category)?.label}</td>
                      <td className="py-2">{txn.description}</td>
                      <td className={`py-2 font-semibold ${txn.type === 'debit' ? 'text-red-600' : 'text-green-600'}`}>{txn.type === 'debit' ? '-' : '+'}₹{txn.amount.toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Insights Section */}
        <section className="mb-10">
          <div className="bg-white rounded-xl shadow p-6 border border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2"><FaInfoCircle className="text-indigo-500" /> Insights</h2>
            <ul className="space-y-3">
              {insights.map(insight => (
                <li key={insight.id} className={`flex items-center gap-3 p-3 rounded-lg ${insight.type === 'positive' ? 'bg-green-50 text-green-700' : insight.type === 'warning' ? 'bg-yellow-50 text-yellow-700' : insight.type === 'info' ? 'bg-blue-50 text-blue-700' : 'bg-gray-50 text-gray-700'}`}>
                  {insight.type === 'positive' && <FaRegSmile className="text-green-400" />}
                  {insight.type === 'warning' && <FaRegSadTear className="text-yellow-400" />}
                  {insight.type === 'info' && <FaInfoCircle className="text-blue-400" />}
                  {insight.type === 'neutral' && <FaChartPie className="text-gray-400" />}
                  <span>{insight.message}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Accessibility & Help */}
        <section className="mb-10">
          <div className="bg-white rounded-xl shadow p-6 border border-gray-200 flex flex-col md:flex-row items-center gap-6">
            <FaInfoCircle className="text-indigo-500 text-3xl" />
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-1">Need help understanding your analytics?</h3>
              <p className="text-gray-600 mb-2">Hover over chart points for details. Use filters to focus on specific categories or months. All charts and tables are keyboard accessible.</p>
              <a href="/help" className="text-indigo-600 hover:underline font-medium">Go to Help Center</a>
            </div>
          </div>
        </section>
      </main>
      <DashboardPageFooter />
    </div>
  );
};

export default Analytics; 