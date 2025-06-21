import React from 'react';
import PropTypes from 'prop-types';

const QuickBuySellPanel = ({
  orderTab,
  setOrderTab,
  buyAmount,
  setBuyAmount,
  buyValue,
  setBuyValue,
  sellAmount,
  setSellAmount,
  sellValue,
  setSellValue,
  onBuy,
  onSell,
  selectedSymbol
}) => (
  <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6 mb-4">
    <div className="flex gap-4 mb-4 border-b border-gray-100 pb-2">
      {['Market Order', 'Limit Order', 'Stop Market'].map(tab => (
        <button
          key={tab}
          onClick={() => setOrderTab(tab)}
          className={`px-4 py-2 rounded-full font-bold text-sm focus:outline-none transition ${orderTab === tab ? 'bg-blue-600 text-white shadow' : 'bg-gray-100 text-gray-700'}`}
        >
          {tab}
        </button>
      ))}
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:divide-x md:divide-gray-100">
      {/* Quick Buy */}
      <div className="flex flex-col gap-2 pr-0 md:pr-6 bg-green-50 rounded-lg p-6">
        <h4 className="font-semibold text-gray-900 mb-2">Quick Buy <span className="text-xs text-blue-600">({selectedSymbol})</span></h4>
        <label className="text-xs text-gray-500">I want to buy</label>
        <input
          type="number"
          value={buyAmount}
          onChange={e => setBuyAmount(e.target.value)}
          className="w-full px-3 py-2 border border-gray-200 rounded shadow-sm text-sm mb-2 focus:ring-2 focus:ring-blue-200"
        />
        <label className="text-xs text-gray-500">I will pay <span className="text-gray-400">(USDT)</span></label>
        <input
          type="number"
          value={buyValue}
          onChange={e => setBuyValue(e.target.value)}
          className="w-full px-3 py-2 border border-gray-200 rounded shadow-sm text-sm mb-2 focus:ring-2 focus:ring-blue-200"
        />
        <button className="mt-2 w-full px-4 py-3 bg-green-600 text-white rounded font-bold text-lg hover:bg-green-700 transition" onClick={onBuy}>Buy</button>
      </div>
      {/* Quick Sell */}
      <div className="flex flex-col gap-2 pl-0 md:pl-6 bg-red-50 rounded-lg p-6">
        <h4 className="font-semibold text-gray-900 mb-2">Quick Sell <span className="text-xs text-blue-600">({selectedSymbol})</span></h4>
        <label className="text-xs text-gray-500">I want to sell</label>
        <input
          type="number"
          value={sellAmount}
          onChange={e => setSellAmount(e.target.value)}
          className="w-full px-3 py-2 border border-gray-200 rounded shadow-sm text-sm mb-2 focus:ring-2 focus:ring-blue-200"
        />
        <label className="text-xs text-gray-500">I want receive <span className="text-gray-400">(USDT)</span></label>
        <input
          type="number"
          value={sellValue}
          onChange={e => setSellValue(e.target.value)}
          className="w-full px-3 py-2 border border-gray-200 rounded shadow-sm text-sm mb-2 focus:ring-2 focus:ring-blue-200"
        />
        <button className="mt-2 w-full px-4 py-3 bg-red-600 text-white rounded font-bold text-lg hover:bg-red-700 transition" onClick={onSell}>Sell</button>
      </div>
    </div>
  </div>
);

QuickBuySellPanel.propTypes = {
  orderTab: PropTypes.string.isRequired,
  setOrderTab: PropTypes.func.isRequired,
  buyAmount: PropTypes.string.isRequired,
  setBuyAmount: PropTypes.func.isRequired,
  buyValue: PropTypes.string.isRequired,
  setBuyValue: PropTypes.func.isRequired,
  sellAmount: PropTypes.string.isRequired,
  setSellAmount: PropTypes.func.isRequired,
  sellValue: PropTypes.string.isRequired,
  setSellValue: PropTypes.func.isRequired,
  onBuy: PropTypes.func,
  onSell: PropTypes.func,
  selectedSymbol: PropTypes.string.isRequired,
};

export default QuickBuySellPanel; 