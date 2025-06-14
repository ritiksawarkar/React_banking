import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { 
  FaFileInvoiceDollar, FaHistory, FaDownload, 
  FaChartLine, FaCreditCard, FaArrowUp, 
  FaArrowDown, FaCalendarAlt, FaClock, FaUserCircle, FaBuilding,
  FaCheckCircle, FaTimesCircle, FaSpinner, FaPercent, FaLock,
  FaCalendarDay, FaMoneyBillWave, FaUser, FaWallet, FaPiggyBank,
  FaUniversity, FaInfoCircle, FaBolt, FaShieldAlt, FaBell,
  FaWater, FaFire, FaWifi, FaMobile, FaHome
} from 'react-icons/fa';

const BillsPayments = () => {
  const { user } = useAuth();
  const [selectedBill, setSelectedBill] = useState('');
  const [amount, setAmount] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  // Bill Categories
  const billCategories = [
    { id: 'electricity', name: 'Electricity', icon: <FaBolt />, color: 'yellow' },
    { id: 'water', name: 'Water', icon: <FaWater />, color: 'blue' },
    { id: 'gas', name: 'Gas', icon: <FaFire />, color: 'red' },
    { id: 'internet', name: 'Internet', icon: <FaWifi />, color: 'purple' },
    { id: 'mobile', name: 'Mobile', icon: <FaMobile />, color: 'green' },
    { id: 'rent', name: 'Rent', icon: <FaHome />, color: 'indigo' }
  ];

  // Recent Bills
  const recentBills = [
    {
      id: 1,
      category: 'Electricity',
      amount: 2500.00,
      dueDate: '2024-03-25',
      status: 'pending',
      billNumber: 'ELEC-2024-001',
      provider: 'State Power Board'
    },
    {
      id: 2,
      category: 'Internet',
      amount: 999.00,
      dueDate: '2024-03-20',
      status: 'paid',
      billNumber: 'INT-2024-002',
      provider: 'FiberNet Solutions'
    },
    {
      id: 3,
      category: 'Mobile',
      amount: 499.00,
      dueDate: '2024-03-15',
      status: 'overdue',
      billNumber: 'MOB-2024-003',
      provider: 'Telecom Plus'
    }
  ];

  const handlePayment = (e) => {
    e.preventDefault();
    setIsProcessing(true);
    // Simulate API call
    setTimeout(() => {
      setIsProcessing(false);
      // Reset form
      setSelectedBill('');
      setAmount('');
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-50">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-24">
        {/* Page Header */}
        <div className="mb-8">
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-8">
              <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6">
                <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border-4 border-white/30">
                  <FaFileInvoiceDollar className="w-8 h-8 text-white" />
                </div>
                <div className="text-center md:text-left">
                  <h1 className="text-2xl font-bold text-white">Bills & Payments</h1>
                  <p className="text-blue-100 mt-1">Pay your bills securely and on time</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Payment Form */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-all duration-300">
              <div className="px-6 py-4 border-b border-gray-100">
                <h2 className="text-xl font-semibold text-gray-900">Pay Bill</h2>
              </div>
              <div className="p-6">
                <form onSubmit={handlePayment} className="space-y-6">
                  {/* Bill Categories */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {billCategories.map((category) => (
                      <button
                        key={category.id}
                        type="button"
                        onClick={() => setSelectedBill(category.id)}
                        className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                          selectedBill === category.id
                            ? 'border-blue-600 bg-blue-50 text-blue-600'
                            : 'border-gray-200 hover:border-blue-200'
                        }`}
                      >
                        <div className="flex flex-col items-center space-y-2">
                          <div className={`w-10 h-10 rounded-full bg-${category.color}-100 flex items-center justify-center text-${category.color}-600`}>
                            {category.icon}
                          </div>
                          <p className="font-medium">{category.name}</p>
                        </div>
                      </button>
                    ))}
                  </div>

                  {/* Amount */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Amount
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">₹</span>
                      <input
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        placeholder="0.00"
                        className="w-full p-3 pl-8 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        required
                        min="1"
                        step="0.01"
                      />
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isProcessing}
                    className={`w-full py-3 px-4 rounded-lg text-white font-medium transition-all duration-200 ${
                      isProcessing
                        ? 'bg-blue-400 cursor-not-allowed'
                        : 'bg-blue-600 hover:bg-blue-700'
                    }`}
                  >
                    {isProcessing ? (
                      <div className="flex items-center justify-center space-x-2">
                        <FaSpinner className="w-5 h-5 animate-spin" />
                        <span>Processing...</span>
                      </div>
                    ) : (
                      'Pay Now'
                    )}
                  </button>
                </form>
              </div>
            </div>

            {/* Recent Bills */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-all duration-300">
              <div className="px-6 py-4 border-b border-gray-100">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-gray-900">Recent Bills</h2>
                  <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                    View All
                  </button>
                </div>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {recentBills.map((bill) => (
                    <div key={bill.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:shadow-sm transition-all duration-300">
                      <div className="flex items-center space-x-4">
                        <div className={`w-10 h-10 rounded-full ${
                          bill.status === 'paid' ? 'bg-green-100 text-green-600' :
                          bill.status === 'overdue' ? 'bg-red-100 text-red-600' :
                          'bg-yellow-100 text-yellow-600'
                        } flex items-center justify-center`}>
                          <FaFileInvoiceDollar className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{bill.category}</p>
                          <div className="flex items-center space-x-2 mt-1">
                            <span className="text-sm text-gray-500">{bill.provider}</span>
                            <span className="text-sm text-gray-500">•</span>
                            <span className="text-sm text-gray-500">Due: {bill.dueDate}</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-gray-900">
                          ₹{bill.amount.toLocaleString()}
                        </p>
                        <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium mt-1 ${
                          bill.status === 'paid' ? 'bg-green-100 text-green-800' :
                          bill.status === 'overdue' ? 'bg-red-100 text-red-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {bill.status === 'paid' ? (
                            <FaCheckCircle className="w-3 h-3 mr-1" />
                          ) : bill.status === 'overdue' ? (
                            <FaTimesCircle className="w-3 h-3 mr-1" />
                          ) : (
                            <FaClock className="w-3 h-3 mr-1" />
                          )}
                          {bill.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Payment Tips */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-all duration-300">
              <div className="px-6 py-4 border-b border-gray-100">
                <h2 className="text-xl font-semibold text-gray-900">Payment Tips</h2>
              </div>
              <div className="p-6">
                <ul className="space-y-4">
                  <li className="flex items-start space-x-3">
                    <FaCheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                    <p className="text-sm text-gray-600">Set up automatic payments for regular bills</p>
                  </li>
                  <li className="flex items-start space-x-3">
                    <FaCheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                    <p className="text-sm text-gray-600">Keep track of due dates to avoid late fees</p>
                  </li>
                  <li className="flex items-start space-x-3">
                    <FaCheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                    <p className="text-sm text-gray-600">Save payment receipts for future reference</p>
                  </li>
                  <li className="flex items-start space-x-3">
                    <FaCheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                    <p className="text-sm text-gray-600">Enable notifications for upcoming bills</p>
                  </li>
                </ul>
              </div>
            </div>

            {/* Upcoming Bills */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-all duration-300">
              <div className="px-6 py-4 border-b border-gray-100">
                <h2 className="text-xl font-semibold text-gray-900">Upcoming Bills</h2>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                          <FaCalendarDay className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">Internet Bill</p>
                          <p className="text-xs text-gray-500">Due in 5 days</p>
                        </div>
                      </div>
                      <p className="text-sm font-medium text-gray-900">₹999.00</p>
                    </div>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                          <FaCalendarDay className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">Electricity Bill</p>
                          <p className="text-xs text-gray-500">Due in 10 days</p>
                        </div>
                      </div>
                      <p className="text-sm font-medium text-gray-900">₹2,500.00</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default BillsPayments; 