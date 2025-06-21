import React from 'react';
import SectorPerformanceCard from './SectorPerformanceCard';
import PropTypes from 'prop-types';

const SectorPerformanceSection = ({
  sectorPerformance,
  selectedSector,
  onSectorClick,
  onSortByPerformance,
  onSortByName
}) => (
  <div className="mb-6 sm:mb-8">
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-3 sm:mb-4 gap-3 sm:gap-4">
      <h2 className="text-lg sm:text-xl font-semibold text-gray-900 text-left">Sector Performance</h2>
      <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
        <button 
          className="flex-1 sm:flex-none px-3 py-2 sm:py-1.5 text-xs sm:text-sm font-medium text-gray-600 hover:text-gray-900 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200 text-center"
          onClick={onSortByPerformance}
        >
          Sort by Performance
        </button>
        <button 
          className="flex-1 sm:flex-none px-3 py-2 sm:py-1.5 text-xs sm:text-sm font-medium text-gray-600 hover:text-gray-900 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200 text-center"
          onClick={onSortByName}
        >
          Sort by Name
        </button>
      </div>
    </div>
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-2 sm:gap-3">
      {sectorPerformance.map((sector) => (
        <SectorPerformanceCard
          key={sector.name} 
          sector={sector}
          selectedSector={selectedSector}
          onClick={() => onSectorClick(sector.name)}
        />
      ))}
    </div>
  </div>
);

SectorPerformanceSection.propTypes = {
  sectorPerformance: PropTypes.arrayOf(PropTypes.object).isRequired,
  selectedSector: PropTypes.string,
  onSectorClick: PropTypes.func.isRequired,
  onSortByPerformance: PropTypes.func.isRequired,
  onSortByName: PropTypes.func.isRequired,
};

export default SectorPerformanceSection; 