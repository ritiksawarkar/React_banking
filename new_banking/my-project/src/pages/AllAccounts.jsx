import React, { useState, useEffect, useRef } from 'react';
import { 
  FaWallet, FaPiggyBank, FaUniversity, FaChartLine, FaExchangeAlt, 
  FaCreditCard, FaDownload, FaPrint, FaShareAlt, FaLock, FaHistory,
  FaFileInvoiceDollar, FaCalendarAlt, FaBell, FaInfoCircle, FaArrowDown, FaArrowUp,
  FaEllipsisV, FaTimes, FaCheckCircle, FaExclamationCircle, FaPauseCircle
} from 'react-icons/fa';
import DashboardPageHeader from '../components/DashboardPageHeader';
import DashboardPageFooter from '../components/DashboardPageFooter';
import ReactApexChart from 'react-apexcharts';

const STATUS_COLORS = {
  Active: 'bg-green-100 text-green-700 border-green-300',
  Inactive: 'bg-gray-100 text-gray-700 border-gray-300',
  Dormant: 'bg-yellow-100 text-yellow-700 border-yellow-300',
  Closed: 'bg-red-100 text-red-700 border-red-300',
};

const STATUS_ICONS = {
  Active: <FaCheckCircle className="inline mr-1" />,
  Inactive: <FaPauseCircle className="inline mr-1" />,
  Dormant: <FaExclamationCircle className="inline mr-1" />,
  Closed: <FaTimes className="inline mr-1" />,
};

const STATUS_TOOLTIPS = {
  Active: 'This account is active and fully operational.',
  Inactive: 'This account is currently inactive.',
  Dormant: 'This account is dormant due to inactivity.',
  Closed: 'This account is closed.',
};

// Toast Notification Component
const Toast = ({ message, onClose }) => (
  <div className="fixed bottom-6 right-6 z-50 bg-indigo-700 text-white px-6 py-3 rounded-lg shadow-lg flex items-center space-x-3 animate-fade-in" role="alert" aria-live="polite">
    <span>{message}</span>
    <button onClick={onClose} className="ml-2 text-white hover:text-gray-200 focus:outline-none" aria-label="Close notification">
      <FaTimes />
    </button>
  </div>
);

// Skeleton Loader
const Skeleton = ({ className }) => (
  <div className={`bg-gray-200 animate-pulse rounded ${className}`} />
);

// Focus trap hook for modals
function useFocusTrap(isOpen, modalRef, onClose) {
  useEffect(() => {
    if (!isOpen || !modalRef.current) return;
    const focusable = modalRef.current.querySelectorAll(
      'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
    );
    if (focusable.length) focusable[0].focus();
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') { onClose && onClose(); }
      if (e.key !== 'Tab') return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    modalRef.current.addEventListener('keydown', handleKeyDown);
    return () => modalRef.current.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, modalRef, onClose]);
}

