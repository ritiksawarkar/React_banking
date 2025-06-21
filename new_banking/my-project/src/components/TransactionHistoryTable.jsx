import React from 'react';
import { FaHistory } from 'react-icons/fa';

const TransactionHistoryTable = ({ MOCK_TRANSACTIONS }) => (
  <div className="bg-white rounded-xl shadow p-6 border border-yellow-100 flex flex-col gap-3">
    <div className="flex items-center gap-2 mb-2">
      <FaHistory className="text-gray-500" />
      <span className="font-semibold text-gray-900">Transaction History</span>
    </div>
    <div className="overflow-x-auto">
      <table className="min-w-full text-xs">
        <thead>
          <tr className="text-gray-500">
            <th className="px-2 py-1 text-left">No.</th>
            <th className="px-2 py-1 text-left">Type</th>
            <th className="px-2 py-1 text-left">Asset</th>
            <th className="px-2 py-1 text-right">Qty</th>
            <th className="px-2 py-1 text-right">Price</th>
            <th className="px-2 py-1 text-right">Date</th>
          </tr>
        </thead>
        <tbody>
          {MOCK_TRANSACTIONS.map((tx, idx) => (
            <tr key={idx} className="border-b last:border-b-0">
              <td className="px-2 py-1">{idx + 1}</td>
              <td className="px-2 py-1">{tx.type}</td>
              <td className="px-2 py-1">{tx.asset}</td>
              <td className="px-2 py-1 text-right">{tx.qty}</td>
              <td className="px-2 py-1 text-right">₹{tx.price}</td>
              <td className="px-2 py-1 text-right">{tx.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);
export default TransactionHistoryTable; 