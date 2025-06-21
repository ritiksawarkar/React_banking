import React from 'react';
import { FaCoins, FaPlus, FaMinus, FaUniversity } from 'react-icons/fa';

const InvestmentOptionsCard = ({ MOCK_PORTFOLIO, goldPrice, setBuyAsset, setBuyPrice, setShowBuyModal, setSellAsset, setSellQty, setShowSellModal, SGB_LIST, setShowSgbDetail, onRedeem, watchlist, toggleWatchlist }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
    {/* Digital Gold */}
    <div className="bg-white rounded-xl shadow p-6 border border-yellow-100 flex flex-col gap-3 group hover:shadow-lg transition">
      <div className="flex items-center gap-2 mb-2">
        <FaCoins className="text-yellow-500" />
        <span className="font-semibold text-yellow-900">Digital Gold</span>
        <button className="ml-auto text-xs text-blue-500 hover:underline" onClick={() => setShowSgbDetail('digital')}>Details</button>
      </div>
      <div className="flex justify-between items-center">
        <span>Holdings:</span>
        <span className="font-semibold">{MOCK_PORTFOLIO.digitalGold} g</span>
      </div>
      <div className="flex justify-between items-center">
        <span>Current Value:</span>
        <span className="font-semibold">₹{(MOCK_PORTFOLIO.digitalGold * goldPrice).toLocaleString()}</span>
      </div>
      <button
        className="mt-2 py-2 px-4 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg font-semibold flex items-center gap-2 justify-center shadow-md hover:scale-105 transition duration-150"
        title="Buy more Digital Gold"
        onClick={() => { setBuyAsset('Digital Gold'); setBuyPrice(goldPrice); setShowBuyModal(true); }}
      >
        <FaPlus /> Buy More
      </button>
      <button
        className="mt-2 py-2 px-4 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg font-semibold flex items-center gap-2 justify-center shadow-md hover:scale-105 transition border border-gray-300 duration-150"
        title="Sell your Digital Gold holdings"
        onClick={() => { setSellAsset('Digital Gold'); setSellQty(1); setShowSellModal(true); }}
      >
        <FaMinus /> Sell
      </button>
      <button
        className="mt-2 py-2 px-4 bg-yellow-200 hover:bg-yellow-300 text-yellow-900 rounded-lg font-semibold flex items-center gap-2 justify-center shadow-md hover:scale-105 transition border border-yellow-300 duration-150"
        title="Redeem Digital Gold for physical coins or bars"
        onClick={onRedeem}
      >
        Redeem for Coins/Bars
      </button>
    </div>
    {/* SGBs */}
    <div className="bg-white rounded-xl shadow p-6 border border-yellow-100 flex flex-col gap-3 group hover:shadow-lg transition">
      <div className="flex items-center gap-2 mb-2">
        <FaUniversity className="text-purple-500" />
        <span className="font-semibold text-purple-900">Sovereign Gold Bonds (SGBs)</span>
      </div>
      <div className="flex flex-col gap-2">
        {SGB_LIST.map((sgb) => {
          const inWatchlist = watchlist && watchlist.some(w => w.id === sgb.isin && w.type === 'SGB');
          return (
            <div key={sgb.isin} className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-2 rounded-lg border border-gray-100 bg-gray-50 group hover:bg-yellow-50 transition">
              <div className="flex-1">
                <div className="font-semibold text-gray-900 cursor-pointer hover:underline" onClick={() => setShowSgbDetail(sgb)}>{sgb.name}</div>
                <div className="text-xs text-gray-500">Maturity: {sgb.maturity} | Interest: {sgb.interest}% p.a.</div>
              </div>
              <div className="flex flex-col items-end">
                <span className="text-sm font-medium">₹{sgb.issuePrice}</span>
                {sgb.available ? (
                  <button
                    className="mt-1 px-3 py-1 bg-purple-500 hover:bg-purple-600 text-white rounded text-xs font-semibold"
                    onClick={() => { setBuyAsset(sgb.name); setBuyPrice(sgb.issuePrice); setShowBuyModal(true); }}
                  >Buy</button>
                ) : (
                  <span className="mt-1 text-xs text-gray-400">Closed</span>
                )}
                <button
                  className={`mt-1 px-3 py-1 text-xs font-semibold rounded border ${inWatchlist ? 'bg-yellow-100 border-yellow-400 text-yellow-900' : 'bg-white border-gray-200 text-gray-500'}`}
                  onClick={() => toggleWatchlist({ id: sgb.isin, name: sgb.name, type: 'SGB' })}
                >{inWatchlist ? 'Remove from Watchlist' : 'Add to Watchlist'}</button>
              </div>
            </div>
          );
        })}
      </div>
      <div className="flex justify-between items-center mt-2">
        <span>Holdings:</span>
        <span className="font-semibold">{MOCK_PORTFOLIO.sgb} units</span>
      </div>
    </div>
  </div>
);
export default InvestmentOptionsCard; 