import React, { useState } from 'react';
import { 
  FaExchangeAlt, FaDownload, FaFilter, FaSearch, FaFileInvoiceDollar,
  FaArrowUp, FaArrowDown, FaMoneyBillWave, FaCreditCard, FaUniversity,
  FaChartLine, FaCalendarAlt, FaTimes
} from 'react-icons/fa';
import DashboardPageHeader from '../components/DashboardPageHeader';
import DashboardPageFooter from '../components/DashboardPageFooter';
import Papa from 'papaparse';
import { format } from 'date-fns';
import jsPDF from 'jspdf';

const AllTransactions = () => {
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [showFilters, setShowFilters] = useState(false);
  const [dateRange, setDateRange] = useState({
    start: '',
    end: ''
  });
  const [transactionType, setTransactionType] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const pageSize = 10;
  const [category, setCategory] = useState('');
  const [reportModalOpen, setReportModalOpen] = useState(false);
  const [reportTransaction, setReportTransaction] = useState(null);
  const [reportReason, setReportReason] = useState('');
  const [reportSubmitted, setReportSubmitted] = useState(false);

  // Sample transaction data
  const transactions = [
    {
      id: 1,
      date: '2024-03-15',
      description: 'Salary Credit',
      amount: 45000.00,
      type: 'credit',
      category: 'salary',
      status: 'completed',
      reference: 'SAL123456',
      account: 'Savings Account',
      accountNumber: 'SA1234567890'
    },
    {
      id: 2,
      date: '2024-03-14',
      description: 'Electricity Bill Payment',
      amount: -2500.00,
      type: 'debit',
      category: 'bills',
      status: 'completed',
      reference: 'BILL789012',
      account: 'Savings Account',
      accountNumber: 'SA1234567890'
    },
    {
      id: 3,
      date: '2024-03-13',
      description: 'Grocery Shopping',
      amount: -1500.00,
      type: 'debit',
      category: 'shopping',
      status: 'completed',
      reference: 'POS456789',
      account: 'Savings Account',
      accountNumber: 'SA1234567890'
    },
    {
      id: 4,
      date: '2024-03-12',
      description: 'Fixed Deposit Interest',
      amount: 2500.00,
      type: 'credit',
      category: 'interest',
      status: 'completed',
      reference: 'FDINT789',
      account: 'Fixed Deposit',
      accountNumber: 'FD9876543210'
    },
    {
      id: 5,
      date: '2024-03-11',
      description: 'Mutual Fund Investment',
      amount: -10000.00,
      type: 'debit',
      category: 'investment',
      status: 'completed',
      reference: 'MF123456',
      account: 'Investment Account',
      accountNumber: 'INV4567890123'
    },
    {
      id: 6,
      date: '2024-03-10',
      description: 'ATM Withdrawal',
      amount: -5000.00,
      type: 'debit',
      category: 'cash',
      status: 'completed',
      reference: 'ATM654321',
      account: 'Savings Account',
      accountNumber: 'SA1234567890'
    },
    {
      id: 7,
      date: '2024-03-09',
      description: 'Online Shopping - Amazon',
      amount: -3200.00,
      type: 'debit',
      category: 'shopping',
      status: 'completed',
      reference: 'AMZ987654',
      account: 'Savings Account',
      accountNumber: 'SA1234567890'
    },
    {
      id: 8,
      date: '2024-03-08',
      description: 'Interest Credit',
      amount: 180.00,
      type: 'credit',
      category: 'interest',
      status: 'completed',
      reference: 'INT123789',
      account: 'Savings Account',
      accountNumber: 'SA1234567890'
    },
    {
      id: 9,
      date: '2024-03-07',
      description: 'Mobile Recharge',
      amount: -399.00,
      type: 'debit',
      category: 'bills',
      status: 'completed',
      reference: 'MOB456123',
      account: 'Savings Account',
      accountNumber: 'SA1234567890'
    },
    {
      id: 10,
      date: '2024-03-06',
      description: 'Dining - Pizza Hut',
      amount: -850.00,
      type: 'debit',
      category: 'food',
      status: 'completed',
      reference: 'FOOD789654',
      account: 'Savings Account',
      accountNumber: 'SA1234567890'
    },
    {
      id: 11,
      date: '2024-03-05',
      description: 'Credit Card Payment',
      amount: -7000.00,
      type: 'debit',
      category: 'bills',
      status: 'completed',
      reference: 'CCPAY1234',
      account: 'Savings Account',
      accountNumber: 'SA1234567890'
    },
    {
      id: 12,
      date: '2024-03-04',
      description: 'Travel - Uber',
      amount: -250.00,
      type: 'debit',
      category: 'travel',
      status: 'completed',
      reference: 'UBER321654',
      account: 'Savings Account',
      accountNumber: 'SA1234567890'
    },
    {
      id: 13,
      date: '2024-03-03',
      description: 'Gift Received',
      amount: 2000.00,
      type: 'credit',
      category: 'gift',
      status: 'completed',
      reference: 'GIFT654321',
      account: 'Savings Account',
      accountNumber: 'SA1234567890'
    },
    {
      id: 14,
      date: '2024-03-02',
      description: 'Movie Tickets',
      amount: -600.00,
      type: 'debit',
      category: 'entertainment',
      status: 'completed',
      reference: 'MOV123456',
      account: 'Savings Account',
      accountNumber: 'SA1234567890'
    },
    {
      id: 15,
      date: '2024-03-01',
      description: 'Freelance Payment',
      amount: 12000.00,
      type: 'credit',
      category: 'salary',
      status: 'completed',
      reference: 'FREEL1234',
      account: 'Savings Account',
      accountNumber: 'SA1234567890'
    }
  ];

  // Filter transactions based on selected criteria
  const filteredTransactions = transactions.filter(transaction => {
    const matchesType = transactionType === 'all' || transaction.type === transactionType;
    const matchesSearch = transaction.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         transaction.reference.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDate = (!dateRange.start || transaction.date >= dateRange.start) &&
                       (!dateRange.end || transaction.date <= dateRange.end);
    const matchesCategory = category === '' || transaction.category === category;
    return matchesType && matchesSearch && matchesDate && matchesCategory;
  });

  // Calculate summary statistics
  const totalCredits = filteredTransactions
    .filter(t => t.type === 'credit')
    .reduce((sum, t) => sum + t.amount, 0);
  
  const totalDebits = filteredTransactions
    .filter(t => t.type === 'debit')
    .reduce((sum, t) => sum + Math.abs(t.amount), 0);

  const paginatedTransactions = filteredTransactions.slice((page-1)*pageSize, page*pageSize);

  const handleExportCSV = () => {
    const csv = Papa.unparse(filteredTransactions);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'transactions.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDownloadReceipt = () => {
    if (!selectedTransaction) return;
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text('Transaction Receipt', 14, 20);
    doc.setFontSize(12);
    doc.text(`Transaction ID: ${selectedTransaction.id}`, 14, 35);
    doc.text(`Date: ${format(new Date(selectedTransaction.date), 'dd MMM yyyy')}`, 14, 45);
    doc.text(`Description: ${selectedTransaction.description}`, 14, 55);
    doc.text(`Category: ${selectedTransaction.category}`, 14, 65);
    doc.text(`Type: ${selectedTransaction.type}`, 14, 75);
    doc.text(`Account: ${selectedTransaction.account}`, 14, 85);
    doc.text(`Account Number: ${selectedTransaction.accountNumber}`, 14, 95);
    doc.text(`Reference: ${selectedTransaction.reference}`, 14, 105);
    doc.text(`Status: ${selectedTransaction.status}`, 14, 115);
    doc.text(`Amount: ${selectedTransaction.type === 'credit' ? '+' : '-'}₹${Math.abs(selectedTransaction.amount).toLocaleString('en-IN', { minimumFractionDigits: 2 })}`, 14, 125);
    doc.save(`transaction_${selectedTransaction.id}_receipt.pdf`);
  };

  const handleOpenReport = (transaction) => {
    setReportTransaction(transaction);
    setReportModalOpen(true);
    setReportReason('');
    setReportSubmitted(false);
  };

  const handleSubmitReport = () => {
    setReportSubmitted(true);
    // Here you could send the report to an API
  };

  const handleCloseReport = () => {
    setReportModalOpen(false);
    setReportTransaction(null);
    setReportReason('');
    setReportSubmitted(false);
  };

  // Modal Component
  const Modal = ({ isOpen, onClose, title, children }) => {
    React.useEffect(() => {
      if (!isOpen) return;
      const focusableElements = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
      const modal = document.getElementById('modal-root');
      if (!modal) return;
      const firstFocusable = modal.querySelectorAll(focusableElements)[0];
      const focusables = modal.querySelectorAll(focusableElements);
      const lastFocusable = focusables[focusables.length - 1];
      const handleTab = (e) => {
        if (e.key !== 'Tab') return;
        if (e.shiftKey) {
          if (document.activeElement === firstFocusable) {
            e.preventDefault();
            lastFocusable.focus();
          }
        } else {
          if (document.activeElement === lastFocusable) {
            e.preventDefault();
            firstFocusable.focus();
          }
        }
      };
      modal.addEventListener('keydown', handleTab);
      firstFocusable && firstFocusable.focus();
      return () => modal.removeEventListener('keydown', handleTab);
    }, [isOpen]);

    if (!isOpen) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4" role="dialog" aria-modal="true">
        <div id="modal-root" className="bg-white rounded-xl shadow-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500 focus:outline-none"
              aria-label="Close modal"
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
        {/* <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">All Transactions</h1>
          <p className="mt-2 text-gray-600">View and manage all your transactions</p>
        </div> */}

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Credits</p>
                <p className="text-2xl font-bold text-green-600">
                  ₹{totalCredits.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                </p>
              </div>
              <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                <FaArrowDown className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Debits</p>
                <p className="text-2xl font-bold text-red-600">
                  ₹{totalDebits.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                </p>
              </div>
              <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
                <FaArrowUp className="w-6 h-6 text-red-600" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Net Balance</p>
                <p className="text-2xl font-bold text-gray-900">
                  ₹{(totalCredits - totalDebits).toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                </p>
              </div>
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                <FaMoneyBillWave className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
            <div className="flex-1 max-w-md">
              <div className="relative">
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search transactions..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors duration-200"
                aria-label="Toggle filters"
              >
                <FaFilter className="w-4 h-4" />
                <span>Filters</span>
              </button>
              <button
                onClick={handleExportCSV}
                className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-indigo-600 bg-indigo-50 hover:bg-indigo-100 rounded-lg transition-colors duration-200"
                aria-label="Export transactions as CSV"
              >
                <FaDownload className="w-4 h-4" />
                <span>Export</span>
              </button>
            </div>
          </div>

          {/* Filter Options */}
          {showFilters && (
            <div className="mt-4 p-4 bg-gray-50 rounded-lg">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Transaction Type
                  </label>
                  <select
                    value={transactionType}
                    onChange={(e) => setTransactionType(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  >
                    <option value="all">All Transactions</option>
                    <option value="credit">Credits</option>
                    <option value="debit">Debits</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Start Date
                  </label>
                  <input
                    type="date"
                    value={dateRange.start}
                    onChange={(e) => setDateRange(prev => ({ ...prev, start: e.target.value }))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    End Date
                  </label>
                  <input
                    type="date"
                    value={dateRange.end}
                    onChange={(e) => setDateRange(prev => ({ ...prev, end: e.target.value }))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category
                  </label>
                  <select
                    value={category}
                    onChange={e => setCategory(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  >
                    <option value="">All Categories</option>
                    <option value="salary">Salary</option>
                    <option value="bills">Bills</option>
                    <option value="shopping">Shopping</option>
                    <option value="interest">Interest</option>
                    <option value="investment">Investment</option>
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Transactions List */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200">
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
                    Account
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Reference
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Report
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {paginatedTransactions.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="text-center py-8 text-gray-500">
                      No transactions found.
                    </td>
                  </tr>
                ) : (
                  paginatedTransactions.map((transaction) => (
                    <tr
                      key={transaction.id}
                      onClick={() => setSelectedTransaction(transaction)}
                      className="hover:bg-gray-50 cursor-pointer transition-colors duration-200"
                      tabIndex={0}
                      aria-label={`View details for transaction ${transaction.description}`}
                      onKeyDown={e => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          setSelectedTransaction(transaction);
                        }
                      }}
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {format(new Date(transaction.date), 'dd MMM yyyy')}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                            transaction.type === 'credit' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                          }`}>
                            {transaction.type === 'credit' ? <FaArrowDown className="w-4 h-4" /> : <FaArrowUp className="w-4 h-4" />}
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{transaction.description}</div>
                            <div className="text-sm text-gray-500 capitalize">{transaction.category}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {transaction.account}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {transaction.reference}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-right">
                        <span className={`font-medium ${
                          transaction.type === 'credit' ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {transaction.type === 'credit' ? '+' : '-'}₹{Math.abs(transaction.amount).toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                          ${transaction.status === 'completed' ? 'bg-green-100 text-green-800' :
                            transaction.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'}`}>
                          {transaction.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        <button
                          className="px-3 py-1 text-xs font-medium text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors duration-200"
                          onClick={e => { e.stopPropagation(); handleOpenReport(transaction); }}
                          aria-label="Report this transaction"
                        >
                          Report
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* Pagination Controls */}
      {filteredTransactions.length > pageSize && (
        <div className="flex justify-center items-center space-x-2 my-8">
          <button
            onClick={() => setPage(page - 1)}
            disabled={page === 1}
            className={`px-3 py-1 rounded-lg border text-sm font-medium ${page === 1 ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-white text-gray-700 hover:bg-gray-100'}`}
            aria-label="Previous page"
          >
            Previous
          </button>
          {Array.from({ length: Math.ceil(filteredTransactions.length / pageSize) }, (_, i) => (
            <button
              key={i + 1}
              onClick={() => setPage(i + 1)}
              className={`px-3 py-1 rounded-lg border text-sm font-medium ${page === i + 1 ? 'bg-indigo-500 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'}`}
              aria-label={`Go to page ${i + 1}`}
            >
              {i + 1}
            </button>
          ))}
          <button
            onClick={() => setPage(page + 1)}
            disabled={page === Math.ceil(filteredTransactions.length / pageSize)}
            className={`px-3 py-1 rounded-lg border text-sm font-medium ${page === Math.ceil(filteredTransactions.length / pageSize) ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-white text-gray-700 hover:bg-gray-100'}`}
            aria-label="Next page"
          >
            Next
          </button>
        </div>
      )}

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
                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                  selectedTransaction.type === 'credit' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                }`}>
                  {selectedTransaction.type === 'credit' ? <FaArrowDown className="w-6 h-6" /> : <FaArrowUp className="w-6 h-6" />}
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-900">{selectedTransaction.description}</h4>
                  <p className="text-sm text-gray-500 capitalize">{selectedTransaction.category}</p>
                </div>
              </div>
              <div className="text-right">
                <p className={`text-2xl font-bold ${
                  selectedTransaction.type === 'credit' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {selectedTransaction.type === 'credit' ? '+' : '-'}₹{Math.abs(selectedTransaction.amount).toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                </p>
                <p className="text-sm text-gray-500">{format(new Date(selectedTransaction.date), 'dd MMM yyyy')}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <p className="text-sm text-gray-500">Transaction ID</p>
                <p className="text-sm font-medium text-gray-900">{selectedTransaction.id}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Reference Number</p>
                <p className="text-sm font-medium text-gray-900">{selectedTransaction.reference}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Account</p>
                <p className="text-sm font-medium text-gray-900">{selectedTransaction.account}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Account Number</p>
                <p className="text-sm font-medium text-gray-900">{selectedTransaction.accountNumber}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Status</p>
                <p className="text-sm font-medium text-gray-900 capitalize">{selectedTransaction.status}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Type</p>
                <p className="text-sm font-medium text-gray-900 capitalize">{selectedTransaction.type}</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-3 justify-end pt-4 border-t border-gray-100">
              <button
                onClick={handleDownloadReceipt}
                className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors duration-200"
                aria-label="Download transaction receipt as PDF"
              >
                <FaDownload className="w-4 h-4" />
                <span>Download Receipt</span>
              </button>
              <button
                onClick={() => handleOpenReport(selectedTransaction)}
                className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors duration-200"
                aria-label="Report this transaction"
              >
                <span>Report</span>
              </button>
              <button
                onClick={() => setSelectedTransaction(null)}
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg transition-colors duration-200"
                aria-label="Close transaction details"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </Modal>

      {/* Report Transaction Modal */}
      <Modal
        isOpen={reportModalOpen}
        onClose={handleCloseReport}
        title={reportTransaction ? `Report Transaction` : ''}
      >
        {reportSubmitted ? (
          <div className="text-center py-8">
            <div className="text-green-600 text-lg font-semibold mb-2">Thank you!</div>
            <div className="text-gray-700">Your report has been submitted. Our team will review it shortly.</div>
            <button
              onClick={handleCloseReport}
              className="mt-6 px-4 py-2 text-sm font-medium text-indigo-600 bg-indigo-50 hover:bg-indigo-100 rounded-lg transition-colors duration-200"
            >
              Close
            </button>
          </div>
        ) : (
          <form onSubmit={e => { e.preventDefault(); handleSubmitReport(); }}>
            <div className="mb-6">
              <div className="text-gray-800 font-medium mb-4">Why are you flagging this transaction?</div>
              <div className="space-y-3">
                <label className="flex items-center space-x-3">
                  <input
                    type="radio"
                    name="reportReason"
                    value="not_recognize"
                    checked={reportReason === 'not_recognize'}
                    onChange={() => setReportReason('not_recognize')}
                  />
                  <span>I don't recognize this</span>
                </label>
                <label className="flex items-center space-x-3">
                  <input
                    type="radio"
                    name="reportReason"
                    value="fraud"
                    checked={reportReason === 'fraud'}
                    onChange={() => setReportReason('fraud')}
                  />
                  <span>Report as Fraud</span>
                </label>
                <label className="flex items-center space-x-3">
                  <input
                    type="radio"
                    name="reportReason"
                    value="contact_support"
                    checked={reportReason === 'contact_support'}
                    onChange={() => setReportReason('contact_support')}
                  />
                  <span>Contact support about this</span>
                </label>
              </div>
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={!reportReason}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-200 ${reportReason ? 'bg-indigo-600 text-white hover:bg-indigo-700' : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}
              >
                Submit
              </button>
            </div>
          </form>
        )}
      </Modal>

      <DashboardPageFooter />
    </div>
  );
};

export default AllTransactions; 