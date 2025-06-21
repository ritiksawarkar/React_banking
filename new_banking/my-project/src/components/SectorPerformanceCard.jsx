import React from 'react';
import ReactApexChart from 'react-apexcharts';
import { FaMicrochip, FaHeartbeat, FaChartLine, FaShoppingCart, FaBolt, FaIndustry, FaBox, FaBuilding } from 'react-icons/fa';

const SectorPerformanceCard = ({ sector, selectedSector, onClick }) => {
  // Generate chart data with proper number formatting and validation
  const generateChartData = () => {
    try {
      const baseValue = parseFloat(sector.change) || 0;
      const data = Array.from({ length: 10 }, () => {
        const randomFactor = (Math.random() - 0.5) * 2;
        const value = baseValue + randomFactor;
        // Ensure the value is a valid number and within reasonable bounds
        const validValue = Math.max(-50, Math.min(50, value));
        return Number(validValue.toFixed(2));
      });
      // Validate all values are finite numbers
      return data.every(val => Number.isFinite(val)) ? data : [0, 1, 0, -1, 0, 1, 0, -1, 0, 1];
    } catch {
      return [0, 1, 0, -1, 0, 1, 0, -1, 0, 1];
    }
  };

  return (
    <div 
      className="bg-white rounded-lg shadow-sm sm:shadow border border-gray-100 hover:shadow-md transition-all duration-300 cursor-pointer group p-2 sm:p-3 overflow-hidden"
      onClick={onClick}
    >
      <div className="flex items-center justify-between mb-1.5 sm:mb-2 min-w-0">
        <div className="flex items-center space-x-1.5 sm:space-x-2 min-w-0">
          <div className={`p-1 sm:p-1.5 rounded flex-shrink-0 ${sector.trend === 'up' ? 'bg-green-50' : 'bg-red-50'}`}> 
            {sector.name === 'Technology' && <FaMicrochip className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${sector.trend === 'up' ? 'text-green-600' : 'text-red-600'}`} />}
            {sector.name === 'Healthcare' && <FaHeartbeat className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${sector.trend === 'up' ? 'text-green-600' : 'text-red-600'}`} />}
            {sector.name === 'Financial' && <FaChartLine className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${sector.trend === 'up' ? 'text-green-600' : 'text-red-600'}`} />}
            {sector.name === 'Consumer' && <FaShoppingCart className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${sector.trend === 'up' ? 'text-green-600' : 'text-red-600'}`} />}
            {sector.name === 'Energy' && <FaBolt className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${sector.trend === 'up' ? 'text-green-600' : 'text-red-600'}`} />}
            {sector.name === 'Industrial' && <FaIndustry className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${sector.trend === 'up' ? 'text-green-600' : 'text-red-600'}`} />}
            {sector.name === 'Materials' && <FaBox className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${sector.trend === 'up' ? 'text-green-600' : 'text-red-600'}`} />}
            {sector.name === 'Real Estate' && <FaBuilding className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${sector.trend === 'up' ? 'text-green-600' : 'text-red-600'}`} />}
          </div>
          <span className="text-xs sm:text-sm font-medium text-gray-900 truncate text-left">{sector.name}</span>
        </div>
        <span className={`text-xs sm:text-sm font-medium flex-shrink-0 ml-1 text-right ${sector.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
          {Number.isFinite(Number(sector.change)) ? Number(sector.change).toFixed(2) : '0.00'}%
        </span>
      </div>
      <div className="h-6 sm:h-8 w-full">
        <ReactApexChart
          options={{
            chart: {
              type: 'line',
              sparkline: { enabled: true },
              animations: { enabled: false },
              toolbar: { show: false },
              parentHeightOffset: 0,
              zoom: { enabled: false }
            },
            stroke: {
              curve: 'smooth',
              width: 1.5,
              colors: [sector.trend === 'up' ? '#10B981' : '#EF4444']
            },
            tooltip: { enabled: false },
            grid: { show: false },
            xaxis: { show: false, labels: { show: false }, axisBorder: { show: false }, axisTicks: { show: false } },
            yaxis: { show: false, labels: { show: false }, axisBorder: { show: false }, axisTicks: { show: false } },
            markers: { size: 0 },
            dataLabels: { enabled: false }
          }}
          series={[{
            name: sector.name,
            data: generateChartData()
          }]}
          type="line"
          height="100%"
          width="100%"
        />
      </div>
      <div className="text-[10px] sm:text-xs text-gray-400 group-hover:text-gray-700 transition-colors duration-200 truncate mt-0.5 sm:mt-1 text-center">
        {selectedSector === sector.name ? 'Click to clear filter' : `Click to view ${sector.name} stocks`}
      </div>
    </div>
  );
};

export default React.memo(SectorPerformanceCard); 