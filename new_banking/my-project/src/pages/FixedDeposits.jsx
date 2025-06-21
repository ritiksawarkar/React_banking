import React, { useState } from 'react';
import southIndianBankLogo from '../assets/partnerBanksLogo/South Indian Bank.jpg';
import suryodayBankLogo from '../assets/partnerBanksLogo/Suryoday Bank.png';
import utkarshBankLogo from '../assets/partnerBanksLogo/Utkarsh Bank.jpg';
import shivalikBankLogo from '../assets/partnerBanksLogo/Shivalik Bank.png';
import northEastBankLogo from '../assets/partnerBanksLogo/North East Small Finance Bank.png';
import rightSectionImage from '../assets/partnerBanksLogo/right section image.jpg';
import DashboardPageHeader from '../components/DashboardPageHeader';
import DashboardPageFooter from '../components/DashboardPageFooter';

const partnerBanks = [
  { name: 'South Indian Bank', logo: southIndianBankLogo },
  { name: 'Suryoday', logo: suryodayBankLogo },
  { name: 'Utkarsh', logo: utkarshBankLogo },
  { name: 'Shivalik', logo: shivalikBankLogo },
  { name: 'North East', logo: northEastBankLogo },
];

const FD_INTEREST = 0.072; // 7.2% p.a. for demo
const FD_YEARS = 5; // 5 years for demo

function calculateMaturity(principal, rate = FD_INTEREST, years = FD_YEARS) {
  // Compound interest annually
  return Math.round(principal * Math.pow(1 + rate, years));
}

const FixedDeposits = () => {
  const [amount, setAmount] = useState(400000);
  const maturity = calculateMaturity(amount);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-blue-50 flex flex-col ">
      <DashboardPageHeader />

      {/* Hero Section */}
      <main className="flex-1 flex flex-col md:flex-row items-center justify-center px-6 py-12 max-w-6xl mx-auto w-full gap-10 mt-16">
        {/* Left: Text and Calculator */}
        <div className="flex-1 max-w-xl">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
            Your savings could earn <br />
            <span className="text-green-600 text-4xl md:text-5xl font-extrabold">₹{maturity.toLocaleString()}</span> on <span className="text-blue-800">FinVerse<span className="text-orange-500">FD</span></span>
          </h1>
          <p className="text-gray-600 mb-6">
            Calculating the maturity amount of an FD can be a complicated and time-consuming process. An online FD calculator enables one to figure it without breaking a sweat.
          </p>
          {/* Slider */}
          <div className="mb-2">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-gray-500 text-sm">1,00,000</span>
              <input
                type="range"
                min={100000}
                max={1000000}
                step={10000}
                value={amount}
                onChange={e => setAmount(Number(e.target.value))}
                className="flex-1 accent-blue-700"
              />
              <span className="text-gray-500 text-sm">10,00,000</span>
            </div>
            <div className="flex justify-center">
              <span className="bg-blue-900 text-white px-4 py-1 rounded-full font-semibold text-lg shadow">₹{amount.toLocaleString()}</span>
            </div>
          </div>
        </div>
        {/* Right: Image */}
        <div className="flex-1 flex justify-center items-center">
          <img
            src={rightSectionImage}
            alt="FD Illustration"
            className="rounded-xl shadow-lg w-full max-w-xs object-cover"
          />
        </div>
      </main>

      {/* Partner Banks */}
      <section className="w-full py-8 bg-white/80 border-t">
        <div className="max-w-4xl mx-auto flex flex-col items-center">
          <h3 className="text-gray-500 font-semibold mb-4 tracking-widest text-xs">PARTNER BANKS</h3>
          <div className="flex flex-wrap justify-center gap-8 items-center">
            {partnerBanks.map(bank => (
              <img
                key={bank.name}
                src={bank.logo}
                alt={bank.name}
                className="h-10 object-contain hover:scale-110 transition duration-200"
                title={bank.name}
              />
            ))}
          </div>
        </div>
      </section>
      <DashboardPageFooter />
    </div>
  );
};

export default FixedDeposits; 