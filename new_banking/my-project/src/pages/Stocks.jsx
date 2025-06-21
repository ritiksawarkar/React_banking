import React, { useState, useEffect, useCallback, useMemo, Suspense } from 'react';
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
  FaCalendarAlt, FaPlus, FaMinus, FaArrowLeft, FaArrowRight,
  FaMicrochip, FaHeartbeat, FaShoppingCart, FaBolt, FaIndustry, FaBox, FaBuilding
} from 'react-icons/fa';
import { debounce } from 'lodash';
import DashboardPageHeader from '../components/DashboardPageHeader';
import DashboardPageFooter from '../components/DashboardPageFooter';
import SectorPerformanceCard from '../components/SectorPerformanceCard';
import MarketIndexCard from '../components/MarketIndexCard';
import StockGrid from '../components/StockGrid';
import StockNews from '../components/StockNews';
import LoadingSkeleton from '../components/LoadingSkeleton';
import StockDetailModal from '../components/StockDetailModal';
import StocksModals from '../components/StocksModals';
import IndianMarketIndices from '../components/IndianMarketIndices';
import MySelectedStocks from '../components/MySelectedStocks';
import SectorPerformanceSection from '../components/SectorPerformanceSection';
import StockSearchBar from '../components/StockSearchBar';
import StockGridSection from '../components/StockGridSection';

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
  },
  {
    symbol: 'NVDA',
    name: 'NVIDIA Corporation',
    price: 875.28,
    change: 12.5,
    changePercent: 1.45,
    dayHigh: 880.50,
    dayLow: 865.20,
    yearHigh: 950.00,
    yearLow: 400.50,
    marketCap: '2.1T',
    peRatio: 75.8,
    eps: 11.55,
    dividendYield: 0.02,
    volume: '52.8M',
    sector: 'Technology',
    logo: 'https://logo.clearbit.com/nvidia.com',
    historical: {
      'Time Series (Daily)': {
        '2024-03-20': {
          '1. open': '875.00',
          '2. high': '880.50',
          '3. low': '865.20',
          '4. close': '875.28',
          '5. volume': '52800000'
        },
        '2024-03-19': {
          '1. open': '870.00',
          '2. high': '875.00',
          '3. low': '868.50',
          '4. close': '872.50',
          '5. volume': '48500000'
        },
        '2024-03-18': {
          '1. open': '865.00',
          '2. high': '870.50',
          '3. low': '862.50',
          '4. close': '865.00',
          '5. volume': '45200000'
        }
      }
    }
  },
  {
    symbol: 'JPM',
    name: 'JPMorgan Chase & Co.',
    price: 195.67,
    change: -1.8,
    changePercent: -0.91,
    dayHigh: 197.20,
    dayLow: 194.50,
    yearHigh: 200.00,
    yearLow: 150.20,
    marketCap: '560B',
    peRatio: 12.5,
    eps: 15.65,
    dividendYield: 2.8,
    volume: '12.3M',
    sector: 'Financial Services',
    logo: 'https://logo.clearbit.com/jpmorganchase.com',
    historical: {
      'Time Series (Daily)': {
        '2024-03-20': {
          '1. open': '195.00',
          '2. high': '197.20',
          '3. low': '194.50',
          '4. close': '195.67',
          '5. volume': '12300000'
        },
        '2024-03-19': {
          '1. open': '196.00',
          '2. high': '197.00',
          '3. low': '195.50',
          '4. close': '196.50',
          '5. volume': '11800000'
        },
        '2024-03-18': {
          '1. open': '195.00',
          '2. high': '196.50',
          '3. low': '194.50',
          '4. close': '195.00',
          '5. volume': '11500000'
        }
      }
    }
  },
  {
    symbol: 'JNJ',
    name: 'Johnson & Johnson',
    price: 168.45,
    change: 0.8,
    changePercent: 0.48,
    dayHigh: 169.20,
    dayLow: 167.80,
    yearHigh: 175.00,
    yearLow: 145.20,
    marketCap: '410B',
    peRatio: 16.8,
    eps: 10.02,
    dividendYield: 3.2,
    volume: '8.5M',
    sector: 'Healthcare',
    logo: 'https://logo.clearbit.com/jnj.com',
    historical: {
      'Time Series (Daily)': {
        '2024-03-20': {
          '1. open': '168.00',
          '2. high': '169.20',
          '3. low': '167.80',
          '4. close': '168.45',
          '5. volume': '8500000'
        },
        '2024-03-19': {
          '1. open': '167.00',
          '2. high': '168.00',
          '3. low': '166.50',
          '4. close': '167.50',
          '5. volume': '8200000'
        },
        '2024-03-18': {
          '1. open': '166.00',
          '2. high': '167.50',
          '3. low': '165.50',
          '4. close': '166.00',
          '5. volume': '8000000'
        }
      }
    }
  },
  {
    symbol: 'PG',
    name: 'Procter & Gamble Co.',
    price: 162.78,
    change: 1.2,
    changePercent: 0.74,
    dayHigh: 163.50,
    dayLow: 162.20,
    yearHigh: 165.00,
    yearLow: 140.20,
    marketCap: '385B',
    peRatio: 25.5,
    eps: 6.38,
    dividendYield: 2.4,
    volume: '6.8M',
    sector: 'Consumer Defensive',
    logo: 'https://logo.clearbit.com/pg.com',
    historical: {
      'Time Series (Daily)': {
        '2024-03-20': {
          '1. open': '162.00',
          '2. high': '163.50',
          '3. low': '162.20',
          '4. close': '162.78',
          '5. volume': '6800000'
        },
        '2024-03-19': {
          '1. open': '161.00',
          '2. high': '162.00',
          '3. low': '160.50',
          '4. close': '161.50',
          '5. volume': '6500000'
        },
        '2024-03-18': {
          '1. open': '160.00',
          '2. high': '161.50',
          '3. low': '159.50',
          '4. close': '160.00',
          '5. volume': '6200000'
        }
      }
    }
  },
  {
    symbol: 'UNH',
    name: 'UnitedHealth Group Inc.',
    price: 485.92,
    change: -3.5,
    changePercent: -0.71,
    dayHigh: 488.00,
    dayLow: 483.50,
    yearHigh: 520.00,
    yearLow: 400.20,
    marketCap: '450B',
    peRatio: 18.5,
    eps: 26.27,
    dividendYield: 1.6,
    volume: '4.2M',
    sector: 'Healthcare',
    logo: 'https://logo.clearbit.com/unitedhealthgroup.com',
    historical: {
      'Time Series (Daily)': {
        '2024-03-20': {
          '1. open': '485.00',
          '2. high': '488.00',
          '3. low': '483.50',
          '4. close': '485.92',
          '5. volume': '4200000'
        },
        '2024-03-19': {
          '1. open': '486.00',
          '2. high': '487.00',
          '3. low': '485.50',
          '4. close': '486.50',
          '5. volume': '4100000'
        },
        '2024-03-18': {
          '1. open': '485.00',
          '2. high': '486.50',
          '3. low': '484.50',
          '4. close': '485.00',
          '5. volume': '4000000'
        }
      }
    }
  },
  {
    symbol: 'HD',
    name: 'Home Depot Inc.',
    price: 385.67,
    change: 2.8,
    changePercent: 0.73,
    dayHigh: 387.20,
    dayLow: 384.50,
    yearHigh: 390.00,
    yearLow: 320.20,
    marketCap: '385B',
    peRatio: 22.8,
    eps: 16.92,
    dividendYield: 2.1,
    volume: '5.5M',
    sector: 'Consumer Cyclical',
    logo: 'https://logo.clearbit.com/homedepot.com',
    historical: {
      'Time Series (Daily)': {
        '2024-03-20': {
          '1. open': '385.00',
          '2. high': '387.20',
          '3. low': '384.50',
          '4. close': '385.67',
          '5. volume': '5500000'
        },
        '2024-03-19': {
          '1. open': '384.00',
          '2. high': '385.00',
          '3. low': '383.50',
          '4. close': '384.50',
          '5. volume': '5200000'
        },
        '2024-03-18': {
          '1. open': '383.00',
          '2. high': '384.50',
          '3. low': '382.50',
          '4. close': '383.00',
          '5. volume': '5000000'
        }
      }
    }
  },
  {
    symbol: 'MA',
    name: 'Mastercard Inc.',
    price: 445.23,
    change: 4.2,
    changePercent: 0.95,
    dayHigh: 447.50,
    dayLow: 443.80,
    yearHigh: 450.00,
    yearLow: 380.20,
    marketCap: '420B',
    peRatio: 35.8,
    eps: 12.44,
    dividendYield: 0.6,
    volume: '7.8M',
    sector: 'Financial Services',
    logo: 'https://logo.clearbit.com/mastercard.com',
    historical: {
      'Time Series (Daily)': {
        '2024-03-20': {
          '1. open': '445.00',
          '2. high': '447.50',
          '3. low': '443.80',
          '4. close': '445.23',
          '5. volume': '7800000'
        },
        '2024-03-19': {
          '1. open': '444.00',
          '2. high': '445.00',
          '3. low': '443.50',
          '4. close': '444.50',
          '5. volume': '7500000'
        },
        '2024-03-18': {
          '1. open': '443.00',
          '2. high': '444.50',
          '3. low': '442.50',
          '4. close': '443.00',
          '5. volume': '7200000'
        }
      }
    }
  },
  {
    symbol: 'V',
    name: 'Visa Inc.',
    price: 278.45,
    change: 1.5,
    changePercent: 0.54,
    dayHigh: 279.20,
    dayLow: 277.80,
    yearHigh: 285.00,
    yearLow: 240.20,
    marketCap: '570B',
    peRatio: 32.5,
    eps: 8.57,
    dividendYield: 0.8,
    volume: '12.5M',
    sector: 'Financial Services',
    logo: 'https://logo.clearbit.com/visa.com',
    historical: {
      'Time Series (Daily)': {
        '2024-03-20': {
          '1. open': '278.00',
          '2. high': '279.20',
          '3. low': '277.80',
          '4. close': '278.45',
          '5. volume': '12500000'
        },
        '2024-03-19': {
          '1. open': '277.00',
          '2. high': '278.00',
          '3. low': '276.50',
          '4. close': '277.50',
          '5. volume': '12000000'
        },
        '2024-03-18': {
          '1. open': '276.00',
          '2. high': '277.50',
          '3. low': '275.50',
          '4. close': '276.00',
          '5. volume': '11800000'
        }
      }
    }
  },
  {
    symbol: 'DIS',
    name: 'Walt Disney Co.',
    price: 92.34,
    change: -1.8,
    changePercent: -1.91,
    dayHigh: 93.50,
    dayLow: 91.80,
    yearHigh: 95.00,
    yearLow: 75.20,
    marketCap: '170B',
    peRatio: 18.5,
    eps: 4.99,
    dividendYield: 0.3,
    volume: '15.8M',
    sector: 'Communication Services',
    logo: 'https://logo.clearbit.com/disney.com',
    historical: {
      'Time Series (Daily)': {
        '2024-03-20': {
          '1. open': '92.00',
          '2. high': '93.50',
          '3. low': '91.80',
          '4. close': '92.34',
          '5. volume': '15800000'
        },
        '2024-03-19': {
          '1. open': '93.00',
          '2. high': '94.00',
          '3. low': '92.50',
          '4. close': '93.50',
          '5. volume': '15200000'
        },
        '2024-03-18': {
          '1. open': '92.00',
          '2. high': '93.50',
          '3. low': '91.50',
          '4. close': '92.00',
          '5. volume': '14800000'
        }
      }
    }
  },
  {
    symbol: 'NFLX',
    name: 'Netflix Inc.',
    price: 612.45,
    change: 8.5,
    changePercent: 1.41,
    dayHigh: 615.20,
    dayLow: 610.80,
    yearHigh: 620.00,
    yearLow: 450.20,
    marketCap: '270B',
    peRatio: 45.8,
    eps: 13.37,
    dividendYield: 0.0,
    volume: '8.2M',
    sector: 'Communication Services',
    logo: 'https://logo.clearbit.com/netflix.com',
    historical: {
      'Time Series (Daily)': {
        '2024-03-20': {
          '1. open': '612.00',
          '2. high': '615.20',
          '3. low': '610.80',
          '4. close': '612.45',
          '5. volume': '8200000'
        },
        '2024-03-19': {
          '1. open': '611.00',
          '2. high': '612.00',
          '3. low': '610.50',
          '4. close': '611.50',
          '5. volume': '7800000'
        },
        '2024-03-18': {
          '1. open': '610.00',
          '2. high': '611.50',
          '3. low': '609.50',
          '4. close': '610.00',
          '5. volume': '7500000'
        }
      }
    }
  },
  {
    symbol: 'ADBE',
    name: 'Adobe Inc.',
    price: 485.67,
    change: -2.3,
    changePercent: -0.47,
    dayHigh: 488.00,
    dayLow: 483.50,
    yearHigh: 490.00,
    yearLow: 420.20,
    marketCap: '220B',
    peRatio: 42.5,
    eps: 11.43,
    dividendYield: 0.0,
    volume: '6.5M',
    sector: 'Technology',
    logo: 'https://logo.clearbit.com/adobe.com',
    historical: {
      'Time Series (Daily)': {
        '2024-03-20': {
          '1. open': '485.00',
          '2. high': '488.00',
          '3. low': '483.50',
          '4. close': '485.67',
          '5. volume': '6500000'
        },
        '2024-03-19': {
          '1. open': '486.00',
          '2. high': '487.00',
          '3. low': '485.50',
          '4. close': '486.50',
          '5. volume': '6200000'
        },
        '2024-03-18': {
          '1. open': '485.00',
          '2. high': '486.50',
          '3. low': '484.50',
          '4. close': '485.00',
          '5. volume': '6000000'
        }
      }
    }
  },
  // Adding 10 more stocks
  {
    symbol: 'CRM',
    name: 'Salesforce Inc.',
    price: 298.45,
    change: 5.2,
    changePercent: 1.78,
    dayHigh: 300.20,
    dayLow: 295.80,
    yearHigh: 310.00,
    yearLow: 220.50,
    marketCap: '290B',
    peRatio: 65.2,
    eps: 4.58,
    dividendYield: 0.0,
    volume: '8.8M',
    sector: 'Technology',
    logo: 'https://logo.clearbit.com/salesforce.com',
    historical: {
      'Time Series (Daily)': {
        '2024-03-20': {
          '1. open': '298.00',
          '2. high': '300.20',
          '3. low': '295.80',
          '4. close': '298.45',
          '5. volume': '8800000'
        },
        '2024-03-19': {
          '1. open': '297.00',
          '2. high': '298.00',
          '3. low': '296.50',
          '4. close': '297.50',
          '5. volume': '8500000'
        },
        '2024-03-18': {
          '1. open': '296.00',
          '2. high': '297.50',
          '3. low': '295.50',
          '4. close': '296.00',
          '5. volume': '8200000'
        }
      }
    }
  },
  {
    symbol: 'PYPL',
    name: 'PayPal Holdings Inc.',
    price: 68.92,
    change: -1.8,
    changePercent: -2.54,
    dayHigh: 70.50,
    dayLow: 68.20,
    yearHigh: 75.00,
    yearLow: 55.20,
    marketCap: '78B',
    peRatio: 18.5,
    eps: 3.72,
    dividendYield: 0.0,
    volume: '12.5M',
    sector: 'Financial Services',
    logo: 'https://logo.clearbit.com/paypal.com',
    historical: {
      'Time Series (Daily)': {
        '2024-03-20': {
          '1. open': '68.50',
          '2. high': '70.50',
          '3. low': '68.20',
          '4. close': '68.92',
          '5. volume': '12500000'
        },
        '2024-03-19': {
          '1. open': '69.00',
          '2. high': '70.00',
          '3. low': '68.50',
          '4. close': '69.50',
          '5. volume': '11800000'
        },
        '2024-03-18': {
          '1. open': '68.00',
          '2. high': '69.50',
          '3. low': '67.50',
          '4. close': '68.00',
          '5. volume': '11500000'
        }
      }
    }
  },
  {
    symbol: 'INTC',
    name: 'Intel Corporation',
    price: 42.15,
    change: 0.8,
    changePercent: 1.94,
    dayHigh: 42.80,
    dayLow: 41.90,
    yearHigh: 45.00,
    yearLow: 35.20,
    marketCap: '180B',
    peRatio: 28.5,
    eps: 1.48,
    dividendYield: 1.8,
    volume: '25.8M',
    sector: 'Technology',
    logo: 'https://logo.clearbit.com/intel.com',
    historical: {
      'Time Series (Daily)': {
        '2024-03-20': {
          '1. open': '42.00',
          '2. high': '42.80',
          '3. low': '41.90',
          '4. close': '42.15',
          '5. volume': '25800000'
        },
        '2024-03-19': {
          '1. open': '41.50',
          '2. high': '42.00',
          '3. low': '41.20',
          '4. close': '41.80',
          '5. volume': '24500000'
        },
        '2024-03-18': {
          '1. open': '41.00',
          '2. high': '41.80',
          '3. low': '40.80',
          '4. close': '41.00',
          '5. volume': '23800000'
        }
      }
    }
  },
  {
    symbol: 'AMD',
    name: 'Advanced Micro Devices Inc.',
    price: 185.67,
    change: 3.2,
    changePercent: 1.75,
    dayHigh: 187.20,
    dayLow: 184.50,
    yearHigh: 190.00,
    yearLow: 120.20,
    marketCap: '300B',
    peRatio: 45.8,
    eps: 4.05,
    dividendYield: 0.0,
    volume: '35.2M',
    sector: 'Technology',
    logo: 'https://logo.clearbit.com/amd.com',
    historical: {
      'Time Series (Daily)': {
        '2024-03-20': {
          '1. open': '185.00',
          '2. high': '187.20',
          '3. low': '184.50',
          '4. close': '185.67',
          '5. volume': '35200000'
        },
        '2024-03-19': {
          '1. open': '184.00',
          '2. high': '185.00',
          '3. low': '183.50',
          '4. close': '184.50',
          '5. volume': '33800000'
        },
        '2024-03-18': {
          '1. open': '183.00',
          '2. high': '184.50',
          '3. low': '182.50',
          '4. close': '183.00',
          '5. volume': '32500000'
        }
      }
    }
  },
  {
    symbol: 'ORCL',
    name: 'Oracle Corporation',
    price: 125.34,
    change: -0.8,
    changePercent: -0.63,
    dayHigh: 126.50,
    dayLow: 124.80,
    yearHigh: 130.00,
    yearLow: 100.20,
    marketCap: '340B',
    peRatio: 22.5,
    eps: 5.57,
    dividendYield: 1.4,
    volume: '8.8M',
    sector: 'Technology',
    logo: 'https://logo.clearbit.com/oracle.com',
    historical: {
      'Time Series (Daily)': {
        '2024-03-20': {
          '1. open': '125.00',
          '2. high': '126.50',
          '3. low': '124.80',
          '4. close': '125.34',
          '5. volume': '8800000'
        },
        '2024-03-19': {
          '1. open': '125.50',
          '2. high': '126.00',
          '3. low': '125.20',
          '4. close': '125.80',
          '5. volume': '8500000'
        },
        '2024-03-18': {
          '1. open': '125.00',
          '2. high': '125.80',
          '3. low': '124.50',
          '4. close': '125.00',
          '5. volume': '8200000'
        }
      }
    }
  },
  {
    symbol: 'CSCO',
    name: 'Cisco Systems Inc.',
    price: 48.92,
    change: 0.5,
    changePercent: 1.03,
    dayHigh: 49.20,
    dayLow: 48.50,
    yearHigh: 52.00,
    yearLow: 45.20,
    marketCap: '200B',
    peRatio: 15.8,
    eps: 3.10,
    dividendYield: 3.2,
    volume: '15.5M',
    sector: 'Technology',
    logo: 'https://logo.clearbit.com/cisco.com',
    historical: {
      'Time Series (Daily)': {
        '2024-03-20': {
          '1. open': '48.50',
          '2. high': '49.20',
          '3. low': '48.50',
          '4. close': '48.92',
          '5. volume': '15500000'
        },
        '2024-03-19': {
          '1. open': '48.00',
          '2. high': '48.50',
          '3. low': '47.80',
          '4. close': '48.20',
          '5. volume': '14800000'
        },
        '2024-03-18': {
          '1. open': '47.50',
          '2. high': '48.20',
          '3. low': '47.20',
          '4. close': '47.50',
          '5. volume': '14200000'
        }
      }
    }
  },
  {
    symbol: 'IBM',
    name: 'International Business Machines Corp.',
    price: 185.67,
    change: 2.1,
    changePercent: 1.15,
    dayHigh: 186.50,
    dayLow: 184.20,
    yearHigh: 190.00,
    yearLow: 160.20,
    marketCap: '170B',
    peRatio: 18.5,
    eps: 10.03,
    dividendYield: 4.2,
    volume: '4.8M',
    sector: 'Technology',
    logo: 'https://logo.clearbit.com/ibm.com',
    historical: {
      'Time Series (Daily)': {
        '2024-03-20': {
          '1. open': '185.00',
          '2. high': '186.50',
          '3. low': '184.20',
          '4. close': '185.67',
          '5. volume': '4800000'
        },
        '2024-03-19': {
          '1. open': '184.00',
          '2. high': '185.00',
          '3. low': '183.50',
          '4. close': '184.50',
          '5. volume': '4600000'
        },
        '2024-03-18': {
          '1. open': '183.00',
          '2. high': '184.50',
          '3. low': '182.50',
          '4. close': '183.00',
          '5. volume': '4400000'
        }
      }
    }
  },
  {
    symbol: 'QCOM',
    name: 'Qualcomm Incorporated',
    price: 165.45,
    change: -1.2,
    changePercent: -0.72,
    dayHigh: 167.20,
    dayLow: 164.80,
    yearHigh: 170.00,
    yearLow: 140.20,
    marketCap: '185B',
    peRatio: 20.5,
    eps: 8.07,
    dividendYield: 2.1,
    volume: '8.2M',
    sector: 'Technology',
    logo: 'https://logo.clearbit.com/qualcomm.com',
    historical: {
      'Time Series (Daily)': {
        '2024-03-20': {
          '1. open': '165.00',
          '2. high': '167.20',
          '3. low': '164.80',
          '4. close': '165.45',
          '5. volume': '8200000'
        },
        '2024-03-19': {
          '1. open': '166.00',
          '2. high': '167.00',
          '3. low': '165.50',
          '4. close': '166.50',
          '5. volume': '7800000'
        },
        '2024-03-18': {
          '1. open': '165.00',
          '2. high': '166.50',
          '3. low': '164.50',
          '4. close': '165.00',
          '5. volume': '7500000'
        }
      }
    }
  },
  {
    symbol: 'TXN',
    name: 'Texas Instruments Incorporated',
    price: 175.23,
    change: 1.8,
    changePercent: 1.04,
    dayHigh: 176.50,
    dayLow: 174.20,
    yearHigh: 180.00,
    yearLow: 150.20,
    marketCap: '160B',
    peRatio: 25.8,
    eps: 6.79,
    dividendYield: 3.1,
    volume: '6.5M',
    sector: 'Technology',
    logo: 'https://logo.clearbit.com/ti.com',
    historical: {
      'Time Series (Daily)': {
        '2024-03-20': {
          '1. open': '175.00',
          '2. high': '176.50',
          '3. low': '174.20',
          '4. close': '175.23',
          '5. volume': '6500000'
        },
        '2024-03-19': {
          '1. open': '174.00',
          '2. high': '175.00',
          '3. low': '173.50',
          '4. close': '174.50',
          '5. volume': '6200000'
        },
        '2024-03-18': {
          '1. open': '173.00',
          '2. high': '174.50',
          '3. low': '172.50',
          '4. close': '173.00',
          '5. volume': '6000000'
        }
      }
    }
  },
  // Adding stocks for missing sectors
  {
    symbol: 'XOM',
    name: 'Exxon Mobil Corporation',
    price: 118.45,
    change: 2.1,
    changePercent: 1.81,
    dayHigh: 119.20,
    dayLow: 117.80,
    yearHigh: 125.00,
    yearLow: 95.20,
    marketCap: '470B',
    peRatio: 12.5,
    eps: 9.48,
    dividendYield: 3.8,
    volume: '18.5M',
    sector: 'Energy',
    logo: 'https://logo.clearbit.com/exxonmobil.com',
    historical: {
      'Time Series (Daily)': {
        '2024-03-20': {
          '1. open': '118.00',
          '2. high': '119.20',
          '3. low': '117.80',
          '4. close': '118.45',
          '5. volume': '18500000'
        },
        '2024-03-19': {
          '1. open': '117.00',
          '2. high': '118.00',
          '3. low': '116.50',
          '4. close': '117.50',
          '5. volume': '17800000'
        },
        '2024-03-18': {
          '1. open': '116.00',
          '2. high': '117.50',
          '3. low': '115.50',
          '4. close': '116.00',
          '5. volume': '17200000'
        }
      }
    }
  },
  {
    symbol: 'CVX',
    name: 'Chevron Corporation',
    price: 152.78,
    change: -1.2,
    changePercent: -0.78,
    dayHigh: 153.50,
    dayLow: 152.20,
    yearHigh: 160.00,
    yearLow: 125.20,
    marketCap: '290B',
    peRatio: 14.2,
    eps: 10.76,
    dividendYield: 4.1,
    volume: '12.8M',
    sector: 'Energy',
    logo: 'https://logo.clearbit.com/chevron.com',
    historical: {
      'Time Series (Daily)': {
        '2024-03-20': {
          '1. open': '152.50',
          '2. high': '153.50',
          '3. low': '152.20',
          '4. close': '152.78',
          '5. volume': '12800000'
        },
        '2024-03-19': {
          '1. open': '153.00',
          '2. high': '154.00',
          '3. low': '152.50',
          '4. close': '153.50',
          '5. volume': '12200000'
        },
        '2024-03-18': {
          '1. open': '152.00',
          '2. high': '153.50',
          '3. low': '151.50',
          '4. close': '152.00',
          '5. volume': '11800000'
        }
      }
    }
  },
  {
    symbol: 'BA',
    name: 'Boeing Co.',
    price: 185.34,
    change: 3.5,
    changePercent: 1.93,
    dayHigh: 186.80,
    dayLow: 184.20,
    yearHigh: 190.00,
    yearLow: 150.20,
    marketCap: '110B',
    peRatio: 45.8,
    eps: 4.05,
    dividendYield: 0.0,
    volume: '8.5M',
    sector: 'Industrial',
    logo: 'https://logo.clearbit.com/boeing.com',
    historical: {
      'Time Series (Daily)': {
        '2024-03-20': {
          '1. open': '185.00',
          '2. high': '186.80',
          '3. low': '184.20',
          '4. close': '185.34',
          '5. volume': '8500000'
        },
        '2024-03-19': {
          '1. open': '184.00',
          '2. high': '185.00',
          '3. low': '183.50',
          '4. close': '184.50',
          '5. volume': '8200000'
        },
        '2024-03-18': {
          '1. open': '183.00',
          '2. high': '184.50',
          '3. low': '182.50',
          '4. close': '183.00',
          '5. volume': '8000000'
        }
      }
    }
  },
  {
    symbol: 'CAT',
    name: 'Caterpillar Inc.',
    price: 345.67,
    change: 4.2,
    changePercent: 1.23,
    dayHigh: 347.20,
    dayLow: 344.50,
    yearHigh: 350.00,
    yearLow: 280.20,
    marketCap: '180B',
    peRatio: 18.5,
    eps: 18.68,
    dividendYield: 2.1,
    volume: '4.2M',
    sector: 'Industrial',
    logo: 'https://logo.clearbit.com/caterpillar.com',
    historical: {
      'Time Series (Daily)': {
        '2024-03-20': {
          '1. open': '345.00',
          '2. high': '347.20',
          '3. low': '344.50',
          '4. close': '345.67',
          '5. volume': '4200000'
        },
        '2024-03-19': {
          '1. open': '344.00',
          '2. high': '345.00',
          '3. low': '343.50',
          '4. close': '344.50',
          '5. volume': '4100000'
        },
        '2024-03-18': {
          '1. open': '343.00',
          '2. high': '344.50',
          '3. low': '342.50',
          '4. close': '343.00',
          '5. volume': '4000000'
        }
      }
    }
  },
  {
    symbol: 'GE',
    name: 'General Electric Company',
    price: 165.23,
    change: 2.8,
    changePercent: 1.72,
    dayHigh: 166.50,
    dayLow: 164.80,
    yearHigh: 170.00,
    yearLow: 130.20,
    marketCap: '180B',
    peRatio: 25.8,
    eps: 6.40,
    dividendYield: 0.3,
    volume: '12.5M',
    sector: 'Industrial',
    logo: 'https://logo.clearbit.com/ge.com',
    historical: {
      'Time Series (Daily)': {
        '2024-03-20': {
          '1. open': '165.00',
          '2. high': '166.50',
          '3. low': '164.80',
          '4. close': '165.23',
          '5. volume': '12500000'
        },
        '2024-03-19': {
          '1. open': '164.00',
          '2. high': '165.00',
          '3. low': '163.50',
          '4. close': '164.50',
          '5. volume': '12000000'
        },
        '2024-03-18': {
          '1. open': '163.00',
          '2. high': '164.50',
          '3. low': '162.50',
          '4. close': '163.00',
          '5. volume': '11800000'
        }
      }
    }
  },
  {
    symbol: 'FCX',
    name: 'Freeport-McMoRan Inc.',
    price: 48.92,
    change: 1.5,
    changePercent: 3.16,
    dayHigh: 49.20,
    dayLow: 48.50,
    yearHigh: 52.00,
    yearLow: 35.20,
    marketCap: '70B',
    peRatio: 18.5,
    eps: 2.64,
    dividendYield: 1.8,
    volume: '15.5M',
    sector: 'Materials',
    logo: 'https://logo.clearbit.com/fcx.com',
    historical: {
      'Time Series (Daily)': {
        '2024-03-20': {
          '1. open': '48.50',
          '2. high': '49.20',
          '3. low': '48.50',
          '4. close': '48.92',
          '5. volume': '15500000'
        },
        '2024-03-19': {
          '1. open': '48.00',
          '2. high': '48.50',
          '3. low': '47.80',
          '4. close': '48.20',
          '5. volume': '14800000'
        },
        '2024-03-18': {
          '1. open': '47.50',
          '2. high': '48.20',
          '3. low': '47.20',
          '4. close': '47.50',
          '5. volume': '14200000'
        }
      }
    }
  },
  {
    symbol: 'NEM',
    name: 'Newmont Corporation',
    price: 42.15,
    change: -0.8,
    changePercent: -1.86,
    dayHigh: 42.80,
    dayLow: 41.90,
    yearHigh: 45.00,
    yearLow: 35.20,
    marketCap: '53B',
    peRatio: 28.5,
    eps: 1.48,
    dividendYield: 3.2,
    volume: '8.8M',
    sector: 'Materials',
    logo: 'https://logo.clearbit.com/newmont.com',
    historical: {
      'Time Series (Daily)': {
        '2024-03-20': {
          '1. open': '42.00',
          '2. high': '42.80',
          '3. low': '41.90',
          '4. close': '42.15',
          '5. volume': '8800000'
        },
        '2024-03-19': {
          '1. open': '42.50',
          '2. high': '43.00',
          '3. low': '42.20',
          '4. close': '42.80',
          '5. volume': '8500000'
        },
        '2024-03-18': {
          '1. open': '42.00',
          '2. high': '42.80',
          '3. low': '41.80',
          '4. close': '42.00',
          '5. volume': '8200000'
        }
      }
    }
  },
  {
    symbol: 'DOW',
    name: 'Dow Inc.',
    price: 55.67,
    change: 0.5,
    changePercent: 0.91,
    dayHigh: 56.20,
    dayLow: 55.50,
    yearHigh: 58.00,
    yearLow: 45.20,
    marketCap: '39B',
    peRatio: 22.5,
    eps: 2.47,
    dividendYield: 5.2,
    volume: '6.5M',
    sector: 'Materials',
    logo: 'https://logo.clearbit.com/dow.com',
    historical: {
      'Time Series (Daily)': {
        '2024-03-20': {
          '1. open': '55.50',
          '2. high': '56.20',
          '3. low': '55.50',
          '4. close': '55.67',
          '5. volume': '6500000'
        },
        '2024-03-19': {
          '1. open': '55.00',
          '2. high': '55.50',
          '3. low': '54.80',
          '4. close': '55.20',
          '5. volume': '6200000'
        },
        '2024-03-18': {
          '1. open': '54.50',
          '2. high': '55.20',
          '3. low': '54.20',
          '4. close': '54.50',
          '5. volume': '6000000'
        }
      }
    }
  },
  {
    symbol: 'PLD',
    name: 'Prologis Inc.',
    price: 125.34,
    change: 1.2,
    changePercent: 0.97,
    dayHigh: 126.50,
    dayLow: 124.80,
    yearHigh: 130.00,
    yearLow: 100.20,
    marketCap: '120B',
    peRatio: 35.8,
    eps: 3.50,
    dividendYield: 3.1,
    volume: '4.2M',
    sector: 'Real Estate',
    logo: 'https://logo.clearbit.com/prologis.com',
    historical: {
      'Time Series (Daily)': {
        '2024-03-20': {
          '1. open': '125.00',
          '2. high': '126.50',
          '3. low': '124.80',
          '4. close': '125.34',
          '5. volume': '4200000'
        },
        '2024-03-19': {
          '1. open': '124.50',
          '2. high': '125.00',
          '3. low': '124.20',
          '4. close': '124.80',
          '5. volume': '4100000'
        },
        '2024-03-18': {
          '1. open': '124.00',
          '2. high': '124.80',
          '3. low': '123.50',
          '4. close': '124.00',
          '5. volume': '4000000'
        }
      }
    }
  },
  {
    symbol: 'EQIX',
    name: 'Equinix Inc.',
    price: 785.67,
    change: -2.5,
    changePercent: -0.32,
    dayHigh: 788.00,
    dayLow: 783.50,
    yearHigh: 800.00,
    yearLow: 650.20,
    marketCap: '75B',
    peRatio: 45.2,
    eps: 17.38,
    dividendYield: 2.1,
    volume: '1.8M',
    sector: 'Real Estate',
    logo: 'https://logo.clearbit.com/equinix.com',
    historical: {
      'Time Series (Daily)': {
        '2024-03-20': {
          '1. open': '785.00',
          '2. high': '788.00',
          '3. low': '783.50',
          '4. close': '785.67',
          '5. volume': '1800000'
        },
        '2024-03-19': {
          '1. open': '786.00',
          '2. high': '787.00',
          '3. low': '785.50',
          '4. close': '786.50',
          '5. volume': '1750000'
        },
        '2024-03-18': {
          '1. open': '785.00',
          '2. high': '786.50',
          '3. low': '784.50',
          '4. close': '785.00',
          '5. volume': '1700000'
        }
      }
    }
  },
  {
    symbol: 'AMT',
    name: 'American Tower Corporation',
    price: 185.92,
    change: 1.8,
    changePercent: 0.98,
    dayHigh: 186.50,
    dayLow: 184.80,
    yearHigh: 190.00,
    yearLow: 150.20,
    marketCap: '85B',
    peRatio: 42.5,
    eps: 4.37,
    dividendYield: 3.8,
    volume: '3.2M',
    sector: 'Real Estate',
    logo: 'https://logo.clearbit.com/americantower.com',
    historical: {
      'Time Series (Daily)': {
        '2024-03-20': {
          '1. open': '185.50',
          '2. high': '186.50',
          '3. low': '184.80',
          '4. close': '185.92',
          '5. volume': '3200000'
        },
        '2024-03-19': {
          '1. open': '184.50',
          '2. high': '185.00',
          '3. low': '184.20',
          '4. close': '184.80',
          '5. volume': '3100000'
        },
        '2024-03-18': {
          '1. open': '184.00',
          '2. high': '184.80',
          '3. low': '183.50',
          '4. close': '184.00',
          '5. volume': '3000000'
        }
      }
    }
  },
  // Adding more Financial sector stocks
  {
    symbol: 'BAC',
    name: 'Bank of America Corporation',
    price: 38.45,
    change: -0.8,
    changePercent: -2.04,
    dayHigh: 39.20,
    dayLow: 38.20,
    yearHigh: 42.00,
    yearLow: 30.20,
    marketCap: '310B',
    peRatio: 12.8,
    eps: 3.00,
    dividendYield: 2.9,
    volume: '45.2M',
    sector: 'Financial',
    logo: 'https://logo.clearbit.com/bankofamerica.com',
    historical: {
      'Time Series (Daily)': {
        '2024-03-20': {
          '1. open': '38.50',
          '2. high': '39.20',
          '3. low': '38.20',
          '4. close': '38.45',
          '5. volume': '45200000'
        },
        '2024-03-19': {
          '1. open': '39.00',
          '2. high': '39.50',
          '3. low': '38.80',
          '4. close': '39.20',
          '5. volume': '43800000'
        },
        '2024-03-18': {
          '1. open': '38.50',
          '2. high': '39.20',
          '3. low': '38.30',
          '4. close': '38.50',
          '5. volume': '42500000'
        }
      }
    }
  },
  {
    symbol: 'WFC',
    name: 'Wells Fargo & Company',
    price: 58.92,
    change: 1.2,
    changePercent: 2.08,
    dayHigh: 59.50,
    dayLow: 58.20,
    yearHigh: 62.00,
    yearLow: 45.20,
    marketCap: '220B',
    peRatio: 11.5,
    eps: 5.12,
    dividendYield: 2.5,
    volume: '28.5M',
    sector: 'Financial',
    logo: 'https://logo.clearbit.com/wellsfargo.com',
    historical: {
      'Time Series (Daily)': {
        '2024-03-20': {
          '1. open': '58.50',
          '2. high': '59.50',
          '3. low': '58.20',
          '4. close': '58.92',
          '5. volume': '28500000'
        },
        '2024-03-19': {
          '1. open': '58.00',
          '2. high': '58.50',
          '3. low': '57.80',
          '4. close': '58.20',
          '5. volume': '27800000'
        },
        '2024-03-18': {
          '1. open': '57.50',
          '2. high': '58.20',
          '3. low': '57.30',
          '4. close': '57.50',
          '5. volume': '26500000'
        }
      }
    }
  },
  {
    symbol: 'GS',
    name: 'Goldman Sachs Group Inc.',
    price: 425.67,
    change: 3.5,
    changePercent: 0.83,
    dayHigh: 427.20,
    dayLow: 424.50,
    yearHigh: 450.00,
    yearLow: 350.20,
    marketCap: '140B',
    peRatio: 18.5,
    eps: 23.00,
    dividendYield: 2.8,
    volume: '4.2M',
    sector: 'Financial',
    logo: 'https://logo.clearbit.com/goldmansachs.com',
    historical: {
      'Time Series (Daily)': {
        '2024-03-20': {
          '1. open': '425.00',
          '2. high': '427.20',
          '3. low': '424.50',
          '4. close': '425.67',
          '5. volume': '4200000'
        },
        '2024-03-19': {
          '1. open': '424.00',
          '2. high': '425.00',
          '3. low': '423.50',
          '4. close': '424.50',
          '5. volume': '4100000'
        },
        '2024-03-18': {
          '1. open': '423.00',
          '2. high': '424.50',
          '3. low': '422.50',
          '4. close': '423.00',
          '5. volume': '4000000'
        }
      }
    }
  },
  {
    symbol: 'MS',
    name: 'Morgan Stanley',
    price: 92.34,
    change: -1.8,
    changePercent: -1.91,
    dayHigh: 93.50,
    dayLow: 91.80,
    yearHigh: 95.00,
    yearLow: 75.20,
    marketCap: '160B',
    peRatio: 16.5,
    eps: 5.60,
    dividendYield: 3.2,
    volume: '12.8M',
    sector: 'Financial',
    logo: 'https://logo.clearbit.com/morganstanley.com',
    historical: {
      'Time Series (Daily)': {
        '2024-03-20': {
          '1. open': '92.00',
          '2. high': '93.50',
          '3. low': '91.80',
          '4. close': '92.34',
          '5. volume': '12800000'
        },
        '2024-03-19': {
          '1. open': '93.00',
          '2. high': '94.00',
          '3. low': '92.50',
          '4. close': '93.50',
          '5. volume': '12200000'
        },
        '2024-03-18': {
          '1. open': '92.00',
          '2. high': '93.50',
          '3. low': '91.50',
          '4. close': '92.00',
          '5. volume': '11800000'
        }
      }
    }
  },
  {
    symbol: 'AXP',
    name: 'American Express Company',
    price: 215.78,
    change: 2.1,
    changePercent: 0.98,
    dayHigh: 216.50,
    dayLow: 214.80,
    yearHigh: 220.00,
    yearLow: 180.20,
    marketCap: '170B',
    peRatio: 18.5,
    eps: 11.66,
    dividendYield: 1.4,
    volume: '6.5M',
    sector: 'Financial',
    logo: 'https://logo.clearbit.com/americanexpress.com',
    historical: {
      'Time Series (Daily)': {
        '2024-03-20': {
          '1. open': '215.50',
          '2. high': '216.50',
          '3. low': '214.80',
          '4. close': '215.78',
          '5. volume': '6500000'
        },
        '2024-03-19': {
          '1. open': '214.50',
          '2. high': '215.00',
          '3. low': '214.20',
          '4. close': '214.80',
          '5. volume': '6200000'
        },
        '2024-03-18': {
          '1. open': '214.00',
          '2. high': '214.80',
          '3. low': '213.50',
          '4. close': '214.00',
          '5. volume': '6000000'
        }
      }
    }
  },
  // Adding more Consumer sector stocks
  {
    symbol: 'KO',
    name: 'Coca-Cola Company',
    price: 62.45,
    change: 0.8,
    changePercent: 1.30,
    dayHigh: 62.80,
    dayLow: 62.20,
    yearHigh: 65.00,
    yearLow: 55.20,
    marketCap: '270B',
    peRatio: 24.5,
    eps: 2.55,
    dividendYield: 3.1,
    volume: '15.8M',
    sector: 'Consumer',
    logo: 'https://logo.clearbit.com/coca-cola.com',
    historical: {
      'Time Series (Daily)': {
        '2024-03-20': {
          '1. open': '62.00',
          '2. high': '62.80',
          '3. low': '62.20',
          '4. close': '62.45',
          '5. volume': '15800000'
        },
        '2024-03-19': {
          '1. open': '61.50',
          '2. high': '62.00',
          '3. low': '61.30',
          '4. close': '61.80',
          '5. volume': '15200000'
        },
        '2024-03-18': {
          '1. open': '61.00',
          '2. high': '61.80',
          '3. low': '60.80',
          '4. close': '61.00',
          '5. volume': '14800000'
        }
      }
    }
  },
  {
    symbol: 'PEP',
    name: 'PepsiCo Inc.',
    price: 175.23,
    change: 1.5,
    changePercent: 0.86,
    dayHigh: 176.50,
    dayLow: 174.80,
    yearHigh: 180.00,
    yearLow: 150.20,
    marketCap: '240B',
    peRatio: 25.8,
    eps: 6.79,
    dividendYield: 2.8,
    volume: '8.2M',
    sector: 'Consumer',
    logo: 'https://logo.clearbit.com/pepsico.com',
    historical: {
      'Time Series (Daily)': {
        '2024-03-20': {
          '1. open': '175.00',
          '2. high': '176.50',
          '3. low': '174.80',
          '4. close': '175.23',
          '5. volume': '8200000'
        },
        '2024-03-19': {
          '1. open': '174.50',
          '2. high': '175.00',
          '3. low': '174.20',
          '4. close': '174.80',
          '5. volume': '7800000'
        },
        '2024-03-18': {
          '1. open': '174.00',
          '2. high': '174.80',
          '3. low': '173.50',
          '4. close': '174.00',
          '5. volume': '7500000'
        }
      }
    }
  },
  {
    symbol: 'WMT',
    name: 'Walmart Inc.',
    price: 68.92,
    change: 0.5,
    changePercent: 0.73,
    dayHigh: 69.20,
    dayLow: 68.50,
    yearHigh: 70.00,
    yearLow: 55.20,
    marketCap: '550B',
    peRatio: 28.5,
    eps: 2.42,
    dividendYield: 1.4,
    volume: '25.8M',
    sector: 'Consumer',
    logo: 'https://logo.clearbit.com/walmart.com',
    historical: {
      'Time Series (Daily)': {
        '2024-03-20': {
          '1. open': '68.50',
          '2. high': '69.20',
          '3. low': '68.50',
          '4. close': '68.92',
          '5. volume': '25800000'
        },
        '2024-03-19': {
          '1. open': '68.00',
          '2. high': '68.50',
          '3. low': '67.80',
          '4. close': '68.20',
          '5. volume': '24500000'
        },
        '2024-03-18': {
          '1. open': '67.50',
          '2. high': '68.20',
          '3. low': '67.30',
          '4. close': '67.50',
          '5. volume': '23800000'
        }
      }
    }
  },
  {
    symbol: 'COST',
    name: 'Costco Wholesale Corporation',
    price: 825.67,
    change: 8.2,
    changePercent: 1.00,
    dayHigh: 828.00,
    dayLow: 823.50,
    yearHigh: 850.00,
    yearLow: 650.20,
    marketCap: '365B',
    peRatio: 45.8,
    eps: 18.05,
    dividendYield: 0.6,
    volume: '2.8M',
    sector: 'Consumer',
    logo: 'https://logo.clearbit.com/costco.com',
    historical: {
      'Time Series (Daily)': {
        '2024-03-20': {
          '1. open': '825.00',
          '2. high': '828.00',
          '3. low': '823.50',
          '4. close': '825.67',
          '5. volume': '2800000'
        },
        '2024-03-19': {
          '1. open': '824.00',
          '2. high': '825.00',
          '3. low': '823.00',
          '4. close': '824.50',
          '5. volume': '2700000'
        },
        '2024-03-18': {
          '1. open': '823.00',
          '2. high': '824.50',
          '3. low': '822.00',
          '4. close': '823.00',
          '5. volume': '2600000'
        }
      }
    }
  },
  {
    symbol: 'TGT',
    name: 'Target Corporation',
    price: 165.34,
    change: -2.1,
    changePercent: -1.25,
    dayHigh: 166.80,
    dayLow: 164.20,
    yearHigh: 170.00,
    yearLow: 120.20,
    marketCap: '75B',
    peRatio: 18.5,
    eps: 8.94,
    dividendYield: 2.8,
    volume: '8.5M',
    sector: 'Consumer',
    logo: 'https://logo.clearbit.com/target.com',
    historical: {
      'Time Series (Daily)': {
        '2024-03-20': {
          '1. open': '165.00',
          '2. high': '166.80',
          '3. low': '164.20',
          '4. close': '165.34',
          '5. volume': '8500000'
        },
        '2024-03-19': {
          '1. open': '166.00',
          '2. high': '167.00',
          '3. low': '165.50',
          '4. close': '166.50',
          '5. volume': '8200000'
        },
        '2024-03-18': {
          '1. open': '165.00',
          '2. high': '166.50',
          '3. low': '164.50',
          '4. close': '165.00',
          '5. volume': '8000000'
        }
      }
    }
  },
  {
    symbol: 'MCD',
    name: 'McDonald\'s Corporation',
    price: 285.67,
    change: 3.2,
    changePercent: 1.13,
    dayHigh: 286.50,
    dayLow: 284.80,
    yearHigh: 290.00,
    yearLow: 240.20,
    marketCap: '210B',
    peRatio: 25.8,
    eps: 11.07,
    dividendYield: 2.3,
    volume: '6.2M',
    sector: 'Consumer',
    logo: 'https://logo.clearbit.com/mcdonalds.com',
    historical: {
      'Time Series (Daily)': {
        '2024-03-20': {
          '1. open': '285.00',
          '2. high': '286.50',
          '3. low': '284.80',
          '4. close': '285.67',
          '5. volume': '6200000'
        },
        '2024-03-19': {
          '1. open': '284.00',
          '2. high': '285.00',
          '3. low': '283.50',
          '4. close': '284.50',
          '5. volume': '6000000'
        },
        '2024-03-18': {
          '1. open': '283.00',
          '2. high': '284.50',
          '3. low': '282.50',
          '4. close': '283.00',
          '5. volume': '5800000'
        }
      }
    }
  }
];

