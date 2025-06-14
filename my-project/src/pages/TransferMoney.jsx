import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { 
  FaExchangeAlt, FaHistory, FaDownload, 
  FaFileInvoiceDollar, FaChartLine, FaCreditCard, FaArrowUp, 
  FaArrowDown, FaCalendarAlt, FaClock, FaUserCircle, FaBuilding,
  FaCheckCircle, FaTimesCircle, FaSpinner, FaPercent, FaLock,
  FaCalendarDay, FaMoneyBillWave, FaUser, FaWallet, FaPiggyBank,
  FaUniversity, FaInfoCircle
} from 'react-icons/fa';

const TransferMoney = () => {
  const { user } = useAuth();
  const [transferType, setTransferType] = useState('own');
  const [fromAccount, setFromAccount] = useState('');
  const [toAccount, setToAccount] = useState('');
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  // Account Options
  const accounts = [
    { id: 'checking', name: 'Checking Account', number: '9876543210', balance: 25000.00, icon: <FaWallet /> },
    { id: 'savings', name: 'Savings Account', number: '9876543211', balance: 75000.00, icon: <FaPiggyBank /> },
    { id: 'fd', name: 'Fixed Deposit', number: 'FD123456789', balance: 100000.00, icon: <FaUniversity /> }
  ];

  // Recent Transfers
  const recentTransfers = [
    {
      id: 1,
      type: 'debit',
      amount: 5000.00,
      description: 'Transfer to Savings',
      date: '2024-03-15',
      time: '09:30 AM',
      status: 'completed',
      fromAccount: 'Checking Account',
      toAccount: 'Savings Account'
    },
    {
      id: 2,
      type: 'debit',
      amount: 2000.00,
      description: 'Bill Payment',
      date: '2024-03-14',
      time: '02:15 PM',
      status: 'completed',
      fromAccount: 'Checking Account',
      toAccount: 'Electricity Board'
    },
    {
      id: 3,
      type: 'debit',
      amount: 1000.00,
      description: 'Mobile Recharge',
      date: '2024-03-13',
      time: '11:45 AM',
      status: 'pending',
      fromAccount: 'Savings Account',
      toAccount: 'Mobile Operator'
    }
  ];

  const handleTransfer = (e) => {
    e.preventDefault();
    setIsProcessing(true);
    // Simulate API call
    setTimeout(() => {
      setIsProcessing(false);
      // Reset form
      setFromAccount('');
      setToAccount('');
      setAmount('');
      setDescription('');
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-50">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-24">
        {/* Page Header */}
        <div className="mb-8">
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-8">
              <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6">
                <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border-4 border-white/30">
                  <FaExchangeAlt className="w-8 h-8 text-white" />
                </div>
                <div className="text-center md:text-left">
                  <h1 className="text-2xl font-bold text-white">Transfer Money</h1>
                  <p className="text-blue-100 mt-1">Send money securely to any account</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Transfer Form */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-all duration-300">
              <div className="px-6 py-4 border-b border-gray-100">
                <h2 className="text-xl font-semibold text-gray-900">New Transfer</h2>
              </div>
              <div className="p-6">
                <form onSubmit={handleTransfer} className="space-y-6">
                  {/* Transfer Type Selection */}
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      type="button"
                      onClick={() => setTransferType('own')}
                      className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                        transferType === 'own'
                          ? 'border-blue-600 bg-blue-50 text-blue-600'
                          : 'border-gray-200 hover:border-blue-200'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <FaUser className="w-5 h-5" />
                        <div className="text-left">
                          <p className="font-medium">Own Account</p>
                          <p className="text-sm text-gray-500">Transfer between your accounts</p>
                        </div>
                      </div>
                    </button>
                    <button
                      type="button"
                      onClick={() => setTransferType('other')}
                      className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                        transferType === 'other'
                          ? 'border-blue-600 bg-blue-50 text-blue-600'
                          : 'border-gray-200 hover:border-blue-200'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <FaUserCircle className="w-5 h-5" />
                        <div className="text-left">
                          <p className="font-medium">Other Account</p>
                          <p className="text-sm text-gray-500">Transfer to another person</p>
                        </div>
                      </div>
                    </button>
                  </div>

                  {/* From Account */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      From Account
                    </label>
                    <select
                      value={fromAccount}
                      onChange={(e) => setFromAccount(e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    >
                      <option value="">Select Account</option>
                      {accounts.map((account) => (
                        <option key={account.id} value={account.id}>
                          {account.name} - {account.number} (₹{account.balance.toLocaleString()})
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* To Account */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      To Account
                    </label>
                    {transferType === 'own' ? (
                      <select
                        value={toAccount}
                        onChange={(e) => setToAccount(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        required
                      >
                        <option value="">Select Account</option>
                        {accounts.map((account) => (
                          <option key={account.id} value={account.id}>
                            {account.name} - {account.number}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <input
                        type="text"
                        value={toAccount}
                        onChange={(e) => setToAccount(e.target.value)}
                        placeholder="Enter account number"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        required
                      />
                    )}
                  </div>

                  {/* Amount */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Amount
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">₹</span>
                      <input
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        placeholder="0.00"
                        className="w-full p-3 pl-8 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        required
                        min="1"
                        step="0.01"
                      />
                    </div>
                  </div>

                  {/* Description */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Description
                    </label>
                    <input
                      type="text"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Enter transfer description"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isProcessing}
                    className={`w-full py-3 px-4 rounded-lg text-white font-medium transition-all duration-200 ${
                      isProcessing
                        ? 'bg-blue-400 cursor-not-allowed'
                        : 'bg-blue-600 hover:bg-blue-700'
                    }`}
                  >
                    {isProcessing ? (
                      <div className="flex items-center justify-center space-x-2">
                        <FaSpinner className="w-5 h-5 animate-spin" />
                        <span>Processing...</span>
                      </div>
                    ) : (
                      'Transfer Money'
                    )}
                  </button>
                </form>
              </div>
            </div>

            {/* Recent Transfers */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-all duration-300">
              <div className="px-6 py-4 border-b border-gray-100">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-gray-900">Recent Transfers</h2>
                  <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                    View All
                  </button>
                </div>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {recentTransfers.map((transfer) => (
                    <div key={transfer.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:shadow-sm transition-all duration-300">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center text-red-600">
                          <FaArrowUp className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{transfer.description}</p>
                          <div className="flex items-center space-x-2 mt-1">
                            <span className="text-sm text-gray-500">{transfer.fromAccount}</span>
                            <span className="text-sm text-gray-500">→</span>
                            <span className="text-sm text-gray-500">{transfer.toAccount}</span>
                            <span className="text-sm text-gray-500">•</span>
                            <span className="text-sm text-gray-500">{transfer.date}</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-red-600">
                          -₹{transfer.amount.toLocaleString()}
                        </p>
                        <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium mt-1 ${
                          transfer.status === 'completed' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {transfer.status === 'completed' ? (
                            <FaCheckCircle className="w-3 h-3 mr-1" />
                          ) : (
                            <FaSpinner className="w-3 h-3 mr-1 animate-spin" />
                          )}
                          {transfer.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Transfer Limits */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-all duration-300">
              <div className="px-6 py-4 border-b border-gray-100">
                <h2 className="text-xl font-semibold text-gray-900">Transfer Limits</h2>
              </div>
              <div className="p-6 space-y-4">
                <div className="p-4 bg-gray-50 rounded-lg hover:shadow-sm transition-all duration-300">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                      <FaInfoCircle className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Daily Limit</p>
                      <p className="text-lg font-semibold text-gray-900">₹100,000</p>
                    </div>
                  </div>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg hover:shadow-sm transition-all duration-300">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                      <FaInfoCircle className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Monthly Limit</p>
                      <p className="text-lg font-semibold text-gray-900">₹500,000</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Transfer Tips */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-all duration-300">
              <div className="px-6 py-4 border-b border-gray-100">
                <h2 className="text-xl font-semibold text-gray-900">Transfer Tips</h2>
              </div>
              <div className="p-6">
                <ul className="space-y-4">
                  <li className="flex items-start space-x-3">
                    <FaCheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                    <p className="text-sm text-gray-600">Double-check account numbers before confirming</p>
                  </li>
                  <li className="flex items-start space-x-3">
                    <FaCheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                    <p className="text-sm text-gray-600">Keep your transfer receipts for future reference</p>
                  </li>
                  <li className="flex items-start space-x-3">
                    <FaCheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                    <p className="text-sm text-gray-600">Transfers are processed instantly during banking hours</p>
                  </li>
                  <li className="flex items-start space-x-3">
                    <FaCheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                    <p className="text-sm text-gray-600">Contact support if you notice any discrepancies</p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default TransferMoney; 