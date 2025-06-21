import React, { useState, useEffect, useRef } from 'react';

const TaxCalculatorModal = ({ show, onClose }) => {
  const [type, setType] = useState('Digital Gold');
  const [buyPrice, setBuyPrice] = useState('');
  const [sellPrice, setSellPrice] = useState('');
  const [qty, setQty] = useState('');
  const [years, setYears] = useState('');
  const [result, setResult] = useState(null);
  const modalRef = useRef();

  useEffect(() => {
    if (!show) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [show, onClose]);

  const calculateTax = () => {
    const bp = parseFloat(buyPrice);
    const sp = parseFloat(sellPrice);
    const q = parseFloat(qty);
    const y = parseFloat(years);
    if (isNaN(bp) || isNaN(sp) || isNaN(q) || isNaN(y) || q <= 0) return setResult('Please fill all fields correctly.');
    const gain = (sp - bp) * q;
    let tax = 0;
    let summary = '';
    if (type === 'Digital Gold' || type === 'ETF') {
      if (y > 3) {
        tax = gain * 0.2;
        summary = `20% Long Term Capital Gains Tax (LTCG) on ₹${gain.toFixed(2)}`;
      } else {
        tax = gain * 0.3;
        summary = `30% Short Term Capital Gains Tax (STCG) on ₹${gain.toFixed(2)}`;
      }
    } else if (type === 'SGB') {
      if (y >= 8) {
        tax = 0;
        summary = 'No tax on redemption at maturity (8 years)';
      } else {
        tax = gain * 0.2;
        summary = `20% Capital Gains Tax (if sold before maturity) on ₹${gain.toFixed(2)}`;
      }
    }
    setResult(`Estimated Tax: ₹${tax.toFixed(2)}. ${summary}`);
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" aria-modal="true" role="dialog" aria-label="Tax Calculator Modal" ref={modalRef}>
      <div className="bg-white rounded-2xl p-6 w-full max-w-md">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-yellow-800">Gold Investment Tax Calculator</h2>
          <button
            aria-label="Close tax calculator modal"
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-500"
          >
            ×
          </button>
        </div>
        <form
          onSubmit={e => { e.preventDefault(); calculateTax(); }}
          className="space-y-4"
        >
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Investment Type</label>
            <select
              value={type}
              onChange={e => setType(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
              aria-label="Investment type"
            >
              <option>Digital Gold</option>
              <option>SGB</option>
              <option>ETF</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Buy Price (₹/unit)</label>
            <input
              type="number"
              min="0"
              value={buyPrice}
              onChange={e => setBuyPrice(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
              aria-label="Buy price"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Sell Price (₹/unit)</label>
            <input
              type="number"
              min="0"
              value={sellPrice}
              onChange={e => setSellPrice(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
              aria-label="Sell price"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Quantity</label>
            <input
              type="number"
              min="0"
              value={qty}
              onChange={e => setQty(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
              aria-label="Quantity"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Holding Period (years)</label>
            <input
              type="number"
              min="0"
              value={years}
              onChange={e => setYears(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
              aria-label="Holding period"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 rounded-lg font-medium text-white bg-yellow-600 hover:bg-yellow-700 disabled:opacity-60 mt-2"
            aria-label="Calculate tax"
          >
            Calculate Tax
          </button>
        </form>
        {result && (
          <div className="mt-4 p-3 rounded-lg bg-yellow-50 text-yellow-900 text-sm">{result}</div>
        )}
      </div>
    </div>
  );
};
export default TaxCalculatorModal; 