import React, { useState, useEffect } from 'react';
import DashboardPageHeader from '../components/DashboardPageHeader';
import DashboardPageFooter from '../components/DashboardPageFooter';
import { 
  FaUser, FaCheckCircle, FaTimes, FaArrowLeft, FaHistory, 
  FaQuestionCircle, FaLock, FaExclamationTriangle, FaDownload,
  FaShare, FaMobile, FaUniversity, FaIdCard, FaCalendarAlt,
  FaClock, FaSearch, FaFilter, FaSort, FaStar, FaTrash,
  FaEdit, FaPlus, FaChevronDown, FaChevronUp, FaInfoCircle,
  FaMoneyBillWave, FaExchangeAlt, FaQrcode, FaCamera,
  FaCreditCard, FaWallet, FaPiggyBank, FaChartPie, FaChartBar, FaChartArea, FaFingerprint, FaShieldAlt, FaBell
} from 'react-icons/fa';

// Mock data for demonstration
const initialContacts = [
  { id: 1, name: 'Amit Sharma', account: '1234567890', type: 'bank', bank: 'HDFC', ifsc: 'HDFC0000001', isFavorite: true },
  { id: 2, name: 'Priya Singh', upi: 'priya@oksbi', type: 'upi', isFavorite: true },
  { id: 3, name: 'Rahul Verma', mobile: '9876543210', type: 'mobile', isFavorite: false },
  { id: 4, name: 'Sneha Patel', account: '9876543210', type: 'bank', bank: 'ICICI', ifsc: 'ICIC0000001', isFavorite: false },
  { id: 5, name: 'Vikram Mehta', upi: 'vikram@paytm', type: 'upi', isFavorite: false },
];

const banks = [
  { code: 'HDFC', name: 'HDFC Bank', ifsc: 'HDFC0000001', logo: 'hdfc.png' },
  { code: 'ICIC', name: 'ICICI Bank', ifsc: 'ICIC0000001', logo: 'icici.png' },
  { code: 'SBIN', name: 'State Bank of India', ifsc: 'SBIN0000001', logo: 'sbi.png' },
  { code: 'AXIS', name: 'Axis Bank', ifsc: 'UTIB0000001', logo: 'axis.png' },
];

const accounts = [
  { id: 'savings', name: 'Savings Account', number: '9876543210', balance: 25000.00, type: 'savings' },
  { id: 'current', name: 'Current Account', number: '9876543211', balance: 75000.00, type: 'current' },
  { id: 'salary', name: 'Salary Account', number: '9876543212', balance: 150000.00, type: 'salary' },
];

const transactionHistory = [
  {
    id: 'TXN123456',
    type: 'credit',
    amount: 5000.00,
    recipient: 'Amit Sharma',
    method: 'bank',
    date: '2024-03-15',
    time: '09:30 AM',
    status: 'completed',
    note: 'Salary',
    fromAccount: '9876543210',
    toAccount: '1234567890'
  },
  {
    id: 'TXN123457',
    type: 'debit',
    amount: 2000.00,
    recipient: 'Priya Singh',
    method: 'upi',
    date: '2024-03-14',
    time: '02:15 PM',
    status: 'completed',
    note: 'Rent',
    fromAccount: '9876543210',
    toUpi: 'priya@oksbi'
  },
  // Add more transactions...
];

const scheduledTransfers = [
  {
    id: 'SCH123456',
    recipient: 'Rahul Verma',
    amount: 1000.00,
    method: 'mobile',
    date: '2024-03-20',
    time: '10:00 AM',
    frequency: 'monthly',
    status: 'pending',
    note: 'Monthly Rent'
  },
  // Add more scheduled transfers...
];

