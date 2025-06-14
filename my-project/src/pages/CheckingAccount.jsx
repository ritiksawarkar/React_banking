import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FaMoneyBillWave, FaExchangeAlt, FaHistory, FaDownload, 
  FaFileInvoiceDollar, FaChartLine, FaCreditCard, FaArrowUp, 
  FaArrowDown, FaCalendarAlt, FaClock, FaUserCircle, FaBuilding,
  FaCheckCircle, FaTimesCircle, FaSpinner, FaSearch, FaFilter,
  FaEnvelope, FaTag, FaLightbulb, FaChartBar, FaKeyboard
} from 'react-icons/fa';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

const CheckingAccount = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [transactionNotes, setTransactionNotes] = useState({});
  const [showNoteInput, setShowNoteInput] = useState(null);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [amountRange, setAmountRange] = useState({ min: '', max: '' });
  const [hoveredAction, setHoveredAction] = useState(null);
  const [showDownloadModal, setShowDownloadModal] = useState(false);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [statementPeriod, setStatementPeriod] = useState('last_month');
  const [statementFormat, setStatementFormat] = useState('pdf');
  const [emailAddress, setEmailAddress] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [notification, setNotification] = useState({ show: false, type: '', message: '' });
  const [showTransactionDetails, setShowTransactionDetails] = useState(null);
  const [noteInput, setNoteInput] = useState('');
  const [showExportModal, setShowExportModal] = useState(false);
  const [exportFormat, setExportFormat] = useState('pdf');
  const [exportPeriod, setExportPeriod] = useState('all');
  const [displayedTransactions, setDisplayedTransactions] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const transactionsPerPage = 5;

  // Account Holder Info
  const accountHolder = {
    name: 'Ritik Sawarkar',
    phone: '+91-9876543210',
    email: 'ritik@finverse.com',
    location: 'Pune, India'
  };

  // Account Overview Data
  const accountData = {
    accountNumber: '1234567890',
    accountType: 'Premium Checking',
    balance: 24800.00,
    availableBalance: 24500.00,
    pendingTransactions: 300.00,
    lastUpdated: new Date().toLocaleString(),
    status: 'Active',
    branch: 'Pune Main Branch',
    ifscCode: 'FINV0001234'
  };

  // Recent Transactions
  const recentTransactions = [
    {
      id: 1,
      type: 'credit',
      amount: 5000.00,
      description: 'Salary Deposit',
      date: '2024-03-15',
      time: '09:30 AM',
      status: 'completed',
      category: 'Income'
    },
    {
      id: 2,
      type: 'debit',
      amount: 1200.00,
      description: 'Grocery Store',
      date: '2024-03-14',
      time: '02:15 PM',
      status: 'completed',
      category: 'Shopping'
    },
    {
      id: 3,
      type: 'debit',
      amount: 800.00,
      description: 'Electricity Bill',
      date: '2024-03-13',
      time: '11:45 AM',
      status: 'pending',
      category: 'Bills'
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
    },
    { 
      id: 'email',
      icon: <FaEnvelope />, 
      title: 'Email Statement', 
      description: 'Get statement via email',
      color: 'indigo',
      isNew: false,
      route: '/email-statement'
    },
    { 
      id: 'schedule',
      icon: <FaCalendarAlt />, 
      title: 'Schedule Payment', 
      description: 'Set up recurring payments',
      color: 'red',
      isNew: true,
      route: '/transactions/scheduled'
    }
  ];

  // Show notification
  const showNotification = (type, message) => {
    setNotification({ show: true, type, message });
    setTimeout(() => {
      setNotification({ show: false, type: '', message: '' });
    }, 3000);
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
        doc.text('Bank Statement', 105, 20, { align: 'center' });
        
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
        
        // Add transaction table
        doc.setFontSize(14);
        doc.text('Recent Transactions', 20, 140);
        
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
          startY: 150,
          head: [['Date', 'Description', 'Category', 'Amount', 'Status']],
          body: tableData,
          theme: 'grid',
          headStyles: { fillColor: [79, 70, 229] },
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
        doc.save(`statement_${statementPeriod}_${new Date().toISOString().split('T')[0]}.pdf`);
      } else {
        // Handle CSV format
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
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `statement_${statementPeriod}_${new Date().toISOString().split('T')[0]}.csv`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
      }
      
      setShowDownloadModal(false);
      showNotification('success', 'Statement downloaded successfully!');
    } catch (error) {
      console.error('Error downloading statement:', error);
      showNotification('error', 'Failed to download statement. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Handle email statement
  const handleEmailStatement = async () => {
    if (!emailAddress || !emailAddress.includes('@')) {
      showNotification('error', 'Please enter a valid email address');
      return;
    }

    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Simulate successful email sending
      showNotification('success', `Statement has been sent to ${emailAddress}`);
      setShowEmailModal(false);
      setEmailAddress('');
    } catch (error) {
      console.error('Error sending statement:', error);
      showNotification('error', 'Failed to send statement. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Handle quick action click with routing
  const handleQuickActionClick = (action) => {
    switch (action.id) {
      case 'statement':
        setShowDownloadModal(true);
        break;
      case 'email':
        setShowEmailModal(true);
        break;
      default:
        navigate(action.route);
        break;
    }
  };

  // Balance Summary Data
  const balanceData = {
    available: accountData.availableBalance,
    pending: accountData.pendingTransactions,
    autoDeductions: 1500.00
  };

  const total = balanceData.available + balanceData.pending + balanceData.autoDeductions;
  const availablePercentage = (balanceData.available / total) * 100;
  const pendingPercentage = (balanceData.pending / total) * 100;
  const autoDeductionsPercentage = (balanceData.autoDeductions / total) * 100;

  // Smart Suggestions
  const smartSuggestions = [
    {
      id: 1,
      message: "You paid ₹800 for electricity 2 times this month. Consider setting auto-payment?",
      type: 'bill'
    },
    {
      id: 2,
      message: "Your grocery spending is 15% higher than last month.",
      type: 'spending'
    }
  ];

  // Transaction Categories with Icons
  const transactionCategories = [
    { id: 'all', name: 'All Categories', icon: <FaHistory />, color: 'indigo' },
    { id: 'Income', name: 'Income', icon: <FaArrowDown />, color: 'green' },
    { id: 'Bills', name: 'Bills', icon: <FaFileInvoiceDollar />, color: 'yellow' },
    { id: 'Shopping', name: 'Shopping', icon: <FaCreditCard />, color: 'blue' },
    { id: 'Transfer', name: 'Transfer', icon: <FaExchangeAlt />, color: 'purple' }
  ];

  // Transaction Statuses
  const transactionStatuses = [
    { id: 'all', name: 'All Status', icon: <FaHistory /> },
    { id: 'completed', name: 'Completed', icon: <FaCheckCircle /> },
    { id: 'pending', name: 'Pending', icon: <FaSpinner /> },
    { id: 'failed', name: 'Failed', icon: <FaTimesCircle /> }
  ];

  // Handle transaction note
  const handleAddNote = (transactionId, note) => {
    if (!note.trim()) {
      showNotification('error', 'Note cannot be empty');
      return;
    }
    setTransactionNotes(prev => ({
      ...prev,
      [transactionId]: {
        text: note,
        date: new Date().toLocaleString(),
        id: Date.now()
      }
    }));
    setShowNoteInput(null);
    setNoteInput('');
    showNotification('success', 'Note added successfully');
  };

  // Handle delete note
  const handleDeleteNote = (transactionId) => {
    setTransactionNotes(prev => {
      const newNotes = { ...prev };
      delete newNotes[transactionId];
      return newNotes;
    });
    showNotification('success', 'Note deleted successfully');
  };

  // Update the filteredTransactions function to work with displayedTransactions
  const filteredTransactions = displayedTransactions.filter(transaction => {
    const matchesSearch = transaction.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || transaction.category.toLowerCase() === selectedCategory.toLowerCase();
    const matchesStatus = selectedStatus === 'all' || transaction.status.toLowerCase() === selectedStatus.toLowerCase();
    const matchesDate = (!dateRange.start || transaction.date >= dateRange.start) && 
                       (!dateRange.end || transaction.date <= dateRange.end);
    const matchesAmount = (!amountRange.min || transaction.amount >= parseFloat(amountRange.min)) &&
                         (!amountRange.max || transaction.amount <= parseFloat(amountRange.max));
    return matchesSearch && matchesCategory && matchesStatus && matchesDate && matchesAmount;
  });

  // Transaction Status Colors
  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Transaction Type Icons
  const getTransactionIcon = (type) => {
    switch (type) {
      case 'credit':
        return <FaArrowDown className="w-5 h-5" />;
      case 'debit':
        return <FaArrowUp className="w-5 h-5" />;
      default:
        return <FaExchangeAlt className="w-5 h-5" />;
    }
  };

  // Add this function after other handler functions
  const handleExportTransactions = async () => {
    setIsLoading(true);
    try {
      // Filter transactions based on export period
      let transactionsToExport = [...recentTransactions];
      if (exportPeriod !== 'all') {
        const now = new Date();
        const cutoffDate = new Date();
        switch (exportPeriod) {
          case 'last_week':
            cutoffDate.setDate(now.getDate() - 7);
            break;
          case 'last_month':
            cutoffDate.setMonth(now.getMonth() - 1);
            break;
          case 'last_3_months':
            cutoffDate.setMonth(now.getMonth() - 3);
            break;
          default:
            break;
        }
        transactionsToExport = transactionsToExport.filter(t => new Date(t.date) >= cutoffDate);
      }

      if (exportFormat === 'pdf') {
        // Create PDF document
        const doc = new jsPDF();
        
        // Add header
        doc.setFontSize(20);
        doc.text('Transaction History', 105, 20, { align: 'center' });
        
        // Add account details
        doc.setFontSize(12);
        doc.text(`Account Number: ${accountData.accountNumber}`, 20, 40);
        doc.text(`Account Holder: ${accountHolder.name}`, 20, 50);
        doc.text(`Export Date: ${new Date().toLocaleDateString()}`, 20, 60);
        
        // Add transaction table
        doc.setFontSize(14);
        doc.text('Transactions', 20, 80);
        
        // Prepare table data
        const tableData = transactionsToExport.map(transaction => [
          transaction.date,
          transaction.description,
          transaction.category,
          transaction.type === 'credit' ? `+₹${transaction.amount}` : `-₹${transaction.amount}`,
          transaction.status
        ]);
        
        // Add table using autoTable
        autoTable(doc, {
          startY: 90,
          head: [['Date', 'Description', 'Category', 'Amount', 'Status']],
          body: tableData,
          theme: 'grid',
          headStyles: { fillColor: [79, 70, 229] },
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
        doc.save(`transactions_${exportPeriod}_${new Date().toISOString().split('T')[0]}.pdf`);
      } else {
        // Handle CSV format
        const headers = ['Date', 'Description', 'Category', 'Amount', 'Status'];
        const csvData = transactionsToExport.map(transaction => [
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
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `transactions_${exportPeriod}_${new Date().toISOString().split('T')[0]}.csv`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
      }
      
      setShowExportModal(false);
      showNotification('success', 'Transactions exported successfully!');
    } catch (error) {
      console.error('Error exporting transactions:', error);
      showNotification('error', 'Failed to export transactions. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Update the useEffect to handle filtering
  useEffect(() => {
    // Initialize with first page of transactions
    const initialTransactions = recentTransactions.slice(0, transactionsPerPage);
    setDisplayedTransactions(initialTransactions);
    setPage(1);
  }, [searchQuery, selectedCategory, selectedStatus, dateRange, amountRange]);

  // Update the loadMoreTransactions function to handle filtered results
  const loadMoreTransactions = async () => {
    setIsLoadingMore(true);
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Calculate next page of transactions
      const nextPage = page + 1;
      const startIndex = 0;
      const endIndex = nextPage * transactionsPerPage;
      
      // Get next set of transactions
      const nextTransactions = recentTransactions.slice(startIndex, endIndex);
      
      setDisplayedTransactions(nextTransactions);
      setPage(nextPage);
      
      // Show success notification if we've loaded all transactions
      if (endIndex >= recentTransactions.length) {
        showNotification('success', 'All transactions loaded');
      }
    } catch (error) {
      console.error('Error loading more transactions:', error);
      showNotification('error', 'Failed to load more transactions');
    } finally {
      setIsLoadingMore(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-50">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-24">
        {/* Account Header */}
        <div className="mb-8">
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="bg-gradient-to-r from-indigo-600 to-blue-600 px-6 py-8">
              <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6">
                <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border-4 border-white/30">
                  <FaMoneyBillWave className="w-8 h-8 text-white" />
                </div>
                <div className="text-center md:text-left">
                  <h1 className="text-2xl font-bold text-white">Checking Account</h1>
                  <p className="text-indigo-100 mt-1">Account Number: {accountData.accountNumber}</p>
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
                <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center">
                  <FaUserCircle className="w-6 h-6 text-indigo-600" />
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
            {/* Balance Overview with Custom Chart */}
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
                    <p className="text-sm text-gray-600">Pending Transactions</p>
                    <p className="text-2xl font-bold text-gray-900 mt-1">₹{accountData.pendingTransactions.toLocaleString()}</p>
                    <p className="text-xs text-gray-500 mt-1">Will be processed soon</p>
                  </div>
                </div>
                <div className="mt-6">
                  <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
                    <div className="flex h-full">
                      <div 
                        className="bg-green-500 h-full transition-all duration-500"
                        style={{ width: `${availablePercentage}%` }}
                      ></div>
                      <div 
                        className="bg-yellow-500 h-full transition-all duration-500"
                        style={{ width: `${pendingPercentage}%` }}
                      ></div>
                      <div 
                        className="bg-red-500 h-full transition-all duration-500"
                        style={{ width: `${autoDeductionsPercentage}%` }}
                      ></div>
                    </div>
                  </div>
                  <div className="mt-4 grid grid-cols-3 gap-4">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                      <span className="text-sm text-gray-600">Available (₹{balanceData.available.toLocaleString()})</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                      <span className="text-sm text-gray-600">Pending (₹{balanceData.pending.toLocaleString()})</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 rounded-full bg-red-500"></div>
                      <span className="text-sm text-gray-600">Auto-deductions (₹{balanceData.autoDeductions.toLocaleString()})</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Enhanced Quick Actions */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-all duration-300">
              <div className="px-6 py-4 border-b border-gray-100">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">Quick Actions</h2>
                  <p className="text-sm text-gray-500 mt-1">Common banking tasks at your fingertips</p>
                </div>
              </div>

              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {quickActions.map((action) => (
                    <button
                      key={action.id}
                      onClick={() => handleQuickActionClick(action)}
                      onMouseEnter={() => setHoveredAction(action.id)}
                      onMouseLeave={() => setHoveredAction(null)}
                      className={`p-4 rounded-lg transition-all duration-200 relative overflow-hidden group ${
                        hoveredAction === action.id ? 'shadow-md' : 'hover:shadow-sm'
                      }`}
                    >
                      {/* Background gradient */}
                      <div className={`absolute inset-0 bg-gradient-to-br from-${action.color}-50 to-white opacity-0 group-hover:opacity-100 transition-opacity duration-200`}></div>
                      
                      {/* Content */}
                      <div className="relative flex items-start space-x-4">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center bg-${action.color}-100 text-${action.color}-600 transition-transform duration-200 group-hover:scale-110`}>
                          {action.icon}
                        </div>
                        <div className="flex-1 text-left">
                          <div className="flex items-center space-x-2">
                            <h3 className="font-medium text-gray-900">{action.title}</h3>
                            {action.isNew && (
                              <span className="px-2 py-0.5 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                                New
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-gray-500 mt-1">{action.description}</p>
                        </div>
                      </div>

                      {/* Hover effect */}
                      <div className={`absolute inset-0 border-2 border-${action.color}-500 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-lg`}></div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Recent Transactions with Enhanced UI */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-all duration-300">
              <div className="px-6 py-4 border-b border-gray-100">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900">Recent Transactions</h2>
                    <p className="text-sm text-gray-500 mt-1">View and manage your recent transactions</p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <button 
                      onClick={() => setShowExportModal(true)}
                      className="px-4 py-2 text-sm font-medium text-indigo-600 hover:text-indigo-700 flex items-center space-x-2"
                    >
                      <FaDownload className="w-4 h-4" />
                      <span>Export</span>
                    </button>
                    <button 
                      onClick={() => navigate('/transactions/history')}
                      className="px-4 py-2 text-sm font-medium text-indigo-600 hover:text-indigo-700 flex items-center space-x-2"
                    >
                      <FaHistory className="w-4 h-4" />
                      <span>View All</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Enhanced Transaction Filters */}
              <div className="px-6 py-4 bg-gray-50 border-b border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium text-gray-900">Transaction Filters</h3>
                  <button
                    onClick={() => setShowFilters(!showFilters)}
                    className="flex items-center space-x-2 text-sm font-medium text-indigo-600 hover:text-indigo-700"
                  >
                    <FaFilter className="w-4 h-4" />
                    <span>{showFilters ? 'Hide Filters' : 'Show Filters'}</span>
                  </button>
                </div>

                {/* Quick Search */}
                <div className="relative mb-4">
                  <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search transactions by description..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>

                {showFilters && (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {/* Category Filter */}
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">Category</label>
                      <div className="flex flex-wrap gap-2">
                        {transactionCategories.map(category => (
                          <button
                            key={category.id}
                            onClick={() => setSelectedCategory(category.id)}
                            className={`inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium transition-colors duration-200 ${
                              selectedCategory === category.id
                                ? `bg-${category.color}-100 text-${category.color}-700`
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                          >
                            {category.icon}
                            <span className="ml-1.5">{category.name}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Status Filter */}
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">Status</label>
                      <div className="flex flex-wrap gap-2">
                        {transactionStatuses.map(status => (
                          <button
                            key={status.id}
                            onClick={() => setSelectedStatus(status.id)}
                            className={`inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium transition-colors duration-200 ${
                              selectedStatus === status.id
                                ? 'bg-indigo-100 text-indigo-700'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                          >
                            {status.icon}
                            <span className="ml-1.5">{status.name}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Date Range Filter */}
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">Date Range</label>
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <input
                            type="date"
                            value={dateRange.start}
                            onChange={(e) => setDateRange(prev => ({ ...prev, start: e.target.value }))}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                          />
                        </div>
                        <div>
                          <input
                            type="date"
                            value={dateRange.end}
                            onChange={(e) => setDateRange(prev => ({ ...prev, end: e.target.value }))}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Amount Range Filter */}
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">Amount Range</label>
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <input
                            type="number"
                            placeholder="Min"
                            value={amountRange.min}
                            onChange={(e) => setAmountRange(prev => ({ ...prev, min: e.target.value }))}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                          />
                        </div>
                        <div>
                          <input
                            type="number"
                            placeholder="Max"
                            value={amountRange.max}
                            onChange={(e) => setAmountRange(prev => ({ ...prev, max: e.target.value }))}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Active Filters */}
                <div className="mt-4 flex flex-wrap gap-2">
                  {selectedCategory !== 'all' && (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                      Category: {transactionCategories.find(c => c.id === selectedCategory)?.name}
                      <button
                        onClick={() => setSelectedCategory('all')}
                        className="ml-1.5 text-indigo-600 hover:text-indigo-800"
                      >
                        ×
                      </button>
                    </span>
                  )}
                  {selectedStatus !== 'all' && (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                      Status: {transactionStatuses.find(s => s.id === selectedStatus)?.name}
                      <button
                        onClick={() => setSelectedStatus('all')}
                        className="ml-1.5 text-indigo-600 hover:text-indigo-800"
                      >
                        ×
                      </button>
                    </span>
                  )}
                  {(dateRange.start || dateRange.end) && (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                      Date: {dateRange.start} to {dateRange.end}
                      <button
                        onClick={() => setDateRange({ start: '', end: '' })}
                        className="ml-1.5 text-indigo-600 hover:text-indigo-800"
                      >
                        ×
                      </button>
                    </span>
                  )}
                  {(amountRange.min || amountRange.max) && (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                      Amount: ₹{amountRange.min || '0'} to ₹{amountRange.max || '∞'}
                      <button
                        onClick={() => setAmountRange({ min: '', max: '' })}
                        className="ml-1.5 text-indigo-600 hover:text-indigo-800"
                      >
                        ×
                      </button>
                    </span>
                  )}
                </div>
              </div>

              {/* Transactions List */}
              <div className="divide-y divide-gray-100">
                {filteredTransactions.length > 0 ? (
                  filteredTransactions.map((transaction) => (
                    <div
                      key={transaction.id}
                      className="p-4 hover:bg-gray-50 transition-colors duration-200"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            transaction.type === 'credit' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                          }`}>
                            {getTransactionIcon(transaction.type)}
                          </div>
                          <div>
                            <div className="flex items-center space-x-2">
                              <p className="font-medium text-gray-900">{transaction.description}</p>
                              {transactionNotes[transaction.id] && (
                                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-indigo-100 text-indigo-800">
                                  <FaTag className="w-3 h-3 mr-1" />
                                  {transactionNotes[transaction.id].text}
                                </span>
                              )}
                            </div>
                            <div className="flex items-center space-x-2 mt-1">
                              <span className="text-sm text-gray-500">{transaction.category}</span>
                              <span className="text-sm text-gray-500">•</span>
                              <span className="text-sm text-gray-500">{transaction.date}</span>
                              <span className="text-sm text-gray-500">•</span>
                              <span className="text-sm text-gray-500">{transaction.time}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4">
                          <div className="text-right">
                            <p className={`font-medium ${
                              transaction.type === 'credit' ? 'text-green-600' : 'text-red-600'
                            }`}>
                              {transaction.type === 'credit' ? '+' : '-'}₹{transaction.amount.toLocaleString()}
                            </p>
                            <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium mt-1 ${getStatusColor(transaction.status)}`}>
                              {transaction.status === 'completed' ? (
                                <FaCheckCircle className="w-3 h-3 mr-1" />
                              ) : transaction.status === 'pending' ? (
                                <FaSpinner className="w-3 h-3 mr-1 animate-spin" />
                              ) : (
                                <FaTimesCircle className="w-3 h-3 mr-1" />
                              )}
                              {transaction.status}
                            </span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => {
                                setShowNoteInput(showNoteInput === transaction.id ? null : transaction.id);
                                setNoteInput(transactionNotes[transaction.id]?.text || '');
                              }}
                              className="p-2 text-gray-400 hover:text-indigo-600 rounded-lg hover:bg-indigo-50 transition-colors duration-200"
                              title="Add note"
                            >
                              <FaTag className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => setShowTransactionDetails(transaction)}
                              className="p-2 text-gray-400 hover:text-indigo-600 rounded-lg hover:bg-indigo-50 transition-colors duration-200"
                              title="View details"
                            >
                              <FaHistory className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                      {showNoteInput === transaction.id && (
                        <div className="mt-3 pl-14">
                          <div className="flex items-center space-x-2">
                            <input
                              type="text"
                              value={noteInput}
                              onChange={(e) => setNoteInput(e.target.value)}
                              placeholder="Add a note..."
                              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                              onKeyPress={(e) => {
                                if (e.key === 'Enter') {
                                  handleAddNote(transaction.id, noteInput);
                                }
                              }}
                            />
                            <button
                              onClick={() => handleAddNote(transaction.id, noteInput)}
                              className="px-3 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700"
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
                            {transactionNotes[transaction.id] && (
                              <button
                                onClick={() => handleDeleteNote(transaction.id)}
                                className="px-3 py-2 text-sm font-medium text-red-600 hover:text-red-700"
                              >
                                Delete
                              </button>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  ))
                ) : (
                  <div className="p-8 text-center">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
                      <FaHistory className="w-8 h-8 text-gray-400" />
                    </div>
                    <p className="text-gray-500 font-medium">No transactions found</p>
                    <p className="text-sm text-gray-400 mt-1">Try adjusting your filters</p>
                  </div>
                )}
              </div>

              {/* Transaction Summary */}
              <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <span className="text-sm text-gray-500">
                      Showing {filteredTransactions.length} of {recentTransactions.length} transactions
                    </span>
                    <span className="text-sm text-gray-500">•</span>
                    <span className="text-sm text-gray-500">
                      Total: ₹{filteredTransactions.reduce((sum, t) => sum + (t.type === 'credit' ? t.amount : -t.amount), 0).toLocaleString()}
                    </span>
                  </div>
                  {filteredTransactions.length < recentTransactions.length && (
                    <button
                      onClick={loadMoreTransactions}
                      disabled={isLoadingMore}
                      className="text-sm font-medium text-indigo-600 hover:text-indigo-700 flex items-center space-x-2 disabled:opacity-50"
                    >
                      {isLoadingMore ? (
                        <>
                          <FaSpinner className="w-4 h-4 animate-spin" />
                          <span>Loading...</span>
                        </>
                      ) : (
                        <>
                          <FaArrowDown className="w-4 h-4" />
                          <span>Load More</span>
                        </>
                      )}
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Smart Suggestions */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-all duration-300">
              <div className="px-6 py-4 border-b border-gray-100">
                <h2 className="text-xl font-semibold text-gray-900">Smart Suggestions</h2>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {smartSuggestions.map((suggestion) => (
                    <div key={suggestion.id} className="flex items-start space-x-3 p-4 bg-indigo-50 rounded-lg">
                      <FaLightbulb className="w-5 h-5 text-indigo-600 mt-0.5" />
                      <p className="text-sm text-gray-700">{suggestion.message}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
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

            {/* Account Status */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-all duration-300">
              <div className="px-6 py-4 border-b border-gray-100">
                <h2 className="text-xl font-semibold text-gray-900">Account Status</h2>
              </div>
              <div className="p-6 space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:shadow-sm transition-all duration-300">
                  <div className="flex items-center space-x-3">
                    <FaCheckCircle className="w-5 h-5 text-green-600" />
                    <div>
                      <p className="text-sm text-gray-600">Status</p>
                      <p className="text-sm font-medium text-gray-900">{accountData.status}</p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:shadow-sm transition-all duration-300">
                  <div className="flex items-center space-x-3">
                    <FaClock className="w-5 h-5 text-indigo-600" />
                    <div>
                      <p className="text-sm text-gray-600">Last Updated</p>
                      <p className="text-sm font-medium text-gray-900">{accountData.lastUpdated}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Notification */}
        {notification.show && (
          <div className={`fixed top-4 right-4 z-50 px-6 py-3 rounded-lg shadow-lg transform transition-all duration-300 ${
            notification.type === 'success' ? 'bg-green-500' : 'bg-red-500'
          } text-white`}>
            <div className="flex items-center space-x-2">
              {notification.type === 'success' ? (
                <FaCheckCircle className="w-5 h-5" />
              ) : (
                <FaTimesCircle className="w-5 h-5" />
              )}
              <p>{notification.message}</p>
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
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
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
                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500"
                      />
                      <span className="ml-2 text-sm text-gray-700">PDF</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        value="csv"
                        checked={statementFormat === 'csv'}
                        onChange={(e) => setStatementFormat(e.target.value)}
                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500"
                      />
                      <span className="ml-2 text-sm text-gray-700">CSV</span>
                    </label>
                  </div>
                </div>
              </div>
              <div className="mt-6 flex justify-end space-x-3">
                <button
                  onClick={() => setShowDownloadModal(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-800"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDownloadStatement}
                  disabled={isLoading}
                  className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
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
        )}

        {/* Email Statement Modal */}
        {showEmailModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Email Statement</h3>
                <button
                  onClick={() => setShowEmailModal(false)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <FaTimesCircle className="w-5 h-5" />
                </button>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                  <input
                    type="email"
                    value={emailAddress}
                    onChange={(e) => setEmailAddress(e.target.value)}
                    placeholder="Enter email address"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Statement Period</label>
                  <select
                    value={statementPeriod}
                    onChange={(e) => setStatementPeriod(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  >
                    <option value="last_month">Last Month</option>
                    <option value="last_3_months">Last 3 Months</option>
                    <option value="last_6_months">Last 6 Months</option>
                    <option value="this_year">This Year</option>
                  </select>
                </div>
              </div>
              <div className="mt-6 flex justify-end space-x-3">
                <button
                  onClick={() => setShowEmailModal(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-800"
                >
                  Cancel
                </button>
                <button
                  onClick={handleEmailStatement}
                  disabled={isLoading || !emailAddress}
                  className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
                >
                  {isLoading ? (
                    <span className="flex items-center">
                      <FaSpinner className="w-4 h-4 mr-2 animate-spin" />
                      Sending...
                    </span>
                  ) : (
                    'Send'
                  )}
                </button>
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
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                      showTransactionDetails.type === 'credit' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                    }`}>
                      {getTransactionIcon(showTransactionDetails.type)}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{showTransactionDetails.description}</p>
                      <p className="text-sm text-gray-500">{showTransactionDetails.category}</p>
                    </div>
                  </div>
                  <p className={`text-xl font-bold ${
                    showTransactionDetails.type === 'credit' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {showTransactionDetails.type === 'credit' ? '+' : '-'}₹{showTransactionDetails.amount.toLocaleString()}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-500">Date & Time</p>
                    <p className="font-medium text-gray-900">{showTransactionDetails.date} {showTransactionDetails.time}</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-500">Status</p>
                    <span className={`inline-flex items-center px-2 py-1 rounded text-sm font-medium mt-1 ${getStatusColor(showTransactionDetails.status)}`}>
                      {showTransactionDetails.status === 'completed' ? (
                        <FaCheckCircle className="w-4 h-4 mr-1" />
                      ) : showTransactionDetails.status === 'pending' ? (
                        <FaSpinner className="w-4 h-4 mr-1 animate-spin" />
                      ) : (
                        <FaTimesCircle className="w-4 h-4 mr-1" />
                      )}
                      {showTransactionDetails.status}
                    </span>
                  </div>
                </div>

                {transactionNotes[showTransactionDetails.id] && (
                  <div className="p-4 bg-indigo-50 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <FaTag className="w-4 h-4 text-indigo-600" />
                        <p className="text-sm font-medium text-indigo-900">Note</p>
                      </div>
                      <p className="text-xs text-indigo-500">{transactionNotes[showTransactionDetails.id].date}</p>
                    </div>
                    <p className="mt-2 text-sm text-indigo-700">{transactionNotes[showTransactionDetails.id].text}</p>
                  </div>
                )}

                <div className="flex justify-end space-x-3 mt-6">
                  <button
                    onClick={() => {
                      setShowTransactionDetails(null);
                      setShowNoteInput(showTransactionDetails.id);
                      setNoteInput(transactionNotes[showTransactionDetails.id]?.text || '');
                    }}
                    className="px-4 py-2 text-sm font-medium text-indigo-600 hover:text-indigo-700"
                  >
                    {transactionNotes[showTransactionDetails.id] ? 'Edit Note' : 'Add Note'}
                  </button>
                  <button
                    onClick={() => setShowTransactionDetails(null)}
                    className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

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
                  <label className="block text-sm font-medium text-gray-700 mb-1">Export Period</label>
                  <select
                    value={exportPeriod}
                    onChange={(e) => setExportPeriod(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  >
                    <option value="all">All Transactions</option>
                    <option value="last_week">Last Week</option>
                    <option value="last_month">Last Month</option>
                    <option value="last_3_months">Last 3 Months</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Format</label>
                  <div className="flex space-x-4">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        value="pdf"
                        checked={exportFormat === 'pdf'}
                        onChange={(e) => setExportFormat(e.target.value)}
                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500"
                      />
                      <span className="ml-2 text-sm text-gray-700">PDF</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        value="csv"
                        checked={exportFormat === 'csv'}
                        onChange={(e) => setExportFormat(e.target.value)}
                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500"
                      />
                      <span className="ml-2 text-sm text-gray-700">CSV</span>
                    </label>
                  </div>
                </div>
              </div>
              <div className="mt-6 flex justify-end space-x-3">
                <button
                  onClick={() => setShowExportModal(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-800"
                >
                  Cancel
                </button>
                <button
                  onClick={handleExportTransactions}
                  disabled={isLoading}
                  className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
                >
                  {isLoading ? (
                    <span className="flex items-center">
                      <FaSpinner className="w-4 h-4 mr-2 animate-spin" />
                      Exporting...
                    </span>
                  ) : (
                    'Export'
                  )}
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default CheckingAccount; 