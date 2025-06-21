import React from 'react';
import { FaCoins, FaStar, FaRegStar, FaArrowUp, FaArrowDown, FaSearch } from 'react-icons/fa';
import PropTypes from 'prop-types';

const CRYPTO_LOGOS = {
  BTC: '/crypto-logos/bitcoin-btc-logo.png',
  ETH: '/crypto-logos/ethereum-eth-logo.png',
  BNB: '/crypto-logos/binance-coin-bnb-logo.png',
  XRP: '/crypto-logos/xrp-xrp-logo.png',
  DASH: '/crypto-logos/dash-dash-logo.png',
  DAO: '/crypto-logos/dao-dao-logo.png',
  LBC: '/crypto-logos/lbry-credits-lbc-logo.png',
  GENERIC: '/crypto-logos/generic-coin-logo.png',
};

const MarketsList = ({
  currency,
  setCurrency,
  currencyTabs,
  search,
  setSearch,
  filteredMarkets,
  favoriteMarkets,
  handleFavorite
}) => (
  <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6 mb-4">
    <div className="flex items-center justify-between mb-3">
      <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2"><FaCoins className="text-yellow-500" /> Markets : ETH / {currency}</h2>
      <div className="flex gap-1">
        {currencyTabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setCurrency(tab)}
            className={`px-4 py-1 rounded-full text-xs font-medium shadow-sm ${currency === tab ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'} transition`}
          >
            {tab}
          </button>
        ))}
      </div>
    </div>
    <div className="flex items-center mb-4 border rounded px-2 py-1 bg-gray-50">
      <FaSearch className="text-gray-400 mr-2" />
      <input
        type="text"
        placeholder="Search..."
        value={search}
        onChange={e => setSearch(e.target.value)}
        className="w-full px-2 py-1 bg-transparent border-none outline-none text-sm"
      />
    </div>
    <table className="min-w-full text-xs">
      <thead>
        <tr className="text-gray-500 border-b border-gray-200">
          <th className="py-2 px-2 text-left">Name</th>
          <th className="py-2 px-2 text-right">Price</th>
          <th className="py-2 px-2 text-right">Change</th>
          <th className="py-2 px-2 text-center">Fav</th>
        </tr>
      </thead>
      <tbody>
        {filteredMarkets.map((m, idx) => (
          <tr key={m.symbol} className={`${idx % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-blue-50 border-b border-gray-100 transition font-semibold`}>
            <td className="py-2 px-2 text-left font-bold text-gray-800 flex items-center gap-2">
              <img
                src={CRYPTO_LOGOS[m.symbol] || CRYPTO_LOGOS.GENERIC}
                alt={m.symbol}
                className="inline-block w-5 h-5 rounded-full mr-1"
                title={m.name}
              />
              <span title={m.name}>{m.symbol}</span>
            </td>
            <td className="py-2 px-2 text-right">{m.price.toFixed(2)}</td>
            <td className={`py-2 px-2 text-right font-medium ${m.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>{m.change >= 0 ? <FaArrowUp className="inline" /> : <FaArrowDown className="inline" />} {Math.abs(m.change).toFixed(2)}%</td>
            <td className="py-2 px-2 text-center">
              <button onClick={() => handleFavorite(m.symbol)}>
                {favoriteMarkets.includes(m.symbol) ? <FaStar className="text-yellow-400 w-5 h-5" /> : <FaRegStar className="text-gray-400 w-5 h-5" />}
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

MarketsList.propTypes = {
  currency: PropTypes.string.isRequired,
  setCurrency: PropTypes.func.isRequired,
  currencyTabs: PropTypes.arrayOf(PropTypes.string).isRequired,
  search: PropTypes.string.isRequired,
  setSearch: PropTypes.func.isRequired,
  filteredMarkets: PropTypes.arrayOf(PropTypes.shape({
    symbol: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    change: PropTypes.number.isRequired,
    favorite: PropTypes.bool.isRequired,
  })).isRequired,
  favoriteMarkets: PropTypes.arrayOf(PropTypes.string).isRequired,
  handleFavorite: PropTypes.func.isRequired,
};

export default MarketsList; 