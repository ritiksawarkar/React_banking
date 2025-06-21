import React from 'react';
import PropTypes from 'prop-types';

const LatestTransactionsTable = ({ transactions, statusColors }) => (
  <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6 mb-4">
    <h3 className="text-lg font-semibold text-gray-900 mb-4">Latest Transactions</h3>
    <table className="min-w-full text-xs">
      <thead>
        <tr className="text-gray-500 border-b border-gray-200">
          <th className="py-2 px-2 text-left">#</th>
          <th className="py-2 px-2 text-right">BTC</th>
          <th className="py-2 px-2 text-right">Time</th>
          <th className="py-2 px-2 text-center">Status</th>
        </tr>
      </thead>
      <tbody>
        {transactions.map((t, idx) => (
          <tr key={t.id} className={`${idx % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-blue-50 border-b border-gray-100 transition`}>
            <td className="py-2 px-2 text-left font-mono text-sm">{t.id}</td>
            <td className="py-2 px-2 text-right">{t.btc} BTC</td>
            <td className="py-2 px-2 text-right">{t.time}</td>
            <td className="py-2 px-2 text-center">
              <span className={`px-3 py-1 rounded-full text-xs font-bold shadow-sm ${statusColors[t.status]}`}>{t.status}</span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

LatestTransactionsTable.propTypes = {
  transactions: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    btc: PropTypes.number.isRequired,
    time: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
  })).isRequired,
  statusColors: PropTypes.object.isRequired,
};

export default LatestTransactionsTable; 