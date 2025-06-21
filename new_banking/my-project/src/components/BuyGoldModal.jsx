import React, { useEffect, useRef } from 'react';
import { FaMinus, FaCoins, FaCheckCircle } from 'react-icons/fa';

const BuyGoldModal = ({ show, onClose, onBuy, buyStatus, buyAsset, buyQty, setBuyQty, buyPrice, displayGoldUnit, totalAmount }) => {
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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" aria-modal="true" role="dialog" aria-label="Buy Gold Modal" ref={modalRef}>
      <div className="bg-white rounded-2xl p-6 w-full max-w-md">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-yellow-800">Buy {buyAsset}</h2>
          <button
            aria-label="Close buy modal"
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-500"
          >
            <FaMinus className="w-6 h-6" />
          </button>
        </div>
        {buyStatus === 'processing' && (
          <div className="mb-4 p-4 rounded-lg bg-yellow-50 text-yellow-700 flex items-center gap-2">
            <FaCoins className="w-5 h-5 animate-spin" /> Processing your order...
          </div>
        )}
        {buyStatus === 'success' && (
          <div className="mb-4 p-4 rounded-lg bg-green-50 text-green-700 flex items-center gap-2">
            <FaCheckCircle className="w-5 h-5" /> Order placed successfully!
          </div>
        )}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Quantity</label>
            <input
              type="number"
              min="1"
              value={buyQty}
              onChange={e => setBuyQty(Number(e.target.value))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
              aria-label="Buy quantity"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Price per Unit</label>
            <div className="text-lg font-bold text-yellow-800">{displayGoldUnit}{buyPrice}</div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Total Amount</label>
            <div className="text-lg font-bold text-yellow-800">{displayGoldUnit}{totalAmount.toLocaleString()}</div>
          </div>
          <button
            onClick={onBuy}
            disabled={buyStatus === 'processing' || buyStatus === 'success'}
            className="w-full py-3 rounded-lg font-medium text-white bg-yellow-600 hover:bg-yellow-700 disabled:opacity-60"
            aria-label="Confirm buy"
          >
            Confirm Buy
          </button>
        </div>
      </div>
    </div>
  );
};
export default BuyGoldModal; 