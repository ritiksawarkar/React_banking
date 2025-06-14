import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  FaMoneyBillWave, 
  FaCalculator, 
  FaFileAlt, 
  FaCheckCircle, 
  FaTimesCircle, 
  FaClock, 
  FaChevronRight, 
  FaChevronDown, 
  FaChevronUp, 
  FaUserShield, 
  FaShieldAlt, 
  FaLock, 
  FaPercent, 
  FaCalendarAlt, 
  FaChartLine, 
  FaInfoCircle, 
  FaDownload, 
  FaUpload, 
  FaQuestionCircle,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaStar,
  FaUser,
  FaBriefcase,
  FaBuilding,
  FaFileInvoiceDollar,
  FaIdCard,
  FaFileSignature,
  FaHandshake,
  FaMobileAlt,
  FaLaptop,
  FaHome,
  FaCar,
  FaGraduationCap,
  FaTimes,
  FaCheck,
  FaUserCircle,
  FaRocket,
  FaChartBar,
  FaUserCheck,
  FaFileContract,
  FaMoneyCheckAlt,
  FaCreditCard,
  FaPiggyBank,
  FaUniversity,
  FaLandmark,
  FaUserFriends
} from 'react-icons/fa';
import DashboardPageHeader from '../components/DashboardPageHeader';
import DashboardPageFooter from '../components/DashboardPageFooter';

