import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FaWallet, FaCreditCard, FaExchangeAlt, FaHistory, FaChartLine, FaLock, FaShieldAlt, FaPlus, FaLightbulb, FaCalendarAlt, FaMoneyBillWave, FaUserShield, FaMapMarkerAlt, FaClock, FaTimes, FaArrowUp, FaArrowDown, FaCheck, FaCheckCircle, FaTimesCircle, FaChevronUp, FaChevronDown, FaPauseCircle, FaChevronRight } from 'react-icons/fa';
import ReactApexChart from 'react-apexcharts';
import DashboardPageHeader from '../components/DashboardPageHeader';
import DashboardPageFooter from '../components/DashboardPageFooter';

// Modal Component
const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
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

// Add Money Form Component
const AddMoneyForm = ({ onClose, onSuccess }) => {
  const [amount, setAmount] = useState('');
  const [source, setSource] = useState('bank');
  const [isProcessing, setIsProcessing] = useState(false);
  const [step, setStep] = useState(1);
  const [selectedBank, setSelectedBank] = useState('');
  const [upiId, setUpiId] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [cardName, setCardName] = useState('');
  const [errors, setErrors] = useState({});
  const [transactionId, setTransactionId] = useState('');
  const [paymentStatus, setPaymentStatus] = useState('pending');

  // Quick amount options
  const quickAmounts = [1000, 2000, 5000, 10000];

  const validateForm = () => {
    const newErrors = {};
    
    if (!amount || parseFloat(amount) <= 0) {
      newErrors.amount = 'Please enter a valid amount';
    }

    switch (source) {
      case 'bank':
        if (!selectedBank) {
          newErrors.bank = 'Please select a bank';
        }
        break;
      case 'card':
        if (!cardNumber || cardNumber.length !== 16) {
          newErrors.cardNumber = 'Invalid card number';
        }
        if (!cardExpiry || !/^(0[1-9]|1[0-2])\/([0-9]{2})$/.test(cardExpiry)) {
          newErrors.cardExpiry = 'Invalid expiry date';
        }
        if (!cardCvv || !/^[0-9]{3,4}$/.test(cardCvv)) {
          newErrors.cardCvv = 'Invalid CVV';
        }
        if (!cardName) {
          newErrors.cardName = 'Card holder name is required';
        }
        break;
      case 'upi':
        if (!upiId || !/^[a-zA-Z0-9._-]+@[a-zA-Z]{3,}$/.test(upiId)) {
          newErrors.upiId = 'Invalid UPI ID';
        }
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    
    setIsProcessing(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setTransactionId(`TXN${Date.now()}`);
    setPaymentStatus('processing');
    setIsProcessing(false);
    setStep(2);
  };

  const handleConfirm = async () => {
    setIsProcessing(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setPaymentStatus('success');
    setIsProcessing(false);
    setTimeout(() => {
      onSuccess(parseFloat(amount));
      onClose();
    }, 1500);
  };

  const handleAmountChange = (e) => {
    const value = e.target.value.replace(/[^0-9.]/g, '');
    if (value === '' || /^\d*\.?\d{0,2}$/.test(value)) {
      setAmount(value);
    }
  };

  const handleQuickAmount = (value) => {
    setAmount(value.toString());
  };

  const handleCardExpiryChange = (e) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length >= 2) {
      value = value.slice(0, 2) + '/' + value.slice(2, 4);
    }
    setCardExpiry(value);
  };

  if (step === 2) {
    return (
      <div className="space-y-6">
        <div className="text-center">
          <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${
            paymentStatus === 'success' ? 'bg-green-100' : 'bg-yellow-100'
          }`}>
            {paymentStatus === 'success' ? (
              <FaCheck className="w-8 h-8 text-green-600" />
            ) : (
              <FaClock className="w-8 h-8 text-yellow-600" />
            )}
          </div>
          <h4 className="text-lg font-medium text-gray-900 mb-2">
            {paymentStatus === 'success' ? 'Payment Successful!' : 'Confirm Transaction'}
          </h4>
          <p className="text-gray-600">
            {paymentStatus === 'success' 
              ? 'Your money has been added successfully'
              : 'Please confirm the following details:'}
          </p>
        </div>

        <div className="bg-gray-50 rounded-lg p-4 space-y-3">
          <div className="flex justify-between">
            <span className="text-gray-600">Amount:</span>
            <span className="font-medium">₹{parseFloat(amount).toLocaleString()}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Source:</span>
            <span className="font-medium capitalize">{source}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Transaction ID:</span>
            <span className="font-medium">{transactionId}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Fee:</span>
            <span className="font-medium">₹0.00</span>
          </div>
          <div className="border-t border-gray-200 pt-3 flex justify-between">
            <span className="text-gray-900 font-medium">Total:</span>
            <span className="font-medium">₹{parseFloat(amount).toLocaleString()}</span>
          </div>
        </div>

        {paymentStatus !== 'success' && (
          <div className="flex space-x-3">
            <button
              onClick={() => setStep(1)}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
              disabled={isProcessing}
            >
              Back
            </button>
            <button
              onClick={handleConfirm}
              className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50"
              disabled={isProcessing}
            >
              {isProcessing ? 'Processing...' : 'Confirm'}
            </button>
          </div>
        )}
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Amount
        </label>
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">₹</span>
          <input
            type="text"
            value={amount}
            onChange={handleAmountChange}
            className={`w-full pl-8 pr-4 py-2 border ${errors.amount ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500`}
            placeholder="0.00"
            required
          />
        </div>
        {errors.amount && (
          <p className="mt-1 text-sm text-red-600">{errors.amount}</p>
        )}
        
        {/* Quick Amount Buttons */}
        <div className="grid grid-cols-4 gap-2 mt-2">
          {quickAmounts.map((value) => (
            <button
              key={value}
              type="button"
              onClick={() => handleQuickAmount(value)}
              className={`px-3 py-1 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                value <= 25000
                  ? 'border-gray-300 hover:bg-gray-50'
                  : 'border-gray-200 text-gray-400 cursor-not-allowed'
              }`}
              disabled={value > 25000}
            >
              ₹{value.toLocaleString()}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Source
        </label>
        <select
          value={source}
          onChange={(e) => setSource(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
        >
          <option value="bank">Bank Account</option>
          <option value="card">Credit/Debit Card</option>
          <option value="upi">UPI</option>
        </select>
      </div>

      {source === 'bank' && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select Bank
          </label>
          <select
            value={selectedBank}
            onChange={(e) => setSelectedBank(e.target.value)}
            className={`w-full px-4 py-2 border ${errors.bank ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500`}
          >
            <option value="">Select a bank</option>
            <option value="hdfc">HDFC Bank</option>
            <option value="icici">ICICI Bank</option>
            <option value="sbi">State Bank of India</option>
            <option value="axis">Axis Bank</option>
          </select>
          {errors.bank && (
            <p className="mt-1 text-sm text-red-600">{errors.bank}</p>
          )}
        </div>
      )}

      {source === 'card' && (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Card Number
            </label>
            <input
              type="text"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value.replace(/\D/g, '').slice(0, 16))}
              className={`w-full px-4 py-2 border ${errors.cardNumber ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500`}
              placeholder="1234 5678 9012 3456"
              required
            />
            {errors.cardNumber && (
              <p className="mt-1 text-sm text-red-600">{errors.cardNumber}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Expiry Date
              </label>
              <input
                type="text"
                value={cardExpiry}
                onChange={handleCardExpiryChange}
                className={`w-full px-4 py-2 border ${errors.cardExpiry ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500`}
                placeholder="MM/YY"
                maxLength="5"
                required
              />
              {errors.cardExpiry && (
                <p className="mt-1 text-sm text-red-600">{errors.cardExpiry}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                CVV
              </label>
              <input
                type="password"
                value={cardCvv}
                onChange={(e) => setCardCvv(e.target.value.replace(/\D/g, '').slice(0, 4))}
                className={`w-full px-4 py-2 border ${errors.cardCvv ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500`}
                placeholder="CVV"
                maxLength="4"
                required
              />
              {errors.cardCvv && (
                <p className="mt-1 text-sm text-red-600">{errors.cardCvv}</p>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Card Holder Name
            </label>
            <input
              type="text"
              value={cardName}
              onChange={(e) => setCardName(e.target.value)}
              className={`w-full px-4 py-2 border ${errors.cardName ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500`}
              placeholder="Name on card"
              required
            />
            {errors.cardName && (
              <p className="mt-1 text-sm text-red-600">{errors.cardName}</p>
            )}
          </div>
        </div>
      )}

      {source === 'upi' && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            UPI ID
          </label>
          <input
            type="text"
            value={upiId}
            onChange={(e) => setUpiId(e.target.value)}
            className={`w-full px-4 py-2 border ${errors.upiId ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500`}
            placeholder="username@upi"
            required
          />
          {errors.upiId && (
            <p className="mt-1 text-sm text-red-600">{errors.upiId}</p>
          )}
        </div>
      )}

      <div className="flex space-x-3">
        <button
          type="button"
          onClick={onClose}
          className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50"
          disabled={isProcessing}
        >
          {isProcessing ? 'Processing...' : 'Continue'}
        </button>
      </div>
    </form>
  );
};

// Withdraw Money Form Component
const WithdrawMoneyForm = ({ onClose, onSuccess }) => {
  const [amount, setAmount] = useState('');
  const [destination, setDestination] = useState('bank');
  const [isProcessing, setIsProcessing] = useState(false);
  const [step, setStep] = useState(1);
  const [selectedBank, setSelectedBank] = useState('');
  const [upiId, setUpiId] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [ifscCode, setIfscCode] = useState('');
  const [accountName, setAccountName] = useState('');
  const [errors, setErrors] = useState({});
  const [transactionId, setTransactionId] = useState('');
  const [withdrawalStatus, setWithdrawalStatus] = useState('pending');
  const availableBalance = 25000; // This should come from props or context

  // Quick amount options
  const quickAmounts = [1000, 2000, 5000, 10000];

  const validateForm = () => {
    const newErrors = {};
    
    if (!amount || parseFloat(amount) <= 0) {
      newErrors.amount = 'Please enter a valid amount';
    } else if (parseFloat(amount) > availableBalance) {
      newErrors.amount = 'Insufficient balance';
    }

    switch (destination) {
      case 'bank':
        if (!selectedBank) {
          newErrors.bank = 'Please select a bank';
        }
        if (!accountNumber || accountNumber.length < 9 || accountNumber.length > 18) {
          newErrors.accountNumber = 'Invalid account number';
        }
        if (!ifscCode || !/^[A-Z]{4}0[A-Z0-9]{6}$/.test(ifscCode)) {
          newErrors.ifscCode = 'Invalid IFSC code';
        }
        if (!accountName) {
          newErrors.accountName = 'Account holder name is required';
        }
        break;
      case 'upi':
        if (!upiId || !/^[a-zA-Z0-9._-]+@[a-zA-Z]{3,}$/.test(upiId)) {
          newErrors.upiId = 'Invalid UPI ID';
        }
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    
    setIsProcessing(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setTransactionId(`TXN${Date.now()}`);
    setWithdrawalStatus('processing');
    setIsProcessing(false);
    setStep(2);
  };

  const handleConfirm = async () => {
    setIsProcessing(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setWithdrawalStatus('success');
    setIsProcessing(false);
    setTimeout(() => {
      onSuccess(parseFloat(amount));
      onClose();
    }, 1500);
  };

  const handleAmountChange = (e) => {
    const value = e.target.value.replace(/[^0-9.]/g, '');
    if (value === '' || /^\d*\.?\d{0,2}$/.test(value)) {
      setAmount(value);
    }
  };

  const handleQuickAmount = (value) => {
    if (value <= availableBalance) {
      setAmount(value.toString());
    }
  };

  if (step === 2) {
    return (
      <div className="space-y-6">
        <div className="text-center">
          <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${
            withdrawalStatus === 'success' ? 'bg-green-100' : 'bg-yellow-100'
          }`}>
            {withdrawalStatus === 'success' ? (
              <FaCheck className="w-8 h-8 text-green-600" />
            ) : (
              <FaClock className="w-8 h-8 text-yellow-600" />
            )}
          </div>
          <h4 className="text-lg font-medium text-gray-900 mb-2">
            {withdrawalStatus === 'success' ? 'Withdrawal Successful!' : 'Confirm Withdrawal'}
          </h4>
          <p className="text-gray-600">
            {withdrawalStatus === 'success' 
              ? 'Your money has been withdrawn successfully'
              : 'Please confirm the following details:'}
          </p>
        </div>

        <div className="bg-gray-50 rounded-lg p-4 space-y-3">
          <div className="flex justify-between">
            <span className="text-gray-600">Amount:</span>
            <span className="font-medium">₹{parseFloat(amount).toLocaleString()}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Destination:</span>
            <span className="font-medium capitalize">{destination}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Transaction ID:</span>
            <span className="font-medium">{transactionId}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Fee:</span>
            <span className="font-medium">₹0.00</span>
          </div>
          <div className="border-t border-gray-200 pt-3 flex justify-between">
            <span className="text-gray-900 font-medium">Total:</span>
            <span className="font-medium">₹{parseFloat(amount).toLocaleString()}</span>
          </div>
        </div>

        {withdrawalStatus !== 'success' && (
          <div className="flex space-x-3">
            <button
              onClick={() => setStep(1)}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
              disabled={isProcessing}
            >
              Back
            </button>
            <button
              onClick={handleConfirm}
              className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50"
              disabled={isProcessing}
            >
              {isProcessing ? 'Processing...' : 'Confirm'}
            </button>
          </div>
        )}
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Amount
        </label>
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">₹</span>
          <input
            type="text"
            value={amount}
            onChange={handleAmountChange}
            className={`w-full pl-8 pr-4 py-2 border ${errors.amount ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500`}
            placeholder="0.00"
            required
          />
        </div>
        {errors.amount && (
          <p className="mt-1 text-sm text-red-600">{errors.amount}</p>
        )}
        
        {/* Quick Amount Buttons */}
        <div className="grid grid-cols-4 gap-2 mt-2">
          {quickAmounts.map((value) => (
            <button
              key={value}
              type="button"
              onClick={() => handleQuickAmount(value)}
              className={`px-3 py-1 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                value <= availableBalance
                  ? 'border-gray-300 hover:bg-gray-50'
                  : 'border-gray-200 text-gray-400 cursor-not-allowed'
              }`}
              disabled={value > availableBalance}
            >
              ₹{value.toLocaleString()}
            </button>
          ))}
        </div>
        <p className="mt-2 text-sm text-gray-500">
          Available Balance: ₹{availableBalance.toLocaleString()}
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Destination
        </label>
        <select
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
        >
          <option value="bank">Bank Account</option>
          <option value="upi">UPI</option>
        </select>
      </div>

      {destination === 'bank' && (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Bank
            </label>
            <select
              value={selectedBank}
              onChange={(e) => setSelectedBank(e.target.value)}
              className={`w-full px-4 py-2 border ${errors.bank ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500`}
            >
              <option value="">Select a bank</option>
              <option value="hdfc">HDFC Bank</option>
              <option value="icici">ICICI Bank</option>
              <option value="sbi">State Bank of India</option>
              <option value="axis">Axis Bank</option>
            </select>
            {errors.bank && (
              <p className="mt-1 text-sm text-red-600">{errors.bank}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Account Number
            </label>
            <input
              type="text"
              value={accountNumber}
              onChange={(e) => setAccountNumber(e.target.value.replace(/\D/g, ''))}
              className={`w-full px-4 py-2 border ${errors.accountNumber ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500`}
              placeholder="Enter account number"
              required
            />
            {errors.accountNumber && (
              <p className="mt-1 text-sm text-red-600">{errors.accountNumber}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              IFSC Code
            </label>
            <input
              type="text"
              value={ifscCode}
              onChange={(e) => setIfscCode(e.target.value.toUpperCase())}
              className={`w-full px-4 py-2 border ${errors.ifscCode ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500`}
              placeholder="Enter IFSC code"
              required
            />
            {errors.ifscCode && (
              <p className="mt-1 text-sm text-red-600">{errors.ifscCode}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Account Holder Name
            </label>
            <input
              type="text"
              value={accountName}
              onChange={(e) => setAccountName(e.target.value)}
              className={`w-full px-4 py-2 border ${errors.accountName ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500`}
              placeholder="Enter account holder name"
              required
            />
            {errors.accountName && (
              <p className="mt-1 text-sm text-red-600">{errors.accountName}</p>
            )}
          </div>
        </div>
      )}

      {destination === 'upi' && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            UPI ID
          </label>
          <input
            type="text"
            value={upiId}
            onChange={(e) => setUpiId(e.target.value)}
            className={`w-full px-4 py-2 border ${errors.upiId ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500`}
            placeholder="username@upi"
            required
          />
          {errors.upiId && (
            <p className="mt-1 text-sm text-red-600">{errors.upiId}</p>
          )}
        </div>
      )}

      <div className="flex space-x-3">
        <button
          type="button"
          onClick={onClose}
          className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50"
          disabled={isProcessing}
        >
          {isProcessing ? 'Processing...' : 'Continue'}
        </button>
      </div>
    </form>
  );
};

// Add Linked Account Form Component
const AddLinkedAccountForm = ({ onClose, onSuccess }) => {
  const [accountType, setAccountType] = useState('credit-card');
  const [accountName, setAccountName] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [bankName, setBankName] = useState('');
  const [ifscCode, setIfscCode] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [errors, setErrors] = useState({});
  const [step, setStep] = useState(1);

  const validateForm = () => {
    const newErrors = {};
    
    if (!accountName.trim()) {
      newErrors.accountName = 'Account name is required';
    }

    if (accountType === 'credit-card' || accountType === 'debit-card') {
      if (!accountNumber || accountNumber.length !== 16) {
        newErrors.accountNumber = 'Card number must be 16 digits';
      }
      if (!expiryDate || !/^(0[1-9]|1[0-2])\/([0-9]{2})$/.test(expiryDate)) {
        newErrors.expiryDate = 'Invalid expiry date (MM/YY)';
      }
      if (!cvv || !/^[0-9]{3,4}$/.test(cvv)) {
        newErrors.cvv = 'CVV must be 3 or 4 digits';
      }
    } else {
      if (!accountNumber || accountNumber.length < 9 || accountNumber.length > 18) {
        newErrors.accountNumber = 'Invalid account number';
      }
      if (!ifscCode || !/^[A-Z]{4}0[A-Z0-9]{6}$/.test(ifscCode)) {
        newErrors.ifscCode = 'Invalid IFSC code';
      }
    }

    if (!bankName.trim()) {
      newErrors.bankName = 'Bank name is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    
    setIsProcessing(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsProcessing(false);
    setStep(2);
  };

  const handleConfirm = async () => {
    setIsProcessing(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsProcessing(false);
    onSuccess({
      id: Date.now(),
      type: accountType,
      name: accountName,
      number: accountType === 'credit-card' || accountType === 'debit-card' 
        ? `**** **** **** ${accountNumber.slice(-4)}`
        : accountNumber,
      expiry: expiryDate,
      bankName,
      ifscCode,
      limit: accountType === 'credit-card' ? 50000 : null,
      balance: 0
    });
    onClose();
  };

  const handleAccountTypeChange = (e) => {
    setAccountType(e.target.value);
    setErrors({});
    setAccountNumber('');
    setExpiryDate('');
    setCvv('');
    setIfscCode('');
  };

  const handleAccountNumberChange = (e) => {
    const value = e.target.value.replace(/\D/g, '');
    if (accountType === 'credit-card' || accountType === 'debit-card') {
      setAccountNumber(value.slice(0, 16));
    } else {
      setAccountNumber(value);
    }
  };

  const handleExpiryDateChange = (e) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length >= 2) {
      value = value.slice(0, 2) + '/' + value.slice(2, 4);
    }
    setExpiryDate(value);
  };

  if (step === 2) {
    return (
      <div className="space-y-6">
        <div className="text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <FaCheck className="w-8 h-8 text-green-600" />
          </div>
          <h4 className="text-lg font-medium text-gray-900 mb-2">Confirm Account Details</h4>
          <p className="text-gray-600">Please verify the following information:</p>
        </div>

        <div className="bg-gray-50 rounded-lg p-4 space-y-3">
          <div className="flex justify-between">
            <span className="text-gray-600">Account Type:</span>
            <span className="font-medium capitalize">{accountType.replace('-', ' ')}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Account Name:</span>
            <span className="font-medium">{accountName}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Bank Name:</span>
            <span className="font-medium">{bankName}</span>
          </div>
          {(accountType === 'credit-card' || accountType === 'debit-card') ? (
            <>
              <div className="flex justify-between">
                <span className="text-gray-600">Card Number:</span>
                <span className="font-medium">**** **** **** {accountNumber.slice(-4)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Expiry Date:</span>
                <span className="font-medium">{expiryDate}</span>
              </div>
            </>
          ) : (
            <>
              <div className="flex justify-between">
                <span className="text-gray-600">Account Number:</span>
                <span className="font-medium">{accountNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">IFSC Code:</span>
                <span className="font-medium">{ifscCode}</span>
              </div>
            </>
          )}
        </div>

        <div className="flex space-x-3">
          <button
            onClick={() => setStep(1)}
            className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
            disabled={isProcessing}
          >
            Back
          </button>
          <button
            onClick={handleConfirm}
            className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50"
            disabled={isProcessing}
          >
            {isProcessing ? 'Processing...' : 'Confirm'}
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Account Type
        </label>
        <select
          value={accountType}
          onChange={handleAccountTypeChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
        >
          <option value="credit-card">Credit Card</option>
          <option value="debit-card">Debit Card</option>
          <option value="savings">Savings Account</option>
          <option value="current">Current Account</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Bank Name
        </label>
        <input
          type="text"
          value={bankName}
          onChange={(e) => setBankName(e.target.value)}
          className={`w-full px-4 py-2 border ${errors.bankName ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500`}
          placeholder="Enter bank name"
          required
        />
        {errors.bankName && (
          <p className="mt-1 text-sm text-red-600">{errors.bankName}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Account Name
        </label>
        <input
          type="text"
          value={accountName}
          onChange={(e) => setAccountName(e.target.value)}
          className={`w-full px-4 py-2 border ${errors.accountName ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500`}
          placeholder="Enter account name"
          required
        />
        {errors.accountName && (
          <p className="mt-1 text-sm text-red-600">{errors.accountName}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {accountType === 'credit-card' || accountType === 'debit-card' ? 'Card Number' : 'Account Number'}
        </label>
        <input
          type="text"
          value={accountNumber}
          onChange={handleAccountNumberChange}
          className={`w-full px-4 py-2 border ${errors.accountNumber ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500`}
          placeholder={accountType === 'credit-card' || accountType === 'debit-card' ? 'Enter 16-digit card number' : 'Enter account number'}
          required
        />
        {errors.accountNumber && (
          <p className="mt-1 text-sm text-red-600">{errors.accountNumber}</p>
        )}
      </div>

      {(accountType === 'credit-card' || accountType === 'debit-card') ? (
        <>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Expiry Date
              </label>
              <input
                type="text"
                value={expiryDate}
                onChange={handleExpiryDateChange}
                className={`w-full px-4 py-2 border ${errors.expiryDate ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500`}
                placeholder="MM/YY"
                maxLength="5"
                required
              />
              {errors.expiryDate && (
                <p className="mt-1 text-sm text-red-600">{errors.expiryDate}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                CVV
              </label>
              <input
                type="password"
                value={cvv}
                onChange={(e) => setCvv(e.target.value.replace(/\D/g, '').slice(0, 4))}
                className={`w-full px-4 py-2 border ${errors.cvv ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500`}
                placeholder="CVV"
                maxLength="4"
                required
              />
              {errors.cvv && (
                <p className="mt-1 text-sm text-red-600">{errors.cvv}</p>
              )}
            </div>
          </div>
        </>
      ) : (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            IFSC Code
          </label>
          <input
            type="text"
            value={ifscCode}
            onChange={(e) => setIfscCode(e.target.value.toUpperCase())}
            className={`w-full px-4 py-2 border ${errors.ifscCode ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500`}
            placeholder="Enter IFSC code"
            required
          />
          {errors.ifscCode && (
            <p className="mt-1 text-sm text-red-600">{errors.ifscCode}</p>
          )}
        </div>
      )}

      <div className="flex space-x-3">
        <button
          type="button"
          onClick={onClose}
          className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50"
          disabled={isProcessing}
        >
          {isProcessing ? 'Processing...' : 'Continue'}
        </button>
      </div>
    </form>
  );
};

// Login History Modal Component
const LoginHistoryModal = ({ isOpen, onClose }) => {
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('date');
  const [sortOrder, setSortOrder] = useState('desc');
  const [searchQuery, setSearchQuery] = useState('');

  // Sample login history data - In a real app, this would come from your backend
  const [loginHistory] = useState([
    {
      id: 1,
      date: '2024-03-20',
      time: '20:42',
      location: 'Pune, India',
      device: 'Chrome on Windows',
      ipAddress: '192.168.1.1',
      status: 'success',
      browser: 'Chrome 122.0.0',
      os: 'Windows 10',
      isCurrentSession: true
    },
    {
      id: 2,
      date: '2024-03-19',
      time: '15:30',
      location: 'Mumbai, India',
      device: 'Safari on iPhone',
      ipAddress: '192.168.1.2',
      status: 'success',
      browser: 'Safari 17.0',
      os: 'iOS 17.0',
      isCurrentSession: false
    },
    {
      id: 3,
      date: '2024-03-18',
      time: '10:15',
      location: 'Delhi, India',
      device: 'Firefox on Mac',
      ipAddress: '192.168.1.3',
      status: 'failed',
      browser: 'Firefox 123.0',
      os: 'macOS 14.0',
      isCurrentSession: false
    },
    {
      id: 4,
      date: '2024-03-17',
      time: '18:20',
      location: 'Bangalore, India',
      device: 'Edge on Windows',
      ipAddress: '192.168.1.4',
      status: 'success',
      browser: 'Edge 122.0',
      os: 'Windows 11',
      isCurrentSession: false
    },
    {
      id: 5,
      date: '2024-03-16',
      time: '09:45',
      location: 'Chennai, India',
      device: 'Chrome on Android',
      ipAddress: '192.168.1.5',
      status: 'success',
      browser: 'Chrome Mobile 122.0',
      os: 'Android 14',
      isCurrentSession: false
    }
  ]);

  const filteredAndSortedHistory = loginHistory
    .filter(entry => {
      if (filter === 'all') return true;
      if (filter === 'current') return entry.isCurrentSession;
      if (filter === 'success') return entry.status === 'success';
      if (filter === 'failed') return entry.status === 'failed';
      return true;
    })
    .filter(entry => {
      if (!searchQuery) return true;
      const searchLower = searchQuery.toLowerCase();
      return (
        entry.location.toLowerCase().includes(searchLower) ||
        entry.device.toLowerCase().includes(searchLower) ||
        entry.ipAddress.toLowerCase().includes(searchLower)
      );
    })
    .sort((a, b) => {
      const dateA = new Date(`${a.date} ${a.time}`);
      const dateB = new Date(`${b.date} ${b.time}`);
      return sortOrder === 'desc' ? dateB - dateA : dateA - dateB;
    });

  const handleSort = (newSortBy) => {
    if (sortBy === newSortBy) {
      setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc');
    } else {
      setSortBy(newSortBy);
      setSortOrder('desc');
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'success':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'failed':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-lg max-w-4xl w-full max-h-[90vh] flex flex-col">
        {/* Header - Fixed */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-white sticky top-0 z-10">
          <h3 className="text-xl font-semibold text-gray-900">Login History</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500 focus:outline-none transition-colors duration-200"
          >
            <FaTimes className="w-5 h-5" />
          </button>
        </div>

        {/* Filters and Search - Fixed */}
        <div className="p-4 border-b border-gray-200 bg-gray-50 sticky top-[76px] z-10">
          <div className="flex flex-wrap gap-4 items-center">
            <div className="flex-1 min-w-[200px]">
              <input
                type="text"
                placeholder="Search by location, device, or IP..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
              />
            </div>
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
            >
              <option value="all">All Sessions</option>
              <option value="current">Current Session</option>
              <option value="success">Successful Logins</option>
              <option value="failed">Failed Attempts</option>
            </select>
          </div>
        </div>

        {/* Login History Table - Scrollable */}
        <div className="overflow-y-auto overflow-x-auto flex-grow custom-scrollbar">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50 sticky top-0 z-[5]">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('date')}
                >
                  <div className="flex items-center space-x-1">
                    <span>Date & Time</span>
                    {sortBy === 'date' && (
                      <span>{sortOrder === 'desc' ? '↓' : '↑'}</span>
                    )}
                  </div>
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Location
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Device
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  IP Address
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredAndSortedHistory.map((entry) => (
                <tr key={entry.id} className="hover:bg-gray-50 transition-colors duration-150">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {new Date(`${entry.date} ${entry.time}`).toLocaleDateString()}
                    </div>
                    <div className="text-sm text-gray-500">{entry.time}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{entry.location}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{entry.device}</div>
                    <div className="text-xs text-gray-500">
                      {entry.browser} • {entry.os}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {entry.ipAddress}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(entry.status)}`}>
                      {entry.status === 'success' ? (
                        <FaCheckCircle className="w-3 h-3 mr-1" />
                      ) : (
                        <FaTimesCircle className="w-3 h-3 mr-1" />
                      )}
                      {entry.status.charAt(0).toUpperCase() + entry.status.slice(1)}
                    </span>
                    {entry.isCurrentSession && (
                      <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 border border-blue-200">
                        Current Session
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer - Fixed */}
        <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 sticky bottom-0 z-10">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-500">
              Showing {filteredAndSortedHistory.length} of {loginHistory.length} login sessions
            </p>
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Main Dashboard Component
const Dashboard = () => {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [isAddMoneyOpen, setIsAddMoneyOpen] = useState(false);
  const [isWithdrawOpen, setIsWithdrawOpen] = useState(false);
  const [accountData, setAccountData] = useState({
    balance: 25000.00,
    accountNumber: '1234567890',
    accountType: 'Savings',
    lastUpdated: new Date().toLocaleDateString(),
    availableBalance: 24800.00,
    pendingTransactions: 200.00
  });

  const [recentTransactions, setRecentTransactions] = useState([
    { id: 1, type: 'credit', amount: 1000, description: 'Salary Deposit', date: '2024-03-15', status: 'completed', category: 'Income' },
    { id: 2, type: 'debit', amount: 500, description: 'Grocery Shopping', date: '2024-03-14', status: 'completed', category: 'Shopping' },
    { id: 3, type: 'credit', amount: 200, description: 'Refund', date: '2024-03-13', status: 'completed', category: 'Refund' },
    { id: 4, type: 'debit', amount: 150, description: 'Utility Bill', date: '2024-03-12', status: 'pending', category: 'Bills' },
  ]);

  const [showTransactionHistory, setShowTransactionHistory] = useState(false);
  const [showAnalytics, setShowAnalytics] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');

  // Loan Application Data
  const [loanApplications] = useState([
    {
      id: 1,
      type: 'Personal Loan',
      amount: 500000,
      status: 'under_review',
      appliedDate: '2024-03-15',
      estimatedCompletion: '2024-03-22',
      documents: ['ID Proof', 'Income Statement', 'Bank Statements'],
      progress: 60,
      interestRate: 10.5,
      tenure: 36,
      emi: 16200,
      purpose: 'Home Renovation',
      loanOfficer: 'Rajesh Kumar',
      lastUpdate: '2024-03-18',
      verificationStatus: {
        identity: 'completed',
        income: 'in_progress',
        credit: 'pending',
        documents: 'in_progress'
      },
      nextSteps: [
        'Income verification in progress',
        'Credit check pending',
        'Document verification ongoing'
      ],
      timeline: [
        { date: '2024-03-15', event: 'Application Submitted', status: 'completed' },
        { date: '2024-03-16', event: 'Initial Review', status: 'completed' },
        { date: '2024-03-17', event: 'Document Collection', status: 'completed' },
        { date: '2024-03-18', event: 'Income Verification', status: 'in_progress' },
        { date: '2024-03-19', event: 'Credit Check', status: 'pending' },
        { date: '2024-03-20', event: 'Final Approval', status: 'pending' }
      ],
      comments: [
        { date: '2024-03-18', user: 'Rajesh Kumar', message: 'Income documents received, verification in progress' },
        { date: '2024-03-17', user: 'System', message: 'Application moved to verification stage' }
      ]
    }
  ]);

  const [expandedLoanId, setExpandedLoanId] = useState(null);
  const [showComments, setShowComments] = useState(false);

  // Add notification handler
  const showSuccessNotification = (message) => {
    setNotificationMessage(message);
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
  };

  // Function to get status color and text
  const getStatusInfo = (status) => {
    switch (status) {
      case 'under_review':
        return {
          color: 'text-yellow-600',
          bgColor: 'bg-yellow-50',
          text: 'Under Review',
          icon: <FaClock className="w-4 h-4" />
        };
      case 'approved':
        return {
          color: 'text-green-600',
          bgColor: 'bg-green-50',
          text: 'Approved',
          icon: <FaCheckCircle className="w-4 h-4" />
        };
      case 'rejected':
        return {
          color: 'text-red-600',
          bgColor: 'bg-red-50',
          text: 'Rejected',
          icon: <FaTimesCircle className="w-4 h-4" />
        };
      case 'disbursed':
        return {
          color: 'text-blue-600',
          bgColor: 'bg-blue-50',
          text: 'Disbursed',
          icon: <FaMoneyBillWave className="w-4 h-4" />
        };
      case 'on_hold':
        return {
          color: 'text-purple-600',
          bgColor: 'bg-purple-50',
          text: 'On Hold',
          icon: <FaPauseCircle className="w-4 h-4" />
        };
      default:
        return {
          color: 'text-gray-600',
          bgColor: 'bg-gray-50',
          text: 'Pending',
          icon: <FaClock className="w-4 h-4" />
        };
    }
  };

  // Function to get verification status color
  const getVerificationStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'text-green-600 bg-green-50';
      case 'in_progress':
        return 'text-yellow-600 bg-yellow-50';
      case 'pending':
        return 'text-gray-600 bg-gray-50';
      case 'failed':
        return 'text-red-600 bg-red-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  // Function to get timeline status color
  const getTimelineStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'text-green-600';
      case 'in_progress':
        return 'text-yellow-600';
      case 'pending':
        return 'text-gray-400';
      default:
        return 'text-gray-400';
    }
  };

  // Spending Chart Data
  const spendingData = {
    options: {
      chart: {
        type: 'donut',
      },
      labels: ['Shopping', 'Bills', 'Food', 'Transport', 'Entertainment'],
      colors: ['#4F46E5', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'],
      legend: {
        position: 'bottom'
      },
      responsive: [{
        breakpoint: 480,
        options: {
          chart: {
            width: 200
          },
          legend: {
            position: 'bottom'
          }
        }
      }]
    },
    series: [5000, 2500, 3000, 1500, 2000]
  };

  // Upcoming Bills Data
  const upcomingBills = [
    {
      id: 1,
      title: 'Credit Card Payment',
      amount: 3000,
      dueDate: '2024-05-28',
      type: 'credit-card',
      icon: <FaCreditCard className="text-blue-600" />
    },
    {
      id: 2,
      title: 'Electricity Bill',
      amount: 500,
      dueDate: '2024-05-26',
      type: 'utility',
      icon: <FaLightbulb className="text-yellow-600" />
    },
    {
      id: 3,
      title: 'Car EMI',
      amount: 15000,
      dueDate: '2024-05-30',
      type: 'emi',
      icon: <FaMoneyBillWave className="text-green-600" />
    }
  ];

  // Linked Accounts Data
  const [linkedAccounts, setLinkedAccounts] = useState([
    {
      id: 1,
      type: 'credit-card',
      name: 'Premium Card',
      number: '**** **** **** 1234',
      expiry: '12/25',
      limit: 50000,
      balance: 15000
    },
    {
      id: 2,
      type: 'debit-card',
      name: 'Savings Account',
      number: '**** **** **** 5678',
      expiry: '09/26',
      balance: 25000
    }
  ]);

  // Financial Insights
  const financialInsights = [
    {
      id: 1,
      title: 'Savings Achievement',
      description: 'You saved ₹1,200 more than last month',
      type: 'positive',
      icon: <FaChartLine className="text-green-600" />
    },
    {
      id: 2,
      title: 'Payment Automation',
      description: 'Try automating your utility payments',
      type: 'suggestion',
      icon: <FaLightbulb className="text-yellow-600" />
    }
  ];

  const quickActions = [
    { icon: <FaExchangeAlt />, title: 'Transfer', link: '/transfer', color: 'bg-blue-500', description: 'Send money to others' },
    { icon: <FaCreditCard />, title: 'Cards', link: '/cards', color: 'bg-green-500', description: 'Manage your cards' },
    { icon: <FaHistory />, title: 'History', link: '/transactions', color: 'bg-purple-500', description: 'View transaction history' },
    { icon: <FaChartLine />, title: 'Analytics', link: '/analytics', color: 'bg-orange-500', description: 'Track your spending' },
  ];

  const securityAlerts = [
    { id: 1, type: 'warning', message: 'Enable two-factor authentication for better security', icon: <FaLock /> },
    { id: 2, type: 'info', message: 'Your card will expire in 3 months', icon: <FaShieldAlt /> },
  ];

  // Last Login Info
  const lastLoginInfo = {
    date: '2024-05-21',
    time: '20:42',
    location: 'Pune, India',
    device: 'Chrome on Windows',
    ipAddress: '192.168.1.1'
  };

  const [isAddAccountOpen, setIsAddAccountOpen] = useState(false);
  const [isLoginHistoryOpen, setIsLoginHistoryOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  // Add function to handle transaction updates
  const _handleTransactionUpdate = (transactionId, newStatus) => {
    setRecentTransactions(prevTransactions =>
      prevTransactions.map(transaction =>
        transaction.id === transactionId
          ? { ...transaction, status: newStatus }
          : transaction
      )
    );
  };

  // Add function to handle new transactions
  const handleNewTransaction = (newTransaction) => {
    setRecentTransactions(prevTransactions => [
      { ...newTransaction, id: prevTransactions.length + 1 },
      ...prevTransactions
    ]);
  };

  // Add function to handle transaction history view
  const handleTransactionHistoryClick = () => {
    setShowTransactionHistory(true);
    setShowAnalytics(false);
  };

  // Add function to handle analytics view
  const handleAnalyticsClick = () => {
    setShowAnalytics(true);
    setShowTransactionHistory(false);
  };

  // Enhanced handleAddMoneySuccess
  const handleAddMoneySuccess = (amount) => {
    setAccountData(prev => ({
      ...prev,
      balance: prev.balance + amount,
      availableBalance: prev.availableBalance + amount
    }));
    
    handleNewTransaction({
      type: 'credit',
      amount: amount,
      description: 'Money Added',
      date: new Date().toISOString().split('T')[0],
      status: 'completed',
      category: 'Deposit'
    });

    showSuccessNotification(`Successfully added ₹${amount.toLocaleString()}`);
  };

  // Enhanced handleWithdrawSuccess
  const handleWithdrawSuccess = (amount) => {
    setAccountData(prev => ({
      ...prev,
      balance: prev.balance - amount,
      availableBalance: prev.availableBalance - amount
    }));
    
    handleNewTransaction({
      type: 'debit',
      amount: amount,
      description: 'Money Withdrawn',
      date: new Date().toISOString().split('T')[0],
      status: 'completed',
      category: 'Withdrawal'
    });

    showSuccessNotification(`Successfully withdrew ₹${amount.toLocaleString()}`);
  };

  // Add this function to handle new account addition:
  const handleAddAccountSuccess = (newAccount) => {
    setLinkedAccounts(prevAccounts => [...prevAccounts, newAccount]);
    showSuccessNotification('Account linked successfully');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-50">
      <DashboardPageHeader />
      
      {/* Notification Toast */}
      {showNotification && (
        <div className="fixed top-4 right-4 z-50 animate-slide-in">
          <div className="bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center space-x-2">
            <FaCheckCircle className="w-5 h-5" />
            <span>{notificationMessage}</span>
          </div>
        </div>
      )}

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-24">
        {/* Welcome Section with Last Login Info */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between">
            <div className="text-left">
              <h2 className="text-2xl font-bold text-gray-900 bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent">
                Welcome back, {user?.displayName || 'User'}!
              </h2>
              <p className="text-gray-600">Here's your financial overview</p>
            </div>
            <div className="mt-4 md:mt-0 bg-white rounded-lg shadow-sm p-4 border border-gray-200 hover:border-indigo-200 transition-colors duration-200">
              <div className="flex items-start space-x-3">
                <div className="p-2 bg-indigo-50 rounded-lg">
                  <FaUserShield className="w-5 h-5 text-indigo-600" />
                </div>
                <div className="text-left">
                  <div className="flex items-center space-x-2">
                    <FaClock className="w-4 h-4 text-gray-400" />
                    <p className="text-sm text-gray-600">
                      Last login: {new Date(lastLoginInfo.date).toLocaleDateString()}, {lastLoginInfo.time}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2 mt-1">
                    <FaMapMarkerAlt className="w-4 h-4 text-gray-400" />
                    <p className="text-sm text-gray-600">{lastLoginInfo.location}</p>
                  </div>
                </div>
              </div>
              <div className="mt-3 pt-3 border-t border-gray-100">
                <div className="flex items-center justify-between">
                  <p className="text-xs text-gray-500">{lastLoginInfo.device}</p>
                  <button 
                    onClick={() => setIsLoginHistoryOpen(true)}
                    className="text-xs text-indigo-600 hover:text-indigo-700 font-medium"
                  >
                    View Login History
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Account Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 hover:border-indigo-200 transition-colors duration-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="text-left">
                  <h3 className="text-lg font-semibold text-gray-900">Account Overview</h3>
                  <p className="text-sm text-gray-500 mt-1">Manage your account and transactions</p>
                </div>
                <div className="flex items-center space-x-2">
                  <button 
                    onClick={handleTransactionHistoryClick}
                    className={`p-2 rounded-lg transition-colors ${
                      showTransactionHistory 
                        ? 'text-indigo-600 bg-indigo-50 border border-indigo-200' 
                        : 'text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 border border-transparent hover:border-indigo-200'
                    }`}
                  >
                    <FaHistory className="w-5 h-5" />
                  </button>
                  <button 
                    onClick={handleAnalyticsClick}
                    className={`p-2 rounded-lg transition-colors ${
                      showAnalytics 
                        ? 'text-indigo-600 bg-indigo-50 border border-indigo-200' 
                        : 'text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 border border-transparent hover:border-indigo-200'
                    }`}
                  >
                    <FaChartLine className="w-5 h-5" />
                  </button>
                  <div className="p-2 text-indigo-600 bg-indigo-50 rounded-lg border border-indigo-200">
                    <FaWallet className="w-5 h-5" />
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gradient-to-br from-indigo-50 to-white rounded-lg p-4 border border-indigo-100 hover:border-indigo-200 transition-colors duration-200">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm text-gray-500">Total Balance</p>
                    <span className="text-xs text-indigo-600 bg-indigo-50 px-2 py-1 rounded-full border border-indigo-100">Active</span>
                  </div>
                  <p className="text-2xl font-bold text-gray-900">
                    ₹{accountData.balance.toLocaleString()}
                  </p>
                  <div className="mt-2 flex items-center text-xs text-gray-500">
                    <FaArrowUp className="w-3 h-3 text-green-500 mr-1" />
                    <span>2.5% from last month</span>
                  </div>
                </div>
                <div className="bg-gradient-to-br from-indigo-50 to-white rounded-lg p-4 border border-indigo-100 hover:border-indigo-200 transition-colors duration-200">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm text-gray-500">Available Balance</p>
                    <span className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded-full border border-green-100">Ready</span>
                  </div>
                  <p className="text-2xl font-bold text-gray-900">₹{accountData.availableBalance.toLocaleString()}</p>
                  <div className="mt-2 flex items-center text-xs text-gray-500">
                    <FaArrowUp className="w-3 h-3 text-green-500 mr-1" />
                    <span>Available for withdrawal</span>
                  </div>
                </div>
                <div className="bg-gradient-to-br from-indigo-50 to-white rounded-lg p-4 border border-indigo-100 hover:border-indigo-200 transition-colors duration-200">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm text-gray-500">Pending Transactions</p>
                    <span className="text-xs text-yellow-600 bg-yellow-50 px-2 py-1 rounded-full border border-yellow-100">Processing</span>
                  </div>
                  <p className="text-2xl font-bold text-gray-900">₹{accountData.pendingTransactions.toLocaleString()}</p>
                  <div className="mt-2 flex items-center text-xs text-gray-500">
                    <FaClock className="w-3 h-3 text-yellow-500 mr-1" />
                    <span>Will clear in 24h</span>
                  </div>
                </div>
              </div>
              <div className="mt-6 grid grid-cols-2 gap-4">
                <button 
                  onClick={() => setIsAddMoneyOpen(true)}
                  className="flex flex-col items-center justify-center p-4 bg-gradient-to-br from-indigo-50 to-white rounded-lg hover:shadow-md transition-all duration-300 group border border-indigo-100 hover:border-indigo-200"
                >
                  <div className="bg-indigo-600 text-white p-3 rounded-full mb-2 group-hover:scale-110 transition-transform duration-300">
                    <FaArrowUp className="w-5 h-5" />
                  </div>
                  <span className="text-sm font-medium text-gray-700 group-hover:text-indigo-600 transition-colors">Add Money</span>
                  <span className="text-xs text-gray-500 mt-1">Deposit funds to your account</span>
                </button>
                <button 
                  onClick={() => setIsWithdrawOpen(true)}
                  className="flex flex-col items-center justify-center p-4 bg-gradient-to-br from-indigo-50 to-white rounded-lg hover:shadow-md transition-all duration-300 group border border-indigo-100 hover:border-indigo-200"
                >
                  <div className="bg-indigo-600 text-white p-3 rounded-full mb-2 group-hover:scale-110 transition-transform duration-300">
                    <FaArrowDown className="w-5 h-5" />
                  </div>
                  <span className="text-sm font-medium text-gray-700 group-hover:text-indigo-600 transition-colors">Withdraw</span>
                  <span className="text-xs text-gray-500 mt-1">Withdraw funds from your account</span>
                </button>
              </div>
              <div className="mt-6 pt-6 border-t border-gray-100">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <FaShieldAlt className="w-4 h-4 text-indigo-600" />
                    <span className="text-sm text-gray-600">Account Status: Protected</span>
                  </div>
                  <button className="text-sm text-indigo-600 hover:text-indigo-700 font-medium">
                    View Details
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Security Alerts */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 hover:border-indigo-200 transition-colors duration-200">
            <div className="flex items-center justify-between mb-4">
              <div className="text-left">
                <h3 className="text-lg font-semibold text-gray-900">Security Alerts</h3>
              </div>
              <FaShieldAlt className="text-indigo-600" />
            </div>
            <div className="space-y-4">
              {securityAlerts.map((alert) => (
                <div key={alert.id} className="flex items-start space-x-3 p-3 bg-gradient-to-br from-indigo-50 to-white rounded-lg border border-indigo-100 hover:border-indigo-200 transition-colors duration-200">
                  <div className="text-indigo-600 mt-1">{alert.icon}</div>
                  <p className="text-sm text-gray-600">{alert.message}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Spending Chart and Upcoming Bills */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Spending Chart */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-sm p-6 border border-gray-200 hover:border-indigo-200 transition-colors duration-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Spending Overview</h3>
            <div className="h-80">
              <ReactApexChart
                options={spendingData.options}
                series={spendingData.series}
                type="donut"
                height="100%"
              />
            </div>
          </div>

          {/* Upcoming Bills */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 hover:border-indigo-200 transition-colors duration-200">
            <div className="flex items-center justify-between mb-4">
              <div className="text-left">
                <h3 className="text-lg font-semibold text-gray-900">Upcoming Bills</h3>
              </div>
              <FaCalendarAlt className="text-indigo-600" />
            </div>
            <div className="space-y-4">
              {upcomingBills.map((bill) => (
                <div key={bill.id} className="flex items-start space-x-3 p-3 bg-gradient-to-br from-indigo-50 to-white rounded-lg border border-indigo-100 hover:border-indigo-200 transition-colors duration-200">
                  <div className="mt-1">{bill.icon}</div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900 text-left">{bill.title}</p>
                    <p className="text-xs text-gray-500 text-left">Due: {new Date(bill.dueDate).toLocaleDateString()}</p>
                  </div>
                  <p className="text-sm font-medium text-gray-900 ">₹{bill.amount.toLocaleString()}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Linked Accounts and Financial Insights */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Linked Accounts */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-sm p-6 border border-gray-200 hover:border-indigo-200 transition-colors duration-200">
            <div className="flex items-center justify-between mb-4">
              <div className="text-left">
                <h3 className="text-lg font-semibold text-gray-900">Linked Accounts</h3>
              </div>
              <button 
                onClick={() => setIsAddAccountOpen(true)}
                className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors duration-200 border border-transparent hover:border-indigo-200"
              >
                <FaPlus className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4">
              {linkedAccounts.map((account) => (
                <div key={account.id} className="flex items-center justify-between p-4 bg-gradient-to-br from-indigo-50 to-white rounded-lg border border-indigo-100 hover:border-indigo-200 transition-colors duration-200">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center border border-indigo-200">
                      <FaCreditCard className="w-5 h-5 text-indigo-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{account.name}</p>
                      <p className="text-xs text-gray-500">{account.number}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">₹{account.balance.toLocaleString()}</p>
                    {account.limit && (
                      <p className="text-xs text-gray-500">Limit: ₹{account.limit.toLocaleString()}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Financial Insights */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 hover:border-indigo-200 transition-colors duration-200">
            <div className="flex items-center justify-between mb-4">
              <div className="text-left">
                <h3 className="text-lg font-semibold text-gray-900">Financial Insights</h3>
              </div>
            </div>
            <div className="space-y-4">
              {financialInsights.map((insight) => (
                <div key={insight.id} className="p-4 bg-gradient-to-br from-indigo-50 to-white rounded-lg border border-indigo-100 hover:border-indigo-200 transition-colors duration-200">
                  <div className="flex items-start space-x-3">
                    <div className="mt-1">{insight.icon}</div>
                    <div>
                      <p className="text-sm font-medium text-gray-900 text-left">{insight.title}</p>
                      <p className="text-xs text-gray-600 text-left">{insight.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Loan Application Tracker */}
        <div className="mb-8">
          <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200 hover:border-indigo-200 transition-colors duration-200">
            <div className="px-6 py-4 border-b border-gray-100 bg-gradient-to-r from-indigo-50 to-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-indigo-100 rounded-lg border border-indigo-200">
                    <FaMoneyBillWave className="w-5 h-5 text-indigo-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">Loan Applications</h3>
                </div>
                <button className="text-sm text-indigo-600 hover:text-indigo-700 font-medium flex items-center space-x-1">
                  <span>View All</span>
                  <FaChevronRight className="w-3 h-3" />
                </button>
              </div>
            </div>
            <div className="p-6">
              {loanApplications.map((loan) => {
                const statusInfo = getStatusInfo(loan.status);
                const isExpanded = expandedLoanId === loan.id;
                
                return (
                  <div key={loan.id} className="bg-gradient-to-br from-indigo-50 to-white rounded-lg p-6 mb-4 last:mb-0 border border-indigo-100 hover:border-indigo-200 transition-colors duration-200">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                      <div>
                        <h4 className="text-lg font-semibold text-gray-900 text-left">
                          {loan.type}
                        </h4>
                        <p className="text-sm text-gray-500">Applied on {new Date(loan.appliedDate).toLocaleDateString()}</p>
                      </div>
                      <div className="mt-2 md:mt-0 flex items-center space-x-3">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${statusInfo.bgColor} ${statusInfo.color}`}>
                          {statusInfo.icon}
                          <span className="ml-2">{statusInfo.text}</span>
                        </span>
                        <button 
                          onClick={() => setExpandedLoanId(isExpanded ? null : loan.id)}
                          className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg"
                        >
                          {isExpanded ? <FaChevronUp className="w-5 h-5" /> : <FaChevronDown className="w-5 h-5" />}
                        </button>
                      </div>
                    </div>
                    
                    {isExpanded && (
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="bg-white rounded-lg p-4 shadow-sm">
                            <p className="text-sm text-gray-500 mb-2">Loan Amount</p>
                            <p className="text-lg font-semibold text-gray-900">₹{loan.amount.toLocaleString()}</p>
                          </div>
                          <div className="bg-white rounded-lg p-4 shadow-sm">
                            <p className="text-sm text-gray-500 mb-2">Interest Rate</p>
                            <p className="text-lg font-semibold text-gray-900">{loan.interestRate}% p.a.</p>
                          </div>
                          <div className="bg-white rounded-lg p-4 shadow-sm">
                            <p className="text-sm text-gray-500 mb-2">Monthly EMI</p>
                            <p className="text-lg font-semibold text-gray-900">₹{loan.emi.toLocaleString()}</p>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="bg-white rounded-lg p-4 shadow-sm">
                            <p className="text-sm text-gray-500 mb-2">Loan Purpose</p>
                            <p className="text-lg font-semibold text-gray-900">{loan.purpose}</p>
                          </div>
                          <div className="bg-white rounded-lg p-4 shadow-sm">
                            <p className="text-sm text-gray-500 mb-2">Loan Officer</p>
                            <p className="text-lg font-semibold text-gray-900">{loan.loanOfficer}</p>
                          </div>
                        </div>

                        <div className="bg-white rounded-lg p-4 shadow-sm">
                          <p className="text-sm text-gray-500 mb-3">Verification Status</p>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                            {Object.entries(loan.verificationStatus).map(([key, status]) => (
                              <span 
                                key={key}
                                className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getVerificationStatusColor(status)} transition-all duration-300 hover:shadow-sm`}
                              >
                                {key.charAt(0).toUpperCase() + key.slice(1)}: {status.replace('_', ' ')}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="bg-white rounded-lg p-4 shadow-sm">
                          <p className="text-sm text-gray-500 mb-3">Application Timeline</p>
                          <div className="relative">
                            {loan.timeline.map((item, index) => (
                              <div key={index} className="flex items-start mb-4 last:mb-0">
                                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-white border-2 border-indigo-200 flex items-center justify-center mr-4 relative z-10">
                                  <span className={`text-sm ${getTimelineStatusColor(item.status)}`}>
                                    {index + 1}
                                  </span>
                                </div>
                                <div className="flex-1">
                                  <p className="text-sm font-medium text-gray-900">{item.event}</p>
                                  <p className="text-xs text-gray-500">{new Date(item.date).toLocaleDateString()}</p>
                                </div>
                                {index < loan.timeline.length - 1 && (
                                  <div className="absolute left-4 top-8 w-0.5 h-12 bg-gradient-to-b from-indigo-200 to-blue-200"></div>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="bg-white rounded-lg p-4 shadow-sm">
                          <div className="flex items-center justify-between mb-3">
                            <p className="text-sm text-gray-500">Next Steps</p>
                            <button 
                              onClick={() => setShowComments(!showComments)}
                              className="text-sm text-indigo-600 hover:text-indigo-700 font-medium flex items-center space-x-1 group"
                            >
                              <span>{showComments ? 'Hide Comments' : 'Show Comments'}</span>
                              <FaChevronRight className={`w-3 h-3 transition-transform duration-300 ${showComments ? 'rotate-90' : ''}`} />
                            </button>
                          </div>
                          <ul className="space-y-2">
                            {loan.nextSteps.map((step, index) => (
                              <li key={index} className="flex items-start group">
                                <span className="flex-shrink-0 w-5 h-5 rounded-full bg-indigo-100 flex items-center justify-center mr-2 mt-0.5 group-hover:bg-indigo-200 transition-colors">
                                  <span className="text-xs text-indigo-600">{index + 1}</span>
                                </span>
                                <span className="text-sm text-gray-600 group-hover:text-gray-900 transition-colors">{step}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {showComments && (
                          <div className="bg-white rounded-lg p-4 shadow-sm animate-fadeIn">
                            <p className="text-sm text-gray-500 mb-3">Comments</p>
                            <div className="space-y-3">
                              {loan.comments.map((comment, index) => (
                                <div key={index} className="bg-gray-50 rounded-lg p-3 hover:bg-gray-100 transition-colors">
                                  <div className="flex items-center justify-between mb-1">
                                    <span className="text-sm font-medium text-gray-900">{comment.user}</span>
                                    <span className="text-xs text-gray-500">{new Date(comment.date).toLocaleDateString()}</span>
                                  </div>
                                  <p className="text-sm text-gray-600">{comment.message}</p>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        <div className="bg-white rounded-lg p-4 shadow-sm">
                          <p className="text-sm text-gray-500 mb-3">Required Documents</p>
                          <div className="flex flex-wrap gap-2">
                            {loan.documents.map((doc, index) => (
                              <span 
                                key={index}
                                className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
                              >
                                {doc}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 hover:border-indigo-200 transition-colors duration-200">
            <div className="flex items-center justify-between mb-4">
              <div className="text-left">
                <h3 className="text-lg font-semibold text-gray-900">Quick Actions</h3>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {quickActions.map((action, index) => (
                <Link
                  key={index}
                  to={action.link}
                  className="flex flex-col items-center justify-center p-4 bg-gradient-to-br from-indigo-50 to-white rounded-lg hover:shadow-md transition-all duration-300 group border border-indigo-100 hover:border-indigo-200"
                >
                  <div className={`${action.color} text-white p-3 rounded-full mb-2 group-hover:scale-110 transition-transform duration-300 border border-white/20`}>
                    {action.icon}
                  </div>
                  <span className="text-sm font-medium text-gray-700 group-hover:text-indigo-600 transition-colors">{action.title}</span>
                  <span className="text-xs text-gray-500 mt-1">{action.description}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Recent Transactions */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200 hover:border-indigo-200 transition-colors duration-200">
            <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center bg-gradient-to-r from-indigo-50 to-white">
              <div className="text-left">
                <h3 className="text-lg font-semibold text-gray-900">Recent Transactions</h3>
              </div>
              <Link to="/transactions" className="text-indigo-600 hover:text-indigo-700 font-medium text-sm">
                View all
              </Link>
            </div>
            <div className="divide-y divide-gray-200">
              {recentTransactions.map((transaction) => (
                <div key={transaction.id} className="px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors duration-200">
                  <div className="flex items-center">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center border ${
                      transaction.type === 'credit' ? 'bg-green-100 border-green-200' : 'bg-red-100 border-red-200'
                    }`}>
                      <FaExchangeAlt className={`text-lg ${
                        transaction.type === 'credit' ? 'text-green-600' : 'text-red-600'
                      }`} />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-900 text-left">{transaction.description}</p>
                      <div className="flex items-center space-x-2">
                        <p className="text-sm text-gray-500">{transaction.date}</p>
                        <span className="text-xs text-gray-500">•</span>
                        <span className="text-xs text-gray-500">{transaction.category}</span>
                        <span className={`text-xs px-2 py-1 rounded-full border ${
                          transaction.status === 'completed' 
                            ? 'bg-green-100 text-green-800 border-green-200' 
                            : 'bg-yellow-100 text-yellow-800 border-yellow-200'
                        }`}>
                          {transaction.status}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className={`text-sm font-medium ${
                    transaction.type === 'credit' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {transaction.type === 'credit' ? '+' : '-'}₹{transaction.amount}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      <DashboardPageFooter />

      {/* Enhanced Modals */}
      <Modal
        isOpen={isAddMoneyOpen}
        onClose={() => setIsAddMoneyOpen(false)}
        title="Add Money"
      >
        <AddMoneyForm
          onClose={() => setIsAddMoneyOpen(false)}
          onSuccess={handleAddMoneySuccess}
        />
      </Modal>

      <Modal
        isOpen={isWithdrawOpen}
        onClose={() => setIsWithdrawOpen(false)}
        title="Withdraw Money"
      >
        <WithdrawMoneyForm
          onClose={() => setIsWithdrawOpen(false)}
          onSuccess={handleWithdrawSuccess}
        />
      </Modal>

      <Modal
        isOpen={isAddAccountOpen}
        onClose={() => setIsAddAccountOpen(false)}
        title="Link New Account"
      >
        <AddLinkedAccountForm
          onClose={() => setIsAddAccountOpen(false)}
          onSuccess={handleAddAccountSuccess}
        />
      </Modal>

      {/* Add the LoginHistoryModal */}
      <LoginHistoryModal
        isOpen={isLoginHistoryOpen}
        onClose={() => setIsLoginHistoryOpen(false)}
      />
    </div>
  );
};

export default Dashboard;