import React from 'react';
import { FaPlus, FaCoins, FaUniversity, FaChartLine, FaMinus } from 'react-icons/fa';

const QuickActionsCard = ({ setBuyAsset, setBuyPrice, setShowBuyModal, goldPrice, SGB_LIST, ETF_LIST, setSellAsset, setSellQty, setShowSellModal }) => (
  <div className="bg-white rounded-xl shadow p-6 flex flex-col gap-4 border border-yellow-100">
    <div className="flex items-center gap-2 mb-2">
      <FaPlus className="text-green-500" />
      <span className="font-semibold text-green-900">Quick Actions</span>
    </div>
    <button
      className="w-full py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg font-semibold flex items-center justify-center gap-2 shadow-md hover:scale-105 transition duration-150"
      title="Buy Digital Gold instantly"
      onClick={() => { setBuyAsset('Digital Gold'); setBuyPrice(goldPrice); setShowBuyModal(true); }}
    >
      <FaCoins /> Buy Digital Gold
    </button>
    <button
      className="w-full py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-lg font-semibold flex items-center justify-center gap-2 shadow-md hover:scale-105 transition duration-150"
      title="Buy Sovereign Gold Bonds (SGB)"
      onClick={() => { setBuyAsset(SGB_LIST[0].name); setBuyPrice(SGB_LIST[0].issuePrice); setShowBuyModal(true); }}
    >
      <FaUniversity /> Buy SGB
    </button>
    <button
      className="w-full py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-semibold flex items-center justify-center gap-2 shadow-md hover:scale-105 transition duration-150"
      title="Buy Gold ETF instantly"
      onClick={() => { setBuyAsset(ETF_LIST[0].symbol); setBuyPrice(ETF_LIST[0].price); setShowBuyModal(true); }}
    >
      <FaChartLine /> Buy Gold ETF
    </button>
    <button
      className="w-full py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg font-semibold flex items-center justify-center gap-2 shadow-md hover:scale-105 transition border border-gray-300 duration-150"
      title="Sell your Digital Gold holdings"
      onClick={() => { setSellAsset('Digital Gold'); setSellQty(1); setShowSellModal(true); }}
    >
      <FaMinus /> Sell Digital Gold
    </button>
    <button
      className="w-full py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg font-semibold flex items-center justify-center gap-2 shadow-md hover:scale-105 transition border border-gray-300 duration-150"
      title="Sell your Gold ETF holdings"
      onClick={() => { setSellAsset(ETF_LIST[0].symbol); setSellQty(1); setShowSellModal(true); }}
    >
      <FaMinus /> Sell Gold ETF
    </button>
  </div>
);
export default QuickActionsCard; 