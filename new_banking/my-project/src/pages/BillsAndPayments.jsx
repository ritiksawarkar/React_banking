import React, { useState, useRef } from 'react';
import { 
  FaFileInvoiceDollar, FaPlus, FaCalendarAlt, FaHistory,
  FaLightbulb, FaMobileAlt, FaTv, FaHome, FaCar,
  FaCreditCard, FaDownload, FaPrint, FaTimes,
  FaCheckCircle, FaExclamationCircle, FaClock,
  FaSpinner, FaReceipt, FaWallet, FaUniversity,
  FaLock, FaShieldAlt, FaChevronRight, FaFilePdf,
  FaWifi, FaFire, FaWater, FaBuilding, FaShoppingCart,
  FaPlay, FaBus, FaGraduationCap, FaLandmark,
  FaMoneyBillWave
} from 'react-icons/fa';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import DashboardPageHeader from '../components/DashboardPageHeader';
import DashboardPageFooter from '../components/DashboardPageFooter';
import { ReceiptContent, BillDetailsContent, PDFActions } from '../components/PDFComponents';
import { toast } from 'react-toastify';

const BillsAndPayments = () => {
  const [selectedBill, setSelectedBill] = useState(null);
  const [showAddBill, setShowAddBill] = useState(false);
  const [activeTab, setActiveTab] = useState('upcoming');
  const [showReceipt, setShowReceipt] = useState(false);
  const [receiptData, setReceiptData] = useState(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');
  const [paymentStep, setPaymentStep] = useState('method'); // method, confirm, processing
  const [paymentError, setPaymentError] = useState('');
  const [paymentAmount, setPaymentAmount] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedProvider, setSelectedProvider] = useState('');
  const [showMobileRecharge, setShowMobileRecharge] = useState(false);
  const [showDTHRecharge, setShowDTHRecharge] = useState(false);
  const [showBroadband, setShowBroadband] = useState(false);
  const [showElectricity, setShowElectricity] = useState(false);
  const [showGas, setShowGas] = useState(false);
  const [showWater, setShowWater] = useState(false);
  const [showInsurance, setShowInsurance] = useState(false);
  const [showEducation, setShowEducation] = useState(false);
  const [showMunicipal, setShowMunicipal] = useState(false);
  const [showFastag, setShowFastag] = useState(false);
  const [showCreditCard, setShowCreditCard] = useState(false);
  const [showLoanEMI, setShowLoanEMI] = useState(false);
  const [showMutualFunds, setShowMutualFunds] = useState(false);
  const [showSIP, setShowSIP] = useState(false);
  const [showGold, setShowGold] = useState(false);
  const [showFixedDeposits, setShowFixedDeposits] = useState(false);
  const [showRecurringDeposits, setShowRecurringDeposits] = useState(false);
  const [showSubscriptionOTT, setShowSubscriptionOTT] = useState(false);
  const [showTransportTravel, setShowTransportTravel] = useState(false);
  const [showGovtServices, setShowGovtServices] = useState(false);
  const [showOthers, setShowOthers] = useState(false);
  const [bills, setBills] = useState([
    {
      id: 1,
      type: 'electricity',
      provider: 'MSEB',
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
      provider: 'Tata Play',
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
      provider: 'BMC',
      amount: 800.00,
      dueDate: '2024-03-28',
      status: 'pending',
      billNumber: 'WT901234',
      consumption: '20 KL',
      previousReading: '45678',
      currentReading: '45878',
      billDate: '2024-03-14',
      category: 'utilities'
    },
    {
      id: 5,
      type: 'broadband',
      provider: 'JioFiber',
      amount: 999.00,
      dueDate: '2024-03-30',
      status: 'pending',
      billNumber: 'BB567890',
      plan: '100 Mbps Unlimited',
      billDate: '2024-03-15',
      category: 'utilities'
    },
    {
      id: 6,
      type: 'gas',
      provider: 'HP Gas',
      amount: 950.00,
      dueDate: '2024-03-27',
      status: 'pending',
      billNumber: 'GS234567',
      cylinderType: 'Domestic',
      billDate: '2024-03-13',
      category: 'utilities'
    }
  ]);
  const [showSchedulePayment, setShowSchedulePayment] = useState(false);
  const [showPaymentHistory, setShowPaymentHistory] = useState(false);
  const [scheduledPayments, setScheduledPayments] = useState([
    {
      id: 1,
      type: 'Electricity',
      provider: 'State Electricity Board',
      amount: 1500.00,
      scheduledDate: '2024-03-15',
      scheduledTime: '10:00',
      status: 'scheduled',
      paymentMethod: 'UPI',
      transactionId: 'TXN123456'
    },
    {
      id: 2,
      type: 'Water',
      provider: 'Municipal Corporation',
      amount: 500.00,
      scheduledDate: '2024-03-14',
      scheduledTime: '11:00',
      status: 'scheduled',
      paymentMethod: 'Credit Card',
      transactionId: 'TXN123457'
    }
  ]);
  const [paymentHistory, setPaymentHistory] = useState([
    {
      id: 1,
      type: 'Electricity',
      provider: 'State Electricity Board',
      amount: 1500.00,
      date: '2024-03-15',
      status: 'completed',
      paymentMethod: 'UPI',
      transactionId: 'TXN123456'
    },
    {
      id: 2,
      type: 'Water',
      provider: 'Municipal Corporation',
      amount: 500.00,
      date: '2024-03-14',
      status: 'failed',
      paymentMethod: 'Credit Card',
      transactionId: 'TXN123457'
    }
  ]);

  const billRef = useRef(null);
  const receiptRef = useRef(null);

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

  // Payment methods data
  const paymentMethods = [
    {
      id: 'savings',
      name: 'Savings Account',
      icon: <FaUniversity className="w-6 h-6" />,
      balance: 25000.00,
      accountNumber: 'XXXX1234'
    },
    {
      id: 'wallet',
      name: 'Digital Wallet',
      icon: <FaWallet className="w-6 h-6" />,
      balance: 5000.00
    },
    {
      id: 'credit',
      name: 'Credit Card',
      icon: <FaCreditCard className="w-6 h-6" />,
      cardNumber: 'XXXX-XXXX-XXXX-5678',
      expiryDate: '12/25'
    }
  ];

  // Add bill categories
  const billCategories = [
    {
      id: 'mobile',
      name: 'Mobile Recharge',
      icon: <FaMobileAlt className="w-6 h-6" />,
      providers: ['Airtel', 'Jio', 'Vi', 'BSNL'],
      subCategories: ['Prepaid Recharge', 'Postpaid Bill Payment']
    },
    {
      id: 'dth',
      name: 'DTH Recharge',
      icon: <FaTv className="w-6 h-6" />,
      providers: ['Tata Play', 'Airtel Digital TV', 'Dish TV', 'Videocon d2h', 'Sun Direct']
    },
    {
      id: 'broadband',
      name: 'Broadband / Landline',
      icon: <FaWifi className="w-6 h-6" />,
      providers: ['Airtel', 'BSNL', 'ACT Fibernet', 'JioFiber', 'Hathway', 'Tikona']
    },
    {
      id: 'electricity',
      name: 'Electricity',
      icon: <FaLightbulb className="w-6 h-6" />,
      providers: ['MSEB', 'BESCOM', 'TNEB', 'Adani Electricity', 'Torrent Power', 'BSES Yamuna']
    },
    {
      id: 'gas',
      name: 'Gas Cylinder',
      icon: <FaFire className="w-6 h-6" />,
      providers: ['HP Gas', 'Bharat Gas', 'Indane Gas']
    },
    {
      id: 'water',
      name: 'Water',
      icon: <FaWater className="w-6 h-6" />,
      providers: ['BMC', 'DJB', 'Local Municipal Boards', 'Panchayat Water Supply', 'Jal Boards']
    },
    {
      id: 'municipal',
      name: 'Municipal Tax',
      icon: <FaBuilding className="w-6 h-6" />,
      providers: ['Property Tax', 'Water Tax', 'Development Charges']
    },
    {
      id: 'fastag',
      name: 'FASTag Recharge',
      icon: <FaCar className="w-6 h-6" />,
      providers: ['NHAI / IHMCL', 'Paytm FASTag', 'ICICI FASTag', 'Airtel FASTag']
    },
    {
      id: 'insurance',
      name: 'Insurance',
      icon: <FaShieldAlt className="w-6 h-6" />,
      providers: ['Life Insurance', 'Car Insurance', 'Health Insurance', 'LIC', 'Digit', 'Acko', 'ICICI Lombard']
    },
    {
      id: 'loan',
      name: 'Loan Repayment',
      icon: <FaMoneyBillWave className="w-6 h-6" />,
      providers: ['Home Loan EMI', 'Personal Loan', 'Credit Line', 'NBFC EMI']
    },
    {
      id: 'creditcard',
      name: 'Credit Card Bill',
      icon: <FaCreditCard className="w-6 h-6" />,
      providers: ['HDFC Bank', 'SBI Card', 'ICICI Bank', 'Axis Bank', 'Kotak Mahindra', 'OneCard', 'Slice']
    },
    {
      id: 'subscription',
      name: 'Subscription & OTT',
      icon: <FaPlay className="w-6 h-6" />,
      providers: ['Netflix', 'Prime Video', 'Disney+ Hotstar', 'Sony LIV', 'Spotify', 'Zee5']
    },
    {
      id: 'transport',
      name: 'Transport & Travel',
      icon: <FaBus className="w-6 h-6" />,
      providers: ['IRCTC', 'Flight Bookings', 'Bus Bookings', 'Metro Card', 'Ola', 'Uber']
    },
    {
      id: 'education',
      name: 'Education',
      icon: <FaGraduationCap className="w-6 h-6" />,
      providers: ['School Fees', 'College Fees', 'BYJU\'S', 'Unacademy', 'Government Exam Fees']
    },
    {
      id: 'govt',
      name: 'Govt. Services',
      icon: <FaLandmark className="w-6 h-6" />,
      providers: ['Traffic Challan', 'eChallan', 'Water Tax', 'Property Tax', 'PAN Card', 'Passport']
    },
    {
      id: 'others',
      name: 'Others',
      icon: <FaShoppingCart className="w-6 h-6" />,
      providers: ['Grocery Stores', 'Kirana Stores', 'Donations', 'Event Tickets', 'Cable Operator']
    }
  ];

  // Function to handle payment initiation
  const initiatePayment = (bill, event) => {
    event.stopPropagation(); // Prevent event bubbling
    setSelectedBill(bill);
    setPaymentAmount(bill.amount);
    setPaymentStep('method');
    setShowPaymentModal(true);
    setPaymentError('');
  };

  // Function to validate payment
  const validatePayment = (method, amount) => {
    const selectedMethod = paymentMethods.find(m => m.id === method);
    if (!selectedMethod) return false;

    if (method === 'savings' || method === 'wallet') {
      return selectedMethod.balance >= amount;
    }
    return true; // Credit card validation would be handled by the bank
  };

  // Function to handle payment processing
  const handlePayment = async () => {
    if (!selectedPaymentMethod) {
      setPaymentError('Please select a payment method');
      return;
    }

    if (!validatePayment(selectedPaymentMethod, paymentAmount)) {
      setPaymentError('Insufficient balance in selected payment method');
      return;
    }

    setPaymentStep('processing');
    setPaymentError('');

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Generate receipt data
      const receipt = {
        id: `RCP${Date.now()}`,
        billId: selectedBill.id,
        amount: paymentAmount,
        paymentDate: new Date().toISOString().split('T')[0],
        paymentMethod: paymentMethods.find(m => m.id === selectedPaymentMethod).name,
        status: 'Success',
        billDetails: selectedBill,
        transactionId: `TXN${Math.random().toString(36).substr(2, 9).toUpperCase()}`
      };

      setReceiptData(receipt);
      setShowPaymentModal(false);
      setShowReceipt(true);

      // Update bill status
      const updatedBills = bills.map(b => 
        b.id === selectedBill.id ? { ...b, status: 'paid' } : b
      );
      setBills(updatedBills);
    } catch (err) {
      console.error('Payment processing failed:', err);
      setPaymentError('Payment failed. Please try again.');
      setPaymentStep('method');
    }
  };

  // Get bill icon based on type
  const getBillIcon = (type) => {
    const category = billCategories.find(cat => cat.id === type);
    return category ? category.icon : <FaFileInvoiceDollar className="w-6 h-6" />;
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

  // Function to generate PDF from HTML element
  const generatePDF = async (elementRef, filename) => {
    const element = elementRef.current;
    if (!element) return;

    try {
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        logging: false
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });

      const imgWidth = 210; // A4 width in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      
      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
      pdf.save(filename);
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  };

  // Function to print element
  const printElement = async (elementRef) => {
    const element = elementRef.current;
    if (!element) return;

    try {
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        logging: false
      });

      const imgData = canvas.toDataURL('image/png');
      const printWindow = window.open('', '_blank');
      
      printWindow.document.write(`
        <html>
          <head>
            <title>Print</title>
            <style>
              body { margin: 0; }
              img { width: 100%; height: auto; }
            </style>
          </head>
          <body>
            <img src="${imgData}" />
          </body>
        </html>
      `);
      
      printWindow.document.close();
      printWindow.focus();
      printWindow.print();
      printWindow.close();
    } catch (error) {
      console.error('Error printing:', error);
    }
  };

  // Function to generate receipt PDF
  const generateReceiptPDF = () => {
    if (!receiptData) return;
    generatePDF(receiptRef, `receipt_${receiptData.id}.pdf`);
  };

  // Function to generate bill PDF
  const generateBillPDF = () => {
    if (!selectedBill) return;
    generatePDF(billRef, `bill_${selectedBill.billNumber}.pdf`);
  };

  // Function to print bill
  const printBill = () => {
    if (!selectedBill) return;
    printElement(billRef);
  };

  // Update the receipt modal
  const ReceiptModal = () => (
    <Modal
      isOpen={showReceipt}
      onClose={() => {
        setShowReceipt(false);
        setReceiptData(null);
      }}
      title="Payment Receipt"
    >
      {receiptData && (
        <div className="space-y-6">
          <div className="bg-green-50 p-4 rounded-lg">
            <div className="flex items-center">
              <FaCheckCircle className="w-5 h-5 text-green-500 mr-2" />
              <p className="text-green-700 font-medium">Payment Successful!</p>
            </div>
          </div>

          <div ref={receiptRef}>
            <ReceiptContent receiptData={receiptData} />
          </div>

          <PDFActions
            onDownload={generateReceiptPDF}
            onClose={() => {
              setShowReceipt(false);
              setReceiptData(null);
            }}
          />
        </div>
      )}
    </Modal>
  );

  // Update the bill details modal
  const BillDetailsModal = () => (
    <Modal
      isOpen={!!selectedBill}
      onClose={() => setSelectedBill(null)}
      title="Bill Details"
    >
      {selectedBill && (
        <div className="space-y-6">
          <div ref={billRef}>
            <BillDetailsContent
              bill={selectedBill}
              getBillIcon={getBillIcon}
              getStatusInfo={getStatusInfo}
            />
          </div>

          <PDFActions
            onDownload={generateBillPDF}
            onPrint={printBill}
            onClose={() => setSelectedBill(null)}
          />
        </div>
      )}
    </Modal>
  );

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

  // Add Payment Modal Component
  const PaymentModal = () => {
    if (!showPaymentModal) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-lg max-w-2xl w-full">
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h3 className="text-xl font-semibold text-gray-900">
              {paymentStep === 'method' ? 'Select Payment Method' : 
               paymentStep === 'confirm' ? 'Confirm Payment' : 
               'Processing Payment'}
            </h3>
            <button
              onClick={() => {
                setShowPaymentModal(false);
                setPaymentStep('method');
                setPaymentError('');
              }}
              className="text-gray-400 hover:text-gray-500 focus:outline-none"
            >
              <FaTimes className="w-5 h-5" />
            </button>
          </div>

          <div className="p-6">
            {paymentStep === 'method' && (
              <div className="space-y-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600">Amount to Pay</p>
                  <p className="text-2xl font-bold text-gray-900">
                    ₹{paymentAmount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                  </p>
                </div>

                <div className="space-y-4">
                  {paymentMethods.map((method) => (
                    <button
                      key={method.id}
                      onClick={() => {
                        setSelectedPaymentMethod(method.id);
                        setPaymentStep('confirm');
                      }}
                      className="w-full p-4 border border-gray-200 rounded-lg hover:border-indigo-500 hover:bg-indigo-50 transition-all duration-200"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600">
                            {method.icon}
                          </div>
                          <div className="text-left">
                            <p className="font-medium text-gray-900">{method.name}</p>
                            {method.balance && (
                              <p className="text-sm text-gray-500">
                                Balance: ₹{method.balance.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                              </p>
                            )}
                            {method.accountNumber && (
                              <p className="text-sm text-gray-500">Account: {method.accountNumber}</p>
                            )}
                            {method.cardNumber && (
                              <p className="text-sm text-gray-500">Card: {method.cardNumber}</p>
                            )}
                          </div>
                        </div>
                        <div className="text-indigo-600">
                          <FaChevronRight className="w-5 h-5" />
                        </div>
                      </div>
                    </button>
                  ))}
                </div>

                {paymentError && (
                  <div className="text-red-600 text-sm mt-2">{paymentError}</div>
                )}
              </div>
            )}

            {paymentStep === 'confirm' && (
              <div className="space-y-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center justify-between mb-4">
                    <p className="text-sm text-gray-600">Payment Method</p>
                    <p className="font-medium text-gray-900">
                      {paymentMethods.find(m => m.id === selectedPaymentMethod)?.name}
                    </p>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-gray-600">Amount</p>
                    <p className="text-2xl font-bold text-gray-900">
                      ₹{paymentAmount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <FaLock className="w-4 h-4" />
                  <p>Your payment is secured with bank-grade encryption</p>
                </div>

                <div className="flex justify-end space-x-3">
                  <button
                    onClick={() => setPaymentStep('method')}
                    className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg transition-colors duration-200"
                  >
                    Back
                  </button>
                  <button
                    onClick={handlePayment}
                    className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors duration-200"
                  >
                    Confirm Payment
                  </button>
                </div>
              </div>
            )}

            {paymentStep === 'processing' && (
              <div className="py-8 text-center">
                <FaSpinner className="w-12 h-12 text-indigo-600 animate-spin mx-auto mb-4" />
                <p className="text-gray-600">Processing your payment...</p>
                <p className="text-sm text-gray-500 mt-2">Please do not close this window</p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  // Update the renderPayNowButton function
  const renderPayNowButton = (bill) => {
    if (bill.status === 'paid') {
      return (
        <div className="pt-4 border-t border-gray-100">
          <button 
            onClick={(e) => {
              e.stopPropagation();
              setReceiptData({
                id: `RCP${Date.now()}`,
                billId: bill.id,
                amount: bill.amount,
                paymentDate: new Date().toISOString().split('T')[0],
                paymentMethod: 'Online Banking',
                status: 'Success',
                billDetails: bill,
                transactionId: `TXN${Math.random().toString(36).substr(2, 9).toUpperCase()}`
              });
              setShowReceipt(true);
            }}
            className="w-full px-4 py-2 text-sm font-medium text-indigo-600 bg-indigo-50 hover:bg-indigo-100 rounded-lg transition-colors duration-200"
          >
            <FaReceipt className="inline-block mr-2" />
            View Receipt
          </button>
        </div>
      );
    }

    return (
      <div className="pt-4 border-t border-gray-100">
        <button 
          onClick={(e) => initiatePayment(bill, e)}
          className="w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors duration-200"
        >
          Pay Now
        </button>
      </div>
    );
  };

  // Reusable BillModal Component
  const BillModal = ({ isOpen, onClose, title, children, onSubmit, submitText = "Pay Now" }) => {
    if (!isOpen) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-lg max-w-2xl w-full">
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500 focus:outline-none"
            >
              <FaTimes className="w-5 h-5" />
            </button>
          </div>
          <div className="p-6">
            {children}
            <div className="mt-6 flex justify-end space-x-3">
              <button
                onClick={onClose}
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                onClick={onSubmit}
                className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors duration-200"
              >
                {submitText}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Category-specific Modals
  const MobileRechargeModal = ({ isOpen, onClose, onSubmit }) => {
    const [operator, setOperator] = useState('');
    const [mobileNumber, setMobileNumber] = useState('');
    const [selectedPlan, setSelectedPlan] = useState('');

    const operators = ['Jio', 'Airtel', 'Vi', 'BSNL'];
    const plans = [
      { id: 1, name: '₹499 - 56 Days', data: '2GB/day', validity: '56 Days' },
      { id: 2, name: '₹799 - 84 Days', data: '2GB/day', validity: '84 Days' },
      { id: 3, name: '₹999 - 90 Days', data: '3GB/day', validity: '90 Days' }
    ];

    return (
      <BillModal
        isOpen={isOpen}
        onClose={onClose}
        title="Mobile Recharge & Postpaid Bills"
        onSubmit={() => onSubmit({ operator, mobileNumber, plan: selectedPlan })}
      >
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Operator
            </label>
            <select
              value={operator}
              onChange={(e) => setOperator(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="">Select Operator</option>
              {operators.map((op) => (
                <option key={op} value={op}>{op}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Mobile Number
            </label>
            <input
              type="tel"
              value={mobileNumber}
              onChange={(e) => setMobileNumber(e.target.value)}
              placeholder="Enter 10-digit mobile number"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              maxLength="10"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Choose Plan
            </label>
            <div className="grid grid-cols-1 gap-3">
              {plans.map((plan) => (
                <button
                  key={plan.id}
                  onClick={() => setSelectedPlan(plan)}
                  className={`p-4 border rounded-lg text-left transition-colors duration-200 ${
                    selectedPlan?.id === plan.id
                      ? 'border-indigo-500 bg-indigo-50'
                      : 'border-gray-200 hover:border-indigo-200'
                  }`}
                >
                  <div className="font-medium text-gray-900">{plan.name}</div>
                  <div className="text-sm text-gray-500">
                    {plan.data} • {plan.validity}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </BillModal>
    );
  };

  const DTHRechargeModal = ({ isOpen, onClose, onSubmit }) => {
    const [provider, setProvider] = useState('');
    const [subscriberId, setSubscriberId] = useState('');
    const [selectedPack, setSelectedPack] = useState('');

    const providers = ['Tata Play', 'Airtel Digital TV', 'Dish TV', 'Videocon d2h', 'Sun Direct'];
    const packs = [
      { id: 1, name: 'HD Premium', price: '₹499', channels: '300+ Channels' },
      { id: 2, name: 'HD Super', price: '₹699', channels: '400+ Channels' },
      { id: 3, name: 'HD Ultra', price: '₹999', channels: '500+ Channels' }
    ];

    return (
      <BillModal
        isOpen={isOpen}
        onClose={onClose}
        title="DTH Recharge"
        onSubmit={() => onSubmit({ provider, subscriberId, pack: selectedPack })}
      >
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select DTH Provider
            </label>
            <select
              value={provider}
              onChange={(e) => setProvider(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="">Select Provider</option>
              {providers.map((p) => (
                <option key={p} value={p}>{p}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Subscriber ID
            </label>
            <input
              type="text"
              value={subscriberId}
              onChange={(e) => setSubscriberId(e.target.value)}
              placeholder="Enter Subscriber ID"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              View Packs
            </label>
            <div className="grid grid-cols-1 gap-3">
              {packs.map((pack) => (
                <button
                  key={pack.id}
                  onClick={() => setSelectedPack(pack)}
                  className={`p-4 border rounded-lg text-left transition-colors duration-200 ${
                    selectedPack?.id === pack.id
                      ? 'border-indigo-500 bg-indigo-50'
                      : 'border-gray-200 hover:border-indigo-200'
                  }`}
                >
                  <div className="font-medium text-gray-900">{pack.name}</div>
                  <div className="text-sm text-gray-500">
                    {pack.price} • {pack.channels}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </BillModal>
    );
  };

  const BroadbandModal = ({ isOpen, onClose, onSubmit }) => {
    const [provider, setProvider] = useState('');
    const [customerId, setCustomerId] = useState('');
    const [dueAmount, setDueAmount] = useState(null);

    const providers = ['ACT Fibernet', 'BSNL', 'Airtel', 'JioFiber', 'Tata Play Fiber'];

    const handleCheckDue = () => {
      // Simulate fetching due amount
      setDueAmount(999.00);
    };

    return (
      <BillModal
        isOpen={isOpen}
        onClose={onClose}
        title="Broadband Bill Payment"
        onSubmit={() => onSubmit({ provider, customerId, amount: dueAmount })}
      >
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Provider
            </label>
            <select
              value={provider}
              onChange={(e) => setProvider(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="">Select Provider</option>
              {providers.map((p) => (
                <option key={p} value={p}>{p}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Customer ID
            </label>
            <input
              type="text"
              value={customerId}
              onChange={(e) => setCustomerId(e.target.value)}
              placeholder="Enter Customer ID"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          {dueAmount ? (
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Due Amount</span>
                <span className="text-xl font-bold text-gray-900">₹{dueAmount.toFixed(2)}</span>
              </div>
            </div>
          ) : (
            <button
              onClick={handleCheckDue}
              className="w-full px-4 py-2 text-sm font-medium text-indigo-600 bg-indigo-50 hover:bg-indigo-100 rounded-lg transition-colors duration-200"
            >
              Check Due Amount
            </button>
          )}
        </div>
      </BillModal>
    );
  };

  const ElectricityModal = ({ isOpen, onClose, onSubmit }) => {
    const [board, setBoard] = useState('');
    const [consumerNumber, setConsumerNumber] = useState('');
    const [billDetails, setBillDetails] = useState(null);

    const boards = [
      'MSEB (Maharashtra)',
      'BESCOM (Karnataka)',
      'TSSPDCL (Telangana)',
      'APSPDCL (Andhra Pradesh)',
      'DGVCL (Gujarat)',
      'MGVCL (Gujarat)',
      'UPPCL (Uttar Pradesh)',
      'BEST (Mumbai)'
    ];

    const handleViewBill = () => {
      // Simulate fetching bill details
      setBillDetails({
        amount: 2500.00,
        dueDate: '2024-03-15',
        consumption: '450 units',
        meterReading: '12345',
        billDate: '2024-02-15'
      });
    };

    return (
      <BillModal
        isOpen={isOpen}
        onClose={onClose}
        title="Electricity Bill Payment"
        onSubmit={() => onSubmit({ board, consumerNumber, billDetails })}
      >
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select State/Board
            </label>
            <select
              value={board}
              onChange={(e) => setBoard(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="">Select Board</option>
              {boards.map((b) => (
                <option key={b} value={b}>{b}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Consumer Number
            </label>
            <input
              type="text"
              value={consumerNumber}
              onChange={(e) => setConsumerNumber(e.target.value)}
              placeholder="Enter Consumer Number"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          {billDetails ? (
            <div className="bg-gray-50 p-4 rounded-lg space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Bill Amount</span>
                <span className="text-xl font-bold text-gray-900">₹{billDetails.amount.toFixed(2)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Due Date</span>
                <span className="text-gray-900">{billDetails.dueDate}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Consumption</span>
                <span className="text-gray-900">{billDetails.consumption}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Meter Reading</span>
                <span className="text-gray-900">{billDetails.meterReading}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Bill Date</span>
                <span className="text-gray-900">{billDetails.billDate}</span>
              </div>
            </div>
          ) : (
            <button
              onClick={handleViewBill}
              className="w-full px-4 py-2 text-sm font-medium text-indigo-600 bg-indigo-50 hover:bg-indigo-100 rounded-lg transition-colors duration-200"
            >
              View Bill Details
            </button>
          )}
        </div>
      </BillModal>
    );
  };

  const GasBookingModal = ({ isOpen, onClose, onSubmit }) => {
    const [provider, setProvider] = useState('');
    const [lpgId, setLpgId] = useState('');
    const [cylinderType, setCylinderType] = useState('');
    const [price, setPrice] = useState(null);

    const providers = ['HP Gas', 'Bharat Gas', 'Indane Gas'];
    const cylinderTypes = [
      { id: 'domestic', name: 'Domestic', price: 950.00 },
      { id: 'commercial', name: 'Commercial', price: 1850.00 }
    ];

    const handleCylinderTypeSelect = (type) => {
      setCylinderType(type);
      setPrice(type.price);
    };

    return (
      <BillModal
        isOpen={isOpen}
        onClose={onClose}
        title="Gas Cylinder Booking"
        onSubmit={() => onSubmit({ provider, lpgId, cylinderType, price })}
      >
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Gas Provider
            </label>
            <select
              value={provider}
              onChange={(e) => setProvider(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="">Select Provider</option>
              {providers.map((p) => (
                <option key={p} value={p}>{p}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              LPG ID
            </label>
            <input
              type="text"
              value={lpgId}
              onChange={(e) => setLpgId(e.target.value)}
              placeholder="Enter LPG ID"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Cylinder Type
            </label>
            <div className="grid grid-cols-2 gap-3">
              {cylinderTypes.map((type) => (
                <button
                  key={type.id}
                  onClick={() => handleCylinderTypeSelect(type)}
                  className={`p-4 border rounded-lg text-left transition-colors duration-200 ${
                    cylinderType?.id === type.id
                      ? 'border-indigo-500 bg-indigo-50'
                      : 'border-gray-200 hover:border-indigo-200'
                  }`}
                >
                  <div className="font-medium text-gray-900">{type.name}</div>
                  <div className="text-sm text-gray-500">₹{type.price.toFixed(2)}</div>
                </button>
              ))}
            </div>
          </div>

          {price && (
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Total Amount</span>
                <span className="text-xl font-bold text-gray-900">₹{price.toFixed(2)}</span>
              </div>
            </div>
          )}
        </div>
      </BillModal>
    );
  };

  const WaterModal = ({ isOpen, onClose, onSubmit }) => {
    const [board, setBoard] = useState('');
    const [consumerNumber, setConsumerNumber] = useState('');
    const [billDetails, setBillDetails] = useState(null);

    const boards = [
      'BMC (Mumbai)',
      'DJB (Delhi)',
      'BWSSB (Bangalore)',
      'MWSB (Mumbai)',
      'KW&SB (Kolkata)',
      'CMWSSB (Chennai)'
    ];

    const handleViewBill = () => {
      // Simulate fetching bill details
      setBillDetails({
        amount: 1200.00,
        dueDate: '2024-03-15',
        consumption: '25 KL',
        meterReading: '12345',
        billDate: '2024-02-15'
      });
    };

    return (
      <BillModal
        isOpen={isOpen}
        onClose={onClose}
        title="Water Bill Payment"
        onSubmit={() => onSubmit({ board, consumerNumber, billDetails })}
      >
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Water Board
            </label>
            <select
              value={board}
              onChange={(e) => setBoard(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="">Select Board</option>
              {boards.map((b) => (
                <option key={b} value={b}>{b}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Consumer Number
            </label>
            <input
              type="text"
              value={consumerNumber}
              onChange={(e) => setConsumerNumber(e.target.value)}
              placeholder="Enter Consumer Number"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          {billDetails ? (
            <div className="bg-gray-50 p-4 rounded-lg space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Bill Amount</span>
                <span className="text-xl font-bold text-gray-900">₹{billDetails.amount.toFixed(2)}</span>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-500">Due Date</span>
                  <p className="font-medium text-gray-900">{billDetails.dueDate}</p>
                </div>
                <div>
                  <span className="text-gray-500">Consumption</span>
                  <p className="font-medium text-gray-900">{billDetails.consumption}</p>
                </div>
                <div>
                  <span className="text-gray-500">Meter Reading</span>
                  <p className="font-medium text-gray-900">{billDetails.meterReading}</p>
                </div>
                <div>
                  <span className="text-gray-500">Bill Date</span>
                  <p className="font-medium text-gray-900">{billDetails.billDate}</p>
                </div>
              </div>
            </div>
          ) : (
            <button
              onClick={handleViewBill}
              className="w-full px-4 py-2 text-sm font-medium text-indigo-600 bg-indigo-50 hover:bg-indigo-100 rounded-lg transition-colors duration-200"
            >
              View Bill Details
            </button>
          )}
        </div>
      </BillModal>
    );
  };

  const InsuranceModal = ({ isOpen, onClose, onSubmit }) => {
    const [insuranceType, setInsuranceType] = useState('');
    const [provider, setProvider] = useState('');
    const [policyNumber, setPolicyNumber] = useState('');
    const [premiumAmount, setPremiumAmount] = useState(null);

    const insuranceTypes = [
      { id: 'life', name: 'Life Insurance', providers: ['LIC', 'HDFC Life', 'ICICI Prudential', 'SBI Life'] },
      { id: 'health', name: 'Health Insurance', providers: ['Star Health', 'HDFC Ergo', 'ICICI Lombard', 'Bajaj Allianz'] },
      { id: 'motor', name: 'Motor Insurance', providers: ['Bajaj Allianz', 'ICICI Lombard', 'HDFC Ergo', 'Tata AIG'] }
    ];

    const handleViewPremium = () => {
      // Simulate fetching premium amount
      setPremiumAmount(15000.00);
    };

    return (
      <BillModal
        isOpen={isOpen}
        onClose={onClose}
        title="Insurance Premium Payment"
        onSubmit={() => onSubmit({ insuranceType, provider, policyNumber, amount: premiumAmount })}
      >
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Insurance Type
            </label>
            <div className="grid grid-cols-1 gap-3">
              {insuranceTypes.map((type) => (
                <button
                  key={type.id}
                  onClick={() => {
                    setInsuranceType(type);
                    setProvider('');
                  }}
                  className={`p-4 border rounded-lg text-left transition-colors duration-200 ${
                    insuranceType?.id === type.id
                      ? 'border-indigo-500 bg-indigo-50'
                      : 'border-gray-200 hover:border-indigo-200'
                  }`}
                >
                  <div className="font-medium text-gray-900">{type.name}</div>
                </button>
              ))}
            </div>
          </div>

          {insuranceType && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Provider
              </label>
              <select
                value={provider}
                onChange={(e) => setProvider(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="">Select Provider</option>
                {insuranceType.providers.map((p) => (
                  <option key={p} value={p}>{p}</option>
                ))}
              </select>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Policy Number
            </label>
            <input
              type="text"
              value={policyNumber}
              onChange={(e) => setPolicyNumber(e.target.value)}
              placeholder="Enter Policy Number"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          {premiumAmount ? (
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Premium Amount</span>
                <span className="text-xl font-bold text-gray-900">₹{premiumAmount.toFixed(2)}</span>
              </div>
            </div>
          ) : (
            <button
              onClick={handleViewPremium}
              className="w-full px-4 py-2 text-sm font-medium text-indigo-600 bg-indigo-50 hover:bg-indigo-100 rounded-lg transition-colors duration-200"
            >
              View Premium Amount
            </button>
          )}
        </div>
      </BillModal>
    );
  };

  const EducationModal = ({ isOpen, onClose, onSubmit }) => {
    const [institutionType, setInstitutionType] = useState('');
    const [feeType, setFeeType] = useState('');
    const [studentId, setStudentId] = useState('');
    const [dueAmount, setDueAmount] = useState(null);

    const institutionTypes = [
      { id: 'school', name: 'School', feeTypes: ['Tuition Fee', 'Examination Fee', 'Development Fee'] },
      { id: 'college', name: 'College', feeTypes: ['Tuition Fee', 'Examination Fee', 'Hostel Fee', 'Library Fee'] },
      { id: 'coaching', name: 'Coaching', feeTypes: ['Course Fee', 'Study Material', 'Test Series'] }
    ];

    const handleViewDue = () => {
      // Simulate fetching due amount
      setDueAmount(25000.00);
    };

    return (
      <BillModal
        isOpen={isOpen}
        onClose={onClose}
        title="Education Fee Payment"
        onSubmit={() => onSubmit({ institutionType, feeType, studentId, amount: dueAmount })}
      >
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Institution Type
            </label>
            <div className="grid grid-cols-1 gap-3">
              {institutionTypes.map((type) => (
                <button
                  key={type.id}
                  onClick={() => {
                    setInstitutionType(type);
                    setFeeType('');
                  }}
                  className={`p-4 border rounded-lg text-left transition-colors duration-200 ${
                    institutionType?.id === type.id
                      ? 'border-indigo-500 bg-indigo-50'
                      : 'border-gray-200 hover:border-indigo-200'
                  }`}
                >
                  <div className="font-medium text-gray-900">{type.name}</div>
                </button>
              ))}
            </div>
          </div>

          {institutionType && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Fee Type
              </label>
              <select
                value={feeType}
                onChange={(e) => setFeeType(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="">Select Fee Type</option>
                {institutionType.feeTypes.map((f) => (
                  <option key={f} value={f}>{f}</option>
                ))}
              </select>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Student ID
            </label>
            <input
              type="text"
              value={studentId}
              onChange={(e) => setStudentId(e.target.value)}
              placeholder="Enter Student ID"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          {dueAmount ? (
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Due Amount</span>
                <span className="text-xl font-bold text-gray-900">₹{dueAmount.toFixed(2)}</span>
              </div>
            </div>
          ) : (
            <button
              onClick={handleViewDue}
              className="w-full px-4 py-2 text-sm font-medium text-indigo-600 bg-indigo-50 hover:bg-indigo-100 rounded-lg transition-colors duration-200"
            >
              View Due Amount
            </button>
          )}
        </div>
      </BillModal>
    );
  };

  const MunicipalTaxModal = ({ isOpen, onClose, onSubmit }) => {
    const [taxType, setTaxType] = useState('');
    const [propertyId, setPropertyId] = useState('');
    const [dueAmount, setDueAmount] = useState(null);

    const taxTypes = [
      { id: 'property', name: 'Property Tax', description: 'Annual property tax payment' },
      { id: 'water', name: 'Water Tax', description: 'Water supply and sewage charges' },
      { id: 'development', name: 'Development Charges', description: 'Municipal development charges' }
    ];

    const handleViewDue = () => {
      // Simulate fetching due amount
      setDueAmount(12000.00);
    };

    return (
      <BillModal
        isOpen={isOpen}
        onClose={onClose}
        title="Municipal Tax Payment"
        onSubmit={() => onSubmit({ taxType, propertyId, amount: dueAmount })}
      >
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tax Type
            </label>
            <div className="grid grid-cols-1 gap-3">
              {taxTypes.map((type) => (
                <button
                  key={type.id}
                  onClick={() => setTaxType(type)}
                  className={`p-4 border rounded-lg text-left transition-colors duration-200 ${
                    taxType?.id === type.id
                      ? 'border-indigo-500 bg-indigo-50'
                      : 'border-gray-200 hover:border-indigo-200'
                  }`}
                >
                  <div className="font-medium text-gray-900">{type.name}</div>
                  <div className="text-sm text-gray-500">{type.description}</div>
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Property ID
            </label>
            <input
              type="text"
              value={propertyId}
              onChange={(e) => setPropertyId(e.target.value)}
              placeholder="Enter Property ID"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          {dueAmount ? (
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Due Amount</span>
                <span className="text-xl font-bold text-gray-900">₹{dueAmount.toFixed(2)}</span>
              </div>
            </div>
          ) : (
            <button
              onClick={handleViewDue}
              className="w-full px-4 py-2 text-sm font-medium text-indigo-600 bg-indigo-50 hover:bg-indigo-100 rounded-lg transition-colors duration-200"
            >
              View Due Amount
            </button>
          )}
        </div>
      </BillModal>
    );
  };

  const FastagModal = ({ isOpen, onClose, onSubmit }) => {
    const [provider, setProvider] = useState('');
    const [vehicleNumber, setVehicleNumber] = useState('');
    const [amount, setAmount] = useState('');
    const [balance, setBalance] = useState(null);

    const providers = ['NHAI / IHMCL', 'Paytm FASTag', 'ICICI FASTag', 'Airtel FASTag'];

    const handleCheckBalance = () => {
      // Simulate fetching balance
      setBalance(500.00);
    };

    return (
      <BillModal
        isOpen={isOpen}
        onClose={onClose}
        title="FASTag Recharge"
        onSubmit={() => onSubmit({ provider, vehicleNumber, amount, balance })}
      >
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              FASTag Provider
            </label>
            <select
              value={provider}
              onChange={(e) => setProvider(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="">Select Provider</option>
              {providers.map((p) => (
                <option key={p} value={p}>{p}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Vehicle Number
            </label>
            <input
              type="text"
              value={vehicleNumber}
              onChange={(e) => setVehicleNumber(e.target.value)}
              placeholder="Enter Vehicle Number"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Recharge Amount
            </label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter Amount"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          {balance !== null && (
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Current Balance</span>
                <span className="text-xl font-bold text-gray-900">₹{balance.toFixed(2)}</span>
              </div>
            </div>
          )}

          <button
            onClick={handleCheckBalance}
            className="w-full px-4 py-2 text-sm font-medium text-indigo-600 bg-indigo-50 hover:bg-indigo-100 rounded-lg transition-colors duration-200"
          >
            Check Balance
          </button>
        </div>
      </BillModal>
    );
  };

  const CreditCardModal = ({ isOpen, onClose, onSubmit }) => {
    const [bank, setBank] = useState('');
    const [cardNumber, setCardNumber] = useState('');
    const [dueAmount, setDueAmount] = useState(null);

    const banks = ['HDFC Bank', 'SBI Card', 'ICICI Bank', 'Axis Bank', 'Kotak Mahindra', 'OneCard', 'Slice'];

    const handleViewDue = () => {
      // Simulate fetching due amount
      setDueAmount(15000.00);
    };

    return (
      <BillModal
        isOpen={isOpen}
        onClose={onClose}
        title="Credit Card Bill Payment"
        onSubmit={() => onSubmit({ bank, cardNumber, amount: dueAmount })}
      >
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Bank
            </label>
            <select
              value={bank}
              onChange={(e) => setBank(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="">Select Bank</option>
              {banks.map((b) => (
                <option key={b} value={b}>{b}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Card Number
            </label>
            <input
              type="text"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
              placeholder="Enter Last 4 Digits"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              maxLength="4"
            />
          </div>

          {dueAmount ? (
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Due Amount</span>
                <span className="text-xl font-bold text-gray-900">₹{dueAmount.toFixed(2)}</span>
              </div>
            </div>
          ) : (
            <button
              onClick={handleViewDue}
              className="w-full px-4 py-2 text-sm font-medium text-indigo-600 bg-indigo-50 hover:bg-indigo-100 rounded-lg transition-colors duration-200"
            >
              View Due Amount
            </button>
          )}
        </div>
      </BillModal>
    );
  };

  const LoanEMIModal = ({ isOpen, onClose, onSubmit }) => {
    const [loanType, setLoanType] = useState('');
    const [accountNumber, setAccountNumber] = useState('');
    const [dueAmount, setDueAmount] = useState(null);

    const loanTypes = [
      { id: 'home', name: 'Home Loan', description: 'Monthly EMI for home loan' },
      { id: 'personal', name: 'Personal Loan', description: 'Monthly EMI for personal loan' },
      { id: 'car', name: 'Car Loan', description: 'Monthly EMI for car loan' },
      { id: 'business', name: 'Business Loan', description: 'Monthly EMI for business loan' }
    ];

    const handleViewDue = () => {
      // Simulate fetching due amount
      setDueAmount(25000.00);
    };

    return (
      <BillModal
        isOpen={isOpen}
        onClose={onClose}
        title="Loan EMI Payment"
        onSubmit={() => onSubmit({ loanType, accountNumber, amount: dueAmount })}
      >
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Loan Type
            </label>
            <div className="grid grid-cols-1 gap-3">
              {loanTypes.map((type) => (
                <button
                  key={type.id}
                  onClick={() => setLoanType(type)}
                  className={`p-4 border rounded-lg text-left transition-colors duration-200 ${
                    loanType?.id === type.id
                      ? 'border-indigo-500 bg-indigo-50'
                      : 'border-gray-200 hover:border-indigo-200'
                  }`}
                >
                  <div className="font-medium text-gray-900">{type.name}</div>
                  <div className="text-sm text-gray-500">{type.description}</div>
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Loan Account Number
            </label>
            <input
              type="text"
              value={accountNumber}
              onChange={(e) => setAccountNumber(e.target.value)}
              placeholder="Enter Loan Account Number"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          {dueAmount ? (
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">EMI Amount</span>
                <span className="text-xl font-bold text-gray-900">₹{dueAmount.toFixed(2)}</span>
              </div>
            </div>
          ) : (
            <button
              onClick={handleViewDue}
              className="w-full px-4 py-2 text-sm font-medium text-indigo-600 bg-indigo-50 hover:bg-indigo-100 rounded-lg transition-colors duration-200"
            >
              View EMI Amount
            </button>
          )}
        </div>
      </BillModal>
    );
  };

  const MutualFundsModal = ({ isOpen, onClose, onSubmit }) => {
    const [fundType, setFundType] = useState('');
    const [amount, setAmount] = useState('');
    const [tenure, setTenure] = useState('');

    const fundTypes = [
      { id: 'equity', name: 'Equity Funds', description: 'High risk, high returns' },
      { id: 'debt', name: 'Debt Funds', description: 'Low risk, stable returns' },
      { id: 'hybrid', name: 'Hybrid Funds', description: 'Balanced risk and returns' },
      { id: 'index', name: 'Index Funds', description: 'Market index tracking' }
    ];

    const tenures = [
      { id: '1', name: '1 Year', value: '1' },
      { id: '3', name: '3 Years', value: '3' },
      { id: '5', name: '5 Years', value: '5' },
      { id: '10', name: '10 Years', value: '10' }
    ];

    return (
      <BillModal
        isOpen={isOpen}
        onClose={onClose}
        title="Mutual Fund Investment"
        onSubmit={() => onSubmit({ fundType, amount, tenure })}
      >
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Fund Type
            </label>
            <div className="grid grid-cols-1 gap-3">
              {fundTypes.map((type) => (
                <button
                  key={type.id}
                  onClick={() => setFundType(type)}
                  className={`p-4 border rounded-lg text-left transition-colors duration-200 ${
                    fundType?.id === type.id
                      ? 'border-indigo-500 bg-indigo-50'
                      : 'border-gray-200 hover:border-indigo-200'
                  }`}
                >
                  <div className="font-medium text-gray-900">{type.name}</div>
                  <div className="text-sm text-gray-500">{type.description}</div>
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Investment Amount
            </label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter Amount"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Investment Tenure
            </label>
            <div className="grid grid-cols-2 gap-3">
              {tenures.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setTenure(t)}
                  className={`p-4 border rounded-lg text-center transition-colors duration-200 ${
                    tenure?.id === t.id
                      ? 'border-indigo-500 bg-indigo-50'
                      : 'border-gray-200 hover:border-indigo-200'
                  }`}
                >
                  <div className="font-medium text-gray-900">{t.name}</div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </BillModal>
    );
  };

  const SIPModal = ({ isOpen, onClose, onSubmit }) => {
    const [fundType, setFundType] = useState('');
    const [amount, setAmount] = useState('');
    const [frequency, setFrequency] = useState('');

    const fundTypes = [
      { id: 'equity', name: 'Equity SIP', description: 'Regular investment in equity funds' },
      { id: 'debt', name: 'Debt SIP', description: 'Regular investment in debt funds' },
      { id: 'hybrid', name: 'Hybrid SIP', description: 'Regular investment in hybrid funds' }
    ];

    const frequencies = [
      { id: 'monthly', name: 'Monthly', value: 'monthly' },
      { id: 'quarterly', name: 'Quarterly', value: 'quarterly' },
      { id: 'yearly', name: 'Yearly', value: 'yearly' }
    ];

    return (
      <BillModal
        isOpen={isOpen}
        onClose={onClose}
        title="SIP Investment"
        onSubmit={() => onSubmit({ fundType, amount, frequency })}
      >
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              SIP Type
            </label>
            <div className="grid grid-cols-1 gap-3">
              {fundTypes.map((type) => (
                <button
                  key={type.id}
                  onClick={() => setFundType(type)}
                  className={`p-4 border rounded-lg text-left transition-colors duration-200 ${
                    fundType?.id === type.id
                      ? 'border-indigo-500 bg-indigo-50'
                      : 'border-gray-200 hover:border-indigo-200'
                  }`}
                >
                  <div className="font-medium text-gray-900">{type.name}</div>
                  <div className="text-sm text-gray-500">{type.description}</div>
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              SIP Amount
            </label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter Amount"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Investment Frequency
            </label>
            <div className="grid grid-cols-3 gap-3">
              {frequencies.map((f) => (
                <button
                  key={f.id}
                  onClick={() => setFrequency(f)}
                  className={`p-4 border rounded-lg text-center transition-colors duration-200 ${
                    frequency?.id === f.id
                      ? 'border-indigo-500 bg-indigo-50'
                      : 'border-gray-200 hover:border-indigo-200'
                  }`}
                >
                  <div className="font-medium text-gray-900">{f.name}</div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </BillModal>
    );
  };

  const GoldModal = ({ isOpen, onClose, onSubmit }) => {
    const [goldType, setGoldType] = useState('');
    const [amount, setAmount] = useState('');
    const [weight, setWeight] = useState('');

    const goldTypes = [
      { id: 'physical', name: 'Physical Gold', description: 'Buy physical gold coins/bars' },
      { id: 'digital', name: 'Digital Gold', description: 'Buy digital gold units' },
      { id: 'sgb', name: 'Sovereign Gold Bonds', description: 'Government-backed gold bonds' }
    ];

    return (
      <BillModal
        isOpen={isOpen}
        onClose={onClose}
        title="Gold Investment"
        onSubmit={() => onSubmit({ goldType, amount, weight })}
      >
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Gold Type
            </label>
            <div className="grid grid-cols-1 gap-3">
              {goldTypes.map((type) => (
                <button
                  key={type.id}
                  onClick={() => setGoldType(type)}
                  className={`p-4 border rounded-lg text-left transition-colors duration-200 ${
                    goldType?.id === type.id
                      ? 'border-indigo-500 bg-indigo-50'
                      : 'border-gray-200 hover:border-indigo-200'
                  }`}
                >
                  <div className="font-medium text-gray-900">{type.name}</div>
                  <div className="text-sm text-gray-500">{type.description}</div>
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Investment Amount
            </label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter Amount"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Gold Weight (in grams)
            </label>
            <input
              type="number"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              placeholder="Enter Weight"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
        </div>
      </BillModal>
    );
  };

  const FixedDepositsModal = ({ isOpen, onClose, onSubmit }) => {
    const [amount, setAmount] = useState('');
    const [tenure, setTenure] = useState('');
    const [interestRate, setInterestRate] = useState(null);

    const tenures = [
      { id: '3', name: '3 Months', rate: 5.5 },
      { id: '6', name: '6 Months', rate: 6.0 },
      { id: '12', name: '1 Year', rate: 6.5 },
      { id: '24', name: '2 Years', rate: 7.0 },
      { id: '36', name: '3 Years', rate: 7.5 },
      { id: '60', name: '5 Years', rate: 8.0 }
    ];

    const calculateMaturityAmount = () => {
      if (!amount || !tenure) return null;
      const principal = parseFloat(amount);
      const rate = interestRate / 100;
      const time = parseInt(tenure) / 12;
      const maturityAmount = principal * (1 + rate * time);
      return maturityAmount.toFixed(2);
    };

    return (
      <BillModal
        isOpen={isOpen}
        onClose={onClose}
        title="Fixed Deposit"
        onSubmit={() => onSubmit({ amount, tenure, interestRate })}
      >
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Investment Amount
            </label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter Amount"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Tenure
            </label>
            <div className="grid grid-cols-2 gap-3">
              {tenures.map((t) => (
                <button
                  key={t.id}
                  onClick={() => {
                    setTenure(t);
                    setInterestRate(t.rate);
                  }}
                  className={`p-4 border rounded-lg text-left transition-colors duration-200 ${
                    tenure?.id === t.id
                      ? 'border-indigo-500 bg-indigo-50'
                      : 'border-gray-200 hover:border-indigo-200'
                  }`}
                >
                  <div className="font-medium text-gray-900">{t.name}</div>
                  <div className="text-sm text-gray-500">{t.rate}% p.a.</div>
                </button>
              ))}
            </div>
          </div>

          {amount && tenure && (
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Interest Rate</span>
                  <span className="font-medium text-gray-900">{interestRate}% p.a.</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Maturity Amount</span>
                  <span className="text-xl font-bold text-gray-900">₹{calculateMaturityAmount()}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </BillModal>
    );
  };

  const RecurringDepositsModal = ({ isOpen, onClose, onSubmit }) => {
    const [monthlyAmount, setMonthlyAmount] = useState('');
    const [tenure, setTenure] = useState('');
    const [interestRate, setInterestRate] = useState(null);

    const tenures = [
      { id: '6', name: '6 Months', rate: 5.5 },
      { id: '12', name: '1 Year', rate: 6.0 },
      { id: '24', name: '2 Years', rate: 6.5 },
      { id: '36', name: '3 Years', rate: 7.0 },
      { id: '60', name: '5 Years', rate: 7.5 }
    ];

    const calculateMaturityAmount = () => {
      if (!monthlyAmount || !tenure) return null;
      const monthly = parseFloat(monthlyAmount);
      const months = parseInt(tenure);
      const rate = interestRate / 100;
      const maturityAmount = monthly * months * (1 + (rate * (months + 1)) / 24);
      return maturityAmount.toFixed(2);
    };

    return (
      <BillModal
        isOpen={isOpen}
        onClose={onClose}
        title="Recurring Deposit"
        onSubmit={() => onSubmit({ monthlyAmount, tenure, interestRate })}
      >
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Monthly Investment
            </label>
            <input
              type="number"
              value={monthlyAmount}
              onChange={(e) => setMonthlyAmount(e.target.value)}
              placeholder="Enter Monthly Amount"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Tenure
            </label>
            <div className="grid grid-cols-2 gap-3">
              {tenures.map((t) => (
                <button
                  key={t.id}
                  onClick={() => {
                    setTenure(t);
                    setInterestRate(t.rate);
                  }}
                  className={`p-4 border rounded-lg text-left transition-colors duration-200 ${
                    tenure?.id === t.id
                      ? 'border-indigo-500 bg-indigo-50'
                      : 'border-gray-200 hover:border-indigo-200'
                  }`}
                >
                  <div className="font-medium text-gray-900">{t.name}</div>
                  <div className="text-sm text-gray-500">{t.rate}% p.a.</div>
                </button>
              ))}
            </div>
          </div>

          {monthlyAmount && tenure && (
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Interest Rate</span>
                  <span className="font-medium text-gray-900">{interestRate}% p.a.</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Total Investment</span>
                  <span className="font-medium text-gray-900">₹{(parseFloat(monthlyAmount) * parseInt(tenure.id)).toFixed(2)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Maturity Amount</span>
                  <span className="text-xl font-bold text-gray-900">₹{calculateMaturityAmount()}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </BillModal>
    );
  };

  const SubscriptionOTTModal = ({ isOpen, onClose, onSubmit }) => {
    const [serviceType, setServiceType] = useState('');
    const [provider, setProvider] = useState('');
    const [subscriptionId, setSubscriptionId] = useState('');
    const [dueAmount, setDueAmount] = useState(null);

    const serviceTypes = [
      { id: 'streaming', name: 'Streaming', providers: ['Netflix', 'Prime Video', 'Disney+ Hotstar', 'Sony LIV', 'Zee5'] },
      { id: 'music', name: 'Music', providers: ['Spotify', 'Gaana', 'JioSaavn', 'Apple Music'] },
      { id: 'gaming', name: 'Gaming', providers: ['PlayStation Plus', 'Xbox Game Pass', 'Google Play Pass'] }
    ];

    const handleViewDue = () => {
      setDueAmount(499.00);
    };

    return (
      <BillModal
        isOpen={isOpen}
        onClose={onClose}
        title="Subscription & OTT Payment"
        onSubmit={() => onSubmit({ serviceType, provider, subscriptionId, amount: dueAmount })}
      >
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Service Type</label>
            <div className="grid grid-cols-1 gap-3">
              {serviceTypes.map((type) => (
                <button
                  key={type.id}
                  onClick={() => {
                    setServiceType(type);
                    setProvider('');
                  }}
                  className={`p-4 border rounded-lg text-left transition-colors duration-200 ${
                    serviceType?.id === type.id
                      ? 'border-indigo-500 bg-indigo-50'
                      : 'border-gray-200 hover:border-indigo-200'
                  }`}
                >
                  <div className="font-medium text-gray-900">{type.name}</div>
                </button>
              ))}
            </div>
          </div>
          {serviceType && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Provider</label>
              <select
                value={provider}
                onChange={(e) => setProvider(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="">Select Provider</option>
                {serviceType.providers.map((p) => (
                  <option key={p} value={p}>{p}</option>
                ))}
              </select>
            </div>
          )}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Subscription ID</label>
            <input
              type="text"
              value={subscriptionId}
              onChange={(e) => setSubscriptionId(e.target.value)}
              placeholder="Enter Subscription ID"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          {dueAmount ? (
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Due Amount</span>
                <span className="text-xl font-bold text-gray-900">₹{dueAmount.toFixed(2)}</span>
              </div>
            </div>
          ) : (
            <button
              onClick={handleViewDue}
              className="w-full px-4 py-2 text-sm font-medium text-indigo-600 bg-indigo-50 hover:bg-indigo-100 rounded-lg transition-colors duration-200"
            >
              View Due Amount
            </button>
          )}
        </div>
      </BillModal>
    );
  };

  const TransportTravelModal = ({ isOpen, onClose, onSubmit }) => {
    const [serviceType, setServiceType] = useState('');
    const [provider, setProvider] = useState('');
    const [bookingId, setBookingId] = useState('');
    const [dueAmount, setDueAmount] = useState(null);

    const serviceTypes = [
      { id: 'flight', name: 'Flight', providers: ['IndiGo', 'Air India', 'SpiceJet', 'GoAir'] },
      { id: 'train', name: 'Train', providers: ['IRCTC', 'Indian Railways'] },
      { id: 'bus', name: 'Bus', providers: ['RedBus', 'Abhibus', 'State Transport'] },
      { id: 'metro', name: 'Metro', providers: ['Delhi Metro', 'Mumbai Metro', 'Bangalore Metro'] }
    ];

    const handleViewDue = () => {
      setDueAmount(1200.00);
    };

    return (
      <BillModal
        isOpen={isOpen}
        onClose={onClose}
        title="Transport & Travel Payment"
        onSubmit={() => onSubmit({ serviceType, provider, bookingId, amount: dueAmount })}
      >
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Service Type</label>
            <div className="grid grid-cols-2 gap-3">
              {serviceTypes.map((type) => (
                <button
                  key={type.id}
                  onClick={() => {
                    setServiceType(type);
                    setProvider('');
                  }}
                  className={`p-4 border rounded-lg text-left transition-colors duration-200 ${
                    serviceType?.id === type.id
                      ? 'border-indigo-500 bg-indigo-50'
                      : 'border-gray-200 hover:border-indigo-200'
                  }`}
                >
                  <div className="font-medium text-gray-900">{type.name}</div>
                </button>
              ))}
            </div>
          </div>
          {serviceType && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Provider</label>
              <select
                value={provider}
                onChange={(e) => setProvider(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="">Select Provider</option>
                {serviceType.providers.map((p) => (
                  <option key={p} value={p}>{p}</option>
                ))}
              </select>
            </div>
          )}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Booking ID</label>
            <input
              type="text"
              value={bookingId}
              onChange={(e) => setBookingId(e.target.value)}
              placeholder="Enter Booking ID"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          {dueAmount ? (
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Due Amount</span>
                <span className="text-xl font-bold text-gray-900">₹{dueAmount.toFixed(2)}</span>
              </div>
            </div>
          ) : (
            <button
              onClick={handleViewDue}
              className="w-full px-4 py-2 text-sm font-medium text-indigo-600 bg-indigo-50 hover:bg-indigo-100 rounded-lg transition-colors duration-200"
            >
              View Due Amount
            </button>
          )}
        </div>
      </BillModal>
    );
  };

  const GovtServicesModal = ({ isOpen, onClose, onSubmit }) => {
    const [serviceType, setServiceType] = useState('');
    const [department, setDepartment] = useState('');
    const [referenceId, setReferenceId] = useState('');
    const [dueAmount, setDueAmount] = useState(null);

    const serviceTypes = [
      { id: 'passport', name: 'Passport', departments: ['Passport Seva Kendra'] },
      { id: 'driving', name: 'Driving License', departments: ['RTO'] },
      { id: 'certificates', name: 'Certificates', departments: ['Municipal Office', 'Tehsil'] },
      { id: 'tax', name: 'Tax Services', departments: ['Income Tax Dept.', 'GST Dept.'] }
    ];

    const handleViewDue = () => {
      setDueAmount(2000.00);
    };

    return (
      <BillModal
        isOpen={isOpen}
        onClose={onClose}
        title="Govt. Services Payment"
        onSubmit={() => onSubmit({ serviceType, department, referenceId, amount: dueAmount })}
      >
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Service Type</label>
            <div className="grid grid-cols-2 gap-3">
              {serviceTypes.map((type) => (
                <button
                  key={type.id}
                  onClick={() => {
                    setServiceType(type);
                    setDepartment('');
                  }}
                  className={`p-4 border rounded-lg text-left transition-colors duration-200 ${
                    serviceType?.id === type.id
                      ? 'border-indigo-500 bg-indigo-50'
                      : 'border-gray-200 hover:border-indigo-200'
                  }`}
                >
                  <div className="font-medium text-gray-900">{type.name}</div>
                </button>
              ))}
            </div>
          </div>
          {serviceType && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Department</label>
              <select
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="">Select Department</option>
                {serviceType.departments.map((d) => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
            </div>
          )}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Reference ID</label>
            <input
              type="text"
              value={referenceId}
              onChange={(e) => setReferenceId(e.target.value)}
              placeholder="Enter Reference ID"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          {dueAmount ? (
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Due Amount</span>
                <span className="text-xl font-bold text-gray-900">₹{dueAmount.toFixed(2)}</span>
              </div>
            </div>
          ) : (
            <button
              onClick={handleViewDue}
              className="w-full px-4 py-2 text-sm font-medium text-indigo-600 bg-indigo-50 hover:bg-indigo-100 rounded-lg transition-colors duration-200"
            >
              View Due Amount
            </button>
          )}
        </div>
      </BillModal>
    );
  };

  const OthersModal = ({ isOpen, onClose, onSubmit }) => {
    const [serviceType, setServiceType] = useState('');
    const [provider, setProvider] = useState('');
    const [referenceId, setReferenceId] = useState('');
    const [dueAmount, setDueAmount] = useState(null);

    const serviceTypes = [
      { id: 'charity', name: 'Charity', providers: ['GiveIndia', 'CRY', 'HelpAge India'] },
      { id: 'membership', name: 'Membership Fees', providers: ['Gym', 'Club', 'Library'] },
      { id: 'other', name: 'Other Subscriptions', providers: ['Cable Operator', 'Event Tickets'] }
    ];

    const handleViewDue = () => {
      setDueAmount(300.00);
    };

    return (
      <BillModal
        isOpen={isOpen}
        onClose={onClose}
        title="Other Payments"
        onSubmit={() => onSubmit({ serviceType, provider, referenceId, amount: dueAmount })}
      >
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Service Type</label>
            <div className="grid grid-cols-1 gap-3">
              {serviceTypes.map((type) => (
                <button
                  key={type.id}
                  onClick={() => {
                    setServiceType(type);
                    setProvider('');
                  }}
                  className={`p-4 border rounded-lg text-left transition-colors duration-200 ${
                    serviceType?.id === type.id
                      ? 'border-indigo-500 bg-indigo-50'
                      : 'border-gray-200 hover:border-indigo-200'
                  }`}
                >
                  <div className="font-medium text-gray-900">{type.name}</div>
                </button>
              ))}
            </div>
          </div>
          {serviceType && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Provider</label>
              <select
                value={provider}
                onChange={(e) => setProvider(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="">Select Provider</option>
                {serviceType.providers.map((p) => (
                  <option key={p} value={p}>{p}</option>
                ))}
              </select>
            </div>
          )}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Reference ID</label>
            <input
              type="text"
              value={referenceId}
              onChange={(e) => setReferenceId(e.target.value)}
              placeholder="Enter Reference ID"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          {dueAmount ? (
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Due Amount</span>
                <span className="text-xl font-bold text-gray-900">₹{dueAmount.toFixed(2)}</span>
              </div>
            </div>
          ) : (
            <button
              onClick={handleViewDue}
              className="w-full px-4 py-2 text-sm font-medium text-indigo-600 bg-indigo-50 hover:bg-indigo-100 rounded-lg transition-colors duration-200"
            >
              View Due Amount
            </button>
          )}
        </div>
      </BillModal>
    );
  };

  // Add handlers for the new modals
  const handleMobileRecharge = (data) => {
    console.log('Mobile Recharge Data:', data);
    setShowMobileRecharge(false);
  };

  const handleDTHRecharge = (data) => {
    console.log('DTH Recharge Data:', data);
    setShowDTHRecharge(false);
  };

  const handleBroadband = (data) => {
    console.log('Broadband Data:', data);
    setShowBroadband(false);
  };

  const handleElectricity = (data) => {
    console.log('Electricity Data:', data);
    setShowElectricity(false);
  };

  const handleGas = (data) => {
    console.log('Gas Booking Data:', data);
    setShowGas(false);
  };

  const handleWater = (data) => {
    console.log('Water Bill Data:', data);
    setShowWater(false);
  };

  const handleInsurance = (data) => {
    console.log('Insurance Data:', data);
    setShowInsurance(false);
  };

  const handleEducation = (data) => {
    console.log('Education Data:', data);
    setShowEducation(false);
  };

  const handleMunicipal = (data) => {
    console.log('Municipal Tax Data:', data);
    setShowMunicipal(false);
  };

  const handleFastag = (data) => {
    console.log('FASTag Data:', data);
    setShowFastag(false);
  };

  const handleCreditCard = (data) => {
    console.log('Credit Card Data:', data);
    setShowCreditCard(false);
  };

  const handleLoanEMI = (data) => {
    console.log('Loan EMI Data:', data);
    setShowLoanEMI(false);
  };

  const handleMutualFunds = (data) => {
    console.log('Mutual Funds Data:', data);
    setShowMutualFunds(false);
  };

  const handleSIP = (data) => {
    console.log('SIP Data:', data);
    setShowSIP(false);
  };

  const handleGold = (data) => {
    console.log('Gold Data:', data);
    setShowGold(false);
  };

  const handleFixedDeposits = (data) => {
    console.log('Fixed Deposits Data:', data);
    setShowFixedDeposits(false);
  };

  const handleRecurringDeposits = (data) => {
    console.log('Recurring Deposits Data:', data);
    setShowRecurringDeposits(false);
  };

  const handleSubscriptionOTT = (data) => {
    console.log('Subscription & OTT Data:', data);
    setShowSubscriptionOTT(false);
  };

  const handleTransportTravel = (data) => {
    console.log('Transport & Travel Data:', data);
    setShowTransportTravel(false);
  };

  const handleGovtServices = (data) => {
    console.log('Govt. Services Data:', data);
    setShowGovtServices(false);
  };

  const handleOthers = (data) => {
    console.log('Others Data:', data);
    setShowOthers(false);
  };

  // Update the category click handler
  const handleCategoryClick = (category) => {
    switch (category.id) {
      case 'mobile':
        setShowMobileRecharge(true);
        break;
      case 'dth':
        setShowDTHRecharge(true);
        break;
      case 'broadband':
        setShowBroadband(true);
        break;
      case 'electricity':
        setShowElectricity(true);
        break;
      case 'gas':
        setShowGas(true);
        break;
      case 'water':
        setShowWater(true);
        break;
      case 'insurance':
        setShowInsurance(true);
        break;
      case 'education':
        setShowEducation(true);
        break;
      case 'municipal':
        setShowMunicipal(true);
        break;
      case 'fastag':
        setShowFastag(true);
        break;
      case 'creditcard':
        setShowCreditCard(true);
        break;
      case 'loan':
        setShowLoanEMI(true);
        break;
      case 'mutualfunds':
        setShowMutualFunds(true);
        break;
      case 'sip':
        setShowSIP(true);
        break;
      case 'gold':
        setShowGold(true);
        break;
      case 'fixeddeposits':
        setShowFixedDeposits(true);
        break;
      case 'recurringdeposits':
        setShowRecurringDeposits(true);
        break;
      case 'subscription':
        setShowSubscriptionOTT(true);
        break;
      case 'transport':
        setShowTransportTravel(true);
        break;
      case 'govt':
        setShowGovtServices(true);
        break;
      case 'others':
        setShowOthers(true);
        break;
      default:
        setShowAddBill(true);
        setSelectedCategory(category.id);
    }
  };

  const handleSchedulePayment = (data) => {
    const newScheduledPayment = {
      id: Date.now(),
      ...data,
      status: 'scheduled'
    };
    setScheduledPayments([...scheduledPayments, newScheduledPayment]);
    setShowSchedulePayment(false);
    toast.success('Payment scheduled successfully!');
  };

  const handleCancelScheduledPayment = (paymentId) => {
    setScheduledPayments(scheduledPayments.filter(payment => payment.id !== paymentId));
    toast.success('Scheduled payment cancelled successfully!');
  };

  const handleProcessScheduledPayment = (payment) => {
    // Simulate payment processing
    setTimeout(() => {
      const newPayment = {
        id: Date.now(),
        type: payment.type,
        provider: payment.provider,
        amount: payment.amount,
        date: new Date().toISOString().split('T')[0],
        status: 'completed',
        paymentMethod: payment.paymentMethod,
        transactionId: `TXN${Date.now()}`
      };
      setPaymentHistory([newPayment, ...paymentHistory]);
      setScheduledPayments(scheduledPayments.filter(p => p.id !== payment.id));
      toast.success('Scheduled payment processed successfully!');
    }, 2000);
  };

  const SchedulePaymentModal = ({ isOpen, onClose, onSubmit }) => {
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedTime, setSelectedTime] = useState('');
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');
    const [amount, setAmount] = useState('');

    const handleSubmit = () => {
      if (!selectedDate || !selectedTime || !selectedPaymentMethod || !amount) {
        toast.error('Please fill in all fields');
        return;
      }

      const scheduledDateTime = new Date(`${selectedDate}T${selectedTime}`);
      if (scheduledDateTime < new Date()) {
        toast.error('Please select a future date and time');
        return;
      }

      onSubmit({
        scheduledDate: selectedDate,
        scheduledTime: selectedTime,
        paymentMethod: selectedPaymentMethod,
        amount: parseFloat(amount)
      });
    };

    return (
      <BillModal
        isOpen={isOpen}
        onClose={onClose}
        title="Schedule Payment"
        onSubmit={handleSubmit}
      >
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Date
            </label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              min={new Date().toISOString().split('T')[0]}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Time
            </label>
            <input
              type="time"
              value={selectedTime}
              onChange={(e) => setSelectedTime(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Payment Method
            </label>
            <select
              value={selectedPaymentMethod}
              onChange={(e) => setSelectedPaymentMethod(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="">Select Payment Method</option>
              <option value="UPI">UPI</option>
              <option value="Credit Card">Credit Card</option>
              <option value="Debit Card">Debit Card</option>
              <option value="Net Banking">Net Banking</option>
              <option value="Wallet">Wallet</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Amount
            </label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter amount"
              min="0"
              step="0.01"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
        </div>
      </BillModal>
    );
  };

  const PaymentHistoryModal = ({ isOpen, onClose, history }) => {
    const getStatusColor = (status) => {
      switch (status) {
        case 'completed':
          return 'text-green-600 bg-green-50';
        case 'failed':
          return 'text-red-600 bg-red-50';
        case 'scheduled':
          return 'text-yellow-600 bg-yellow-50';
        default:
          return 'text-gray-600 bg-gray-50';
      }
    };

    return (
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        title="Payment History"
      >
        <div className="space-y-4">
          {/* Scheduled Payments Section */}
          {scheduledPayments.length > 0 && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Scheduled Payments</h3>
              {scheduledPayments.map((payment) => (
                <div
                  key={payment.id}
                  className="p-4 border border-gray-200 rounded-lg hover:border-indigo-200 transition-colors duration-200 mb-4"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center">
                        {getBillIcon(payment.type)}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{payment.provider}</p>
                        <p className="text-sm text-gray-500">{payment.type}</p>
                      </div>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(payment.status)}`}>
                      {payment.status}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                    <div>
                      <p className="text-gray-500">Amount</p>
                      <p className="font-medium text-gray-900">₹{payment.amount.toFixed(2)}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Scheduled Date</p>
                      <p className="font-medium text-gray-900">{payment.scheduledDate}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Scheduled Time</p>
                      <p className="font-medium text-gray-900">{payment.scheduledTime}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Payment Method</p>
                      <p className="font-medium text-gray-900">{payment.paymentMethod}</p>
                    </div>
                  </div>
                  <div className="flex justify-end space-x-2">
                    <button
                      onClick={() => handleProcessScheduledPayment(payment)}
                      className="px-3 py-1 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition-colors duration-200"
                    >
                      Process Now
                    </button>
                    <button
                      onClick={() => handleCancelScheduledPayment(payment.id)}
                      className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition-colors duration-200"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Payment History Section */}
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Payment History</h3>
          {history.map((payment) => (
            <div
              key={payment.id}
              className="p-4 border border-gray-200 rounded-lg hover:border-indigo-200 transition-colors duration-200"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center">
                    {getBillIcon(payment.type)}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{payment.provider}</p>
                    <p className="text-sm text-gray-500">{payment.type}</p>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(payment.status)}`}>
                  {payment.status}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-500">Amount</p>
                  <p className="font-medium text-gray-900">₹{payment.amount.toFixed(2)}</p>
                </div>
                <div>
                  <p className="text-gray-500">Date</p>
                  <p className="font-medium text-gray-900">{payment.date}</p>
                </div>
                <div>
                  <p className="text-gray-500">Payment Method</p>
                  <p className="font-medium text-gray-900">{payment.paymentMethod}</p>
                </div>
                <div>
                  <p className="text-gray-500">Transaction ID</p>
                  <p className="font-medium text-gray-900">{payment.transactionId}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Modal>
    );
  };

  // Update the BillsAndPayments component to include the new modals
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-50">
      <DashboardPageHeader />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-24">
        {/* Page Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Bills & Payments</h1>
          <div className="flex space-x-4">
            <button
              onClick={() => setShowSchedulePayment(true)}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200"
            >
              Schedule Payment
            </button>
            <button
              onClick={() => setShowPaymentHistory(true)}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors duration-200"
            >
              Payment History
            </button>
          </div>
        </div>

        {/* Quick Actions */}
        {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
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
        </div> */}

        {/* Bill Categories */}
        <div className="mb-8">
          {/* <h2 className="text-xl font-semibold text-gray-900 mb-4">Pay Bills & Recharge</h2> */}
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {billCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => handleCategoryClick(category)}
                className="flex flex-col items-center p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 border border-gray-200 hover:border-indigo-200 group"
              >
                <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 group-hover:bg-indigo-200 transition-colors duration-200 mb-2">
                  {category.icon}
                </div>
                <span className="text-sm font-medium text-gray-700 text-center">{category.name}</span>
                {/* {category.subCategories && (
                  <span className="text-xs text-gray-500 mt-1">{category.subCategories.join(' • ')}</span>
                )} */}
              </button>
            ))}
          </div>
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

                  {renderPayNowButton(bill)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Update modals */}
      <BillDetailsModal />
      <ReceiptModal />
      <PaymentModal />
      <SchedulePaymentModal
        isOpen={showSchedulePayment}
        onClose={() => setShowSchedulePayment(false)}
        onSubmit={handleSchedulePayment}
      />
      <PaymentHistoryModal
        isOpen={showPaymentHistory}
        onClose={() => setShowPaymentHistory(false)}
        history={paymentHistory}
      />

      {/* Add Bill Modal */}
      <Modal
        isOpen={showAddBill}
        onClose={() => {
          setShowAddBill(false);
          setSelectedCategory('');
          setSelectedProvider('');
        }}
        title="Add New Bill"
      >
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Bill Category
              </label>
              <select 
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                value={selectedCategory}
                onChange={(e) => {
                  setSelectedCategory(e.target.value);
                  setSelectedProvider('');
                }}
              >
                <option value="">Select Category</option>
                {billCategories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Provider
              </label>
              <select
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                value={selectedProvider}
                onChange={(e) => setSelectedProvider(e.target.value)}
                disabled={!selectedCategory}
              >
                <option value="">Select Provider</option>
                {selectedCategory && billCategories
                  .find(cat => cat.id === selectedCategory)
                  ?.providers.map((provider) => (
                    <option key={provider} value={provider}>
                      {provider}
                    </option>
                  ))}
              </select>
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

      {/* Add the new modals */}
      <MobileRechargeModal
        isOpen={showMobileRecharge}
        onClose={() => setShowMobileRecharge(false)}
        onSubmit={handleMobileRecharge}
      />
      <DTHRechargeModal
        isOpen={showDTHRecharge}
        onClose={() => setShowDTHRecharge(false)}
        onSubmit={handleDTHRecharge}
      />
      <BroadbandModal
        isOpen={showBroadband}
        onClose={() => setShowBroadband(false)}
        onSubmit={handleBroadband}
      />
      <ElectricityModal
        isOpen={showElectricity}
        onClose={() => setShowElectricity(false)}
        onSubmit={handleElectricity}
      />
      <GasBookingModal
        isOpen={showGas}
        onClose={() => setShowGas(false)}
        onSubmit={handleGas}
      />
      <WaterModal
        isOpen={showWater}
        onClose={() => setShowWater(false)}
        onSubmit={handleWater}
      />
      <InsuranceModal
        isOpen={showInsurance}
        onClose={() => setShowInsurance(false)}
        onSubmit={handleInsurance}
      />
      <EducationModal
        isOpen={showEducation}
        onClose={() => setShowEducation(false)}
        onSubmit={handleEducation}
      />
      <MunicipalTaxModal
        isOpen={showMunicipal}
        onClose={() => setShowMunicipal(false)}
        onSubmit={handleMunicipal}
      />
      <FastagModal
        isOpen={showFastag}
        onClose={() => setShowFastag(false)}
        onSubmit={handleFastag}
      />
      <CreditCardModal
        isOpen={showCreditCard}
        onClose={() => setShowCreditCard(false)}
        onSubmit={handleCreditCard}
      />
      <LoanEMIModal
        isOpen={showLoanEMI}
        onClose={() => setShowLoanEMI(false)}
        onSubmit={handleLoanEMI}
      />
      <MutualFundsModal
        isOpen={showMutualFunds}
        onClose={() => setShowMutualFunds(false)}
        onSubmit={handleMutualFunds}
      />
      <SIPModal
        isOpen={showSIP}
        onClose={() => setShowSIP(false)}
        onSubmit={handleSIP}
      />
      <GoldModal
        isOpen={showGold}
        onClose={() => setShowGold(false)}
        onSubmit={handleGold}
      />
      <FixedDepositsModal
        isOpen={showFixedDeposits}
        onClose={() => setShowFixedDeposits(false)}
        onSubmit={handleFixedDeposits}
      />
      <RecurringDepositsModal
        isOpen={showRecurringDeposits}
        onClose={() => setShowRecurringDeposits(false)}
        onSubmit={handleRecurringDeposits}
      />
      <SubscriptionOTTModal
        isOpen={showSubscriptionOTT}
        onClose={() => setShowSubscriptionOTT(false)}
        onSubmit={handleSubscriptionOTT}
      />
      <TransportTravelModal
        isOpen={showTransportTravel}
        onClose={() => setShowTransportTravel(false)}
        onSubmit={handleTransportTravel}
      />
      <GovtServicesModal
        isOpen={showGovtServices}
        onClose={() => setShowGovtServices(false)}
        onSubmit={handleGovtServices}
      />
      <OthersModal
        isOpen={showOthers}
        onClose={() => setShowOthers(false)}
        onSubmit={handleOthers}
      />

      <DashboardPageFooter />
    </div>
  );
};

export default BillsAndPayments; 