const AllAccounts = () => {
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [showTransactionHistory, setShowTransactionHistory] = useState(false);
  const [showAccountDetails, setShowAccountDetails] = useState(false);
  const [showStatementModal, setShowStatementModal] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState(new Date().toISOString().slice(0, 7));
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');
  const [actionsOpen, setActionsOpen] = useState(null);
  const [showAddAccountModal, setShowAddAccountModal] = useState(false);
  const [newAccount, setNewAccount] = useState({
    type: '',
    accountNumber: '',
    balance: '',
    status: 'Active',
  });
  const [accountsState, setAccountsState] = useState([
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
  ]);

  const [alerts, setAlerts] = useState([]);
  const [showToast, setShowToast] = useState(false);
  const [toastMsg, setToastMsg] = useState('');
  const [nicknameEditId, setNicknameEditId] = useState(null);
  const [nicknameInput, setNicknameInput] = useState('');
  const [statementsHistory, setStatementsHistory] = useState([]); // {accountNumber, month, format, date}
  const [showStatementsHistory, setShowStatementsHistory] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showSecurityModal, setShowSecurityModal] = useState(false);
  const [securitySettings, setSecuritySettings] = useState({ onlineAccess: true, transactionLimit: 50000 });
  const mainRef = useRef();
  const [selectedFormat, setSelectedFormat] = useState('pdf');
  const [lastActiveElement, setLastActiveElement] = useState(null);
  const modalRef = useRef();

  // Focus trap for modals
  useFocusTrap(showAddAccountModal || showAccountDetails || showTransactionHistory || showStatementModal || showSecurityModal, modalRef, () => {
    setShowAddAccountModal(false);
    setShowAccountDetails(false);
    setShowTransactionHistory(false);
    setShowStatementModal(false);
    setShowSecurityModal(false);
  });
  useEffect(() => {
    if (showAddAccountModal || showAccountDetails || showTransactionHistory || showStatementModal || showSecurityModal) {
      setLastActiveElement(document.activeElement);
    } else if (lastActiveElement) {
      lastActiveElement.focus();
    }
  }, [showAddAccountModal, showAccountDetails, showTransactionHistory, showStatementModal, showSecurityModal]);

  // Alerts: Low balance, FD maturity, unusual activity
  useEffect(() => {
    const newAlerts = [];
    accountsState.forEach(acc => {
      if (acc.balance < 5000) newAlerts.push({ type: 'warning', msg: `Low balance in ${acc.nickname || acc.type} (${acc.accountNumber})` });
      if (acc.type === 'Fixed Deposit' && acc.maturityDate) {
        const daysLeft = Math.ceil((new Date(acc.maturityDate) - new Date()) / (1000 * 60 * 60 * 24));
        if (daysLeft > 0 && daysLeft <= 30) newAlerts.push({ type: 'info', msg: `FD (${acc.accountNumber}) maturing in ${daysLeft} days` });
      }
      // Example: Unusual activity (demo)
      if (acc.transactions && acc.transactions.some(tx => Math.abs(tx.amount) > 40000)) {
        newAlerts.push({ type: 'danger', msg: `Unusual large transaction in ${acc.nickname || acc.type} (${acc.accountNumber})` });
      }
    });
    setAlerts(newAlerts);
  }, [accountsState]);

  // Toast helper
  const triggerToast = (msg) => {
    setToastMsg(msg);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3500);
  };

  // Add Account Nickname
  const handleNicknameSave = (id) => {
    setAccountsState(accountsState.map(acc => acc.id === id ? { ...acc, nickname: nicknameInput } : acc));
    setNicknameEditId(null);
    setNicknameInput('');
    triggerToast('Nickname updated!');
  };

  // Download Statement (add to history and toast)
  const handleStatementDownload = (account) => {
    setSelectedAccount(account);
    setShowStatementModal(true);
    // When download is confirmed, add to history and show toast (see below)
  };
  const confirmStatementDownload = (account, month, format) => {
    setStatementsHistory([
      { accountNumber: account.accountNumber, month, format, date: new Date().toLocaleString() },
      ...statementsHistory,
    ]);
    setShowStatementModal(false);
    triggerToast('Statement downloaded!');
  };

  // Loading simulation for demo
  useEffect(() => {
    setLoading(true);
    const t = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(t);
  }, []);

  // Security Modal Save
  const handleSecuritySave = () => {
    setShowSecurityModal(false);
    triggerToast('Security settings updated!');
  };

  const filteredAccounts = accountsState.filter(acc => 
    (filter === 'All' || acc.type === filter) &&
    (acc.accountNumber.includes(search) || acc.type.toLowerCase().includes(search.toLowerCase()))
  );

  // Aggregate and sort recent transactions
  const allTransactions = accountsState
    .flatMap(acc => (acc.transactions || []).map(tx => ({ ...tx, accountType: acc.type, accountNumber: acc.accountNumber })))
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 7); // Show top 7 recent

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

  // Dropdown actions handler
  const handleAction = (action, account) => {
    setActionsOpen(null);
    if (action === 'details') handleAccountSelect(account);
    if (action === 'transactions') handleViewTransactions(account);
    if (action === 'statement') handleStatementDownload(account);
    if (action === 'primary') alert('Set as Primary (demo)');
  };

  // Add Account Handler
  const handleAddAccount = (e) => {
    e.preventDefault();
    if (!newAccount.type || !newAccount.accountNumber || !newAccount.balance) return;
    setAccountsState([
      ...accountsState,
      {
        id: accountsState.length + 1,
        type: newAccount.type,
        accountNumber: newAccount.accountNumber,
        balance: parseFloat(newAccount.balance),
        currency: 'INR',
        status: newAccount.status,
        lastTransaction: '',
        icon: <FaWallet className="w-6 h-6" />, // default icon
        color: 'from-blue-500 to-blue-600',
        details: {},
        transactions: [],
      },
    ]);
    setShowAddAccountModal(false);
    setNewAccount({ type: '', accountNumber: '', balance: '', status: 'Active' });
  };

  // Export as CSV
  const handleExportCSV = () => {
    const header = ['Type', 'Account Number', 'Balance', 'Status'];
    const rows = accountsState.map(acc => [acc.type, acc.accountNumber, acc.balance, acc.status]);
    const csv = [header, ...rows].map(row => row.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'accounts_summary.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  // Print Accounts
  const handlePrint = () => {
    const printContent = document.getElementById('accounts-summary-section').innerHTML;
    const win = window.open('', '', 'width=900,height=700');
    win.document.write('<html><head><title>Accounts Summary</title></head><body>' + printContent + '</body></html>');
    win.document.close();
    win.print();
  };

  // Analytics Data
  const accountTypeData = accountsState.reduce((acc, curr) => {
    acc[curr.type] = (acc[curr.type] || 0) + curr.balance;
    return acc;
  }, {});
  const pieOptions = {
    chart: { type: 'pie' },
    labels: Object.keys(accountTypeData),
    legend: { position: 'bottom' },
    tooltip: { y: { formatter: val => `₹${val.toLocaleString('en-IN', { minimumFractionDigits: 2 })}` } },
  };
  const pieSeries = Object.values(accountTypeData);

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
      <a href="#main-content" className="sr-only focus:not-sr-only absolute top-2 left-2 bg-indigo-700 text-white px-4 py-2 rounded z-50">Skip to main content</a>
      <DashboardPageHeader />
      
      {/* Alerts Bar */}
      {alerts.length > 0 && (
        <div className="fixed top-0 left-0 w-full z-40">
          {alerts.map((alert, i) => (
            <div key={i} className={`flex items-center px-4 py-3 text-sm font-medium ${alert.type === 'danger' ? 'bg-red-600 text-white' : alert.type === 'warning' ? 'bg-yellow-400 text-gray-900' : 'bg-blue-600 text-white'} shadow-md`} role="alert" aria-live="polite">
              {alert.msg}
            </div>
          ))}
        </div>
      )}

      {/* Toast Notification */}
      {showToast && <Toast message={toastMsg} onClose={() => setShowToast(false)} />}

      <main id="main-content" tabIndex={-1} ref={mainRef} className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8 py-8 pt-28 md:pt-24">
        {/* Page Header */}
        <section className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">All Accounts</h1>
          <p className="mt-2 text-gray-600">View and manage all your accounts in one place</p>
        </section>

        {/* Recent Transactions Section */}
        <section className="mb-10">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900">Recent Transactions</h2>
          </div>
          <div className="overflow-x-auto rounded-xl shadow border border-gray-200 bg-white">
            <table className="min-w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Date</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Account</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Description</th>
                  <th className="px-4 py-2 text-right text-sm font-medium text-gray-700">Amount</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Status</th>
                </tr>
              </thead>
              <tbody>
                {allTransactions.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-4 py-4 text-center text-gray-500">No recent transactions</td>
                  </tr>
                ) : (
                  allTransactions.map(tx => (
                    <tr key={tx.reference + tx.date} className="hover:bg-gray-50">
                      <td className="px-4 py-2 text-sm text-gray-700 whitespace-nowrap">{tx.date}</td>
                      <td className="px-4 py-2 text-sm text-gray-700 whitespace-nowrap">
                        {tx.accountType} <span className="text-xs text-gray-400">({tx.accountNumber})</span>
                      </td>
                      <td className="px-4 py-2 text-sm text-gray-700">{tx.description}</td>
                      <td className={`px-4 py-2 text-sm text-right font-medium ${tx.type === 'credit' ? 'text-green-600' : 'text-red-600'}`}>{tx.type === 'credit' ? '+' : '-'}₹{Math.abs(tx.amount).toLocaleString('en-IN', { minimumFractionDigits: 2 })}</td>
                      <td className="px-4 py-2 text-sm text-gray-700">{tx.status}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </section>

        {/* Quick Actions */}
        <section className="mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <button className="flex items-center justify-center space-x-2 p-4 bg-white rounded-xl shadow hover:shadow-md transition-all duration-200 border border-gray-200 hover:border-indigo-200 focus:outline-indigo-700 focus:ring-2 focus:ring-indigo-400" aria-label="Transfer Money">
              <FaExchangeAlt className="w-5 h-5 text-indigo-600" />
              <span className="text-gray-700 font-medium">Transfer Money</span>
            </button>
            <button className="flex items-center justify-center space-x-2 p-4 bg-white rounded-xl shadow hover:shadow-md transition-all duration-200 border border-gray-200 hover:border-indigo-200 focus:outline-indigo-700 focus:ring-2 focus:ring-indigo-400" onClick={() => setShowAddAccountModal(true)} aria-label="Add New Account">
              <FaCreditCard className="w-5 h-5 text-indigo-600" />
              <span className="text-gray-700 font-medium">Add New Account</span>
            </button>
            <button className="flex items-center justify-center space-x-2 p-4 bg-white rounded-xl shadow hover:shadow-md transition-all duration-200 border border-gray-200 hover:border-indigo-200 focus:outline-indigo-700 focus:ring-2 focus:ring-indigo-400" aria-label="Open Fixed Deposit">
              <FaPiggyBank className="w-5 h-5 text-indigo-600" />
              <span className="text-gray-700 font-medium">Open Fixed Deposit</span>
            </button>
          </div>
        </section>

        {/* Search and Filter */}
        <section className="mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:space-x-4">
            <input
              type="text"
              placeholder="Search by account number or type"
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="mb-2 md:mb-0 px-4 py-2 border border-gray-300 rounded-lg focus:outline-indigo-700 focus:ring-2 focus:ring-indigo-400"
              aria-label="Search accounts"
            />
            <select
              value={filter}
              onChange={e => setFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-indigo-700 focus:ring-2 focus:ring-indigo-400"
              aria-label="Filter by account type"
            >
              <option value="All">All Types</option>
              <option value="Savings Account">Savings Account</option>
              <option value="Fixed Deposit">Fixed Deposit</option>
              <option value="Investment Account">Investment Account</option>
            </select>
          </div>
        </section>

        {/* Export/Print Buttons */}
        <section className="flex gap-2 mb-4">
          <button
            onClick={handleExportCSV}
            className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm focus:outline-indigo-700 focus:ring-2 focus:ring-green-400"
            aria-label="Export accounts as CSV"
          >
            <FaDownload className="mr-2" /> Export CSV
          </button>
          <button
            onClick={handlePrint}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm focus:outline-indigo-700 focus:ring-2 focus:ring-blue-400"
            aria-label="Print accounts summary"
          >
            <FaPrint className="mr-2" /> Print
          </button>
        </section>

        {/* Accounts Grid */}
        <section className="mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {loading ? (
              [...Array(3)].map((_, i) => <Skeleton key={i} className="h-48 w-full" />)
            ) : filteredAccounts.length === 0 ? (
              <div className="text-center text-gray-500 py-12">No accounts found. Try adding a new account.</div>
            ) : (
              filteredAccounts.map((account) => (
                <div
                  key={account.id}
                  className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200 hover:border-indigo-200 transition-all duration-200 hover:shadow-md relative flex flex-col h-full"
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
                          <div>
                            <span className="text-white/80 text-sm" aria-label="Account number">{account.accountNumber}</span>
                            {nicknameEditId === account.id ? (
                              <input
                                type="text"
                                value={nicknameInput}
                                onChange={e => setNicknameInput(e.target.value)}
                                onBlur={() => handleNicknameSave(account.id)}
                                onKeyDown={e => e.key === 'Enter' && handleNicknameSave(account.id)}
                                className="ml-2 px-2 py-1 rounded border border-gray-300 text-xs focus:outline-indigo-700 focus:ring-2 focus:ring-indigo-400"
                                aria-label="Edit nickname"
                                autoFocus
                              />
                            ) : (
                              <span className="ml-2 text-xs text-yellow-200 cursor-pointer underline" tabIndex={0} role="button" aria-label="Edit nickname" onClick={() => { setNicknameEditId(account.id); setNicknameInput(account.nickname || ''); }}> {account.nickname || 'Set Nickname'} </span>
                            )}
                          </div>
                        </div>
                      </div>
                      {/* Status Badge with Tooltip */}
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium border ${STATUS_COLORS[account.status] || 'bg-gray-100 text-gray-700 border-gray-300'}`}
                        title={STATUS_TOOLTIPS[account.status] || 'Account status'}
                      >
                        {STATUS_ICONS[account.status] || null}
                        {account.status}
                      </span>
                      {/* Actions Dropdown */}
                      <div className="relative ml-2">
                        <button
                          className="p-2 rounded-full hover:bg-white/30 text-white focus:outline-indigo-700 focus:ring-2 focus:ring-indigo-400"
                          aria-label="Open actions menu"
                          aria-haspopup="true"
                          aria-expanded={actionsOpen === account.id}
                          onClick={() => setActionsOpen(actionsOpen === account.id ? null : account.id)}
                        >
                          <FaEllipsisV />
                        </button>
                        {actionsOpen === account.id && (
                          <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10" role="menu" aria-label="Account actions">
                            <button
                              className="w-full text-left px-4 py-2 hover:bg-indigo-50 text-gray-700 focus:outline-indigo-700 focus:ring-2 focus:ring-indigo-400"
                              onClick={() => handleAction('details', account)}
                              role="menuitem"
                            >
                              View Details
                            </button>
                            <button
                              className="w-full text-left px-4 py-2 hover:bg-indigo-50 text-gray-700 focus:outline-indigo-700 focus:ring-2 focus:ring-indigo-400"
                              onClick={() => handleAction('transactions', account)}
                              role="menuitem"
                            >
                              Transactions
                            </button>
                            <button
                              className="w-full text-left px-4 py-2 hover:bg-indigo-50 text-gray-700 focus:outline-indigo-700 focus:ring-2 focus:ring-indigo-400"
                              onClick={() => handleAction('statement', account)}
                              role="menuitem"
                            >
                              Download Statement
                            </button>
                            <button
                              className="w-full text-left px-4 py-2 hover:bg-indigo-50 text-gray-700 focus:outline-indigo-700 focus:ring-2 focus:ring-indigo-400"
                              onClick={() => handleAction('primary', account)}
                              role="menuitem"
                            >
                              Set as Primary
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Account Details */}
                  <div className="p-6 flex-1 flex flex-col justify-between">
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
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>

        {/* Account Summary */}
        <section className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 hover:border-indigo-200 transition-all duration-200 flex flex-col items-center">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Total Balance</h3>
            <p className="text-3xl font-bold text-gray-900">
              ₹{accountsState.reduce((sum, acc) => sum + acc.balance, 0).toLocaleString('en-IN', { minimumFractionDigits: 2 })}
            </p>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 hover:border-indigo-200 transition-all duration-200 flex flex-col items-center">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Active Accounts</h3>
            <p className="text-3xl font-bold text-gray-900">{accountsState.length}</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 hover:border-indigo-200 transition-all duration-200 flex flex-col items-center">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Transactions</h3>
            <p className="text-3xl font-bold text-gray-900">{allTransactions.length}</p>
          </div>
        </section>

        {/* Analytics/Insights Section (below summary) */}
        <section className="mt-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Account Analytics & Insights</h2>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <ReactApexChart options={pieOptions} series={pieSeries} type="pie" height={300} />
          </div>
        </section>
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
                <select
                  value={selectedFormat}
                  onChange={e => setSelectedFormat(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                >
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
                onClick={() => confirmStatementDownload(selectedAccount, selectedMonth, selectedFormat)}
              >
                Download
              </button>
            </div>
          </div>
        )}
      </Modal>

      {/* Add/Link New Account Modal */}
      <Modal isOpen={showAddAccountModal} onClose={() => setShowAddAccountModal(false)} title="Add / Link New Account">
        <form onSubmit={handleAddAccount} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Account Type</label>
            <select
              value={newAccount.type}
              onChange={e => setNewAccount({ ...newAccount, type: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              required
            >
              <option value="">Select Type</option>
              <option value="Savings Account">Savings Account</option>
              <option value="Fixed Deposit">Fixed Deposit</option>
              <option value="Investment Account">Investment Account</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Account Number</label>
            <input
              type="text"
              value={newAccount.accountNumber}
              onChange={e => setNewAccount({ ...newAccount, accountNumber: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Balance</label>
            <input
              type="number"
              value={newAccount.balance}
              onChange={e => setNewAccount({ ...newAccount, balance: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
            <select
              value={newAccount.status}
              onChange={e => setNewAccount({ ...newAccount, status: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
              <option value="Dormant">Dormant</option>
              <option value="Closed">Closed</option>
            </select>
          </div>
          <div className="flex justify-end space-x-3 pt-4 border-t border-gray-100">
            <button
              type="button"
              onClick={() => setShowAddAccountModal(false)}
              className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg"
            >
              Add Account
            </button>
          </div>
        </form>
      </Modal>

      {/* Statements History Modal */}
      <Modal isOpen={showStatementsHistory} onClose={() => setShowStatementsHistory(false)} title="Statements History">
        {statementsHistory.length === 0 ? (
          <div className="text-gray-500">No statements downloaded yet.</div>
        ) : (
          <ul className="divide-y divide-gray-200">
            {statementsHistory.map((s, i) => (
              <li key={i} className="py-2 flex justify-between items-center">
                <span>{s.accountNumber} | {s.month} | {s.format.toUpperCase()} | {s.date}</span>
                <button className="text-indigo-600 hover:underline text-sm" onClick={() => triggerToast('Re-downloading statement...')}>Download Again</button>
              </li>
            ))}
          </ul>
        )}
      </Modal>

      {/* Security Modal */}
      <Modal isOpen={showSecurityModal} onClose={() => setShowSecurityModal(false)} title="Account Security Settings">
        <form className="space-y-4" onSubmit={e => { e.preventDefault(); handleSecuritySave(); }}>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Online Access</label>
            <select
              value={securitySettings.onlineAccess ? 'enabled' : 'disabled'}
              onChange={e => setSecuritySettings({ ...securitySettings, onlineAccess: e.target.value === 'enabled' })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            >
              <option value="enabled">Enabled</option>
              <option value="disabled">Disabled</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Transaction Limit (₹)</label>
            <input
              type="number"
              value={securitySettings.transactionLimit}
              onChange={e => setSecuritySettings({ ...securitySettings, transactionLimit: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            />
          </div>
          <div className="flex justify-end space-x-3 pt-4 border-t border-gray-100">
            <button type="button" onClick={() => setShowSecurityModal(false)} className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg">Cancel</button>
            <button type="submit" className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg">Save</button>
          </div>
        </form>
      </Modal>

      <DashboardPageFooter />
    </div>
  );
};

export default AllAccounts; 