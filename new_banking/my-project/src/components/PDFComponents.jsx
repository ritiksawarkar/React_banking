import React from 'react';
import { FaFilePdf, FaPrint } from 'react-icons/fa';

export const ReceiptContent = ({ receiptData }) => (
  <div className="space-y-6 p-6 bg-white">
    <div className="text-center border-b pb-4">
      <h2 className="text-2xl font-bold text-gray-900">Payment Receipt</h2>
      <p className="text-sm text-gray-500">Transaction Successful</p>
    </div>

    <div className="grid grid-cols-2 gap-4">
      <div>
        <p className="text-sm text-gray-500">Receipt ID</p>
        <p className="font-medium text-gray-900">{receiptData.id}</p>
      </div>
      <div>
        <p className="text-sm text-gray-500">Transaction ID</p>
        <p className="font-medium text-gray-900">{receiptData.transactionId}</p>
      </div>
      <div>
        <p className="text-sm text-gray-500">Payment Date</p>
        <p className="font-medium text-gray-900">{receiptData.paymentDate}</p>
      </div>
      <div>
        <p className="text-sm text-gray-500">Payment Method</p>
        <p className="font-medium text-gray-900">{receiptData.paymentMethod}</p>
      </div>
      <div>
        <p className="text-sm text-gray-500">Amount Paid</p>
        <p className="text-2xl font-bold text-gray-900">
          ₹{receiptData.amount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
        </p>
      </div>
      <div>
        <p className="text-sm text-gray-500">Status</p>
        <p className="font-medium text-green-600">Success</p>
      </div>
    </div>

    <div className="border-t pt-4">
      <h3 className="font-semibold text-gray-900 mb-2">Bill Details</h3>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-sm text-gray-500">Bill Type</p>
          <p className="font-medium text-gray-900 capitalize">{receiptData.billDetails.type}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Provider</p>
          <p className="font-medium text-gray-900">{receiptData.billDetails.provider}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Bill Number</p>
          <p className="font-medium text-gray-900">{receiptData.billDetails.billNumber}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Bill Date</p>
          <p className="font-medium text-gray-900">{receiptData.billDetails.billDate}</p>
        </div>
      </div>
    </div>

    <div className="border-t pt-4">
      <p className="text-sm text-gray-500">Thank you for your payment!</p>
      <p className="text-sm text-gray-500">This receipt serves as proof of payment.</p>
    </div>
  </div>
);

export const BillDetailsContent = ({ bill, getBillIcon, getStatusInfo }) => (
  <div className="space-y-6 p-6 bg-white">
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600">
          {getBillIcon(bill.type)}
        </div>
        <div>
          <h4 className="text-lg font-semibold text-gray-900 capitalize">{bill.type}</h4>
          <p className="text-sm text-gray-500">{bill.provider}</p>
        </div>
      </div>
      <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusInfo(bill.status).color}`}>
        {getStatusInfo(bill.status).icon}
        <span className="ml-1 capitalize">{bill.status}</span>
      </div>
    </div>

    <div className="grid grid-cols-2 gap-6">
      <div>
        <p className="text-sm text-gray-500">Amount</p>
        <p className="text-2xl font-bold text-gray-900">
          ₹{bill.amount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
        </p>
      </div>
      <div>
        <p className="text-sm text-gray-500">Due Date</p>
        <p className="text-sm font-medium text-gray-900">{bill.dueDate}</p>
      </div>
      <div>
        <p className="text-sm text-gray-500">Bill Number</p>
        <p className="text-sm font-medium text-gray-900">{bill.billNumber}</p>
      </div>
      <div>
        <p className="text-sm text-gray-500">Bill Date</p>
        <p className="text-sm font-medium text-gray-900">{bill.billDate}</p>
      </div>
      {bill.consumption && (
        <>
          <div>
            <p className="text-sm text-gray-500">Consumption</p>
            <p className="text-sm font-medium text-gray-900">{bill.consumption}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Previous Reading</p>
            <p className="text-sm font-medium text-gray-900">{bill.previousReading}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Current Reading</p>
            <p className="text-sm font-medium text-gray-900">{bill.currentReading}</p>
          </div>
        </>
      )}
      {bill.plan && (
        <div>
          <p className="text-sm text-gray-500">Plan</p>
          <p className="text-sm font-medium text-gray-900">{bill.plan}</p>
        </div>
      )}
    </div>

    <div className="border-t pt-4">
      <p className="text-sm text-gray-500">Payment Terms and Conditions</p>
      <ul className="text-sm text-gray-500 list-disc list-inside mt-2">
        <li>Payment is due on or before the due date</li>
        <li>Late payments may incur additional charges</li>
        <li>Please keep this bill for your records</li>
      </ul>
    </div>
  </div>
);

export const PDFActions = ({ onDownload, onPrint, onClose }) => (
  <div className="flex justify-end space-x-3 pt-4 border-t border-gray-100">
    <button
      onClick={onDownload}
      className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors duration-200"
    >
      <FaFilePdf className="w-4 h-4" />
      <span>Download PDF</span>
    </button>
    {onPrint && (
      <button
        onClick={onPrint}
        className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors duration-200"
      >
        <FaPrint className="w-4 h-4" />
        <span>Print</span>
      </button>
    )}
    <button
      onClick={onClose}
      className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg transition-colors duration-200"
    >
      Close
    </button>
  </div>
); 