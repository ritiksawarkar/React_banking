import React, { useState } from 'react';
import DashboardPageHeader from '../components/DashboardPageHeader';
import DashboardPageFooter from '../components/DashboardPageFooter';

const RD_INTEREST_RATE = 0.065; // 6.5% p.a. for demo

function calculateRDMaturity(monthlyDeposit, tenureMonths, annualRate = RD_INTEREST_RATE) {
  const monthlyRate = annualRate / 12;
  let maturityAmount = 0;

  for (let i = 0; i < tenureMonths; i++) {
    maturityAmount += monthlyDeposit * Math.pow(1 + monthlyRate, tenureMonths - i);
  }
  return Math.round(maturityAmount);
}

const RecurringDeposits = () => {
  const [monthlyAmount, setMonthlyAmount] = useState(5000);
  const [tenureMonths, setTenureMonths] = useState(12);

  const maturityAmount = calculateRDMaturity(monthlyAmount, tenureMonths);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-white to-purple-50 flex flex-col ">
      <DashboardPageHeader />

      {/* Hero Section */}
      <main className="flex-1 flex flex-col md:flex-row items-center justify-center px-6 py-12 max-w-6xl mx-auto w-full gap-10 mt-16">
        {/* Left: Text and Calculator */}
        <div className="flex-1 max-w-xl">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
            Invest regularly with <br />
            <span className="text-blue-600 text-4xl md:text-5xl font-extrabold">Bharat<span className="text-orange-500">RD</span></span> and earn <br />
            <span className="text-green-600 text-4xl md:text-5xl font-extrabold">₹{maturityAmount.toLocaleString()}</span> at maturity
          </h1>
          <p className="text-gray-600 mb-6">
            A Recurring Deposit (RD) helps you save regularly over a period of time, earning interest on your deposits. Calculate your potential earnings easily.
          </p>
          {/* Monthly Deposit Slider */}
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">Monthly Deposit Amount: ₹{monthlyAmount.toLocaleString()}</label>
            <input
              type="range"
              min={1000}
              max={50000}
              step={500}
              value={monthlyAmount}
              onChange={e => setMonthlyAmount(Number(e.target.value))}
              className="w-full accent-purple-700"
            />
            <div className="flex justify-between text-gray-500 text-xs mt-1">
              <span>₹1,000</span>
              <span>₹50,000</span>
            </div>
          </div>

          {/* Tenure Slider */}
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">Tenure: {tenureMonths} Months</label>
            <input
              type="range"
              min={6}
              max={60}
              step={6}
              value={tenureMonths}
              onChange={e => setTenureMonths(Number(e.target.value))}
              className="w-full accent-purple-700"
            />
            <div className="flex justify-between text-gray-500 text-xs mt-1">
              <span>6 Months</span>
              <span>60 Months</span>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-md border border-gray-200">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Maturity Details</h2>
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-600">Total Invested:</span>
              <span className="text-gray-800 font-semibold">₹{(monthlyAmount * tenureMonths).toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-600">Interest Earned:</span>
              <span className="text-green-600 font-semibold">₹{(maturityAmount - (monthlyAmount * tenureMonths)).toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center pt-2 border-t border-gray-200">
              <span className="text-lg font-bold text-gray-900">Total Maturity Amount:</span>
              <span className="text-lg font-bold text-green-600">₹{maturityAmount.toLocaleString()}</span>
            </div>
          </div>
        </div>
        {/* Right: Placeholder Image or Info */}
        <div className="flex-1 flex justify-center items-center">
          <div className="p-6 bg-purple-50 rounded-xl shadow-lg text-center max-w-xs">
            <h3 className="text-lg font-bold text-purple-800 mb-2">Why choose BharatRD?</h3>
            <ul className="text-gray-700 text-sm list-disc list-inside text-left space-y-1">
              <li>Flexible monthly deposits</li>
              <li>Competitive interest rates</li>
              <li>Short to long term tenures</li>
              <li>Easy online management</li>
              <li>Secure and trusted platform</li>
            </ul>
            <button className="mt-4 px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors duration-200 shadow">
              Open an RD Account
            </button>
          </div>
        </div>
      </main>

      {/* Information Section */}
      <section className="w-full py-12 bg-white/80 border-t">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">Start your disciplined savings journey today!</h3>
          <p className="text-gray-600 mb-6">Recurring Deposits are an excellent way to build a corpus for your future goals. Set up a standing instruction for automatic deductions from your linked account.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
              <h4 className="font-bold text-gray-800 mb-2">Set Your Goal</h4>
              <p className="text-gray-600 text-sm">Define your financial objectives, whether it's a new car, a vacation, or a down payment for a home.</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
              <h4 className="font-bold text-gray-800 mb-2">Choose Your Plan</h4>
              <p className="text-gray-600 text-sm">Select a monthly deposit amount and tenure that fits your budget and timeline.</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
              <h4 className="font-bold text-gray-800 mb-2">Watch Your Savings Grow</h4>
              <p className="text-gray-600 text-sm">Benefit from competitive interest rates and see your wealth accumulate over time.</p>
            </div>
          </div>
        </div>
      </section>

      <DashboardPageFooter />
    </div>
  );
};

export default RecurringDeposits; 