// Add Indian Market Indices Data
const INDIAN_INDICES = [
  {
    symbol: 'NIFTY 50',
    name: 'NIFTY 50',
    price: 22419.95,
    change: 123.45,
    changePercent: 0.55,
    dayHigh: 22450.20,
    dayLow: 22350.80,
    volume: '2.5B',
    logo: 'https://logo.clearbit.com/nseindia.com',
    description: 'The NIFTY 50 is a benchmark Indian stock market index that represents the weighted average of 50 of the largest Indian companies listed on the National Stock Exchange.',
    components: '50 companies',
    sector: 'Diversified'
  },
  {
    symbol: 'SENSEX',
    name: 'S&P BSE SENSEX',
    price: 73872.29,
    change: 234.56,
    changePercent: 0.32,
    dayHigh: 73900.00,
    dayLow: 73700.00,
    volume: '3.2B',
    logo: 'https://logo.clearbit.com/bseindia.com',
    description: 'The S&P BSE SENSEX is a free-float market-weighted stock market index of 30 well-established and financially sound companies listed on Bombay Stock Exchange.',
    components: '30 companies',
    sector: 'Diversified'
  },
  {
    symbol: 'BANK NIFTY',
    name: 'NIFTY BANK',
    price: 47892.15,
    change: 345.67,
    changePercent: 0.73,
    dayHigh: 47900.00,
    dayLow: 47700.00,
    volume: '1.8B',
    logo: 'https://logo.clearbit.com/nseindia.com',
    description: 'NIFTY BANK is designed to reflect the behavior and performance of the banking sector in India.',
    components: '12 banks',
    sector: 'Banking'
  },
  {
    symbol: 'NIFTY NEXT 50',
    name: 'NIFTY NEXT 50',
    price: 65432.10,
    change: 456.78,
    changePercent: 0.70,
    dayHigh: 65500.00,
    dayLow: 65300.00,
    volume: '1.2B',
    logo: 'https://logo.clearbit.com/nseindia.com',
    description: 'NIFTY NEXT 50 represents 50 companies from NIFTY 100 after excluding the NIFTY 50 companies.',
    components: '50 companies',
    sector: 'Diversified'
  },
  {
    symbol: 'NIFTY MIDCAP 100',
    name: 'NIFTY MIDCAP 100',
    price: 45678.90,
    change: 567.89,
    changePercent: 1.26,
    dayHigh: 45700.00,
    dayLow: 45500.00,
    volume: '0.9B',
    logo: 'https://logo.clearbit.com/nseindia.com',
    description: 'NIFTY MIDCAP 100 represents the next set of 100 companies after NIFTY 100 based on market capitalization.',
    components: '100 companies',
    sector: 'Mid Cap'
  },
  {
    symbol: 'NIFTY IT',
    name: 'NIFTY IT',
    price: 34567.89,
    change: 678.90,
    changePercent: 2.00,
    dayHigh: 34600.00,
    dayLow: 34400.00,
    volume: '0.7B',
    logo: 'https://logo.clearbit.com/nseindia.com',
    description: 'NIFTY IT represents the performance of IT companies listed on the National Stock Exchange.',
    components: '10 companies',
    sector: 'Information Technology'
  },
  {
    symbol: 'FINNIFTY',
    name: 'NIFTY FINANCIAL SERVICES',
    price: 23456.78,
    change: 789.01,
    changePercent: 3.45,
    dayHigh: 23500.00,
    dayLow: 23300.00,
    volume: '1.1B',
    logo: 'https://logo.clearbit.com/nseindia.com',
    description: 'NIFTY FINANCIAL SERVICES represents the performance of financial services companies listed on the National Stock Exchange.',
    components: '20 companies',
    sector: 'Financial Services'
  },
  {
    symbol: 'NIFTY AUTO',
    name: 'NIFTY AUTO',
    price: 12345.67,
    change: 890.12,
    changePercent: 7.77,
    dayHigh: 12400.00,
    dayLow: 12200.00,
    volume: '0.5B',
    logo: 'https://logo.clearbit.com/nseindia.com',
    description: 'NIFTY AUTO represents the performance of automobile companies listed on the National Stock Exchange.',
    components: '15 companies',
    sector: 'Automobile'
  },
  {
    symbol: 'NIFTY FMCG',
    name: 'NIFTY FMCG',
    price: 56789.01,
    change: 901.23,
    changePercent: 1.62,
    dayHigh: 56800.00,
    dayLow: 56600.00,
    volume: '0.6B',
    logo: 'https://logo.clearbit.com/nseindia.com',
    description: 'NIFTY FMCG represents the performance of Fast Moving Consumer Goods companies listed on the National Stock Exchange.',
    components: '15 companies',
    sector: 'FMCG'
  }
];

