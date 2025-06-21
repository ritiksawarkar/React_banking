import React from 'react';
import PropTypes from 'prop-types';

const OrderBook = ({ orderBookSell, orderBookBuy, sellTotal, buyTotal }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:divide-x md:divide-gray-100">
    {/* Sell Orders */}
    <div className="bg-white rounded-xl shadow-md border border-red-200 p-6 mb-4">
      <h4 className="font-semibold text-red-600 mb-2">Sell</h4>
      <table className="min-w-full text-xs">
        <thead>
          <tr className="text-gray-500 border-b border-gray-200">
            <th className="py-2 px-2 text-left">Pri./BTC</th>
            <th className="py-2 px-2 text-right">BTC Amount</th>
            <th className="py-2 px-2 text-right">Total (USD)</th>
          </tr>
        </thead>
        <tbody>
          {orderBookSell.map((o, idx) => (
            <tr key={idx} className={`${idx === 3 ? 'bg-red-100' : idx % 2 === 0 ? 'bg-gray-50' : 'bg-white'} border-b border-gray-100`}>
              <td className="py-2 px-2 text-left font-bold text-red-600">{o.price}</td>
              <td className="py-2 px-2 text-right text-red-500">{o.btc}</td>
              <td className="py-2 px-2 text-right font-semibold">${o.total}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="text-xs text-gray-500 mt-2">Total: {sellTotal}</div>
    </div>
    {/* Buy Orders */}
    <div className="bg-white rounded-xl shadow-md border border-green-200 p-6 mb-4">
      <h4 className="font-semibold text-green-600 mb-2">Buy</h4>
      <table className="min-w-full text-xs">
        <thead>
          <tr className="text-gray-500 border-b border-gray-200">
            <th className="py-2 px-2 text-left">Pri./BTC</th>
            <th className="py-2 px-2 text-right">BTC Amount</th>
            <th className="py-2 px-2 text-right">Total (USD)</th>
          </tr>
        </thead>
        <tbody>
          {orderBookBuy.map((o, idx) => (
            <tr key={idx} className={`${idx === 0 ? 'bg-green-100' : idx % 2 === 0 ? 'bg-gray-50' : 'bg-white'} border-b border-gray-100`}>
              <td className="py-2 px-2 text-left font-bold text-green-600">{o.price}</td>
              <td className="py-2 px-2 text-right text-green-500">{o.btc}</td>
              <td className="py-2 px-2 text-right font-semibold">${o.total}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="text-xs text-gray-500 mt-2">Total: {buyTotal}</div>
    </div>
  </div>
);

OrderBook.propTypes = {
  orderBookSell: PropTypes.arrayOf(PropTypes.shape({
    price: PropTypes.number.isRequired,
    btc: PropTypes.number.isRequired,
    total: PropTypes.number.isRequired,
  })).isRequired,
  orderBookBuy: PropTypes.arrayOf(PropTypes.shape({
    price: PropTypes.number.isRequired,
    btc: PropTypes.number.isRequired,
    total: PropTypes.number.isRequired,
  })).isRequired,
  sellTotal: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  buyTotal: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default OrderBook; 