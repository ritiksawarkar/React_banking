// Utility functions for stocks and indices

// Function to generate realistic price fluctuations
export function generatePriceFluctuation(currentPrice, volatility = 0.02) {
  // Generate a random percentage change between -volatility and +volatility
  const changePercent = (Math.random() - 0.5) * 2 * volatility;
  const newPrice = currentPrice * (1 + changePercent);
  // Ensure price doesn't go below 0.1 or above 10000
  return Math.max(0.1, Math.min(10000, newPrice));
}

// Helper function to validate chart data
export function validateChartData(data, symbol = 'STOCK') {
  if (data && Array.isArray(data) && data.length > 0) {
    return data;
  }
  // Generate different trend patterns based on the stock symbol
  const generateUniqueTrend = (symbol) => {
    const hash = symbol.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const seed = hash % 1000;
    // Different trend patterns based on seed
    const patterns = {
      bullish: [100, 102, 105, 108, 112, 115, 118, 120, 123, 125],
      bearish: [100, 98, 95, 92, 89, 86, 83, 80, 77, 75],
      sideways: [100, 101, 99, 100, 102, 100, 98, 100, 101, 100],
      volatile: [100, 105, 95, 110, 90, 115, 85, 120, 80, 125],
      gradualUp: [100, 101, 102, 103, 104, 105, 106, 107, 108, 109],
      gradualDown: [100, 99, 98, 97, 96, 95, 94, 93, 92, 91],
      wPattern: [100, 95, 90, 95, 100, 95, 90, 95, 100, 105],
      vPattern: [100, 95, 90, 85, 80, 85, 90, 95, 100, 105],
      invertedV: [100, 105, 110, 115, 120, 115, 110, 105, 100, 95],
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
}

// Helper function to convert index to stock format
export function convertIndexToStock(index) {
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
}

// Helper function to convert portfolio stock to stock format
export function convertPortfolioStockToStock(portfolioStock, stocks) {
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
}

// Update the processCandlestickData function to handle missing data gracefully
export function processCandlestickData(historicalData) {
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
}

// Update the getChartOptions function with better visibility settings
export function getChartOptions() {
  return {
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
  };
} 