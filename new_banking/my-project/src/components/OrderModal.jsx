import React, { useRef, useEffect } from 'react';
import { FaTimes, FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';

const OrderModal = ({
  show,
  selectedStock,
  orderType,
  orderQuantity,
  orderPrice,
  orderTotal,
  orderStatus,
  onQuantityChange,
  onPriceChange,
  onPlaceOrder,
  onClose,
  calculateHoldings
}) => {
  const modalRef = useRef(null);
  const firstInputRef = useRef(null);

  // Focus trap
  useEffect(() => {
    if (show && modalRef.current) {
      const modalNode = modalRef.current;
      const focusableEls = modalNode.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      const firstEl = focusableEls[0];
      const lastEl = focusableEls[focusableEls.length - 1];
      const handleTab = (e) => {
        if (e.key === 'Tab') {
          if (e.shiftKey) {
            if (document.activeElement === firstEl) {
              e.preventDefault();
              lastEl.focus();
            }
          } else {
            if (document.activeElement === lastEl) {
              e.preventDefault();
              firstEl.focus();
            }
          }
        } else if (e.key === 'Escape') {
          onClose();
        }
      };
      modalNode.addEventListener('keydown', handleTab);
      // Focus the first input
      if (firstInputRef.current) firstInputRef.current.focus();
      return () => {
        if (modalNode) {
          modalNode.removeEventListener('keydown', handleTab);
        }
      };
    }
  }, [show, onClose]);

  if (!show || !selectedStock) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      {/* Add fade/scale animation to modal. Remember to define @keyframes modalIn in your global CSS. */}
      <div
        className="bg-white rounded-2xl p-6 w-full max-w-md transform transition-all duration-300 scale-95 opacity-0 animate-[modalIn_0.3s_ease-out_forwards]"
        role="dialog"
        aria-modal="true"
        aria-labelledby="order-modal-title"
        ref={modalRef}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 id="order-modal-title" className="text-2xl font-bold text-gray-900">
            {orderType === 'buy' ? 'Buy' : 'Sell'} {selectedStock.symbol}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
            aria-label="Close order modal"
          >
            <FaTimes className="w-6 h-6" />
          </button>
        </div>

        {orderStatus && (
          <div className={`mb-4 p-4 rounded-lg ${orderStatus.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
            <div className="flex items-center">
              {orderStatus.type === 'success' ? (
                <FaCheckCircle className="w-5 h-5 mr-2" />
              ) : (
                <FaExclamationCircle className="w-5 h-5 mr-2" />
              )}
              <span>{orderStatus.message}</span>
            </div>
          </div>
        )}

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Current Price
            </label>
            <div className="text-2xl font-bold text-gray-900">
              ₹{selectedStock.price.toFixed(2)}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Quantity
            </label>
            <input
              type="number"
              min="1"
              value={orderQuantity}
              onChange={onQuantityChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              aria-label="Order quantity"
              tabIndex={0}
              ref={firstInputRef}
              autoFocus
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Price per Share
            </label>
            <input
              type="number"
              min="0"
              step="0.01"
              value={orderPrice}
              onChange={onPriceChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              aria-label="Order price per share"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Total Amount
            </label>
            <div className="text-2xl font-bold text-gray-900">
              ₹{orderTotal.toFixed(2)}
            </div>
          </div>

          {orderType === 'sell' && (
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600">
                Available Holdings: {calculateHoldings(selectedStock.symbol)} shares
              </p>
            </div>
          )}

          <button
            onClick={onPlaceOrder}
            className={`w-full py-3 rounded-lg font-medium text-white ${orderType === 'buy' ? 'bg-green-600 hover:bg-green-700' : 'bg-red-600 hover:bg-red-700'}`}
            aria-label={orderType === 'buy' ? 'Buy' : 'Sell'}
          >
            {orderType === 'buy' ? 'Buy' : 'Sell'} {selectedStock.symbol}
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderModal; 