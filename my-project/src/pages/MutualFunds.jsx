import React, { useState, useEffect, useMemo } from 'react';
import { useAuth } from '../context/AuthContext';
import ReactApexChart from 'react-apexcharts';
import { 
  FaLandmark, FaPlus, FaSearch, FaFilter,
  FaArrowUp, FaArrowDown, FaStar, FaRegStar,
  FaMoneyBillWave, FaExchangeAlt, FaChartBar,
  FaHistory, FaBell, FaClock, FaCheckCircle,
  FaTimesCircle, FaSpinner, FaInfoCircle,
  FaCalculator, FaChartLine, FaChartPie,
  FaRupeeSign, FaCalendarAlt, FaPercent,
  FaChartArea, FaTimes, FaDownload, FaShare,
  FaGlobe
} from 'react-icons/fa';
import axios from 'axios';

// API Keys
const ALPHA_VANTAGE_API_KEY = 'PJPBZEYY0OKFRJCG';

const MutualFunds = () => {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [watchlist, setWatchlist] = useState(() => {
    const saved = localStorage.getItem('mfWatchlist');
    return saved ? JSON.parse(saved) : [];
  });
  const [showFundDetails, setShowFundDetails] = useState(false);
  const [selectedFund, setSelectedFund] = useState(null);
  const [showComparison, setShowComparison] = useState(false);
  const [selectedFunds, setSelectedFunds] = useState([]);
  const [investments, setInvestments] = useState(() => {
    const saved = localStorage.getItem('mfInvestments');
    return saved ? JSON.parse(saved) : [];
  });
  const [showInvestmentModal, setShowInvestmentModal] = useState(false);
  const [investmentAmount, setInvestmentAmount] = useState('');
  const [investmentType, setInvestmentType] = useState('lumpsum');
  const [sipAmount, setSipAmount] = useState('');
  const [sipFrequency, setSipFrequency] = useState('monthly');
  const [sipDuration, setSipDuration] = useState('12');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedRiskLevel, setSelectedRiskLevel] = useState('all');
  const [selectedAMC, setSelectedAMC] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');
  const [showRiskometer, setShowRiskometer] = useState(false);
  const [showDocuments, setShowDocuments] = useState(false);
  const [showNews, setShowNews] = useState(false);
  const [selectedTab, setSelectedTab] = useState('overview');
  const [historicalNav, setHistoricalNav] = useState([]);
  const [showCalculator, setShowCalculator] = useState(false);
  const [calculatorType, setCalculatorType] = useState('sip');
  const [sipCalculatorAmount, setSipCalculatorAmount] = useState('');
  const [sipCalculatorReturn, setSipCalculatorReturn] = useState('');
  const [sipCalculatorPeriod, setSipCalculatorPeriod] = useState('');
  const [sipCalculatorResults, setSipCalculatorResults] = useState(null);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [searchSuggestions, setSearchSuggestions] = useState([]);

  // Enhanced Fund Categories with real descriptions
  const categories = [
    { 
      id: 'all', 
      name: 'All Funds', 
      icon: <FaLandmark />,
      description: 'Browse all mutual fund schemes'
    },
    { 
      id: 'largecap', 
      name: 'Large Cap', 
      icon: <FaChartBar />,
      description: 'Funds investing in top 100 companies by market cap'
    },
    { 
      id: 'midcap', 
      name: 'Mid Cap', 
      icon: <FaChartBar />,
      description: 'Funds investing in companies ranked 101-250 by market cap'
    },
    { 
      id: 'smallcap', 
      name: 'Small Cap', 
      icon: <FaChartBar />,
      description: 'Funds investing in companies ranked 251+ by market cap'
    },
    { 
      id: 'multicap', 
      name: 'Multi Cap', 
      icon: <FaChartBar />,
      description: 'Flexible funds investing across market caps'
    },
    { 
      id: 'sectoral', 
      name: 'Sectoral/Thematic', 
      icon: <FaChartPie />,
      description: 'Funds focused on specific sectors or themes'
    },
    { 
      id: 'elss', 
      name: 'ELSS', 
      icon: <FaCalculator />,
      description: 'Tax-saving equity-linked schemes with 3-year lock-in'
    },
    { 
      id: 'hybrid', 
      name: 'Hybrid', 
      icon: <FaExchangeAlt />,
      description: 'Balanced mix of equity and debt instruments'
    },
    { 
      id: 'debt', 
      name: 'Debt', 
      icon: <FaMoneyBillWave />,
      description: 'Funds investing in fixed income securities'
    },
    { 
      id: 'liquid', 
      name: 'Liquid', 
      icon: <FaMoneyBillWave />,
      description: 'Ultra-short term debt funds for parking surplus cash'
    },
    { 
      id: 'index', 
      name: 'Index', 
      icon: <FaChartBar />,
      description: 'Passive funds tracking market indices'
    },
    { 
      id: 'international', 
      name: 'International', 
      icon: <FaGlobe />,
      description: 'Funds investing in global markets'
    }
  ];

  // Enhanced Mutual Funds Data with real information
  const funds = [
    {
      id: 1,
      name: 'HDFC Top 100 Fund',
      amc: 'HDFC Mutual Fund',
      category: 'equity',
      nav: 45.67,
      change: 1.2,
      changePercent: 2.69,
      aum: '₹25,000 Cr',
      minInvestment: '₹5,000',
      rating: 4.5,
      riskLevel: 'Moderately High',
      lastUpdated: '2024-03-15 14:30:00',
      fundManager: 'Mr. Prashant Jain',
      inceptionDate: '2008-10-11',
      expenseRatio: 1.75,
      exitLoad: '1% for redemption within 1 year',
      benchmark: 'NIFTY 100',
      riskometer: {
        marketRisk: 'Moderate',
        creditRisk: 'Low',
        liquidityRisk: 'Low',
        concentrationRisk: 'Moderate'
      },
      returns: {
        '1M': 2.5,
        '3M': 5.8,
        '6M': 8.2,
        '1Y': 15.2,
        '3Y': 18.5,
        '5Y': 16.8,
        '10Y': 14.2
      },
      portfolio: {
        equity: 95,
        debt: 5,
        cash: 0,
        sectorAllocation: [
          { sector: 'Financial Services', weight: 35.5 },
          { sector: 'Technology', weight: 20.2 },
          { sector: 'Consumer Goods', weight: 15.8 },
          { sector: 'Healthcare', weight: 12.5 },
          { sector: 'Others', weight: 16.0 }
        ]
      },
      topHoldings: [
        { name: 'HDFC Bank', weight: 8.5 },
        { name: 'Reliance Industries', weight: 7.2 },
        { name: 'ICICI Bank', weight: 6.8 },
        { name: 'Infosys', weight: 5.5 },
        { name: 'TCS', weight: 4.8 }
      ],
      documents: {
        factsheet: 'https://example.com/factsheet.pdf',
        kim: 'https://example.com/kim.pdf',
        sid: 'https://example.com/sid.pdf'
      },
      news: [
        {
          title: 'HDFC Top 100 Fund outperforms benchmark by 5%',
          date: '2024-03-15',
          source: 'Economic Times'
        }
      ],
      investmentOptions: {
        lumpsum: {
          min: 5000,
          max: 1000000
        },
        sip: {
          min: 1000,
          max: 100000,
          frequencies: ['monthly', 'quarterly']
        }
      },
      taxBenefits: {
        elss: false,
        longTermCapitalGains: true
      }
    },
    {
      id: 2,
      name: 'ICICI Prudential Corporate Bond Fund',
      category: 'debt',
      nav: 32.45,
      change: -0.3,
      changePercent: -0.92,
      aum: '₹1,800 Cr',
      minInvestment: '₹10,000',
      rating: 4.2,
      lastUpdated: '2024-03-15 14:30:00',
      fundManager: 'Mr. Rahul Goswami',
      inceptionDate: '2010-05-20',
      expenseRatio: 1.25,
      exitLoad: '0.5% for redemption within 3 months',
      benchmark: 'CRISIL Corporate Bond Index',
      riskLevel: 'Moderate',
      returns: {
        '1Y': 8.5,
        '3Y': 9.2,
        '5Y': 8.8,
        '10Y': 9.5
      },
      portfolio: {
        equity: 0,
        debt: 85,
        cash: 15
      },
      topHoldings: [
        { name: 'HDFC Bank Bonds', weight: 12.5 },
        { name: 'Reliance Industries Bonds', weight: 10.2 },
        { name: 'ICICI Bank Bonds', weight: 9.8 },
        { name: 'L&T Bonds', weight: 8.5 },
        { name: 'Tata Steel Bonds', weight: 7.8 }
      ]
    },
    {
      id: 3,
      name: 'Axis Bluechip Fund',
      category: 'equity',
      nav: 38.92,
      change: 0.8,
      changePercent: 2.05,
      aum: '₹3,200 Cr',
      minInvestment: '₹5,000',
      rating: 4.7,
      lastUpdated: '2024-03-15 14:30:00',
      fundManager: 'Mr. Shreyash Devalkar',
      inceptionDate: '2010-01-01',
      expenseRatio: 1.69,
      exitLoad: '1% for redemption within 1 year',
      benchmark: 'NIFTY 50',
      riskLevel: 'Moderately High',
      returns: {
        '1Y': 16.8,
        '3Y': 19.2,
        '5Y': 17.5,
        '10Y': 15.8
      },
      portfolio: {
        equity: 92,
        debt: 8,
        cash: 0
      },
      topHoldings: [
        { name: 'HDFC Bank', weight: 9.2 },
        { name: 'Infosys', weight: 8.5 },
        { name: 'ICICI Bank', weight: 7.8 },
        { name: 'TCS', weight: 7.2 },
        { name: 'Reliance Industries', weight: 6.5 }
      ]
    },
    {
      id: 4,
      name: 'Mirae Asset Tax Saver Fund',
      category: 'tax',
      nav: 42.18,
      change: 1.1,
      changePercent: 2.67,
      aum: '₹1,500 Cr',
      minInvestment: '₹500',
      rating: 4.6,
      lastUpdated: '2024-03-15 14:30:00',
      fundManager: 'Mr. Neelesh Surana',
      inceptionDate: '2015-01-01',
      expenseRatio: 1.82,
      exitLoad: 'Nil after 3 years',
      benchmark: 'NIFTY 500',
      riskLevel: 'High',
      returns: {
        '1Y': 17.2,
        '3Y': 20.5,
        '5Y': 18.8,
        '10Y': 16.2
      },
      portfolio: {
        equity: 98,
        debt: 2,
        cash: 0
      },
      topHoldings: [
        { name: 'HDFC Bank', weight: 7.8 },
        { name: 'ICICI Bank', weight: 7.2 },
        { name: 'Infosys', weight: 6.8 },
        { name: 'TCS', weight: 6.5 },
        { name: 'Bharti Airtel', weight: 5.8 }
      ]
    },
    {
      id: 5,
      name: 'Kotak Liquid Fund',
      category: 'liquid',
      nav: 1234.56,
      change: 0.1,
      changePercent: 0.01,
      aum: '₹4,500 Cr',
      minInvestment: '₹5,000',
      rating: 4.3,
      lastUpdated: '2024-03-15 14:30:00',
      fundManager: 'Mr. Abhishek Bisen',
      inceptionDate: '2003-03-01',
      expenseRatio: 0.20,
      exitLoad: 'Nil',
      benchmark: 'CRISIL Liquid Fund Index',
      riskLevel: 'Low',
      returns: {
        '1Y': 6.8,
        '3Y': 7.2,
        '5Y': 7.5,
        '10Y': 7.8
      },
      portfolio: {
        equity: 0,
        debt: 95,
        cash: 5
      },
      topHoldings: [
        { name: 'Treasury Bills', weight: 35.5 },
        { name: 'Commercial Papers', weight: 25.2 },
        { name: 'Certificate of Deposits', weight: 20.8 },
        { name: 'Corporate Bonds', weight: 15.5 },
        { name: 'Cash & Cash Equivalents', weight: 3.0 }
      ]
    }
  ];

  // Calculate SIP returns
  const calculateSIPReturns = (amount, frequency, duration, expectedReturn) => {
    const monthlyRate = expectedReturn / 12 / 100;
    const months = duration * 12;
    const monthlyInvestment = amount;

    let futureValue = 0;
    for (let i = 0; i < months; i++) {
      futureValue = (futureValue + monthlyInvestment) * (1 + monthlyRate);
    }

    return {
      totalInvestment: monthlyInvestment * months,
      maturityValue: futureValue,
      returns: futureValue - (monthlyInvestment * months)
    };
  };

  // Handle investment with SIP calculation
  const handleInvestment = () => {
    if (!selectedFund || !investmentAmount) return;

    let investmentDetails;
    if (investmentType === 'sip') {
      investmentDetails = calculateSIPReturns(
        parseFloat(sipAmount),
        sipFrequency,
        parseInt(sipDuration),
        selectedFund.returns['1Y']
      );
    }

    const newInvestment = {
      id: Date.now(),
      fundId: selectedFund.id,
      amount: investmentType === 'lumpsum' ? parseFloat(investmentAmount) : parseFloat(sipAmount),
      type: investmentType,
      date: new Date().toISOString(),
      units: investmentType === 'lumpsum' 
        ? parseFloat(investmentAmount) / selectedFund.nav
        : parseFloat(sipAmount) / selectedFund.nav,
      ...(investmentType === 'sip' && { 
        frequency: sipFrequency,
        duration: sipDuration,
        expectedReturns: investmentDetails
      })
    };

    setInvestments([...investments, newInvestment]);
    localStorage.setItem('mfInvestments', JSON.stringify([...investments, newInvestment]));
    setShowInvestmentModal(false);
    setInvestmentAmount('');
    setSipAmount('');
  };

  // Calculate portfolio value
  const portfolioValue = useMemo(() => {
    return investments.reduce((total, investment) => {
      const fund = funds.find(f => f.id === investment.fundId);
      if (!fund) return total;
      return total + (investment.units * fund.nav);
    }, 0);
  }, [investments, funds]);

  // Handle fund selection for comparison
  const handleFundSelection = (fundId) => {
    if (selectedFunds.includes(fundId)) {
      setSelectedFunds(selectedFunds.filter(id => id !== fundId));
    } else if (selectedFunds.length < 3) {
      const newSelectedFunds = [...selectedFunds, fundId];
      setSelectedFunds(newSelectedFunds);
      if (newSelectedFunds.length >= 2) {
        setShowComparison(true);
      }
    }
  };

  // Get chart options for performance comparison
  const getComparisonChartOptions = () => ({
    chart: {
      type: 'line',
      height: 350,
      toolbar: {
        show: true
      }
    },
    stroke: {
      curve: 'smooth',
      width: 2
    },
    xaxis: {
      categories: ['1M', '3M', '6M', '1Y', '3Y', '5Y']
    },
    yaxis: {
      labels: {
        formatter: (value) => `${value}%`
      }
    },
    tooltip: {
      y: {
        formatter: (value) => `${value}%`
      }
    }
  });

  // Render fund details modal
  const renderFundDetails = () => {
    if (!showFundDetails || !selectedFund) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center">
                {selectedFund.name.charAt(0)}
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">{selectedFund.name}</h2>
                <p className="text-sm text-gray-500">{selectedFund.amc}</p>
              </div>
            </div>
            <button
              onClick={() => setShowFundDetails(false)}
              className="text-gray-400 hover:text-gray-500"
            >
              <FaTimes className="w-6 h-6" />
            </button>
          </div>

          {/* Tabs */}
          <div className="border-b border-gray-200 mb-6">
            <nav className="flex space-x-8">
              {['overview', 'performance', 'portfolio', 'documents', 'news'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setSelectedTab(tab)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    selectedTab === tab
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="space-y-6">
            {/* Overview Tab */}
            {selectedTab === 'overview' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h3 className="text-lg font-semibold mb-4">Fund Details</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Fund Manager</span>
                        <span className="font-medium">{selectedFund?.fundManager || 'Not Available'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Inception Date</span>
                        <span className="font-medium">{selectedFund?.inceptionDate || 'Not Available'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Expense Ratio</span>
                        <span className="font-medium">{selectedFund?.expenseRatio || 0}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Exit Load</span>
                        <span className="font-medium">{selectedFund?.exitLoad || 'Not Available'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Benchmark</span>
                        <span className="font-medium">{selectedFund?.benchmark || 'Not Available'}</span>
                      </div>
                    </div>
                  </div>

                  {selectedFund?.riskometer && (
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <h3 className="text-lg font-semibold mb-4">Riskometer</h3>
                      <div className="space-y-2">
                        {Object.entries(selectedFund.riskometer || {}).map(([risk, level]) => (
                          <div key={risk} className="flex justify-between">
                            <span className="text-gray-600">{risk.replace(/([A-Z])/g, ' $1').trim()}</span>
                            <span className="font-medium">{level || 'Not Available'}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="space-y-4">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h3 className="text-lg font-semibold mb-4">Performance</h3>
                    <div className="space-y-2">
                      {Object.entries(selectedFund?.returns || {}).map(([period, value]) => (
                        <div key={period} className="flex justify-between">
                          <span className="text-gray-600">{period}</span>
                          <span className="font-medium text-green-600">+{value || 0}%</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h3 className="text-lg font-semibold mb-4">Investment Options</h3>
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm text-gray-600">Minimum Investment</p>
                        <p className="font-medium">{selectedFund?.minInvestment || 'Not Available'}</p>
                      </div>
                      <div className="flex space-x-4">
                        <button
                          onClick={() => {
                            setShowFundDetails(false);
                            setShowInvestmentModal(true);
                          }}
                          className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                        >
                          Invest Now
                        </button>
                        <button
                          onClick={() => {
                            setShowFundDetails(false);
                            setShowCalculator(true);
                            setCalculatorType('sip');
                          }}
                          className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                        >
                          SIP Calculator
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Performance Tab */}
            {selectedTab === 'performance' && (
              <div className="space-y-6">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h3 className="text-lg font-semibold mb-4">NAV Growth</h3>
                  <div className="h-80">
                    <ReactApexChart
                      options={{
                        chart: {
                          type: 'line',
                          height: 350,
                          toolbar: {
                            show: true
                          }
                        },
                        stroke: {
                          curve: 'smooth',
                          width: 2
                        },
                        xaxis: {
                          categories: Object.keys(selectedFund.returns || {})
                        },
                        yaxis: {
                          labels: {
                            formatter: (value) => `${value}%`
                          }
                        },
                        tooltip: {
                          y: {
                            formatter: (value) => `${value}%`
                          }
                        }
                      }}
                      series={[
                        {
                          name: 'Returns',
                          data: Object.values(selectedFund.returns || {})
                        }
                      ]}
                      type="line"
                      height="100%"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h3 className="text-lg font-semibold mb-4">Portfolio Allocation</h3>
                    <div className="h-64">
                      <ReactApexChart
                        options={{
                          chart: {
                            type: 'pie',
                            background: 'transparent'
                          },
                          labels: ['Equity', 'Debt', 'Cash'],
                          colors: ['#10B981', '#3B82F6', '#F59E0B'],
                          legend: {
                            position: 'bottom'
                          }
                        }}
                        series={[
                          selectedFund.portfolio?.equity || 0,
                          selectedFund.portfolio?.debt || 0,
                          selectedFund.portfolio?.cash || 0
                        ]}
                        type="pie"
                        height="100%"
                      />
                    </div>
                  </div>

                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h3 className="text-lg font-semibold mb-4">Sector Allocation</h3>
                    <div className="h-64">
                      <ReactApexChart
                        options={{
                          chart: {
                            type: 'pie',
                            background: 'transparent'
                          },
                          labels: (selectedFund.portfolio?.sectorAllocation || []).map(s => s.sector),
                          colors: ['#10B981', '#3B82F6', '#F59E0B', '#EF4444', '#8B5CF6'],
                          legend: {
                            position: 'bottom'
                          }
                        }}
                        series={(selectedFund.portfolio?.sectorAllocation || []).map(s => s.weight)}
                        type="pie"
                        height="100%"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Portfolio Tab */}
            {selectedTab === 'portfolio' && (
              <div className="space-y-6">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h3 className="text-lg font-semibold mb-4">Top Holdings</h3>
                  <div className="space-y-4">
                    {(selectedFund?.topHoldings || []).map((holding, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
                            {holding?.name?.charAt(0) || '?'}
                          </div>
                          <span className="font-medium">{holding?.name || 'Unknown'}</span>
                        </div>
                        <span className="text-gray-600">{holding?.weight || 0}%</span>
                      </div>
                    ))}
                    {(!selectedFund?.topHoldings || selectedFund.topHoldings.length === 0) && (
                      <p className="text-gray-500 text-center py-4">No holdings data available</p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Documents Tab */}
            {selectedTab === 'documents' && (
              <div className="space-y-6">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h3 className="text-lg font-semibold mb-4">Fund Documents</h3>
                  <div className="space-y-4">
                    {selectedFund?.documents?.factsheet && (
                      <a
                        href={selectedFund.documents.factsheet}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between p-4 bg-white rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        <div className="flex items-center space-x-4">
                          <FaDownload className="w-5 h-5 text-blue-600" />
                          <span>Factsheet</span>
                        </div>
                        <FaArrowUp className="w-4 h-4 text-gray-400" />
                      </a>
                    )}
                    {selectedFund?.documents?.kim && (
                      <a
                        href={selectedFund.documents.kim}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between p-4 bg-white rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        <div className="flex items-center space-x-4">
                          <FaDownload className="w-5 h-5 text-blue-600" />
                          <span>Key Information Memorandum (KIM)</span>
                        </div>
                        <FaArrowUp className="w-4 h-4 text-gray-400" />
                      </a>
                    )}
                    {selectedFund?.documents?.sid && (
                      <a
                        href={selectedFund.documents.sid}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between p-4 bg-white rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        <div className="flex items-center space-x-4">
                          <FaDownload className="w-5 h-5 text-blue-600" />
                          <span>Scheme Information Document (SID)</span>
                        </div>
                        <FaArrowUp className="w-4 h-4 text-gray-400" />
                      </a>
                    )}
                    {(!selectedFund?.documents || 
                      (!selectedFund.documents.factsheet && 
                       !selectedFund.documents.kim && 
                       !selectedFund.documents.sid)) && (
                      <p className="text-gray-500 text-center py-4">No documents available</p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* News Tab */}
            {selectedTab === 'news' && (
              <div className="space-y-6">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h3 className="text-lg font-semibold mb-4">Latest News</h3>
                  <div className="space-y-4">
                    {(selectedFund?.news || []).map((item, index) => (
                      <div key={index} className="p-4 bg-white rounded-lg">
                        <h4 className="font-medium text-gray-900">{item?.title || 'No Title'}</h4>
                        <div className="mt-2 flex items-center text-sm text-gray-500">
                          <span>{item?.date || 'No Date'}</span>
                          <span className="mx-2">•</span>
                          <span>{item?.source || 'Unknown Source'}</span>
                        </div>
                      </div>
                    ))}
                    {(!selectedFund?.news || selectedFund.news.length === 0) && (
                      <p className="text-gray-500 text-center py-4">No news available</p>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  // Enhanced investment modal
  const renderInvestmentModal = () => {
    if (!showInvestmentModal || !selectedFund) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl p-6 w-full max-w-md">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Invest in {selectedFund.name}</h2>
              <p className="text-sm text-gray-500 mt-1">Start your investment journey</p>
            </div>
            <button
              onClick={() => setShowInvestmentModal(false)}
              className="text-gray-400 hover:text-gray-500"
            >
              <FaTimes className="w-6 h-6" />
            </button>
          </div>

          <div className="space-y-6">
            {/* Investment Type Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Investment Type
              </label>
              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => setInvestmentType('lumpsum')}
                  className={`p-4 rounded-lg border-2 transition-colors ${
                    investmentType === 'lumpsum'
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-blue-200'
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <FaMoneyBillWave className={`w-5 h-5 ${
                      investmentType === 'lumpsum' ? 'text-blue-500' : 'text-gray-400'
                    }`} />
                    <div className="text-left">
                      <p className={`font-medium ${
                        investmentType === 'lumpsum' ? 'text-blue-600' : 'text-gray-900'
                      }`}>Lump Sum</p>
                      <p className="text-xs text-gray-500">One-time investment</p>
                    </div>
                  </div>
                </button>
                <button
                  onClick={() => setInvestmentType('sip')}
                  className={`p-4 rounded-lg border-2 transition-colors ${
                    investmentType === 'sip'
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-blue-200'
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <FaCalendarAlt className={`w-5 h-5 ${
                      investmentType === 'sip' ? 'text-blue-500' : 'text-gray-400'
                    }`} />
                    <div className="text-left">
                      <p className={`font-medium ${
                        investmentType === 'sip' ? 'text-blue-600' : 'text-gray-900'
                      }`}>SIP</p>
                      <p className="text-xs text-gray-500">Systematic investment</p>
                    </div>
                  </div>
                </button>
              </div>
            </div>

            {investmentType === 'lumpsum' ? (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Investment Amount
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                      ₹
                    </span>
                    <input
                      type="number"
                      value={investmentAmount}
                      onChange={(e) => setInvestmentAmount(e.target.value)}
                      placeholder="Enter amount"
                      className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Min: ₹{selectedFund.investmentOptions?.lumpsum?.min || 5000} | 
                    Max: ₹{selectedFund.investmentOptions?.lumpsum?.max || 1000000}
                  </p>
                </div>

                <div className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-2">Investment Summary</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Amount</span>
                      <span className="font-medium">₹{investmentAmount || 0}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Units</span>
                      <span className="font-medium">
                        {investmentAmount ? (parseFloat(investmentAmount) / selectedFund.nav).toFixed(4) : 0}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">NAV</span>
                      <span className="font-medium">₹{selectedFund.nav.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    SIP Amount
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                      ₹
                    </span>
                    <input
                      type="number"
                      value={sipAmount}
                      onChange={(e) => setSipAmount(e.target.value)}
                      placeholder="Enter SIP amount"
                      className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Min: ₹{selectedFund.investmentOptions?.sip?.min || 1000}/month
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    SIP Frequency
                  </label>
                  <select
                    value={sipFrequency}
                    onChange={(e) => setSipFrequency(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    {selectedFund.investmentOptions?.sip?.frequencies?.map(freq => (
                      <option key={freq} value={freq}>
                        {freq.charAt(0).toUpperCase() + freq.slice(1)}
                      </option>
                    )) || (
                      <>
                        <option value="monthly">Monthly</option>
                        <option value="quarterly">Quarterly</option>
                      </>
                    )}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Duration (Years)
                  </label>
                  <input
                    type="number"
                    value={sipDuration}
                    onChange={(e) => setSipDuration(e.target.value)}
                    placeholder="Enter duration"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                  <p className="text-xs text-gray-500 mt-1">Recommended: 5+ years for equity funds</p>
                </div>

                <div className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-2">SIP Summary</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Monthly Investment</span>
                      <span className="font-medium">₹{sipAmount || 0}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Total Investment</span>
                      <span className="font-medium">
                        ₹{sipAmount && sipDuration ? (parseFloat(sipAmount) * parseInt(sipDuration) * 12) : 0}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Expected Returns</span>
                      <span className="font-medium text-green-600">
                        ₹{sipAmount && sipDuration ? (
                          calculateSIPReturns(
                            parseFloat(sipAmount),
                            sipFrequency,
                            parseInt(sipDuration),
                            selectedFund.returns['1Y']
                          ).returns
                        ).toFixed(2) : 0}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="pt-4 border-t border-gray-200">
              <button
                onClick={handleInvestment}
                className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                {investmentType === 'lumpsum' ? 'Invest Now' : 'Start SIP'}
              </button>
              <p className="text-xs text-gray-500 mt-2 text-center">
                By proceeding, you agree to the fund's terms and conditions
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Render fund comparison modal
  const renderComparisonModal = () => {
    if (!showComparison || selectedFunds.length === 0) return null;

    const selectedFundsData = funds.filter(fund => selectedFunds.includes(fund.id));

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Compare Funds</h2>
            <button
              onClick={() => {
                setSelectedFunds([]);
                setShowComparison(false);
              }}
              className="text-gray-400 hover:text-gray-500"
            >
              <FaTimes className="w-6 h-6" />
            </button>
          </div>

          <div className="space-y-6">
            {/* Performance Chart */}
            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="text-lg font-semibold mb-4">Performance Comparison</h3>
              <div className="h-80">
                <ReactApexChart
                  options={{
                    chart: {
                      type: 'line',
                      height: 350,
                      toolbar: {
                        show: true
                      }
                    },
                    stroke: {
                      curve: 'smooth',
                      width: 2
                    },
                    xaxis: {
                      categories: ['1Y', '3Y', '5Y', '10Y']
                    },
                    yaxis: {
                      labels: {
                        formatter: (value) => `${value}%`
                      }
                    },
                    tooltip: {
                      y: {
                        formatter: (value) => `${value}%`
                      }
                    },
                    legend: {
                      position: 'top'
                    }
                  }}
                  series={selectedFundsData.map(fund => ({
                    name: fund.name,
                    data: [
                      fund.returns['1Y'] || 0,
                      fund.returns['3Y'] || 0,
                      fund.returns['5Y'] || 0,
                      fund.returns['10Y'] || 0
                    ]
                  }))}
                  type="line"
                  height="100%"
                />
              </div>
            </div>

            {/* Fund Details Comparison */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {selectedFundsData.map(fund => (
                <div key={fund.id} className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold">{fund.name}</h3>
                    <button
                      onClick={() => handleFundSelection(fund.id)}
                      className="text-gray-400 hover:text-red-500"
                    >
                      <FaTimes className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Category</span>
                      <span className="font-medium">{fund.category}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">NAV</span>
                      <span className="font-medium">₹{fund.nav.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">AUM</span>
                      <span className="font-medium">{fund.aum}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Expense Ratio</span>
                      <span className="font-medium">{fund.expenseRatio}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Risk Level</span>
                      <span className="font-medium">{fund.riskLevel}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Min Investment</span>
                      <span className="font-medium">{fund.minInvestment}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">1Y Returns</span>
                      <span className="font-medium text-green-600">+{fund.returns['1Y']}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">3Y Returns</span>
                      <span className="font-medium text-green-600">+{fund.returns['3Y']}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">5Y Returns</span>
                      <span className="font-medium text-green-600">+{fund.returns['5Y']}%</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Add this before the return statement
  const filteredFunds = useMemo(() => {
    return funds
      .filter(fund => {
        const matchesSearch = fund.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            fund.amc.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = selectedFilter === 'all' || fund.category === selectedFilter;
        const matchesRisk = selectedRiskLevel === 'all' || fund.riskLevel === selectedRiskLevel;
        const matchesAMC = selectedAMC === 'all' || fund.amc === selectedAMC;
        return matchesSearch && matchesCategory && matchesRisk && matchesAMC;
      })
      .sort((a, b) => {
        const multiplier = sortOrder === 'asc' ? 1 : -1;
        switch (sortBy) {
          case 'name':
            return multiplier * a.name.localeCompare(b.name);
          case 'nav':
            return multiplier * (a.nav - b.nav);
          case 'returns':
            return multiplier * (a.returns['1Y'] - b.returns['1Y']);
          case 'aum':
            return multiplier * (parseFloat(a.aum.replace(/[^0-9.]/g, '')) - parseFloat(b.aum.replace(/[^0-9.]/g, '')));
          default:
            return 0;
        }
      });
  }, [funds, searchQuery, selectedFilter, selectedRiskLevel, selectedAMC, sortBy, sortOrder]);

  // Add the handleFilter function
  const handleFilter = (categoryId) => {
    setSelectedFilter(categoryId);
  };

  // Add the handleAddToWatchlist function
  const handleAddToWatchlist = (fundId) => {
    if (watchlist.includes(fundId)) {
      const newWatchlist = watchlist.filter(id => id !== fundId);
      setWatchlist(newWatchlist);
      localStorage.setItem('mfWatchlist', JSON.stringify(newWatchlist));
    } else {
      const newWatchlist = [...watchlist, fundId];
      setWatchlist(newWatchlist);
      localStorage.setItem('mfWatchlist', JSON.stringify(newWatchlist));
    }
  };

  // Add SIP Calculator render function
  const renderSIPCalculator = () => {
    if (!showCalculator) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl p-6 w-full max-w-md">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">SIP Calculator</h2>
              <p className="text-sm text-gray-500 mt-1">Plan your systematic investments</p>
            </div>
            <button
              onClick={() => setShowCalculator(false)}
              className="text-gray-400 hover:text-gray-500"
            >
              <FaTimes className="w-6 h-6" />
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Monthly Investment
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                  ₹
                </span>
                <input
                  type="number"
                  value={sipCalculatorAmount}
                  onChange={(e) => setSipCalculatorAmount(e.target.value)}
                  placeholder="Enter amount"
                  className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">Min: ₹500 | Max: ₹1,00,000</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Expected Annual Return (%)
              </label>
              <div className="relative">
                <input
                  type="number"
                  value={sipCalculatorReturn}
                  onChange={(e) => setSipCalculatorReturn(e.target.value)}
                  placeholder="Enter expected return"
                  className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                  %
                </span>
              </div>
              <p className="text-xs text-gray-500 mt-1">Typical range: 8% - 15%</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Time Period (Years)
              </label>
              <div className="relative">
                <input
                  type="number"
                  value={sipCalculatorPeriod}
                  onChange={(e) => setSipCalculatorPeriod(e.target.value)}
                  placeholder="Enter time period"
                  className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                  years
                </span>
              </div>
              <p className="text-xs text-gray-500 mt-1">Recommended: 5+ years for equity funds</p>
            </div>

            <button
              onClick={() => {
                const amount = parseFloat(sipCalculatorAmount);
                const returnRate = parseFloat(sipCalculatorReturn);
                const years = parseInt(sipCalculatorPeriod);

                if (amount && returnRate && years) {
                  const monthlyRate = returnRate / 12 / 100;
                  const months = years * 12;
                  const monthlyInvestment = amount;

                  let futureValue = 0;
                  for (let i = 0; i < months; i++) {
                    futureValue = (futureValue + monthlyInvestment) * (1 + monthlyRate);
                  }

                  setSipCalculatorResults({
                    totalInvestment: monthlyInvestment * months,
                    maturityValue: futureValue,
                    returns: futureValue - (monthlyInvestment * months),
                    monthlyInvestment: monthlyInvestment,
                    years: years,
                    annualReturn: returnRate
                  });
                }
              }}
              className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Calculate
            </button>

            {sipCalculatorResults && (
              <div className="mt-6 space-y-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h3 className="text-lg font-semibold mb-4">Investment Summary</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Monthly Investment</span>
                      <span className="font-medium">₹{sipCalculatorResults.monthlyInvestment.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Total Investment</span>
                      <span className="font-medium">₹{sipCalculatorResults.totalInvestment.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Maturity Value</span>
                      <span className="font-medium">₹{sipCalculatorResults.maturityValue.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Total Returns</span>
                      <span className="font-medium text-green-600">₹{sipCalculatorResults.returns.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Return Rate</span>
                      <span className="font-medium text-green-600">{sipCalculatorResults.annualReturn}% p.a.</span>
                    </div>
                  </div>
                </div>

                <div className="h-64">
                  <ReactApexChart
                    options={{
                      chart: {
                        type: 'pie',
                        background: 'transparent'
                      },
                      labels: ['Investment', 'Returns'],
                      colors: ['#3B82F6', '#10B981'],
                      legend: {
                        position: 'bottom'
                      },
                      tooltip: {
                        y: {
                          formatter: (value) => `₹${value.toFixed(2)}`
                        }
                      }
                    }}
                    series={[
                      sipCalculatorResults.totalInvestment,
                      sipCalculatorResults.returns
                    ]}
                    type="pie"
                    height="100%"
                  />
                </div>

                <div className="p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-medium text-blue-800 mb-2">Investment Insights</h4>
                  <ul className="text-sm text-blue-700 space-y-1">
                    <li>• Your investment will grow {((sipCalculatorResults.maturityValue / sipCalculatorResults.totalInvestment) * 100).toFixed(1)}x over {sipCalculatorResults.years} years</li>
                    <li>• Monthly investment of ₹{sipCalculatorResults.monthlyInvestment.toFixed(2)} for {sipCalculatorResults.years} years</li>
                    <li>• Expected annual return of {sipCalculatorResults.annualReturn}%</li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  // Add this function to handle search suggestions
  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query.length > 0) {
      const suggestions = funds.filter(fund => 
        fund.name.toLowerCase().includes(query.toLowerCase()) ||
        fund.amc.toLowerCase().includes(query.toLowerCase()) ||
        fund.category.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 5); // Limit to 5 suggestions
      setSearchSuggestions(suggestions);
      setShowSuggestions(true);
    } else {
      setSearchSuggestions([]);
      setShowSuggestions(false);
    }
  };

  // Add this function to handle suggestion click
  const handleSuggestionClick = (fund) => {
    setSearchQuery(fund.name);
    setShowSuggestions(false);
    setSelectedFund(fund);
    setShowFundDetails(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-50">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-24">
        {/* Page Header */}
        <div className="mb-8">
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-8">
              <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6">
                <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border-4 border-white/30">
                  <FaLandmark className="w-8 h-8 text-white" />
                </div>
                <div className="text-center md:text-left">
                  <h1 className="text-2xl font-bold text-white">Mutual Funds</h1>
                  <p className="text-blue-100 mt-1">Invest in professionally managed funds</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Search and Advanced Filters */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="p-6">
                <div className="space-y-4">
                  {/* Enhanced Search Bar with Suggestions */}
                  <div className="relative">
                    <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search by fund name, AMC, or category..."
                      value={searchQuery}
                      onChange={handleSearchChange}
                      onFocus={() => searchQuery.length > 0 && setShowSuggestions(true)}
                      onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                    
                    {/* Search Suggestions Dropdown */}
                    {showSuggestions && searchSuggestions.length > 0 && (
                      <div className="absolute z-10 w-full mt-1 bg-white rounded-lg shadow-lg border border-gray-200 max-h-60 overflow-y-auto">
                        {searchSuggestions.map((fund) => (
                          <div
                            key={fund.id}
                            onClick={() => handleSuggestionClick(fund)}
                            className="p-3 hover:bg-gray-50 cursor-pointer flex items-center justify-between"
                          >
                            <div>
                              <p className="font-medium text-gray-900">{fund.name}</p>
                              <p className="text-sm text-gray-500">{fund.amc}</p>
                            </div>
                            <div className="text-right">
                              <p className="text-sm text-gray-600">NAV: ₹{fund.nav.toFixed(2)}</p>
                              <p className="text-sm text-gray-600">{fund.category}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* No Results Message */}
                    {showSuggestions && searchQuery.length > 0 && searchSuggestions.length === 0 && (
                      <div className="absolute z-10 w-full mt-1 bg-white rounded-lg shadow-lg border border-gray-200 p-3">
                        <p className="text-gray-500 text-center">No funds found matching "{searchQuery}"</p>
                      </div>
                    )}
                  </div>

                  {/* Advanced Filters */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Risk Level Filter */}
                    <select
                      value={selectedRiskLevel}
                      onChange={(e) => setSelectedRiskLevel(e.target.value)}
                      className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="all">All Risk Levels</option>
                      <option value="Low">Low Risk</option>
                      <option value="Moderate">Moderate Risk</option>
                      <option value="Moderately High">Moderately High</option>
                      <option value="High">High Risk</option>
                    </select>

                    {/* AMC Filter */}
                    <select
                      value={selectedAMC}
                      onChange={(e) => setSelectedAMC(e.target.value)}
                      className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="all">All AMCs</option>
                      <option value="HDFC Mutual Fund">HDFC Mutual Fund</option>
                      <option value="ICICI Prudential">ICICI Prudential</option>
                      <option value="Axis Mutual Fund">Axis Mutual Fund</option>
                    </select>

                    {/* Sort Options */}
                    <select
                      value={`${sortBy}-${sortOrder}`}
                      onChange={(e) => {
                        const [field, order] = e.target.value.split('-');
                        setSortBy(field);
                        setSortOrder(order);
                      }}
                      className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="name-asc">Name (A-Z)</option>
                      <option value="name-desc">Name (Z-A)</option>
                      <option value="nav-asc">NAV (Low to High)</option>
                      <option value="nav-desc">NAV (High to Low)</option>
                      <option value="returns-desc">Returns (High to Low)</option>
                      <option value="returns-asc">Returns (Low to High)</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Funds List */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="p-6">
                <div className="space-y-4">
                  {filteredFunds.map((fund) => (
                    <div
                      key={fund.id}
                      className="flex flex-col md:flex-row items-start md:items-center justify-between p-4 bg-gray-50 rounded-lg hover:shadow-sm transition-all duration-300 cursor-pointer"
                      onClick={() => {
                        setSelectedFund(fund);
                        setShowFundDetails(true);
                      }}
                    >
                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center">
                          {fund.name.charAt(0)}
                        </div>
                        <div>
                          <div className="flex items-center space-x-2">
                            <p className="font-medium text-gray-900">{fund.name}</p>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleAddToWatchlist(fund.id);
                              }}
                              className="text-gray-400 hover:text-yellow-500 transition-colors"
                            >
                              {watchlist.includes(fund.id) ? <FaStar className="w-4 h-4" /> : <FaRegStar className="w-4 h-4" />}
                            </button>
                          </div>
                          <p className="text-sm text-gray-500">{fund.amc}</p>
                          <div className="mt-2 flex items-center space-x-4">
                            <span className="text-sm text-gray-600">Risk: {fund.riskLevel}</span>
                            <span className="text-sm text-gray-600">Min: {fund.minInvestment}</span>
                          </div>
                        </div>
                      </div>

                      <div className="mt-4 md:mt-0 flex flex-wrap md:flex-nowrap items-center space-x-8">
                        <div className="text-right">
                          <p className="text-sm text-gray-500">NAV</p>
                          <p className="font-medium text-gray-900">₹{fund.nav.toFixed(2)}</p>
                          <div className={`flex items-center text-sm ${
                            fund.change >= 0 ? 'text-green-600' : 'text-red-600'
                          }`}>
                            {fund.change >= 0 ? <FaArrowUp className="w-3 h-3 mr-1" /> : <FaArrowDown className="w-3 h-3 mr-1" />}
                            <span>{Math.abs(fund.change)} ({Math.abs(fund.changePercent)}%)</span>
                          </div>
                        </div>

                        <div className="text-right">
                          <p className="text-sm text-gray-500">Returns</p>
                          <div className="space-y-1">
                            <p className="text-sm text-gray-900">1Y: {fund.returns['1Y']}%</p>
                            <p className="text-sm text-gray-900">3Y: {fund.returns['3Y']}%</p>
                            <p className="text-sm text-gray-900">5Y: {fund.returns['5Y']}%</p>
                          </div>
                        </div>

                        <div className="text-right">
                          <p className="text-sm text-gray-500">AUM</p>
                          <p className="font-medium text-gray-900">{fund.aum}</p>
                          <p className="text-sm text-gray-500">Rating: {fund.rating}/5</p>
                        </div>

                        <div className="flex space-x-2">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedFund(fund);
                              setShowInvestmentModal(true);
                            }}
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                          >
                            Invest
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleFundSelection(fund.id);
                            }}
                            className={`px-4 py-2 ${
                              selectedFunds.includes(fund.id)
                                ? 'bg-purple-700 text-white'
                                : 'bg-purple-600 text-white hover:bg-purple-700'
                            } rounded-lg transition-colors`}
                          >
                            {selectedFunds.includes(fund.id) ? 'Selected' : 'Compare'}
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Categories */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-100">
                <h2 className="text-xl font-semibold text-gray-900">Categories</h2>
              </div>
              <div className="p-6">
                <div className="space-y-2">
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => handleFilter(category.id)}
                      className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                        selectedFilter === category.id
                          ? 'bg-blue-50 text-blue-600'
                          : 'hover:bg-gray-50'
                      }`}
                    >
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        selectedFilter === category.id
                          ? 'bg-blue-100 text-blue-600'
                          : 'bg-gray-100 text-gray-600'
                      }`}>
                        {category.icon}
                      </div>
                      <span className="font-medium">{category.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Portfolio Summary */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-100">
                <h2 className="text-xl font-semibold text-gray-900">Portfolio Summary</h2>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Total Value</span>
                    <span className="font-medium text-gray-900">₹{(portfolioValue || 0).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Total Investments</span>
                    <span className="font-medium text-gray-900">
                      ₹{(investments?.reduce((total, inv) => total + (inv?.amount || 0), 0) || 0).toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Total Returns</span>
                    <span className="font-medium text-green-600">
                      ₹{((portfolioValue || 0) - (investments?.reduce((total, inv) => total + (inv?.amount || 0), 0) || 0)).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Watchlist */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-100">
                <h2 className="text-xl font-semibold text-gray-900">Watchlist</h2>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {watchlist?.map(fundId => {
                    const fund = funds?.find(f => f?.id === fundId);
                    if (!fund) return null;
                    return (
                      <div key={fundId} className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-gray-900">{fund.name}</p>
                          <p className="text-sm text-gray-500">NAV: ₹{(fund.nav || 0).toFixed(2)}</p>
                        </div>
                        <div className="text-right">
                          <p className={`text-sm ${(fund.change || 0) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {(fund.change || 0) >= 0 ? '+' : ''}{fund.change || 0}%
                          </p>
                        </div>
                      </div>
                    );
                  })}
                  {(!watchlist || watchlist.length === 0) && (
                    <p className="text-gray-500 text-center py-4">No funds in watchlist</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Modals */}
        {renderFundDetails()}
        {renderInvestmentModal()}
        {renderComparisonModal()}
        {renderSIPCalculator()}
      </main>
    </div>
  );
};

export default MutualFunds;