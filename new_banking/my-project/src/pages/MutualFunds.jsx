import React, { useState, useMemo } from 'react';
import { 
  FaSearch, FaBell, FaUser, FaFilter, FaSort, FaDownload, FaChartLine,
  FaStar, FaInfoCircle, FaPlus, FaMinus, FaArrowUp,
  FaArrowDown, FaChartPie, FaChartBar, FaRupeeSign,
  FaCalendarAlt, FaShieldAlt, FaPercent, FaCalculator,
  FaHistory, FaFileAlt, FaDownload as FaFileDownload, FaTimes,
  FaChartArea, FaUserTie, FaLock, FaCheck, FaExchangeAlt,
  FaPhoneAlt, FaNewspaper, FaFileInvoiceDollar as FaStatement,
  FaWallet, FaShoppingCart, FaMoneyBillWave as FaMoneyBillWaveIcon, FaEye,
  FaCheckCircle, FaExclamationCircle, FaChartLine as FaCompare,
  FaBookmark, FaBookmark as FaBookmarkSolid, FaMedal, FaRocket,
  FaFileInvoiceDollar, FaChevronDown, FaChevronUp, FaLightbulb, FaGraduationCap,
  FaQuestionCircle, FaMoneyBillWave, FaUserCircle, FaChevronRight
} from 'react-icons/fa';
import ReactApexChart from 'react-apexcharts';
import DashboardPageHeader from '../components/DashboardPageHeader';
import DashboardPageFooter from '../components/DashboardPageFooter';

