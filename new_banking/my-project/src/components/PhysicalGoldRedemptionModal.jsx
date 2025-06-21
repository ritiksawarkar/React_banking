import React, { useState, useEffect, useRef } from 'react';

const PhysicalGoldRedemptionModal = ({ show, onClose, onSubmit }) => {
  const [qty, setQty] = useState('');
  const [form, setForm] = useState('Coin');
  const [address, setAddress] = useState('');
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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" aria-modal="true" role="dialog" aria-label="Physical Gold Redemption Modal" ref={modalRef}>
      <div className="bg-white rounded-2xl p-6 w-full max-w-md">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-yellow-800">Redeem Digital Gold</h2>
          <button
            aria-label="Close redemption modal"
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-500"
          >
            ×
          </button>
        </div>
        <form
          onSubmit={e => {
            e.preventDefault();
            onSubmit({ qty, form, address });
          }}
          className="space-y-4"
        >
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Quantity (grams)</label>
            <input
              type="number"
              min="1"
              value={qty}
              onChange={e => setQty(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
              aria-label="Redemption quantity"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Form</label>
            <select
              value={form}
              onChange={e => setForm(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
              aria-label="Redemption form"
            >
              <option>Coin</option>
              <option>Bar</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Delivery Address</label>
            <textarea
              value={address}
              onChange={e => setAddress(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
              aria-label="Delivery address"
              required
            />
          </div>
          <div className="bg-yellow-50 rounded-lg p-3 text-sm text-yellow-800 mt-2">
            <div><b>Summary:</b></div>
            <div>Redeem <b>{qty || 0}g</b> as <b>{form}</b> to:</div>
            <div className="mt-1 text-xs text-gray-700">{address || '...'}</div>
          </div>
          <button
            type="submit"
            className="w-full py-3 rounded-lg font-medium text-white bg-yellow-600 hover:bg-yellow-700 disabled:opacity-60 mt-2"
            aria-label="Confirm redemption"
            disabled={!qty || !address}
          >
            Confirm Redemption
          </button>
        </form>
      </div>
    </div>
  );
};
export default PhysicalGoldRedemptionModal; 