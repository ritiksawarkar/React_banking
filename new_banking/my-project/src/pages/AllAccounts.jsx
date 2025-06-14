import React, { useState } from 'react';
import { 
  FaWallet, FaPiggyBank, FaUniversity, FaChartLine, FaExchangeAlt, 
  FaCreditCard, FaDownload, FaPrint, FaShareAlt, FaLock, FaHistory,
  FaFileInvoiceDollar, FaCalendarAlt, FaBell, FaInfoCircle, FaArrowDown, FaArrowUp
} from 'react-icons/fa';
import DashboardPageHeader from '../components/DashboardPageHeader';
import DashboardPageFooter from '../components/DashboardPageFooter';

const AllAccounts = () => {
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [showTransactionHistory, setShowTransactionHistory] = useState(false);
  const [showAccountDetails, setShowAccountDetails] = useState(false);
  const [showStatementModal, setShowStatementModal] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState(new Date().toISOString().slice(0, 7));

  // Sample account data with enhanced information
  const accounts = [
    {
      id: 1,
      type: 'Savings Account',
      accountNumber: 'SA1234567890',
      balance: 25000.00,
      currency: 'INR',
      status: 'Active',
      lastTransaction: '2024-03-15',
      icon: <FaWallet className="w-6 h-6" />,
      color: 'from-blue-500 to-blue-600',
      details: {
        ifscCode: 'FINV0001234',
        branch: 'Pune Main Branch',
        openingDate: '2023-01-15',
        interestRate: '3.5%',
        minimumBalance: 5000,
        availableBalance: 24800.00,
        holdAmount: 200.00,
        monthlyInterest: 72.92,
        lastInterestPaid: '2024-03-01'
      },
      transactions: [
        {
          id: 1,
          date: '2024-03-15',
          description: 'Salary Credit',
          amount: 45000.00,
          type: 'credit',
          status: 'completed',
          reference: 'SAL123456'
        },
        {
          id: 2,
          date: '2024-03-14',
          description: 'Electricity Bill Payment',
          amount: -2500.00,
          type: 'debit',
          status: 'completed',
          reference: 'BILL789012'
        }
      ]
    },
    {
      id: 2,
      type: 'Fixed Deposit',
      accountNumber: 'FD9876543210',
      balance: 100000.00,
      currency: 'INR',
      status: 'Active',
      maturityDate: '2024-12-31',
      interestRate: '7.5%',
      icon: <FaUniversity className="w-6 h-6" />,
      color: 'from-green-500 to-green-600',
      details: {
        ifscCode: 'FINV0001234',
        branch: 'Pune Main Branch',
        openingDate: '2024-01-01',
        tenure: '12 months',
        maturityAmount: 107500.00,
        interestPayout: 'At Maturity',
        prematureClosure: 'Available with penalty',
        autoRenewal: 'Enabled'
      }
    },
    {
      id: 3,
      type: 'Investment Account',
      accountNumber: 'INV4567890123',
      balance: 75000.00,
      currency: 'INR',
      status: 'Active',
      lastTransaction: '2024-03-14',
      icon: <FaChartLine className="w-6 h-6" />,
      color: 'from-purple-500 to-purple-600',
      details: {
        ifscCode: 'FINV0001234',
        branch: 'Pune Main Branch',
        openingDate: '2023-06-15',
        portfolioValue: 75250.00,
        totalReturns: 250.00,
        returnPercentage: '0.33%',
        lastValuation: '2024-03-14',
        riskProfile: 'Moderate'
      },
      transactions: [
        {
          id: 1,
          date: '2024-03-14',
          description: 'Mutual Fund Purchase',
          amount: -10000.00,
          type: 'debit',
          status: 'completed',
          reference: 'MF123456'
        }
      ]
    }
  ];

  // Handle account selection
  const handleAccountSelect = (account) => {
    setSelectedAccount(account);
    setShowAccountDetails(true);
    setShowTransactionHistory(false);
  };

  // Handle transaction history view
  const handleViewTransactions = (account) => {
    setSelectedAccount(account);
    setShowTransactionHistory(true);
    setShowAccountDetails(false);
  };

  // Handle statement download
  const handleStatementDownload = (account) => {
    setSelectedAccount(account);
    setShowStatementModal(true);
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
          <h1 className="text-3xl font-bold text-gray-900">All Accounts</h1>
          <p className="mt-2 text-gray-600">View and manage all your accounts in one place</p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <button className="flex items-center justify-center space-x-2 p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 border border-gray-200 hover:border-indigo-200">
            <FaExchangeAlt className="w-5 h-5 text-indigo-600" />
            <span className="text-gray-700 font-medium">Transfer Money</span>
          </button>
          <button className="flex items-center justify-center space-x-2 p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 border border-gray-200 hover:border-indigo-200">
            <FaCreditCard className="w-5 h-5 text-indigo-600" />
            <span className="text-gray-700 font-medium">Add New Account</span>
          </button>
          <button className="flex items-center justify-center space-x-2 p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 border border-gray-200 hover:border-indigo-200">
            <FaPiggyBank className="w-5 h-5 text-indigo-600" />
            <span className="text-gray-700 font-medium">Open Fixed Deposit</span>
          </button>
        </div>

        {/* Accounts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {accounts.map((account) => (
            <div
              key={account.id}
              className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200 hover:border-indigo-200 transition-all duration-200 hover:shadow-md"
            >
              {/* Account Header */}
              <div className={`bg-gradient-to-r ${account.color} px-6 py-4`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white">
                      {account.icon}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white">{account.type}</h3>
                      <p className="text-white/80 text-sm">{account.accountNumber}</p>
                    </div>
                  </div>
                  <span className="px-3 py-1 rounded-full text-sm font-medium bg-white/20 text-white backdrop-blur-sm">
                    {account.status}
                  </span>
                </div>
              </div>

              {/* Account Details */}
              <div className="p-6">
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-500">Available Balance</p>
                    <p className="text-2xl font-bold text-gray-900">
                      ₹{account.balance.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                    </p>
                  </div>

                  {account.type === 'Fixed Deposit' ? (
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-500">Maturity Date</p>
                        <p className="text-sm font-medium text-gray-900">{account.maturityDate}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Interest Rate</p>
                        <p className="text-sm font-medium text-gray-900">{account.interestRate}</p>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <p className="text-sm text-gray-500">Last Transaction</p>
                      <p className="text-sm font-medium text-gray-900">{account.lastTransaction}</p>
                    </div>
                  )}

                  <div className="pt-4 border-t border-gray-100">
                    <div className="flex space-x-3">
                      <button 
                        onClick={() => handleAccountSelect(account)}
                        className="flex-1 px-4 py-2 text-sm font-medium text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors duration-200"
                      >
                        View Details
                      </button>
                      <button 
                        onClick={() => handleViewTransactions(account)}
                        className="flex-1 px-4 py-2 text-sm font-medium text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors duration-200"
                      >
                        Transactions
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Account Summary */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 hover:border-indigo-200 transition-all duration-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Total Balance</h3>
            <p className="text-3xl font-bold text-gray-900">
              ₹{accounts.reduce((sum, acc) => sum + acc.balance, 0).toLocaleString('en-IN', { minimumFractionDigits: 2 })}
            </p>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 hover:border-indigo-200 transition-all duration-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Active Accounts</h3>
            <p className="text-3xl font-bold text-gray-900">{accounts.length}</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 hover:border-indigo-200 transition-all duration-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Transactions</h3>
            <p className="text-3xl font-bold text-gray-900">12</p>
          </div>
        </div>
      </main>

      {/* Account Details Modal */}
      <Modal
        isOpen={showAccountDetails}
        onClose={() => setShowAccountDetails(false)}
        title="Account Details"
      >
        {selectedAccount && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <p className="text-sm text-gray-500">Account Number</p>
                <p className="text-sm font-medium text-gray-900">{selectedAccount.accountNumber}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">IFSC Code</p>
                <p className="text-sm font-medium text-gray-900">{selectedAccount.details.ifscCode}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Branch</p>
                <p className="text-sm font-medium text-gray-900">{selectedAccount.details.branch}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Opening Date</p>
                <p className="text-sm font-medium text-gray-900">{selectedAccount.details.openingDate}</p>
              </div>
              {selectedAccount.type === 'Savings Account' && (
                <>
                  <div>
                    <p className="text-sm text-gray-500">Interest Rate</p>
                    <p className="text-sm font-medium text-gray-900">{selectedAccount.details.interestRate}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Minimum Balance</p>
                    <p className="text-sm font-medium text-gray-900">₹{selectedAccount.details.minimumBalance}</p>
                  </div>
                </>
              )}
              {selectedAccount.type === 'Fixed Deposit' && (
                <>
                  <div>
                    <p className="text-sm text-gray-500">Tenure</p>
                    <p className="text-sm font-medium text-gray-900">{selectedAccount.details.tenure}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Maturity Amount</p>
                    <p className="text-sm font-medium text-gray-900">₹{selectedAccount.details.maturityAmount}</p>
                  </div>
                </>
              )}
            </div>

            <div className="flex justify-end space-x-3 pt-4 border-t border-gray-100">
              <button
                onClick={() => handleStatementDownload(selectedAccount)}
                className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors duration-200"
              >
                <FaDownload className="w-4 h-4" />
                <span>Download Statement</span>
              </button>
              <button
                onClick={() => setShowAccountDetails(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg transition-colors duration-200"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </Modal>

      {/* Transaction History Modal */}
      <Modal
        isOpen={showTransactionHistory}
        onClose={() => setShowTransactionHistory(false)}
        title="Transaction History"
      >
        {selectedAccount && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Account Number</p>
                <p className="text-sm font-medium text-gray-900">{selectedAccount.accountNumber}</p>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handleStatementDownload(selectedAccount)}
                  className="flex items-center space-x-2 px-3 py-1.5 text-sm font-medium text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors duration-200"
                >
                  <FaDownload className="w-4 h-4" />
                  <span>Download</span>
                </button>
                <button
                  className="flex items-center space-x-2 px-3 py-1.5 text-sm font-medium text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors duration-200"
                >
                  <FaPrint className="w-4 h-4" />
                  <span>Print</span>
                </button>
              </div>
            </div>

            <div className="space-y-4">
              {selectedAccount.transactions?.map((transaction) => (
                <div
                  key={transaction.id}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                >
                  <div className="flex items-center space-x-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      transaction.type === 'credit' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                    }`}>
                      {transaction.type === 'credit' ? <FaArrowDown className="w-5 h-5" /> : <FaArrowUp className="w-5 h-5" />}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{transaction.description}</p>
                      <p className="text-xs text-gray-500">{transaction.date}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`text-sm font-medium ${
                      transaction.type === 'credit' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {transaction.type === 'credit' ? '+' : '-'}₹{Math.abs(transaction.amount).toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                    </p>
                    <p className="text-xs text-gray-500">Ref: {transaction.reference}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-end pt-4 border-t border-gray-100">
              <button
                onClick={() => setShowTransactionHistory(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg transition-colors duration-200"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </Modal>

      {/* Statement Download Modal */}
      <Modal
        isOpen={showStatementModal}
        onClose={() => setShowStatementModal(false)}
        title="Download Statement"
      >
        {selectedAccount && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Month
                </label>
                <input
                  type="month"
                  value={selectedMonth}
                  onChange={(e) => setSelectedMonth(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Format
                </label>
                <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500">
                  <option value="pdf">PDF</option>
                  <option value="excel">Excel</option>
                  <option value="csv">CSV</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end space-x-3 pt-4 border-t border-gray-100">
              <button
                onClick={() => setShowStatementModal(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors duration-200"
              >
                Download
              </button>
            </div>
          </div>
        )}
      </Modal>

      <DashboardPageFooter />
    </div>
  );
};

export default AllAccounts; 