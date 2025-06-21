import React from 'react';
import { FaInfoCircle } from 'react-icons/fa';

const EducationalSection = () => (
  <div className="bg-white rounded-xl shadow p-6 border border-yellow-100 mb-8">
    <div className="flex items-center gap-2 mb-2">
      <FaInfoCircle className="text-yellow-500" />
      <span className="font-semibold text-yellow-900">About Gold & Bond Investments</span>
    </div>
    <ul className="list-disc pl-6 text-sm text-gray-700 space-y-1">
      <li><b>Digital Gold</b> allows you to buy gold online, stored securely by the provider. You can buy/sell in small quantities.</li>
      <li><b>Sovereign Gold Bonds (SGBs)</b> are government securities denominated in grams of gold, offering 2.5% annual interest and redemption at market value.</li>
      <li><b>Gold ETFs</b> are exchange-traded funds tracking gold prices, offering liquidity and ease of trading.</li>
      <li>Gold is considered a hedge against inflation but can be volatile. Diversify your investments.</li>
      <li>Check tax implications before investing in gold or bonds.</li>
    </ul>
  </div>
);
export default EducationalSection; 