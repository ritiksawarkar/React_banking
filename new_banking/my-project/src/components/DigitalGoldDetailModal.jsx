import React, { useEffect, useRef } from 'react';
import { FaMinus } from 'react-icons/fa';

const DigitalGoldDetailModal = ({ show, onClose }) => {
  const modalRef = useRef();
  useEffect(() => {
    if (!show) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [show, onClose]);
  if (!show) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" aria-modal="true" role="dialog" aria-label="Digital Gold Detail Modal" ref={modalRef}>
      <div className="bg-white rounded-2xl p-6 w-full max-w-md">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-yellow-800">Digital Gold</h2>
          <button
            aria-label="Close digital gold detail modal"
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-500"
          >
            <FaMinus className="w-6 h-6" />
          </button>
        </div>
        <div className="space-y-2 text-sm">
          <div><b>Provider:</b> SafeGold, MMTC-PAMP, Augmont</div>
          <div><b>Storage:</b> 100% insured, secured vaults</div>
          <div><b>Redemption:</b> Anytime, in cash or physical gold</div>
          <div><b>Taxation:</b> Capital gains tax applicable</div>
          <div><b>Minimum Buy:</b> 0.1g</div>
        </div>
      </div>
    </div>
  );
};
export default DigitalGoldDetailModal; 