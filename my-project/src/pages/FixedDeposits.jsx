import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { 
  FaUniversity, FaExchangeAlt, FaHistory, FaDownload, 
  FaFileInvoiceDollar, FaChartLine, FaCreditCard, FaArrowUp, 
  FaArrowDown, FaCalendarAlt, FaClock, FaUserCircle, FaBuilding,
  FaCheckCircle, FaTimesCircle, FaSpinner, FaPercent, FaLock,
  FaCalendarDay, FaMoneyBillWave, FaCalculator, FaSearch,
  FaFilter, FaTag, FaInfoCircle, FaChartBar, FaChartPie,
  FaCalendarCheck, FaHourglassHalf, FaBalanceScale, FaSync,
  FaUserFriends, FaFileInvoice, FaChartArea, FaLockOpen,
  FaMoneyBillAlt, FaLightbulb, FaPhone, FaEnvelope, FaMapMarkerAlt
} from 'react-icons/fa';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { Line, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const FixedDeposits = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [showDownloadModal, setShowDownloadModal] = useState(false);
  const [showCalculatorModal, setShowCalculatorModal] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [notification, setNotification] = useState({ show: false, type: '', message: '' });

  // FD Calculator State
  const [calculatorAmount, setCalculatorAmount] = useState('');
  const [calculatorTenure, setCalculatorTenure] = useState('12');
  const [calculatorRate, setCalculatorRate] = useState('6.0');
  const [calculatedInterest, setCalculatedInterest] = useState(null);
  const [calculatedMaturity, setCalculatedMaturity] = useState(null);

  // Statement Download State
  const [statementPeriod, setStatementPeriod] = useState('last_month');
  const [statementFormat, setStatementFormat] = useState('pdf');

  // Add new state for comparison
  const [showComparisonModal, setShowComparisonModal] = useState(false);
  const [comparisonAmount, setComparisonAmount] = useState('');
  const [comparisonResults, setComparisonResults] = useState(null);

  // Add new state for Renew FD
  const [showRenewModal, setShowRenewModal] = useState(false);
  const [renewAmount, setRenewAmount] = useState('');
  const [renewTenure, setRenewTenure] = useState('12');
  const [renewInterestRate, setRenewInterestRate] = useState('6.0');
  const [renewInterestPayout, setRenewInterestPayout] = useState('monthly');
  const [renewLoading, setRenewLoading] = useState(false);

  // Interest tracking data
  const interestTrackingData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Interest Earned',
        data: [500, 500, 500, 500, 500, 500],
        borderColor: 'rgb(128, 0, 128)',
        backgroundColor: 'rgba(128, 0, 128, 0.1)',
        tension: 0.4,
        fill: true
      }
    ]
  };

  // Interest payout schedule
  const interestPayoutSchedule = [
    { date: '2024-04-15', amount: 500, status: 'upcoming' },
    { date: '2024-05-15', amount: 500, status: 'upcoming' },
    { date: '2024-06-15', amount: 500, status: 'upcoming' },
    { date: '2024-07-15', amount: 500, status: 'upcoming' },
    { date: '2024-08-15', amount: 500, status: 'upcoming' },
    { date: '2024-09-15', amount: 500, status: 'upcoming' }
  ];

  // Account Overview Data
  const accountData = {
    accountNumber: 'FD123456789',
    accountType: 'Premium Fixed Deposit',
    principalAmount: 100000.00,
    maturityAmount: 112000.00,
    interestEarned: 12000.00,
    lastUpdated: new Date().toLocaleString(),
    status: 'Active',
    branch: 'Pune Main Branch',
    ifscCode: 'FINV0001234',
    interestRate: 6.0,
    tenure: '12 months',
    startDate: '2024-01-01',
    maturityDate: '2025-01-01',
    daysRemaining: 280,
    interestPayout: 'Monthly'
  };

  // Recent Transactions
  const recentTransactions = [
    {
      id: 1,
      type: 'credit',
      amount: 500.00,
      description: 'Monthly Interest Payout',
      date: '2024-03-15',
      time: '09:30 AM',
      status: 'completed',
      category: 'Interest'
    },
    {
      id: 2,
      type: 'credit',
      amount: 500.00,
      description: 'Monthly Interest Payout',
      date: '2024-02-15',
      time: '09:30 AM',
      status: 'completed',
      category: 'Interest'
    },
    {
      id: 3,
      type: 'credit',
      amount: 500.00,
      description: 'Monthly Interest Payout',
      date: '2024-01-15',
      time: '09:30 AM',
      status: 'completed',
      category: 'Interest'
    }
  ];

  // Enhanced Quick Actions with routes
  const quickActions = [
    { 
      id: 'renew',
      icon: <FaExchangeAlt />, 
      title: 'Renew FD', 
      description: 'Renew your fixed deposit',
      route: '/fd/renew'
    },
    { 
      id: 'statement',
      icon: <FaFileInvoiceDollar />, 
      title: 'Download Statement', 
      description: 'Get your FD statement',
      route: null
    },
    { 
      id: 'calculator',
      icon: <FaCalculator />, 
      title: 'FD Calculator', 
      description: 'Calculate FD returns',
      route: null
    },
    { 
      id: 'history',
      icon: <FaHistory />, 
      title: 'Transaction History', 
      description: 'View all transactions',
      route: '/transactions/history'
    }
  ];

  // Handle quick action click
  const handleQuickActionClick = (action) => {
    switch (action.id) {
      case 'renew':
        setShowRenewModal(true);
        break;
      case 'statement':
        setShowDownloadModal(true);
        break;
      case 'calculator':
        setShowCalculatorModal(true);
        break;
      default:
        if (action.route) {
          navigate(action.route);
        }
        break;
    }
  };

  // Calculate FD returns
  const calculateFDReturns = () => {
    const principal = parseFloat(calculatorAmount);
    const rate = parseFloat(calculatorRate);
    const tenure = parseInt(calculatorTenure);

    if (principal && rate && tenure) {
      const interest = (principal * rate * tenure) / (12 * 100);
      const maturity = principal + interest;

      setCalculatedInterest(interest);
      setCalculatedMaturity(maturity);
    }
  };

  // Handle statement download
  const handleDownloadStatement = async () => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const doc = new jsPDF();
      
      // Add header
      doc.setFontSize(20);
      doc.text('Fixed Deposit Statement', 105, 20, { align: 'center' });
      
      // Add FD details
      doc.setFontSize(12);
      doc.text(`Account Number: ${accountData.accountNumber}`, 20, 40);
      doc.text(`FD Type: ${accountData.accountType}`, 20, 50);
      doc.text(`Statement Period: ${statementPeriod}`, 20, 60);
      doc.text(`Date Generated: ${new Date().toLocaleDateString()}`, 20, 70);
      
      // Add FD summary
      doc.setFontSize(14);
      doc.text('FD Summary', 20, 90);
      doc.setFontSize(12);
      doc.text(`Principal Amount: ₹${accountData.principalAmount.toLocaleString()}`, 30, 100);
      doc.text(`Interest Rate: ${accountData.interestRate}%`, 30, 110);
      doc.text(`Tenure: ${accountData.tenure}`, 30, 120);
      doc.text(`Maturity Amount: ₹${accountData.maturityAmount.toLocaleString()}`, 30, 130);
      doc.text(`Interest Earned: ₹${accountData.interestEarned.toLocaleString()}`, 30, 140);
      
      // Add transaction table
      doc.setFontSize(14);
      doc.text('Recent Transactions', 20, 160);
      
      const tableData = recentTransactions.map(transaction => [
        transaction.date,
        transaction.description,
        transaction.category,
        `+₹${transaction.amount.toLocaleString()}`,
        transaction.status
      ]);
      
      autoTable(doc, {
        startY: 170,
        head: [['Date', 'Description', 'Category', 'Amount', 'Status']],
        body: tableData,
        theme: 'grid',
        headStyles: { fillColor: [128, 0, 128] },
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
      
      doc.save(`fd_statement_${statementPeriod}_${new Date().toISOString().split('T')[0]}.pdf`);
      showNotification('success', 'Statement downloaded successfully');
      setShowDownloadModal(false);
    } catch (error) {
      console.error('Error downloading statement:', error);
      showNotification('error', 'Failed to download statement');
    } finally {
      setIsLoading(false);
    }
  };

  // Calculate days until maturity (fixed)
  const calculateDaysUntilMaturity = () => {
    const today = new Date();
    const maturityDate = new Date('2025-01-01');
    const diffTime = maturityDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
  };

  // Calculate FD progress
  const calculateFDProgress = () => {
    const startDate = new Date('2024-01-01');
    const maturityDate = new Date('2025-01-01');
    const today = new Date();
    
    const totalDays = (maturityDate - startDate) / (1000 * 60 * 60 * 24);
    const daysCompleted = (today - startDate) / (1000 * 60 * 60 * 24);
    const progress = (daysCompleted / totalDays) * 100;
    
    return {
      percentage: Math.min(Math.max(progress, 0), 100),
      daysCompleted: Math.floor(daysCompleted),
      totalDays: Math.floor(totalDays)
    };
  };

  // Compare FD tenures
  const compareFDTenures = () => {
    const amount = parseFloat(comparisonAmount);
    if (!amount) return;

    const tenures = [3, 6, 12, 24, 36];
    const results = tenures.map(tenure => {
      const interest = (amount * accountData.interestRate * tenure) / (12 * 100);
      const maturity = amount + interest;
      return {
        tenure,
        interest,
        maturity
      };
    });

    setComparisonResults(results);
  };

  // Handle FD renewal
  const handleRenewFD = async () => {
    setRenewLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Update account data with new FD details
      const newMaturityDate = new Date();
      newMaturityDate.setMonth(newMaturityDate.getMonth() + parseInt(renewTenure));
      
      // Show success notification
      showNotification('success', 'Fixed Deposit renewed successfully');
      setShowRenewModal(false);
      
      // Reset form
      setRenewAmount('');
      setRenewTenure('12');
      setRenewInterestRate('6.0');
      setRenewInterestPayout('monthly');
    } catch (error) {
      console.error('Error renewing FD:', error);
      showNotification('error', 'Failed to renew Fixed Deposit');
    } finally {
      setRenewLoading(false);
    }
  };

  // Show notification
  const showNotification = (type, message) => {
    setNotification({ show: true, type, message });
    setTimeout(() => setNotification({ show: false, type: '', message: '' }), 3000);
  };

  // Add new state for FD features
  const [autoRenewal, setAutoRenewal] = useState({
    enabled: false,
    type: 'principal_only' // 'principal_only' or 'principal_interest'
  });
  const [nomineeDetails, setNomineeDetails] = useState({
    name: 'Anjali Sawarkar',
    relationship: 'Sister',
    pan: 'ABCDE1234F'
  });
  const [showNomineeModal, setShowNomineeModal] = useState(false);
  const [tdsDetails, setTdsDetails] = useState({
    amount: 200,
    month: 'March',
    panLinked: true
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-50">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-24">
        {/* Account Header */}
        <div className="mb-8">
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="bg-gradient-to-r from-purple-600 to-indigo-600 px-6 py-8">
              <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6">
                <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border-4 border-white/30">
                  <FaUniversity className="w-8 h-8 text-white" />
                </div>
                <div className="text-center md:text-left">
                  <h1 className="text-2xl font-bold text-white">Fixed Deposit</h1>
                  <p className="text-purple-100 mt-1">Account Number: {accountData.accountNumber}</p>
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
            {/* User Profile Information */}
            <div className="px-6 py-4 border-t border-gray-100">
              <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6">
                <div className="w-16 h-16 rounded-full bg-purple-100 flex items-center justify-center">
                  <FaUserCircle className="w-10 h-10 text-purple-600" />
                </div>
                <div className="text-center md:text-left">
                  <h2 className="text-lg font-semibold text-gray-900">Ritik Sawarkar</h2>
                  <div className="mt-2 space-y-1">
                    <p className="text-sm text-gray-600 flex items-center justify-center md:justify-start">
                      <FaPhone className="w-4 h-4 mr-2 text-purple-600" />
                      +91-9876543210
                    </p>
                    <p className="text-sm text-gray-600 flex items-center justify-center md:justify-start">
                      <FaEnvelope className="w-4 h-4 mr-2 text-purple-600" />
                      ritik@finverse.com
                    </p>
                    <p className="text-sm text-gray-600 flex items-center justify-center md:justify-start">
                      <FaMapMarkerAlt className="w-4 h-4 mr-2 text-purple-600" />
                      Pune, India
                    </p>
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
                    <p className="text-sm text-gray-600">Principal Amount</p>
                    <p className="text-2xl font-bold text-gray-900 mt-1">₹{accountData.principalAmount.toLocaleString()}</p>
                    <p className="text-xs text-gray-500 mt-1">Initial investment</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg hover:shadow-sm transition-all duration-300">
                    <p className="text-sm text-gray-600">Maturity Amount</p>
                    <p className="text-2xl font-bold text-gray-900 mt-1">₹{accountData.maturityAmount.toLocaleString()}</p>
                    <p className="text-xs text-gray-500 mt-1">Expected at maturity</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg hover:shadow-sm transition-all duration-300">
                    <p className="text-sm text-gray-600">Interest Rate</p>
                    <p className="text-2xl font-bold text-gray-900 mt-1">{accountData.interestRate}%</p>
                    <p className="text-xs text-gray-500 mt-1">Annual interest rate</p>
                  </div>
                </div>
              </div>
            </div>

            {/* FD Details */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-all duration-300">
              <div className="px-6 py-4 border-b border-gray-100">
                <h2 className="text-xl font-semibold text-gray-900">Fixed Deposit Details</h2>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-4 bg-gray-50 rounded-lg hover:shadow-sm transition-all duration-300">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-600">
                        <FaCalendarDay className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Tenure</p>
                        <p className="text-xl font-bold text-gray-900 mt-1">{accountData.tenure}</p>
                        <p className="text-xs text-gray-500 mt-1">{accountData.daysRemaining} days remaining</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg hover:shadow-sm transition-all duration-300">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-600">
                        <FaMoneyBillWave className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Interest Payout</p>
                        <p className="text-xl font-bold text-gray-900 mt-1">{accountData.interestPayout}</p>
                        <p className="text-xs text-gray-500 mt-1">Monthly interest credit</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* FD Progress Tracker */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-all duration-300">
              <div className="px-6 py-4 border-b border-gray-100">
                <h2 className="text-xl font-semibold text-gray-900">FD Progress</h2>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  <div className="w-full bg-gray-200 rounded-full h-4">
                    <div 
                      className="bg-purple-600 h-4 rounded-full transition-all duration-500"
                      style={{ width: `${calculateFDProgress().percentage}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>{calculateFDProgress().percentage.toFixed(1)}% Completed</span>
                    <span>{calculateFDProgress().daysCompleted}/{calculateFDProgress().totalDays} days</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Maturity Countdown */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-all duration-300">
              <div className="px-6 py-4 border-b border-gray-100">
                <h2 className="text-xl font-semibold text-gray-900">Maturity Countdown</h2>
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center text-purple-600">
                      <FaHourglassHalf className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Days until maturity</p>
                      <p className="text-2xl font-bold text-gray-900">{calculateDaysUntilMaturity()}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-600">Maturity Date</p>
                    <p className="text-lg font-semibold text-gray-900">2025-01-01</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Auto-Renewal Settings */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-all duration-300">
              <div className="px-6 py-4 border-b border-gray-100">
                <h2 className="text-xl font-semibold text-gray-900">Auto-Renewal Settings</h2>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-900">Auto-Renewal Status</p>
                      <p className="text-sm text-gray-500">Next Action: Maturity on 2025-01-01</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={autoRenewal.enabled}
                        onChange={(e) => setAutoRenewal(prev => ({ ...prev, enabled: e.target.checked }))}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                    </label>
                  </div>
                  {autoRenewal.enabled && (
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3">
                        <input
                          type="radio"
                          id="principal_only"
                          name="renewal_type"
                          checked={autoRenewal.type === 'principal_only'}
                          onChange={() => setAutoRenewal(prev => ({ ...prev, type: 'principal_only' }))}
                          className="w-4 h-4 text-purple-600 border-gray-300 focus:ring-purple-500"
                        />
                        <label htmlFor="principal_only" className="text-sm text-gray-700">
                          Auto-renew principal only
                        </label>
                      </div>
                      <div className="flex items-center space-x-3">
                        <input
                          type="radio"
                          id="principal_interest"
                          name="renewal_type"
                          checked={autoRenewal.type === 'principal_interest'}
                          onChange={() => setAutoRenewal(prev => ({ ...prev, type: 'principal_interest' }))}
                          className="w-4 h-4 text-purple-600 border-gray-300 focus:ring-purple-500"
                        />
                        <label htmlFor="principal_interest" className="text-sm text-gray-700">
                          Auto-renew principal + interest
                        </label>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Nominee Details */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-all duration-300">
              <div className="px-6 py-4 border-b border-gray-100">
                <h2 className="text-xl font-semibold text-gray-900">Nominee Details</h2>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-600">
                        <FaUserFriends className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">{nomineeDetails.name}</p>
                        <p className="text-sm text-gray-500">Relationship: {nomineeDetails.relationship}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => setShowNomineeModal(true)}
                      className="px-3 py-1 text-sm text-purple-600 hover:text-purple-700"
                    >
                      Edit
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* TDS Information */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-all duration-300">
              <div className="px-6 py-4 border-b border-gray-100">
                <h2 className="text-xl font-semibold text-gray-900">Tax Deducted at Source (TDS)</h2>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-900">TDS for {tdsDetails.month}</p>
                      <p className="text-sm text-gray-500">₹{tdsDetails.amount} deducted</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-500">PAN Linked:</span>
                      <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                        tdsDetails.panLinked ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {tdsDetails.panLinked ? 'Yes' : 'No'}
                      </span>
                    </div>
                  </div>
                  <button className="text-sm text-purple-600 hover:text-purple-700">
                    Download Form 16A
                  </button>
                </div>
              </div>
            </div>

            {/* Lock-in Period Info */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-all duration-300">
              <div className="px-6 py-4 border-b border-gray-100">
                <h2 className="text-xl font-semibold text-gray-900">Lock-in Period</h2>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-600">
                      <FaLock className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">Lock-in Period: 6 months</p>
                      <p className="text-sm text-gray-500">Ends on 2024-07-01</p>
                    </div>
                  </div>
                  <div className="bg-yellow-50 p-4 rounded-lg">
                    <p className="text-sm text-yellow-800">
                      ⚠️ Premature withdrawal charges apply
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Action Suggestions */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-all duration-300">
              <div className="px-6 py-4 border-b border-gray-100">
                <h2 className="text-xl font-semibold text-gray-900">Smart Suggestions</h2>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-600">
                      <FaLightbulb className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">Increase Returns</p>
                      <p className="text-sm text-gray-500">Increase principal by ₹50,000 and earn ₹1,200 more</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-600">
                      <FaMoneyBillAlt className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">Maximize Returns</p>
                      <p className="text-sm text-gray-500">Reinvest monthly payout to maximize returns</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-all duration-300">
              <div className="px-6 py-4 border-b border-gray-100">
                <h2 className="text-xl font-semibold text-gray-900">Quick Actions</h2>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {quickActions.map((action, index) => (
                    <button
                      key={index}
                      onClick={() => handleQuickActionClick(action)}
                      className="p-4 bg-gray-50 rounded-lg hover:shadow-sm transition-all duration-300 text-left"
                    >
                      <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 mb-3">
                        {action.icon}
                      </div>
                      <h3 className="font-medium text-gray-900">{action.title}</h3>
                      <p className="text-sm text-gray-500 mt-1">{action.description}</p>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Recent Transactions */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-all duration-300">
              <div className="px-6 py-4 border-b border-gray-100">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-gray-900">Recent Transactions</h2>
                  <button className="text-purple-600 hover:text-purple-700 text-sm font-medium">
                    View All
                  </button>
                </div>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {recentTransactions.map((transaction) => (
                    <div key={transaction.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:shadow-sm transition-all duration-300">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                          <FaArrowDown className="w-5 h-5" />
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
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-green-600">
                          +₹{transaction.amount.toLocaleString()}
                        </p>
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium mt-1 bg-green-100 text-green-800">
                          <FaCheckCircle className="w-3 h-3 mr-1" />
                          {transaction.status}
                        </span>
                      </div>
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
                <h2 className="text-xl font-semibold text-gray-900">FD Details</h2>
              </div>
              <div className="p-6 space-y-4">
                <div className="p-4 bg-gray-50 rounded-lg hover:shadow-sm transition-all duration-300">
                  <p className="text-sm text-gray-600">Account Number</p>
                  <p className="text-lg font-semibold text-gray-900 mt-1">{accountData.accountNumber}</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg hover:shadow-sm transition-all duration-300">
                  <p className="text-sm text-gray-600">Start Date</p>
                  <p className="text-lg font-semibold text-gray-900 mt-1">{accountData.startDate}</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg hover:shadow-sm transition-all duration-300">
                  <p className="text-sm text-gray-600">Maturity Date</p>
                  <p className="text-lg font-semibold text-gray-900 mt-1">{accountData.maturityDate}</p>
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
                <h2 className="text-xl font-semibold text-gray-900">FD Status</h2>
              </div>
              <div className="p-6 space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:shadow-sm transition-all duration-300">
                  <div className="flex items-center space-x-3">
                    <FaLock className="w-5 h-5 text-purple-600" />
                    <div>
                      <p className="text-sm text-gray-600">Status</p>
                      <p className="text-sm font-medium text-gray-900">{accountData.status}</p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:shadow-sm transition-all duration-300">
                  <div className="flex items-center space-x-3">
                    <FaClock className="w-5 h-5 text-purple-600" />
                    <div>
                      <p className="text-sm text-gray-600">Last Updated</p>
                      <p className="text-sm font-medium text-gray-900">{accountData.lastUpdated}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* FD Comparison */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-all duration-300">
              <div className="px-6 py-4 border-b border-gray-100">
                <h2 className="text-xl font-semibold text-gray-900">Compare FD Tenures</h2>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Amount (₹)</label>
                    <input
                      type="number"
                      value={comparisonAmount}
                      onChange={(e) => setComparisonAmount(e.target.value)}
                      placeholder="Enter amount"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                    />
                  </div>
                  <button
                    onClick={compareFDTenures}
                    className="w-full px-4 py-2 text-sm font-medium text-white bg-purple-600 rounded-lg hover:bg-purple-700"
                  >
                    Compare
                  </button>
                  {comparisonResults && (
                    <div className="mt-4 space-y-3">
                      {comparisonResults.map((result, index) => (
                        <div key={index} className="p-3 bg-gray-50 rounded-lg">
                          <p className="text-sm font-medium text-gray-900">{result.tenure} Months</p>
                          <div className="mt-2 space-y-1">
                            <p className="text-xs text-gray-600">Interest: ₹{result.interest.toLocaleString()}</p>
                            <p className="text-xs text-gray-600">Maturity: ₹{result.maturity.toLocaleString()}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

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
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                >
                  <option value="last_month">Last Month</option>
                  <option value="last_3_months">Last 3 Months</option>
                  <option value="last_6_months">Last 6 Months</option>
                  <option value="this_year">This Year</option>
                </select>
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
                  className="px-4 py-2 text-sm font-medium text-white bg-purple-600 rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed"
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

      {/* FD Calculator Modal */}
      {showCalculatorModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">FD Calculator</h3>
              <button
                onClick={() => setShowCalculatorModal(false)}
                className="text-gray-400 hover:text-gray-500"
              >
                <FaTimesCircle className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Principal Amount (₹)</label>
                <input
                  type="number"
                  value={calculatorAmount}
                  onChange={(e) => setCalculatorAmount(e.target.value)}
                  placeholder="Enter amount"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tenure (Months)</label>
                <select
                  value={calculatorTenure}
                  onChange={(e) => setCalculatorTenure(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                >
                  <option value="3">3 Months</option>
                  <option value="6">6 Months</option>
                  <option value="12">12 Months</option>
                  <option value="24">24 Months</option>
                  <option value="36">36 Months</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Interest Rate (%)</label>
                <input
                  type="number"
                  value={calculatorRate}
                  onChange={(e) => setCalculatorRate(e.target.value)}
                  placeholder="Enter rate"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                />
              </div>
              <button
                onClick={calculateFDReturns}
                className="w-full px-4 py-2 text-sm font-medium text-white bg-purple-600 rounded-lg hover:bg-purple-700"
              >
                Calculate Returns
              </button>
              {calculatedInterest !== null && calculatedMaturity !== null && (
                <div className="mt-4 space-y-2">
                  <div className="p-4 bg-purple-50 rounded-lg">
                    <p className="text-sm text-gray-600">Interest Earned</p>
                    <p className="text-2xl font-bold text-purple-600">₹{calculatedInterest.toLocaleString()}</p>
                  </div>
                  <div className="p-4 bg-purple-50 rounded-lg">
                    <p className="text-sm text-gray-600">Maturity Amount</p>
                    <p className="text-2xl font-bold text-purple-600">₹{calculatedMaturity.toLocaleString()}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Comparison Modal */}
      {showComparisonModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">FD Tenure Comparison</h3>
              <button
                onClick={() => setShowComparisonModal(false)}
                className="text-gray-400 hover:text-gray-500"
              >
                <FaTimesCircle className="w-5 h-5" />
              </button>
            </div>
            <div className="h-96">
              {comparisonResults && (
                <Bar
                  data={{
                    labels: comparisonResults.map(r => `${r.tenure} Months`),
                    datasets: [
                      {
                        label: 'Maturity Amount',
                        data: comparisonResults.map(r => r.maturity),
                        backgroundColor: 'rgba(128, 0, 128, 0.5)',
                      }
                    ]
                  }}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      legend: {
                        position: 'top',
                      },
                      title: {
                        display: true,
                        text: 'FD Tenure Comparison'
                      }
                    },
                    scales: {
                      y: {
                        beginAtZero: true,
                        ticks: {
                          callback: function(value) {
                            return '₹' + value.toLocaleString();
                          }
                        }
                      }
                    }
                  }}
                />
              )}
            </div>
          </div>
        </div>
      )}

      {/* Renew FD Modal */}
      {showRenewModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Renew Fixed Deposit</h3>
              <button
                onClick={() => setShowRenewModal(false)}
                className="text-gray-400 hover:text-gray-500"
              >
                <FaTimesCircle className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Principal Amount (₹)</label>
                <input
                  type="number"
                  value={renewAmount}
                  onChange={(e) => setRenewAmount(e.target.value)}
                  placeholder="Enter amount"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tenure (Months)</label>
                <select
                  value={renewTenure}
                  onChange={(e) => setRenewTenure(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                >
                  <option value="3">3 Months</option>
                  <option value="6">6 Months</option>
                  <option value="12">12 Months</option>
                  <option value="24">24 Months</option>
                  <option value="36">36 Months</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Interest Rate (%)</label>
                <input
                  type="number"
                  value={renewInterestRate}
                  onChange={(e) => setRenewInterestRate(e.target.value)}
                  placeholder="Enter rate"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Interest Payout</label>
                <select
                  value={renewInterestPayout}
                  onChange={(e) => setRenewInterestPayout(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                >
                  <option value="monthly">Monthly</option>
                  <option value="quarterly">Quarterly</option>
                  <option value="half_yearly">Half Yearly</option>
                  <option value="yearly">Yearly</option>
                  <option value="maturity">At Maturity</option>
                </select>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg">
                <h4 className="text-sm font-medium text-purple-900 mb-2">Estimated Returns</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-purple-700">Interest Earned:</span>
                    <span className="text-sm font-medium text-purple-900">
                      ₹{((parseFloat(renewAmount) || 0) * (parseFloat(renewInterestRate) || 0) * (parseInt(renewTenure) || 0) / (12 * 100)).toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-purple-700">Maturity Amount:</span>
                    <span className="text-sm font-medium text-purple-900">
                      ₹{((parseFloat(renewAmount) || 0) + ((parseFloat(renewAmount) || 0) * (parseFloat(renewInterestRate) || 0) * (parseInt(renewTenure) || 0) / (12 * 100))).toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setShowRenewModal(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900"
                >
                  Cancel
                </button>
                <button
                  onClick={handleRenewFD}
                  disabled={renewLoading || !renewAmount}
                  className="px-4 py-2 text-sm font-medium text-white bg-purple-600 rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {renewLoading ? (
                    <span className="flex items-center">
                      <FaSpinner className="w-4 h-4 mr-2 animate-spin" />
                      Processing...
                    </span>
                  ) : (
                    'Renew FD'
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Nominee Edit Modal */}
      {showNomineeModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Edit Nominee Details</h3>
              <button
                onClick={() => setShowNomineeModal(false)}
                className="text-gray-400 hover:text-gray-500"
              >
                <FaTimesCircle className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nominee Name</label>
                <input
                  type="text"
                  value={nomineeDetails.name}
                  onChange={(e) => setNomineeDetails(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Relationship</label>
                <input
                  type="text"
                  value={nomineeDetails.relationship}
                  onChange={(e) => setNomineeDetails(prev => ({ ...prev, relationship: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">PAN Number</label>
                <input
                  type="text"
                  value={nomineeDetails.pan}
                  onChange={(e) => setNomineeDetails(prev => ({ ...prev, pan: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                />
              </div>
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setShowNomineeModal(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    // Save nominee details
                    setShowNomineeModal(false);
                    showNotification('success', 'Nominee details updated successfully');
                  }}
                  className="px-4 py-2 text-sm font-medium text-white bg-purple-600 rounded-lg hover:bg-purple-700"
                >
                  Save Changes
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

export default FixedDeposits; 