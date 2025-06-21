import React, { useRef, useEffect } from 'react';
import { FaTimes } from 'react-icons/fa';

const FilterModal = ({ show, advancedFilters, setAdvancedFilters, applyAdvancedFilters, clearAdvancedFilters, onClose }) => {
  const modalRef = useRef(null);
  const closeBtnRef = useRef(null);

  // Focus trap
  useEffect(() => {
    if (show && modalRef.current) {
      const modalNode = modalRef.current;
      const focusableEls = modalNode.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      const firstEl = focusableEls[0];
      const lastEl = focusableEls[focusableEls.length - 1];
      const handleTab = (e) => {
        if (e.key === 'Tab') {
          if (e.shiftKey) {
            if (document.activeElement === firstEl) {
              e.preventDefault();
              lastEl.focus();
            }
          } else {
            if (document.activeElement === lastEl) {
              e.preventDefault();
              firstEl.focus();
            }
          }
        } else if (e.key === 'Escape') {
          onClose();
        }
      };
      modalNode.addEventListener('keydown', handleTab);
      // Focus the close button
      if (closeBtnRef.current) closeBtnRef.current.focus();
      return () => modalNode.removeEventListener('keydown', handleTab);
    }
  }, [show, onClose]);

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      {/* Add fade/scale animation to modal. Remember to define @keyframes modalIn in your global CSS. */}
      <div
        className="bg-white rounded-2xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto transform transition-all duration-300 scale-95 opacity-0 animate-[modalIn_0.3s_ease-out_forwards]"
        role="dialog"
        aria-modal="true"
        aria-labelledby="filter-modal-title"
        ref={modalRef}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 id="filter-modal-title" className="text-2xl font-bold text-gray-900">Advanced Filters</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
            aria-label="Close filter modal"
            tabIndex={0}
            ref={closeBtnRef}
            autoFocus
          >
            <FaTimes className="w-6 h-6" />
          </button>
        </div>

        <div className="space-y-6">
          {/* Price Range */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Price Range</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Min Price</label>
                <input
                  type="number"
                  value={advancedFilters.priceRange.min}
                  onChange={e => setAdvancedFilters(prev => ({
                    ...prev,
                    priceRange: { ...prev.priceRange, min: e.target.value }
                  }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  placeholder="0"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Max Price</label>
                <input
                  type="number"
                  value={advancedFilters.priceRange.max}
                  onChange={e => setAdvancedFilters(prev => ({
                    ...prev,
                    priceRange: { ...prev.priceRange, max: e.target.value }
                  }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  placeholder="1000"
                />
              </div>
            </div>
          </div>

          {/* Market Cap */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Market Cap</h3>
            <select
              value={advancedFilters.marketCap}
              onChange={e => setAdvancedFilters(prev => ({ ...prev, marketCap: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
            >
              <option value="">All Market Caps</option>
              <option value="B">Small Cap (Under $2B)</option>
              <option value="B">Mid Cap ($2B - $10B)</option>
              <option value="B">Large Cap (Over $10B)</option>
            </select>
          </div>

          {/* Sector */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Sector</h3>
            <select
              value={advancedFilters.sector}
              onChange={e => setAdvancedFilters(prev => ({ ...prev, sector: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
            >
              <option value="">All Sectors</option>
              <option value="Technology">Technology</option>
              <option value="Financial">Financial</option>
              <option value="Consumer">Consumer</option>
              <option value="Healthcare">Healthcare</option>
              <option value="Energy">Energy</option>
              <option value="Industrial">Industrial</option>
              <option value="Materials">Materials</option>
              <option value="Real Estate">Real Estate</option>
            </select>
          </div>

          {/* Dividend Yield */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Dividend Yield (%)</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Min Yield</label>
                <input
                  type="number"
                  step="0.1"
                  value={advancedFilters.dividendYield.min}
                  onChange={e => setAdvancedFilters(prev => ({
                    ...prev,
                    dividendYield: { ...prev.dividendYield, min: e.target.value }
                  }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  placeholder="0"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Max Yield</label>
                <input
                  type="number"
                  step="0.1"
                  value={advancedFilters.dividendYield.max}
                  onChange={e => setAdvancedFilters(prev => ({
                    ...prev,
                    dividendYield: { ...prev.dividendYield, max: e.target.value }
                  }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  placeholder="10"
                />
              </div>
            </div>
          </div>

          {/* P/E Ratio */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">P/E Ratio</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Min P/E</label>
                <input
                  type="number"
                  value={advancedFilters.peRatio.min}
                  onChange={e => setAdvancedFilters(prev => ({
                    ...prev,
                    peRatio: { ...prev.peRatio, min: e.target.value }
                  }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  placeholder="0"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Max P/E</label>
                <input
                  type="number"
                  value={advancedFilters.peRatio.max}
                  onChange={e => setAdvancedFilters(prev => ({
                    ...prev,
                    peRatio: { ...prev.peRatio, max: e.target.value }
                  }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  placeholder="100"
                />
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
            <button
              onClick={clearAdvancedFilters}
              className="px-4 py-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Clear Filters
            </button>
            <button
              onClick={applyAdvancedFilters}
              className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
              Apply Filters
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterModal; 