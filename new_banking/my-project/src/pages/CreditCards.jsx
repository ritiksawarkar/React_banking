import React, { useState } from 'react';
import { 
  FaCreditCard, FaLock, FaEye, FaEyeSlash, FaDownload, 
  FaPrint, FaExchangeAlt, FaHistory, FaShieldAlt,
  FaTimes, FaCheckCircle, FaExclamationCircle, FaPlus,
  FaMoneyBillWave
} from 'react-icons/fa';
import DashboardPageHeader from '../components/DashboardPageHeader';
import DashboardPageFooter from '../components/DashboardPageFooter';

const CreditCards = () => {
  const [showCardNumber, setShowCardNumber] = useState(false);
  const [showCVV, setShowCVV] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [selectedCard, setSelectedCard] = useState(null);

  // Sample credit cards data
  const creditCards = [
    {
      id: 1,
      cardNumber: '4532 •••• •••• 7895',
      fullCardNumber: '4532 1234 5678 7895',
      cardHolder: 'John Doe',
      expiryDate: '12/25',
      cvv: '123',
      type: 'credit',
      status: 'active',
      creditLimit: 100000,
      availableCredit: 75000,
      currentBalance: 25000,
      dueDate: '2024-04-15',
      minimumPayment: 2500,
      recentTransactions: [
        {
          id: 1,
          date: '2024-03-15',
          description: 'Online Shopping',
          amount: -5000.00,
          type: 'credit',
          category: 'shopping',
          status: 'completed',
          location: 'Amazon'
        },
        {
          id: 2,
          date: '2024-03-14',
          description: 'Restaurant',
          amount: -2500.00,
          type: 'credit',
          category: 'dining',
          status: 'completed',
          location: 'Food Court'
        },
        {
          id: 3,
          date: '2024-03-13',
          description: 'Fuel',
          amount: -1200.00,
          type: 'credit',
          category: 'transport',
          status: 'completed',
          location: 'Shell Station'
        }
      ]
    },
    {
      id: 2,
      cardNumber: '5678 •••• •••• 1234',
      fullCardNumber: '5678 9012 3456 1234',
      cardHolder: 'John Doe',
      expiryDate: '09/24',
      cvv: '456',
      type: 'credit',
      status: 'inactive',
      creditLimit: 50000,
      availableCredit: 50000,
      currentBalance: 0,
      dueDate: '2024-04-15',
      minimumPayment: 0,
      recentTransactions: []
    }
  ];

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
          <h1 className="text-3xl font-bold text-gray-900">Credit Cards</h1>
          <p className="mt-2 text-gray-600">Manage your credit cards</p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <button className="flex items-center justify-center space-x-2 p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 border border-gray-200 hover:border-indigo-200">
            <FaPlus className="w-5 h-5 text-indigo-600" />
            <span className="text-gray-700 font-medium">Request New Card</span>
          </button>
          <button className="flex items-center justify-center space-x-2 p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 border border-gray-200 hover:border-indigo-200">
            <FaMoneyBillWave className="w-5 h-5 text-indigo-600" />
            <span className="text-gray-700 font-medium">Pay Bill</span>
          </button>
          <button className="flex items-center justify-center space-x-2 p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 border border-gray-200 hover:border-indigo-200">
            <FaExchangeAlt className="w-5 h-5 text-indigo-600" />
            <span className="text-gray-700 font-medium">Transfer Money</span>
          </button>
          <button className="flex items-center justify-center space-x-2 p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 border border-gray-200 hover:border-indigo-200">
            <FaHistory className="w-5 h-5 text-indigo-600" />
            <span className="text-gray-700 font-medium">Transaction History</span>
          </button>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {creditCards.map((card) => (
            <div
              key={card.id}
              className="bg-gradient-to-br from-purple-600 to-indigo-600 rounded-2xl p-6 text-white shadow-lg cursor-pointer hover:shadow-xl transition-all duration-200"
              onClick={() => setSelectedCard(card)}
            >
              <div className="flex justify-between items-start mb-8">
                <div>
                  <h2 className="text-xl font-semibold mb-1">FinVerse</h2>
                  <p className="text-purple-200">Credit Card</p>
                </div>
                <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                  <FaCreditCard className="w-6 h-6" />
                </div>
              </div>
              
              <div className="mb-8">
                <div className="flex items-center space-x-2 mb-2">
                  <p className="text-2xl font-mono tracking-wider">
                    {showCardNumber ? card.fullCardNumber : card.cardNumber}
                  </p>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowCardNumber(!showCardNumber);
                    }}
                    className="text-purple-200 hover:text-white"
                  >
                    {showCardNumber ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
                <p className="text-purple-200 text-sm">Card Number</p>
              </div>

              <div className="flex justify-between items-end">
                <div>
                  <p className="text-sm text-purple-200 mb-1">Card Holder</p>
                  <p className="text-lg font-medium">{card.cardHolder}</p>
                </div>
                <div>
                  <p className="text-sm text-purple-200 mb-1">Expires</p>
                  <p className="text-lg font-medium">{card.expiryDate}</p>
                </div>
                <div>
                  <p className="text-sm text-purple-200 mb-1">CVV</p>
                  <div className="flex items-center space-x-2">
                    <p className="text-lg font-medium">
                      {showCVV ? card.cvv : '***'}
                    </p>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowCVV(!showCVV);
                      }}
                      className="text-purple-200 hover:text-white"
                    >
                      {showCVV ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-purple-400">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-purple-200">Credit Limit</p>
                    <p className="text-lg font-bold">₹{card.creditLimit.toLocaleString('en-IN')}</p>
                  </div>
                  <div>
                    <p className="text-sm text-purple-200">Available Credit</p>
                    <p className="text-lg font-bold">₹{card.availableCredit.toLocaleString('en-IN')}</p>
                  </div>
                  <div>
                    <p className="text-sm text-purple-200">Current Balance</p>
                    <p className="text-lg font-bold">₹{card.currentBalance.toLocaleString('en-IN')}</p>
                  </div>
                  <div>
                    <p className="text-sm text-purple-200">Due Date</p>
                    <p className="text-lg font-bold">{card.dueDate}</p>
                  </div>
                </div>
                <div className="mt-4 flex justify-between items-center">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    card.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {card.status === 'active' ? <FaCheckCircle className="w-4 h-4 mr-1" /> : <FaExclamationCircle className="w-4 h-4 mr-1" />}
                    {card.status}
                  </span>
                  <span className="text-sm text-purple-200">
                    Min. Payment: ₹{card.minimumPayment.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Recent Transactions */}
        {selectedCard && selectedCard.recentTransactions.length > 0 && (
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
                      Location
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
                  {selectedCard.recentTransactions.map((transaction) => (
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
                        {transaction.location}
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
        )}
      </main>

      {/* Card Details Modal */}
      <Modal
        isOpen={!!selectedCard}
        onClose={() => setSelectedCard(null)}
        title="Card Details"
      >
        {selectedCard && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center text-purple-600">
                  <FaCreditCard className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-900">FinVerse Credit Card</h4>
                  <p className="text-sm text-gray-500">Card Number: {selectedCard.fullCardNumber}</p>
                </div>
              </div>
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                selectedCard.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
              }`}>
                {selectedCard.status === 'active' ? <FaCheckCircle className="w-4 h-4 mr-1" /> : <FaExclamationCircle className="w-4 h-4 mr-1" />}
                {selectedCard.status}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <p className="text-sm text-gray-500">Card Holder</p>
                <p className="text-sm font-medium text-gray-900">{selectedCard.cardHolder}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Expiry Date</p>
                <p className="text-sm font-medium text-gray-900">{selectedCard.expiryDate}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Credit Limit</p>
                <p className="text-lg font-bold text-gray-900">₹{selectedCard.creditLimit.toLocaleString('en-IN')}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Available Credit</p>
                <p className="text-lg font-bold text-gray-900">₹{selectedCard.availableCredit.toLocaleString('en-IN')}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Current Balance</p>
                <p className="text-lg font-bold text-gray-900">₹{selectedCard.currentBalance.toLocaleString('en-IN')}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Minimum Payment</p>
                <p className="text-lg font-bold text-gray-900">₹{selectedCard.minimumPayment.toLocaleString('en-IN')}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Due Date</p>
                <p className="text-sm font-medium text-gray-900">{selectedCard.dueDate}</p>
              </div>
            </div>

            <div className="flex justify-end space-x-3 pt-4 border-t border-gray-100">
              <button className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors duration-200">
                <FaDownload className="w-4 h-4" />
                <span>Download Statement</span>
              </button>
              <button
                onClick={() => setSelectedCard(null)}
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg transition-colors duration-200"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </Modal>

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
                <p className="text-sm text-gray-500">Location</p>
                <p className="text-sm font-medium text-gray-900">{selectedTransaction.location}</p>
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

export default CreditCards; 