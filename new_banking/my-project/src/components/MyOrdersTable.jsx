import React from 'react';
import PropTypes from 'prop-types';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

const MyOrdersTable = ({ myOrders }) => (
  <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6 mb-4">
    <h3 className="text-lg font-semibold text-gray-900 mb-4">My Orders</h3>
    <table className="min-w-full text-xs">
      <thead>
        <tr className="text-gray-500 border-b border-gray-200">
          <th className="py-2 px-2 text-left">Rate</th>
          <th className="py-2 px-2 text-right">Amount ETH</th>
          <th className="py-2 px-2 text-right">Price PLN</th>
          <th className="py-2 px-2 text-center">Type</th>
        </tr>
      </thead>
      <tbody>
        {myOrders.map((o, idx) => (
          <tr key={idx} className={`${idx % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-blue-50 border-b border-gray-100 transition`}>
            <td className="py-2 px-2 text-left"><a href="#" className="text-blue-600 font-semibold underline">{o.rate}</a></td>
            <td className="py-2 px-2 text-right">{o.amount}</td>
            <td className="py-2 px-2 text-right">{o.price}</td>
            <td className="py-2 px-2 text-center">
              <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-bold shadow-sm ${o.type === 'Limit' ? 'bg-blue-100 text-blue-700' : 'bg-gray-200 text-gray-700'}`}>{o.type === 'Limit' ? <FaCheckCircle className="text-blue-500" /> : <FaTimesCircle className="text-gray-400" />} {o.type}</span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    <div className="flex gap-4 mt-4 text-xs">
      <span className="inline-flex items-center gap-1"><FaCheckCircle className="text-blue-500" /> Limit Offer</span>
      <span className="inline-flex items-center gap-1"><FaTimesCircle className="text-gray-400" /> Stop Offer</span>
    </div>
  </div>
);

MyOrdersTable.propTypes = {
  myOrders: PropTypes.arrayOf(PropTypes.shape({
    rate: PropTypes.number.isRequired,
    amount: PropTypes.number.isRequired,
    price: PropTypes.number.isRequired,
    type: PropTypes.string.isRequired,
  })).isRequired,
};

export default MyOrdersTable; 