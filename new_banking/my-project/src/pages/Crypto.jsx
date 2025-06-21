import React, { useState } from 'react';
import DashboardPageHeader from '../components/DashboardPageHeader';
import DashboardPageFooter from '../components/DashboardPageFooter';
import MarketsList from '../components/MarketsList';
import MyOrdersTable from '../components/MyOrdersTable';
import LatestTransactionsTable from '../components/LatestTransactionsTable';
import ChartArea from '../components/ChartArea';
import QuickBuySellPanel from '../components/QuickBuySellPanel';
import OrderBook from '../components/OrderBook';

const marketData = [
  { symbol: 'BTC', name: 'Bitcoin', price: 2351, change: 1.85, favorite: true },
  { symbol: 'DAO', name: 'DAO', price: 4152, change: -0.09, favorite: false },
  { symbol: 'DASH', name: 'DASH', price: 4125, change: 1.05, favorite: false },
  { symbol: 'ETH', name: 'Ethereum', price: 2350, change: 0.85, favorite: true },
  { symbol: 'LBC', name: 'LBC', price: 1405, change: -1.85, favorite: false },
  { symbol: 'XRP', name: 'XRP', price: 4157, change: -0.05, favorite: false },
];

const myOrders = [
  { rate: 0.029521, amount: 29.42154871, price: 2.154, type: 'Limit' },
  { rate: 0.029521, amount: 29.42154871, price: 2.154, type: 'Limit' },
  { rate: 0.029521, amount: 29.42154871, price: 2.154, type: 'Stop' },
  { rate: 0.029521, amount: 29.42154871, price: 2.154, type: 'Stop' },
];

const transactions = [
  { id: '94c27b06fa0', btc: 1.21526281, time: '2m ago', status: 'Confirmed' },
  { id: '5de67415bfc', btc: 0.0522881, time: '2m ago', status: 'Unconfirmed' },
  { id: '733d15b2bac', btc: 2.0622033, time: '2m ago', status: 'Confirmed' },
  { id: '6793bc4f7ff', btc: 2.43220758, time: '2m ago', status: 'Canceled' },
  { id: '266b697836b', btc: 14.01099798, time: '2m ago', status: 'Canceled' },
  { id: '51935e5c394', btc: 0.3024534, time: '2m ago', status: 'Unconfirmed' },
  { id: 'a3976fa5c6b', btc: 0.20518486, time: '2m ago', status: 'Confirmed' },
];

const orderBookSell = [
  { price: 82.3, btc: 0.15, total: 134.7 },
  { price: 84.0, btc: 2.66, total: 238.3 },
  { price: 85.2, btc: 2.66, total: 238.3 },
  { price: 95.0, btc: 0.10, total: 958.6 },
  { price: 95.9, btc: 0.30, total: 270.4 },
  { price: 97.0, btc: 0.03, total: 30.2 },
];
const orderBookBuy = [
  { price: 82.3, btc: 0.15, total: 134.7 },
  { price: 84.0, btc: 2.66, total: 238.3 },
  { price: 85.2, btc: 2.66, total: 238.3 },
  { price: 95.0, btc: 0.10, total: 958.6 },
  { price: 95.9, btc: 0.30, total: 270.4 },
  { price: 97.0, btc: 0.03, total: 30.2 },
];

const statusColors = {
  Confirmed: 'bg-green-100 text-green-700',
  Unconfirmed: 'bg-yellow-100 text-yellow-700',
  Canceled: 'bg-red-100 text-red-700',
};

const currencyTabs = ['PLN', 'EUR', 'USD', 'BTC'];

const Crypto = () => {
  const [search, setSearch] = useState('');
  const [currency, setCurrency] = useState('PLN');
  const [favoriteMarkets, setFavoriteMarkets] = useState(marketData.filter(m => m.favorite).map(m => m.symbol));
  const [orderTab, setOrderTab] = useState('Market Order');
  const [buyAmount, setBuyAmount] = useState('1.00000000');
  const [buyValue, setBuyValue] = useState('0.03240000');
  const [sellAmount, setSellAmount] = useState('1.00000000');
  const [sellValue, setSellValue] = useState('0.03240000');
  const [selectedSymbol, setSelectedSymbol] = useState('BTCUSDT');

  const handleFavorite = (symbol) => {
    setFavoriteMarkets((prev) =>
      prev.includes(symbol)
        ? prev.filter((s) => s !== symbol)
        : [...prev, symbol]
    );
  };

  const filteredMarkets = marketData.filter(
    (m) =>
      m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.symbol.toLowerCase().includes(search.toLowerCase())
  );

  // Handlers for buy/sell
  const handleBuy = () => {
    alert(`Buy ${buyAmount} ${selectedSymbol} for ${buyValue}`);
    // Here you would call your backend or API to execute the buy
  };
  const handleSell = () => {
    alert(`Sell ${sellAmount} ${selectedSymbol} for ${sellValue}`);
    // Here you would call your backend or API to execute the sell
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <DashboardPageHeader />
      <main className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8 py-8 pt-24 grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Markets List, My Orders, Latest Transactions */}
        <section className="lg:col-span-4 flex flex-col gap-6">
          <div className="bg-white rounded-xl shadow-md p-4">
            <h2 className="font-semibold text-lg mb-4">Markets</h2>
            <MarketsList
              currency={currency}
              setCurrency={setCurrency}
              currencyTabs={currencyTabs}
              search={search}
              setSearch={setSearch}
              filteredMarkets={filteredMarkets}
              favoriteMarkets={favoriteMarkets}
              handleFavorite={handleFavorite}
            />
          </div>
          <div className="bg-white rounded-xl shadow-md p-4">
            <h2 className="font-semibold text-lg mb-4">My Orders</h2>
            <MyOrdersTable myOrders={myOrders} />
          </div>
          <div className="bg-white rounded-xl shadow-md p-4">
            <h2 className="font-semibold text-lg mb-4">Latest Transactions</h2>
            <LatestTransactionsTable transactions={transactions} statusColors={statusColors} />
          </div>
        </section>
        {/* Main Chart & Trading Area */}
        <section className="lg:col-span-8 flex flex-col gap-6">
          <div className="bg-white rounded-xl shadow-md p-4">
            <ChartArea
              price={9125}
              change={-12.04}
              high={9124.00}
              low={4124.00}
              volume={2124.12}
              selectedSymbol={selectedSymbol}
              setSelectedSymbol={setSelectedSymbol}
            />
          </div>
          <div className="bg-white rounded-xl shadow-md p-4">
            <QuickBuySellPanel
              orderTab={orderTab}
              setOrderTab={setOrderTab}
              buyAmount={buyAmount}
              setBuyAmount={setBuyAmount}
              buyValue={buyValue}
              setBuyValue={setBuyValue}
              sellAmount={sellAmount}
              setSellAmount={setSellAmount}
              sellValue={sellValue}
              setSellValue={setSellValue}
              onBuy={handleBuy}
              onSell={handleSell}
              selectedSymbol={selectedSymbol}
            />
          </div>
          <div className="bg-white rounded-xl shadow-md p-4">
            <OrderBook
              orderBookSell={orderBookSell}
              orderBookBuy={orderBookBuy}
              sellTotal={409.2820}
              buyTotal={406.00}
            />
          </div>
        </section>
      </main>
      <DashboardPageFooter />
    </div>
  );
};

export default Crypto; 