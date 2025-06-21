import React, { useState, useEffect, useMemo } from 'react';
import ReactApexChart from 'react-apexcharts';
import { FaRupeeSign, FaChartLine, FaInfoCircle, FaPlus, FaMinus, FaArrowUp, FaArrowDown, FaUniversity, FaCoins, FaHistory, FaCheckCircle, FaBell, FaDollarSign, FaRegBell, FaRegChartBar, FaRegArrowAltCircleUp, FaRegArrowAltCircleDown, FaRegNewspaper } from 'react-icons/fa';
import DashboardPageHeader from '../components/DashboardPageHeader';
import DashboardPageFooter from '../components/DashboardPageFooter';
import BuyGoldModal from '../components/BuyGoldModal';
import SellGoldModal from '../components/SellGoldModal';
import SGBDetailModal from '../components/SGBDetailModal';
import DigitalGoldDetailModal from '../components/DigitalGoldDetailModal';
import ETFDetailModal from '../components/ETFDetailModal';
import PortfolioOverviewCard from '../components/PortfolioOverviewCard';
import GoldPriceWidget from '../components/GoldPriceWidget';
import QuickActionsCard from '../components/QuickActionsCard';
import InvestmentOptionsCard from '../components/InvestmentOptionsCard';
import ETFsCard from '../components/ETFsCard';
import TransactionHistoryTable from '../components/TransactionHistoryTable';
import NewsSection from '../components/NewsSection';
import EducationalSection from '../components/EducationalSection';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import SIPModal from '../components/SIPModal';
import TaxCalculatorModal from '../components/TaxCalculatorModal';
import PhysicalGoldRedemptionModal from '../components/PhysicalGoldRedemptionModal';

// Mock live gold price data
const GOLD_PRICE_HISTORY = [
  6100, 6120, 6115, 6130, 6150, 6140, 6165, 6170, 6160, 6180, 6195, 6200, 6210, 6225, 6230
];

const SGB_LIST = [
  {
    name: 'SGB 2023-24 Series VIII',
    issuePrice: 6100,
    maturity: 'Mar 2031',
    interest: 2.5,
    available: true,
    isin: 'IN0020230088',
  },
  {
    name: 'SGB 2022-23 Series X',
    issuePrice: 5900,
    maturity: 'Feb 2030',
    interest: 2.5,
    available: false,
    isin: 'IN0020220100',
  },
];

const ETF_LIST = [
  {
    name: 'Nippon India ETF Gold BeES',
    symbol: 'GOLDBEES',
    price: 52.3,
    change: 0.4,
    changePercent: 0.77,
    chart: [51.8, 52.0, 51.9, 52.1, 52.3],
  },
  {
    name: 'HDFC Gold ETF',
    symbol: 'HDFCMFGETF',
    price: 52.7,
    change: -0.2,
    changePercent: -0.38,
    chart: [52.9, 52.8, 52.7, 52.6, 52.7],
  },
];

const MOCK_PORTFOLIO = {
  digitalGold: 5.2, // grams
  sgb: 2, // units
  etf: 10, // units
  totalValue: 32000,
  returns: 7.5,
};

const MOCK_TRANSACTIONS = [
  { type: 'Buy', asset: 'Digital Gold', qty: 2, price: 6100, date: '2024-06-01' },
  { type: 'Buy', asset: 'SGB 2023-24 Series VIII', qty: 1, price: 6100, date: '2024-05-15' },
  { type: 'Buy', asset: 'GOLDBEES', qty: 5, price: 52.1, date: '2024-05-10' },
  { type: 'Sell', asset: 'Digital Gold', qty: 1, price: 6150, date: '2024-04-20' },
];

// Mock news headlines
const MOCK_NEWS = [
  { title: 'Gold prices hit new high amid global uncertainty', date: '2024-06-07', source: 'Reuters' },
  { title: 'SGB Series IX opens for subscription next week', date: '2024-06-06', source: 'Economic Times' },
  { title: 'Gold ETFs see record inflows in May', date: '2024-06-05', source: 'Mint' },
];

