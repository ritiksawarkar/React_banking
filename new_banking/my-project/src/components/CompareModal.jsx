import React, { useRef, useEffect } from 'react';
import { FaTimes } from 'react-icons/fa';

const CompareModal = ({ show, selectedStocksForComparison, removeFromComparison, clearComparison, stocks }) => {
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
          clearComparison();
        }
      };
      modalNode.addEventListener('keydown', handleTab);
      // Focus the close button
      if (closeBtnRef.current) closeBtnRef.current.focus();
      return () => modalNode.removeEventListener('keydown', handleTab);
    }
  }, [show, clearComparison]);

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      {/* Add fade/scale animation to modal. Remember to define @keyframes modalIn in your global CSS. */}
      <div
        className="bg-white rounded-2xl p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto transform transition-all duration-300 scale-95 opacity-0 animate-[modalIn_0.3s_ease-out_forwards]"
        role="dialog"
        aria-modal="true"
        aria-labelledby="compare-modal-title"
        ref={modalRef}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 id="compare-modal-title" className="text-2xl font-bold text-gray-900">Compare Stocks</h2>
          <button
            onClick={clearComparison}
            className="text-gray-400 hover:text-gray-500"
            aria-label="Close compare modal"
            tabIndex={0}
            ref={closeBtnRef}
            autoFocus
          >
            <FaTimes className="w-6 h-6" />
          </button>
        </div>
        {selectedStocksForComparison.length === 0 ? (
          <div className="text-center py-8">
            {/* SVG Illustration */}
            <svg width="80" height="80" viewBox="0 0 80 80" fill="none" className="mx-auto mb-4" xmlns="http://www.w3.org/2000/svg">
              <circle cx="40" cy="40" r="40" fill="#F3F4F6" />
              <rect x="22" y="30" width="12" height="28" rx="2" fill="#A78BFA" />
              <rect x="46" y="22" width="12" height="36" rx="2" fill="#C4B5FD" />
            </svg>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No stocks selected for comparison</h3>
            <p className="text-gray-500 mb-2">Select up to 4 stocks to compare their key metrics, price trends, and more.</p>
            <p className="text-gray-400 text-sm">Use the <span className="inline-block align-middle"><svg width="16" height="16" fill="currentColor" className="inline text-green-600" viewBox="0 0 16 16"><path d="M8 1.5a.5.5 0 0 1 .5.5v5.5H14a.5.5 0 0 1 0 1H8.5V14a.5.5 0 0 1-1 0V8.5H2a.5.5 0 0 1 0-1h5.5V2a.5.5 0 0 1 .5-.5z"/></svg></span> button to add stocks.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Symbol</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Change</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sector</th>
                  <th className="px-4 py-2"></th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-100">
                {selectedStocksForComparison.map(stockObj => {
                  const stock = stocks.find(s => s.symbol === stockObj.symbol) || stockObj;
                  return (
                    <tr key={stock.symbol}>
                      <td className="px-4 py-2 font-medium text-gray-900 flex items-center space-x-2">
                        <img src={stock.logo} alt={stock.name} className="w-6 h-6 rounded bg-gray-50 object-contain" />
                        <span>{stock.symbol}</span>
                      </td>
                      <td className="px-4 py-2 text-gray-700">{stock.name}</td>
                      <td className="px-4 py-2 text-gray-900">₹{stock.price?.toFixed(2)}</td>
                      <td className={`px-4 py-2 font-medium ${stock.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>{stock.change >= 0 ? '+' : ''}{stock.change?.toFixed(2)} ({stock.changePercent?.toFixed(2)}%)</td>
                      <td className="px-4 py-2 text-gray-700">{stock.sector}</td>
                      <td className="px-4 py-2">
                        <button
                          onClick={() => removeFromComparison(stock.symbol)}
                          className="text-red-500 hover:text-red-600"
                          aria-label={`Remove ${stock.symbol} from comparison`}
                        >
                          <FaTimes className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default CompareModal; 