// My Portfolio Stocks Sample Data (based on the image)
const MY_PORTFOLIO_STOCKS_SAMPLE = [
  {
    symbol: 'AAPL',
    name: 'Apple',
    logo: 'https://logo.clearbit.com/apple.com',
    totalShares: 150,
    totalValue: 310.40,
    totalReturn: -1.10,
    dailyTrend: [100, 98, 97, 95, 96, 94, 93, 91, 92, 90]
  },
  {
    symbol: 'META',
    name: 'Meta',
    logo: 'https://logo.clearbit.com/meta.com',
    totalShares: 80,
    totalValue: 140.45,
    totalReturn: -0.10,
    dailyTrend: [100, 99, 98, 97, 96, 95, 96, 95, 94, 93]
  },
  {
    symbol: 'MSFT',
    name: 'Microsoft',
    logo: 'https://logo.clearbit.com/microsoft.com',
    totalShares: 120,
    totalValue: 240.98,
    totalReturn: 0.85,
    dailyTrend: [100, 101, 102, 103, 104, 105, 104, 105, 106, 107]
  },
  {
    symbol: 'GOOGL',
    name: 'Google',
    logo: 'https://logo.clearbit.com/google.com',
    totalShares: 70,
    totalValue: 99.12,
    totalReturn: -0.04,
    dailyTrend: [100, 99, 98, 97, 96, 95, 96, 95, 94, 93]
  },
  {
    symbol: 'AMZN',
    name: 'Amazon',
    logo: 'https://logo.clearbit.com/amazon.com',
    totalShares: 90,
    totalValue: 175.60,
    totalReturn: 1.50,
    dailyTrend: [100, 101, 102, 103, 104, 103, 104, 105, 106, 107]
  },
  {
    symbol: 'NFLX',
    name: 'Netflix',
    logo: 'https://logo.clearbit.com/netflix.com',
    totalShares: 50,
    totalValue: 600.50,
    totalReturn: 0.95,
    dailyTrend: [100, 100.5, 101, 101.2, 100.8, 101.5, 101.8, 102, 102.5, 102.8]
  },
  {
    symbol: 'NVDA',
    name: 'Nvidia',
    logo: 'https://logo.clearbit.com/nvidia.com',
    totalShares: 20,
    totalValue: 950.20,
    totalReturn: 3.15,
    dailyTrend: [100, 101, 103, 105, 107, 109, 110, 112, 115, 118]
  },
  {
    symbol: 'TSLA',
    name: 'Tesla',
    logo: 'https://logo.clearbit.com/tesla.com',
    totalShares: 60,
    totalValue: 180.70,
    totalReturn: -2.50,
    dailyTrend: [100, 99, 98.5, 97, 96.5, 95, 94.5, 93, 92.5, 91]
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
  const [orders, setOrders] = useState(() => {
    const saved = localStorage.getItem('stockOrders');
    return saved ? JSON.parse(saved) : [];
  });
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [orderQuantity, setOrderQuantity] = useState(1);
  const [orderPrice, setOrderPrice] = useState(0);
  const [orderTotal, setOrderTotal] = useState(0);
  const [orderStatus, setOrderStatus] = useState(null);
  const [showTransactionHistory, setShowTransactionHistory] = useState(false);
  const [searchFilters, setSearchFilters] = useState({
    minPrice: '',
    maxPrice: '',
    sector: '',
    marketCap: ''
  });
  const [sectorPerformance, setSectorPerformance] = useState([]);
  const [currentIndexPage, setCurrentIndexPage] = useState(0);
  const indicesPerPage = 7; // Show 7 indices at once
  const indicesToMove = 2; // Move 2 indices at a time

  // State for My Portfolio Stocks pagination
  const [mySelectedStocksCurrentPage, setMySelectedStocksCurrentPage] = useState(0);
  const mySelectedStocksPerPage = 7; // Show 7 stocks at once, consistent with Indian Market Indices
  const mySelectedStocksToMove = 2; // Move 2 stocks at a time, consistent with Indian Market Indices

  const [orderType, setOrderType] = useState('buy');

  // Add state for sector filtering
  const [selectedSector, setSelectedSector] = useState(null);
  const [filteredStocks, setFilteredStocks] = useState([]);

  // Add state for enhanced search functionality
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [showWatchlistModal, setShowWatchlistModal] = useState(false);
  const [showCompareModal, setShowCompareModal] = useState(false);
  const [selectedStocksForComparison, setSelectedStocksForComparison] = useState([]);
  const [advancedFilters, setAdvancedFilters] = useState({
    priceRange: { min: '', max: '' },
    marketCap: '',
    sector: '',
    dividendYield: { min: '', max: '' },
    peRatio: { min: '', max: '' },
    volume: { min: '', max: '' }
  });

  // Dynamic price update system

  // Function to generate realistic price fluctuations
  const generatePriceFluctuation = (currentPrice, volatility = 0.02) => {
    // Generate a random percentage change between -volatility and +volatility
    const changePercent = (Math.random() - 0.5) * 2 * volatility;
    const newPrice = currentPrice * (1 + changePercent);
    
    // Ensure price doesn't go below 0.1 or above 10000
    return Math.max(0.1, Math.min(10000, newPrice));
  };

  // Function to update stock prices dynamically
  const updateStockPrices = useCallback(() => {
    setStocks(prevStocks => 
      prevStocks.map(stock => {
        const newPrice = generatePriceFluctuation(stock.price, 0.015); // 1.5% volatility
        const priceChange = newPrice - stock.price;
        const changePercent = (priceChange / stock.price) * 100;
        
        // Update day high/low
        const newDayHigh = Math.max(stock.dayHigh, newPrice);
        const newDayLow = Math.min(stock.dayLow, newPrice);
        
        // Update volume with some randomness
        const currentVolume = parseFloat(stock.volume.replace(/[^0-9.]/g, ''));
        const volumeMultiplier = stock.volume.includes('M') ? 1000000 : 
                                stock.volume.includes('B') ? 1000000000 : 1;
        const newVolume = Math.max(1000, currentVolume * volumeMultiplier * (0.8 + Math.random() * 0.4));
        
        // Format volume back to readable format
        let formattedVolume;
        if (newVolume >= 1000000000) {
          formattedVolume = `${(newVolume / 1000000000).toFixed(1)}B`;
        } else if (newVolume >= 1000000) {
          formattedVolume = `${(newVolume / 1000000).toFixed(1)}M`;
        } else {
          formattedVolume = Math.floor(newVolume).toString();
        }

        return {
          ...stock,
          price: newPrice,
          change: priceChange,
          changePercent: changePercent,
          dayHigh: newDayHigh,
          dayLow: newDayLow,
          volume: formattedVolume,
          // Update daily trend with new data point
          dailyTrend: [
            ...(Array.isArray(stock.dailyTrend)
              ? stock.dailyTrend.slice(1)
              : [typeof stock.price === 'number' && !isNaN(stock.price) ? stock.price : 100]
            ),
            newPrice
          ]
        };
      })
    );
  }, []);

  // Function to update market indices dynamically
  const updateMarketIndices = useCallback(() => {
    setSectorPerformance(prevSectors => 
      prevSectors.map(sector => {
        const newValue = generatePriceFluctuation(sector.value, 0.01); // 1% volatility for indices
        const change = newValue - sector.value;
        const changePercent = (change / sector.value) * 100;
        
        return {
          ...sector,
          value: newValue,
          change: change,
          changePercent: changePercent
        };
      })
    );
  }, []);

  // Set up interval for dynamic updates
  useEffect(() => {
    const stockUpdateInterval = setInterval(updateStockPrices, 3000); // Update every 3 seconds
    const indexUpdateInterval = setInterval(updateMarketIndices, 5000); // Update every 5 seconds

    return () => {
      clearInterval(stockUpdateInterval);
      clearInterval(indexUpdateInterval);
    };
  }, [updateStockPrices, updateMarketIndices]);

  // Helper function to validate chart data
  const validateChartData = (data, symbol = 'STOCK') => {
    if (data && Array.isArray(data) && data.length > 0) {
      return data;
    }
    
    // Generate different trend patterns based on the stock symbol
    const generateUniqueTrend = (symbol) => {
      const hash = symbol.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
      const seed = hash % 1000;
      
      // Different trend patterns based on seed
      const patterns = {
        // Bullish trend
        bullish: [100, 102, 105, 108, 112, 115, 118, 120, 123, 125],
        // Bearish trend
        bearish: [100, 98, 95, 92, 89, 86, 83, 80, 77, 75],
        // Sideways trend
        sideways: [100, 101, 99, 100, 102, 100, 98, 100, 101, 100],
        // Volatile trend
        volatile: [100, 105, 95, 110, 90, 115, 85, 120, 80, 125],
        // Gradual uptrend
        gradualUp: [100, 101, 102, 103, 104, 105, 106, 107, 108, 109],
        // Gradual downtrend
        gradualDown: [100, 99, 98, 97, 96, 95, 94, 93, 92, 91],
        // W pattern
        wPattern: [100, 95, 90, 95, 100, 95, 90, 95, 100, 105],
        // V pattern
        vPattern: [100, 95, 90, 85, 80, 85, 90, 95, 100, 105],
        // Inverted V pattern
        invertedV: [100, 105, 110, 115, 120, 115, 110, 105, 100, 95],
        // Zigzag pattern
        zigzag: [100, 105, 100, 105, 100, 105, 100, 105, 100, 105]
      };
      
      const patternKeys = Object.keys(patterns);
      const selectedPattern = patternKeys[seed % patternKeys.length];
      
      // Add some randomness to the base pattern
      return patterns[selectedPattern].map(value => {
        const randomFactor = (Math.random() - 0.5) * 2; // ±1 variation
        return Math.max(50, Math.min(150, value + randomFactor));
      });
    };
    
    // Use the provided symbol to generate a unique pattern
    return generateUniqueTrend(symbol);
  };

  // Helper function to convert index to stock format
  const convertIndexToStock = (index) => {
    return {
      symbol: index.symbol,
      name: index.name,
      price: index.price,
      change: index.change,
      changePercent: index.changePercent,
      dayHigh: index.dayHigh,
      dayLow: index.dayLow,
      yearHigh: index.price * 1.1, // Estimate
      yearLow: index.price * 0.9,  // Estimate
      marketCap: 'N/A',
      peRatio: 'N/A',
      eps: 'N/A',
      dividendYield: 0.0,
      volume: index.volume,
      sector: index.sector,
      logo: index.logo,
      dailyTrend: [100, 101, 102, 101, 100, 99, 98, 99, 100, 101],
      historical: {
        'Time Series (Daily)': {
          '2024-03-20': {
            '1. open': index.price.toString(),
            '2. high': index.dayHigh.toString(),
            '3. low': index.dayLow.toString(),
            '4. close': index.price.toString(),
            '5. volume': '1000000'
          }
        }
      },
      description: index.description,
      components: index.components
    };
  };

  // Helper function to convert portfolio stock to stock format
  const convertPortfolioStockToStock = (portfolioStock, stocks) => {
    // Find matching stock from main stocks array
    const matchingStock = stocks.find(stock => stock.symbol === portfolioStock.symbol);
    
    if (matchingStock) {
      return {
        ...matchingStock,
        totalShares: portfolioStock.totalShares,
        totalValue: portfolioStock.totalValue,
        totalReturn: portfolioStock.totalReturn,
        dailyTrend: validateChartData(portfolioStock.dailyTrend, portfolioStock.symbol)
      };
    }
    
    // If no matching stock found, create a basic one
    return {
      symbol: portfolioStock.symbol,
      name: portfolioStock.name,
      price: portfolioStock.totalValue / portfolioStock.totalShares,
      change: portfolioStock.totalReturn,
      changePercent: portfolioStock.totalReturn,
      dayHigh: (portfolioStock.totalValue / portfolioStock.totalShares) * 1.02,
      dayLow: (portfolioStock.totalValue / portfolioStock.totalShares) * 0.98,
      yearHigh: (portfolioStock.totalValue / portfolioStock.totalShares) * 1.1,
      yearLow: (portfolioStock.totalValue / portfolioStock.totalShares) * 0.9,
      marketCap: 'N/A',
      peRatio: 'N/A',
      eps: 'N/A',
      dividendYield: 0.0,
      volume: 'N/A',
      sector: 'Technology',
      logo: portfolioStock.logo,
      dailyTrend: validateChartData(portfolioStock.dailyTrend, portfolioStock.symbol),
      historical: {
        'Time Series (Daily)': {
          '2024-03-20': {
            '1. open': (portfolioStock.totalValue / portfolioStock.totalShares).toString(),
            '2. high': ((portfolioStock.totalValue / portfolioStock.totalShares) * 1.02).toString(),
            '3. low': ((portfolioStock.totalValue / portfolioStock.totalShares) * 0.98).toString(),
            '4. close': (portfolioStock.totalValue / portfolioStock.totalShares).toString(),
            '5. volume': '1000000'
          }
        }
      },
      totalShares: portfolioStock.totalShares,
      totalValue: portfolioStock.totalValue,
      totalReturn: portfolioStock.totalReturn
    };
  };

  // Fetch earnings calendar
  const fetchEarningsCalendar = useCallback(async () => {
    try {
      const symbols = [...new Set([...watchlist, ...orders.map(o => o.symbol)])];
      await Promise.all(
        symbols.map(async (symbol) => {
          try {
            const response = await axios.get(
              `https://www.alphavantage.co/query?function=EARNINGS_CALENDAR&symbol=${symbol}&horizon=3month&apikey=${ALPHA_VANTAGE_API_KEY}`
            );
            // Optionally, you can process response.data here if needed
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
      // No need to assign to 'earnings' if not used
    } catch (error) {
      console.error('Error fetching earnings calendar:', error);
    }
  }, [watchlist, orders]);

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
    }
  }, 500);

  // Handle search input change
  const handleSearchInput = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    
    // Filter stocks in the grid based on search query
    if (query.trim()) {
      const filteredResults = stocks.filter(stock => 
        stock.symbol.toLowerCase().includes(query.toLowerCase()) ||
        stock.name.toLowerCase().includes(query.toLowerCase()) ||
        stock.sector.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredStocks(filteredResults);
    } else {
      setFilteredStocks([]);
    }
    
    // Trigger API search for suggestions
    if (query.trim().length >= 2) {
    debouncedSearch(query);
    } else {
      setSearchResults([]);
    }
  };

  // Handle filter change
  const _handleFilterChange = (e) => {
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

  // Initialize data
  useEffect(() => {
    const initializeData = async () => {
      try {
        await fetchEarningsCalendar();
      } catch (error) {
        console.error('Error initializing data:', error);
      }
    };

    initializeData();
  }, [orders, stocks, fetchEarningsCalendar]);

  // Calculate holdings for a specific stock
  const calculateHoldings = (symbol) => {
    return orders.reduce((total, order) => {
      if (order.symbol !== symbol) return total;
      return order.type === 'buy' ? total + order.quantity : total - order.quantity;
    }, 0);
  };

  // Fetch market indices
  const fetchMarketIndices = async () => {
    try {
      const indices = ['^GSPC', '^DJI', '^IXIC', '^RUT']; // Example: S&P 500, Dow Jones, NASDAQ, Russell 2000
      await Promise.all(
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

      // Update sector performance with dummy data for now
      const sectors = ['Technology', 'Healthcare', 'Financial', 'Consumer', 'Energy', 'Industrial', 'Materials', 'Real Estate'];
      const sectorData = sectors.map(sector => ({
        name: sector,
        change: (Math.random() * 10 - 5).toFixed(2),
        trend: Math.random() > 0.5 ? 'up' : 'down' // Simple trend for now
      }));
      setSectorPerformance(sectorData);
    } catch (error) {
      console.error('Error fetching market indices:', error);
    }
  };

  // Function to handle sector filtering
  const handleSectorClick = (sectorName) => {
    if (selectedSector === sectorName) {
      // If clicking the same sector, clear the filter
      setSelectedSector(null);
      setFilteredStocks([]);
    } else {
      // Filter stocks by sector
      const sectorStocks = stocks.filter(stock => stock.sector === sectorName);
      setSelectedSector(sectorName);
      setFilteredStocks(sectorStocks);
    }
  };

  // Function to clear sector filter
  const clearSectorFilter = () => {
    setSelectedSector(null);
    setFilteredStocks([]);
  };

  // Function to apply advanced filters
  const applyAdvancedFilters = () => {
    let filtered = stocks;

    // Price range filter
    if (advancedFilters.priceRange.min) {
      filtered = filtered.filter(stock => stock.price >= parseFloat(advancedFilters.priceRange.min));
    }
    if (advancedFilters.priceRange.max) {
      filtered = filtered.filter(stock => stock.price <= parseFloat(advancedFilters.priceRange.max));
    }

    // Market cap filter
    if (advancedFilters.marketCap) {
      filtered = filtered.filter(stock => stock.marketCap.includes(advancedFilters.marketCap));
    }

    // Sector filter
    if (advancedFilters.sector) {
      filtered = filtered.filter(stock => stock.sector === advancedFilters.sector);
    }

    // Dividend yield filter
    if (advancedFilters.dividendYield.min) {
      filtered = filtered.filter(stock => stock.dividendYield >= parseFloat(advancedFilters.dividendYield.min));
    }
    if (advancedFilters.dividendYield.max) {
      filtered = filtered.filter(stock => stock.dividendYield <= parseFloat(advancedFilters.dividendYield.max));
    }

    // P/E ratio filter
    if (advancedFilters.peRatio.min) {
      filtered = filtered.filter(stock => stock.peRatio >= parseFloat(advancedFilters.peRatio.min));
    }
    if (advancedFilters.peRatio.max) {
      filtered = filtered.filter(stock => stock.peRatio <= parseFloat(advancedFilters.peRatio.max));
    }

    setFilteredStocks(filtered);
    setShowFilterModal(false);
  };

  // Function to clear advanced filters
  const clearAdvancedFilters = () => {
    setAdvancedFilters({
      priceRange: { min: '', max: '' },
      marketCap: '',
      sector: '',
      dividendYield: { min: '', max: '' },
      peRatio: { min: '', max: '' },
      volume: { min: '', max: '' }
    });
    setFilteredStocks([]);
  };

  // Function to remove stock from comparison
  const removeFromComparison = (symbol) => {
    setSelectedStocksForComparison(selectedStocksForComparison.filter(stock => stock.symbol !== symbol));
  };

  // Function to clear comparison
  const clearComparison = () => {
    setSelectedStocksForComparison([]);
    setShowCompareModal(false);
  };

  // Move INDIAN_INDICES to state
  const [indices, setIndices] = useState(INDIAN_INDICES);

  // Function to generate realistic price fluctuations for indices
  const updateIndices = useCallback(() => {
    setIndices(prevIndices => prevIndices.map(index => {
      const newPrice = generatePriceFluctuation(index.price, 0.01);
      const priceChange = newPrice - index.price;
      const changePercent = (priceChange / index.price) * 100;
      return {
        ...index,
        price: newPrice,
        change: priceChange,
        changePercent: changePercent,
        dayHigh: Math.max(index.dayHigh, newPrice),
        dayLow: Math.min(index.dayLow, newPrice)
      };
    }));
  }, []);

  // Set up interval for indices
  useEffect(() => {
    const interval = setInterval(updateIndices, 3000);
    return () => clearInterval(interval);
  }, [updateIndices]);

  // Create a dynamic myPortfolioStocks array
  const myPortfolioStocks = useMemo(() => {
    return MY_PORTFOLIO_STOCKS_SAMPLE.map(portfolioStock => {
      const liveStock = stocks.find(s => s.symbol === portfolioStock.symbol);
      if (liveStock) {
        return {
          ...portfolioStock,
          price: liveStock.price,
          change: liveStock.change,
          changePercent: liveStock.changePercent,
          dayHigh: liveStock.dayHigh,
          dayLow: liveStock.dayLow,
          yearHigh: liveStock.yearHigh,
          yearLow: liveStock.yearLow,
          marketCap: liveStock.marketCap,
          peRatio: liveStock.peRatio,
          eps: liveStock.eps,
          dividendYield: liveStock.dividendYield,
          volume: liveStock.volume,
          sector: liveStock.sector,
          logo: liveStock.logo,
          dailyTrend: liveStock.dailyTrend,
        };
      }
      return portfolioStock;
    });
  }, [stocks]);

  // Memoize filteredStocks
  const memoizedFilteredStocks = useMemo(() => filteredStocks, [filteredStocks]);
  // Memoize myPortfolioStocks
  const memoizedMyPortfolioStocks = useMemo(() => myPortfolioStocks, [myPortfolioStocks]);

  // Memoize handlers
  const handleBuy = useCallback((stock) => {
    setSelectedStock(stock);
    setOrderType('buy');
    setShowOrderModal(true);
  }, []);

  const handleSell = useCallback((stock) => {
    setSelectedStock(stock);
    setOrderType('sell');
    setShowOrderModal(true);
  }, []);

  const [showStockScreenerModal, setShowStockScreenerModal] = useState(false);

  // Add navigation functions
  const handlePrevIndices = () => {
    setCurrentIndexPage(prev => Math.max(0, prev - indicesToMove));
  };

  const handleNextIndices = () => {
    const maxPage = Math.ceil(INDIAN_INDICES.length / indicesPerPage) - 1;
    setCurrentIndexPage(prev => Math.min(maxPage, prev + indicesToMove));
  };

  // Helper functions for My Selected Stocks pagination
  const handlePrevMySelectedStocks = () => {
    setMySelectedStocksCurrentPage(prev => Math.max(0, prev - mySelectedStocksToMove));
  };

  const handleNextMySelectedStocks = () => {
    const maxPage = Math.ceil(MY_PORTFOLIO_STOCKS_SAMPLE.length / mySelectedStocksPerPage) - 1;
    setMySelectedStocksCurrentPage(prev => Math.min(maxPage, prev + mySelectedStocksToMove));
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <DashboardPageHeader />
      <div className="h-12"></div>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Indian Market Indices Navigation */}
        <IndianMarketIndices
          indices={indices}
          currentIndexPage={currentIndexPage}
          indicesPerPage={indicesPerPage}
          indicesToMove={indicesToMove}
          onPrev={handlePrevIndices}
          onNext={handleNextIndices}
          onPageDotClick={setCurrentIndexPage}
          onSelectIndex={(index) => {
                      const stockData = convertIndexToStock(index);
                      setSelectedStock(stockData);
                      setActiveTab('overview');
                    }}
          INDIAN_INDICES={INDIAN_INDICES}
                  />

        {/* My Selected Stocks Section */}
        <MySelectedStocks
          myPortfolioStocks={memoizedMyPortfolioStocks}
          currentPage={mySelectedStocksCurrentPage}
          mySelectedStocksPerPage={mySelectedStocksPerPage}
          mySelectedStocksToMove={mySelectedStocksToMove}
          onPrev={handlePrevMySelectedStocks}
          onNext={handleNextMySelectedStocks}
          onPageDotClick={setMySelectedStocksCurrentPage}
          onSelectStock={(stock) => {
                  const stockData = convertPortfolioStockToStock(stock, stocks);
                  setSelectedStock(stockData);
                  setActiveTab('overview');
                }}
              />

        {/* Sector Performance */}
        <SectorPerformanceSection
          sectorPerformance={sectorPerformance}
                selectedSector={selectedSector}
          onSectorClick={handleSectorClick}
          onSortByPerformance={() => setSectorPerformance([...sectorPerformance].sort((a, b) => b.change - a.change))}
          onSortByName={() => setSectorPerformance([...sectorPerformance].sort((a, b) => a.name.localeCompare(b.name)))}
              />

        {/* Enhanced Search Section */}
        <StockSearchBar
          searchQuery={searchQuery}
          onSearchChange={handleSearchInput}
          searchResults={searchResults}
          onSelectSuggestion={(stock) => {
                            setSelectedStock(stock);
                            setActiveTab('overview');
                            setSearchResults([]);
                            setSearchQuery('');
                            setFilteredStocks([]);
                          }}
          onClear={() => {
                      clearSectorFilter();
                      clearAdvancedFilters();
                      setSearchQuery('');
                      setSearchResults([]);
                    }}
          onShowFilterModal={() => setShowFilterModal(true)}
          onShowStockScreenerModal={() => setShowStockScreenerModal(true)}
          onShowWatchlistModal={() => setShowWatchlistModal(true)}
          onShowCompareModal={() => setShowCompareModal(true)}
          watchlistLength={watchlist.length}
          compareLength={selectedStocksForComparison.length}
          showClearAll={
            (selectedSector || filteredStocks.length > 0 || Object.values(advancedFilters).some(filter =>
              typeof filter === 'string' ? filter : Object.values(filter).some(val => val)
            ))
          }
        />

        {/* Stock Grid */}
        <StockGridSection
          loading={loading}
          orders={orders}
                stocks={stocks}
          filteredStocks={memoizedFilteredStocks}
                selectedSector={selectedSector}
                searchQuery={searchQuery}
                selectedStocksForComparison={selectedStocksForComparison}
                setSelectedStocksForComparison={setSelectedStocksForComparison}
                watchlist={watchlist}
                handleAddToWatchlist={handleAddToWatchlist}
                setSelectedStock={setSelectedStock}
                setActiveTab={setActiveTab}
                clearSectorFilter={clearSectorFilter}
                clearAdvancedFilters={clearAdvancedFilters}
                setSearchQuery={setSearchQuery}
                setFilteredStocks={setFilteredStocks}
                validateChartData={validateChartData}
                onBuy={handleBuy}
                onSell={handleSell}
              />

        {/* Stock Detail Modal */}
        <StockDetailModal
          selectedStock={selectedStock}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          onClose={() => setSelectedStock(null)}
          processCandlestickData={processCandlestickData}
          getChartOptions={getChartOptions}
          timeRange={timeRange}
          setTimeRange={setTimeRange}
        />

        {/* Modals */}
        <StocksModals
          showOrderModal={showOrderModal}
              selectedStock={selectedStock}
              orderType={orderType}
              orderQuantity={orderQuantity}
              orderPrice={orderPrice}
              orderTotal={orderTotal}
              orderStatus={orderStatus}
              onQuantityChange={handleQuantityChange}
              onPriceChange={handlePriceChange}
              onPlaceOrder={placeOrder}
          onCloseOrderModal={() => setShowOrderModal(false)}
              calculateHoldings={calculateHoldings}
          showTransactionHistory={showTransactionHistory}
              orders={orders}
          onCloseTransactionHistory={() => setShowTransactionHistory(false)}
          showFilterModal={showFilterModal}
              advancedFilters={advancedFilters}
              setAdvancedFilters={setAdvancedFilters}
              applyAdvancedFilters={applyAdvancedFilters}
              clearAdvancedFilters={clearAdvancedFilters}
          onCloseFilterModal={() => setShowFilterModal(false)}
          showCompareModal={showCompareModal}
              selectedStocksForComparison={selectedStocksForComparison}
              removeFromComparison={removeFromComparison}
              clearComparison={clearComparison}
              stocks={stocks}
          showStockScreenerModal={showStockScreenerModal}
          onCloseStockScreenerModal={() => setShowStockScreenerModal(false)}
              setFilteredStocks={setFilteredStocks}
          showWatchlistModal={showWatchlistModal}
            watchlist={watchlist}
          onCloseWatchlistModal={() => setShowWatchlistModal(false)}
            handleAddToWatchlist={handleAddToWatchlist}
          />
      </main>
      <DashboardPageFooter />
    </div>
  );
};

export default Stocks;