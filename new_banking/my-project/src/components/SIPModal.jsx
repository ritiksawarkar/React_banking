import React, { useState, useEffect, useRef } from 'react';

const SIPModal = ({ show, onClose, onSubmit }) => {
  const [asset, setAsset] = useState('Digital Gold');
  const [amount, setAmount] = useState('');
  const [frequency, setFrequency] = useState('Monthly');
  const [startDate, setStartDate] = useState('');
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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" aria-modal="true" role="dialog" aria-label="SIP Modal" ref={modalRef}>
      <div className="bg-white rounded-2xl p-6 w-full max-w-md">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-yellow-800">Set Up Recurring Investment (SIP)</h2>
          <button
            aria-label="Close SIP modal"
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-500"
          >
            ×
          </button>
        </div>
        <form
          onSubmit={e => {
            e.preventDefault();
            onSubmit({ asset, amount, frequency, startDate });
          }}
          className="space-y-4"
        >
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Asset</label>
            <select
              value={asset}
              onChange={e => setAsset(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
              aria-label="SIP asset type"
            >
              <option>Digital Gold</option>
              <option>SGB</option>
              <option>ETF</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Amount (₹)</label>
            <input
              type="number"
              min="1"
              value={amount}
              onChange={e => setAmount(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
              aria-label="SIP amount"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Frequency</label>
            <select
              value={frequency}
              onChange={e => setFrequency(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
              aria-label="SIP frequency"
            >
              <option>Daily</option>
              <option>Weekly</option>
              <option>Monthly</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
            <input
              type="date"
              value={startDate}
              onChange={e => setStartDate(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
              aria-label="SIP start date"
              required
            />
          </div>
          <div className="bg-yellow-50 rounded-lg p-3 text-sm text-yellow-800 mt-2">
            <div><b>Summary:</b></div>
            <div>Invest <b>₹{amount || 0}</b> in <b>{asset}</b> every <b>{frequency.toLowerCase()}</b> starting from <b>{startDate || '...'}</b>.</div>
          </div>
          <button
            type="submit"
            className="w-full py-3 rounded-lg font-medium text-white bg-yellow-600 hover:bg-yellow-700 disabled:opacity-60 mt-2"
            aria-label="Confirm SIP"
            disabled={!amount || !startDate}
          >
            Confirm SIP
          </button>
        </form>
      </div>
    </div>
  );
};
export default SIPModal; 