const Transfer = () => {
  const [step, setStep] = useState(1);
  const [transferType, setTransferType] = useState('bank');
  const [recipient, setRecipient] = useState('');
  const [recipientName, setRecipientName] = useState('');
  const [amount, setAmount] = useState('');
  const [note, setNote] = useState('');
  const [errors, setErrors] = useState({});
  const [selectedBank, setSelectedBank] = useState('');
  const [ifscCode, setIfscCode] = useState('');
  const [upiId, setUpiId] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [showHistory, setShowHistory] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState('');
  const [showBeneficiaries, setShowBeneficiaries] = useState(false);
  const [showScheduled, setShowScheduled] = useState(false);
  const [showQRScanner, setShowQRScanner] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [sortBy, setSortBy] = useState('date');
  const [sortOrder, setSortOrder] = useState('desc');
  const [showFilters, setShowFilters] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [transactionId, setTransactionId] = useState('');
  const [showAddBeneficiary, setShowAddBeneficiary] = useState(false);
  const [showReceipt, setShowReceipt] = useState(false);
  const [currentReceipt, setCurrentReceipt] = useState(null);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [transferFrequency, setTransferFrequency] = useState('once');
  const [theme, setTheme] = useState('light');
  const [showAnalytics, setShowAnalytics] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showSecurity, setShowSecurity] = useState(false);
  const [biometricEnabled, setBiometricEnabled] = useState(false);
  const [transferAnalytics, setTransferAnalytics] = useState({
    daily: 0,
    weekly: 0,
    monthly: 0,
    total: 0
  });
  const [contacts, setContacts] = useState(initialContacts);

  // Quick amount options
  const quickAmounts = [1000, 2000, 5000, 10000];

  // Theme colors
  const themeColors = {
    light: {
      primary: 'bg-indigo-600',
      secondary: 'bg-gray-50',
      text: 'text-gray-900',
      border: 'border-gray-200',
      hover: 'hover:bg-indigo-700',
      card: 'bg-white',
      gradient: 'from-indigo-50 via-white to-blue-50',
      accent: 'text-indigo-600',
      accentBg: 'bg-indigo-50',
      accentBorder: 'border-indigo-100',
      success: 'text-green-600',
      successBg: 'bg-green-50',
      successBorder: 'border-green-100',
      warning: 'text-yellow-600',
      warningBg: 'bg-yellow-50',
      warningBorder: 'border-yellow-100',
      error: 'text-red-600',
      errorBg: 'bg-red-50',
      errorBorder: 'border-red-100'
    },
    dark: {
      primary: 'bg-indigo-700',
      secondary: 'bg-gray-800',
      text: 'text-white',
      border: 'border-gray-700',
      hover: 'hover:bg-indigo-800',
      card: 'bg-gray-900',
      gradient: 'from-gray-900 via-gray-800 to-gray-900',
      accent: 'text-indigo-400',
      accentBg: 'bg-indigo-900',
      accentBorder: 'border-indigo-800',
      success: 'text-green-400',
      successBg: 'bg-green-900',
      successBorder: 'border-green-800',
      warning: 'text-yellow-400',
      warningBg: 'bg-yellow-900',
      warningBorder: 'border-yellow-800',
      error: 'text-red-400',
      errorBg: 'bg-red-900',
      errorBorder: 'border-red-800'
    }
  };

  // Filtered transactions
  const filteredTransactions = transactionHistory.filter(txn => {
    if (filterStatus !== 'all' && txn.status !== filterStatus) return false;
    if (searchQuery && !txn.recipient.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  }).sort((a, b) => {
    const dateA = new Date(`${a.date} ${a.time}`);
    const dateB = new Date(`${b.date} ${b.time}`);
    return sortOrder === 'desc' ? dateB - dateA : dateA - dateB;
  });

  // Handle QR code scanning
  const handleQRScan = (result) => {
    if (result) {
      try {
        const data = JSON.parse(result);
        if (data.type === 'upi') {
          setUpiId(data.id);
          setTransferType('upi');
        } else if (data.type === 'bank') {
          setRecipient(data.account);
          setSelectedBank(data.bank);
          setIfscCode(data.ifsc);
          setTransferType('bank');
        }
        setShowQRScanner(false);
      } catch (err) {
        console.error('Invalid QR code format:', err.message);
      }
    }
  };

  // Handle scheduled transfer
  const handleScheduleTransfer = () => {
    if (!validate()) return;
    
    const scheduledTransfer = {
      id: `SCH${Date.now()}`,
      recipient: recipientName || recipient || upiId || mobileNumber,
      amount: parseFloat(amount),
      method: transferType,
      date: selectedDate,
      time: selectedTime,
      frequency: transferFrequency,
      status: 'pending',
      note
    };

    scheduledTransfers.push(scheduledTransfer);
    setShowScheduled(false);
    setStep(1);
    // Show success message
  };

  // Handle beneficiary management
  const handleAddBeneficiary = (beneficiary) => {
    contacts.push(beneficiary);
    setShowAddBeneficiary(false);
    // Show success message
  };

  const handleToggleFavorite = (contactId) => {
    const updatedContacts = contacts.map(contact =>
      contact.id === contactId
        ? { ...contact, isFavorite: !contact.isFavorite }
        : contact
    );
    // Update contacts array with new values
    contacts.splice(0, contacts.length, ...updatedContacts);
    // Force re-render
    setContacts([...contacts]);
  };

  // Handle receipt generation
  const generateReceipt = (transaction) => {
    setCurrentReceipt(transaction);
    setShowReceipt(true);
  };

  // Handle transaction limits
  const checkTransactionLimit = (amount) => {
    const dailyLimit = 100000;
    const monthlyLimit = 1000000;
    
    if (amount > dailyLimit) {
      return `Amount exceeds daily limit of ₹${dailyLimit.toLocaleString()}`;
    }
    if (amount > monthlyLimit) {
      return `Amount exceeds monthly limit of ₹${monthlyLimit.toLocaleString()}`;
    }
    return null;
  };

  const validate = () => {
    const newErrors = {};
    
    // Check transaction limits
    const limitError = checkTransactionLimit(amount);
    if (limitError) {
      newErrors.limit = limitError;
    }
    
    // Existing validation logic
    switch (transferType) {
      case 'bank':
        if (!recipient || recipient.length < 8) newErrors.recipient = 'Enter a valid account number';
        if (!selectedBank) newErrors.bank = 'Please select a bank';
        if (!ifscCode || !/^[A-Z]{4}0[A-Z0-9]{6}$/.test(ifscCode)) newErrors.ifsc = 'Invalid IFSC code';
        break;
      case 'upi':
        if (!upiId || !/^[a-zA-Z0-9._-]+@[a-zA-Z]{3,}$/.test(upiId)) newErrors.upi = 'Invalid UPI ID';
        break;
      case 'mobile':
        if (!mobileNumber || !/^[6-9]\d{9}$/.test(mobileNumber)) newErrors.mobile = 'Invalid mobile number';
        break;
    }
    
    if (!amount || isNaN(amount) || parseFloat(amount) <= 0) newErrors.amount = 'Enter a valid amount';
    if (!selectedAccount) newErrors.account = 'Please select an account';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    setStep(2);
  };

  const handleConfirm = async () => {
    setIsProcessing(true);
    await new Promise((res) => setTimeout(res, 1500));
    setIsProcessing(false);
    setIsSuccess(true);
    setTransactionId(`TXN${Math.random().toString(36).substr(2, 9).toUpperCase()}`);
    setTimeout(() => {
      setStep(3);
    }, 2000);
  };

  const handleReset = () => {
    setStep(1);
    setRecipient('');
    setRecipientName('');
    setAmount('');
    setNote('');
    setSelectedBank('');
    setIfscCode('');
    setUpiId('');
    setMobileNumber('');
    setErrors({});
    setIsSuccess(false);
    setTransactionId('');
  };

  // New handlers
  const handleQuickAmount = (amount) => {
    setAmount(amount.toString());
  };

  const handleFilterChange = (status) => {
    setFilterStatus(status);
  };

  const handleSortChange = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('desc');
    }
  };

  // Add missing function definitions
  const handleContactSelect = (contact) => {
    setTransferType(contact.type);
    switch (contact.type) {
      case 'bank':
        setRecipient(contact.account);
        break;
      case 'upi':
        setUpiId(contact.upi);
        break;
      case 'mobile':
        setMobileNumber(contact.mobile);
        break;
    }
    setRecipientName(contact.name);
    setErrors({});
  };

  const handleBankSelect = (bank) => {
    setSelectedBank(bank.code);
    setIfscCode(bank.ifsc);
    setErrors({ ...errors, bank: undefined, ifsc: undefined });
  };

  // Toggle theme
  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  // Calculate transfer analytics
  useEffect(() => {
    const calculateAnalytics = () => {
      const now = new Date();
      const daily = transactionHistory.filter(t => {
        const date = new Date(t.date);
        return date.toDateString() === now.toDateString();
      }).reduce((sum, t) => sum + t.amount, 0);

      const weekly = transactionHistory.filter(t => {
        const date = new Date(t.date);
        const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        return date >= weekAgo;
      }).reduce((sum, t) => sum + t.amount, 0);

      const monthly = transactionHistory.filter(t => {
        const date = new Date(t.date);
        return date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear();
      }).reduce((sum, t) => sum + t.amount, 0);

      const total = transactionHistory.reduce((sum, t) => sum + t.amount, 0);

      setTransferAnalytics({ daily, weekly, monthly, total });
    };

    calculateAnalytics();
  }, []);

  // Render analytics section
  const renderAnalytics = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className={`p-4 rounded-lg ${themeColors[theme].card} ${themeColors[theme].border} border`}>
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-sm ${themeColors[theme].text} opacity-70`}>Daily Transfers</p>
              <p className={`text-2xl font-bold ${themeColors[theme].text}`}>₹{transferAnalytics.daily.toLocaleString()}</p>
            </div>
            <FaChartPie className="text-blue-500 text-2xl" />
          </div>
        </div>
        <div className={`p-4 rounded-lg ${themeColors[theme].card} ${themeColors[theme].border} border`}>
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-sm ${themeColors[theme].text} opacity-70`}>Weekly Transfers</p>
              <p className={`text-2xl font-bold ${themeColors[theme].text}`}>₹{transferAnalytics.weekly.toLocaleString()}</p>
            </div>
            <FaChartBar className="text-green-500 text-2xl" />
          </div>
        </div>
        <div className={`p-4 rounded-lg ${themeColors[theme].card} ${themeColors[theme].border} border`}>
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-sm ${themeColors[theme].text} opacity-70`}>Monthly Transfers</p>
              <p className={`text-2xl font-bold ${themeColors[theme].text}`}>₹{transferAnalytics.monthly.toLocaleString()}</p>
            </div>
            <FaChartArea className="text-purple-500 text-2xl" />
          </div>
        </div>
        <div className={`p-4 rounded-lg ${themeColors[theme].card} ${themeColors[theme].border} border`}>
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-sm ${themeColors[theme].text} opacity-70`}>Total Transfers</p>
              <p className={`text-2xl font-bold ${themeColors[theme].text}`}>₹{transferAnalytics.total.toLocaleString()}</p>
            </div>
            <FaChartPie className="text-orange-500 text-2xl" />
          </div>
        </div>
      </div>
    </div>
  );

  // Render security settings
  const renderSecuritySettings = () => (
    <div className="space-y-6">
      <div className={`p-6 rounded-lg ${themeColors[theme].card} ${themeColors[theme].border} border`}>
        <h3 className="text-lg font-semibold mb-4">Security Settings</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <FaFingerprint className="text-blue-500 text-xl" />
              <div>
                <p className="font-medium">Biometric Authentication</p>
                <p className="text-sm opacity-70">Use fingerprint or face ID for transfers</p>
              </div>
            </div>
            <button
              onClick={() => setBiometricEnabled(!biometricEnabled)}
              className={`px-4 py-2 rounded-lg ${
                biometricEnabled ? 'bg-green-500' : 'bg-gray-300'
              } text-white`}
            >
              {biometricEnabled ? 'Enabled' : 'Disabled'}
            </button>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <FaShieldAlt className="text-blue-500 text-xl" />
              <div>
                <p className="font-medium">Transaction Limits</p>
                <p className="text-sm opacity-70">Set daily and monthly transfer limits</p>
              </div>
            </div>
            <button className="px-4 py-2 bg-blue-500 text-white rounded-lg">
              Configure
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  // Render transaction history
  const renderTransactionHistory = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Transaction History</h3>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="p-2 rounded hover:bg-gray-100"
          >
            <FaFilter className="text-gray-500" />
          </button>
          <button
            onClick={() => handleSortChange('date')}
            className="p-2 rounded hover:bg-gray-100"
          >
            <FaSort className="text-gray-500" />
          </button>
        </div>
      </div>

      {showFilters && (
        <div className="bg-gray-50 p-4 rounded-lg space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Search
            </label>
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Search by recipient"
              />
              <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Status
            </label>
            <select
              value={filterStatus}
              onChange={(e) => handleFilterChange(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="all">All</option>
              <option value="completed">Completed</option>
              <option value="pending">Pending</option>
              <option value="failed">Failed</option>
            </select>
          </div>
        </div>
      )}

      <div className="space-y-2">
        {filteredTransactions.map((txn) => (
          <div
            key={txn.id}
            className="bg-white p-4 rounded-lg border border-gray-200 hover:border-indigo-200 transition-colors"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className={`p-2 rounded-full ${
                  txn.type === 'credit' ? 'bg-green-100' : 'bg-red-100'
                }`}>
                  {txn.type === 'credit' ? (
                    <FaChevronDown className="text-green-600" />
                  ) : (
                    <FaChevronUp className="text-red-600" />
                  )}
                </div>
                <div>
                  <p className="font-medium text-gray-900">{txn.recipient}</p>
                  <p className="text-sm text-gray-500">
                    {txn.date} • {txn.time}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className={`font-medium ${
                  txn.type === 'credit' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {txn.type === 'credit' ? '+' : '-'}₹{txn.amount.toLocaleString()}
                </p>
                <p className="text-sm text-gray-500 capitalize">{txn.status}</p>
              </div>
            </div>
            <div className="mt-2 pt-2 border-t border-gray-100">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">Transaction ID: {txn.id}</span>
                <button
                  onClick={() => generateReceipt(txn)}
                  className="text-indigo-600 hover:text-indigo-700"
                >
                  View Receipt
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // Render scheduled transfers
  const renderScheduledTransfers = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Scheduled Transfers</h3>
        <button
          onClick={() => {
            setSelectedDate('');
            setSelectedTime('');
            setTransferFrequency('once');
            handleScheduleTransfer();
          }}
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
        >
          Schedule New
        </button>
      </div>

      <div className="space-y-2">
        {scheduledTransfers.map((transfer) => (
          <div
            key={transfer.id}
            className="bg-white p-4 rounded-lg border border-gray-200"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">{transfer.recipient}</p>
                <p className="text-sm text-gray-500">
                  {transfer.date} • {transfer.time}
                </p>
              </div>
              <div className="text-right">
                <p className="font-medium text-gray-900">
                  ₹{transfer.amount.toLocaleString()}
                </p>
                <p className="text-sm text-gray-500 capitalize">
                  {transfer.frequency}
                </p>
              </div>
            </div>
            <div className="mt-2 pt-2 border-t border-gray-100">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">ID: {transfer.id}</span>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => {/* Handle edit */}}
                    className="text-indigo-600 hover:text-indigo-700"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => {/* Handle cancel */}}
                    className="text-red-600 hover:text-red-700"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // Render beneficiary management
  const renderBeneficiaryManagement = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Beneficiaries</h3>
        <button
          onClick={() => setShowAddBeneficiary(true)}
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
        >
          Add New
        </button>
      </div>

      {/* Add Beneficiary Modal */}
      {showAddBeneficiary && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-96">
            <h3 className="text-lg font-semibold mb-4">Add New Beneficiary</h3>
            <form onSubmit={(e) => {
              e.preventDefault();
              handleAddBeneficiary({
                id: Date.now(),
                name: recipientName,
                type: transferType,
                account: recipient,
                bank: selectedBank,
                ifsc: ifscCode,
                upi: upiId,
                mobile: mobileNumber,
                isFavorite: false
              });
            }}>
              {/* Form fields */}
              <button type="submit" className="w-full px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
                Add Beneficiary
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Beneficiaries List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {contacts.map((contact) => (
          <div key={contact.id} className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-2 rounded-full bg-indigo-100">
                  <FaUser className="text-indigo-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">{contact.name}</p>
                  <p className="text-sm text-gray-500">
                    {contact.type === 'bank' && `${contact.bank} • ${contact.account}`}
                    {contact.type === 'upi' && contact.upi}
                    {contact.type === 'mobile' && contact.mobile}
                  </p>
                </div>
              </div>
              <button
                onClick={() => handleToggleFavorite(contact.id)}
                className={`p-2 rounded-full ${
                  contact.isFavorite ? 'text-yellow-500' : 'text-gray-400'
                }`}
              >
                <FaStar />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // Add quick amount buttons to the form
  const renderQuickAmounts = () => (
    <div className="grid grid-cols-4 gap-2 mb-4">
      {quickAmounts.map((amount) => (
        <button
          key={amount}
          type="button"
          onClick={() => handleQuickAmount(amount)}
          className="px-3 py-2 border border-gray-300 rounded-lg hover:border-indigo-500 hover:bg-indigo-50"
        >
          ₹{amount.toLocaleString()}
        </button>
      ))}
    </div>
  );

  // Update the form to include quick amounts
  const renderTransferForm = () => (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Transfer Type Selection */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Transfer To</label>
        <div className="grid grid-cols-3 gap-3">
          <button
            type="button"
            onClick={() => setTransferType('bank')}
            className={`p-3 rounded-lg border-2 transition-all ${
              transferType === 'bank'
                ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
                : 'border-gray-200 hover:border-indigo-200'
            }`}
          >
            <FaUniversity className="mx-auto mb-2" />
            <span className="text-sm">Bank Account</span>
          </button>
          <button
            type="button"
            onClick={() => setTransferType('upi')}
            className={`p-3 rounded-lg border-2 transition-all ${
              transferType === 'upi'
                ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
                : 'border-gray-200 hover:border-indigo-200'
            }`}
          >
            <FaIdCard className="mx-auto mb-2" />
            <span className="text-sm">UPI ID</span>
          </button>
          <button
            type="button"
            onClick={() => setTransferType('mobile')}
            className={`p-3 rounded-lg border-2 transition-all ${
              transferType === 'mobile'
                ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
                : 'border-gray-200 hover:border-indigo-200'
            }`}
          >
            <FaMobile className="mx-auto mb-2" />
            <span className="text-sm">Mobile Number</span>
          </button>
        </div>
      </div>

      {/* Recent Contacts */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Recent Contacts</label>
        <div className="flex gap-2 mb-2 flex-wrap">
          {contacts.map((c) => (
            <button
              type="button"
              key={c.id}
              onClick={() => {
                handleContactSelect(c);
              }}
              className="flex items-center px-3 py-1.5 rounded-lg border border-gray-200 text-sm mr-2 mb-2 hover:border-indigo-300 hover:bg-indigo-50"
            >
              <FaUser className="mr-2" />
              {c.name}
            </button>
          ))}
        </div>
      </div>

      {/* Dynamic Form Fields */}
      {transferType === 'bank' && (
        <>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Select Bank</label>
            <div className="grid grid-cols-2 gap-3">
              {banks.map((bank) => (
                <button
                  type="button"
                  key={bank.code}
                  onClick={() => handleBankSelect(bank)}
                  className={`p-3 rounded-lg border-2 transition-all ${
                    selectedBank === bank.code
                      ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
                      : 'border-gray-200 hover:border-indigo-200'
                  }`}
                >
                  <span className="font-medium">{bank.name}</span>
                </button>
              ))}
            </div>
            {errors.bank && <p className="mt-1 text-sm text-red-600">{errors.bank}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Account Number</label>
            <input
              type="text"
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${
                errors.recipient ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Enter account number"
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
            />
            {errors.recipient && <p className="mt-1 text-sm text-red-600">{errors.recipient}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">IFSC Code</label>
            <input
              type="text"
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${
                errors.ifsc ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Enter IFSC code"
              value={ifscCode}
              onChange={(e) => setIfscCode(e.target.value.toUpperCase())}
            />
            {errors.ifsc && <p className="mt-1 text-sm text-red-600">{errors.ifsc}</p>}
          </div>
        </>
      )}

      {transferType === 'upi' && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">UPI ID</label>
          <input
            type="text"
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${
              errors.upi ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Enter UPI ID (e.g., username@bank)"
            value={upiId}
            onChange={(e) => setUpiId(e.target.value)}
          />
          {errors.upi && <p className="mt-1 text-sm text-red-600">{errors.upi}</p>}
        </div>
      )}

      {transferType === 'mobile' && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Mobile Number</label>
          <input
            type="tel"
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${
              errors.mobile ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Enter mobile number"
            value={mobileNumber}
            onChange={(e) => setMobileNumber(e.target.value)}
          />
          {errors.mobile && <p className="mt-1 text-sm text-red-600">{errors.mobile}</p>}
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Amount</label>
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">₹</span>
          <input
            type="number"
            className={`w-full pl-8 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${
              errors.amount ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Enter amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            min="1"
            step="0.01"
          />
        </div>
        {errors.amount && <p className="mt-1 text-sm text-red-600">{errors.amount}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Note (optional)</label>
        <input
          type="text"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          placeholder="Add a note (e.g. Rent, Gift)"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          maxLength={50}
        />
      </div>

      {renderQuickAmounts()}

      {/* QR Scanner Button */}
      <button
        onClick={() => setShowQRScanner(!showQRScanner)}
        className="w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-50 rounded-lg"
      >
        <FaQrcode className="inline-block mr-2" />
        Scan QR Code
      </button>

      {/* QR Scanner Modal */}
      {showQRScanner && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white/90 p-6 rounded-lg w-96" style={{
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)'
          }}>
            <h3 className="text-lg font-semibold mb-4">Scan QR Code</h3>
            <div className="bg-gray-100 p-4 rounded-lg mb-4">
              <FaCamera className="text-4xl mx-auto text-gray-400" />
              <p className="text-center text-sm text-gray-500 mt-2">
                Position the QR code within the frame
              </p>
            </div>
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setShowQRScanner(false)}
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={() => handleQRScan('{"type":"upi","id":"test@upi"}')}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
              >
                Scan
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Form Submit Button */}
      <button
        type="submit"
        onClick={handleConfirm}
        disabled={isProcessing}
        className={`w-full py-2 px-4 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors ${
          isProcessing ? 'opacity-50 cursor-not-allowed' : ''
        }`}
      >
        {isProcessing ? 'Processing...' : 'Continue'}
      </button>
    </form>
  );

  return (
    <div className={`min-h-screen bg-gradient-to-br ${themeColors[theme].gradient}`}>
      <DashboardPageHeader />
      <main className="flex-1 max-w-6xl mx-auto w-full px-4 py-8 pt-28">
        <div className={`${themeColors[theme].card} rounded-xl shadow-lg p-6 ${themeColors[theme].border} border`}>
          {/* Page Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              {step > 1 && (
                <button onClick={() => setStep(step - 1)} className={`mr-3 p-2 rounded ${themeColors[theme].secondary}`}>
                  <FaArrowLeft className={themeColors[theme].text} />
                </button>
              )}
              <div>
                <h2 className={`text-2xl font-bold ${themeColors[theme].text}`}>Transfer Money</h2>
                <p className={`${themeColors[theme].text} opacity-70 text-sm`}>
                  Send money instantly to any bank account, UPI ID, or mobile number
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <button onClick={toggleTheme} className={`p-2 rounded ${themeColors[theme].secondary}`}>
                {theme === 'light' ? '🌙' : '☀️'}
              </button>
              <button onClick={() => setShowHistory(!showHistory)} className={`p-2 rounded ${themeColors[theme].secondary}`}>
                <FaHistory className={themeColors[theme].text} />
              </button>
              <button onClick={() => setShowAnalytics(!showAnalytics)} className={`p-2 rounded ${themeColors[theme].secondary}`}>
                <FaChartPie className={themeColors[theme].text} />
              </button>
              <button onClick={() => setShowSecurity(!showSecurity)} className={`p-2 rounded ${themeColors[theme].secondary}`}>
                <FaShieldAlt className={themeColors[theme].text} />
              </button>
              <button onClick={() => setShowNotifications(!showNotifications)} className={`p-2 rounded ${themeColors[theme].secondary}`}>
                <FaBell className={themeColors[theme].text} />
              </button>
            </div>
          </div>

          {/* Main content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left sidebar */}
            <div className="lg:col-span-1 space-y-6">
              {showAnalytics && renderAnalytics()}
              {showSecurity && renderSecuritySettings()}
              
              {/* Account selection */}
              <div className={`p-4 rounded-lg ${themeColors[theme].card} ${themeColors[theme].border} border`}>
                <label className={`block text-sm font-medium ${themeColors[theme].text} mb-2`}>
                  From Account
                </label>
                <select
                  value={selectedAccount}
                  onChange={(e) => setSelectedAccount(e.target.value)}
                  className={`w-full px-4 py-2 ${themeColors[theme].border} border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${themeColors[theme].text} bg-transparent`}
                >
                  <option value="">Select Account</option>
                  {accounts.map((account) => (
                    <option key={account.id} value={account.id}>
                      {account.name} - {account.number} (₹{account.balance.toLocaleString()})
                    </option>
                  ))}
                </select>
              </div>

              {/* Quick actions */}
              <div className="space-y-2">
                <button
                  onClick={() => setShowBeneficiaries(!showBeneficiaries)}
                  className={`w-full px-4 py-2 text-left ${themeColors[theme].text} hover:bg-opacity-10 hover:bg-indigo-500 rounded-lg`}
                >
                  <FaUser className="inline-block mr-2" />
                  Manage Beneficiaries
                </button>
                <button
                  onClick={() => setShowScheduled(!showScheduled)}
                  className={`w-full px-4 py-2 text-left ${themeColors[theme].text} hover:bg-opacity-10 hover:bg-indigo-500 rounded-lg`}
                >
                  <FaCalendarAlt className="inline-block mr-2" />
                  Scheduled Transfers
                </button>
                <button
                  onClick={() => setShowQRScanner(!showQRScanner)}
                  className={`w-full px-4 py-2 text-left ${themeColors[theme].text} hover:bg-opacity-10 hover:bg-indigo-500 rounded-lg`}
                >
                  <FaQrcode className="inline-block mr-2" />
                  Scan QR Code
                </button>
              </div>

              {/* Transaction limits */}
              <div className={`p-4 rounded-lg ${themeColors[theme].secondary}`}>
                <h4 className={`font-medium ${themeColors[theme].text} mb-2`}>Transaction Limits</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className={`${themeColors[theme].text} opacity-70`}>Daily Limit</span>
                    <span className={`font-medium ${themeColors[theme].text}`}>₹1,00,000</span>
                  </div>
                  <div className="flex justify-between">
                    <span className={`${themeColors[theme].text} opacity-70`}>Monthly Limit</span>
                    <span className={`font-medium ${themeColors[theme].text}`}>₹10,00,000</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Main content area */}
            <div className="lg:col-span-2">
              {showHistory ? (
                renderTransactionHistory()
              ) : showBeneficiaries ? (
                renderBeneficiaryManagement()
              ) : showScheduled ? (
                renderScheduledTransfers()
              ) : (
                renderTransferForm()
              )}
            </div>
          </div>

          {/* Security badge */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <div className="flex items-center justify-center text-sm text-gray-500">
              <FaLock className="mr-2" />
              <span>Secured by 128-bit encryption</span>
            </div>
          </div>

          {/* Success Message */}
          {isSuccess && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white/90 p-6 rounded-lg w-96" style={{
                backdropFilter: 'blur(8px)',
                WebkitBackdropFilter: 'blur(8px)'
              }}>
                <div className="text-center">
                  <FaCheckCircle className="text-5xl text-green-500 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Transfer Successful!</h3>
                  <p className="text-gray-600 mb-4">
                    Transaction ID: {transactionId}
                  </p>
                  <button
                    onClick={handleReset}
                    className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                  >
                    Done
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Receipt Modal */}
          {showReceipt && currentReceipt && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white/90 p-6 rounded-lg w-96" style={{
                backdropFilter: 'blur(8px)',
                WebkitBackdropFilter: 'blur(8px)'
              }}>
                <h3 className="text-lg font-semibold mb-4">Transaction Receipt</h3>
                <div className="space-y-2">
                  <p><span className="font-medium">Transaction ID:</span> {currentReceipt.id}</p>
                  <p><span className="font-medium">Amount:</span> ₹{currentReceipt.amount.toLocaleString()}</p>
                  <p><span className="font-medium">Recipient:</span> {currentReceipt.recipient}</p>
                  <p><span className="font-medium">Date:</span> {currentReceipt.date}</p>
                  <p><span className="font-medium">Time:</span> {currentReceipt.time}</p>
                </div>
                <button
                  onClick={() => setShowReceipt(false)}
                  className="w-full mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
      <DashboardPageFooter />
    </div>
  );
};

export default Transfer; 