const GoldBonds = () => {
  const [goldPrice, setGoldPrice] = useState(GOLD_PRICE_HISTORY[GOLD_PRICE_HISTORY.length - 1]);
  const [goldHistory, setGoldHistory] = useState(GOLD_PRICE_HISTORY);
  const [showBuyModal, setShowBuyModal] = useState(false);
  const [buyQty, setBuyQty] = useState(1);
  const [buyAsset, setBuyAsset] = useState('Digital Gold');
  const [buyPrice, setBuyPrice] = useState(goldPrice);
  const [buyStatus, setBuyStatus] = useState(null);
  const [currency, setCurrency] = useState('INR');
  const [priceAlert, setPriceAlert] = useState('');
  const [alertActive, setAlertActive] = useState(false);
  const [showSellModal, setShowSellModal] = useState(false);
  const [sellAsset, setSellAsset] = useState('Digital Gold');
  const [sellQty, setSellQty] = useState(1);
  const [sellStatus, setSellStatus] = useState(null);
  const [showSgbDetail, setShowSgbDetail] = useState(null);
  const [showEtfDetail, setShowEtfDetail] = useState(null);
  const usdRate = 83.2; // Mock USD/INR rate
  const priceSource = 'IBJA';
  const [showSIPModal, setShowSIPModal] = useState(false);
  const [sips, setSips] = useState([]);
  const [showTaxModal, setShowTaxModal] = useState(false);
  const [selectedRange, setSelectedRange] = useState('1M');
  const [watchlist, setWatchlist] = useState([]);
  const [showRedemptionModal, setShowRedemptionModal] = useState(false);

  // Simulate live gold price
  useEffect(() => {
    const interval = setInterval(() => {
      setGoldPrice(prev => {
        const change = (Math.random() - 0.5) * 10;
        const newPrice = Math.max(6000, prev + change);
        setGoldHistory(h => [...h.slice(-14), newPrice]);
        return newPrice;
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (alertActive && priceAlert && Number(priceAlert) > 0) {
      if (goldPrice >= Number(priceAlert)) {
        alert(`Gold price has reached ₹${goldPrice.toFixed(2)}!`);
        toast.success(`Gold price has reached ₹${goldPrice.toFixed(2)}!`);
        if (window.Notification && Notification.permission === 'granted') {
          new Notification('Gold Price Alert', {
            body: `Gold price has reached ₹${goldPrice.toFixed(2)}!`,
          });
        }
        setAlertActive(false);
        setPriceAlert('');
      }
    }
  }, [goldPrice, alertActive, priceAlert]);

  // Portfolio analytics
  const avgBuyPrice = 6100; // mock
  const totalInvested = 30000; // mock
  const profitLoss = MOCK_PORTFOLIO.totalValue - totalInvested;

  // Portfolio value over time chart
  const portfolioHistory = useMemo(() => [32000, 32200, 32100, 32500, 32700, 32600, 32800], []);
  const portfolioChart = useMemo(() => ({
    options: {
      chart: { type: 'area', toolbar: { show: false } },
      stroke: { curve: 'smooth', width: 2, colors: ['#FFD700'] },
      fill: { type: 'gradient', gradient: { shadeIntensity: 0.7, opacityFrom: 0.5, opacityTo: 0, stops: [0, 100] } },
      grid: { show: false },
      xaxis: { show: false },
      yaxis: { show: false },
      tooltip: { enabled: false },
      dataLabels: { enabled: false },
    },
    series: [{ data: portfolioHistory }],
  }), [portfolioHistory]);

  // Currency conversion
  const displayGoldPrice = currency === 'INR' ? goldPrice : goldPrice / usdRate;
  const displayGoldUnit = currency === 'INR' ? '₹' : '$';

  // Buy handler
  const handleBuy = () => {
    if (buyQty < 1) {
      toast.error('Please enter a valid quantity!');
      return;
    }
    setBuyStatus('processing');
    setTimeout(() => {
      setBuyStatus('success');
      toast.success('Order placed successfully!');
      setTimeout(() => {
        setShowBuyModal(false);
        setBuyStatus(null);
        setBuyQty(1);
      }, 1200);
    }, 1000);
  };

  // Portfolio pie chart
  const pieData = useMemo(() => {
    return {
      series: [
        MOCK_PORTFOLIO.digitalGold * goldPrice,
        MOCK_PORTFOLIO.sgb * goldPrice,
        MOCK_PORTFOLIO.etf * goldPrice * 0.1,
      ],
      options: {
        labels: ['Digital Gold', 'SGBs', 'Gold ETFs'],
        colors: ['#FFD700', '#A78BFA', '#60A5FA'],
        legend: { position: 'bottom' },
        dataLabels: { enabled: true },
      },
    };
  }, [goldPrice]);

  // Helper to get filtered gold history
  const getFilteredGoldHistory = () => {
    switch (selectedRange) {
      case '1W': return goldHistory.slice(-7);
      case '1M': return goldHistory.slice(-30);
      case '3M': return goldHistory.slice(-90);
      case '1Y': return goldHistory.slice(-365);
      case 'All': return goldHistory;
      default: return goldHistory.slice(-30);
    }
  };

  // Helper to check if item is in watchlist
  const isInWatchlist = (item) => watchlist.some(w => w.id === item.id && w.type === item.type);
  // Add/remove from watchlist
  const toggleWatchlist = (item) => {
    setWatchlist(prev => isInWatchlist(item)
      ? prev.filter(w => !(w.id === item.id && w.type === item.type))
      : [...prev, item]
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-white">
      <DashboardPageHeader />
      <div className="h-12" />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-yellow-800 mb-6 flex items-center gap-3">
          <FaCoins className="text-yellow-500" /> Gold & Bonds
        </h1>
        {/* Live Gold Price Widget */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div>
            <div className="flex gap-2 mb-2">
              {['1W', '1M', '3M', '1Y', 'All'].map(r => (
                <button
                  key={r}
                  className={`px-2 py-1 rounded text-xs font-semibold border ${selectedRange === r ? 'bg-yellow-100 border-yellow-400' : 'bg-white border-gray-200'} transition`}
                  onClick={() => setSelectedRange(r)}
                >{r}</button>
              ))}
            </div>
            <GoldPriceWidget
              displayGoldUnit={displayGoldUnit}
              displayGoldPrice={displayGoldPrice}
              currency={currency}
              setCurrency={setCurrency}
              usdRate={usdRate}
              priceSource={priceSource}
              goldHistory={getFilteredGoldHistory()}
              priceAlert={priceAlert}
              setPriceAlert={setPriceAlert}
              alertActive={alertActive}
              setAlertActive={setAlertActive}
            />
          </div>
          {/* Portfolio Overview */}
          <div>
            <div className="flex gap-2 mb-2">
              <button
                className="px-3 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 text-xs font-semibold"
                onClick={() => setShowSIPModal(true)}
              >Set Up SIP</button>
              <button
                className="px-3 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 text-xs font-semibold"
                onClick={() => setShowTaxModal(true)}
              >Tax Calculator</button>
            </div>
            <PortfolioOverviewCard
              MOCK_PORTFOLIO={MOCK_PORTFOLIO}
              avgBuyPrice={avgBuyPrice}
              totalInvested={totalInvested}
              profitLoss={profitLoss}
              pieData={pieData}
              portfolioChart={portfolioChart}
            />
            {sips.length > 0 && (
              <div className="mt-3 bg-yellow-50 rounded-lg p-3 text-xs text-yellow-900">
                <b>Active SIPs:</b>
                <ul className="list-disc pl-5 mt-1">
                  {sips.map((sip, idx) => (
                    <li key={idx}>
                      ₹{sip.amount} in {sip.asset} every {sip.frequency.toLowerCase()} (from {sip.startDate})
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          {/* Quick Actions */}
          <QuickActionsCard
            setBuyAsset={setBuyAsset}
            setBuyPrice={setBuyPrice}
            setShowBuyModal={setShowBuyModal}
            goldPrice={goldPrice}
            SGB_LIST={SGB_LIST}
            ETF_LIST={ETF_LIST}
            setSellAsset={setSellAsset}
            setSellQty={setSellQty}
            setShowSellModal={setShowSellModal}
          />
        </div>
        {/* Watchlist Section */}
        {watchlist.length > 0 && (
          <div className="mb-6">
            <div className="bg-white rounded-xl shadow p-4 border border-yellow-100">
              <div className="font-semibold text-yellow-900 mb-2">Watchlist</div>
              <ul className="flex flex-wrap gap-3">
                {watchlist.map((item, idx) => (
                  <li key={idx} className="px-3 py-2 rounded bg-yellow-50 border border-yellow-200 text-xs text-yellow-900 font-semibold flex items-center gap-2">
                    {item.name} <span className="text-gray-400">({item.type})</span>
                    <button className="ml-2 text-red-500 hover:underline" onClick={() => toggleWatchlist(item)}>Remove</button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
        {/* Investment Options */}
        <InvestmentOptionsCard
          MOCK_PORTFOLIO={MOCK_PORTFOLIO}
          goldPrice={goldPrice}
          setBuyAsset={setBuyAsset}
          setBuyPrice={setBuyPrice}
          setShowBuyModal={setShowBuyModal}
          setSellAsset={setSellAsset}
          setSellQty={setSellQty}
          setShowSellModal={setShowSellModal}
          SGB_LIST={SGB_LIST}
          setShowSgbDetail={setShowSgbDetail}
          onRedeem={() => setShowRedemptionModal(true)}
          watchlist={watchlist}
          toggleWatchlist={toggleWatchlist}
        />
        {/* ETFs & Transaction History */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Gold ETFs */}
          <ETFsCard
            ETF_LIST={ETF_LIST}
            MOCK_PORTFOLIO={MOCK_PORTFOLIO}
            setShowEtfDetail={setShowEtfDetail}
            setBuyAsset={setBuyAsset}
            setBuyPrice={setBuyPrice}
            setShowBuyModal={setShowBuyModal}
            setSellAsset={setSellAsset}
            setSellQty={setSellQty}
            setShowSellModal={setShowSellModal}
            watchlist={watchlist}
            toggleWatchlist={toggleWatchlist}
          />
          {/* Transaction History */}
          <div>
            <div className="flex gap-2 mb-2">
              <button
                className="px-3 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 text-xs font-semibold transition-transform duration-150 hover:scale-105"
                title="Download your transaction history as a PDF file"
                onClick={() => {
                  const doc = new jsPDF();
                  autoTable(doc, {
                    head: [['No.', 'Type', 'Asset', 'Qty', 'Price', 'Date']],
                    body: MOCK_TRANSACTIONS.map((tx, idx) => [
                      idx + 1,
                      tx.type,
                      tx.asset,
                      tx.qty,
                      `₹${tx.price}`,
                      tx.date
                    ]),
                  });
                  doc.save('transactions.pdf');
                }}
              >Export as PDF</button>
              <button
                className="px-3 py-2 bg-green-500 text-white rounded hover:bg-green-600 text-xs font-semibold transition-transform duration-150 hover:scale-105"
                title="Download your transaction history as a CSV file"
                onClick={() => {
                  const csvRows = [
                    ['No.', 'Type', 'Asset', 'Qty', 'Price', 'Date'],
                    ...MOCK_TRANSACTIONS.map((tx, idx) => [
                      idx + 1,
                      tx.type,
                      tx.asset,
                      tx.qty,
                      `₹${tx.price}`,
                      tx.date
                    ])
                  ];
                  const csvContent = csvRows.map(row => row.join(',')).join('\n');
                  const blob = new Blob([csvContent], { type: 'text/csv' });
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement('a');
                  a.href = url;
                  a.download = 'transactions.csv';
                  a.click();
                  URL.revokeObjectURL(url);
                }}
              >Export as CSV</button>
            </div>
            <TransactionHistoryTable MOCK_TRANSACTIONS={MOCK_TRANSACTIONS} />
          </div>
        </div>
        {/* News Section */}
        <NewsSection MOCK_NEWS={MOCK_NEWS} />
        {/* Educational Section */}
        <EducationalSection />
        {/* Buy Modal */}
        <BuyGoldModal
          show={showBuyModal}
          onClose={() => setShowBuyModal(false)}
          onBuy={handleBuy}
          buyStatus={buyStatus}
          buyAsset={buyAsset}
          buyQty={buyQty}
          setBuyQty={setBuyQty}
          buyPrice={buyPrice}
          displayGoldUnit={displayGoldUnit}
          totalAmount={buyQty * buyPrice}
        />
        {/* Sell Modal */}
        <SellGoldModal
          show={showSellModal}
          onClose={() => setShowSellModal(false)}
          onSell={() => {
            if (sellQty > (sellAsset === 'Digital Gold' ? MOCK_PORTFOLIO.digitalGold : MOCK_PORTFOLIO.etf)) {
              setSellStatus('error');
              toast.error('Insufficient holdings!');
              setTimeout(() => setSellStatus(null), 1500);
              return;
            }
            setSellStatus('processing');
            setTimeout(() => {
              setSellStatus('success');
              toast.success('Order placed successfully!');
              setTimeout(() => {
                setShowSellModal(false);
                setSellStatus(null);
                setSellQty(1);
              }, 1200);
            }, 1000);
          }}
          sellStatus={sellStatus}
          sellAsset={sellAsset}
          sellQty={sellQty}
          setSellQty={setSellQty}
          sellPrice={sellAsset === 'Digital Gold' ? goldPrice : ETF_LIST[0].price}
          displayGoldUnit={displayGoldUnit}
          totalAmount={sellQty * (sellAsset === 'Digital Gold' ? goldPrice : ETF_LIST[0].price)}
          maxQty={sellAsset === 'Digital Gold' ? MOCK_PORTFOLIO.digitalGold : MOCK_PORTFOLIO.etf}
          availableQty={sellAsset === 'Digital Gold' ? MOCK_PORTFOLIO.digitalGold : MOCK_PORTFOLIO.etf}
        />
        {/* SGB Detail Modal */}
        <SGBDetailModal
          show={!!showSgbDetail && showSgbDetail !== 'digital'}
          onClose={() => setShowSgbDetail(null)}
          sgbDetail={showSgbDetail && showSgbDetail !== 'digital' ? showSgbDetail : null}
        />
        {/* Digital Gold Detail Modal */}
        <DigitalGoldDetailModal
          show={showSgbDetail === 'digital'}
          onClose={() => setShowSgbDetail(null)}
        />
        {/* ETF Detail Modal */}
        <ETFDetailModal
          show={!!showEtfDetail}
          onClose={() => setShowEtfDetail(null)}
          etfDetail={showEtfDetail}
        />
        <SIPModal
          show={showSIPModal}
          onClose={() => setShowSIPModal(false)}
          onSubmit={sip => {
            setSips(prev => [...prev, sip]);
            setShowSIPModal(false);
            toast.success('SIP set up successfully!');
          }}
        />
        <TaxCalculatorModal show={showTaxModal} onClose={() => setShowTaxModal(false)} />
        <PhysicalGoldRedemptionModal
          show={showRedemptionModal}
          onClose={() => setShowRedemptionModal(false)}
          onSubmit={() => {
            setShowRedemptionModal(false);
            toast.success('Redemption request placed!');
          }}
        />
      </main>
      <DashboardPageFooter />
      <ToastContainer position="top-right" autoClose={2000} hideProgressBar newestOnTop closeOnClick pauseOnFocusLoss draggable pauseOnHover />
    </div>
  );
};

export default GoldBonds; 