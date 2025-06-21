import React, { useState, useEffect, useRef, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaMoneyBillWave,
  FaBell,
  FaSearch,
  FaUser,
  FaCog,
  FaSignOutAlt,
  FaUserCircle,
  FaLock,
  FaQuestionCircle,
  FaWallet,
  FaExchangeAlt,
  FaChartLine,
  FaCreditCard,
  FaPiggyBank,
  FaUniversity,
  FaFileInvoiceDollar,
  FaHistory,
  FaMoneyCheckAlt,
  FaChartBar,
  FaCoins,
  FaLandmark,
  FaShieldAlt,
  FaCheckCircle,
  FaTimes,
  FaLightbulb,
} from "react-icons/fa";
import { useAuth } from "../context/AuthContext";

const DashboardPageHeader = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [activeNotificationTab, setActiveNotificationTab] = useState('all');
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "New Transaction",
      message: "Your recent transfer was successful",
      time: "5 minutes ago",
      read: false,
      important: true,
      type: 'transaction'
    },
    {
      id: 2,
      title: "Security Alert",
      message: "New device logged into your account",
      time: "1 hour ago",
      read: false,
      important: true,
      type: 'security'
    },
    {
      id: 3,
      title: "Account Update",
      message: "Your account statement is ready",
      time: "2 hours ago",
      read: true,
      important: false,
      type: 'account'
    },
    {
      id: 4,
      title: "Payment Due",
      message: "Your credit card payment is due in 3 days",
      time: "3 hours ago",
      read: false,
      important: true,
      type: 'payment'
    },
    {
      id: 5,
      title: "Investment Alert",
      message: "Your stock portfolio has gained 5%",
      time: "4 hours ago",
      read: true,
      important: false,
      type: 'investment'
    }
  ]);
  const [showNotificationSettings, setShowNotificationSettings] = useState(false);
  const [notificationPrefs, setNotificationPrefs] = useState(() => {
    const saved = localStorage.getItem('notificationPrefs');
    return saved ? JSON.parse(saved) : {
      transaction: true,
      security: true,
      account: true,
      payment: true,
      investment: true,
    };
  });
  const searchRef = useRef(null);
  const inputRef = useRef(null);
  const searchTimeoutRef = useRef(null);

  // Sample search data - In a real app, this would come from your backend
  const searchableItems = [
    { id: 1, title: 'Checking Account', type: 'account', icon: <FaWallet />, path: '/dashboard/accounts' },
    { id: 2, title: 'Savings Account', type: 'account', icon: <FaPiggyBank />, path: '/dashboard/accounts' },
    { id: 3, title: 'Fixed Deposits', type: 'account', icon: <FaUniversity />, path: '/dashboard/accounts' },
    { id: 4, title: 'Transfer Money', type: 'transaction', icon: <FaExchangeAlt />, path: '/dashboard/transactions' },
    { id: 5, title: 'Bills & Payments', type: 'transaction', icon: <FaFileInvoiceDollar />, path: '/dashboard/bills' },
    { id: 6, title: 'Transaction History', type: 'transaction', icon: <FaHistory />, path: '/dashboard/transactions' },
    { id: 7, title: 'Scheduled Payments', type: 'transaction', icon: <FaMoneyCheckAlt />, path: '/dashboard/transactions' },
    { id: 8, title: 'Stocks', type: 'investment', icon: <FaChartBar />, path: '/dashboard/investments/stocks' },
    { id: 9, title: 'Mutual Funds', type: 'investment', icon: <FaLandmark />, path: '/dashboard/investments/mutual-funds' },
    { id: 10, title: 'Cryptocurrency', type: 'investment', icon: <FaCoins />, path: '/dashboard/investments/crypto' },
  ];

  // Quick Links Data
  const quickLinks = [
    { 
      name: 'Accounts', 
      icon: <FaWallet />,
      items: [
        { title: 'Checking Account', path: '/dashboard/accounts' },
        { title: 'Savings Account', path: '/dashboard/accounts' },
        { title: 'Fixed Deposits', path: '/dashboard/accounts' }
      ]
    },
    { 
      name: 'Transactions', 
      icon: <FaExchangeAlt />,
      items: [
        { title: 'Transfer Money', path: '/dashboard/transactions' },
        { title: 'Bills & Payments', path: '/dashboard/bills' },
        { title: 'Transaction History', path: '/dashboard/transactions' }
      ]
    },
    { 
      name: 'Investments', 
      icon: <FaChartBar />,
      items: [
        { title: 'Stocks', path: '/dashboard/investments/stocks' },
        { title: 'Mutual Funds', path: '/dashboard/investments/mutual-funds' },
        { title: 'Cryptocurrency', path: '/dashboard/investments/crypto' }
      ]
    },
    { 
      name: 'Cards', 
      icon: <FaCreditCard />,
      items: [
        { title: 'Credit Cards', path: '/dashboard/cards' },
        { title: 'Debit Cards', path: '/dashboard/cards' },
        { title: 'Virtual Cards', path: '/dashboard/cards' }
      ]
    }
  ];

  // Handle search result click
  const handleResultClick = useCallback((path) => {
    navigate(path);
    setIsSearchOpen(false);
    setSearchQuery('');
    setSearchResults([]);
    setSelectedIndex(-1);
  }, [navigate]);

  // Handle hover events
  const handleSearchHover = () => {
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }
    setIsSearchOpen(true);
    // Focus input after a small delay to ensure the dropdown is visible
    setTimeout(() => {
      inputRef.current?.focus();
    }, 100);
  };

  const handleSearchLeave = () => {
    searchTimeoutRef.current = setTimeout(() => {
      setIsSearchOpen(false);
      setSearchQuery('');
      setSearchResults([]);
      setSelectedIndex(-1);
    }, 200); // Small delay to prevent flickering
  };

  // Handle click outside to close search
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsSearchOpen(false);
        setSearchQuery('');
        setSearchResults([]);
        setSelectedIndex(-1);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, []);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isSearchOpen) return;

      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          setSelectedIndex(prev => 
            prev < searchResults.length - 1 ? prev + 1 : prev
          );
          break;
        case 'ArrowUp':
          e.preventDefault();
          setSelectedIndex(prev => prev > 0 ? prev - 1 : prev);
          break;
        case 'Enter':
          e.preventDefault();
          if (selectedIndex >= 0 && selectedIndex < searchResults.length) {
            handleResultClick(searchResults[selectedIndex].path);
          }
          break;
        case 'Escape':
          e.preventDefault();
          setIsSearchOpen(false);
          setSearchQuery('');
          setSearchResults([]);
          setSelectedIndex(-1);
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isSearchOpen, searchResults, selectedIndex, handleResultClick]);

  // Handle search input
  const handleSearch = (query) => {
    setSearchQuery(query);
    setSelectedIndex(-1);
    
    if (query.trim()) {
      const results = searchableItems.filter(item =>
        item.title.toLowerCase().includes(query.toLowerCase())
      );
      setSearchResults(results);
      // Store recent search if not duplicate and not empty
      if (query.trim() && (!recentSearches.length || recentSearches[0] !== query.trim())) {
        const updated = [query.trim(), ...recentSearches.filter(q => q !== query.trim())].slice(0, 5);
        setRecentSearches(updated);
        localStorage.setItem('recentSearches', JSON.stringify(updated));
      }
    } else {
      setSearchResults([]);
    }
  };

  // Notification handlers
  const handleMarkAsRead = (notificationId) => {
    setNotifications(prevNotifications =>
      prevNotifications.map(notification =>
        notification.id === notificationId
          ? { ...notification, read: true }
          : notification
      )
    );
  };

  const handleMarkAllAsRead = () => {
    setNotifications(prevNotifications =>
      prevNotifications.map(notification => ({ ...notification, read: true }))
    );
  };

  const handleToggleImportant = (notificationId) => {
    setNotifications(prevNotifications =>
      prevNotifications.map(notification =>
        notification.id === notificationId
          ? { ...notification, important: !notification.important }
          : notification
      )
    );
  };

  // Notification Actions
  const handleArchive = (id) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };
  const handleDelete = (id) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };
  // Notification Settings
  const handleTogglePref = (type) => {
    setNotificationPrefs(prev => {
      const updated = { ...prev, [type]: !prev[type] };
      localStorage.setItem('notificationPrefs', JSON.stringify(updated));
      return updated;
    });
  };
  // Notification Sound
  useEffect(() => {
    if (notifications.some(n => !n.read && n.important)) {
      // Try to play custom sound, else fallback to beep
      const customSoundUrl = '/src/assets/notification.mp3';
      fetch(customSoundUrl, { method: 'HEAD' })
        .then(res => {
          if (res.ok) {
            const audio = new Audio(customSoundUrl);
            audio.play();
          } else {
            // fallback beep
            try {
              const ctx = new (window.AudioContext || window.webkitAudioContext)();
              const o = ctx.createOscillator();
              o.type = 'sine';
              o.frequency.value = 880;
              o.connect(ctx.destination);
              o.start();
              setTimeout(() => { o.stop(); ctx.close(); }, 150);
            } catch {
              // Ignore fallback beep failure
            }
          }
        })
        .catch(() => {
          // fallback beep
          try {
            const ctx = new (window.AudioContext || window.webkitAudioContext)();
            const o = ctx.createOscillator();
            o.type = 'sine';
            o.frequency.value = 880;
            o.connect(ctx.destination);
            o.start();
            setTimeout(() => { o.stop(); ctx.close(); }, 150);
          } catch {
            // Ignore fallback beep failure
          }
        });
    }
  }, [notifications]);

  const filteredNotifications = notifications.filter(notification => {
    if (!notificationPrefs[notification.type]) return false;
    switch (activeNotificationTab) {
      case 'unread':
        return !notification.read;
      case 'important':
        return notification.important;
      default:
        return true;
    }
  });

  const unreadCount = notifications.filter(n => !n.read).length;
  const importantCount = notifications.filter(n => n.important).length;

  // Handle Quick Link Click
  const handleQuickLinkClick = (category) => {
    setSearchQuery(category);
    const results = searchableItems.filter(item =>
      item.title.toLowerCase().includes(category.toLowerCase())
    );
    setSearchResults(results);
    inputRef.current?.focus();
  };

  // Handle Quick Link Item Click
  const handleQuickLinkItemClick = (path) => {
    navigate(path);
    setIsSearchOpen(false);
    setSearchQuery('');
    setSearchResults([]);
    setSelectedIndex(-1);
  };

  // --- 1. Add new state for recent searches, notification pagination, pinned quick links, and logout modal ---
  const [recentSearches, setRecentSearches] = useState(() => {
    const saved = localStorage.getItem('recentSearches');
    return saved ? JSON.parse(saved) : [];
  });
  const [notificationPage, setNotificationPage] = useState(1);
  const NOTIFICATIONS_PER_PAGE = 5;
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [pinnedQuickLinks, setPinnedQuickLinks] = useState(() => {
    const saved = localStorage.getItem('pinnedQuickLinks');
    return saved ? JSON.parse(saved) : [];
  });

  // --- 2. Notification Pagination ---
  const paginatedNotifications = filteredNotifications.slice(
    (notificationPage - 1) * NOTIFICATIONS_PER_PAGE,
    notificationPage * NOTIFICATIONS_PER_PAGE
  );
  const totalNotificationPages = Math.ceil(filteredNotifications.length / NOTIFICATIONS_PER_PAGE);
  useEffect(() => {
    // Reset to first page if filter changes
    setNotificationPage(1);
  }, [activeNotificationTab, filteredNotifications.length]);

  // --- 3. Customizable Quick Links ---
  const allQuickLinks = [
    ...pinnedQuickLinks.map(name => quickLinks.find(q => q.name === name)).filter(Boolean),
    ...quickLinks.filter(q => !pinnedQuickLinks.includes(q.name)),
  ];
  const handlePinQuickLink = (name) => {
    if (!pinnedQuickLinks.includes(name)) {
      const updated = [name, ...pinnedQuickLinks].slice(0, 4);
      setPinnedQuickLinks(updated);
      localStorage.setItem('pinnedQuickLinks', JSON.stringify(updated));
    }
  };
  const handleUnpinQuickLink = (name) => {
    const updated = pinnedQuickLinks.filter(q => q !== name);
    setPinnedQuickLinks(updated);
    localStorage.setItem('pinnedQuickLinks', JSON.stringify(updated));
  };

  // --- 4. Logout Confirmation Handler ---
  const handleLogout = async () => {
    setShowLogoutModal(false);
    const result = await logout();
    if (result.success) {
      navigate('/login');
    }
  };

  return (
    <header className="fixed w-full bg-white shadow-sm z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Brand */}
          <div className="flex items-center space-x-4">
            <Link to="/dashboard" className="text-2xl font-bold text-blue-600 relative">
              FinVerse
              <div className="absolute bottom-0 left-0 w-1/2 h-0.5 bg-green-500 rounded"></div>
            </Link>
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/dashboard" className="text-indigo-600 font-medium">
              Dashboard
            </Link>

            {/* Accounts Dropdown */}
            <div className="relative group">
              <button className="text-gray-600 hover:text-indigo-600 flex items-center space-x-1">
                <span>Accounts</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div className="absolute left-0 mt-2 w-72 bg-white rounded-lg shadow-lg py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <Link
                  to="/dashboard/accounts"
                  className="flex items-start px-4 py-3 hover:bg-gray-50"
                >
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600">
                    <FaWallet />
                  </div>
                  <div className="ml-3 flex-1">
                    <p className="text-sm font-medium text-gray-900 text-left">All Accounts</p>
                    <p className="text-xs text-gray-500 text-left">View all your accounts</p>
                  </div>
                </Link>
              </div>
            </div>

            {/* Transactions Dropdown */}
            <div className="relative group">
              <button className="text-gray-600 hover:text-indigo-600 flex items-center space-x-1">
                <span>Transactions</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div className="absolute left-0 mt-2 w-72 bg-white rounded-lg shadow-lg py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <Link
                  to="/dashboard/transactions"
                  className="flex items-start px-4 py-3 hover:bg-gray-50"
                >
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600">
                    <FaExchangeAlt />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900 text-left">All Transactions</p>
                    <p className="text-xs text-gray-500 text-left">View all your transactions</p>
                  </div>
                </Link>
                <Link
                  to="/dashboard/bills"
                  className="flex items-start px-4 py-3 hover:bg-gray-50"
                >
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600">
                    <FaFileInvoiceDollar />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900 text-left">Bills & Payments</p>
                    <p className="text-xs text-gray-500 text-left">Manage your bills</p>
                  </div>
                </Link>
              </div>
            </div>

            {/* Cards Dropdown */}
            <div className="relative group">
              <button className="text-gray-600 hover:text-indigo-600 flex items-center space-x-1">
                <span>Cards</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div className="absolute left-0 mt-2 w-72 bg-white rounded-lg shadow-lg py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <Link
                  to="/dashboard/cards/your-card"
                  className="flex items-start px-4 py-3 hover:bg-gray-50"
                >
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600">
                    <FaCreditCard />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900 text-left">Your Card</p>
                    <p className="text-xs text-gray-500 text-left">Manage your primary card</p>
                  </div>
                </Link>
                <Link
                  to="/dashboard/cards/debit-cards"
                  className="flex items-start px-4 py-3 hover:bg-gray-50"
                >
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600">
                    <FaCreditCard />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900 text-left">Debit Cards</p>
                    <p className="text-xs text-gray-500 text-left">Manage your debit cards</p>
                  </div>
                </Link>
                <Link
                  to="/dashboard/cards/credit-cards"
                  className="flex items-start px-4 py-3 hover:bg-gray-50"
                >
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600">
                    <FaCreditCard />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900 text-left">Credit Cards</p>
                    <p className="text-xs text-gray-500 text-left">Manage your credit cards</p>
                  </div>
                </Link>
              </div>
            </div>

            {/* Loans Dropdown */}
            <div className="relative group">
              <button className="text-gray-600 hover:text-indigo-600 flex items-center space-x-1">
                <span>Loans</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div className="absolute left-0 mt-2 w-72 bg-white rounded-lg shadow-lg py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <Link
                  to="/dashboard/loans/personal"
                  className="flex items-start px-4 py-3 hover:bg-gray-50"
                >
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600">
                    <FaMoneyBillWave />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900 text-left">Personal Loan</p>
                    <p className="text-xs text-gray-500 text-left">Manage your personal loans</p>
                  </div>
                </Link>
                <Link
                  to="/dashboard/loans/home"
                  className="flex items-start px-4 py-3 hover:bg-gray-50"
                >
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600">
                    <FaUniversity />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900 text-left">Home Loan</p>
                    <p className="text-xs text-gray-500 text-left">Manage your home loans</p>
                  </div>
                </Link>
                <Link
                  to="/dashboard/loans/vehicle"
                  className="flex items-start px-4 py-3 hover:bg-gray-50"
                >
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600">
                    <FaMoneyCheckAlt />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900 text-left">Car/Vehicle Loan</p>
                    <p className="text-xs text-gray-500 text-left">Manage your vehicle loans</p>
                  </div>
                </Link>
                <Link
                  to="/dashboard/loans/education"
                  className="flex items-start px-4 py-3 hover:bg-gray-50"
                >
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600">
                    <FaUniversity />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900 text-left">Education Loan</p>
                    <p className="text-xs text-gray-500 text-left">Manage your education loans</p>
                  </div>
                </Link>
                <Link
                  to="/dashboard/loans/business"
                  className="flex items-start px-4 py-3 hover:bg-gray-50"
                >
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600">
                    <FaMoneyBillWave />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900 text-left">Business Loan</p>
                    <p className="text-xs text-gray-500 text-left">Manage your business loans</p>
                  </div>
                </Link>
              </div>
            </div>

            {/* Investments Dropdown */}
            <div className="relative group">
              <button className="text-gray-600 hover:text-indigo-600 flex items-center space-x-1">
                <span>Investments</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div className="absolute left-0 mt-2 w-72 bg-white rounded-lg shadow-lg py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <Link
                  to="/dashboard/investments/overview"
                  className="flex items-start px-4 py-3 hover:bg-gray-50"
                >
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600">
                    <FaChartLine />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900 text-left">Portfolio Overview</p>
                    <p className="text-xs text-gray-500 text-left">View your investment portfolio</p>
                  </div>
                </Link>
                <Link
                  to="/dashboard/investments/mutual-funds"
                  className="flex items-start px-4 py-3 hover:bg-gray-50"
                >
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600">
                    <FaLandmark />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900 text-left">Mutual Funds</p>
                    <p className="text-xs text-gray-500 text-left">Manage your mutual funds</p>
                  </div>
                </Link>
                <Link
                  to="/dashboard/investments/fixed-deposits"
                  className="flex items-start px-4 py-3 hover:bg-gray-50"
                >
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600">
                    <FaUniversity />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900 text-left">Fixed Deposits (FDs)</p>
                    <p className="text-xs text-gray-500 text-left">Manage your fixed deposits</p>
                  </div>
                </Link>
                <Link
                  to="/dashboard/investments/recurring-deposits"
                  className="flex items-start px-4 py-3 hover:bg-gray-50"
                >
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600">
                    <FaPiggyBank />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900 text-left">Recurring Deposits (RDs)</p>
                    <p className="text-xs text-gray-500 text-left">Manage your recurring deposits</p>
                  </div>
                </Link>
                <Link
                  to="/dashboard/investments/stocks"
                  className="flex items-start px-4 py-3 hover:bg-gray-50"
                >
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600">
                    <FaChartBar />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900 text-left">Stocks Market</p>
                    <p className="text-xs text-gray-500 text-left">Manage your stock investments</p>
                  </div>
                </Link>
                <Link
                  to="/dashboard/investments/crypto"
                  className="flex items-start px-4 py-3 hover:bg-gray-50"
                >
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600">
                    <FaCoins />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900 text-left">Cryptocurrency</p>
                    <p className="text-xs text-gray-500 text-left">Manage your crypto investments</p>
                  </div>
                </Link>
                <Link
                  to="/dashboard/investments/gold-bonds"
                  className="flex items-start px-4 py-3 hover:bg-gray-50"
                >
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600">
                    <FaCoins />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900 text-left">Gold & Bonds</p>
                    <p className="text-xs text-gray-500 text-left">Manage your gold and bond investments</p>
                  </div>
                </Link>
              </div>
            </div>

            {/* Other Services Dropdown */}
            <div className="relative group">
              <button className="text-gray-600 hover:text-indigo-600 flex items-center space-x-1">
                <span>Other Services</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div className="absolute left-0 mt-2 w-72 bg-white rounded-lg shadow-lg py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                {/* Insurance with subcategories */}
                <div className="relative group/sub">
                  <button className="flex items-start px-4 py-3 w-full hover:bg-gray-50">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600">
                      <FaShieldAlt />
                    </div>
                    <div className="ml-3 flex-1 text-left">
                      <p className="text-sm font-medium text-gray-900 text-left">Insurance</p>
                      <p className="text-xs text-gray-500 text-left">Health, Life, Vehicle</p>
                    </div>
                    <svg className="w-4 h-4 ml-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                  <div className="absolute left-full top-0 w-48 bg-white rounded-lg shadow-lg py-2 opacity-0 invisible group-hover/sub:opacity-100 group-hover/sub:visible transition-all duration-200">
                    <Link to="/dashboard/insurance/health" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-600">Health Insurance</Link>
                    <Link to="/dashboard/insurance/life" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-600">Life Insurance</Link>
                    <Link to="/dashboard/insurance/vehicle" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-600">Vehicle Insurance</Link>
                  </div>
                </div>
                {/* Wealth Management with subcategories */}
                <div className="relative group/sub">
                  <button className="flex items-start px-4 py-3 w-full hover:bg-gray-50">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600">
                      <FaChartLine />
                    </div>
                    <div className="ml-3 flex-1 text-left">
                      <p className="text-sm font-medium text-gray-900 text-left">Wealth Management</p>
                      <p className="text-xs text-gray-500 text-left">Portfolio, Retirement, Tax</p>
                    </div>
                    <svg className="w-4 h-4 ml-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                  <div className="absolute left-full top-0 w-48 bg-white rounded-lg shadow-lg py-2 opacity-0 invisible group-hover/sub:opacity-100 group-hover/sub:visible transition-all duration-200">
                    <Link to="/dashboard/wealth/portfolio" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-600">Portfolio Management</Link>
                    <Link to="/dashboard/wealth/retirement" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-600">Retirement Planning</Link>
                    <Link to="/dashboard/wealth/tax" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-600">Tax Planning</Link>
                  </div>
                </div>
                {/* Digital Services with subcategories */}
                <div className="relative group/sub">
                  <button className="flex items-start px-4 py-3 w-full hover:bg-gray-50">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600">
                      <FaWallet />
                    </div>
                    <div className="ml-3 flex-1 text-left">
                      <p className="text-sm font-medium text-gray-900 text-left">Digital Services</p>
                      <p className="text-xs text-gray-500 text-left">Wallet, UPI, BillPay</p>
                    </div>
                    <svg className="w-4 h-4 ml-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                  <div className="absolute left-full top-0 w-48 bg-white rounded-lg shadow-lg py-2 opacity-0 invisible group-hover/sub:opacity-100 group-hover/sub:visible transition-all duration-200">
                    <Link to="/dashboard/digital/wallet" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-600">Digital Wallet</Link>
                    <Link to="/dashboard/digital/upi" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-600">UPI Services</Link>
                    <Link to="/dashboard/digital/billpay" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-600">Bill Payments</Link>
                  </div>
                </div>
                {/* Support with subcategories */}
                <div className="relative group/sub">
                  <button className="flex items-start px-4 py-3 w-full hover:bg-gray-50">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600">
                      <FaQuestionCircle />
                    </div>
                    <div className="ml-3 flex-1 text-left">
                      <p className="text-sm font-medium text-gray-900 text-left">Support</p>
                      <p className="text-xs text-gray-500 text-left">Help, Contact, Feedback</p>
                    </div>
                    <svg className="w-4 h-4 ml-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                  <div className="absolute left-full top-0 w-48 bg-white rounded-lg shadow-lg py-2 opacity-0 invisible group-hover/sub:opacity-100 group-hover/sub:visible transition-all duration-200">
                    <Link to="/dashboard/support/help" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-600">Help Center</Link>
                    <Link to="/dashboard/support/contact" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-600">Contact Us</Link>
                    <Link to="/dashboard/support/feedback" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-600">Feedback</Link>
                  </div>
                </div>
              </div>
            </div>
          </nav>

          {/* User Controls */}
          <div className="flex items-center space-x-4">
            {/* Search */}
            <div 
              className="relative" 
              ref={searchRef}
              onMouseEnter={handleSearchHover}
              onMouseLeave={handleSearchLeave}
            >
              <button
                className="p-2 text-gray-600 hover:text-gray-900 relative transition-colors duration-200"
              >
                <FaSearch className="w-5 h-5" />
                {searchQuery && (
                  <span className="absolute top-0 right-0 w-2 h-2 bg-blue-500 rounded-full ring-2 ring-white"></span>
                )}
              </button>

              {/* Search Dropdown */}
              {isSearchOpen && (
                <div 
                  className="absolute right-0 mt-2 w-96 bg-white rounded-xl shadow-lg py-2 z-50"
                  onMouseEnter={handleSearchHover}
                  onMouseLeave={handleSearchLeave}
                >
                  {/* Search Header */}
                  <div className="px-4 py-3 border-b border-gray-100">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">Search</h3>
                      <div className="flex items-center space-x-2">
                        <button 
                          onClick={() => {
                            setSearchQuery('');
                            setSearchResults([]);
                            setSelectedIndex(-1);
                            inputRef.current?.focus();
                          }}
                          className="p-1.5 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors duration-200"
                        >
                          <FaTimes className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    <div className="relative">
                      <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        ref={inputRef}
                        type="text"
                        placeholder="Search anything..."
                        value={searchQuery}
                        onChange={(e) => handleSearch(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                  </div>

                  {/* Recent Searches */}
                  {recentSearches.length > 0 && !searchQuery && (
                    <div className="px-4 py-2 border-b border-gray-100">
                      <h4 className="text-xs text-gray-500 mb-1">Recent Searches</h4>
                      <div className="flex flex-wrap gap-2">
                        {recentSearches.map((q, i) => (
                          <button
                            key={q + i}
                            onClick={() => handleSearch(q)}
                            className="px-2 py-1 bg-gray-100 hover:bg-indigo-100 text-xs rounded"
                          >
                            {q}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Search Results */}
                  <div className="max-h-96 overflow-y-auto">
                    {searchResults.length > 0 ? (
                      <div className="py-2">
                        {searchResults.map((result, index) => (
                          <button
                            key={result.id}
                            onClick={() => handleResultClick(result.path)}
                            className={`w-full px-4 py-3 flex items-center space-x-3 transition-colors duration-200 ${
                              index === selectedIndex 
                                ? 'bg-blue-50' 
                                : 'hover:bg-gray-50'
                            }`}
                            onMouseEnter={() => setSelectedIndex(index)}
                          >
                            <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
                              index === selectedIndex
                                ? 'bg-gradient-to-br from-blue-200 to-indigo-200 text-blue-700'
                                : 'bg-gradient-to-br from-blue-100 to-indigo-100 text-blue-600'
                            }`}>
                              {result.icon}
                            </div>
                            <div className="flex-1 text-left">
                              <p className={`text-sm font-medium ${
                                index === selectedIndex ? 'text-blue-600' : 'text-gray-900'
                              }`}>{result.title}</p>
                              <p className="text-xs text-gray-500 capitalize">{result.type}</p>
                            </div>
                            <div className={`flex-shrink-0 ${
                              index === selectedIndex ? 'opacity-100' : 'opacity-0'
                            }`}>
                              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                              </svg>
                            </div>
                          </button>
                        ))}
                      </div>
                    ) : searchQuery ? (
                      <div className="px-4 py-8 text-center">
                        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
                          <FaSearch className="w-8 h-8 text-gray-400" />
                        </div>
                        <p className="text-gray-500 font-medium">No results found</p>
                        <p className="text-sm text-gray-400 mt-1">Try different keywords</p>
                      </div>
                    ) : (
                      <div className="px-4 py-8 text-center">
                        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-blue-100 flex items-center justify-center">
                          <FaSearch className="w-8 h-8 text-blue-600" />
                        </div>
                        <p className="text-gray-500 font-medium">Start typing to search</p>
                        <p className="text-sm text-gray-400 mt-1">Search across accounts, transactions, and more</p>
                      </div>
                    )}
                  </div>

                  {/* Quick Links */}
                  {!searchQuery && (
                    <div className="px-4 py-3 border-t border-gray-100 bg-gray-50">
                      <h3 className="text-sm font-medium text-gray-900 mb-3">Quick Links</h3>
                      <div className="grid grid-cols-2 gap-3">
                        {allQuickLinks.map((category) => (
                          <div key={category.name} className="relative group">
                            <button
                              onClick={() => handleQuickLinkClick(category.name)}
                              className="w-full px-3 py-2 text-sm text-gray-600 hover:bg-white rounded-lg transition-colors duration-200 flex items-center space-x-2 group"
                            >
                              <span className="text-gray-400 group-hover:text-indigo-600 transition-colors duration-200">
                                {category.icon}
                              </span>
                              <span>{category.name}</span>
                            </button>
                            <button
                              onClick={() => pinnedQuickLinks.includes(category.name) ? handleUnpinQuickLink(category.name) : handlePinQuickLink(category.name)}
                              className={`absolute top-1 right-1 text-xs px-1 py-0.5 rounded ${pinnedQuickLinks.includes(category.name) ? 'bg-yellow-200 text-yellow-800' : 'bg-gray-200 text-gray-600'} hover:bg-yellow-300`}
                              title={pinnedQuickLinks.includes(category.name) ? 'Unpin' : 'Pin'}
                            >
                              {pinnedQuickLinks.includes(category.name) ? 'Unpin' : 'Pin'}
                            </button>
                            <div className="absolute left-0 mt-1 w-48 bg-white rounded-lg shadow-lg py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                              {category.items.map((item) => (
                                <button
                                  key={item.title}
                                  onClick={() => handleQuickLinkItemClick(item.path)}
                                  className="w-full px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 text-left transition-colors duration-200"
                                >
                                  {item.title}
                                </button>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Search Footer */}
                  <div className="px-4 py-3 border-t border-gray-100 bg-gray-50">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="text-xs text-gray-500">
                          {searchResults.length} results found
                        </span>
                      </div>
                      <button
                        onClick={() => {
                          setIsSearchOpen(false);
                          setSearchQuery('');
                          setSearchResults([]);
                          setSelectedIndex(-1);
                        }}
                        className="text-sm text-indigo-600 hover:text-indigo-700 font-medium flex items-center space-x-1"
                      >
                        <span>Close</span>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Notifications Dropdown */}
            <div className="relative group">
              <button className="p-2 text-gray-600 hover:text-gray-900 relative transition-colors duration-200">
                <FaBell className="w-5 h-5" />
                {unreadCount > 0 && (
                  <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white"></span>
                )}
              </button>

              <div className="absolute right-0 mt-2 w-96 bg-white rounded-xl shadow-lg py-2 z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform origin-top-right">
                {/* Notifications Header */}
                <div className="px-4 py-3 border-b border-gray-100">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-900">Notifications</h3>
                    <div className="flex items-center space-x-2">
                      <button 
                        onClick={handleMarkAllAsRead}
                        className="p-1.5 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors duration-200"
                        title="Mark all as read"
                      >
                        <FaCheckCircle className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => setShowNotificationSettings(true)}
                        className="p-1.5 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors duration-200"
                        title="Notification settings"
                      >
                        <FaCog className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  <div className="mt-2 flex items-center space-x-4">
                    <button 
                      onClick={() => setActiveNotificationTab('all')}
                      className={`text-sm font-medium pb-1 ${
                        activeNotificationTab === 'all' 
                          ? 'text-indigo-600 border-b-2 border-indigo-600' 
                          : 'text-gray-500 hover:text-gray-700'
                      }`}
                    >
                      All
                    </button>
                    <button 
                      onClick={() => setActiveNotificationTab('unread')}
                      className={`text-sm pb-1 flex items-center space-x-1 ${
                        activeNotificationTab === 'unread' 
                          ? 'text-indigo-600 border-b-2 border-indigo-600' 
                          : 'text-gray-500 hover:text-gray-700'
                      }`}
                    >
                      <span>Unread</span>
                      {unreadCount > 0 && (
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                          {unreadCount}
                        </span>
                      )}
                    </button>
                    <button 
                      onClick={() => setActiveNotificationTab('important')}
                      className={`text-sm pb-1 flex items-center space-x-1 ${
                        activeNotificationTab === 'important' 
                          ? 'text-indigo-600 border-b-2 border-indigo-600' 
                          : 'text-gray-500 hover:text-gray-700'
                      }`}
                    >
                      <span>Important</span>
                      {importantCount > 0 && (
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                          {importantCount}
                        </span>
                      )}
                    </button>
                  </div>
                </div>

                {/* Notifications List */}
                <div className="max-h-96 overflow-y-auto">
                  {paginatedNotifications.length > 0 ? (
                    paginatedNotifications.map((notification) => (
                      <div
                        key={notification.id}
                        className={`px-4 py-3 hover:bg-gray-50 cursor-pointer transition-colors duration-200 ${
                          !notification.read ? "bg-indigo-50" : ""
                        }`}
                      >
                        <div className="flex items-start space-x-3">
                          <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                            notification.type === 'transaction' ? 'bg-green-100 text-green-600' :
                            notification.type === 'security' ? 'bg-red-100 text-red-600' :
                            notification.type === 'payment' ? 'bg-yellow-100 text-yellow-600' :
                            notification.type === 'investment' ? 'bg-blue-100 text-blue-600' :
                            'bg-gray-100 text-gray-600'
                          }`}>
                            {notification.type === 'transaction' ? <FaMoneyBillWave className="w-4 h-4" /> :
                             notification.type === 'security' ? <FaShieldAlt className="w-4 h-4" /> :
                             notification.type === 'payment' ? <FaCreditCard className="w-4 h-4" /> :
                             notification.type === 'investment' ? <FaChartLine className="w-4 h-4" /> :
                             <FaBell className="w-4 h-4" />}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <p className="text-sm font-medium text-gray-900">{notification.title}</p>
                              <span className="text-xs text-gray-500">{notification.time}</span>
                            </div>
                            <p className="text-sm text-gray-600 mt-0.5">{notification.message}</p>
                            <div className="mt-2 flex items-center space-x-2">
                              {!notification.read && (
                                <button 
                                  onClick={() => handleMarkAsRead(notification.id)}
                                  className="text-xs text-indigo-600 hover:text-indigo-700 font-medium"
                                >
                                  Mark as read
                                </button>
                              )}
                              <button 
                                onClick={() => handleToggleImportant(notification.id)}
                                className={`text-xs font-medium ${
                                  notification.important 
                                    ? 'text-red-600 hover:text-red-700' 
                                    : 'text-gray-600 hover:text-gray-700'
                                }`}
                              >
                                {notification.important ? 'Remove from important' : 'Mark as important'}
                              </button>
                              <button
                                onClick={() => handleArchive(notification.id)}
                                className="text-xs text-yellow-600 hover:text-yellow-700 font-medium"
                              >
                                Archive
                              </button>
                              <button
                                onClick={() => handleDelete(notification.id)}
                                className="text-xs text-red-600 hover:text-red-700 font-medium"
                              >
                                Delete
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="px-4 py-8 text-center">
                      <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
                        <FaBell className="w-8 h-8 text-gray-400" />
                      </div>
                      <p className="text-gray-500 font-medium">No notifications</p>
                      <p className="text-sm text-gray-400 mt-1">
                        {activeNotificationTab === 'unread' 
                          ? 'You have no unread notifications'
                          : activeNotificationTab === 'important'
                          ? 'You have no important notifications'
                          : 'You have no notifications'}
                      </p>
                    </div>
                  )}
                </div>

                {/* Notification Pagination Controls */}
                {totalNotificationPages > 1 && (
                  <div className="flex justify-center items-center gap-2 py-2">
                    <button
                      onClick={() => setNotificationPage(p => Math.max(1, p - 1))}
                      disabled={notificationPage === 1}
                      className="px-2 py-1 text-xs rounded bg-gray-100 hover:bg-indigo-100 disabled:opacity-50"
                    >Prev</button>
                    <span className="text-xs text-gray-500">Page {notificationPage} of {totalNotificationPages}</span>
                    <button
                      onClick={() => setNotificationPage(p => Math.min(totalNotificationPages, p + 1))}
                      disabled={notificationPage === totalNotificationPages}
                      className="px-2 py-1 text-xs rounded bg-gray-100 hover:bg-indigo-100 disabled:opacity-50"
                    >Next</button>
                  </div>
                )}

                {/* Notifications Footer */}
                <div className="px-4 py-3 border-t border-gray-100 bg-gray-50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="text-xs text-gray-500">
                        {unreadCount} unread notifications
                      </span>
                    </div>
                    <Link
                      to="/notifications"
                      className="text-sm text-indigo-600 hover:text-indigo-700 font-medium flex items-center space-x-1"
                    >
                      <span>View all</span>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Profile Dropdown */}
            <div className="relative group">
              <button className="flex items-center space-x-2 p-2 text-gray-600 hover:text-gray-900 transition-colors duration-200">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-blue-500 flex items-center justify-center text-white shadow-sm overflow-hidden">
                  {user?.displayName ? user.displayName.charAt(0).toUpperCase() : <FaUser className="w-4 h-4" />}
                </div>
                <div className="hidden md:block text-left">
                  <span className="text-sm font-medium block text-left">{user?.displayName || "User"}</span>
                  <span className="text-xs text-gray-500 block">Premium Account</span>
                </div>
              </button>

              <div className="absolute right-0 mt-2 w-72 bg-white rounded-xl shadow-lg py-2 z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform origin-top-right">
                {/* Profile Header */}
                <div className="px-4 py-3 border-b border-gray-100">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-blue-500 flex items-center justify-center text-white text-lg font-semibold shadow-sm text-left overflow-hidden">
                      {user?.displayName ? user.displayName.charAt(0).toUpperCase() : <FaUser className="w-6 h-6 text-left" />}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-900 text-left">{user?.displayName || "User"}</p>
                      <p className="text-xs text-gray-500">{user?.email || "user@example.com"}</p>
                      <div className="mt-1 flex items-center">
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-indigo-100 text-indigo-800">
                          <FaShieldAlt className="w-3 h-3 mr-1" />
                          Premium
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Quick Stats */}
                <div className="px-4 py-3 border-b border-gray-100">
                  <div className="grid grid-cols-3 gap-2">
                    <div className="text-center">
                      <p className="text-xs text-gray-500">Balance</p>
                      <p className="text-sm font-semibold text-gray-900">₹25,000</p>
                    </div>
                    <div className="text-center border-l border-r border-gray-100">
                      <p className="text-xs text-gray-500">Cards</p>
                      <p className="text-sm font-semibold text-gray-900">2</p>
                    </div>
                    <div className="text-center">
                      <p className="text-xs text-gray-500">Points</p>
                      <p className="text-sm font-semibold text-gray-900">1,250</p>
                    </div>
                  </div>
                </div>

                {/* Navigation Links */}
                <div className="py-1">
                  <Link
                    to="/profile"
                    className="flex items-center px-4 py-2.5 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition-colors duration-200"
                  >
                    <FaUserCircle className="w-4 h-4 mr-3 text-gray-400" />
                    <span>My Profile</span>
                  </Link>
                  <Link
                    to="/settings"
                    className="flex items-center px-4 py-2.5 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition-colors duration-200"
                  >
                    <FaCog className="w-4 h-4 mr-3 text-gray-400" />
                    <span>Settings</span>
                  </Link>
                  <Link
                    to="/account-security"
                    className="flex items-center px-4 py-2.5 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition-colors duration-200"
                  >
                    <FaLock className="w-4 h-4 mr-3 text-gray-400" />
                    <span>Security</span>
                  </Link>
                  <Link
                    to="/help-support"
                    className="flex items-center px-4 py-2.5 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition-colors duration-200"
                  >
                    <FaQuestionCircle className="w-4 h-4 mr-3 text-gray-400" />
                    <span>Help & Support</span>
                  </Link>
                </div>

                {/* Account Status */}
                <div className="px-4 py-2 border-t border-gray-100">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-xs text-gray-500">Account Active</span>
                    </div>
                    <span className="text-xs text-indigo-600 font-medium">Last login: 2m ago</span>
                  </div>
                </div>

                {/* Sign Out */}
                <div className="py-1 border-t border-gray-100">
                  <button
                    onClick={() => setShowLogoutModal(true)}
                    className="flex items-center w-full px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors duration-200"
                  >
                    <FaSignOutAlt className="w-4 h-4 mr-3" />
                    <span>Sign out</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Notification Settings Modal */}
      {showNotificationSettings && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-xl shadow-lg p-6 w-96">
            <h2 className="text-lg font-bold mb-4">Notification Settings</h2>
            <div className="space-y-3 mb-6">
              {Object.keys(notificationPrefs).map(type => (
                <label key={type} className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    checked={notificationPrefs[type]}
                    onChange={() => handleTogglePref(type)}
                  />
                  <span className="capitalize">{type}</span>
                </label>
              ))}
            </div>
            <div className="flex justify-end">
              <button
                onClick={() => setShowNotificationSettings(false)}
                className="px-4 py-2 text-sm font-medium bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Logout Confirmation Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-xl shadow-lg p-6 w-96">
            <h2 className="text-lg font-bold mb-4">Confirm Logout</h2>
            <p className="mb-6 text-gray-600">Are you sure you want to sign out?</p>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowLogoutModal(false)}
                className="px-4 py-2 text-sm font-medium bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
              >Cancel</button>
              <button
                onClick={handleLogout}
                className="px-4 py-2 text-sm font-medium bg-red-600 text-white rounded-lg hover:bg-red-700"
              >Logout</button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default DashboardPageHeader;