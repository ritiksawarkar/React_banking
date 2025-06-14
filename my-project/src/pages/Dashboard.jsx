import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaWallet, FaCreditCard, FaExchangeAlt, FaHistory, FaChartLine, FaLock, FaShieldAlt, FaPlus, FaLightbulb, FaCalendarAlt, FaMoneyBillWave, FaUserShield, FaMapMarkerAlt, FaClock, FaTimes, FaArrowUp, FaArrowDown, FaCheck, FaCheckCircle, FaTimesCircle, FaChevronUp, FaChevronDown, FaPauseCircle } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import ReactApexChart from 'react-apexcharts';

// Modal Component
const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
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

// Add Money Form Component
const AddMoneyForm = ({ onClose, onSuccess }) => {
  const [amount, setAmount] = useState('');
  const [source, setSource] = useState('bank');
  const [isProcessing, setIsProcessing] = useState(false);
  const [step, setStep] = useState(1);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsProcessing(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsProcessing(false);
    setStep(2);
  };

  const handleConfirm = async () => {
    setIsProcessing(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsProcessing(false);
    onSuccess(parseFloat(amount));
    onClose();
  };

  if (step === 2) {
    return (
      <div className="space-y-6">
        <div className="text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <FaCheck className="w-8 h-8 text-green-600" />
          </div>
          <h4 className="text-lg font-medium text-gray-900 mb-2">Confirm Transaction</h4>
          <p className="text-gray-600">Please confirm the following details:</p>
        </div>

        <div className="bg-gray-50 rounded-lg p-4 space-y-3">
          <div className="flex justify-between">
            <span className="text-gray-600">Amount:</span>
            <span className="font-medium">₹{parseFloat(amount).toLocaleString()}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Source:</span>
            <span className="font-medium capitalize">{source}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Fee:</span>
            <span className="font-medium">₹0.00</span>
          </div>
          <div className="border-t border-gray-200 pt-3 flex justify-between">
            <span className="text-gray-900 font-medium">Total:</span>
            <span className="font-medium">₹{parseFloat(amount).toLocaleString()}</span>
          </div>
        </div>

        <div className="flex space-x-3">
          <button
            onClick={() => setStep(1)}
            className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
            disabled={isProcessing}
          >
            Back
          </button>
          <button
            onClick={handleConfirm}
            className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50"
            disabled={isProcessing}
          >
            {isProcessing ? 'Processing...' : 'Confirm'}
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Amount
        </label>
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">₹</span>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="0.00"
            min="0"
            step="0.01"
            required
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Source
        </label>
        <select
          value={source}
          onChange={(e) => setSource(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
        >
          <option value="bank">Bank Account</option>
          <option value="card">Credit/Debit Card</option>
          <option value="upi">UPI</option>
        </select>
      </div>

      <div className="flex space-x-3">
        <button
          type="button"
          onClick={onClose}
          className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50"
          disabled={isProcessing}
        >
          {isProcessing ? 'Processing...' : 'Continue'}
        </button>
      </div>
    </form>
  );
};

// Withdraw Money Form Component
const WithdrawMoneyForm = ({ onClose, onSuccess }) => {
  const [amount, setAmount] = useState('');
  const [destination, setDestination] = useState('bank');
  const [isProcessing, setIsProcessing] = useState(false);
  const [step, setStep] = useState(1);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsProcessing(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsProcessing(false);
    setStep(2);
  };

  const handleConfirm = async () => {
    setIsProcessing(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsProcessing(false);
    onSuccess(parseFloat(amount));
    onClose();
  };

  if (step === 2) {
    return (
      <div className="space-y-6">
        <div className="text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <FaCheck className="w-8 h-8 text-green-600" />
          </div>
          <h4 className="text-lg font-medium text-gray-900 mb-2">Confirm Withdrawal</h4>
          <p className="text-gray-600">Please confirm the following details:</p>
        </div>

        <div className="bg-gray-50 rounded-lg p-4 space-y-3">
          <div className="flex justify-between">
            <span className="text-gray-600">Amount:</span>
            <span className="font-medium">₹{parseFloat(amount).toLocaleString()}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Destination:</span>
            <span className="font-medium capitalize">{destination}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Fee:</span>
            <span className="font-medium">₹0.00</span>
          </div>
          <div className="border-t border-gray-200 pt-3 flex justify-between">
            <span className="text-gray-900 font-medium">Total:</span>
            <span className="font-medium">₹{parseFloat(amount).toLocaleString()}</span>
          </div>
        </div>

        <div className="flex space-x-3">
          <button
            onClick={() => setStep(1)}
            className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
            disabled={isProcessing}
          >
            Back
          </button>
          <button
            onClick={handleConfirm}
            className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50"
            disabled={isProcessing}
          >
            {isProcessing ? 'Processing...' : 'Confirm'}
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Amount
        </label>
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">₹</span>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="0.00"
            min="0"
            step="0.01"
            required
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Destination
        </label>
        <select
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
        >
          <option value="bank">Bank Account</option>
          <option value="card">Credit/Debit Card</option>
          <option value="upi">UPI</option>
        </select>
      </div>

      <div className="flex space-x-3">
        <button
          type="button"
          onClick={onClose}
          className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50"
          disabled={isProcessing}
        >
          {isProcessing ? 'Processing...' : 'Continue'}
        </button>
      </div>
    </form>
  );
};

const Dashboard = () => {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [isAddMoneyOpen, setIsAddMoneyOpen] = useState(false);
  const [isWithdrawOpen, setIsWithdrawOpen] = useState(false);
  const [accountData, setAccountData] = useState({
    balance: 25000.00,
    accountNumber: '1234567890',
    accountType: 'Savings',
    lastUpdated: new Date().toLocaleDateString(),
    availableBalance: 24800.00,
    pendingTransactions: 200.00
  });

  const [recentTransactions, setRecentTransactions] = useState([
    { id: 1, type: 'credit', amount: 1000, description: 'Salary Deposit', date: '2024-03-15', status: 'completed', category: 'Income' },
    { id: 2, type: 'debit', amount: 500, description: 'Grocery Shopping', date: '2024-03-14', status: 'completed', category: 'Shopping' },
    { id: 3, type: 'credit', amount: 200, description: 'Refund', date: '2024-03-13', status: 'completed', category: 'Refund' },
    { id: 4, type: 'debit', amount: 150, description: 'Utility Bill', date: '2024-03-12', status: 'pending', category: 'Bills' },
  ]);

  const [showTransactionHistory, setShowTransactionHistory] = useState(false);
  const [showAnalytics, setShowAnalytics] = useState(false);

  // Loan Application Data
  const [loanApplications] = useState([
    {
      id: 1,
      type: 'Personal Loan',
      amount: 500000,
      status: 'under_review',
      appliedDate: '2024-03-15',
      estimatedCompletion: '2024-03-22',
      documents: ['ID Proof', 'Income Statement', 'Bank Statements'],
      progress: 60,
      interestRate: 10.5,
      tenure: 36,
      emi: 16200,
      purpose: 'Home Renovation',
      loanOfficer: 'Rajesh Kumar',
      lastUpdate: '2024-03-18',
      verificationStatus: {
        identity: 'completed',
        income: 'in_progress',
        credit: 'pending',
        documents: 'in_progress'
      },
      nextSteps: [
        'Income verification in progress',
        'Credit check pending',
        'Document verification ongoing'
      ],
      timeline: [
        { date: '2024-03-15', event: 'Application Submitted', status: 'completed' },
        { date: '2024-03-16', event: 'Initial Review', status: 'completed' },
        { date: '2024-03-17', event: 'Document Collection', status: 'completed' },
        { date: '2024-03-18', event: 'Income Verification', status: 'in_progress' },
        { date: '2024-03-19', event: 'Credit Check', status: 'pending' },
        { date: '2024-03-20', event: 'Final Approval', status: 'pending' }
      ],
      comments: [
        { date: '2024-03-18', user: 'Rajesh Kumar', message: 'Income documents received, verification in progress' },
        { date: '2024-03-17', user: 'System', message: 'Application moved to verification stage' }
      ]
    }
  ]);

  const [expandedLoanId, setExpandedLoanId] = useState(null);
  const [showComments, setShowComments] = useState(false);

  // Function to get status color and text
  const getStatusInfo = (status) => {
    switch (status) {
      case 'under_review':
        return {
          color: 'text-yellow-600',
          bgColor: 'bg-yellow-50',
          text: 'Under Review',
          icon: <FaClock className="w-4 h-4" />
        };
      case 'approved':
        return {
          color: 'text-green-600',
          bgColor: 'bg-green-50',
          text: 'Approved',
          icon: <FaCheckCircle className="w-4 h-4" />
        };
      case 'rejected':
        return {
          color: 'text-red-600',
          bgColor: 'bg-red-50',
          text: 'Rejected',
          icon: <FaTimesCircle className="w-4 h-4" />
        };
      case 'disbursed':
        return {
          color: 'text-blue-600',
          bgColor: 'bg-blue-50',
          text: 'Disbursed',
          icon: <FaMoneyBillWave className="w-4 h-4" />
        };
      case 'on_hold':
        return {
          color: 'text-purple-600',
          bgColor: 'bg-purple-50',
          text: 'On Hold',
          icon: <FaPauseCircle className="w-4 h-4" />
        };
      default:
        return {
          color: 'text-gray-600',
          bgColor: 'bg-gray-50',
          text: 'Pending',
          icon: <FaClock className="w-4 h-4" />
        };
    }
  };

  // Function to get verification status color
  const getVerificationStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'text-green-600 bg-green-50';
      case 'in_progress':
        return 'text-yellow-600 bg-yellow-50';
      case 'pending':
        return 'text-gray-600 bg-gray-50';
      case 'failed':
        return 'text-red-600 bg-red-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  // Function to get timeline status color
  const getTimelineStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'text-green-600';
      case 'in_progress':
        return 'text-yellow-600';
      case 'pending':
        return 'text-gray-400';
      default:
        return 'text-gray-400';
    }
  };

  // Spending Chart Data
  const spendingData = {
    options: {
      chart: {
        type: 'donut',
      },
      labels: ['Shopping', 'Bills', 'Food', 'Transport', 'Entertainment'],
      colors: ['#4F46E5', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'],
      legend: {
        position: 'bottom'
      },
      responsive: [{
        breakpoint: 480,
        options: {
          chart: {
            width: 200
          },
          legend: {
            position: 'bottom'
          }
        }
      }]
    },
    series: [5000, 2500, 3000, 1500, 2000]
  };

  // Upcoming Bills Data
  const upcomingBills = [
    {
      id: 1,
      title: 'Credit Card Payment',
      amount: 3000,
      dueDate: '2024-05-28',
      type: 'credit-card',
      icon: <FaCreditCard className="text-blue-600" />
    },
    {
      id: 2,
      title: 'Electricity Bill',
      amount: 500,
      dueDate: '2024-05-26',
      type: 'utility',
      icon: <FaLightbulb className="text-yellow-600" />
    },
    {
      id: 3,
      title: 'Car EMI',
      amount: 15000,
      dueDate: '2024-05-30',
      type: 'emi',
      icon: <FaMoneyBillWave className="text-green-600" />
    }
  ];

  // Linked Accounts Data
  const linkedAccounts = [
    {
      id: 1,
      type: 'credit-card',
      name: 'Premium Card',
      number: '**** **** **** 1234',
      expiry: '12/25',
      limit: 50000,
      balance: 15000
    },
    {
      id: 2,
      type: 'debit-card',
      name: 'Savings Account',
      number: '**** **** **** 5678',
      expiry: '09/26',
      balance: 25000
    }
  ];

  // Financial Insights
  const financialInsights = [
    {
      id: 1,
      title: 'Savings Achievement',
      description: 'You saved ₹1,200 more than last month',
      type: 'positive',
      icon: <FaChartLine className="text-green-600" />
    },
    {
      id: 2,
      title: 'Payment Automation',
      description: 'Try automating your utility payments',
      type: 'suggestion',
      icon: <FaLightbulb className="text-yellow-600" />
    }
  ];

  const quickActions = [
    { icon: <FaExchangeAlt />, title: 'Transfer', link: '/transfer', color: 'bg-blue-500', description: 'Send money to others' },
    { icon: <FaCreditCard />, title: 'Cards', link: '/cards', color: 'bg-green-500', description: 'Manage your cards' },
    { icon: <FaHistory />, title: 'History', link: '/transactions', color: 'bg-purple-500', description: 'View transaction history' },
    { icon: <FaChartLine />, title: 'Analytics', link: '/analytics', color: 'bg-orange-500', description: 'Track your spending' },
  ];

  const securityAlerts = [
    { id: 1, type: 'warning', message: 'Enable two-factor authentication for better security', icon: <FaLock /> },
    { id: 2, type: 'info', message: 'Your card will expire in 3 months', icon: <FaShieldAlt /> },
  ];

  // Last Login Info
  const lastLoginInfo = {
    date: '2024-05-21',
    time: '20:42',
    location: 'Pune, India',
    device: 'Chrome on Windows',
    ipAddress: '192.168.1.1'
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  // Add function to handle transaction updates
  const handleTransactionUpdate = (transactionId, newStatus) => {
    setRecentTransactions(prevTransactions =>
      prevTransactions.map(transaction =>
        transaction.id === transactionId
          ? { ...transaction, status: newStatus }
          : transaction
      )
    );
  };

  // Add function to handle new transactions
  const handleNewTransaction = (newTransaction) => {
    setRecentTransactions(prevTransactions => [
      { ...newTransaction, id: prevTransactions.length + 1 },
      ...prevTransactions
    ]);
  };

  // Add function to handle transaction history view
  const handleTransactionHistoryClick = () => {
    setShowTransactionHistory(true);
    setShowAnalytics(false);
  };

  // Add function to handle analytics view
  const handleAnalyticsClick = () => {
    setShowAnalytics(true);
    setShowTransactionHistory(false);
  };

  // Update handleAddMoneySuccess to add a new transaction
  const handleAddMoneySuccess = (amount) => {
    setAccountData(prev => ({
      ...prev,
      balance: prev.balance + amount,
      availableBalance: prev.availableBalance + amount
    }));
    
    // Add new transaction
    handleNewTransaction({
      type: 'credit',
      amount: amount,
      description: 'Money Added',
      date: new Date().toISOString().split('T')[0],
      status: 'completed',
      category: 'Deposit'
    });
  };

  // Update handleWithdrawSuccess to add a new transaction
  const handleWithdrawSuccess = (amount) => {
    setAccountData(prev => ({
      ...prev,
      balance: prev.balance - amount,
      availableBalance: prev.availableBalance - amount
    }));
    
    // Add new transaction
    handleNewTransaction({
      type: 'debit',
      amount: amount,
      description: 'Money Withdrawn',
      date: new Date().toISOString().split('T')[0],
      status: 'completed',
      category: 'Withdrawal'
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-50">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-24">
        {/* Welcome Section with Last Login Info */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Welcome back, {user?.displayName || 'User'}!</h2>
              <p className="text-gray-600">Here's your financial overview</p>
            </div>
            <div className="mt-4 md:mt-0 bg-white rounded-lg shadow-sm p-4 border border-gray-100">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-indigo-50 rounded-lg">
                  <FaUserShield className="w-5 h-5 text-indigo-600" />
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <FaClock className="w-4 h-4 text-gray-400" />
                    <p className="text-sm text-gray-600">
                      Last login: {new Date(lastLoginInfo.date).toLocaleDateString()}, {lastLoginInfo.time}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2 mt-1">
                    <FaMapMarkerAlt className="w-4 h-4 text-gray-400" />
                    <p className="text-sm text-gray-600">{lastLoginInfo.location}</p>
                  </div>
                </div>
              </div>
              <div className="mt-3 pt-3 border-t border-gray-100">
                <div className="flex items-center justify-between">
                  <p className="text-xs text-gray-500">{lastLoginInfo.device}</p>
                  <button className="text-xs text-indigo-600 hover:text-indigo-700 font-medium">
                    View Login History
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Account Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow duration-300">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Account Overview</h3>
                  <p className="text-sm text-gray-500 mt-1">Manage your account and transactions</p>
                </div>
                <div className="flex items-center space-x-2">
                  <button 
                    onClick={handleTransactionHistoryClick}
                    className={`p-2 rounded-lg transition-colors ${
                      showTransactionHistory 
                        ? 'text-indigo-600 bg-indigo-50' 
                        : 'text-gray-400 hover:text-indigo-600 hover:bg-indigo-50'
                    }`}
                  >
                    <FaHistory className="w-5 h-5" />
                  </button>
                  <button 
                    onClick={handleAnalyticsClick}
                    className={`p-2 rounded-lg transition-colors ${
                      showAnalytics 
                        ? 'text-indigo-600 bg-indigo-50' 
                        : 'text-gray-400 hover:text-indigo-600 hover:bg-indigo-50'
                    }`}
                  >
                    <FaChartLine className="w-5 h-5" />
                  </button>
                  <div className="p-2 text-indigo-600 bg-indigo-50 rounded-lg">
                    <FaWallet className="w-5 h-5" />
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gradient-to-br from-indigo-50 to-white rounded-lg p-4 hover:shadow-md transition-all duration-300 group">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm text-gray-500">Total Balance</p>
                    <span className="text-xs text-indigo-600 bg-indigo-50 px-2 py-1 rounded-full">Active</span>
                  </div>
                  <p className="text-2xl font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">₹{accountData.balance.toLocaleString()}</p>
                  <div className="mt-2 flex items-center text-xs text-gray-500">
                    <FaArrowUp className="w-3 h-3 text-green-500 mr-1" />
                    <span>2.5% from last month</span>
                  </div>
                </div>
                <div className="bg-gradient-to-br from-indigo-50 to-white rounded-lg p-4 hover:shadow-md transition-all duration-300 group">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm text-gray-500">Available Balance</p>
                    <span className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded-full">Ready</span>
                  </div>
                  <p className="text-2xl font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">₹{accountData.availableBalance.toLocaleString()}</p>
                  <div className="mt-2 flex items-center text-xs text-gray-500">
                    <FaArrowUp className="w-3 h-3 text-green-500 mr-1" />
                    <span>Available for withdrawal</span>
                  </div>
                </div>
                <div className="bg-gradient-to-br from-indigo-50 to-white rounded-lg p-4 hover:shadow-md transition-all duration-300 group">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm text-gray-500">Pending Transactions</p>
                    <span className="text-xs text-yellow-600 bg-yellow-50 px-2 py-1 rounded-full">Processing</span>
                  </div>
                  <p className="text-2xl font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">₹{accountData.pendingTransactions.toLocaleString()}</p>
                  <div className="mt-2 flex items-center text-xs text-gray-500">
                    <FaClock className="w-3 h-3 text-yellow-500 mr-1" />
                    <span>Will clear in 24h</span>
                  </div>
                </div>
              </div>
              <div className="mt-6 grid grid-cols-2 gap-4">
                <button 
                  onClick={() => setIsAddMoneyOpen(true)}
                  className="flex flex-col items-center justify-center p-4 bg-gradient-to-br from-indigo-50 to-white rounded-lg hover:shadow-md transition-all duration-300 group"
                >
                  <div className="bg-indigo-600 text-white p-3 rounded-full mb-2 group-hover:scale-110 transition-transform duration-300">
                    <FaArrowUp className="w-5 h-5" />
                  </div>
                  <span className="text-sm font-medium text-gray-700 group-hover:text-indigo-600 transition-colors">Add Money</span>
                  <span className="text-xs text-gray-500 mt-1">Deposit funds to your account</span>
                </button>
                <button 
                  onClick={() => setIsWithdrawOpen(true)}
                  className="flex flex-col items-center justify-center p-4 bg-gradient-to-br from-indigo-50 to-white rounded-lg hover:shadow-md transition-all duration-300 group"
                >
                  <div className="bg-indigo-600 text-white p-3 rounded-full mb-2 group-hover:scale-110 transition-transform duration-300">
                    <FaArrowDown className="w-5 h-5" />
                  </div>
                  <span className="text-sm font-medium text-gray-700 group-hover:text-indigo-600 transition-colors">Withdraw</span>
                  <span className="text-xs text-gray-500 mt-1">Withdraw funds from your account</span>
                </button>
              </div>
              <div className="mt-6 pt-6 border-t border-gray-100">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <FaShieldAlt className="w-4 h-4 text-indigo-600" />
                    <span className="text-sm text-gray-600">Account Status: Protected</span>
                  </div>
                  <button className="text-sm text-indigo-600 hover:text-indigo-700 font-medium">
                    View Details
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Security Alerts */}
          <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow duration-300">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Security Alerts</h3>
              <FaShieldAlt className="text-indigo-600" />
            </div>
            <div className="space-y-4">
              {securityAlerts.map((alert) => (
                <div key={alert.id} className="flex items-start space-x-3 p-3 bg-gradient-to-br from-indigo-50 to-white rounded-lg hover:shadow-sm transition-all duration-300">
                  <div className="text-indigo-600 mt-1">{alert.icon}</div>
                  <p className="text-sm text-gray-600">{alert.message}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Spending Chart and Upcoming Bills */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Spending Chart */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Spending Overview</h3>
            <div className="h-80">
              <ReactApexChart
                options={spendingData.options}
                series={spendingData.series}
                type="donut"
                height="100%"
              />
            </div>
          </div>

          {/* Upcoming Bills */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Upcoming Bills</h3>
              <FaCalendarAlt className="text-indigo-600" />
            </div>
            <div className="space-y-4">
              {upcomingBills.map((bill) => (
                <div key={bill.id} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                  <div className="mt-1">{bill.icon}</div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{bill.title}</p>
                    <p className="text-xs text-gray-500">Due: {new Date(bill.dueDate).toLocaleDateString()}</p>
                  </div>
                  <p className="text-sm font-medium text-gray-900">₹{bill.amount.toLocaleString()}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Linked Accounts and Financial Insights */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Linked Accounts */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Linked Accounts</h3>
              <button className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg">
                <FaPlus className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4">
              {linkedAccounts.map((account) => (
                <div key={account.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center">
                      <FaCreditCard className="w-5 h-5 text-indigo-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{account.name}</p>
                      <p className="text-xs text-gray-500">{account.number}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">₹{account.balance.toLocaleString()}</p>
                    {account.limit && (
                      <p className="text-xs text-gray-500">Limit: ₹{account.limit.toLocaleString()}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Financial Insights */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Financial Insights</h3>
            <div className="space-y-4">
              {financialInsights.map((insight) => (
                <div key={insight.id} className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-start space-x-3">
                    <div className="mt-1">{insight.icon}</div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{insight.title}</p>
                      <p className="text-xs text-gray-600">{insight.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Loan Application Tracker */}
        <div className="mb-8">
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Loan Applications</h3>
                <button className="text-sm text-indigo-600 hover:text-indigo-700 font-medium">
                  View All
                </button>
              </div>
            </div>
            <div className="p-6">
              {loanApplications.map((loan) => {
                const statusInfo = getStatusInfo(loan.status);
                const isExpanded = expandedLoanId === loan.id;
                
                return (
                  <div key={loan.id} className="bg-gradient-to-br from-indigo-50 to-white rounded-lg p-6 mb-4 last:mb-0 hover:shadow-md transition-all duration-300">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                      <div>
                        <h4 className="text-lg font-semibold text-gray-900">{loan.type}</h4>
                        <p className="text-sm text-gray-500">Applied on {new Date(loan.appliedDate).toLocaleDateString()}</p>
                      </div>
                      <div className="mt-2 md:mt-0 flex items-center space-x-3">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${statusInfo.bgColor} ${statusInfo.color}`}>
                          {statusInfo.icon}
                          <span className="ml-2">{statusInfo.text}</span>
                        </span>
                        <button 
                          onClick={() => setExpandedLoanId(isExpanded ? null : loan.id)}
                          className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                        >
                          {isExpanded ? <FaChevronUp className="w-5 h-5" /> : <FaChevronDown className="w-5 h-5" />}
                        </button>
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <div className="flex justify-between text-sm text-gray-600 mb-1">
                        <span>Application Progress</span>
                        <span>{loan.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-indigo-600 h-2 rounded-full transition-all duration-500"
                          style={{ width: `${loan.progress}%` }}
                        ></div>
                      </div>
                    </div>

                    {isExpanded && (
                      <>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                          <div className="bg-white rounded-lg p-4 shadow-sm">
                            <p className="text-sm text-gray-500 mb-2">Loan Amount</p>
                            <p className="text-lg font-semibold text-gray-900">₹{loan.amount.toLocaleString()}</p>
                          </div>
                          <div className="bg-white rounded-lg p-4 shadow-sm">
                            <p className="text-sm text-gray-500 mb-2">Interest Rate</p>
                            <p className="text-lg font-semibold text-gray-900">{loan.interestRate}% p.a.</p>
                          </div>
                          <div className="bg-white rounded-lg p-4 shadow-sm">
                            <p className="text-sm text-gray-500 mb-2">Monthly EMI</p>
                            <p className="text-lg font-semibold text-gray-900">₹{loan.emi.toLocaleString()}</p>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                          <div className="bg-white rounded-lg p-4 shadow-sm">
                            <p className="text-sm text-gray-500 mb-2">Loan Purpose</p>
                            <p className="text-lg font-semibold text-gray-900">{loan.purpose}</p>
                          </div>
                          <div className="bg-white rounded-lg p-4 shadow-sm">
                            <p className="text-sm text-gray-500 mb-2">Loan Officer</p>
                            <p className="text-lg font-semibold text-gray-900">{loan.loanOfficer}</p>
                          </div>
                        </div>

                        <div className="mb-4">
                          <p className="text-sm text-gray-500 mb-2">Verification Status</p>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                            {Object.entries(loan.verificationStatus).map(([key, status]) => (
                              <span 
                                key={key}
                                className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getVerificationStatusColor(status)}`}
                              >
                                {key.charAt(0).toUpperCase() + key.slice(1)}: {status.replace('_', ' ')}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="mb-4">
                          <p className="text-sm text-gray-500 mb-2">Application Timeline</p>
                          <div className="relative">
                            {loan.timeline.map((item, index) => (
                              <div key={index} className="flex items-start mb-4 last:mb-0">
                                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-white border-2 border-indigo-200 flex items-center justify-center mr-4">
                                  <span className={`text-sm ${getTimelineStatusColor(item.status)}`}>
                                    {index + 1}
                                  </span>
                                </div>
                                <div className="flex-1">
                                  <p className="text-sm font-medium text-gray-900">{item.event}</p>
                                  <p className="text-xs text-gray-500">{new Date(item.date).toLocaleDateString()}</p>
                                </div>
                                {index < loan.timeline.length - 1 && (
                                  <div className="absolute left-4 top-8 w-0.5 h-12 bg-indigo-200"></div>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="mb-4">
                          <div className="flex items-center justify-between mb-2">
                            <p className="text-sm text-gray-500">Next Steps</p>
                            <button 
                              onClick={() => setShowComments(!showComments)}
                              className="text-sm text-indigo-600 hover:text-indigo-700"
                            >
                              {showComments ? 'Hide Comments' : 'Show Comments'}
                            </button>
                          </div>
                          <ul className="space-y-2">
                            {loan.nextSteps.map((step, index) => (
                              <li key={index} className="flex items-start">
                                <span className="flex-shrink-0 w-5 h-5 rounded-full bg-indigo-100 flex items-center justify-center mr-2 mt-0.5">
                                  <span className="text-xs text-indigo-600">{index + 1}</span>
                                </span>
                                <span className="text-sm text-gray-600">{step}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {showComments && (
                          <div className="mb-4">
                            <p className="text-sm text-gray-500 mb-2">Comments</p>
                            <div className="space-y-3">
                              {loan.comments.map((comment, index) => (
                                <div key={index} className="bg-white rounded-lg p-3 shadow-sm">
                                  <div className="flex items-center justify-between mb-1">
                                    <span className="text-sm font-medium text-gray-900">{comment.user}</span>
                                    <span className="text-xs text-gray-500">{new Date(comment.date).toLocaleDateString()}</span>
                                  </div>
                                  <p className="text-sm text-gray-600">{comment.message}</p>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        <div className="mt-4 pt-4 border-t border-gray-100">
                          <p className="text-sm text-gray-500 mb-2">Required Documents</p>
                          <div className="flex flex-wrap gap-2">
                            {loan.documents.map((doc, index) => (
                              <span 
                                key={index}
                                className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-600"
                              >
                                {doc}
                              </span>
                            ))}
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Quick Actions and Recent Transactions */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Quick Actions */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
            <div className="grid grid-cols-2 gap-4">
              {quickActions.map((action, index) => (
                <Link
                  key={index}
                  to={action.link}
                  className="flex flex-col items-center justify-center p-4 bg-gray-50 rounded-lg hover:bg-indigo-50 transition-colors group"
                >
                  <div className={`${action.color} text-white p-3 rounded-full mb-2 group-hover:scale-110 transition-transform`}>
                    {action.icon}
                  </div>
                  <span className="text-sm font-medium text-gray-700">{action.title}</span>
                  <span className="text-xs text-gray-500 mt-1">{action.description}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Recent Transactions */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
              <h3 className="text-lg font-semibold text-gray-900">Recent Transactions</h3>
              <Link to="/transactions" className="text-indigo-600 hover:text-indigo-700 font-medium text-sm">
                View all
              </Link>
            </div>
            <div className="divide-y divide-gray-200">
              {recentTransactions.map((transaction) => (
                <div key={transaction.id} className="px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
                  <div className="flex items-center">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      transaction.type === 'credit' ? 'bg-green-100' : 'bg-red-100'
                    }`}>
                      <FaExchangeAlt className={`text-lg ${
                        transaction.type === 'credit' ? 'text-green-600' : 'text-red-600'
                      }`} />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-900">{transaction.description}</p>
                      <div className="flex items-center space-x-2">
                        <p className="text-sm text-gray-500">{transaction.date}</p>
                        <span className="text-xs text-gray-500">•</span>
                        <span className="text-xs text-gray-500">{transaction.category}</span>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          transaction.status === 'completed' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {transaction.status}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className={`text-sm font-medium ${
                    transaction.type === 'credit' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {transaction.type === 'credit' ? '+' : '-'}${transaction.amount}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Add Money Modal */}
      <Modal
        isOpen={isAddMoneyOpen}
        onClose={() => setIsAddMoneyOpen(false)}
        title="Add Money"
      >
        <AddMoneyForm
          onClose={() => setIsAddMoneyOpen(false)}
          onSuccess={handleAddMoneySuccess}
        />
      </Modal>

      {/* Withdraw Money Modal */}
      <Modal
        isOpen={isWithdrawOpen}
        onClose={() => setIsWithdrawOpen(false)}
        title="Withdraw Money"
      >
        <WithdrawMoneyForm
          onClose={() => setIsWithdrawOpen(false)}
          onSuccess={handleWithdrawSuccess}
        />
      </Modal>
    </div>
  );
};

export default Dashboard; 