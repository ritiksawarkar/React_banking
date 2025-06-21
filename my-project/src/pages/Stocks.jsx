import React, { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';
import axios from 'axios';
import {
  FaHeart, FaRegHeart, FaSearch, FaChartLine,
  FaMoneyBillWave, FaNewspaper, FaInfoCircle,
  FaArrowUp, FaArrowDown, FaTimes, FaStar,
  FaRegStar, FaChartBar, FaChartArea, FaChartPie,
  FaClock, FaGlobe, FaExchangeAlt, FaHistory,
  FaCheckCircle, FaExclamationCircle,
  FaFilter, FaSort, FaBell, FaBookmark,
  FaCalendarAlt, FaPlus, FaMinus
} from 'react-icons/fa';
import { debounce } from 'lodash';

// API Keys
const ALPHA_VANTAGE_API_KEY = 'PJPBZEYY0OKFRJCG';
const FINNHUB_API_KEY = 'd1a5mj9r01qltimvc2j0d1a5mj9r01qltimvc2jg';

// Sample stocks data
const SAMPLE_STOCKS = [
  {
    symbol: 'AAPL',
    name: 'Apple Inc.',
    price: 175.50,
    change: 2.5,
    changePercent: 1.45,
    dayHigh: 178.90,
    dayLow: 172.30,
    yearHigh: 198.60,
    yearLow: 142.10,
    marketCap: '2.8T',
    peRatio: 24.3,
    eps: 35,
    dividendYield: 1.2,
    volume: '45.2M',
    sector: 'Technology',
    logo: 'https://logo.clearbit.com/apple.com',
    technicalIndicators: {
      rsi: 58.5,
      macd: 2.3,
      sma20: 173.2,
      sma50: 170.5,
      sma200: 165.8
    },
    historical: {
      'Time Series (Daily)': {
        '2024-03-20': {
          '1. open': '175.00',
          '2. high': '176.50',
          '3. low': '174.50',
          '4. close': '175.50',
          '5. volume': '45200000'
        },
        '2024-03-19': {
          '1. open': '174.00',
          '2. high': '175.00',
          '3. low': '173.50',
          '4. close': '174.50',
          '5. volume': '43800000'
        },
        '2024-03-18': {
          '1. open': '173.00',
          '2. high': '174.50',
          '3. low': '172.50',
          '4. close': '173.00',
          '5. volume': '42500000'
        }
      }
    }
  },
  {
    symbol: 'MSFT',
    name: 'Microsoft Corporation',
    price: 415.32,
    change: -1.2,
    changePercent: -0.29,
    dayHigh: 418.50,
    dayLow: 412.80,
    yearHigh: 420.00,
    yearLow: 350.20,
    marketCap: '3.1T',
    peRatio: 35.2,
    eps: 11.80,
    dividendYield: 0.65,
    volume: '28.5M',
    sector: 'Technology',
    logo: 'https://logo.clearbit.com/microsoft.com',
    historical: {
      'Time Series (Daily)': {
        '2024-03-20': {
          '1. open': '415.00',
          '2. high': '416.50',
          '3. low': '414.50',
          '4. close': '415.32',
          '5. volume': '28500000'
        },
        '2024-03-19': {
          '1. open': '414.00',
          '2. high': '415.00',
          '3. low': '413.50',
          '4. close': '414.50',
          '5. volume': '27800000'
        },
        '2024-03-18': {
          '1. open': '413.00',
          '2. high': '414.50',
          '3. low': '412.50',
          '4. close': '413.00',
          '5. volume': '26500000'
        }
      }
    }
  },
  {
    symbol: 'GOOGL',
    name: 'Alphabet Inc.',
    price: 142.65,
    change: 1.8,
    changePercent: 1.28,
    dayHigh: 143.20,
    dayLow: 141.10,
    yearHigh: 152.10,
    yearLow: 120.50,
    marketCap: '1.8T',
    peRatio: 28.5,
    eps: 5.00,
    dividendYield: 0.0,
    volume: '22.3M',
    sector: 'Technology',
    logo: 'https://logo.clearbit.com/google.com',
    historical: {
      'Time Series (Daily)': {
        '2024-03-20': {
          '1. open': '142.00',
          '2. high': '143.20',
          '3. low': '141.10',
          '4. close': '142.65',
          '5. volume': '22300000'
        },
        '2024-03-19': {
          '1. open': '141.00',
          '2. high': '142.00',
          '3. low': '140.50',
          '4. close': '141.50',
          '5. volume': '21800000'
        },
        '2024-03-18': {
          '1. open': '140.00',
          '2. high': '141.50',
          '3. low': '139.50',
          '4. close': '140.00',
          '5. volume': '21500000'
        }
      }
    }
  },
  {
    symbol: 'AMZN',
    name: 'Amazon.com Inc.',
    price: 178.75,
    change: 3.2,
    changePercent: 1.82,
    dayHigh: 179.50,
    dayLow: 176.80,
    yearHigh: 180.00,
    yearLow: 145.20,
    marketCap: '1.9T',
    peRatio: 60.5,
    eps: 2.95,
    dividendYield: 0.0,
    volume: '35.8M',
    sector: 'Consumer Cyclical',
    logo: 'https://logo.clearbit.com/amazon.com',
    historical: {
      'Time Series (Daily)': {
        '2024-03-20': {
          '1. open': '178.00',
          '2. high': '179.50',
          '3. low': '176.80',
          '4. close': '178.75',
          '5. volume': '35800000'
        },
        '2024-03-19': {
          '1. open': '177.00',
          '2. high': '178.00',
          '3. low': '176.50',
          '4. close': '177.50',
          '5. volume': '34800000'
        },
        '2024-03-18': {
          '1. open': '176.00',
          '2. high': '177.50',
          '3. low': '175.50',
          '4. close': '176.00',
          '5. volume': '33500000'
        }
      }
    }
  },
  {
    symbol: 'META',
    name: 'Meta Platforms Inc.',
    price: 485.58,
    change: -2.5,
    changePercent: -0.51,
    dayHigh: 488.00,
    dayLow: 483.50,
    yearHigh: 490.00,
    yearLow: 350.20,
    marketCap: '1.2T',
    peRatio: 32.5,
    eps: 14.95,
    dividendYield: 0.0,
    volume: '18.5M',
    sector: 'Technology',
    logo: 'https://logo.clearbit.com/meta.com',
    historical: {
      'Time Series (Daily)': {
        '2024-03-20': {
          '1. open': '485.00',
          '2. high': '488.00',
          '3. low': '483.50',
          '4. close': '485.58',
          '5. volume': '18500000'
        },
        '2024-03-19': {
          '1. open': '484.00',
          '2. high': '485.00',
          '3. low': '483.00',
          '4. close': '484.50',
          '5. volume': '18200000'
        },
        '2024-03-18': {
          '1. open': '483.00',
          '2. high': '484.50',
          '3. low': '482.00',
          '4. close': '483.00',
          '5. volume': '18000000'
        }
      }
    }
  },
  {
    symbol: 'TSLA',
    name: 'Tesla Inc.',
    price: 175.34,
    change: -5.2,
    changePercent: -2.88,
    dayHigh: 178.90,
    dayLow: 174.50,
    yearHigh: 250.00,
    yearLow: 150.20,
    marketCap: '550B',
    peRatio: 45.2,
    eps: 3.88,
    dividendYield: 0.0,
    volume: '95.2M',
    sector: 'Automotive',
    logo: 'https://logo.clearbit.com/tesla.com',
    historical: {
      'Time Series (Daily)': {
        '2024-03-20': {
          '1. open': '175.00',
          '2. high': '178.90',
          '3. low': '174.50',
          '4. close': '175.34',
          '5. volume': '95200000'
        },
        '2024-03-19': {
          '1. open': '176.00',
          '2. high': '177.00',
          '3. low': '175.50',
          '4. close': '176.50',
          '5. volume': '88200000'
        },
        '2024-03-18': {
          '1. open': '177.00',
          '2. high': '178.50',
          '3. low': '176.50',
          '4. close': '177.00',
          '5. volume': '85200000'
        }
      }
    }
  }
];

const Stocks = () => {
  const [stocks, setStocks] = useState([]);
  const [watchlist, setWatchlist] = useState(() => {
    const saved = localStorage.getItem('stockWatchlist');
    return saved ? JSON.parse(saved) : [];
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedStock, setSelectedStock] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [timeRange, setTimeRange] = useState('1D');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [marketStatus, setMarketStatus] = useState({
    isOpen: false,
    nextOpen: null,
    nextClose: null
  });
  const [orders, setOrders] = useState(() => {
    const saved = localStorage.getItem('stockOrders');
    return saved ? JSON.parse(saved) : [];
  });
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [orderType, setOrderType] = useState('buy');
  const [orderQuantity, setOrderQuantity] = useState(1);
  const [orderPrice, setOrderPrice] = useState(0);
  const [orderTotal, setOrderTotal] = useState(0);
  const [orderStatus, setOrderStatus] = useState(null);
  const [showTransactionHistory, setShowTransactionHistory] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [searchFilters, setSearchFilters] = useState({
    minPrice: '',
    maxPrice: '',
    sector: '',
    marketCap: ''
  });
  const [earningsCalendar, setEarningsCalendar] = useState([]);
  const [showEarningsModal, setShowEarningsModal] = useState(false);
  const [portfolioValue, setPortfolioValue] = useState({
    totalValue: 0,
    dailyChange: 0,
    dailyChangePercent: 0,
    costBasis: 0,
    sectors: {}
  });
  const [marketIndices, setMarketIndices] = useState([]);
  const [sectorPerformance, setSectorPerformance] = useState([]);

  // Calculate portfolio value and sector distribution
  const calculatePortfolioValue = () => {
    const holdings = {};
    let totalValue = 0;
    let costBasis = 0;
    let previousValue = 0;
    const sectors = {};

    orders.forEach(order => {
      if (!holdings[order.symbol]) {
        holdings[order.symbol] = {
          quantity: 0,
          totalCost: 0,
          currentValue: 0
        };
      }

      if (order.type === 'buy') {
        holdings[order.symbol].quantity += order.quantity;
        holdings[order.symbol].totalCost += order.total;
      } else {
        holdings[order.symbol].quantity -= order.quantity;
        holdings[order.symbol].totalCost -= order.total;
      }
    });

    Object.entries(holdings).forEach(([symbol, holding]) => {
      const stock = stocks.find(s => s.symbol === symbol);
      if (stock) {
        holding.currentValue = holding.quantity * stock.price;
        totalValue += holding.currentValue;
        costBasis += holding.totalCost;
        previousValue += holding.quantity * (stock.price - stock.change);

        // Track sector distribution
        if (stock.sector) {
          sectors[stock.sector] = (sectors[stock.sector] || 0) + holding.currentValue;
        }
      }
    });

    const dailyChange = totalValue - previousValue;
    const dailyChangePercent = (dailyChange / previousValue) * 100;

    setPortfolioValue({
      totalValue,
      dailyChange,
      dailyChangePercent,
      costBasis,
      sectors
    });
  };

  // Fetch earnings calendar
  const fetchEarningsCalendar = async () => {
    try {
      const symbols = [...new Set([...watchlist, ...orders.map(o => o.symbol)])];
      const earnings = await Promise.all(
        symbols.map(async (symbol) => {
          try {
            const response = await axios.get(
              `https://www.alphavantage.co/query?function=EARNINGS_CALENDAR&symbol=${symbol}&horizon=3month&apikey=${ALPHA_VANTAGE_API_KEY}`
            );
            return {
              symbol,
              ...response.data
            };
          } catch (error) {
            console.error(`Error fetching earnings for ${symbol}:`, error);
            return null;
          }
        })
      );
      setEarningsCalendar(earnings.filter(e => e !== null));
    } catch (error) {
      console.error('Error fetching earnings calendar:', error);
    }
  };

  // Handle order quantity change
  const handleQuantityChange = (e) => {
    const quantity = parseInt(e.target.value) || 0;
    setOrderQuantity(quantity);
    setOrderTotal(quantity * orderPrice);
  };

  // Handle order price change
  const handlePriceChange = (e) => {
    const price = parseFloat(e.target.value) || 0;
    setOrderPrice(price);
    setOrderTotal(orderQuantity * price);
  };

  // Place order
  const placeOrder = () => {
    if (orderQuantity <= 0 || orderPrice <= 0) {
      setOrderStatus({ type: 'error', message: 'Invalid order quantity or price' });
      return;
    }

    const holdings = calculateHoldings(selectedStock.symbol);
    if (orderType === 'sell' && holdings < orderQuantity) {
      setOrderStatus({ type: 'error', message: 'Insufficient holdings for sell order' });
      return;
    }

    const newOrder = {
      id: Date.now(),
      symbol: selectedStock.symbol,
      type: orderType,
      quantity: orderQuantity,
      price: orderPrice,
      total: orderTotal,
      timestamp: new Date().toISOString(),
      status: 'completed'
    };

    const updatedOrders = [...orders, newOrder];
    setOrders(updatedOrders);
    localStorage.setItem('stockOrders', JSON.stringify(updatedOrders));

    setOrderStatus({ type: 'success', message: `${orderType === 'buy' ? 'Buy' : 'Sell'} order placed successfully` });
    setTimeout(() => {
      setShowOrderModal(false);
      setOrderStatus(null);
      setOrderQuantity(1);
      setOrderPrice(selectedStock.price);
      setOrderTotal(selectedStock.price);
    }, 2000);
  };

  // Open order modal
  const handleOrderClick = (type, stock) => {
    setOrderType(type);
    setSelectedStock(stock);
    setOrderPrice(stock.price);
    setOrderTotal(stock.price);
    setOrderQuantity(1);
    setShowOrderModal(true);
  };

  // Fetch stock data from Alpha Vantage API
  const fetchStockData = async (symbol) => {
    try {
      const response = await axios.get(
        `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${ALPHA_VANTAGE_API_KEY}`
      );
      if (response.data['Error Message']) {
        throw new Error(response.data['Error Message']);
      }
      return response.data;
    } catch (error) {
      console.error('Error fetching stock data:', error);
      return null;
    }
  };

  // Fetch company overview from Alpha Vantage API
  const fetchCompanyOverview = async (symbol) => {
    try {
      const response = await axios.get(
        `https://www.alphavantage.co/query?function=OVERVIEW&symbol=${symbol}&apikey=${ALPHA_VANTAGE_API_KEY}`
      );
      if (response.data['Error Message']) {
        throw new Error(response.data['Error Message']);
      }
      return response.data;
    } catch (error) {
      console.error('Error fetching company overview:', error);
      return null;
    }
  };

  // Fetch historical data from Alpha Vantage API
  const fetchHistoricalData = async (symbol) => {
    try {
      const response = await axios.get(
        `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&outputsize=compact&apikey=${ALPHA_VANTAGE_API_KEY}`
      );
      if (response.data['Error Message']) {
        throw new Error(response.data['Error Message']);
      }
      return response.data;
    } catch (error) {
      console.error('Error fetching historical data:', error);
      return null;
    }
  };

  // Check market status
  useEffect(() => {
    const checkMarketStatus = () => {
      const now = new Date();
      const day = now.getDay();
      const hour = now.getHours();
      const minute = now.getMinutes();

      // Market hours: 9:30 AM - 4:00 PM ET, Monday-Friday
      const isWeekday = day >= 1 && day <= 5;
      const isMarketHours = (hour > 9 || (hour === 9 && minute >= 30)) && hour < 16;

      setMarketStatus({
        isOpen: isWeekday && isMarketHours,
        nextOpen: !isWeekday ? 'Next Monday 9:30 AM ET' : !isMarketHours ? 'Tomorrow 9:30 AM ET' : null,
        nextClose: isMarketHours ? 'Today 4:00 PM ET' : null
      });
    };

    checkMarketStatus();
    const interval = setInterval(checkMarketStatus, 60000); // Check every minute
    return () => clearInterval(interval);
  }, []);

  // Initialize stocks data
  useEffect(() => {
    const initializeStocks = async () => {
      try {
        setLoading(true);
        setError(null);

        // Set initial sample data
        setStocks(SAMPLE_STOCKS);

        // Try to fetch real data
        const stockData = await Promise.all(
          SAMPLE_STOCKS.map(async (stock) => {
            try {
              const [quoteData, overviewData, historicalData] = await Promise.all([
                fetchStockData(stock.symbol),
                fetchCompanyOverview(stock.symbol),
                fetchHistoricalData(stock.symbol)
              ]);

              return {
                ...stock,
                quote: quoteData || stock.quote,
                overview: overviewData || stock.overview,
                historical: historicalData || stock.historical
              };
            } catch (err) {
              console.error(`Error fetching data for ${stock.symbol}:`, err);
              return stock;
            }
          })
        );

        setStocks(stockData);
      } catch (err) {
        setError('Failed to initialize stocks data. Please try again later.');
        console.error('Error initializing stocks:', err);
      } finally {
        setLoading(false);
      }
    };

    initializeStocks();
  }, []);

  // Initialize market data
  useEffect(() => {
    fetchMarketIndices();
    const interval = setInterval(fetchMarketIndices, 60000); // Update every minute
    return () => clearInterval(interval);
  }, []);

  // Debounced search function
  const debouncedSearch = debounce(async (query) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    setIsSearching(true);
    try {
      const response = await axios.get(
        `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${query}&apikey=${ALPHA_VANTAGE_API_KEY}`
      );

      if (response.data['Error Message']) {
        throw new Error(response.data['Error Message']);
      }

      if (response.data.bestMatches) {
        const results = await Promise.all(
          response.data.bestMatches.slice(0, 10).map(async (match) => {
            try {
              const quoteData = await fetchStockData(match['1. symbol']);
              if (!quoteData) return null;

              const stockData = {
                symbol: match['1. symbol'],
                name: match['2. name'],
                type: match['3. type'],
                region: match['4. region'],
                currency: match['8. currency'],
                price: quoteData ? parseFloat(quoteData['05. price']) || 0 : 0,
                change: quoteData ? parseFloat(quoteData['09. change']) || 0 : 0,
                changePercent: quoteData ? parseFloat(quoteData['10. change percent'].replace('%', '')) || 0 : 0,
                volume: quoteData ? quoteData['06. volume'] : '0',
                logo: `https://logo.clearbit.com/${match['1. symbol'].toLowerCase()}.com`
              };

              // Apply filters
              if (searchFilters.minPrice && stockData.price < parseFloat(searchFilters.minPrice)) return null;
              if (searchFilters.maxPrice && stockData.price > parseFloat(searchFilters.maxPrice)) return null;
              if (searchFilters.sector && !stockData.name.toLowerCase().includes(searchFilters.sector.toLowerCase())) return null;

              return stockData;
            } catch (err) {
              console.error(`Error fetching quote for ${match['1. symbol']}:`, err);
              return null;
            }
          })
        );
        setSearchResults(results.filter(result => result !== null));
      }
    } catch (error) {
      console.error('Error searching stocks:', error);
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  }, 500);

  // Handle search input change
  const handleSearchInput = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    debouncedSearch(query);
  };

  // Handle filter changes
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setSearchFilters(prev => ({
      ...prev,
      [name]: value
    }));
    if (searchQuery) {
      debouncedSearch(searchQuery);
    }
  };

  const handleAddToWatchlist = (symbol) => {
    const newWatchlist = watchlist.includes(symbol)
      ? watchlist.filter(s => s !== symbol)
      : [...watchlist, symbol];
    setWatchlist(newWatchlist);
    localStorage.setItem('stockWatchlist', JSON.stringify(newWatchlist));
  };

  // Update the processCandlestickData function to handle missing data gracefully
  const processCandlestickData = (historicalData) => {
    try {
      if (!historicalData || !historicalData['Time Series (Daily)']) {
        // Generate sample data if no historical data is available
        const today = new Date();
        const sampleData = {};
        for (let i = 0; i < 30; i++) {
          const date = new Date(today);
          date.setDate(date.getDate() - i);
          const dateStr = date.toISOString().split('T')[0];
          const basePrice = 100 + Math.random() * 50;
          sampleData[dateStr] = {
            '1. open': (basePrice + Math.random() * 5).toFixed(2),
            '2. high': (basePrice + Math.random() * 10).toFixed(2),
            '3. low': (basePrice - Math.random() * 10).toFixed(2),
            '4. close': (basePrice + Math.random() * 5).toFixed(2),
            '5. volume': Math.floor(Math.random() * 1000000).toString()
          };
        }
        historicalData = { 'Time Series (Daily)': sampleData };
      }

      const timeSeriesData = historicalData['Time Series (Daily)'];
      return Object.entries(timeSeriesData)
        .slice(0, 30)
        .map(([date, data]) => {
          const open = parseFloat(data['1. open']);
          const high = parseFloat(data['2. high']);
          const low = parseFloat(data['3. low']);
          const close = parseFloat(data['4. close']);

          if (isNaN(open) || isNaN(high) || isNaN(low) || isNaN(close)) {
            return null;
          }

          return {
            x: new Date(date).getTime(),
            y: [open, high, low, close]
          };
        })
        .filter(item => item !== null)
        .reverse();
    } catch (error) {
      console.error('Error processing candlestick data:', error);
      return [];
    }
  };

  // Update the getChartOptions function with better visibility settings
  const getChartOptions = () => ({
    chart: {
      type: 'candlestick',
      height: 350,
      toolbar: {
        show: true,
        tools: {
          download: true,
          selection: true,
          zoom: true,
          zoomin: true,
          zoomout: true,
          pan: true,
          reset: true
        }
      },
      animations: {
        enabled: true,
        easing: 'easeinout',
        speed: 800,
        animateGradually: {
          enabled: true,
          delay: 150
        },
        dynamicAnimation: {
          enabled: true,
          speed: 350
        }
      },
      background: '#ffffff',
      foreColor: '#333'
    },
    plotOptions: {
      candlestick: {
        colors: {
          upward: '#10B981',
          downward: '#EF4444'
        },
        wick: {
          useFillColor: true
        }
      }
    },
    xaxis: {
      type: 'datetime',
      labels: {
        style: {
          colors: '#666',
          fontSize: '12px'
        },
        datetimeFormatter: {
          year: 'yyyy',
          month: "MMM 'yy",
          day: 'dd MMM',
          hour: 'HH:mm'
        }
      },
      axisBorder: {
        show: true,
        color: '#E0E0E0'
      },
      axisTicks: {
        show: true,
        color: '#E0E0E0'
      }
    },
    yaxis: {
      tooltip: {
        enabled: true
      },
      labels: {
        style: {
          colors: '#666',
          fontSize: '12px'
        },
        formatter: (value) => `₹${value.toFixed(2)}`
      },
      axisBorder: {
        show: true,
        color: '#E0E0E0'
      },
      axisTicks: {
        show: true,
        color: '#E0E0E0'
      }
    },
    grid: {
      borderColor: '#E0E0E0',
      strokeDashArray: 4,
      position: 'back',
      xaxis: {
        lines: {
          show: true
        }
      },
      yaxis: {
        lines: {
          show: true
        }
      }
    },
    tooltip: {
      theme: 'light',
      x: {
        format: 'dd MMM yyyy'
      },
      y: {
        formatter: (value) => `₹${value.toFixed(2)}`
      }
    },
    states: {
      hover: {
        filter: {
          type: 'lighten',
          value: 0.04
        }
      },
      active: {
        filter: {
          type: 'darken',
          value: 0.88
        }
      }
    }
  });

  // Calculate portfolio analytics
  const calculatePortfolioAnalytics = () => {
    const holdings = {};
    let totalValue = 0;
    let previousValue = 0;

    orders.forEach(order => {
      if (!holdings[order.symbol]) {
        holdings[order.symbol] = {
          quantity: 0,
          totalCost: 0,
          currentValue: 0
        };
      }

      if (order.type === 'buy') {
        holdings[order.symbol].quantity += order.quantity;
        holdings[order.symbol].totalCost += order.total;
      } else {
        holdings[order.symbol].quantity -= order.quantity;
        holdings[order.symbol].totalCost -= order.total;
      }
    });

    Object.entries(holdings).forEach(([symbol, holding]) => {
      const stock = stocks.find(s => s.symbol === symbol);
      if (stock) {
        holding.currentValue = holding.quantity * stock.price;
        totalValue += holding.currentValue;
        previousValue += holding.quantity * (stock.price - stock.change);
      }
    });

    const dailyChange = totalValue - previousValue;
    const dailyChangePercent = (dailyChange / previousValue) * 100;

    const performers = Object.entries(holdings)
      .map(([symbol, holding]) => {
        const stock = stocks.find(s => s.symbol === symbol);
        return {
          symbol,
          name: stock?.name,
          change: stock?.change,
          changePercent: stock?.changePercent,
          value: holding.currentValue
        };
      })
      .sort((a, b) => b.changePercent - a.changePercent);

    setPortfolioAnalytics({
      totalValue,
      dailyChange,
      dailyChangePercent,
      topPerformers: performers.slice(0, 3),
      worstPerformers: performers.slice(-3).reverse()
    });
  };

  // Add price alert
  const addPriceAlert = (symbol, price, condition) => {
    const newAlert = {
      id: Date.now(),
      symbol,
      price,
      condition,
      triggered: false,
      createdAt: new Date().toISOString()
    };
    setAlerts(prev => [...prev, newAlert]);
  };

  // Check price alerts
  const checkPriceAlerts = () => {
    alerts.forEach(alert => {
      const stock = stocks.find(s => s.symbol === alert.symbol);
      if (stock) {
        const triggered = alert.condition === 'above'
          ? stock.price >= alert.price
          : stock.price <= alert.price;

        if (triggered && !alert.triggered) {
          // Show notification
          new Notification(`Price Alert: ${alert.symbol}`, {
            body: `${alert.symbol} is now ${alert.condition} ${alert.price}`
          });

          // Update alert status
          setAlerts(prev => prev.map(a =>
            a.id === alert.id ? { ...a, triggered: true } : a
          ));
        }
      }
    });
  };

  // Initialize data
  useEffect(() => {
    const initializeData = async () => {
      try {
        setLoading(true);
        await Promise.all([
          calculatePortfolioValue(),
          fetchEarningsCalendar()
        ]);
      } catch (error) {
        console.error('Error initializing data:', error);
      } finally {
        setLoading(false);
      }
    };

    initializeData();
    const interval = setInterval(() => {
      calculatePortfolioValue();
    }, 60000);

    return () => clearInterval(interval);
  }, [orders, stocks]);

  // Calculate holdings for a specific stock
  const calculateHoldings = (symbol) => {
    return orders.reduce((total, order) => {
      if (order.symbol !== symbol) return total;
      return order.type === 'buy' ? total + order.quantity : total - order.quantity;
    }, 0);
  };

  // Add to Google Calendar
  const addToGoogleCalendar = (earnings) => {
    const event = {
      summary: `${earnings.symbol} Earnings Call`,
      description: `${earnings.symbol} is scheduled to report earnings on ${earnings.date}`,
      start: {
        dateTime: new Date(earnings.date).toISOString(),
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone
      },
      end: {
        dateTime: new Date(new Date(earnings.date).getTime() + 60 * 60 * 1000).toISOString(),
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone
      }
    };

    const calendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(event.summary)}&dates=${event.start.dateTime}/${event.end.dateTime}&details=${encodeURIComponent(event.description)}`;
    window.open(calendarUrl, '_blank');
  };

  // Fetch market indices
  const fetchMarketIndices = async () => {
    try {
      const indices = ['^GSPC', '^DJI', '^IXIC', '^RUT'];
      const results = await Promise.all(
        indices.map(async (index) => {
          try {
            const response = await axios.get(
              `https://finnhub.io/api/v1/quote?symbol=${index}&token=${FINNHUB_API_KEY}`
            );
            if (response.data && response.data.c) {
              return {
                name: index,
                value: response.data.c.toFixed(2),
                change: ((response.data.c - response.data.pc) / response.data.pc * 100).toFixed(2),
                trend: response.data.c > response.data.pc ? 'up' : 'down'
              };
            }
            return null;
          } catch (err) {
            console.error(`Error fetching index ${index}:`, err);
            return null;
          }
        })
      );

      const validResults = results.filter(result => result !== null);
      setMarketIndices(validResults);

      // Update sector performance
      const sectors = ['Technology', 'Healthcare', 'Financial', 'Consumer', 'Energy'];
      const sectorData = sectors.map(sector => ({
        name: sector,
        change: (Math.random() * 10 - 5).toFixed(2),
        trend: Math.random() > 0.5 ? 'up' : 'down'
      }));
      setSectorPerformance(sectorData);
    } catch (error) {
      console.error('Error fetching market indices:', error);
    }
  };

  const renderStockCard = (stock) => (
    <div key={stock.symbol} className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100">
      <div className="flex justify-between items-start">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 rounded-lg bg-gray-50 flex items-center justify-center">
            <img src={stock.logo} alt={stock.name} className="w-10 h-10 object-contain" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">{stock.symbol}</h2>
            <p className="text-sm text-gray-500">{stock.name}</p>
          </div>
        </div>
        <button
          onClick={() => handleAddToWatchlist(stock.symbol)}
          className="text-gray-400 hover:text-red-500 transition-colors p-2 rounded-full hover:bg-red-50"
        >
          {watchlist.includes(stock.symbol) ? <FaHeart className="w-5 h-5" /> : <FaRegHeart className="w-5 h-5" />}
        </button>
      </div>

      <div className="mt-4">
        <div className="flex justify-between items-end">
          <div>
            <p className="text-2xl font-bold text-gray-900">₹{stock.price.toFixed(2)}</p>
            <div className={`flex items-center text-sm ${stock.change >= 0 ? 'text-green-500' : 'text-red-500'
              }`}>
              {stock.change >= 0 ? <FaArrowUp className="w-3 h-3 mr-1" /> : <FaArrowDown className="w-3 h-3 mr-1" />}
              <span>{Math.abs(stock.change)} ({Math.abs(stock.changePercent).toFixed(2)}%)</span>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-500">Day Range</p>
            <p className="text-sm font-medium text-gray-900">₹{stock.dayLow} - ₹{stock.dayHigh}</p>
          </div>
        </div>

        <div className="mt-4 h-32 bg-white p-2 rounded-lg border border-gray-200">
          {stock.historical && stock.historical['Time Series (Daily)'] ? (
            <ReactApexChart
              options={{
                chart: {
                  type: 'candlestick',
                  height: 120,
                  toolbar: { show: false },
                  animations: {
                    enabled: true,
                    easing: 'easeinout',
                    speed: 800,
                    animateGradually: {
                      enabled: true,
                      delay: 150
                    },
                    dynamicAnimation: {
                      enabled: true,
                      speed: 350
                    }
                  }
                },
                plotOptions: {
                  candlestick: {
                    colors: {
                      upward: '#10B981',
                      downward: '#EF4444'
                    },
                    wick: {
                      useFillColor: true
                    }
                  }
                },
                grid: { show: false },
                xaxis: {
                  labels: { show: false },
                  type: 'datetime'
                },
                yaxis: {
                  labels: { show: false },
                  tooltip: { enabled: true }
                },
                tooltip: {
                  enabled: true,
                  theme: 'light',
                  x: {
                    format: 'dd MMM yyyy'
                  },
                  y: {
                    formatter: (value) => `₹${value.toFixed(2)}`
                  }
                }
              }}
              series={[{
                name: 'Price',
                data: Object.entries(stock.historical['Time Series (Daily)'])
                  .slice(0, 30)
                  .map(([date, data]) => ({
                    x: new Date(date).getTime(),
                    y: [
                      parseFloat(data['1. open']),
                      parseFloat(data['2. high']),
                      parseFloat(data['3. low']),
                      parseFloat(data['4. close'])
                    ]
                  }))
                  .reverse()
              }]}
              type="candlestick"
              height="100%"
              width="100%"
            />
          ) : (
            <div className="h-full flex items-center justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
            </div>
          )}
        </div>

        <div className="mt-4 grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-500">Market Cap</p>
            <p className="font-medium text-gray-900">{stock.marketCap}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Volume</p>
            <p className="font-medium text-gray-900">{stock.volume}</p>
          </div>
        </div>

        <div className="mt-4 flex gap-2">
          <button
            onClick={() => handleOrderClick('buy', stock)}
            className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
          >
            Buy
          </button>
          <button
            onClick={() => handleOrderClick('sell', stock)}
            className="flex-1 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors font-medium"
          >
            Sell
          </button>
        </div>

        {calculateHoldings(stock.symbol) > 0 && (
          <div className="mt-4 p-3 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600">
              Your Holdings: {calculateHoldings(stock.symbol)} shares
            </p>
          </div>
        )}
      </div>
    </div>
  );

  const renderStockDetail = () => {
    if (!selectedStock) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-lg bg-gray-50 flex items-center justify-center">
                <img src={selectedStock.logo} alt={selectedStock.name} className="w-10 h-10 object-contain" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">{selectedStock.symbol}</h2>
                <p className="text-sm text-gray-500">{selectedStock.name}</p>
              </div>
            </div>
            <button
              onClick={() => setSelectedStock(null)}
              className="text-gray-400 hover:text-gray-500 p-2 rounded-full hover:bg-gray-100"
            >
              <FaTimes className="w-6 h-6" />
            </button>
          </div>

          {/* Tabs */}
          <div className="flex space-x-4 border-b border-gray-200 mb-6">
            {['overview', 'chart', 'financials', 'news', 'about'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 text-sm font-medium ${activeTab === tab
                    ? 'text-purple-600 border-b-2 border-purple-600'
                    : 'text-gray-500 hover:text-gray-700'
                  }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="space-y-6">
            {activeTab === 'overview' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="p-4 bg-gray-50 rounded-lg border border-gray-100">
                    <h4 className="text-sm font-medium text-gray-900 mb-2">Price Information</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500">LTP</span>
                        <span className="font-medium text-gray-900">₹{selectedStock.price.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500">Day High/Low</span>
                        <span className="font-medium text-gray-900">₹{selectedStock.dayLow} / ₹{selectedStock.dayHigh}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500">52W High/Low</span>
                        <span className="font-medium text-gray-900">₹{selectedStock.yearHigh} / ₹{selectedStock.yearLow}</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-gray-50 rounded-lg border border-gray-100">
                    <h4 className="text-sm font-medium text-gray-900 mb-2">Key Metrics</h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-500">Market Cap</p>
                        <p className="font-medium text-gray-900">{selectedStock.marketCap}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">P/E Ratio</p>
                        <p className="font-medium text-gray-900">{selectedStock.peRatio}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">EPS</p>
                        <p className="font-medium text-gray-900">₹{selectedStock.eps}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Dividend Yield</p>
                        <p className="font-medium text-gray-900">{selectedStock.dividendYield}%</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="p-4 bg-gray-50 rounded-lg border border-gray-100">
                    <h4 className="text-sm font-medium text-gray-900 mb-2">Trading Volume</h4>
                    <div className="h-48">
                      <ReactApexChart
                        options={{
                          chart: {
                            type: 'bar',
                            toolbar: { show: false }
                          },
                          plotOptions: {
                            bar: {
                              borderRadius: 4,
                              horizontal: false
                            }
                          },
                          dataLabels: { enabled: false },
                          xaxis: {
                            categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri']
                          }
                        }}
                        series={[{
                          name: 'Volume',
                          data: [45, 38, 42, 35, 40]
                        }]}
                        type="bar"
                        height="100%"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'chart' && (
              <div className="space-y-4">
                <div className="flex space-x-2 mb-4">
                  {['1D', '1W', '1M', '1Y'].map((range) => (
                    <button
                      key={range}
                      onClick={() => setTimeRange(range)}
                      className={`px-4 py-2 rounded-lg ${timeRange === range
                          ? 'bg-purple-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                    >
                      {range}
                    </button>
                  ))}
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                  <div className="h-[400px] w-full">
                    <ReactApexChart
                      options={getChartOptions()}
                      series={[{
                        name: 'Price',
                        data: processCandlestickData(selectedStock.historical)
                      }]}
                      type="candlestick"
                      height="100%"
                      width="100%"
                    />
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'financials' && (
              <div className="space-y-4">
                <div className="p-4 bg-gray-50 rounded-lg border border-gray-100">
                  <h4 className="text-sm font-medium text-gray-900 mb-4">Financial Highlights</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h5 className="text-sm font-medium text-gray-700 mb-2">Revenue Growth</h5>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-500">YoY Growth</span>
                          <span className="font-medium text-green-600">+15.2%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-500">Quarterly Growth</span>
                          <span className="font-medium text-green-600">+8.4%</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h5 className="text-sm font-medium text-gray-700 mb-2">Profitability</h5>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-500">Net Profit Margin</span>
                          <span className="font-medium text-gray-900">21.5%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-500">ROE</span>
                          <span className="font-medium text-gray-900">28.3%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'news' && (
              <div className="space-y-4">
                <div className="p-4 bg-gray-50 rounded-lg border border-gray-100">
                  <h4 className="text-sm font-medium text-gray-900 mb-4">Latest News</h4>
                  <div className="space-y-4">
                    <div className="border-b border-gray-200 pb-4">
                      <h5 className="font-medium text-gray-900">Company Announces Q4 Results</h5>
                      <p className="text-sm text-gray-500 mt-1">
                        Strong performance in the last quarter with increased revenue...
                      </p>
                      <p className="text-xs text-gray-400 mt-2">2 hours ago</p>
                    </div>
                    <div className="border-b border-gray-200 pb-4">
                      <h5 className="font-medium text-gray-900">New Product Launch</h5>
                      <p className="text-sm text-gray-500 mt-1">
                        Company unveils innovative new product line...
                      </p>
                      <p className="text-xs text-gray-400 mt-2">5 hours ago</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'about' && (
              <div className="space-y-4">
                <div className="p-4 bg-gray-50 rounded-lg border border-gray-100">
                  <h4 className="text-sm font-medium text-gray-900 mb-4">Company Overview</h4>
                  <p className="text-sm text-gray-600">
                    {selectedStock.name} is a leading technology company that designs, manufactures, and markets smartphones,
                    personal computers, tablets, wearables, and accessories worldwide. The company also sells various related
                    services, including cloud services, digital content, and payment services.
                  </p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg border border-gray-100">
                  <h4 className="text-sm font-medium text-gray-900 mb-4">Key Information</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Sector</p>
                      <p className="font-medium text-gray-900">{selectedStock.sector}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Market Cap</p>
                      <p className="font-medium text-gray-900">{selectedStock.marketCap}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  // Render order modal
  const renderOrderModal = () => {
    if (!showOrderModal || !selectedStock) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl p-6 w-full max-w-md">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              {orderType === 'buy' ? 'Buy' : 'Sell'} {selectedStock.symbol}
            </h2>
            <button
              onClick={() => setShowOrderModal(false)}
              className="text-gray-400 hover:text-gray-500"
            >
              <FaTimes className="w-6 h-6" />
            </button>
          </div>

          {orderStatus && (
            <div className={`mb-4 p-4 rounded-lg ${orderStatus.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
              }`}>
              <div className="flex items-center">
                {orderStatus.type === 'success' ? (
                  <FaCheckCircle className="w-5 h-5 mr-2" />
                ) : (
                  <FaExclamationCircle className="w-5 h-5 mr-2" />
                )}
                <span>{orderStatus.message}</span>
              </div>
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Current Price
              </label>
              <div className="text-2xl font-bold text-gray-900">
                ₹{selectedStock.price.toFixed(2)}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Quantity
              </label>
              <input
                type="number"
                min="1"
                value={orderQuantity}
                onChange={handleQuantityChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Price per Share
              </label>
              <input
                type="number"
                min="0"
                step="0.01"
                value={orderPrice}
                onChange={handlePriceChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Total Amount
              </label>
              <div className="text-2xl font-bold text-gray-900">
                ₹{orderTotal.toFixed(2)}
              </div>
            </div>

            {orderType === 'sell' && (
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600">
                  Available Holdings: {calculateHoldings(selectedStock.symbol)} shares
                </p>
              </div>
            )}

            <button
              onClick={placeOrder}
              className={`w-full py-3 rounded-lg font-medium text-white ${orderType === 'buy' ? 'bg-green-600 hover:bg-green-700' : 'bg-red-600 hover:bg-red-700'
                }`}
            >
              {orderType === 'buy' ? 'Buy' : 'Sell'} {selectedStock.symbol}
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Render transaction history
  const renderTransactionHistory = () => {
    if (!showTransactionHistory) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Transaction History</h2>
            <button
              onClick={() => setShowTransactionHistory(false)}
              className="text-gray-400 hover:text-gray-500"
            >
              <FaTimes className="w-6 h-6" />
            </button>
          </div>

          <div className="space-y-4">
            {orders.length === 0 ? (
              <p className="text-gray-500 text-center py-8">No transactions yet</p>
            ) : (
              orders.map((order) => (
                <div
                  key={order.id}
                  className="p-4 bg-gray-50 rounded-lg border border-gray-100"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className={`font-medium ${order.type === 'buy' ? 'text-green-600' : 'text-red-600'
                          }`}>
                          {order.type.toUpperCase()}
                        </span>
                        <span className="font-bold">{order.symbol}</span>
                      </div>
                      <p className="text-sm text-gray-500">
                        {new Date(order.timestamp).toLocaleString()}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">
                        {order.quantity} shares @ ₹{order.price.toFixed(2)}
                      </p>
                      <p className="text-sm text-gray-500">
                        Total: ₹{order.total.toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    );
  };

  // Render search filters
  const renderSearchFilters = () => (
    <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Min Price
        </label>
        <input
          type="number"
          name="minPrice"
          value={searchFilters.minPrice}
          onChange={handleFilterChange}
          placeholder="Min Price"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Max Price
        </label>
        <input
          type="number"
          name="maxPrice"
          value={searchFilters.maxPrice}
          onChange={handleFilterChange}
          placeholder="Max Price"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Sector
        </label>
        <input
          type="text"
          name="sector"
          value={searchFilters.sector}
          onChange={handleFilterChange}
          placeholder="Sector"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Market Cap
        </label>
        <select
          name="marketCap"
          value={searchFilters.marketCap}
          onChange={handleFilterChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
        >
          <option value="">All</option>
          <option value="small">Small Cap</option>
          <option value="mid">Mid Cap</option>
          <option value="large">Large Cap</option>
        </select>
      </div>
    </div>
  );

  // Render search results
  const renderSearchResults = () => {
    if (!searchQuery) return null;

    return (
      <div className="absolute z-10 w-full mt-2 bg-white border border-gray-200 rounded-2xl shadow-lg overflow-hidden">
        {isSearching ? (
          <div className="p-4 text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto"></div>
            <p className="mt-2 text-gray-500">Searching...</p>
          </div>
        ) : searchResults.length > 0 ? (
          <div className="max-h-96 overflow-y-auto">
            {searchResults.map((stock) => (
              <div
                key={stock.symbol}
                className="p-4 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0"
                onClick={() => {
                  setSelectedStock(stock);
                  setActiveTab('overview');
                  setSearchResults([]);
                  setSearchQuery('');
                }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center">
                      <img src={stock.logo} alt={stock.name} className="w-8 h-8 object-contain" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{stock.symbol}</p>
                      <p className="text-sm text-gray-500">{stock.name}</p>
                      <p className="text-xs text-gray-400">{stock.type} • {stock.region}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-gray-900">₹{stock.price.toFixed(2)}</p>
                    <p className={`text-sm ${stock.change >= 0 ? 'text-green-600' : 'text-red-600'
                      }`}>
                      {stock.change >= 0 ? '+' : ''}{stock.change.toFixed(2)} ({stock.changePercent.toFixed(2)}%)
                    </p>
                    <p className="text-xs text-gray-500">Vol: {stock.volume}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-4 text-center text-gray-500">
            No results found
          </div>
        )}
      </div>
    );
  };

  // Render portfolio analytics
  const renderPortfolioAnalytics = () => (
    <div className="mb-8 grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Portfolio Overview</h3>
        <div className="space-y-4">
          <div>
            <p className="text-sm text-gray-500">Total Value</p>
            <p className="text-2xl font-bold text-gray-900">₹{portfolioValue.totalValue.toFixed(2)}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Daily Change</p>
            <p className={`text-xl font-semibold ${portfolioValue.dailyChange >= 0 ? 'text-green-600' : 'text-red-600'
              }`}>
              {portfolioValue.dailyChange >= 0 ? '+' : ''}
              ₹{portfolioValue.dailyChange.toFixed(2)} ({portfolioValue.dailyChangePercent.toFixed(2)}%)
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Cost Basis</p>
            <p className="text-lg font-medium text-gray-900">₹{portfolioValue.costBasis.toFixed(2)}</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Sector Distribution</h3>
        <div className="h-64">
          <ReactApexChart
            options={{
              chart: {
                type: 'pie',
                background: 'transparent'
              },
              labels: Object.keys(portfolioValue.sectors),
              colors: ['#10B981', '#3B82F6', '#F59E0B', '#EF4444', '#8B5CF6'],
              legend: {
                position: 'bottom'
              },
              dataLabels: {
                enabled: true,
                formatter: (val) => `${val.toFixed(1)}%`
              }
            }}
            series={Object.values(portfolioValue.sectors).map(value =>
              (value / portfolioValue.totalValue) * 100
            )}
            type="pie"
            height="100%"
          />
        </div>
      </div>
    </div>
  );

  // Render watchlist section
  const renderWatchlist = () => (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-900">Watchlist</h2>
        <button
          onClick={() => setShowEarningsModal(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
        >
          <FaCalendarAlt className="w-5 h-5" />
          <span>Earnings Calendar</span>
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {watchlist.map(symbol => {
          const stock = stocks.find(s => s.symbol === symbol);
          if (!stock) return null;
          return (
            <div key={symbol} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-lg bg-gray-50 flex items-center justify-center">
                    <img src={stock.logo} alt={stock.name} className="w-10 h-10 object-contain" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">{stock.symbol}</h3>
                    <p className="text-sm text-gray-500">{stock.name}</p>
                  </div>
                </div>
                <button
                  onClick={() => handleAddToWatchlist(symbol)}
                  className="text-red-500 hover:text-red-600"
                >
                  <FaMinus className="w-5 h-5" />
                </button>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-gray-500">Price</span>
                  <span className="font-medium text-gray-900">₹{stock.price.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-500">Change</span>
                  <span className={`font-medium ${stock.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {stock.change >= 0 ? '+' : ''}{stock.change.toFixed(2)} ({stock.changePercent.toFixed(2)}%)
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  // Render earnings calendar modal
  const renderEarningsCalendar = () => {
    if (!showEarningsModal) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Earnings Calendar</h2>
            <button
              onClick={() => setShowEarningsModal(false)}
              className="text-gray-400 hover:text-gray-500"
            >
              <FaTimes className="w-6 h-6" />
            </button>
          </div>

          <div className="space-y-4">
            {earningsCalendar.map((earnings, index) => (
              <div key={index} className="p-4 bg-gray-50 rounded-lg border border-gray-100">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-gray-900">{earnings.symbol}</h3>
                    <p className="text-sm text-gray-500">
                      {new Date(earnings.date).toLocaleDateString()}
                    </p>
                  </div>
                  <button
                    onClick={() => addToGoogleCalendar(earnings)}
                    className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <FaCalendarAlt className="w-5 h-5" />
                    <span>Add to Calendar</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-red-600">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 pt-20">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Market Status Bar */}
        <div className="mb-8 bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-4">
              <div className={`flex items-center space-x-2 ${marketStatus.isOpen ? 'text-green-600' : 'text-red-600'
                }`}>
                <FaClock className="w-5 h-5" />
                <span className="font-medium text-lg">
                  Market {marketStatus.isOpen ? 'Open' : 'Closed'}
                </span>
              </div>
              {marketStatus.nextOpen && (
                <span className="text-sm text-gray-600 bg-gray-50 px-4 py-2 rounded-lg">
                  Next Open: {marketStatus.nextOpen}
                </span>
              )}
              {marketStatus.nextClose && (
                <span className="text-sm text-gray-600 bg-gray-50 px-4 py-2 rounded-lg">
                  Closes: {marketStatus.nextClose}
                </span>
              )}
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-500 bg-gray-50 px-3 py-1 rounded-md">ET</span>
              <span className="text-sm text-gray-500 bg-gray-50 px-3 py-1 rounded-md">
                Last Updated: {new Date().toLocaleTimeString()}
              </span>
            </div>
          </div>
        </div>

        {/* Market Indices */}
        <div className="mb-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {marketStatus.isOpen && marketIndices.map((index) => (
            <div key={index.name} className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-shadow duration-300">
              <h3 className="text-sm font-medium text-gray-500 mb-2">{index.name}</h3>
              <div className="flex items-baseline justify-between">
                <p className="text-2xl font-semibold text-gray-900">{index.value}</p>
                <span className={`text-sm font-medium px-3 py-1 rounded-full ${index.trend === 'up' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'
                  }`}>
                  {index.change}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Sector Performance */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Sector Performance</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
            {sectorPerformance.map((sector) => (
              <div key={sector.name} className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-shadow duration-300">
                <h3 className="text-sm font-medium text-gray-500 mb-2">{sector.name}</h3>
                <div className="flex items-baseline justify-between">
                  <span className={`text-lg font-semibold ${sector.trend === 'up' ? 'text-green-600' : 'text-red-600'
                    }`}>
                    {sector.change}
                  </span>
                  {sector.trend === 'up' ? (
                    <FaArrowUp className="w-4 h-4 text-green-600" />
                  ) : (
                    <FaArrowDown className="w-4 h-4 text-red-600" />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Enhanced Search Section */}
        <div className="mb-8">
          <div className="relative">
            <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search stocks by symbol or company name..."
              value={searchQuery}
              onChange={handleSearchInput}
              className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 bg-white shadow-sm text-lg"
            />
            {renderSearchResults()}
          </div>
          {searchQuery && renderSearchFilters()}
        </div>

        {/* Stock Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {stocks.map((stock) => renderStockCard(stock))}
        </div>

        {/* Stock Detail Modal */}
        {renderStockDetail()}

        {/* Add Transaction History Button */}
        <div className="mb-8 flex justify-end">
          <button
            onClick={() => setShowTransactionHistory(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            <FaHistory className="w-5 h-5" />
            <span>Transaction History</span>
          </button>
        </div>

        {/* Add Order Modal */}
        {renderOrderModal()}

        {/* Add Transaction History Modal */}
        {renderTransactionHistory()}

        {/* Portfolio Analytics */}
        {renderPortfolioAnalytics()}

        {/* Watchlist */}
        {renderWatchlist()}

        {/* Earnings Calendar Modal */}
        {renderEarningsCalendar()}
      </main>
    </div>
  );
};

export default Stocks; 