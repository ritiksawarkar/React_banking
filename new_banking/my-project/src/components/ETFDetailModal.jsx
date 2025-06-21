import React, { useEffect, useRef } from 'react';
import { FaMinus } from 'react-icons/fa';

const ETFDetailModal = ({ show, onClose, etfDetail }) => {
  const modalRef = useRef();
  useEffect(() => {
    if (!show) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [show, onClose]);
  if (!show || !etfDetail) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" aria-modal="true" role="dialog" aria-label="ETF Detail Modal" ref={modalRef}>
      <div className="bg-white rounded-2xl p-6 w-full max-w-md">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-blue-800">{etfDetail.name} ({etfDetail.symbol})</h2>
          <button
            aria-label="Close ETF detail modal"
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <FaMinus className="w-6 h-6" />
          </button>
        </div>
        <div className="space-y-2 text-sm">
          <div><b>NAV:</b> ₹{etfDetail.price}</div>
          <div><b>Expense Ratio:</b> 0.5% (mock)</div>
          <div><b>1Y Return:</b> 12.3% (mock)</div>
          <div><b>3Y Return:</b> 28.7% (mock)</div>
          <div><b>Issuer:</b> Nippon India/HDFC (mock)</div>
          <div><b>Taxation:</b> Capital gains tax as per equity MF</div>
        </div>
      </div>
    </div>
  );
};
export default ETFDetailModal; 