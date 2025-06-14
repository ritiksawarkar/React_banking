import React, { useState } from 'react';
import { 
  FaCreditCard, FaLock, FaEye, FaEyeSlash, FaDownload, 
  FaPrint, FaExchangeAlt, FaHistory, FaShieldAlt,
  FaTimes, FaCheckCircle, FaExclamationCircle
} from 'react-icons/fa';
import DashboardPageHeader from '../components/DashboardPageHeader';
import DashboardPageFooter from '../components/DashboardPageFooter';

const YourCard = () => {
  const [showCardNumber, setShowCardNumber] = useState(false);
  const [showCVV, setShowCVV] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);

  // Sample card data
  const cardData = {
    cardNumber: '4532 •••• •••• 7895',
    fullCardNumber: '4532 1234 5678 7895',
    cardHolder: 'John Doe',
    expiryDate: '12/25',
    cvv: '123',
    type: 'credit',
    status: 'active',
    limit: 50000,
    availableCredit: 35000,
    currentBalance: 15000,
    dueDate: '2024-03-25',
    recentTransactions: [
      {
        id: 1,
        date: '2024-03-15',
        description: 'Grocery Shopping',
        amount: -2500.00,
        type: 'debit',
        category: 'shopping',
        status: 'completed',
        merchant: 'SuperMart'
      },
      {
        id: 2,
        date: '2024-03-14',
        description: 'Online Purchase',
        amount: -1500.00,
        type: 'debit',
        category: 'shopping',
        status: 'completed',
        merchant: 'Amazon'
      },
      {
        id: 3,
        date: '2024-03-13',
        description: 'Restaurant',
        amount: -1200.00,
        type: 'debit',
        category: 'dining',
        status: 'completed',
        merchant: 'Food Court'
      }
    ]
  };

  // Modal Component
  const Modal = ({ isOpen, onClose, title, children }) => {
    if (!isOpen) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500 focus:outline-none"
            >
              <FaTimes className="w-5 h-5" />
            </button>
          </div>
          <div className="p-6">{children}</div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-50">
      <DashboardPageHeader />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-24">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Your Card</h1>
          <p className="mt-2 text-gray-600">Manage your primary credit card</p>
        </div>

        {/* Card Details */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Card Display */}
          <div className="lg:col-span-2">
            <div className="bg-gradient-to-br from-indigo-600 to-blue-600 rounded-2xl p-6 text-white shadow-lg">
              <div className="flex justify-between items-start mb-8">
                <div>
                  <h2 className="text-xl font-semibold mb-1">FinVerse</h2>
                  <p className="text-indigo-200">Credit Card</p>
                </div>
                <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                  <FaCreditCard className="w-6 h-6" />
                </div>
              </div>
              
              <div className="mb-8">
                <div className="flex items-center space-x-2 mb-2">
                  <p className="text-2xl font-mono tracking-wider">
                    {showCardNumber ? cardData.fullCardNumber : cardData.cardNumber}
                  </p>
                  <button
                    onClick={() => setShowCardNumber(!showCardNumber)}
                    className="text-indigo-200 hover:text-white"
                  >
                    {showCardNumber ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
                <p className="text-indigo-200 text-sm">Card Number</p>
              </div>

              <div className="flex justify-between items-end">
                <div>
                  <p className="text-sm text-indigo-200 mb-1">Card Holder</p>
                  <p className="text-lg font-medium">{cardData.cardHolder}</p>
                </div>
                <div>
                  <p className="text-sm text-indigo-200 mb-1">Expires</p>
                  <p className="text-lg font-medium">{cardData.expiryDate}</p>
                </div>
                <div>
                  <p className="text-sm text-indigo-200 mb-1">CVV</p>
                  <div className="flex items-center space-x-2">
                    <p className="text-lg font-medium">
                      {showCVV ? cardData.cvv : '***'}
                    </p>
                    <button
                      onClick={() => setShowCVV(!showCVV)}
                      className="text-indigo-200 hover:text-white"
                    >
                      {showCVV ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Card Summary */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Card Summary</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-500">Available Credit</p>
                  <p className="text-2xl font-bold text-green-600">
                    ₹{cardData.availableCredit.toLocaleString('en-IN')}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Current Balance</p>
                  <p className="text-2xl font-bold text-gray-900">
                    ₹{cardData.currentBalance.toLocaleString('en-IN')}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Credit Limit</p>
                  <p className="text-2xl font-bold text-gray-900">
                    ₹{cardData.limit.toLocaleString('en-IN')}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Payment Due Date</p>
                  <p className="text-lg font-medium text-gray-900">{cardData.dueDate}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
              <div className="grid grid-cols-2 gap-4">
                <button className="flex items-center justify-center space-x-2 p-3 bg-indigo-50 text-indigo-600 rounded-lg hover:bg-indigo-100 transition-colors duration-200">
                  <FaExchangeAlt className="w-5 h-5" />
                  <span>Transfer</span>
                </button>
                <button className="flex items-center justify-center space-x-2 p-3 bg-indigo-50 text-indigo-600 rounded-lg hover:bg-indigo-100 transition-colors duration-200">
                  <FaHistory className="w-5 h-5" />
                  <span>History</span>
                </button>
                <button className="flex items-center justify-center space-x-2 p-3 bg-indigo-50 text-indigo-600 rounded-lg hover:bg-indigo-100 transition-colors duration-200">
                  <FaDownload className="w-5 h-5" />
                  <span>Statement</span>
                </button>
                <button className="flex items-center justify-center space-x-2 p-3 bg-indigo-50 text-indigo-600 rounded-lg hover:bg-indigo-100 transition-colors duration-200">
                  <FaLock className="w-5 h-5" />
                  <span>Security</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Recent Transactions</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Description
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Merchant
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {cardData.recentTransactions.map((transaction) => (
                  <tr
                    key={transaction.id}
                    onClick={() => setSelectedTransaction(transaction)}
                    className="hover:bg-gray-50 cursor-pointer transition-colors duration-200"
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {transaction.date}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center text-red-600">
                          <FaCreditCard className="w-4 h-4" />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{transaction.description}</div>
                          <div className="text-sm text-gray-500 capitalize">{transaction.category}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {transaction.merchant}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-right">
                      <span className="font-medium text-red-600">
                        -₹{Math.abs(transaction.amount).toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        {transaction.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* Transaction Details Modal */}
      <Modal
        isOpen={!!selectedTransaction}
        onClose={() => setSelectedTransaction(null)}
        title="Transaction Details"
      >
        {selectedTransaction && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center text-red-600">
                  <FaCreditCard className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-900">{selectedTransaction.description}</h4>
                  <p className="text-sm text-gray-500 capitalize">{selectedTransaction.category}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-red-600">
                  -₹{Math.abs(selectedTransaction.amount).toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                </p>
                <p className="text-sm text-gray-500">{selectedTransaction.date}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <p className="text-sm text-gray-500">Transaction ID</p>
                <p className="text-sm font-medium text-gray-900">{selectedTransaction.id}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Merchant</p>
                <p className="text-sm font-medium text-gray-900">{selectedTransaction.merchant}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Category</p>
                <p className="text-sm font-medium text-gray-900 capitalize">{selectedTransaction.category}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Status</p>
                <p className="text-sm font-medium text-gray-900 capitalize">{selectedTransaction.status}</p>
              </div>
            </div>

            <div className="flex justify-end space-x-3 pt-4 border-t border-gray-100">
              <button className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors duration-200">
                <FaDownload className="w-4 h-4" />
                <span>Download Receipt</span>
              </button>
              <button
                onClick={() => setSelectedTransaction(null)}
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg transition-colors duration-200"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </Modal>

      <DashboardPageFooter />
    </div>
  );
};

export default YourCard; 