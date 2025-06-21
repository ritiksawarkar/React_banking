import React, { useEffect, useRef } from 'react';
import { FaMinus } from 'react-icons/fa';

const SGBDetailModal = ({ show, onClose, sgbDetail }) => {
  const modalRef = useRef();
  useEffect(() => {
    if (!show) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [show, onClose]);
  if (!show || !sgbDetail) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" aria-modal="true" role="dialog" aria-label="SGB Detail Modal" ref={modalRef}>
      <div className="bg-white rounded-2xl p-6 w-full max-w-md">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-purple-800">{sgbDetail.name}</h2>
          <button
            aria-label="Close SGB detail modal"
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <FaMinus className="w-6 h-6" />
          </button>
        </div>
        <div className="space-y-2 text-sm">
          <div><b>ISIN:</b> {sgbDetail.isin}</div>
          <div><b>Issue Price:</b> ₹{sgbDetail.issuePrice}</div>
          <div><b>Maturity:</b> {sgbDetail.maturity}</div>
          <div><b>Interest:</b> {sgbDetail.interest}% p.a. (paid semi-annually)</div>
          <div><b>Taxation:</b> No capital gains tax on redemption, interest taxable.</div>
          <div><b>Status:</b> {sgbDetail.available ? 'Open for subscription' : 'Closed'}</div>
        </div>
      </div>
    </div>
  );
};
export default SGBDetailModal; 