// Enhanced Eligibility Checker Component
const EligibilityChecker = ({ onCheck }) => {
  const [formData, setFormData] = useState({
    monthlyIncome: '',
    employmentType: 'salaried',
    creditScore: '',
    age: '',
    existingLoans: 'no',
    vehicleCost: '',
    downPayment: ''
  });
  const [result, setResult] = useState(null);
  const [isCalculating, setIsCalculating] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsCalculating(true);
    
    // Simulate API call
    setTimeout(() => {
      const eligibleAmount = calculateEligibleAmount(formData);
      const interestRate = calculateInterestRate(formData);
      setResult({
        eligible: true,
        amount: eligibleAmount,
        interestRate,
        message: 'Congratulations! You are eligible for a car loan.'
      });
      setIsCalculating(false);
      onCheck('Eligibility check completed successfully!');
    }, 1500);
  };

  const calculateEligibleAmount = (data) => {
    const monthlyIncome = parseInt(data.monthlyIncome);
    const vehicleCost = parseInt(data.vehicleCost);
    const downPayment = parseInt(data.downPayment) || 0;
    const loanAmount = vehicleCost - downPayment;
    
    // Maximum loan amount based on income (60 months EMI)
    const maxEMI = monthlyIncome * 0.5; // 50% of monthly income
    const maxLoanAmount = maxEMI * 60;
    
    // Consider credit score for loan amount
    const creditScoreMultiplier = data.creditScore > 750 ? 1.2 : 1;
    
    return Math.min(maxLoanAmount * creditScoreMultiplier, loanAmount);
  };

  const calculateInterestRate = (data) => {
    let baseRate = 8.5; // Base rate for car loans
    
    // Adjust based on credit score
    if (data.creditScore > 750) baseRate -= 1;
    else if (data.creditScore > 650) baseRate -= 0.5;
    else if (data.creditScore < 600) baseRate += 1;
    
    // Adjust based on employment type
    if (data.employmentType === 'salaried') baseRate -= 0.5;
    
    // Adjust based on age
    if (parseInt(data.age) < 30) baseRate -= 0.5;
    
    return Math.max(baseRate, 7.5);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200 hover:border-indigo-200 transition-all duration-300">
      <div className="flex items-center space-x-3 mb-6">
        <div className="p-2 bg-indigo-100 rounded-lg">
          <FaCalculator className="w-6 h-6 text-indigo-600" />
        </div>
        <h3 className="text-xl font-semibold text-gray-900">Check Your Eligibility</h3>
      </div>

      {!result ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 text-left">Monthly Income</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">₹</span>
                <input
                  type="number"
                  value={formData.monthlyIncome}
                  onChange={(e) => setFormData({...formData, monthlyIncome: e.target.value})}
                  className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Enter monthly income"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 text-left">Vehicle Cost</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">₹</span>
                <input
                  type="number"
                  value={formData.vehicleCost}
                  onChange={(e) => setFormData({...formData, vehicleCost: e.target.value})}
                  className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Enter vehicle cost"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 text-left">Down Payment</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">₹</span>
                <input
                  type="number"
                  value={formData.downPayment}
                  onChange={(e) => setFormData({...formData, downPayment: e.target.value})}
                  className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Enter down payment"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 text-left">Employment Type</label>
              <select
                value={formData.employmentType}
                onChange={(e) => setFormData({...formData, employmentType: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="salaried">Salaried</option>
                <option value="self-employed">Self Employed</option>
                <option value="business">Business Owner</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 text-left">Credit Score</label>
              <input
                type="number"
                value={formData.creditScore}
                onChange={(e) => setFormData({...formData, creditScore: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Enter credit score"
                min="300"
                max="850"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 text-left">Age</label>
              <input
                type="number"
                value={formData.age}
                onChange={(e) => setFormData({...formData, age: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Enter your age"
                min="18"
                max="65"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 text-left">Existing Loans</label>
              <select
                value={formData.existingLoans}
                onChange={(e) => setFormData({...formData, existingLoans: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="no">No</option>
                <option value="yes">Yes</option>
              </select>
            </div>
          </div>

          <button
            type="submit"
            disabled={isCalculating}
            className="w-full px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200 font-medium disabled:opacity-50"
          >
            {isCalculating ? 'Checking...' : 'Check Eligibility'}
          </button>
        </form>
      ) : (
        <div className="text-center p-6 bg-gradient-to-br from-green-50 to-white rounded-lg border border-green-200">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <FaCheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <h4 className="text-xl font-semibold text-gray-900 mb-2">{result.message}</h4>
          <div className="grid grid-cols-2 gap-4 mt-4">
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <p className="text-sm text-gray-500">Eligible Amount</p>
              <p className="text-xl font-bold text-gray-900">₹{result.amount.toLocaleString()}</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <p className="text-sm text-gray-500">Interest Rate</p>
              <p className="text-xl font-bold text-gray-900">{result.interestRate}% p.a.</p>
            </div>
          </div>
          <button
            onClick={() => setResult(null)}
            className="mt-6 px-6 py-2 text-indigo-600 border border-indigo-600 rounded-lg hover:bg-indigo-50 transition-colors duration-200"
          >
            Check Again
          </button>
        </div>
      )}
    </div>
  );
};

// Enhanced EMI Calculator Component
const EMICalculator = ({ onCalculate }) => {
  const [formData, setFormData] = useState({
    amount: '',
    tenure: '',
    interestRate: '10.5'
  });
  const [emiDetails, setEmiDetails] = useState(null);

  const calculateEMI = () => {
    const principal = parseFloat(formData.amount);
    const rate = parseFloat(formData.interestRate) / 12 / 100;
    const time = parseFloat(formData.tenure) * 12;
    
    const emi = principal * rate * Math.pow(1 + rate, time) / (Math.pow(1 + rate, time) - 1);
    const totalAmount = emi * time;
    const totalInterest = totalAmount - principal;

    setEmiDetails({
      emi: emi,
      totalAmount: totalAmount,
      totalInterest: totalInterest
    });

    onCalculate({
      amount: principal,
      tenure: time,
      interestRate: parseFloat(formData.interestRate),
      emi: emi
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200 hover:border-indigo-200 transition-all duration-300">
      <div className="flex items-center space-x-3 mb-6">
        <div className="p-2 bg-indigo-100 rounded-lg">
          <FaMoneyBillWave className="w-6 h-6 text-indigo-600" />
        </div>
        <h3 className="text-xl font-semibold text-gray-900">EMI Calculator</h3>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1 text-left">Loan Amount</label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">₹</span>
            <input
              type="number"
              value={formData.amount}
              onChange={(e) => setFormData({...formData, amount: e.target.value})}
              className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter loan amount"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1 text-left">Loan Tenure (Years)</label>
          <input
            type="number"
            value={formData.tenure}
            onChange={(e) => setFormData({...formData, tenure: e.target.value})}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Enter tenure in years"
            min="1"
            max="5"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1 text-left">Interest Rate (% p.a.)</label>
          <input
            type="number"
            value={formData.interestRate}
            onChange={(e) => setFormData({...formData, interestRate: e.target.value})}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Enter interest rate"
            step="0.1"
            required
          />
        </div>

        <button
          onClick={calculateEMI}
          className="w-full px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200 font-medium"
        >
          Calculate EMI
        </button>

        {emiDetails && (
          <div className="mt-6 p-4 bg-gradient-to-br from-indigo-50 to-white rounded-lg border border-indigo-200">
            <h4 className="text-lg font-semibold text-gray-900 mb-4">EMI Details</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <p className="text-sm text-gray-500">Monthly EMI</p>
                <p className="text-xl font-bold text-gray-900">₹{Math.round(emiDetails.emi).toLocaleString()}</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <p className="text-sm text-gray-500">Total Interest</p>
                <p className="text-xl font-bold text-gray-900">₹{Math.round(emiDetails.totalInterest).toLocaleString()}</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <p className="text-sm text-gray-500">Total Amount</p>
                <p className="text-xl font-bold text-gray-900">₹{Math.round(emiDetails.totalAmount).toLocaleString()}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Enhanced Loan Features Component
const LoanFeatures = () => {
  const features = [
    {
      icon: <FaRocket className="w-6 h-6" />,
      title: "Quick Disbursal",
      description: "Get your car loan approved and disbursed within 24 hours",
      highlight: "24 Hours",
      image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=300&fit=crop"
    },
    {
      icon: <FaChartBar className="w-6 h-6" />,
      title: "Competitive Rates",
      description: "Enjoy interest rates starting from 7.5% p.a.",
      highlight: "7.5% p.a.",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop"
    },
    {
      icon: <FaUserCheck className="w-6 h-6" />,
      title: "Easy Eligibility",
      description: "Simple documentation and quick approval process",
      highlight: "100% Digital",
      image: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=400&h=300&fit=crop"
    },
    {
      icon: <FaMoneyCheckAlt className="w-6 h-6" />,
      title: "Flexible Repayment",
      description: "Choose repayment tenure from 12 to 60 months",
      highlight: "12-60 Months",
      image: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=400&h=300&fit=crop"
    }
  ];

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200 hover:border-indigo-200 transition-all duration-300">
      <div className="flex items-center space-x-3 mb-6">
        <div className="p-2 bg-indigo-100 rounded-lg">
          <FaStar className="w-6 h-6 text-indigo-600" />
        </div>
        <h3 className="text-xl font-semibold text-gray-900">Loan Features & Benefits</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {features.map((feature, index) => (
          <div key={index} className="group relative overflow-hidden rounded-lg">
            <div className="aspect-w-16 aspect-h-9">
              <img
                src={feature.image}
                alt={feature.title}
                className="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent p-6 flex flex-col justify-end">
              <div className="flex items-center space-x-3 mb-2">
                <div className="p-2 bg-indigo-100 rounded-lg">
                  {feature.icon}
                </div>
                <h4 className="text-lg font-semibold text-white">{feature.title}</h4>
              </div>
              <p className="text-sm text-gray-200 mb-2">{feature.description}</p>
              <span className="inline-block px-3 py-1 bg-indigo-600 text-white text-sm rounded-full">
                {feature.highlight}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Enhanced How It Works Component
const HowItWorks = () => {
  const steps = [
    {
      icon: <FaFileAlt className="w-5 h-5" />,
      title: "Apply Online",
      description: "Fill out the simple application form with your details",
      color: "from-blue-50 to-indigo-50"
    },
    {
      icon: <FaCalculator className="w-5 h-5" />,
      title: "Check Eligibility",
      description: "Get instant approval based on your profile",
      color: "from-indigo-50 to-purple-50"
    },
    {
      icon: <FaShieldAlt className="w-5 h-5" />,
      title: "Document Verification",
      description: "Upload required documents for verification",
      color: "from-purple-50 to-pink-50"
    },
    {
      icon: <FaMoneyBillWave className="w-5 h-5" />,
      title: "Get Disbursed",
      description: "Receive loan amount in your account",
      color: "from-pink-50 to-red-50"
    }
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 hover:border-indigo-200 transition-colors duration-200">
      <div className="flex items-center space-x-3 mb-8">
        <div className="p-2 bg-gradient-to-br from-indigo-500 to-blue-600 rounded-lg">
          <FaClock className="w-5 h-5 text-white" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900">How It Works</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {steps.map((step, index) => (
          <div 
            key={index} 
            className="relative group"
          >
            <div className={`p-5 bg-gradient-to-br ${step.color} rounded-xl border border-gray-100 hover:border-indigo-200 transition-all duration-300 hover:shadow-md`}>
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-indigo-600 mb-4 shadow-sm group-hover:scale-110 transition-transform duration-300">
                  {step.icon}
                </div>
                <h4 className="text-sm font-semibold text-gray-900 mb-2">{step.title}</h4>
                <p className="text-xs text-gray-600">{step.description}</p>
              </div>
            </div>
            {index < steps.length - 1 && (
              <div className="hidden lg:block absolute top-1/2 -right-3 transform -translate-y-1/2">
                <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center shadow-sm">
                  <FaChevronRight className="w-3 h-3 text-indigo-400" />
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-8 text-center">
        <p className="text-sm text-gray-600">
          <span className="font-medium text-indigo-600">Quick Process:</span> Complete your application in just 5 minutes
        </p>
      </div>
    </div>
  );
};

// Enhanced Testimonials Component
const Testimonials = () => {
  const testimonials = [
    {
      name: "Rahul Sharma",
      role: "Software Engineer",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=faces",
      rating: 5,
      comment: "The loan process was incredibly smooth and fast. I got my loan approved within 24 hours!",
      loanAmount: "₹5,00,000",
      loanPurpose: "Home Renovation"
    },
    {
      name: "Priya Patel",
      role: "Business Owner",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=faces",
      rating: 5,
      comment: "Best interest rates in the market. The customer service was excellent throughout the process.",
      loanAmount: "₹8,00,000",
      loanPurpose: "Business Expansion"
    },
    {
      name: "Amit Kumar",
      role: "Doctor",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=faces",
      rating: 4,
      comment: "Very professional service. The online application process was simple and straightforward.",
      loanAmount: "₹3,00,000",
      loanPurpose: "Medical Equipment"
    }
  ];

  const progressSteps = [
    { 
      id: 1, 
      title: "Application Submitted", 
      icon: "✅", 
      status: "completed",
      description: "Your application has been successfully submitted"
    },
    { 
      id: 2, 
      title: "Under Review", 
      icon: "⏳", 
      status: "current",
      description: "We are reviewing your application details"
    },
    { 
      id: 3, 
      title: "Docs Verified", 
      icon: "📝", 
      status: "pending",
      description: "Document verification in progress"
    },
    { 
      id: 4, 
      title: "Disbursed", 
      icon: "💰", 
      status: "pending",
      description: "Loan amount will be credited to your account"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Customer Testimonials */}
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 hover:border-indigo-200 transition-colors duration-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Customer Testimonials</h3>
        <div className="space-y-4">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="flex items-start space-x-3 p-3 bg-gradient-to-br from-indigo-50 to-white rounded-lg border border-indigo-100 hover:border-indigo-200 transition-colors duration-200">
              <div className="p-2 bg-indigo-100 rounded-lg">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="w-8 h-8 rounded-full object-cover"
                />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <div>
                    <h4 className="text-sm font-medium text-gray-900 text-left">{testimonial.name}</h4>
                    <p className="text-xs text-gray-600 text-left">{testimonial.role}</p>
                  </div>
                  <div className="flex items-center space-x-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <FaStar key={i} className="w-3 h-3 text-yellow-400" />
                    ))}
                  </div>
                </div>
                <p className="text-xs text-gray-600 mb-1 text-left">{testimonial.comment}</p>
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>Amount: {testimonial.loanAmount}</span>
                  <span>{testimonial.loanPurpose}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Application Progress Tracker */}
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 hover:border-indigo-200 transition-colors duration-200">
        <div className="flex items-center space-x-3 mb-6">
          <div className="p-2 bg-gradient-to-br from-indigo-500 to-blue-600 rounded-lg">
            <FaClock className="w-5 h-5 text-white" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900">Application Progress</h3>
        </div>
        <div className="space-y-4">
          {progressSteps.map((step) => (
            <div key={step.id} className="relative">
              {/* Vertical Line */}
              {step.id < progressSteps.length && (
                <div className={`absolute left-5 top-10 w-0.5 h-12 ${
                  step.status === 'completed' ? 'bg-green-200' : 'bg-gray-200'
                }`}></div>
              )}
              
              <div className="flex items-start space-x-4">
                {/* Status Icon */}
                <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                  step.status === 'completed' ? 'bg-green-100 text-green-600' :
                  step.status === 'current' ? 'bg-indigo-100 text-indigo-600' :
                  'bg-gray-100 text-gray-400'
                }`}>
                  <span className="text-lg">{step.icon}</span>
                </div>

                {/* Content */}
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className={`text-sm font-medium ${
                      step.status === 'completed' ? 'text-green-600' :
                      step.status === 'current' ? 'text-indigo-600' :
                      'text-gray-600'
                    }`}>
                      {step.title}
                    </h4>
                    {step.status === 'current' && (
                      <span className="px-2 py-1 text-xs font-medium bg-indigo-50 text-indigo-600 rounded-full">
                        In Progress
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-gray-500 text-left">{step.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Referral Banner */}
      <div className="bg-gradient-to-r from-indigo-600 to-blue-600 rounded-xl p-6 text-white">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-center md:text-left">
            <h3 className="text-lg font-semibold mb-1">Special Offers</h3>
            <p className="text-sm text-indigo-100">Get ₹500 cashback on successful disbursal!</p>
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            <div className="flex items-center space-x-2 px-4 py-2 bg-white/10 rounded-lg backdrop-blur-sm">
              <FaMoneyBillWave className="w-5 h-5" />
              <span className="text-sm font-medium">Cashback</span>
            </div>
            <div className="flex items-center space-x-2 px-4 py-2 bg-white/10 rounded-lg backdrop-blur-sm">
              <FaUserFriends className="w-5 h-5" />
              <span className="text-sm font-medium">Refer & Earn</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Eligibility Criteria Component
const EligibilityCriteria = () => {
  const criteria = [
    { icon: <FaUser />, title: 'Age', description: '21–60 years' },
    { icon: <FaMoneyBillWave />, title: 'Monthly Income', description: 'Minimum ₹15,000' },
    { icon: <FaBriefcase />, title: 'Employment', description: 'Salaried or self-employed' },
    { icon: <FaChartLine />, title: 'CIBIL Score', description: '700+' }
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 hover:border-indigo-200 transition-colors duration-200">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Eligibility Criteria</h3>
      <div className="space-y-4">
        {criteria.map((item, index) => (
          <div key={index} className="flex items-start space-x-3 p-3 bg-gradient-to-br from-indigo-50 to-white rounded-lg border border-indigo-100 hover:border-indigo-200 transition-colors duration-200">
            <div className="p-2 bg-indigo-100 rounded-lg">
              {item.icon}
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-900 text-left">{item.title}</h4>
              <p className="text-xs text-gray-600 text-left">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Required Documents Component
const RequiredDocuments = () => {
  const documents = [
    { icon: <FaIdCard />, title: 'PAN Card', description: 'For identity verification' },
    { icon: <FaIdCard />, title: 'Aadhaar Card', description: 'For address proof' },
    { icon: <FaFileInvoiceDollar />, title: 'Salary Slips / ITR', description: 'For income proof' },
    { icon: <FaFileAlt />, title: 'Bank Statements', description: 'Last 3-6 months' }
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 hover:border-indigo-200 transition-colors duration-200">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Required Documents</h3>
      <div className="space-y-4">
        {documents.map((doc, index) => (
          <div key={index} className="flex items-start space-x-3 p-3 bg-gradient-to-br from-indigo-50 to-white rounded-lg border border-indigo-100 hover:border-indigo-200 transition-colors duration-200">
            <div className="p-2 bg-indigo-100 rounded-lg">
              {doc.icon}
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-900 text-left">{doc.title}</h4>
              <p className="text-xs text-gray-600 text-left">{doc.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// FAQ Component
const FAQ = () => {
  const faqs = [
    {
      question: 'What is the interest rate?',
      answer: 'Interest rates start from 10.25% p.a. and vary based on your profile, loan amount, and tenure.'
    },
    {
      question: 'How long does disbursal take?',
      answer: 'Once approved, the loan amount is typically disbursed within 24 hours.'
    },
    {
      question: 'Can I pre-close the loan?',
      answer: 'Yes, you can pre-close your loan after 6 months with minimal charges.'
    },
    {
      question: 'Is there a processing fee?',
      answer: 'Yes, there is a nominal processing fee of up to 2% of the loan amount.'
    }
  ];

  const [openIndex, setOpenIndex] = useState(null);

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 hover:border-indigo-200 transition-colors duration-200">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Frequently Asked Questions</h3>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div key={index} className="border border-gray-200 rounded-lg">
            <button
              className="w-full px-4 py-3 text-left flex items-center justify-between hover:bg-gray-50 transition-colors duration-200"
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
            >
              <span className="text-sm font-medium text-gray-900 text-left">{faq.question}</span>
              {openIndex === index ? (
                <FaChevronUp className="w-4 h-4 text-gray-500" />
              ) : (
                <FaChevronDown className="w-4 h-4 text-gray-500" />
              )}
            </button>
            {openIndex === index && (
              <div className="px-4 py-3 bg-gray-50 border-t border-gray-200">
                <p className="text-sm text-gray-600 text-left">{faq.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

// Enhanced Security Badges Component
const SecurityBadges = () => {
  const badges = [
    { 
      icon: <FaShieldAlt />, 
      title: 'Bank-Grade Security', 
      description: '256-bit encryption for data protection',
      image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=400&h=300&fit=crop"
    },
    { 
      icon: <FaLock />, 
      title: 'Safe & Secure', 
      description: 'ISO 27001 certified security protocols',
      image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=400&h=300&fit=crop"
    },
    { 
      icon: <FaUserShield />, 
      title: 'Privacy Protected', 
      description: 'Your information is never shared with third parties',
      image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=400&h=300&fit=crop"
    }
  ];

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-200 hover:border-indigo-300 transition-all duration-300">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <div className="p-3 bg-indigo-100 rounded-xl shadow-inner">
          <FaShieldAlt className="w-6 h-6 text-indigo-600" />
        </div>
        <h3 className="text-2xl font-bold text-gray-900 tracking-tight">
          Security & Trust
        </h3>
      </div>

      {/* Badges Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {badges.map((badge, index) => (
          <div
            key={index}
            className="relative group overflow-hidden rounded-xl shadow-md transition-all duration-300 hover:shadow-xl"
          >
            <div className="aspect-w-16 aspect-h-9 bg-gray-100">
              <img
                src={badge.image}
                alt={badge.title}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6 flex flex-col justify-end transition-opacity duration-300">
              <div className="w-12 h-12 mb-4 rounded-full bg-indigo-100 flex items-center justify-center shadow-sm">
                {badge.icon}
              </div>
              <h4 className="text-white text-lg font-semibold mb-2 leading-tight">
                {badge.title}
              </h4>
              <p className="text-gray-200 text-sm leading-snug">
                {badge.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Loan Application Modal Component
const LoanApplicationModal = ({ isOpen, onClose, onSubmit, applicationData, onInputChange, onFileUpload, applicationStatus: initialStatus, verificationProgress }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [uploadedFiles, setUploadedFiles] = useState({});
  const [uploadProgress, setUploadProgress] = useState({});
  const [applicationStatus, setApplicationStatus] = useState(initialStatus);
  const [verificationDetails, setVerificationDetails] = useState({
    identity: { status: 'pending', message: 'Verifying identity documents...' },
    income: { status: 'pending', message: 'Verifying income documents...' },
    credit: { status: 'pending', message: 'Checking credit score...' },
    documents: { status: 'pending', message: 'Verifying uploaded documents...' }
  });
  const [showCongratsModal, setShowCongratsModal] = useState(false);
  const [loanDetails, setLoanDetails] = useState(null);

  // Reset state when modal opens
  useEffect(() => {
    if (isOpen) {
      setCurrentStep(1);
      setUploadedFiles({});
      setUploadProgress({});
      setApplicationStatus(initialStatus);
      setVerificationDetails({
        identity: { status: 'pending', message: 'Verifying identity documents...' },
        income: { status: 'pending', message: 'Verifying income documents...' },
        credit: { status: 'pending', message: 'Checking credit score...' },
        documents: { status: 'pending', message: 'Verifying uploaded documents...' }
      });
      setShowCongratsModal(false);
      setLoanDetails(null);
    }
  }, [isOpen, initialStatus]);

  const steps = [
    { id: 1, title: 'Loan Details', icon: <FaMoneyBillWave /> },
    { id: 2, title: 'Personal Info', icon: <FaUser /> },
    { id: 3, title: 'Documents', icon: <FaFileAlt /> },
    { id: 4, title: 'Review', icon: <FaCheckCircle /> }
  ];

  const handleSubmit = async () => {
    setApplicationStatus('processing');
    
    try {
      // Simulate verification steps
      const verificationSteps = ['identity', 'income', 'credit', 'documents'];
      for (let i = 0; i < verificationSteps.length; i++) {
        // Update status to in progress
        setVerificationDetails(prev => ({
          ...prev,
          [verificationSteps[i]]: {
            ...prev[verificationSteps[i]],
            status: 'in_progress'
          }
        }));

        // Simulate processing time
        await new Promise(resolve => setTimeout(resolve, 1500));

        // Update status to completed
        setVerificationDetails(prev => ({
          ...prev,
          [verificationSteps[i]]: {
            ...prev[verificationSteps[i]],
            status: 'completed'
          }
        }));
      }

      // Set final loan details
      const finalLoanDetails = {
        loanId: `LOAN${Math.floor(Math.random() * 1000000)}`,
        amount: applicationData.amount,
        tenure: applicationData.tenure,
        emi: Math.round((applicationData.amount * (1 + 0.1 * applicationData.tenure / 12)) / applicationData.tenure),
        disbursalDate: new Date(Date.now() + 24 * 60 * 60 * 1000).toLocaleDateString()
      };
      
      setLoanDetails(finalLoanDetails);
      onSubmit(finalLoanDetails);
      setShowCongratsModal(true);
    } catch {
      setApplicationStatus('rejected');
      setVerificationDetails(prev => ({
        ...prev,
        documents: {
          ...prev.documents,
          status: 'failed',
          message: 'Verification failed. Please try again.'
        }
      }));
    }
  };

  const handleFileUpload = (e, documentType) => {
    const files = Array.from(e.target.files);
    setUploadedFiles(prev => ({
      ...prev,
      [documentType]: files
    }));

    // Simulate upload progress
    files.forEach((file, index) => {
      let progress = 0;
      const interval = setInterval(() => {
        progress += 10;
        setUploadProgress(prev => ({
          ...prev,
          [`${documentType}-${index}`]: progress
        }));
        if (progress >= 100) clearInterval(interval);
      }, 200);
    });

    onFileUpload(e);
  };

  const renderCongratsModal = () => {
    if (!showCongratsModal) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-lg max-w-lg w-full p-8 text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <FaCheck className="w-10 h-10 text-green-600" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Congratulations!</h3>
          <p className="text-gray-600 mb-6">Your loan application has been approved successfully.</p>
          
          <div className="bg-gray-50 rounded-lg p-6 mb-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Loan ID</p>
                <p className="font-semibold text-gray-900">{loanDetails.loanId}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Loan Amount</p>
                <p className="font-semibold text-gray-900">₹{loanDetails.amount}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Monthly EMI</p>
                <p className="font-semibold text-gray-900">₹{loanDetails.emi}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Disbursal Date</p>
                <p className="font-semibold text-gray-900">{loanDetails.disbursalDate}</p>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <button
              onClick={() => {
                setShowCongratsModal(false);
                onClose();
              }}
              className="w-full px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200"
            >
              Done
            </button>
            <button
              onClick={() => {
                setShowCongratsModal(false);
                onClose();
              }}
              className="w-full px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200"
            >
              Download Details
            </button>
          </div>
        </div>
      </div>
    );
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Loan Amount
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">₹</span>
                <input
                  type="number"
                  name="amount"
                  value={applicationData.amount}
                  onChange={onInputChange}
                  className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Enter loan amount"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Loan Purpose
              </label>
              <select
                name="purpose"
                value={applicationData.purpose}
                onChange={onInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                required
              >
                <option value="">Select purpose</option>
                <option value="home_renovation">Home Renovation</option>
                <option value="wedding">Wedding</option>
                <option value="education">Education</option>
                <option value="medical">Medical Emergency</option>
                <option value="business">Business</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Loan Tenure (in months)
              </label>
              <input
                type="number"
                name="tenure"
                value={applicationData.tenure}
                onChange={onInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Enter loan tenure"
                required
              />
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Employment Type
              </label>
              <select
                name="employmentType"
                value={applicationData.employmentType}
                onChange={onInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                required
              >
                <option value="">Select employment type</option>
                <option value="salaried">Salaried</option>
                <option value="self_employed">Self Employed</option>
                <option value="business">Business</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 ">
                Monthly Income
              </label>  
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">₹</span>
                <input
                  type="number"
                  name="monthlyIncome"
                  value={applicationData.monthlyIncome}
                  onChange={onInputChange}
                  className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Enter monthly income"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                PAN Number
              </label>
              <input
                type="text"
                name="panNumber"
                value={applicationData.panNumber || ''}
                onChange={onInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Enter PAN number"
                required
              />
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Identity Proof
                </label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg">
                  <div className="space-y-1 text-center">
                    <FaUpload className="mx-auto h-12 w-12 text-gray-400" />
                    <div className="flex text-sm text-gray-600">
                      <label className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500">
                        <span>Upload Aadhaar/PAN</span>
                        <input
                          type="file"
                          className="sr-only"
                          onChange={(e) => handleFileUpload(e, 'identity')}
                          accept=".pdf,.jpg,.jpeg,.png"
                        />
                      </label>
                    </div>
                    {uploadedFiles.identity && (
                      <div className="mt-2">
                        {uploadedFiles.identity.map((file, index) => (
                          <div key={index} className="flex items-center justify-between text-sm">
                            <span className="text-gray-500">{file.name}</span>
                            <div className="w-24 bg-gray-200 rounded-full h-2">
                              <div
                                className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
                                style={{ width: `${uploadProgress[`identity-${index}`] || 0}%` }}
                              ></div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Income Proof
                </label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg">
                  <div className="space-y-1 text-center">
                    <FaUpload className="mx-auto h-12 w-12 text-gray-400" />
                    <div className="flex text-sm text-gray-600">
                      <label className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500">
                        <span>Upload Salary Slips/ITR</span>
                        <input
                          type="file"
                          className="sr-only"
                          onChange={(e) => handleFileUpload(e, 'income')}
                          accept=".pdf,.jpg,.jpeg,.png"
                        />
                      </label>
                    </div>
                    {uploadedFiles.income && (
                      <div className="mt-2">
                        {uploadedFiles.income.map((file, index) => (
                          <div key={index} className="flex items-center justify-between text-sm">
                            <span className="text-gray-500">{file.name}</span>
                            <div className="w-24 bg-gray-200 rounded-full h-2">
                              <div
                                className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
                                style={{ width: `${uploadProgress[`income-${index}`] || 0}%` }}
                              ></div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Bank Statements
                </label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg">
                  <div className="space-y-1 text-center">
                    <FaUpload className="mx-auto h-12 w-12 text-gray-400" />
                    <div className="flex text-sm text-gray-600">
                      <label className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500">
                        <span>Upload Bank Statements</span>
                        <input
                          type="file"
                          className="sr-only"
                          onChange={(e) => handleFileUpload(e, 'bank')}
                          accept=".pdf"
                        />
                      </label>
                    </div>
                    {uploadedFiles.bank && (
                      <div className="mt-2">
                        {uploadedFiles.bank.map((file, index) => (
                          <div key={index} className="flex items-center justify-between text-sm">
                            <span className="text-gray-500">{file.name}</span>
                            <div className="w-24 bg-gray-200 rounded-full h-2">
                              <div
                                className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
                                style={{ width: `${uploadProgress[`bank-${index}`] || 0}%` }}
                              ></div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="text-lg font-medium text-gray-900 mb-4">Application Summary</h4>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Loan Amount:</span>
                  <span className="font-medium">₹{applicationData.amount}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Purpose:</span>
                  <span className="font-medium">{applicationData.purpose}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tenure:</span>
                  <span className="font-medium">{applicationData.tenure} months</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Employment Type:</span>
                  <span className="font-medium">{applicationData.employmentType}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Monthly Income:</span>
                  <span className="font-medium">₹{applicationData.monthlyIncome}</span>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="text-lg font-medium text-gray-900 mb-4">Document Status</h4>
              <div className="space-y-3">
                {Object.entries(uploadedFiles).map(([type, files]) => (
                  <div key={type} className="flex justify-between items-center">
                    <span className="text-gray-600 capitalize">{type}:</span>
                    <span className="text-green-600">
                      {files.length} file{files.length !== 1 ? 's' : ''} uploaded
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h3 className="text-xl font-semibold text-gray-900">Loan Application</h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500 focus:outline-none"
            >
              <FaTimes className="w-5 h-5" />
            </button>
          </div>

          {/* Progress Steps */}
          <div className="px-8 py-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              {steps.map((step) => (
                <div key={step.id} className="flex items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      currentStep >= step.id
                        ? 'bg-indigo-600 text-white'
                        : 'bg-gray-200 text-gray-600'
                    }`}
                  >
                    {step.icon}
                  </div>
                  <span
                    className={`ml-2 text-sm font-medium ${
                      currentStep >= step.id ? 'text-indigo-600' : 'text-gray-500'
                    }`}
                  >
                    {step.title}
                  </span>
                  {step.id < steps.length && (
                    <div
                      className={`w-24 h-0.5 mx-4 ${
                        currentStep > step.id ? 'bg-indigo-600' : 'bg-gray-200'
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="p-8">
            {applicationStatus === 'processing' ? (
              <div className="space-y-6">
                <div className="text-center">
                  <div className="w-16 h-16 rounded-full border-4 border-indigo-200 border-t-indigo-600 animate-spin mx-auto mb-4"></div>
                  <h4 className="text-lg font-medium text-gray-900 mb-2">Processing Your Application</h4>
                  <p className="text-gray-600">Please wait while we verify your details</p>
                </div>

                <div className="space-y-4">
                  {Object.entries(verificationDetails).map(([key, detail]) => (
                    <div key={key} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          detail.status === 'completed' ? 'bg-green-100 text-green-600' :
                          detail.status === 'in_progress' ? 'bg-yellow-100 text-yellow-600' :
                          'bg-gray-100 text-gray-600'
                        }`}>
                          {detail.status === 'completed' ? (
                            <FaCheck className="w-4 h-4" />
                          ) : detail.status === 'in_progress' ? (
                            <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
                          ) : (
                            <FaClock className="w-4 h-4" />
                          )}
                        </div>
                        <div>
                          <span className="text-sm font-medium text-gray-900 capitalize">{key}</span>
                          <p className="text-xs text-gray-500">{detail.message}</p>
                        </div>
                      </div>
                      <span className={`text-sm font-medium ${
                        detail.status === 'completed' ? 'text-green-600' :
                        detail.status === 'in_progress' ? 'text-yellow-600' :
                        'text-gray-600'
                      }`}>
                        {detail.status.charAt(0).toUpperCase() + detail.status.slice(1)}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-indigo-600 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${verificationProgress}%` }}
                  ></div>
                </div>
              </div>
            ) : (
              <>
                {renderStepContent()}
                <div className="mt-8 flex justify-between">
                  {currentStep > 1 && (
                    <button
                      onClick={() => setCurrentStep(prev => prev - 1)}
                      className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                    >
                      Previous
                    </button>
                  )}
                  <button
                    onClick={() => {
                      if (currentStep < steps.length) {
                        setCurrentStep(prev => prev + 1);
                      } else {
                        handleSubmit();
                      }
                    }}
                    className={`px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 ${
                      currentStep === 1 ? 'ml-auto' : ''
                    }`}
                  >
                    {currentStep === steps.length ? 'Submit Application' : 'Next'}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      {renderCongratsModal()}
    </>
  );
};

// Main HomeLoan Component
const HomeLoan = () => {
  const { user: currentUser } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');
  const [isApplicationModalOpen, setIsApplicationModalOpen] = useState(false);
  const [applicationData, setApplicationData] = useState({
    amount: '',
    purpose: '',
    tenure: '',
    employmentType: '',
    monthlyIncome: '',
    propertyValue: '',
    downPayment: '',
    propertyType: '',
    documents: [],
    verificationStatus: {
      identity: 'pending',
      income: 'pending',
      credit: 'pending',
      documents: 'pending'
    }
  });
  const [applicationStatus, setApplicationStatus] = useState('draft');
  const [verificationProgress, setVerificationProgress] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const showSuccessNotification = (message) => {
    setNotificationMessage(message);
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
  };

  const handleCalculate = (details) => {
    // Store loan details for reference and use them in the application
    const loanInfo = {
      ...details,
      userId: currentUser?.uid,
      timestamp: new Date().toISOString()
    };
    
    // Update application data with calculated loan details
    setApplicationData(prev => ({
      ...prev,
      amount: loanInfo.amount || prev.amount,
      tenure: loanInfo.tenure || prev.tenure
    }));
    
    showSuccessNotification('EMI calculated successfully!');
  };

  const handleDocumentUpload = (files) => {
    const uploadedFiles = Array.from(files);
    setApplicationData(prev => ({
      ...prev,
      documents: [...prev.documents, ...uploadedFiles]
    }));
    showSuccessNotification('Documents uploaded successfully!');
  };

  const handleApplyNow = () => {
    setIsApplicationModalOpen(true);
  };

  const handleApplicationSubmit = async () => {
    setApplicationStatus('processing');
    setVerificationProgress(0);

    try {
      // Simulate verification process
      const verificationSteps = ['identity', 'income', 'credit', 'documents'];
      for (let i = 0; i < verificationSteps.length; i++) {
        await new Promise(resolve => setTimeout(resolve, 1000));
        setApplicationData(prev => ({
          ...prev,
          verificationStatus: {
            ...prev.verificationStatus,
            [verificationSteps[i]]: 'in_progress'
          }
        }));
        setVerificationProgress((i + 1) * 25);

        await new Promise(resolve => setTimeout(resolve, 1000));
        setApplicationData(prev => ({
          ...prev,
          verificationStatus: {
            ...prev.verificationStatus,
            [verificationSteps[i]]: 'completed'
          }
        }));
      }

      setApplicationStatus('approved');
      showSuccessNotification('Loan application approved successfully!');
      
      setTimeout(() => {
        setIsApplicationModalOpen(false);
        setApplicationStatus('draft');
        setVerificationProgress(0);
      }, 2000);
    } catch {
      setApplicationStatus('rejected');
      showSuccessNotification('Application rejected. Please try again.');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setApplicationData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileUpload = (e) => {
    const files = e.target.files;
    if (files) {
      handleDocumentUpload(files);
    }
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
        {/* Enhanced Hero Section */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-indigo-600 via-blue-600 to-indigo-700 mb-12">
          {/* Background Pattern */}
          <div className="absolute inset-0 bg-grid-white/10 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))]"></div>
          
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-1/3 h-full">
            <div className="absolute inset-0 bg-gradient-to-l from-indigo-500/20 to-transparent"></div>
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=600&fit=crop')] bg-cover bg-center mix-blend-overlay opacity-20"></div>
          </div>
          
          <div className="relative px-8 py-12 sm:px-12 sm:py-16 lg:px-16 lg:py-20">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Left Content */}
              <div className="max-w-2xl">
                <div className="inline-block px-6 py-2.5 bg-white/10 rounded-full backdrop-blur-sm mb-8 border border-white/20">
                  <div className="flex items-center space-x-2">
                    <FaHome className="w-5 h-5 text-yellow-300" />
                    <span className="text-sm font-semibold text-white tracking-wide">Home Loans up to ₹5 Crores</span>
                  </div>
                </div>
                <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight tracking-tight">
                  Your Dream{' '}
                  <span className="relative">
                    Home
                    <span className="absolute -bottom-2 left-0 w-full h-1 bg-yellow-400 rounded-full"></span>
                  </span>
                </h1>
                <p className="text-xl md:text-2xl text-indigo-100 mb-10 leading-relaxed max-w-xl">
                  Quick approval, competitive rates, and flexible repayment options.{' '}
                  <span className="font-semibold text-white">Get your home loan approved in 24 hours!</span>
                </p>
                <div className="flex flex-col sm:flex-row gap-4 mb-12">
                  <button 
                    onClick={handleApplyNow}
                    className="px-8 py-4 bg-white text-indigo-600 rounded-xl hover:bg-indigo-50 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl flex items-center justify-center space-x-3 group relative overflow-hidden"
                  >
                    <span className="relative z-10 flex items-center space-x-3">
                      <FaRocket className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      <span className="text-lg">Apply Now</span>
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-indigo-50 to-white opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  </button>
                  <button 
                    onClick={() => document.querySelector('#eligibility-checker').scrollIntoView({ behavior: 'smooth' })}
                    className="px-8 py-4 bg-indigo-700/80 text-white rounded-xl hover:bg-indigo-800 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl flex items-center justify-center space-x-3 group relative overflow-hidden backdrop-blur-sm"
                  >
                    <span className="relative z-10 flex items-center space-x-3">
                      <FaCalculator className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                      <span className="text-lg">Check Eligibility</span>
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-indigo-700 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  </button>
                </div>
                <div className="flex flex-wrap items-center gap-4">
                  <span className="flex items-center bg-white/10 px-4 py-2 rounded-full text-sm backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-colors duration-300">
                    <FaStar className="text-yellow-300 mr-2 w-4 h-4" />
                    <span className="font-medium">4.8/5 on Google</span>
                  </span>
                  <span className="flex items-center bg-white/10 px-4 py-2 rounded-full text-sm backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-colors duration-300">
                    <FaLock className="mr-2 w-4 h-4 text-green-300" />
                    <span className="font-medium">Safe & Secure</span>
                  </span>
                  <span className="flex items-center bg-white/10 px-4 py-2 rounded-full text-sm backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-colors duration-300">
                    <FaUserShield className="mr-2 w-4 h-4 text-blue-300" />
                    <span className="font-medium">Trusted by 1M+</span>
                  </span>
                </div>
              </div>

              {/* Right Content - Hero Image */}
              <div className="relative hidden lg:block">
                <div className="relative z-10">
                  <img
                    src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=600&fit=crop"
                    alt="Dream Home"
                    className="rounded-lg shadow-2xl transform hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-lg shadow-xl">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-indigo-100 rounded-lg">
                        <FaMoneyBillWave className="w-6 h-6 text-indigo-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Starting from</p>
                        <p className="text-lg font-bold text-gray-900">8.5% p.a.</p>
                      </div>
                    </div>
                  </div>
                  <div className="absolute -top-6 -right-6 bg-white p-4 rounded-lg shadow-xl">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-green-100 rounded-lg">
                        <FaCheckCircle className="w-6 h-6 text-green-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Quick Approval</p>
                        <p className="text-lg font-bold text-gray-900">24 Hours</p>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Decorative Elements */}
                <div className="absolute top-1/2 -left-4 w-8 h-8 bg-yellow-400 rounded-full blur-xl opacity-50"></div>
                <div className="absolute bottom-1/4 -right-4 w-8 h-8 bg-blue-400 rounded-full blur-xl opacity-50"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            <div id="eligibility-checker">
              <EligibilityChecker onCheck={showSuccessNotification} />
            </div>
            <LoanFeatures />
            <HowItWorks />
            <EMICalculator onCalculate={handleCalculate} />
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            <EligibilityCriteria />
            <RequiredDocuments />
            <Testimonials />
          </div>
        </div>

        {/* Bottom Sections */}
        <div className="mt-8 space-y-8">
          <FAQ />
          <SecurityBadges />
        </div>

        {/* Final CTA */}
        <div className="mt-8 bg-gradient-to-r from-indigo-600 to-blue-600 rounded-xl p-8 text-center transform hover:scale-[1.02] transition-transform duration-300">
          <h3 className="text-xl font-bold text-white mb-4">Ready to Own Your Dream Home?</h3>
          <p className="text-indigo-100 mb-6">Apply now and get instant approval for your home loan</p>
          <button 
            onClick={handleApplyNow}
            className="px-8 py-3 bg-white text-indigo-600 rounded-lg hover:bg-indigo-50 transition-all duration-200 font-medium shadow-lg hover:shadow-xl flex items-center space-x-2 mx-auto"
          >
            <FaRocket className="w-5 h-5" />
            <span>Apply Now</span>
          </button>
        </div>
      </main>

      <DashboardPageFooter />

      {/* Loan Application Modal */}
      <LoanApplicationModal
        isOpen={isApplicationModalOpen}
        onClose={() => setIsApplicationModalOpen(false)}
        onSubmit={handleApplicationSubmit}
        applicationData={applicationData}
        onInputChange={handleInputChange}
        onFileUpload={handleFileUpload}
        applicationStatus={applicationStatus}
        verificationProgress={verificationProgress}
      />
    </div>
  );
};

export default HomeLoan; 