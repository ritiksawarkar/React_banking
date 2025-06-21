import React from 'react';
import { FaChartLine, FaCoins, FaExchangeAlt, FaListAlt, FaHistory, FaStar, FaCog, FaUserCircle } from 'react-icons/fa';

const navItems = [
  { icon: <FaChartLine />, label: 'Markets', active: true },
  { icon: <FaCoins />, label: 'Crypto' },
  { icon: <FaExchangeAlt />, label: 'Orders' },
  { icon: <FaListAlt />, label: 'Order Book' },
  { icon: <FaHistory />, label: 'Transactions' },
  { icon: <FaStar />, label: 'Favorites' },
  { icon: <FaCog />, label: 'Settings' },
];

const CryptoSidebar = () => {
  return (
    <aside className="hidden md:flex flex-col items-center bg-[#1a2233] text-white w-16 py-6 space-y-6 min-h-screen border-r border-gray-800">
      <div className="mb-8">
        <FaCoins className="w-8 h-8 text-yellow-400" />
      </div>
      <nav className="flex flex-col gap-6 flex-1">
        {navItems.map((item, idx) => (
          <button
            key={item.label}
            className={`flex flex-col items-center justify-center w-12 h-12 rounded-lg hover:bg-[#232c43] transition ${item.active ? 'bg-[#232c43] text-yellow-400' : 'text-gray-300'}`}
            title={item.label}
          >
            {item.icon}
          </button>
        ))}
      </nav>
      <div className="mt-auto mb-2">
        <button className="flex items-center justify-center w-12 h-12 rounded-full bg-[#232c43] hover:bg-[#2c3654] transition">
          <FaUserCircle className="w-7 h-7 text-gray-400" />
        </button>
      </div>
    </aside>
  );
};

export default CryptoSidebar; 