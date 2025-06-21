import React, { useRef, useEffect } from 'react';
import { FaTimes } from 'react-icons/fa';

const TransactionHistoryModal = ({ show, orders, onClose }) => {
  const modalRef = useRef(null);
  const closeBtnRef = useRef(null);

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
      // Focus the close button
      if (closeBtnRef.current) closeBtnRef.current.focus();
      return () => modalNode.removeEventListener('keydown', handleTab);
    }
  }, [show, onClose]);

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      {/* Add fade/scale animation to modal. Remember to define @keyframes modalIn in your global CSS. */}
      <div
        className="bg-white rounded-2xl p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto transform transition-all duration-300 scale-95 opacity-0 animate-[modalIn_0.3s_ease-out_forwards]"
        role="dialog"
        aria-modal="true"
        aria-labelledby="transaction-history-modal-title"
        ref={modalRef}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 id="transaction-history-modal-title" className="text-2xl font-bold text-gray-900">Transaction History</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
            aria-label="Close transaction history modal"
            tabIndex={0}
            ref={closeBtnRef}
            autoFocus
          >
            <FaTimes className="w-6 h-6" />
          </button>
        </div>

        <div className="space-y-4">
          {orders.length === 0 ? (
            <div className="text-center py-8">
              {/* SVG Illustration */}
              <svg width="80" height="80" viewBox="0 0 80 80" fill="none" className="mx-auto mb-4" xmlns="http://www.w3.org/2000/svg">
                <circle cx="40" cy="40" r="40" fill="#F3F4F6" />
                <rect x="22" y="32" width="36" height="24" rx="4" fill="#A78BFA" />
                <rect x="28" y="38" width="24" height="4" rx="2" fill="#C4B5FD" />
                <rect x="28" y="44" width="16" height="4" rx="2" fill="#C4B5FD" />
              </svg>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No transactions yet</h3>
              <p className="text-gray-500 mb-2">You haven't made any buy or sell orders yet.</p>
              <p className="text-gray-400 text-sm">Start trading stocks to see your transaction history here.</p>
            </div>
          ) : (
            orders.map((order) => (
              <div
                key={order.id}
                className="p-4 bg-gray-50 rounded-lg border border-gray-100"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className={`font-medium ${order.type === 'buy' ? 'text-green-600' : 'text-red-600'}`}>
                        {order.type.toUpperCase()}
                      </span>
                      <span className="font-bold">{order.symbol}</span>
                    </div>
                    <p className="text-sm text-gray-500">
                      {new Date(order.timestamp).toLocaleString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">
                      {order.quantity} shares @ ₹{order.price.toFixed(2)}
                    </p>
                    <p className="text-sm text-gray-500">
                      Total: ₹{order.total.toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default TransactionHistoryModal; 