const MutualFunds = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedRiskLevels, setSelectedRiskLevels] = useState([]);
  const [selectedAMCs, setSelectedAMCs] = useState([]);
  const [selectedMarketCaps, setSelectedMarketCaps] = useState([]);
  const [sortBy, setSortBy] = useState('returnsHighToLow'); // Default sort
  const [selectedFund, setSelectedFund] = useState(null);
  const [showFundDetails, setShowFundDetails] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const fundsPerPage = 5; // Display 5 funds per page

  const [cart, setCart] = useState([]);
  const [showInvestmentModal, setShowInvestmentModal] = useState(false);
  const [selectedFundForInvestment, setSelectedFundForInvestment] = useState(null);
  const [investmentAmount, setInvestmentAmount] = useState(5000);
  const [investmentType, setInvestmentType] = useState('oneTime');
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showCartMessage, setShowCartMessage] = useState(false);

  const [selectedForComparison, setSelectedForComparison] = useState([]);
  const [showComparisonModal, setShowComparisonModal] = useState(false);
  const [showSipCalculator, setShowSipCalculator] = useState(false);
  const [sipAmount, setSipAmount] = useState(5000);
  const [sipDuration, setSipDuration] = useState(5);
  const [expectedReturn, setExpectedReturn] = useState(12);
  const [watchlist, setWatchlist] = useState([]);
  const [userInvestments, setUserInvestments] = useState([
    { fundId: 1, amount: 10000, date: '2024-01-15' },
    { fundId: 3, amount: 15000, date: '2024-02-01' }
  ]);

  const [isLoggedIn] = useState(true); // For demo purposes
  const [expandedFilters, setExpandedFilters] = useState({
    companies: true,
    categories: true,
    marketCap: true,
    risk: true
  });

  // Toggle filter section
  const toggleFilter = (section) => {
    setExpandedFilters(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  // Fund Categories (expanded for filters)
  const categories = [
    { id: 'equity', name: 'Equity' },
    { id: 'debt', name: 'Debt' },
    { id: 'hybrid', name: 'Hybrid' },
    { id: 'elss', name: 'ELSS (Tax Saving)' },
    { id: 'index', name: 'Index Funds' }
  ];

  // Risk Levels (expanded for filters)
  const riskLevels = [
    { id: 'low', name: 'Low Risk' },
    { id: 'moderate', name: 'Moderate Risk' },
    { id: 'high', name: 'High Risk' }
  ];

  // AMC List (expanded for filters)
  const amcs = [
    { id: 'sbi', name: 'SBI Mutual Fund' },
    { id: 'hdfc', name: 'HDFC Mutual Fund' },
    { id: 'axis', name: 'Axis Mutual Fund' },
    { id: 'icici', name: 'ICICI Prudential' },
    { id: 'kotak', name: 'Kotak Mahindra' },
    { id: 'mirae', name: 'Mirae Asset' },
    { id: 'parag', name: 'Parag Parikh' },
    { id: 'uti', name: 'UTI Mutual Fund' },
    { id: 'franklin', name: 'Franklin Templeton' }
  ];

  // Market Caps
  const marketCaps = [
    { id: 'large', name: 'Large Cap' },
    { id: 'large-mid', name: 'Large & Mid Cap' },
    { id: 'mid', name: 'Mid Cap' },
    { id: 'small', name: 'Small Cap' }
  ];

  // Fund Data (using the 10 funds from previous interaction, potentially adding more details if needed for card display)
  const funds = useMemo(() => [
    {
      id: 1,
      name: 'Axis Bluechip Fund',
      category: 'equity',
      amc: 'axis',
      nav: 45.67,
      minInvestment: 5000,
      returns: { '1M': 1.5, '1Y': 64.2, '3Y': 32.8, '5Y': 15.2 },
      risk: 'low',
      rating: 4,
      aum: '₹1,189.60 Cr',
      expenseRatio: 1.5,
      exitLoad: '1% before 1 year',
      fundManager: 'Mr. Shreyash Devalkar',
      inceptionDate: '2010-01-01',
      benchmark: 'Nifty 50',
      profileImage: 'https://www.axisbank.com/images/default-source/default-album/axis-bank-logo.png',
      assetAllocation: {
        equity: 95,
        debt: 5
      },
      topHoldings: [
        { name: 'HDFC Bank', weight: 8.5 },
        { name: 'Reliance', weight: 7.2 },
        { name: 'TCS', weight: 6.8 }
      ],
      documents: {
        factSheet: '/documents/axis-bluechip-factsheet.pdf',
        sid: '/documents/axis-bluechip-sid.pdf',
        sai: '/documents/axis-bluechip-sai.pdf'
      }
    },
    {
      id: 2,
      name: 'ICICI Prudential Technology Direct Plan Growth',
      category: 'debt',
      amc: 'icici',
      nav: 42.35,
      minInvestment: 5000,
      returns: { '1M': 1.5, '1Y': 64.2, '3Y': 32.8, '5Y': 14.8 },
      risk: 'moderately-low',
      rating: 4.5,
      aum: '₹1,189.60 Cr',
      expenseRatio: 1.4,
      exitLoad: '1% before 1 year',
      fundManager: 'Mr. Prashant Jain',
      inceptionDate: '2008-05-15',
      benchmark: 'Nifty 100',
      profileImage: 'https://www.iciciprulife.com/content/dam/iciciprulife/images/logo/icici-prudential-logo.png',
      assetAllocation: {
        equity: 98,
        debt: 2
      },
      topHoldings: [
        { name: 'ICICI Bank', weight: 9.2 },
        { name: 'Infosys', weight: 8.5 },
        { name: 'HDFC Bank', weight: 7.8 }
      ],
      documents: {
        factSheet: '/documents/hdfc-top100-factsheet.pdf',
        sid: '/documents/hdfc-top100-sid.pdf',
        sai: '/documents/hdfc-top100-sai.pdf'
      }
    },
    {
      id: 3,
      name: 'SBI Liquid Fund Direct Plan Growth',
      category: 'hybrid',
      amc: 'sbi',
      nav: 38.92,
      minInvestment: 5000,
      returns: { '1M': 1.5, '1Y': 64.2, '3Y': 32.8, '5Y': 13.8 },
      risk: 'moderately-high',
      rating: 4.2,
      aum: '₹1,189.60 Cr',
      expenseRatio: 1.6,
      exitLoad: '1% before 1 year',
      fundManager: 'Ms. S Naren',
      inceptionDate: '2009-03-20',
      benchmark: 'CRISIL Hybrid 35+65',
      profileImage: 'https://www.sbi.co.in/images/logo/sbi-logo.png',
      assetAllocation: {
        equity: 65,
        debt: 35
      },
      topHoldings: [
        { name: 'SBI', weight: 6.5 },
        { name: 'L&T', weight: 5.8 },
        { name: 'HDFC Bank', weight: 5.2 }
      ],
      documents: {
        factSheet: '/documents/icici-balanced-factsheet.pdf',
        sid: '/documents/icici-balanced-sid.pdf',
        sai: '/documents/icici-balanced-sai.pdf'
      }
    },
    {
      id: 4,
      name: 'Tata Digital India Fund Direct Growth',
      category: 'equity',
      amc: 'tata',
      nav: 52.18,
      minInvestment: 5000,
      returns: { '1M': 1.5, '1Y': 64.2, '3Y': 32.8, '5Y': 18.2 },
      risk: 'moderately-low',
      rating: 4.5,
      aum: '₹1,189.60 Cr',
      expenseRatio: 1.7,
      exitLoad: '1% before 1 year',
      fundManager: 'Mr. R Srinivasan',
      inceptionDate: '2009-09-10',
      benchmark: 'S&P BSE Small Cap',
      profileImage: 'https://www.tatamutualfund.com/images/logo/tata-mutual-fund-logo.png',
      assetAllocation: {
        equity: 92,
        debt: 8
      },
      topHoldings: [
        { name: 'Tata Elxsi', weight: 4.2 },
        { name: 'Persistent', weight: 3.8 },
        { name: 'KPIT Tech', weight: 3.5 }
      ],
      documents: {
        factSheet: '/documents/sbi-smallcap-factsheet.pdf',
        sid: '/documents/sbi-smallcap-sid.pdf',
        sai: '/documents/sbi-smallcap-sai.pdf'
      }
    },
    {
      id: 5,
      name: 'Nippon India Small Cap Fund',
      category: 'equity',
      amc: 'nippon',
      nav: 28.45,
      minInvestment: 5000,
      returns: { '1M': 1.8, '1Y': 58.1, '3Y': 28.9, '5Y': 8.8 },
      risk: 'high',
      rating: 4.0,
      aum: '₹1,050.20 Cr',
      expenseRatio: 0.8,
      exitLoad: '0.5% before 1 year',
      fundManager: 'Mr. Abhishek Bisen',
      inceptionDate: '2012-06-15',
      benchmark: 'CRISIL Corporate Bond',
      profileImage: 'https://www.nipponindia.com/images/logo/nippon-india-logo.png',
      assetAllocation: {
        equity: 0,
        debt: 100
      },
      topHoldings: [
        { name: 'HDFC Bank Bonds', weight: 12.5 },
        { name: 'ICICI Bank Bonds', weight: 10.8 },
        { name: 'SBI Bonds', weight: 9.5 }
      ],
      documents: {
        factSheet: '/documents/kotak-corporate-factsheet.pdf',
        sid: '/documents/kotak-corporate-sid.pdf',
        sai: '/documents/kotak-corporate-sai.pdf'
      }
    },
    {
      id: 6,
      name: 'Quant Small Cap Fund',
      category: 'equity',
      amc: 'quant',
      nav: 65.32,
      minInvestment: 5000,
      returns: { '1M': 2.3, '1Y': 68.5, '3Y': 35.1, '5Y': 16.8 },
      risk: 'high',
      rating: 4.7,
      aum: '₹980.50 Cr',
      expenseRatio: 1.4,
      exitLoad: '1% before 1 year',
      fundManager: 'Mr. Neelesh Surana',
      inceptionDate: '2010-04-08',
      benchmark: 'Nifty 100',
      profileImage: 'https://www.quantmutual.com/images/logo/quant-mutual-fund-logo.png',
      assetAllocation: {
        equity: 96,
        debt: 4
      },
      topHoldings: [
        { name: 'HDFC Bank', weight: 8.2 },
        { name: 'ICICI Bank', weight: 7.5 },
        { name: 'Infosys', weight: 6.8 }
      ],
      documents: {
        factSheet: '/documents/mirae-largecap-factsheet.pdf',
        sid: '/documents/mirae-largecap-sid.pdf',
        sai: '/documents/mirae-largecap-sai.pdf'
      }
    },
    {
      id: 7,
      name: 'Aditya Birla Sun Life Frontline Equity Fund',
      category: 'equity',
      amc: 'adityabirla',
      nav: 48.75,
      minInvestment: 1000,
      returns: { '1M': 1.0, '1Y': 25.4, '3Y': 15.6, '5Y': 17.5 },
      risk: 'moderate',
      rating: 4.3,
      aum: '₹14,200 Cr',
      expenseRatio: 1.5,
      exitLoad: '1% before 1 year',
      fundManager: 'Mr. Rajeev Thakkar',
      inceptionDate: '2013-05-24',
      benchmark: 'Nifty 500',
      profileImage: 'https://mutualfund.adityabirlacapital.com/images/logo/absl-mutual-fund-logo.png',
      assetAllocation: {
        equity: 94,
        debt: 6
      },
      topHoldings: [
        { name: 'HDFC Bank', weight: 7.8 },
        { name: 'Bajaj Finance', weight: 6.5 },
        { name: 'Reliance', weight: 5.8 }
      ],
      documents: {
        factSheet: '/documents/parag-flexicap-factsheet.pdf',
        sid: '/documents/parag-flexicap-sid.pdf',
        sai: '/documents/parag-flexicap-sai.pdf'
      }
    },
    {
      id: 8,
      name: 'Canara Robeco Bluechip Equity Fund',
      category: 'equity',
      amc: 'canararobeco',
      nav: 185.42,
      minInvestment: 5000,
      returns: { '1M': 1.2, '1Y': 28.1, '3Y': 17.0, '5Y': 14.2 },
      risk: 'moderate',
      rating: 4.1,
      aum: '₹7,500 Cr',
      expenseRatio: 0.2,
      exitLoad: '0.25% before 7 days',
      fundManager: 'Mr. Sharwan Goyal',
      inceptionDate: '2000-03-15',
      benchmark: 'Nifty 50',
      profileImage: 'https://www.canararobeco.com/images/logo/canara-robeco-logo.png',
      assetAllocation: {
        equity: 99,
        debt: 1
      },
      topHoldings: [
        { name: 'HDFC Bank', weight: 11.2 },
        { name: 'Reliance', weight: 10.8 },
        { name: 'ICICI Bank', weight: 8.5 }
      ],
      documents: {
        factSheet: '/documents/uti-nifty-factsheet.pdf',
        sid: '/documents/uti-nifty-sid.pdf',
        sai: '/documents/uti-nifty-sai.pdf'
      }
    },
    {
      id: 9,
      name: 'DSP Midcap Fund',
      category: 'equity',
      amc: 'dsp',
      nav: 32.18,
      minInvestment: 5000,
      returns: { '1M': 1.9, '1Y': 35.6, '3Y': 22.3, '5Y': 8.2 },
      risk: 'high',
      rating: 3.9,
      aum: '₹6,100 Cr',
      expenseRatio: 0.9,
      exitLoad: '0.5% before 1 year',
      fundManager: 'Mr. Santosh Kamath',
      inceptionDate: '2011-08-12',
      benchmark: 'CRISIL Low Duration',
      profileImage: 'https://www.dspim.com/images/logo/dsp-mutual-fund-logo.png',
      assetAllocation: {
        equity: 0,
        debt: 100
      },
      topHoldings: [
        { name: 'SBI Bonds', weight: 15.2 },
        { name: 'HDFC Bank Bonds', weight: 12.8 },
        { name: 'ICICI Bank Bonds', weight: 10.5 }
      ],
      documents: {
        factSheet: '/documents/franklin-lowduration-factsheet.pdf',
        sid: '/documents/franklin-lowduration-sid.pdf',
        sai: '/documents/franklin-lowduration-sai.pdf'
      }
    },
    {
      id: 10,
      name: 'Mirae Asset Emerging Bluechip Fund',
      category: 'equity',
      amc: 'mirae',
      nav: 42.85,
      minInvestment: 500,
      returns: { '1M': 1.7, '1Y': 31.2, '3Y': 20.1, '5Y': 15.5 },
      risk: 'moderate',
      rating: 4.4,
      aum: '₹10,500 Cr',
      expenseRatio: 1.6,
      exitLoad: '3 years lock-in',
      fundManager: 'Mr. Jinesh Gopani',
      inceptionDate: '2009-12-29',
      benchmark: 'Nifty 500',
      profileImage: 'https://www.miraeasset.com/images/logo/mirae-asset-logo.png',
      assetAllocation: {
        equity: 96,
        debt: 4
      },
      topHoldings: [
        { name: 'HDFC Bank', weight: 8.2 },
        { name: 'ICICI Bank', weight: 7.5 },
        { name: 'Infosys', weight: 6.8 }
      ],
      documents: {
        factSheet: '/documents/axis-elss-factsheet.pdf',
        sid: '/documents/axis-elss-sid.pdf',
        sai: '/documents/axis-elss-sai.pdf'
      }
    }
  ], []); // Empty dependency array since this data is static

  // Filter and sort funds
  const filteredFunds = useMemo(() => {
    let result = [...funds];

    // Apply search filter (for companies search input)
    if (searchQuery) {
      result = result.filter(fund => 
        fund.amc.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply category filter
    if (selectedCategories.length > 0) {
      result = result.filter(fund => selectedCategories.includes(fund.category));
    }

    // Apply risk level filter
    if (selectedRiskLevels.length > 0) {
      result = result.filter(fund => selectedRiskLevels.includes(fund.risk));
    }

    // Apply AMC filter (for checkboxes)
    if (selectedAMCs.length > 0) {
      result = result.filter(fund => selectedAMCs.includes(fund.amc));
    }

    // Apply Market Cap filter (Assuming market cap can be inferred from fund category/type or added to fund data)
    if (selectedMarketCaps.length > 0) {
      result = result.filter(fund => {
        const aumValue = parseFloat(fund.aum.replace(/[^0-9.]/g, ''));
        if (selectedMarketCaps.includes('large') && aumValue >= 10000) return true;
        if (selectedMarketCaps.includes('large-mid') && aumValue < 10000 && aumValue >= 7000) return true;
        if (selectedMarketCaps.includes('mid') && aumValue < 7000 && aumValue >= 3000) return true;
        if (selectedMarketCaps.includes('small') && aumValue < 3000) return true;
        return false;
      });
    }

    // Apply sorting
    result.sort((a, b) => {
      let comparison = 0;
      switch (sortBy) {
        case 'returnsHighToLow':
          comparison = b.returns['1Y'] - a.returns['1Y']; 
          break;
        case 'returnsLowToHigh':
          comparison = a.returns['1Y'] - b.returns['1Y'];
          break;
        case 'nameAsc':
          comparison = a.name.localeCompare(b.name);
          break;
        case 'nameDesc':
          comparison = b.name.localeCompare(a.name);
          break;
        default:
          comparison = 0;
      }
      return comparison;
    });

    return result;
  }, [funds, searchQuery, selectedCategories, selectedRiskLevels, selectedAMCs, selectedMarketCaps, sortBy]);

  // Pagination logic
  const indexOfLastFund = currentPage * fundsPerPage;
  const indexOfFirstFund = indexOfLastFund - fundsPerPage;
  const currentFunds = filteredFunds.slice(indexOfFirstFund, indexOfLastFund);

  const totalPages = Math.ceil(filteredFunds.length / fundsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(prev => prev + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prev => prev - 1);
    }
  };

  // Handle checkbox change for filters
  const handleFilterChange = (filterType, value) => {
    switch (filterType) {
      case 'sort':
        setSortBy(value);
        break;
      case 'category':
        setSelectedCategories(prev => 
          prev.includes(value) ? prev.filter(item => item !== value) : [...prev, value]
        );
        break;
      case 'risk':
        setSelectedRiskLevels(prev => 
          prev.includes(value) ? prev.filter(item => item !== value) : [...prev, value]
        );
        break;
      case 'amc':
        setSelectedAMCs(prev => 
          prev.includes(value) ? prev.filter(item => item !== value) : [...prev, value]
        );
        break;
      case 'marketCap':
        setSelectedMarketCaps(prev => 
          prev.includes(value) ? prev.filter(item => item !== value) : [...prev, value]
        );
        break;
      default:
        break;
    }
  };

  // Investment Modal Component
  const InvestmentModal = ({ fund, onClose }) => {
    const handleInvestment = () => {
      // Here you would typically make an API call to process the investment
      setShowSuccessMessage(true);
      setTimeout(() => {
        setShowSuccessMessage(false);
        onClose();
      }, 2000);
    };

    return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-lg w-full max-w-md">
        <div className="p-6">
          <div className="flex justify-between items-start mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Invest in {fund.name}</h2>
              <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
                <FaTimes className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-6">
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Investment Type
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={() => setInvestmentType('oneTime')}
                    className={`p-3 rounded-lg border ${
                      investmentType === 'oneTime'
                        ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
                        : 'border-gray-300 hover:border-indigo-300'
                    }`}
                  >
                    One Time
                  </button>
                  <button
                    onClick={() => setInvestmentType('sip')}
                    className={`p-3 rounded-lg border ${
                      investmentType === 'sip'
                        ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
                        : 'border-gray-300 hover:border-indigo-300'
                    }`}
                  >
                    SIP
                  </button>
            </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Investment Amount
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                    ₹
                  </span>
                  <input
                    type="number"
                    value={investmentAmount}
                    onChange={(e) => setInvestmentAmount(Math.max(5000, parseInt(e.target.value) || 5000))}
                    className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500"
                    min="5000"
                    step="1000"
                  />
                </div>
                <p className="mt-1 text-sm text-gray-500">
                  Minimum investment: ₹5,000
                </p>
              </div>

              {investmentType === 'sip' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    SIP Frequency
                  </label>
                  <select className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500">
                    <option value="monthly">Monthly</option>
                    <option value="quarterly">Quarterly</option>
                    <option value="yearly">Yearly</option>
                  </select>
                </div>
              )}

              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-sm font-medium text-gray-700 mb-2">Investment Summary</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Investment Type</span>
                    <span className="font-medium">{investmentType === 'oneTime' ? 'One Time' : 'SIP'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Amount</span>
                    <span className="font-medium">₹{investmentAmount.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Expense Ratio</span>
                    <span className="font-medium">{fund.expenseRatio}%</span>
                  </div>
                </div>
              </div>

            <button
                onClick={handleInvestment}
                className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
              >
                Confirm Investment
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Enhanced FundDetailsModal
  const FundDetailsModal = ({ fund, onClose }) => {
    // Generate document data
    const documents = {
      factSheet: {
        title: 'Fact Sheet',
        type: 'PDF Document',
        lastUpdated: '2024-03-15',
        fileSize: '2.4 MB',
        version: '1.2',
        pages: 12,
        description: 'Comprehensive overview of the fund including investment objective, strategy, performance, and portfolio details.',
        url: fund.documents.factSheet,
        sections: [
          { id: 'overview', title: 'Fund Overview' },
          { id: 'performance', title: 'Performance Analysis' },
          { id: 'portfolio', title: 'Portfolio Composition' },
          { id: 'risk', title: 'Risk Analysis' }
        ]
      },
      sid: {
        title: 'Scheme Information Document (SID)',
        type: 'PDF Document',
        lastUpdated: '2024-03-01',
        fileSize: '3.1 MB',
        version: '2.0',
        pages: 24,
        description: 'Detailed information about the scheme including investment objective, asset allocation, risk factors, and terms & conditions.',
        url: fund.documents.sid,
        sections: [
          { id: 'terms', title: 'Terms & Conditions' },
          { id: 'fees', title: 'Fee Structure' },
          { id: 'process', title: 'Investment Process' },
          { id: 'risks', title: 'Risk Factors' }
        ]
      },
      sai: {
        title: 'Statement of Additional Information (SAI)',
        type: 'PDF Document',
        lastUpdated: '2024-02-15',
        fileSize: '1.8 MB',
        version: '1.5',
        pages: 18,
        description: 'Additional information about the fund including fund manager details, investment restrictions, and regulatory compliance.',
        url: fund.documents.sai,
        sections: [
          { id: 'manager', title: 'Fund Manager Details' },
          { id: 'compliance', title: 'Regulatory Compliance' },
          { id: 'restrictions', title: 'Investment Restrictions' },
          { id: 'tax', title: 'Tax Information' }
        ]
      }
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
          <div className="p-6">
            <div className="flex justify-between items-start mb-6">
              <div className="flex items-start space-x-4">
                <div className="w-16 h-16 rounded-lg overflow-hidden border border-gray-200">
                  <img
                    src={fund.profileImage}
                    alt={`${fund.name} logo`}
                    className="w-full h-full object-contain bg-white"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(fund.name)}&background=random`;
                    }}
                  />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">{fund.name}</h2>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      fund.risk === 'low' ? 'bg-green-100 text-green-800' :
                      fund.risk.includes('moderate') ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {fund.risk.replace('-', ' ')}
                    </span>
                    <span className="px-2 py-1 rounded-full bg-gray-100 text-gray-800 text-xs font-medium">
                      {fund.category}
                    </span>
                  </div>
                </div>
              </div>
              <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
              <FaTimes className="w-6 h-6" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Fund Overview */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold mb-4">Fund Overview</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Fund Manager</span>
                  <span className="font-medium">{fund.fundManager}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Inception Date</span>
                  <span className="font-medium">{fund.inceptionDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Benchmark</span>
                  <span className="font-medium">{fund.benchmark}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">AUM</span>
                  <span className="font-medium">{fund.aum}</span>
                </div>
              </div>
            </div>

            {/* Performance Metrics */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold mb-4">Performance Metrics</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">1M Return</span>
                  <span className="font-medium text-green-600">{fund.returns['1M']}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">1Y Return</span>
                  <span className="font-medium text-green-600">{fund.returns['1Y']}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">3Y Return</span>
                  <span className="font-medium text-green-600">{fund.returns['3Y']}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">5Y Return</span>
                  <span className="font-medium text-green-600">{fund.returns['5Y']}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Expense Ratio</span>
                  <span className="font-medium">{fund.expenseRatio}%</span>
                </div>
              </div>
            </div>

            {/* NAV History Chart (placeholder data) */}
            <div className="col-span-2 bg-gray-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold mb-4">NAV History</h3>
              <ReactApexChart
                options={{
                  chart: {
                    type: 'area',
                    toolbar: { show: false }
                  },
                  colors: ['#4F46E5'],
                  fill: {
                    type: 'gradient',
                    gradient: {
                      shadeIntensity: 1,
                      opacityFrom: 0.7,
                      opacityTo: 0.2
                    }
                  },
                  stroke: { curve: 'smooth', width: 2 },
                  xaxis: {
                    categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']
                  }
                }}
                series={[{
                  name: 'NAV',
                  data: [fund.nav - 5, fund.nav - 3, fund.nav - 1, fund.nav + 1, fund.nav + 3, fund.nav + 5].map(n => parseFloat(n.toFixed(2)))
                }]}
                type="area"
                height={300}
              />
            </div>

            {/* Asset Allocation */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold mb-4">Asset Allocation</h3>
              <ReactApexChart
                options={{
                  chart: {
                    type: 'donut'
                  },
                  labels: Object.keys(fund.assetAllocation),
                  colors: ['#4F46E5', '#818CF8', '#A78BFA', '#C4B5FD'],
                  legend: {
                    position: 'bottom'
                  }
                }}
                series={Object.values(fund.assetAllocation)}
                type="donut"
                height={300}
              />
            </div>

            {/* Top Holdings */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold mb-4">Top Holdings</h3>
              <div className="space-y-3">
                {fund.topHoldings.map((holding, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <span className="text-gray-600">{holding.name}</span>
                    <span className="font-medium">{holding.weight}%</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Documents */}
            <div className="col-span-2 bg-gray-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold mb-4">Fund Documents</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {Object.entries(documents).map(([key, doc]) => (
                    <div
                      key={key}
                      className="bg-white p-4 rounded-lg border border-gray-200 hover:border-indigo-500 transition-colors cursor-pointer"
                      onClick={() => setSelectedDocument(doc)}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-indigo-50 rounded-lg">
                            <FaFileAlt className="w-6 h-6 text-indigo-600" />
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-900">{doc.title}</h4>
                            <p className="text-sm text-gray-500 mt-1">Updated: {doc.lastUpdated}</p>
                          </div>
                        </div>
                        <FaDownload className="w-5 h-5 text-gray-400" />
                      </div>
                      <p className="text-sm text-gray-600 mt-3 line-clamp-2">{doc.description}</p>
                      <div className="flex items-center gap-4 mt-3 text-xs text-gray-500">
                        <span>{doc.fileSize}</span>
                        <span>•</span>
                        <span>{doc.pages} pages</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Add Document Modal Component
  const DocumentModal = ({ document, onClose }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{document.title}</h2>
              <p className="text-sm text-gray-500 mt-1">Last updated: {document.lastUpdated}</p>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => window.open(document.url, '_blank')}
                className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
              >
                <FaDownload className="w-4 h-4" />
                Download PDF
              </button>
              <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
                <FaTimes className="w-6 h-6" />
              </button>
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-6">
            <div className="prose max-w-none">
              <h3 className="text-lg font-semibold mb-4">Document Overview</h3>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Document Type</p>
                    <p className="font-medium">{document.type}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">File Size</p>
                    <p className="font-medium">{document.fileSize}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Version</p>
                    <p className="font-medium">{document.version}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Pages</p>
                    <p className="font-medium">{document.pages}</p>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Description</p>
                  <p className="mt-1">{document.description}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {document.sections.map((section, index) => (
                <a
                  key={index}
                  href={`#${section.id}`}
                  className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <FaFileAlt className="text-indigo-600" />
                  <span>{section.title}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Add state for document modal
  const [selectedDocument, setSelectedDocument] = useState(null);

  // Handle Add to Cart
  const handleAddToCart = (fund) => {
    setCart(prev => [...prev, fund]);
    setShowCartMessage(true);
    setTimeout(() => setShowCartMessage(false), 2000);
  };
  // Handle Invest Now
  const handleInvestNow = (fund) => {
    setSelectedFund(fund);
    setShowInvestmentModal(true);
    // Update investments when confirmed
    const newInvestment = {
      fundId: fund.id,
      amount: 0, // This will be set when the investment is confirmed
      date: new Date().toISOString().split('T')[0]
    };
    setUserInvestments(prev => [...prev, newInvestment]);
  };

  // SIP Calculator Component
  const SipCalculatorModal = ({ onClose }) => {
    const calculateFutureValue = () => {
      const monthlyRate = expectedReturn / 12 / 100;
      const months = sipDuration * 12;
      const futureValue = sipAmount * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * (1 + monthlyRate);
      return Math.round(futureValue);
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-lg w-full max-w-md">
          <div className="p-6">
            <div className="flex justify-between items-start mb-6">
              <h2 className="text-2xl font-bold text-gray-900">SIP Calculator</h2>
              <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
                <FaTimes className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Monthly Investment (₹)
                </label>
                <input
                  type="number"
                  value={sipAmount}
                  onChange={(e) => setSipAmount(Math.max(500, parseInt(e.target.value) || 500))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500"
                  min="500"
                  step="500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Duration (Years)
                </label>
                <input
                  type="number"
                  value={sipDuration}
                  onChange={(e) => setSipDuration(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500"
                  min="1"
                  max="30"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Expected Return (% p.a.)
                </label>
                <input
                  type="number"
                  value={expectedReturn}
                  onChange={(e) => setExpectedReturn(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500"
                  min="1"
                  max="30"
                />
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-sm font-medium text-gray-700 mb-2">Estimated Returns</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Investment</span>
                    <span className="font-medium">₹{(sipAmount * sipDuration * 12).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Expected Returns</span>
                    <span className="font-medium text-green-600">₹{(calculateFutureValue() - (sipAmount * sipDuration * 12)).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Future Value</span>
                    <span className="font-medium text-indigo-600">₹{calculateFutureValue().toLocaleString()}</span>
                  </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
  };

  // Fund Comparison Modal
  const ComparisonModal = ({ funds, onClose }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg w-full max-w-6xl max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Compare Funds</h2>
              <p className="text-sm text-gray-500 mt-1">Compare up to 3 funds side by side</p>
            </div>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
              <FaTimes className="w-6 h-6" />
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 border-b">Fund Name</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 border-b">Return (1Y)</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 border-b">Risk</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 border-b">Category</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 border-b">Expense Ratio</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 border-b">Lock-in</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 border-b">AUM</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 border-b">Min Investment</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {funds.map(fund => (
                  <tr key={fund.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-4">
                        <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-white border border-gray-200 shadow-sm">
                          <img
                            src={fund.profileImage}
                            alt={fund.name}
                            className="w-full h-full object-contain p-1"
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(fund.name)}&background=random&color=fff`;
                            }}
                          />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900 line-clamp-2">{fund.name}</p>
                          <p className="text-xs text-gray-500 mt-1">{fund.amc}</p>
                          <div className="flex items-center mt-1">
                            <div className="flex items-center">
                              {[...Array(5)].map((_, i) => (
                                <FaStar
                                  key={i}
                                  className={`w-3 h-3 ${i < fund.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                                />
                              ))}
                            </div>
                            <span className="text-xs text-gray-500 ml-1">({fund.rating})</span>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="text-sm font-medium text-green-600">+{fund.returns['1Y']}%</span>
                        <span className="text-xs text-gray-500">1 Year</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        fund.risk === 'low' ? 'bg-green-100 text-green-800' :
                        fund.risk.includes('moderate') ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {fund.risk.replace('-', ' ')}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-gray-900 capitalize">{fund.category}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-gray-900">{fund.expenseRatio}%</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        fund.exitLoad.includes('lock-in') ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
                      }`}>
                        {fund.exitLoad.includes('lock-in') ? 'Yes' : 'No'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-gray-900">{fund.aum}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-gray-900">₹{fund.minInvestment.toLocaleString()}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-6 flex justify-end space-x-4">
            <button
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Close
            </button>
            <button
              onClick={() => {
                setShowInvestmentModal(true);
                onClose();
              }}
              className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-indigo-700 text-white rounded-lg text-sm font-medium transition-all duration-200 shadow-md hover:shadow-lg"
            >
              Invest in Selected
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  // Handle fund comparison
  const handleCompare = (fund) => {
    if (selectedForComparison.includes(fund.id)) {
      setSelectedForComparison(prev => prev.filter(id => id !== fund.id));
    } else if (selectedForComparison.length < 3) {
      setSelectedForComparison(prev => [...prev, fund.id]);
    }
  };

  // Handle watchlist
  const handleWatchlist = (fundId) => {
    setWatchlist(prev => 
      prev.includes(fundId) 
        ? prev.filter(id => id !== fundId)
        : [...prev, fundId]
    );
  };

  // Check if fund is in user's investments
  const isUserInvested = (fundId) => {
    return userInvestments.some(inv => inv.fundId === fundId);
  };

  // Get fund tags
  const getFundTags = (fund) => {
    const tags = [];
    if (fund.returns['1Y'] > 50) tags.push({ label: 'Top Performer', icon: <FaMedal className="text-yellow-500" /> });
    if (fund.category === 'elss') tags.push({ label: 'Tax Saving', icon: <FaFileInvoiceDollar className="text-green-500" /> });
    if (new Date(fund.inceptionDate) > new Date('2024-01-01')) tags.push({ label: 'New Launch', icon: <FaRocket className="text-blue-500" /> });
    return tags;
  };

  // Add Cart Modal Component
  const CartModal = ({ onClose }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Your Cart</h2>
              <p className="text-sm text-gray-500 mt-1">{cart.length} funds selected</p>
            </div>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
              <FaTimes className="w-6 h-6" />
            </button>
          </div>

          {cart.length > 0 ? (
            <>
              <div className="space-y-4">
                {cart.map(fund => (
                  <div key={fund.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 rounded-lg overflow-hidden bg-white border border-gray-200">
                        <img
                          src={fund.profileImage}
                          alt={fund.name}
                          className="w-full h-full object-contain p-1"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(fund.name)}&background=random`;
                          }}
                        />
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-gray-900">{fund.name}</h3>
                        <p className="text-xs text-gray-500">{fund.category}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <span className="text-sm font-medium text-gray-900">₹{fund.minInvestment.toLocaleString()}</span>
                      <button
                        onClick={() => setCart(prev => prev.filter(item => item.id !== fund.id))}
                        className="text-red-500 hover:text-red-700"
                      >
                        <FaTimes className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 flex justify-between items-center">
                <div>
                  <p className="text-sm text-gray-600">Total Amount</p>
                  <p className="text-xl font-bold text-gray-900">
                    ₹{cart.reduce((sum, fund) => sum + fund.minInvestment, 0).toLocaleString()}
                  </p>
                </div>
                <button
                  onClick={() => {
                    setShowInvestmentModal(true);
                    onClose();
                  }}
                className="px-6 py-2 bg-gradient-to-r from-indigo-600 to-indigo-700 text-white rounded-lg font-medium transition-all duration-200 shadow-md hover:shadow-lg"
                >
                  Proceed to Invest
                </button>
              </div>
            </>
          ) : (
            <div className="text-center py-8">
              <FaShoppingCart className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">Your cart is empty</p>
              <button
                onClick={onClose}
                className="mt-4 px-4 py-2 text-indigo-600 hover:text-indigo-700 font-medium"
              >
                Browse Funds
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  // Add Watchlist Modal Component
  const WatchlistModal = ({ onClose }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Your Watchlist</h2>
              <p className="text-sm text-gray-500 mt-1">{watchlist.length} funds in watchlist</p>
            </div>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
              <FaTimes className="w-6 h-6" />
            </button>
          </div>

          {watchlist.length > 0 ? (
            <div className="space-y-4">
              {funds.filter(fund => watchlist.includes(fund.id)).map(fund => (
                <div key={fund.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 rounded-lg overflow-hidden bg-white border border-gray-200">
                      <img
                        src={fund.profileImage}
                        alt={fund.name}
                        className="w-full h-full object-contain p-1"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(fund.name)}&background=random`;
                        }}
                      />
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-900">{fund.name}</h3>
                      <div className="flex items-center space-x-2 mt-1">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                          fund.risk === 'low' ? 'bg-green-100 text-green-800' :
                          fund.risk.includes('moderate') ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {fund.risk.replace('-', ' ')}
                        </span>
                        <span className="text-xs text-gray-500">•</span>
                        <span className="text-xs text-gray-500 capitalize">{fund.category}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={() => handleInvestNow(fund)}
                      className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700"
                    >
                      Invest
                    </button>
                    <button
                      onClick={() => handleWatchlist(fund.id)}
                      className="text-gray-400 hover:text-red-500"
                    >
                      <FaBookmarkSolid className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <FaBookmark className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">Your watchlist is empty</p>
              <button
                onClick={onClose}
                className="mt-4 px-4 py-2 text-indigo-600 hover:text-indigo-700 font-medium"
              >
                Browse Funds
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  // Add state for modals
  const [showCartModal, setShowCartModal] = useState(false);
  const [showWatchlistModal, setShowWatchlistModal] = useState(false);

  // User Investment Status Component
  const UserInvestmentStatus = () => {
    // Calculate total investment and SIP amount
    const totalInvestment = userInvestments.reduce((sum, inv) => sum + inv.amount, 0);
    const activeFunds = userInvestments.length;
    const monthlySIP = 1000; // This would come from user's SIP settings

    return (
      <div className="bg-gradient-to-br from-indigo-600 via-indigo-700 to-purple-800 rounded-xl p-6 text-white mb-6 shadow-lg border border-indigo-500/20">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-white/10 rounded-full ring-4 ring-white/10 backdrop-blur-sm">
              <FaUserCircle className="w-8 h-8 text-indigo-200" />
            </div>
            <div>
              <h3 className="text-xl font-bold bg-gradient-to-r from-white to-indigo-200 bg-clip-text text-transparent">
                Your Investment Portfolio
              </h3>
              <p className="text-sm text-indigo-100 flex items-center gap-2 mt-1">
                <FaCalendarAlt className="w-4 h-4 text-indigo-200" />
                Active since January 2024
              </p>
            </div>
          </div>
          <div className="flex gap-3">
            <button className="text-sm bg-white text-indigo-600 px-4 py-2 rounded-lg hover:bg-indigo-50 transition-all duration-200 flex items-center gap-2 shadow-md hover:shadow-lg transform hover:-translate-y-0.5">
              <FaChartLine className="w-4 h-4" />
              View Portfolio
            </button>
            <button className="text-sm border-2 border-white/30 text-white px-4 py-2 rounded-lg hover:bg-white/10 transition-all duration-200 flex items-center gap-2 backdrop-blur-sm hover:border-white/50">
              <FaDownload className="w-4 h-4" />
              Download Statement
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
          <div className="bg-gradient-to-br from-white/10 to-white/5 rounded-xl p-4 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all duration-200 hover:shadow-lg hover:shadow-indigo-500/10">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-indigo-100 font-medium">Total Investment</p>
              <div className="p-2 bg-indigo-500/20 rounded-lg">
                <FaMoneyBillWave className="w-4 h-4 text-indigo-200" />
              </div>
            </div>
            <p className="text-2xl font-bold text-white">₹{totalInvestment.toLocaleString()}</p>
            <p className="text-xs text-indigo-200 mt-1 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400"></span>
              Across {activeFunds} funds
            </p>
          </div>

          <div className="bg-gradient-to-br from-white/10 to-white/5 rounded-xl p-4 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all duration-200 hover:shadow-lg hover:shadow-indigo-500/10">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-indigo-100 font-medium">Monthly SIP</p>
              <div className="p-2 bg-green-500/20 rounded-lg">
                <FaCalculator className="w-4 h-4 text-green-200" />
              </div>
            </div>
            <p className="text-2xl font-bold text-white">₹{monthlySIP.toLocaleString()}</p>
            <p className="text-xs text-indigo-200 mt-1 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span>
              Next SIP: 1st April 2024
            </p>
          </div>

          <div className="bg-gradient-to-br from-white/10 to-white/5 rounded-xl p-4 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all duration-200 hover:shadow-lg hover:shadow-indigo-500/10">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-indigo-100 font-medium">Active Funds</p>
              <div className="p-2 bg-purple-500/20 rounded-lg">
                <FaChartPie className="w-4 h-4 text-purple-200" />
              </div>
            </div>
            <p className="text-2xl font-bold text-white">{activeFunds}</p>
            <p className="text-xs text-indigo-200 mt-1 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-purple-400"></span>
              2 Equity, 1 Debt
            </p>
          </div>

          <div className="bg-gradient-to-br from-white/10 to-white/5 rounded-xl p-4 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all duration-200 hover:shadow-lg hover:shadow-indigo-500/10">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-indigo-100 font-medium">Investment Duration</p>
              <div className="p-2 bg-blue-500/20 rounded-lg">
                <FaHistory className="w-4 h-4 text-blue-200" />
              </div>
            </div>
            <p className="text-2xl font-bold text-white">3 Months</p>
            <p className="text-xs text-indigo-200 mt-1 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span>
              Started Jan 2024
            </p>
          </div>
        </div>

        {/* Recent Transactions section is commented out as per user's request */}
      </div>
    );
  };

  // Insights Section Component
  const InsightsSection = () => (
    <div className="mt-12 bg-gray-50 rounded-lg p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Mutual Fund Insights</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-blue-50 rounded-lg">
              <FaLightbulb className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="font-semibold text-gray-900">What is a Mutual Fund?</h3>
          </div>
          <p className="text-gray-600 mb-4">A mutual fund is a type of investment vehicle consisting of a portfolio of stocks, bonds, or other securities.</p>
          <button className="text-indigo-600 hover:text-indigo-700 font-medium flex items-center gap-2">
            Learn More <FaChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-green-50 rounded-lg">
              <FaGraduationCap className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="font-semibold text-gray-900">Best SIP Tips for Beginners</h3>
          </div>
          <p className="text-gray-600 mb-4">Start small, stay consistent, and let the power of compounding work for you.</p>
          <button className="text-indigo-600 hover:text-indigo-700 font-medium flex items-center gap-2">
            Read Tips <FaChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-purple-50 rounded-lg">
              <FaChartPie className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="font-semibold text-gray-900">How to Pick the Right Fund</h3>
          </div>
          <p className="text-gray-600 mb-4">Understand your goals, risk appetite, and investment horizon before choosing a fund.</p>
          <button className="text-indigo-600 hover:text-indigo-700 font-medium flex items-center gap-2">
            Get Started <FaChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardPageHeader />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-24">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">All Mutual Funds</h1>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowWatchlistModal(true)}
              className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <FaBookmark className="w-5 h-5" />
              Watchlist ({watchlist.length})
            </button>
            <button
              onClick={() => setShowCartModal(true)}
              className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <FaShoppingCart className="w-5 h-5" />
              Cart ({cart.length})
            </button>
            <button
              onClick={() => setShowSipCalculator(true)}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-600 to-indigo-700 text-white rounded-lg  transition-all duration-200 shadow-md hover:shadow-lg"
            >
              <FaCalculator className="w-5 h-5" />
              SIP Calculator
            </button>
            {selectedForComparison.length > 0 && (
              <button
                onClick={() => setShowComparisonModal(true)}
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-600 to-indigo-700 text-white rounded-lg transition-all duration-200 shadow-md hover:shadow-lg"
              >
                <FaCompare className="w-5 h-5" />
                Compare ({selectedForComparison.length})
              </button>
            )}
          </div>
        </div>

        {isLoggedIn && <UserInvestmentStatus />}
        
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sticky Filters Sidebar */}
          <aside className="w-full lg:w-1/4">
            <div className="lg:sticky lg:top-24 bg-white rounded-lg shadow-sm p-6">
              {/* Companies Filter */}
            <div className="mb-6">
                <button
                  onClick={() => toggleFilter('companies')}
                  className="flex items-center justify-between w-full text-base font-semibold text-gray-900 mb-3"
                >
                  <span>Companies</span>
                  {expandedFilters.companies ? <FaChevronUp /> : <FaChevronDown />}
                </button>
                {expandedFilters.companies && (
                  <div className="space-y-2">
              <div className="relative mb-3">
                  <input
                    type="text"
                        placeholder="Search companies"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full rounded-lg border border-gray-300 pl-10 pr-4 py-2 text-sm"
                      />
                      <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                </div>
                    <div className="max-h-48 overflow-y-auto pr-2 custom-scrollbar">
                {amcs.filter(amc => amc.name.toLowerCase().includes(searchQuery.toLowerCase())).map(amc => (
                        <label key={amc.id} className="flex items-center text-gray-700 text-sm cursor-pointer hover:bg-gray-50 p-2 rounded-md">
                    <input
                      type="checkbox"
                      value={amc.id}
                      checked={selectedAMCs.includes(amc.id)}
                      onChange={() => handleFilterChange('amc', amc.id)}
                            className="form-checkbox h-4 w-4 text-indigo-600 rounded border-gray-300"
                    />
                    <span className="ml-2">{amc.name}</span>
                  </label>
                ))}
              </div>
                  </div>
                )}
            </div>

            {/* Categories Filter */}
            <div className="mb-6">
                <button
                  onClick={() => toggleFilter('categories')}
                  className="flex items-center justify-between w-full text-base font-semibold text-gray-900 mb-3"
                >
                  <span>Categories</span>
                  {expandedFilters.categories ? <FaChevronUp /> : <FaChevronDown />}
                </button>
                {expandedFilters.categories && (
              <div className="space-y-2">
                {categories.map(category => (
                  <label key={category.id} className="flex items-center text-gray-700 text-sm cursor-pointer">
                    <input
                      type="checkbox"
                      value={category.id}
                      checked={selectedCategories.includes(category.id)}
                      onChange={() => handleFilterChange('category', category.id)}
                          className="form-checkbox h-4 w-4 text-indigo-600 rounded border-gray-300"
                    />
                    <span className="ml-2">{category.name}</span>
                  </label>
                ))}
              </div>
                )}
            </div>

            {/* Market Cap Filter */}
            <div className="mb-6">
                <button
                  onClick={() => toggleFilter('marketCap')}
                  className="flex items-center justify-between w-full text-base font-semibold text-gray-900 mb-3"
                >
                  <span>Market Cap</span>
                  {expandedFilters.marketCap ? <FaChevronUp /> : <FaChevronDown />}
                </button>
                {expandedFilters.marketCap && (
              <div className="space-y-2">
                {marketCaps.map(mc => (
                  <label key={mc.id} className="flex items-center text-gray-700 text-sm cursor-pointer">
                    <input
                      type="checkbox"
                      value={mc.id}
                      checked={selectedMarketCaps.includes(mc.id)}
                      onChange={() => handleFilterChange('marketCap', mc.id)}
                          className="form-checkbox h-4 w-4 text-indigo-600 rounded border-gray-300"
                    />
                    <span className="ml-2">{mc.name}</span>
                  </label>
                ))}
              </div>
                )}
            </div>

            {/* Risk Filter */}
              <div className="mb-0">
                <button
                  onClick={() => toggleFilter('risk')}
                  className="flex items-center justify-between w-full text-base font-semibold text-gray-900 mb-3"
                >
                  <span>Risk</span>
                  {expandedFilters.risk ? <FaChevronUp /> : <FaChevronDown />}
                </button>
                {expandedFilters.risk && (
              <div className="space-y-2">
                {riskLevels.map(risk => (
                  <label key={risk.id} className="flex items-center text-gray-700 text-sm cursor-pointer">
                    <input
                      type="checkbox"
                      value={risk.id}
                      checked={selectedRiskLevels.includes(risk.id)}
                      onChange={() => handleFilterChange('risk', risk.id)}
                          className="form-checkbox h-4 w-4 text-indigo-600 rounded border-gray-300"
                    />
                    <span className="ml-2">{risk.name}</span>
                  </label>
                ))}
                  </div>
                )}
              </div>
            </div>
          </aside>

          {/* Main Content Area */}
          <section className="flex-1">
            <div className="grid grid-cols-1 gap-6">
              {currentFunds.map(fund => (
                <div key={fund.id} className="bg-white rounded-lg shadow-sm p-6 border border-gray-200 hover:border-indigo-200 transition-all duration-200">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start space-x-4">
                      {/* Fund Profile Image */}
                      <div className="w-16 h-16 rounded-lg overflow-hidden border border-gray-200 shadow-sm">
                        <img
                          src={fund.profileImage}
                          alt={`${fund.name} logo`}
                          className="w-full h-full object-contain bg-white"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(fund.name)}&background=random`;
                          }}
                        />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-1">{fund.name}</h3>
                        <div className="flex items-center gap-2 mb-2">
                          <span className={`h-2 w-2 rounded-full ${fund.risk === 'low' ? 'bg-green-500' : fund.risk.includes('moderate') ? 'bg-yellow-500' : 'bg-red-500'}`}></span>
                          <span className="text-xs text-gray-600 capitalize">{fund.risk.replace('-', ' ')}</span>
                          <span className="text-xs text-gray-600">•</span>
                          <span className="text-xs text-gray-600 capitalize">{fund.category}</span>
                      </div>
                        {/* Fund Tags */}
                        <div className="flex flex-wrap gap-2">
                          {getFundTags(fund).map((tag, index) => (
                            <span key={index} className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                              {tag.icon}
                              {tag.label}
                            </span>
                        ))}
                      </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {/* Investment Badge */}
                      {isUserInvested(fund.id) && (
                        <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          <FaCheckCircle />
                          Invested
                        </span>
                      )}
                      {/* Watchlist Button */}
                      <button
                        onClick={() => handleWatchlist(fund.id)}
                        className="text-gray-400 hover:text-yellow-500 transition-colors"
                      >
                        {watchlist.includes(fund.id) ? <FaBookmarkSolid className="w-5 h-5" /> : <FaBookmark className="w-5 h-5" />}
                      </button>
                      {/* Compare Button */}
                      <button
                        onClick={() => handleCompare(fund)}
                        className={`p-2 rounded-full transition-colors ${
                          selectedForComparison.includes(fund.id)
                            ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                      >
                        <FaCompare className="w-5 h-5" />
                      </button>
                    </div>
                  </div>

                  <p className="text-sm text-gray-600 mb-4">Fund Size: <span className="font-medium text-gray-800">{fund.aum}</span></p>

                  <div className="border-t border-b border-gray-100 py-3 mb-4">
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div>
                        <p className="text-xs text-gray-500">Return (1M)</p>
                        <p className={`font-semibold text-lg ${fund.returns['1M'] >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {fund.returns['1M'] >= 0 ? '+' : ''}{fund.returns['1M']}%</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Return (1Y)</p>
                        <p className={`font-semibold text-lg ${fund.returns['1Y'] >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {fund.returns['1Y'] >= 0 ? '+' : ''}{fund.returns['1Y']}%</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Return (3Y)</p>
                        <p className={`font-semibold text-lg ${fund.returns['3Y'] >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {fund.returns['3Y'] >= 0 ? '+' : ''}{fund.returns['3Y']}%</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end items-center mt-4 space-x-3">
                    {/* Re-introducing and styling View Details button */}
                    <button
                      onClick={() => {
                        setSelectedFund(fund);
                        setShowFundDetails(true);
                      }}
                      className="text-indigo-600 hover:text-indigo-800 px-4 py-2 rounded-lg border border-indigo-300 hover:border-indigo-500 transition-colors flex items-center gap-2 text-sm"
                    >
                      <FaEye /> View Details
                    </button>
                    <button
                      onClick={() => handleInvestNow(fund)}
                      className="bg-red-500 text-white px-5 py-2 rounded-lg font-semibold hover:bg-red-600 transition-colors text-sm"
                    >
                      Invest Now
                    </button>
                    <button
                      onClick={() => handleAddToCart(fund)}
                      className="text-gray-600 hover:text-indigo-600 px-4 py-2 rounded-lg border border-gray-300 hover:border-gray-400 transition-colors flex items-center gap-2 text-sm"
                    >
                      <FaShoppingCart className="w-4 h-4"/> Add to cart
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {filteredFunds.length === 0 && (
              <div className="text-center py-10 text-gray-500">
                No mutual funds found matching your criteria.
              </div>
            )}

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center space-x-2 mt-8">
                <button
                  onClick={handlePrevPage}
                  disabled={currentPage === 1}
                  className="px-4 py-2 border rounded-lg text-sm font-medium bg-white hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </button>
                {Array.from({ length: totalPages }, (_, i) => (
                  <button
                    key={i + 1}
                    onClick={() => paginate(i + 1)}
                    className={`px-4 py-2 border rounded-lg text-sm font-medium ${
                      currentPage === i + 1 ? 'bg-indigo-600 text-white' : 'bg-white hover:bg-gray-100'
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
                <button
                  onClick={handleNextPage}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 border rounded-lg text-sm font-medium bg-white hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                </button>
              </div>
            )}
          </section>
        </div>

        {/* Add Insights Section */}
        <InsightsSection />

        {/* ... existing modals ... */}
      </main>

      <DashboardPageFooter />

      {/* Modals */}
      {showFundDetails && selectedFund && (
        <FundDetailsModal
          fund={selectedFund}
          onClose={() => {
            setShowFundDetails(false);
            setSelectedFund(null);
          }}
        />
      )}

      {showInvestmentModal && selectedFundForInvestment && (
        <InvestmentModal
          fund={selectedFundForInvestment}
          onClose={() => {
            setShowInvestmentModal(false);
            setSelectedFundForInvestment(null);
          }}
        />
      )}

      {showSipCalculator && (
        <SipCalculatorModal onClose={() => setShowSipCalculator(false)} />
      )}

      {showComparisonModal && (
        <ComparisonModal
          funds={funds.filter(fund => selectedForComparison.includes(fund.id))}
          onClose={() => setShowComparisonModal(false)}
        />
      )}

      {showCartModal && (
        <CartModal onClose={() => setShowCartModal(false)} />
      )}

      {showWatchlistModal && (
        <WatchlistModal onClose={() => setShowWatchlistModal(false)} />
      )}

      {/* Success Message */}
      {showSuccessMessage && (
        <div className="fixed top-4 right-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg flex items-center space-x-2 z-50">
          <FaCheckCircle className="text-green-500" />
          <span>Investment successful!</span>
        </div>
      )}

      {/* Cart Message */}
      {showCartMessage && (
        <div className="fixed top-4 right-4 bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 rounded-lg flex items-center space-x-2 z-50">
          <FaCheckCircle className="text-blue-500" />
          <span>Added to cart!</span>
        </div>
      )}

      {/* Add DocumentModal */}
      {selectedDocument && (
        <DocumentModal
          document={selectedDocument}
          onClose={() => setSelectedDocument(null)}
        />
      )}
    </div>
  );
};

export default MutualFunds;


