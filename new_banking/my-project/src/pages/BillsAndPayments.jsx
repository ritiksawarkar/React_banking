import React, { useState } from 'react';
import { 
  FaFileInvoiceDollar, FaPlus, FaCalendarAlt, FaHistory,
  FaLightbulb, FaMobileAlt, FaTv, FaHome, FaCar,
  FaCreditCard, FaDownload, FaPrint, FaTimes,
  FaCheckCircle, FaExclamationCircle, FaClock
} from 'react-icons/fa';
import DashboardPageHeader from '../components/DashboardPageHeader';
import DashboardPageFooter from '../components/DashboardPageFooter';

const BillsAndPayments = () => {
  const [selectedBill, setSelectedBill] = useState(null);
  const [showAddBill, setShowAddBill] = useState(false);
  const [activeTab, setActiveTab] = useState('upcoming');

  // Sample bills data
  const bills = [
    {
      id: 1,
      type: 'electricity',
      provider: 'State Electricity Board',
      amount: 2500.00,
      dueDate: '2024-03-25',
      status: 'pending',
      billNumber: 'EL123456',
      consumption: '450 units',
      previousReading: '12345',
      currentReading: '12795',
      billDate: '2024-03-15',
      category: 'utilities'
    },
    {
      id: 2,
      type: 'mobile',
      provider: 'Airtel',
      amount: 799.00,
      dueDate: '2024-03-20',
      status: 'paid',
      billNumber: 'MB789012',
      plan: 'Unlimited 5G',
      dataUsed: '45GB',
      billDate: '2024-03-10',
      category: 'mobile'
    },
    {
      id: 3,
      type: 'dth',
      provider: 'Tata Sky',
      amount: 499.00,
      dueDate: '2024-03-22',
      status: 'scheduled',
      billNumber: 'DTH345678',
      plan: 'HD Premium',
      billDate: '2024-03-12',
      category: 'entertainment'
    },
    {
      id: 4,
      type: 'water',
      provider: 'Municipal Corporation',
      amount: 800.00,
      dueDate: '2024-03-28',
      status: 'pending',
      billNumber: 'WT901234',
      consumption: '20 KL',
      previousReading: '45678',
      currentReading: '45878',
      billDate: '2024-03-14',
      category: 'utilities'
    }
  ];

  // Filter bills based on status
  const filteredBills = bills.filter(bill => {
    switch (activeTab) {
      case 'upcoming':
        return bill.status === 'pending' || bill.status === 'scheduled';
      case 'paid':
        return bill.status === 'paid';
      default:
        return true;
    }
  });

  // Modal Component
  const Modal = ({ isOpen, onClose, title, children }) => {
    if (!isOpen) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500 focus:outline-none"
            >
              <FaTimes className="w-5 h-5" />
            </button>
          </div>
          <div className="p-6">{children}</div>
        </div>
      </div>
    );
  };

  // Get bill icon based on type
  const getBillIcon = (type) => {
    switch (type) {
      case 'electricity':
        return <FaLightbulb className="w-6 h-6" />;
      case 'mobile':
        return <FaMobileAlt className="w-6 h-6" />;
      case 'dth':
        return <FaTv className="w-6 h-6" />;
      case 'water':
        return <FaHome className="w-6 h-6" />;
      default:
        return <FaFileInvoiceDollar className="w-6 h-6" />;
    }
  };

  // Get status color and icon
  const getStatusInfo = (status) => {
    switch (status) {
      case 'paid':
        return {
          color: 'bg-green-100 text-green-800',
          icon: <FaCheckCircle className="w-4 h-4" />
        };
      case 'pending':
        return {
          color: 'bg-yellow-100 text-yellow-800',
          icon: <FaExclamationCircle className="w-4 h-4" />
        };
      case 'scheduled':
        return {
          color: 'bg-blue-100 text-blue-800',
          icon: <FaClock className="w-4 h-4" />
        };
      default:
        return {
          color: 'bg-gray-100 text-gray-800',
          icon: <FaFileInvoiceDollar className="w-4 h-4" />
        };
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-50">
      <DashboardPageHeader />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-24">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Bills & Payments</h1>
          <p className="mt-2 text-gray-600">Manage and pay your bills in one place</p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <button
            onClick={() => setShowAddBill(true)}
            className="flex items-center justify-center space-x-2 p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 border border-gray-200 hover:border-indigo-200"
          >
            <FaPlus className="w-5 h-5 text-indigo-600" />
            <span className="text-gray-700 font-medium">Add New Bill</span>
          </button>
          <button className="flex items-center justify-center space-x-2 p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 border border-gray-200 hover:border-indigo-200">
            <FaCalendarAlt className="w-5 h-5 text-indigo-600" />
            <span className="text-gray-700 font-medium">Schedule Payment</span>
          </button>
          <button className="flex items-center justify-center space-x-2 p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 border border-gray-200 hover:border-indigo-200">
            <FaHistory className="w-5 h-5 text-indigo-600" />
            <span className="text-gray-700 font-medium">Payment History</span>
          </button>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200 mb-8">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('upcoming')}
              className={`${
                activeTab === 'upcoming'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              Upcoming Bills
            </button>
            <button
              onClick={() => setActiveTab('paid')}
              className={`${
                activeTab === 'paid'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              Paid Bills
            </button>
            <button
              onClick={() => setActiveTab('all')}
              className={`${
                activeTab === 'all'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              All Bills
            </button>
          </nav>
        </div>

        {/* Bills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBills.map((bill) => (
            <div
              key={bill.id}
              className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200 hover:border-indigo-200 transition-all duration-200 hover:shadow-md cursor-pointer"
              onClick={() => setSelectedBill(bill)}
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600">
                      {getBillIcon(bill.type)}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 capitalize">{bill.type}</h3>
                      <p className="text-sm text-gray-500">{bill.provider}</p>
                    </div>
                  </div>
                  <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusInfo(bill.status).color}`}>
                    {getStatusInfo(bill.status).icon}
                    <span className="ml-1 capitalize">{bill.status}</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-500">Amount Due</p>
                    <p className="text-2xl font-bold text-gray-900">
                      ₹{bill.amount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Due Date</p>
                      <p className="text-sm font-medium text-gray-900">{bill.dueDate}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Bill Number</p>
                      <p className="text-sm font-medium text-gray-900">{bill.billNumber}</p>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-gray-100">
                    <button className="w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors duration-200">
                      Pay Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Bill Details Modal */}
      <Modal
        isOpen={!!selectedBill}
        onClose={() => setSelectedBill(null)}
        title="Bill Details"
      >
        {selectedBill && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600">
                  {getBillIcon(selectedBill.type)}
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 capitalize">{selectedBill.type}</h4>
                  <p className="text-sm text-gray-500">{selectedBill.provider}</p>
                </div>
              </div>
              <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusInfo(selectedBill.status).color}`}>
                {getStatusInfo(selectedBill.status).icon}
                <span className="ml-1 capitalize">{selectedBill.status}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <p className="text-sm text-gray-500">Amount</p>
                <p className="text-2xl font-bold text-gray-900">
                  ₹{selectedBill.amount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Due Date</p>
                <p className="text-sm font-medium text-gray-900">{selectedBill.dueDate}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Bill Number</p>
                <p className="text-sm font-medium text-gray-900">{selectedBill.billNumber}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Bill Date</p>
                <p className="text-sm font-medium text-gray-900">{selectedBill.billDate}</p>
              </div>
              {selectedBill.consumption && (
                <>
                  <div>
                    <p className="text-sm text-gray-500">Consumption</p>
                    <p className="text-sm font-medium text-gray-900">{selectedBill.consumption}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Previous Reading</p>
                    <p className="text-sm font-medium text-gray-900">{selectedBill.previousReading}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Current Reading</p>
                    <p className="text-sm font-medium text-gray-900">{selectedBill.currentReading}</p>
                  </div>
                </>
              )}
              {selectedBill.plan && (
                <div>
                  <p className="text-sm text-gray-500">Plan</p>
                  <p className="text-sm font-medium text-gray-900">{selectedBill.plan}</p>
                </div>
              )}
            </div>

            <div className="flex justify-end space-x-3 pt-4 border-t border-gray-100">
              <button className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors duration-200">
                <FaDownload className="w-4 h-4" />
                <span>Download Bill</span>
              </button>
              <button className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors duration-200">
                <FaPrint className="w-4 h-4" />
                <span>Print Bill</span>
              </button>
              <button
                onClick={() => setSelectedBill(null)}
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg transition-colors duration-200"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </Modal>

      {/* Add Bill Modal */}
      <Modal
        isOpen={showAddBill}
        onClose={() => setShowAddBill(false)}
        title="Add New Bill"
      >
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Bill Type
              </label>
              <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500">
                <option value="">Select Bill Type</option>
                <option value="electricity">Electricity</option>
                <option value="water">Water</option>
                <option value="mobile">Mobile</option>
                <option value="dth">DTH</option>
                <option value="gas">Gas</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Provider
              </label>
              <input
                type="text"
                placeholder="Enter provider name"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Amount
              </label>
              <input
                type="number"
                placeholder="Enter amount"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Due Date
              </label>
              <input
                type="date"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Bill Number
              </label>
              <input
                type="text"
                placeholder="Enter bill number"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Bill Date
              </label>
              <input
                type="date"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
          </div>

          <div className="flex justify-end space-x-3 pt-4 border-t border-gray-100">
            <button
              onClick={() => setShowAddBill(false)}
              className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg transition-colors duration-200"
            >
              Cancel
            </button>
            <button className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors duration-200">
              Add Bill
            </button>
          </div>
        </div>
      </Modal>

      <DashboardPageFooter />
    </div>
  );
};

export default BillsAndPayments; 