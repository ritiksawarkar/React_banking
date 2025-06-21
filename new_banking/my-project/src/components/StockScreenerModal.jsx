import React, { useRef, useEffect, useState } from 'react';
import { FaTimes } from 'react-icons/fa';

const SECTORS = [
  'Technology', 'Financial', 'Consumer', 'Healthcare', 'Energy', 'Industrial', 'Materials', 'Real Estate', 'Communication Services', 'Automotive', 'FMCG', 'Information Technology', 'Banking', 'Mid Cap', 'Diversified', 'Automobile'
];
const MARKET_CAPS = [
  { label: 'Large Cap (>$10B)', value: 'large' },
  { label: 'Mid Cap ($2B-$10B)', value: 'mid' },
  { label: 'Small Cap (<$2B)', value: 'small' }
];

const StockScreenerModal = ({ show, onClose, stocks, setFilteredStocks }) => {
  const modalRef = useRef(null);
  const closeBtnRef = useRef(null);

  // Filter state
  const [priceMin, setPriceMin] = useState('');
  const [priceMax, setPriceMax] = useState('');
  const [marketCap, setMarketCap] = useState('');
  const [sector, setSector] = useState('');
  const [peMin, setPeMin] = useState('');
  const [peMax, setPeMax] = useState('');
  const [dividendMin, setDividendMin] = useState('');
  const [dividendMax, setDividendMax] = useState('');
  const [volumeMin, setVolumeMin] = useState('');
  const [volumeMax, setVolumeMax] = useState('');

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
      if (closeBtnRef.current) closeBtnRef.current.focus();
      return () => modalNode.removeEventListener('keydown', handleTab);
    }
  }, [show, onClose]);

  if (!show) return null;

  // Filtering logic
  const applyFilters = () => {
    let filtered = stocks;
    if (priceMin) filtered = filtered.filter(s => s.price >= parseFloat(priceMin));
    if (priceMax) filtered = filtered.filter(s => s.price <= parseFloat(priceMax));
    if (marketCap) {
      filtered = filtered.filter(s => {
        if (!s.marketCap || typeof s.marketCap !== 'string') return false;
        const val = s.marketCap.toUpperCase();
        if (marketCap === 'large') return val.includes('T') || (val.includes('B') && parseFloat(val) >= 10);
        if (marketCap === 'mid') return val.includes('B') && parseFloat(val) >= 2 && parseFloat(val) < 10;
        if (marketCap === 'small') return (val.includes('B') && parseFloat(val) < 2) || val.includes('M');
        return false;
      });
    }
    if (sector) filtered = filtered.filter(s => s.sector === sector);
    if (peMin) filtered = filtered.filter(s => parseFloat(s.peRatio) >= parseFloat(peMin));
    if (peMax) filtered = filtered.filter(s => parseFloat(s.peRatio) <= parseFloat(peMax));
    if (dividendMin) filtered = filtered.filter(s => parseFloat(s.dividendYield) >= parseFloat(dividendMin));
    if (dividendMax) filtered = filtered.filter(s => parseFloat(s.dividendYield) <= parseFloat(dividendMax));
    if (volumeMin) filtered = filtered.filter(s => {
      if (!s.volume) return false;
      const v = s.volume.toUpperCase();
      let num = parseFloat(v);
      if (v.includes('B')) num *= 1e9;
      else if (v.includes('M')) num *= 1e6;
      return num >= parseFloat(volumeMin);
    });
    if (volumeMax) filtered = filtered.filter(s => {
      if (!s.volume) return false;
      const v = s.volume.toUpperCase();
      let num = parseFloat(v);
      if (v.includes('B')) num *= 1e9;
      else if (v.includes('M')) num *= 1e6;
      return num <= parseFloat(volumeMax);
    });
    setFilteredStocks(filtered);
    onClose();
  };

  const clearFilters = () => {
    setPriceMin(''); setPriceMax(''); setMarketCap(''); setSector(''); setPeMin(''); setPeMax(''); setDividendMin(''); setDividendMax(''); setVolumeMin(''); setVolumeMax('');
    setFilteredStocks([]);
  };

  const anyFilterSet = priceMin || priceMax || marketCap || sector || peMin || peMax || dividendMin || dividendMax || volumeMin || volumeMax;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      {/* Fade/scale animation. Remember to define @keyframes modalIn in your global CSS. */}
      <div
        className="bg-white rounded-2xl p-6 w-full max-w-3xl max-h-[90vh] overflow-y-auto transform transition-all duration-300 scale-95 opacity-0 animate-[modalIn_0.3s_ease-out_forwards]"
        role="dialog"
        aria-modal="true"
        aria-labelledby="stock-screener-modal-title"
        ref={modalRef}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 id="stock-screener-modal-title" className="text-2xl font-bold text-gray-900">Stock Screener</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
            aria-label="Close stock screener modal"
            tabIndex={0}
            ref={closeBtnRef}
            autoFocus
          >
            <FaTimes className="w-6 h-6" />
          </button>
        </div>
        {/* Advanced filter controls */}
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Price Range</label>
              <div className="flex gap-2">
                <input type="number" min="0" value={priceMin} onChange={e => setPriceMin(e.target.value)} className="w-1/2 px-3 py-2 border border-gray-300 rounded-lg" placeholder="Min" />
                <input type="number" min="0" value={priceMax} onChange={e => setPriceMax(e.target.value)} className="w-1/2 px-3 py-2 border border-gray-300 rounded-lg" placeholder="Max" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Market Cap</label>
              <select value={marketCap} onChange={e => setMarketCap(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                <option value="">All</option>
                {MARKET_CAPS.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Sector</label>
              <select value={sector} onChange={e => setSector(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                <option value="">All</option>
                {SECTORS.map(opt => <option key={opt} value={opt}>{opt}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">P/E Ratio</label>
              <div className="flex gap-2">
                <input type="number" min="0" value={peMin} onChange={e => setPeMin(e.target.value)} className="w-1/2 px-3 py-2 border border-gray-300 rounded-lg" placeholder="Min" />
                <input type="number" min="0" value={peMax} onChange={e => setPeMax(e.target.value)} className="w-1/2 px-3 py-2 border border-gray-300 rounded-lg" placeholder="Max" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Dividend Yield (%)</label>
              <div className="flex gap-2">
                <input type="number" min="0" value={dividendMin} onChange={e => setDividendMin(e.target.value)} className="w-1/2 px-3 py-2 border border-gray-300 rounded-lg" placeholder="Min" />
                <input type="number" min="0" value={dividendMax} onChange={e => setDividendMax(e.target.value)} className="w-1/2 px-3 py-2 border border-gray-300 rounded-lg" placeholder="Max" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Volume</label>
              <div className="flex gap-2">
                <input type="number" min="0" value={volumeMin} onChange={e => setVolumeMin(e.target.value)} className="w-1/2 px-3 py-2 border border-gray-300 rounded-lg" placeholder="Min" />
                <input type="number" min="0" value={volumeMax} onChange={e => setVolumeMax(e.target.value)} className="w-1/2 px-3 py-2 border border-gray-300 rounded-lg" placeholder="Max" />
              </div>
            </div>
          </div>
          <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
            <button
              onClick={clearFilters}
              className="px-4 py-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              disabled={!anyFilterSet}
            >
              Clear Filters
            </button>
            <button
              onClick={applyFilters}
              className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors"
              disabled={!anyFilterSet}
            >
              Apply Filters
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StockScreenerModal; 