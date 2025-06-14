import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { 
  FaPiggyBank, FaExchangeAlt, FaHistory, FaDownload, 
  FaFileInvoiceDollar, FaChartLine, FaCreditCard, FaArrowUp, 
  FaArrowDown, FaCalendarAlt, FaClock, FaUserCircle, FaBuilding,
  FaCheckCircle, FaTimesCircle, FaSpinner, FaPercent, FaSearch,
  FaFilter, FaEnvelope, FaTag, FaLightbulb, FaChartBar, FaInfoCircle,
  FaLock, FaShieldAlt, FaCalculator, FaRobot
} from 'react-icons/fa';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const SavingsAccount = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [transactionNotes, setTransactionNotes] = useState({});
  const [showNoteInput, setShowNoteInput] = useState(null);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [amountRange, setAmountRange] = useState({ min: '', max: '' });
  const [showExportModal, setShowExportModal] = useState(false);
  const [exportFormat, setExportFormat] = useState('pdf');
  const [exportPeriod, setExportPeriod] = useState('all');
  const [displayedTransactions, setDisplayedTransactions] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [noteInput, setNoteInput] = useState('');
  const [showTransactionDetails, setShowTransactionDetails] = useState(null);
  const [notification, setNotification] = useState({ show: false, type: '', message: '' });
  const transactionsPerPage = 5;

  // Add new state for statement download
  const [showDownloadModal, setShowDownloadModal] = useState(false);
  const [statementPeriod, setStatementPeriod] = useState('last_month');
  const [statementFormat, setStatementFormat] = useState('pdf');
  const [isLoading, setIsLoading] = useState(false);

  // Account Overview Data
  const accountData = {
    accountNumber: '9876543210',
    accountType: 'Premium Savings',
    balance: 75000.00,
    availableBalance: 74500.00,
    pendingTransactions: 500.00,
    lastUpdated: new Date().toLocaleString(),
    status: 'Active',
    branch: 'Pune Main Branch',
    ifscCode: 'FINV0001234',
    interestRate: 4.5,
    interestEarned: 1250.00,
    monthlyInterest: 280.00
  };

  // Account Holder Info
  const accountHolder = {
    name: 'Ritik Sawarkar',
    phone: '+91-9876543210',
    email: 'ritik@finverse.com',
    location: 'Pune, India'
  };

  // Recent Transactions
  const recentTransactions = [
    {
      id: 1,
      type: 'credit',
      amount: 10000.00,
      description: 'Monthly Interest',
      date: '2024-03-15',
      time: '09:30 AM',
      status: 'completed',
      category: 'Interest'
    },
    {
      id: 2,
      type: 'credit',
      amount: 5000.00,
      description: 'Salary Transfer',
      date: '2024-03-14',
      time: '02:15 PM',
      status: 'completed',
      category: 'Income'
    },
    {
      id: 3,
      type: 'debit',
      amount: 2000.00,
      description: 'Emergency Fund',
      date: '2024-03-13',
      time: '11:45 AM',
      status: 'pending',
      category: 'Transfer'
    }
  ];

  // Quick Actions with enhanced data and routes
  const quickActions = [
    { 
      id: 'transfer',
      icon: <FaExchangeAlt />, 
      title: 'Transfer Money', 
      description: 'Send money to others',
      color: 'blue',
      isNew: false,
      route: '/transactions/transfer'
    },
    { 
      id: 'bills',
      icon: <FaFileInvoiceDollar />, 
      title: 'Pay Bills', 
      description: 'Pay your bills',
      color: 'green',
      isNew: true,
      route: '/transactions/bills'
    },
    { 
      id: 'statement',
      icon: <FaDownload />, 
      title: 'Download Statement', 
      description: 'Get your account statement',
      color: 'purple',
      isNew: false,
      route: '/statements'
    },
    { 
      id: 'history',
      icon: <FaHistory />, 
      title: 'Transaction History', 
      description: 'View all transactions',
      color: 'yellow',
      isNew: false,
      route: '/transactions/history'
    }
  ];

  // Interest Calculator State
  const [calculatorAmount, setCalculatorAmount] = useState('');
  const [calculatorDuration, setCalculatorDuration] = useState('1');
  const [calculatedInterest, setCalculatedInterest] = useState(null);

  // Auto-Savings State
  const [autoSaveAmount, setAutoSaveAmount] = useState('');
  const [autoSaveDay, setAutoSaveDay] = useState('5');
  const [isAutoSaveEnabled, setIsAutoSaveEnabled] = useState(false);

  // Interest History Data
  const interestHistory = [
    { date: '2024-03-15', type: 'Monthly Interest', amount: 280 },
    { date: '2024-02-15', type: 'Monthly Interest', amount: 250 },
    { date: '2024-01-15', type: 'Monthly Interest', amount: 220 },
    { date: '2023-12-15', type: 'Monthly Interest', amount: 200 },
    { date: '2023-11-15', type: 'Monthly Interest', amount: 180 },
    { date: '2023-10-15', type: 'Monthly Interest', amount: 160 }
  ];

  // Balance History Data for Graph
  const balanceHistory = {
    labels: ['Oct 2023', 'Nov 2023', 'Dec 2023', 'Jan 2024', 'Feb 2024', 'Mar 2024'],
    datasets: [
      {
        label: 'Account Balance',
        data: [40000, 45000, 50000, 60000, 65000, 75000],
        borderColor: 'rgb(34, 197, 94)',
        backgroundColor: 'rgba(34, 197, 94, 0.1)',
        tension: 0.4,
        fill: true
      }
    ]
  };

  // Filter transactions based on search and filters
  const filteredTransactions = displayedTransactions.filter(transaction => {
    const matchesSearch = transaction.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         transaction.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || transaction.category === selectedCategory;
    const matchesStatus = selectedStatus === 'all' || transaction.status === selectedStatus;
    const matchesDateRange = (!dateRange.start || transaction.date >= dateRange.start) &&
                            (!dateRange.end || transaction.date <= dateRange.end);
    const matchesAmountRange = (!amountRange.min || transaction.amount >= parseFloat(amountRange.min)) &&
                              (!amountRange.max || transaction.amount <= parseFloat(amountRange.max));
    
    return matchesSearch && matchesCategory && matchesStatus && matchesDateRange && matchesAmountRange;
  });

  // Initialize displayed transactions
  useEffect(() => {
    setDisplayedTransactions(recentTransactions.slice(0, transactionsPerPage));
  }, []);

  // Load more transactions
  const loadMoreTransactions = async () => {
    setIsLoadingMore(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const nextPage = page + 1;
      const startIndex = 0;
      const endIndex = nextPage * transactionsPerPage;
      
      // In a real app, this would be an API call to fetch more transactions
      const newTransactions = recentTransactions.slice(startIndex, endIndex);
      
      setDisplayedTransactions(newTransactions);
      setPage(nextPage);
      showNotification('success', 'More transactions loaded');
    } catch (error) {
      console.error('Error loading more transactions:', error);
      showNotification('error', 'Failed to load more transactions');
    } finally {
      setIsLoadingMore(false);
    }
  };

  // Handle note management
  const handleAddNote = (transactionId, note) => {
    if (!note.trim()) {
      showNotification('error', 'Note cannot be empty');
      return;
    }

    setTransactionNotes(prev => ({
      ...prev,
      [transactionId]: {
        text: note,
        timestamp: new Date().toLocaleString()
      }
    }));
    setShowNoteInput(null);
    setNoteInput('');
    showNotification('success', 'Note added successfully');
  };

  const handleDeleteNote = (transactionId) => {
    setTransactionNotes(prev => {
      const newNotes = { ...prev };
      delete newNotes[transactionId];
      return newNotes;
    });
    showNotification('success', 'Note deleted successfully');
  };

  // Handle export
  const handleExportTransactions = async () => {
    try {
      const transactionsToExport = filteredTransactions;
      
      if (exportFormat === 'pdf') {
        const doc = new jsPDF();
        doc.text('Savings Account Transactions', 14, 15);
        
        const tableData = transactionsToExport.map(t => [
          t.date,
          t.description,
          t.category,
          t.status,
          `${t.type === 'credit' ? '+' : '-'}₹${t.amount.toLocaleString()}`
        ]);

        autoTable(doc, {
          head: [['Date', 'Description', 'Category', 'Status', 'Amount']],
          body: tableData,
          startY: 25
        });

        doc.save('savings-transactions.pdf');
      } else {
        // CSV export
        const headers = ['Date', 'Description', 'Category', 'Status', 'Amount'];
        const csvData = transactionsToExport.map(t => [
          t.date,
          t.description,
          t.category,
          t.status,
          `${t.type === 'credit' ? '+' : '-'}₹${t.amount}`
        ]);
        
        const csvContent = [
          headers.join(','),
          ...csvData.map(row => row.join(','))
        ].join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'savings-transactions.csv';
        link.click();
      }

      showNotification('success', 'Transactions exported successfully');
      setShowExportModal(false);
    } catch (error) {
      console.error('Error exporting transactions:', error);
      showNotification('error', 'Failed to export transactions');
    }
  };

  // Show notification
  const showNotification = (type, message) => {
    setNotification({ show: true, type, message });
    setTimeout(() => setNotification({ show: false, type: '', message: '' }), 3000);
  };

  // Calculate Interest
  const calculateInterest = () => {
    const amount = parseFloat(calculatorAmount);
    const duration = parseFloat(calculatorDuration);
    const rate = accountData.interestRate;
    
    if (amount && duration && rate) {
      const interest = (amount * rate * duration) / 100;
      setCalculatedInterest(interest);
    }
  };

  // Handle Auto-Save Toggle
  const handleAutoSaveToggle = () => {
    if (!isAutoSaveEnabled && autoSaveAmount) {
      setIsAutoSaveEnabled(true);
      showNotification('success', 'Auto-savings plan enabled successfully');
    } else {
      setIsAutoSaveEnabled(false);
      showNotification('success', 'Auto-savings plan disabled');
    }
  };

  // Handle quick action click with routing
  const handleQuickActionClick = (action) => {
    switch (action.id) {
      case 'statement':
        setShowDownloadModal(true);
        break;
      default:
        navigate(action.route);
        break;
    }
  };

  // Handle statement download
  const handleDownloadStatement = async () => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      if (statementFormat === 'pdf') {
        // Create PDF document
        const doc = new jsPDF();
        
        // Add header
        doc.setFontSize(20);
        doc.text('Savings Account Statement', 105, 20, { align: 'center' });
        
        // Add account details
        doc.setFontSize(12);
        doc.text(`Account Number: ${accountData.accountNumber}`, 20, 40);
        doc.text(`Account Holder: ${accountHolder.name}`, 20, 50);
        doc.text(`Statement Period: ${statementPeriod}`, 20, 60);
        doc.text(`Date Generated: ${new Date().toLocaleDateString()}`, 20, 70);
        
        // Add balance information
        doc.setFontSize(14);
        doc.text('Balance Summary', 20, 90);
        doc.setFontSize(12);
        doc.text(`Current Balance: ₹${accountData.balance.toLocaleString()}`, 30, 100);
        doc.text(`Available Balance: ₹${accountData.availableBalance.toLocaleString()}`, 30, 110);
        doc.text(`Pending Transactions: ₹${accountData.pendingTransactions.toLocaleString()}`, 30, 120);
        doc.text(`Interest Rate: ${accountData.interestRate}%`, 30, 130);
        doc.text(`Interest Earned (YTD): ₹${accountData.interestEarned.toLocaleString()}`, 30, 140);
        
        // Add transaction table
        doc.setFontSize(14);
        doc.text('Recent Transactions', 20, 160);
        
        // Prepare table data
        const tableData = recentTransactions.map(transaction => [
          transaction.date,
          transaction.description,
          transaction.category,
          transaction.type === 'credit' ? `+₹${transaction.amount}` : `-₹${transaction.amount}`,
          transaction.status
        ]);
        
        // Add table using autoTable
        autoTable(doc, {
          startY: 170,
          head: [['Date', 'Description', 'Category', 'Amount', 'Status']],
          body: tableData,
          theme: 'grid',
          headStyles: { fillColor: [34, 197, 94] },
          styles: { fontSize: 10 },
          columnStyles: {
            0: { cellWidth: 30 },
            1: { cellWidth: 60 },
            2: { cellWidth: 30 },
            3: { cellWidth: 30 },
            4: { cellWidth: 30 }
          }
        });
        
        // Add footer
        const pageCount = doc.internal.getNumberOfPages();
        for (let i = 1; i <= pageCount; i++) {
          doc.setPage(i);
          doc.setFontSize(10);
          doc.text(
            `Page ${i} of ${pageCount}`,
            doc.internal.pageSize.width / 2,
            doc.internal.pageSize.height - 10,
            { align: 'center' }
          );
        }
        
        // Save the PDF
        doc.save(`savings_statement_${statementPeriod}_${new Date().toISOString().split('T')[0]}.pdf`);
      } else {
        // CSV export
        const headers = ['Date', 'Description', 'Category', 'Amount', 'Status'];
        const csvData = recentTransactions.map(transaction => [
          transaction.date,
          transaction.description,
          transaction.category,
          transaction.type === 'credit' ? `+₹${transaction.amount}` : `-₹${transaction.amount}`,
          transaction.status
        ]);
        
        const csvContent = [
          headers.join(','),
          ...csvData.map(row => row.join(','))
        ].join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `savings_statement_${statementPeriod}_${new Date().toISOString().split('T')[0]}.csv`;
        link.click();
      }

      showNotification('success', 'Statement downloaded successfully');
      setShowDownloadModal(false);
    } catch (error) {
      console.error('Error downloading statement:', error);
      showNotification('error', 'Failed to download statement. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-50">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-24">
        {/* Account Header */}
        <div className="mb-8">
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="bg-gradient-to-r from-green-600 to-emerald-600 px-6 py-8">
              <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6">
                <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border-4 border-white/30">
                  <FaPiggyBank className="w-8 h-8 text-white" />
                </div>
                <div className="text-center md:text-left">
                  <h1 className="text-2xl font-bold text-white">Savings Account</h1>
                  <p className="text-green-100 mt-1">Account Number: {accountData.accountNumber}</p>
                  <div className="flex flex-wrap gap-2 mt-3 justify-center md:justify-start">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-white/20 text-white backdrop-blur-sm">
                      <FaCheckCircle className="w-4 h-4 mr-1" />
                      {accountData.status}
                    </span>
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-white/20 text-white backdrop-blur-sm">
                      <FaBuilding className="w-4 h-4 mr-1" />
                      {accountData.branch}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Account Holder Info Card */}
            <div className="px-6 py-4 border-t border-gray-100">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                  <FaUserCircle className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{accountHolder.name}</h3>
                  <div className="flex flex-wrap gap-4 mt-1">
                    <span className="flex items-center text-sm text-gray-600">
                      <FaClock className="w-4 h-4 mr-1" />
                      {accountHolder.phone}
                    </span>
                    <span className="flex items-center text-sm text-gray-600">
                      <FaEnvelope className="w-4 h-4 mr-1" />
                      {accountHolder.email}
                    </span>
                    <span className="flex items-center text-sm text-gray-600">
                      <FaBuilding className="w-4 h-4 mr-1" />
                      {accountHolder.location}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Balance Overview */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-all duration-300">
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="p-4 bg-gray-50 rounded-lg hover:shadow-sm transition-all duration-300">
                    <p className="text-sm text-gray-600">Available Balance</p>
                    <p className="text-2xl font-bold text-gray-900 mt-1">₹{accountData.availableBalance.toLocaleString()}</p>
                    <p className="text-xs text-gray-500 mt-1">Last updated: {accountData.lastUpdated}</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg hover:shadow-sm transition-all duration-300">
                    <p className="text-sm text-gray-600">Current Balance</p>
                    <p className="text-2xl font-bold text-gray-900 mt-1">₹{accountData.balance.toLocaleString()}</p>
                    <p className="text-xs text-gray-500 mt-1">Including pending transactions</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg hover:shadow-sm transition-all duration-300">
                    <p className="text-sm text-gray-600">Interest Rate</p>
                    <p className="text-2xl font-bold text-gray-900 mt-1">{accountData.interestRate}%</p>
                    <p className="text-xs text-gray-500 mt-1">Annual interest rate</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Balance Trend Graph */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-all duration-300">
              <div className="px-6 py-4 border-b border-gray-100">
                <h2 className="text-xl font-semibold text-gray-900">Balance Trend</h2>
              </div>
              <div className="p-6">
                <div className="h-64">
                  <Line
                    data={balanceHistory}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      plugins: {
                        legend: {
                          position: 'top',
                        },
                        title: {
                          display: true,
                          text: 'Last 6 Months Balance Trend'
                        }
                      },
                      scales: {
                        y: {
                          beginAtZero: false,
                          ticks: {
                            callback: function(value) {
                              return '₹' + value.toLocaleString();
                            }
                          }
                        }
                      }
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Interest Overview */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-all duration-300">
              <div className="px-6 py-4 border-b border-gray-100">
                <h2 className="text-xl font-semibold text-gray-900">Interest Overview</h2>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-4 bg-gray-50 rounded-lg hover:shadow-sm transition-all duration-300">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                        <FaPercent className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Interest Earned (YTD)</p>
                        <p className="text-xl font-bold text-gray-900 mt-1">₹{accountData.interestEarned.toLocaleString()}</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg hover:shadow-sm transition-all duration-300">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                        <FaCalendarAlt className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Monthly Interest</p>
                        <p className="text-xl font-bold text-gray-900 mt-1">₹{accountData.monthlyInterest.toLocaleString()}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Interest Calculator Widget */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-all duration-300">
              <div className="px-6 py-4 border-b border-gray-100">
                <h2 className="text-xl font-semibold text-gray-900">Interest Calculator</h2>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Amount (₹)</label>
                    <input
                      type="number"
                      value={calculatorAmount}
                      onChange={(e) => setCalculatorAmount(e.target.value)}
                      placeholder="Enter amount"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Duration (Years)</label>
                    <input
                      type="number"
                      value={calculatorDuration}
                      onChange={(e) => setCalculatorDuration(e.target.value)}
                      placeholder="Enter duration"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Interest Rate</label>
                    <div className="px-3 py-2 bg-gray-50 rounded-lg">
                      <p className="text-lg font-semibold text-gray-900">{accountData.interestRate}%</p>
                    </div>
                  </div>
                </div>
                <div className="mt-4">
                  <button
                    onClick={calculateInterest}
                    className="w-full px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700"
                  >
                    Calculate Interest
                  </button>
                </div>
                {calculatedInterest !== null && (
                  <div className="mt-4 p-4 bg-green-50 rounded-lg">
                    <p className="text-sm text-gray-600">You will earn:</p>
                    <p className="text-2xl font-bold text-green-600">₹{calculatedInterest.toLocaleString()}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Interest History Table */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-all duration-300">
              <div className="px-6 py-4 border-b border-gray-100">
                <h2 className="text-xl font-semibold text-gray-900">Interest History</h2>
              </div>
              <div className="p-6">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead>
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {interestHistory.map((item, index) => (
                        <tr key={index}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.date}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.type}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600">₹{item.amount.toLocaleString()}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Recent Transactions */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-all duration-300">
              <div className="px-6 py-4 border-b border-gray-100">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-gray-900">Recent Transactions</h2>
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={() => setShowFilters(!showFilters)}
                      className="flex items-center space-x-2 text-gray-600 hover:text-gray-900"
                    >
                      <FaFilter className="w-4 h-4" />
                      <span>Filters</span>
                    </button>
                    <button
                      onClick={() => setShowExportModal(true)}
                      className="flex items-center space-x-2 text-gray-600 hover:text-gray-900"
                    >
                      <FaDownload className="w-4 h-4" />
                      <span>Export</span>
                    </button>
                    <button
                      onClick={() => navigate('/transactions/history')}
                      className="text-green-600 hover:text-green-700 text-sm font-medium"
                    >
                      View All
                    </button>
                  </div>
                </div>

                {/* Search and Filters */}
                <div className={`mt-4 space-y-4 ${showFilters ? 'block' : 'hidden'}`}>
                  <div className="flex items-center space-x-4">
                    <div className="flex-1">
                      <div className="relative">
                        <input
                          type="text"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          placeholder="Search transactions..."
                          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                        />
                        <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      </div>
                    </div>
                    <select
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    >
                      <option value="all">All Categories</option>
                      <option value="Income">Income</option>
                      <option value="Interest">Interest</option>
                      <option value="Transfer">Transfer</option>
                      <option value="Bills">Bills</option>
                    </select>
                    <select
                      value={selectedStatus}
                      onChange={(e) => setSelectedStatus(e.target.value)}
                      className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    >
                      <option value="all">All Status</option>
                      <option value="completed">Completed</option>
                      <option value="pending">Pending</option>
                    </select>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Date Range</label>
                      <div className="flex space-x-2">
                        <input
                          type="date"
                          value={dateRange.start}
                          onChange={(e) => setDateRange(prev => ({ ...prev, start: e.target.value }))}
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                        />
                        <input
                          type="date"
                          value={dateRange.end}
                          onChange={(e) => setDateRange(prev => ({ ...prev, end: e.target.value }))}
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Amount Range</label>
                      <div className="flex space-x-2">
                        <input
                          type="number"
                          value={amountRange.min}
                          onChange={(e) => setAmountRange(prev => ({ ...prev, min: e.target.value }))}
                          placeholder="Min"
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                        />
                        <input
                          type="number"
                          value={amountRange.max}
                          onChange={(e) => setAmountRange(prev => ({ ...prev, max: e.target.value }))}
                          placeholder="Max"
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <div className="space-y-4">
                  {filteredTransactions.map((transaction) => (
                    <div key={transaction.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:shadow-sm transition-all duration-300">
                      <div className="flex items-center space-x-4">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          transaction.type === 'credit' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                        }`}>
                          {transaction.type === 'credit' ? <FaArrowDown className="w-5 h-5" /> : <FaArrowUp className="w-5 h-5" />}
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{transaction.description}</p>
                          <div className="flex items-center space-x-2 mt-1">
                            <span className="text-sm text-gray-500">{transaction.category}</span>
                            <span className="text-sm text-gray-500">•</span>
                            <span className="text-sm text-gray-500">{transaction.date}</span>
                            <span className="text-sm text-gray-500">•</span>
                            <span className="text-sm text-gray-500">{transaction.time}</span>
                          </div>
                          {transactionNotes[transaction.id] && (
                            <div className="mt-2 text-sm text-gray-600 bg-white p-2 rounded">
                              <p>{transactionNotes[transaction.id].text}</p>
                              <p className="text-xs text-gray-400 mt-1">
                                Added on {transactionNotes[transaction.id].timestamp}
                              </p>
                            </div>
                          )}
                          {showNoteInput === transaction.id && (
                            <div className="mt-3">
                              <div className="flex items-center space-x-2">
                                <input
                                  type="text"
                                  value={noteInput}
                                  onChange={(e) => setNoteInput(e.target.value)}
                                  placeholder="Add a note..."
                                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                                  onKeyPress={(e) => {
                                    if (e.key === 'Enter') {
                                      handleAddNote(transaction.id, noteInput);
                                    }
                                  }}
                                />
                                <button
                                  onClick={() => handleAddNote(transaction.id, noteInput)}
                                  className="px-3 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700"
                                >
                                  Save
                                </button>
                                <button
                                  onClick={() => {
                                    setShowNoteInput(null);
                                    setNoteInput('');
                                  }}
                                  className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900"
                                >
                                  Cancel
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="text-right">
                          <p className={`font-medium ${
                            transaction.type === 'credit' ? 'text-green-600' : 'text-red-600'
                          }`}>
                            {transaction.type === 'credit' ? '+' : '-'}₹{transaction.amount.toLocaleString()}
                          </p>
                          <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium mt-1 ${
                            transaction.status === 'completed' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {transaction.status === 'completed' ? (
                              <FaCheckCircle className="w-3 h-3 mr-1" />
                            ) : (
                              <FaSpinner className="w-3 h-3 mr-1 animate-spin" />
                            )}
                            {transaction.status}
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => setShowNoteInput(transaction.id)}
                            className="p-2 text-gray-400 hover:text-gray-600"
                            title="Add Note"
                          >
                            <FaTag className="w-4 h-4" />
                          </button>
                          {transactionNotes[transaction.id] && (
                            <button
                              onClick={() => handleDeleteNote(transaction.id)}
                              className="p-2 text-red-400 hover:text-red-600"
                              title="Delete Note"
                            >
                              <FaTimesCircle className="w-4 h-4" />
                            </button>
                          )}
                          <button
                            onClick={() => setShowTransactionDetails(transaction)}
                            className="p-2 text-gray-400 hover:text-gray-600"
                            title="View Details"
                          >
                            <FaInfoCircle className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Load More Button */}
                {displayedTransactions.length < recentTransactions.length && (
                  <div className="mt-6 text-center">
                    <button
                      onClick={loadMoreTransactions}
                      disabled={isLoadingMore}
                      className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isLoadingMore ? (
                        <span className="flex items-center justify-center">
                          <FaSpinner className="w-4 h-4 mr-2 animate-spin" />
                          Loading...
                        </span>
                      ) : (
                        'Load More'
                      )}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-all duration-300">
              <div className="px-6 py-4 border-b border-gray-100">
                <h2 className="text-xl font-semibold text-gray-900">Quick Actions</h2>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 gap-4">
                  {quickActions.map((action, index) => (
                    <button
                      key={index}
                      onClick={() => handleQuickActionClick(action)}
                      className="p-4 bg-gray-50 rounded-lg hover:shadow-sm transition-all duration-300 text-left"
                    >
                      <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600 mb-3">
                        {action.icon}
                      </div>
                      <h3 className="font-medium text-gray-900">{action.title}</h3>
                      <p className="text-sm text-gray-500 mt-1">{action.description}</p>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Auto-Savings Plan Setup */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-all duration-300">
              <div className="px-6 py-4 border-b border-gray-100">
                <h2 className="text-xl font-semibold text-gray-900">Auto-Savings Plan</h2>
              </div>
              <div className="p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <FaRobot className="w-6 h-6 text-green-600" />
                  <p className="text-gray-600">Automate your savings for better returns</p>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Amount (₹)</label>
                    <input
                      type="number"
                      value={autoSaveAmount}
                      onChange={(e) => setAutoSaveAmount(e.target.value)}
                      placeholder="Enter amount"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Transfer Day</label>
                    <select
                      value={autoSaveDay}
                      onChange={(e) => setAutoSaveDay(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    >
                      {Array.from({ length: 28 }, (_, i) => i + 1).map(day => (
                        <option key={day} value={day}>{day}</option>
                      ))}
                    </select>
                  </div>
                  <button
                    onClick={handleAutoSaveToggle}
                    className={`w-full px-4 py-2 text-sm font-medium text-white rounded-lg ${
                      isAutoSaveEnabled ? 'bg-red-600 hover:bg-red-700' : 'bg-green-600 hover:bg-green-700'
                    }`}
                  >
                    {isAutoSaveEnabled ? 'Disable Auto-Saving' : 'Enable Auto-Saving'}
                  </button>
                </div>
              </div>
            </div>

            {/* Account Details */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-all duration-300">
              <div className="px-6 py-4 border-b border-gray-100">
                <h2 className="text-xl font-semibold text-gray-900">Account Details</h2>
              </div>
              <div className="p-6 space-y-4">
                <div className="p-4 bg-gray-50 rounded-lg hover:shadow-sm transition-all duration-300">
                  <p className="text-sm text-gray-600">Account Number</p>
                  <p className="text-lg font-semibold text-gray-900 mt-1">{accountData.accountNumber}</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg hover:shadow-sm transition-all duration-300">
                  <p className="text-sm text-gray-600">IFSC Code</p>
                  <p className="text-lg font-semibold text-gray-900 mt-1">{accountData.ifscCode}</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg hover:shadow-sm transition-all duration-300">
                  <p className="text-sm text-gray-600">Account Type</p>
                  <p className="text-lg font-semibold text-gray-900 mt-1">{accountData.accountType}</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg hover:shadow-sm transition-all duration-300">
                  <p className="text-sm text-gray-600">Branch</p>
                  <p className="text-lg font-semibold text-gray-900 mt-1">{accountData.branch}</p>
                </div>
              </div>
            </div>

            {/* Security Labels */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-all duration-300">
              <div className="px-6 py-4 border-b border-gray-100">
                <h2 className="text-xl font-semibold text-gray-900">Security & Compliance</h2>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <FaLock className="w-5 h-5 text-green-600" />
                    <p className="text-gray-600">All savings data is end-to-end encrypted</p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <FaShieldAlt className="w-5 h-5 text-green-600" />
                    <p className="text-gray-600">Verified by RBI (License No. RBI/2024/123456)</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Export Modal */}
      {showExportModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Export Transactions</h3>
              <button
                onClick={() => setShowExportModal(false)}
                className="text-gray-400 hover:text-gray-500"
              >
                <FaTimesCircle className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Export Period</label>
                <select
                  value={exportPeriod}
                  onChange={(e) => setExportPeriod(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                >
                  <option value="all">All Time</option>
                  <option value="last_month">Last Month</option>
                  <option value="last_3_months">Last 3 Months</option>
                  <option value="last_6_months">Last 6 Months</option>
                  <option value="last_year">Last Year</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Export Format</label>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      value="pdf"
                      checked={exportFormat === 'pdf'}
                      onChange={(e) => setExportFormat(e.target.value)}
                      className="h-4 w-4 text-green-600 focus:ring-green-500"
                    />
                    <span className="ml-2">PDF</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      value="csv"
                      checked={exportFormat === 'csv'}
                      onChange={(e) => setExportFormat(e.target.value)}
                      className="h-4 w-4 text-green-600 focus:ring-green-500"
                    />
                    <span className="ml-2">CSV</span>
                  </label>
                </div>
              </div>
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setShowExportModal(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900"
                >
                  Cancel
                </button>
                <button
                  onClick={handleExportTransactions}
                  className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700"
                >
                  Export
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Transaction Details Modal */}
      {showTransactionDetails && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Transaction Details</h3>
              <button
                onClick={() => setShowTransactionDetails(null)}
                className="text-gray-400 hover:text-gray-500"
              >
                <FaTimesCircle className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-600">Description</p>
                <p className="text-lg font-medium text-gray-900">{showTransactionDetails.description}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Amount</p>
                  <p className={`text-lg font-medium ${
                    showTransactionDetails.type === 'credit' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {showTransactionDetails.type === 'credit' ? '+' : '-'}₹{showTransactionDetails.amount.toLocaleString()}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Category</p>
                  <p className="text-lg font-medium text-gray-900">{showTransactionDetails.category}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Date</p>
                  <p className="text-lg font-medium text-gray-900">{showTransactionDetails.date}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Time</p>
                  <p className="text-lg font-medium text-gray-900">{showTransactionDetails.time}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Status</p>
                  <p className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    showTransactionDetails.status === 'completed' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {showTransactionDetails.status === 'completed' ? (
                      <FaCheckCircle className="w-3 h-3 mr-1" />
                    ) : (
                      <FaSpinner className="w-3 h-3 mr-1 animate-spin" />
                    )}
                    {showTransactionDetails.status}
                  </p>
                </div>
              </div>
              {transactionNotes[showTransactionDetails.id] && (
                <div>
                  <p className="text-sm text-gray-600">Note</p>
                  <p className="text-lg font-medium text-gray-900">{transactionNotes[showTransactionDetails.id].text}</p>
                  <p className="text-xs text-gray-400 mt-1">
                    Added on {transactionNotes[showTransactionDetails.id].timestamp}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Download Statement Modal */}
      {showDownloadModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Download Statement</h3>
              <button
                onClick={() => setShowDownloadModal(false)}
                className="text-gray-400 hover:text-gray-500"
              >
                <FaTimesCircle className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Statement Period</label>
                <select
                  value={statementPeriod}
                  onChange={(e) => setStatementPeriod(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                >
                  <option value="last_month">Last Month</option>
                  <option value="last_3_months">Last 3 Months</option>
                  <option value="last_6_months">Last 6 Months</option>
                  <option value="this_year">This Year</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Format</label>
                <div className="flex space-x-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      value="pdf"
                      checked={statementFormat === 'pdf'}
                      onChange={(e) => setStatementFormat(e.target.value)}
                      className="h-4 w-4 text-green-600 focus:ring-green-500"
                    />
                    <span className="ml-2 text-sm text-gray-700">PDF</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      value="csv"
                      checked={statementFormat === 'csv'}
                      onChange={(e) => setStatementFormat(e.target.value)}
                      className="h-4 w-4 text-green-600 focus:ring-green-500"
                    />
                    <span className="ml-2 text-sm text-gray-700">CSV</span>
                  </label>
                </div>
              </div>
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setShowDownloadModal(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDownloadStatement}
                  disabled={isLoading}
                  className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <span className="flex items-center">
                      <FaSpinner className="w-4 h-4 mr-2 animate-spin" />
                      Downloading...
                    </span>
                  ) : (
                    'Download'
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Notification */}
      {notification.show && (
        <div className={`fixed bottom-4 right-4 px-4 py-2 rounded-lg shadow-lg ${
          notification.type === 'success' ? 'bg-green-500' : 'bg-red-500'
        } text-white`}>
          {notification.message}
        </div>
      )}
    </div>
  );
};

export default SavingsAccount; 