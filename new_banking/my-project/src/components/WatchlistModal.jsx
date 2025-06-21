import React from 'react';
import { FaTimes } from 'react-icons/fa';
import WatchlistStockCard from './WatchlistStockCard';

const WatchlistModal = ({ show, watchlist, stocks, onClose, handleAddToWatchlist }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto transform transition-all duration-300 scale-95 opacity-0 animate-[modalIn_0.3s_ease-out_forwards]">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">My Watchlist</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            <FaTimes className="w-6 h-6" />
          </button>
        </div>
        {watchlist.length === 0 ? (
          <div className="text-center py-8">
            <svg width="80" height="80" viewBox="0 0 80 80" fill="none" className="mx-auto mb-4" xmlns="http://www.w3.org/2000/svg">
              <circle cx="40" cy="40" r="40" fill="#F3F4F6" />
              <path d="M40 22C32.268 22 26 28.268 26 36C26 43.732 32.268 50 40 50C47.732 50 54 43.732 54 36C54 28.268 47.732 22 40 22ZM40 48C33.373 48 28 42.627 28 36C28 29.373 33.373 24 40 24C46.627 24 52 29.373 52 36C52 42.627 46.627 48 40 48Z" fill="#A78BFA" />
              <path d="M40 56C34.477 56 30 60.477 30 66H50C50 60.477 45.523 56 40 56Z" fill="#C4B5FD" />
            </svg>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Your watchlist is empty</h3>
            <p className="text-gray-500 mb-2">Add stocks to your watchlist to track them here and get notified of price changes.</p>
            <p className="text-gray-400 text-sm">Use the <span className="inline-block align-middle"><svg width="16" height="16" fill="currentColor" className="inline text-purple-600" viewBox="0 0 16 16"><path d="M8 1.5a.5.5 0 0 1 .5.5v5.5H14a.5.5 0 0 1 0 1H8.5V14a.5.5 0 0 1-1 0V8.5H2a.5.5 0 0 1 0-1h5.5V2a.5.5 0 0 1 .5-.5z"/></svg></span> button to add stocks.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {watchlist.map(symbol => {
              const stock = stocks.find(s => s.symbol === symbol);
              if (!stock) return null;
              return (
                <WatchlistStockCard
                  key={symbol}
                  stock={stock}
                  onRemove={() => handleAddToWatchlist(symbol)}
                />
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default WatchlistModal; 