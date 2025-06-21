import React from 'react';

const LoadingSkeleton = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-2 sm:gap-3">
      {Array.from({ length: 14 }).map((_, i) => (
        <div
          key={i}
          className="bg-gray-100 rounded-lg sm:rounded-xl p-2.5 sm:p-3 animate-pulse h-32 flex flex-col justify-between border border-gray-200"
        >
          <div className="flex items-center space-x-2 mb-2">
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-gray-200" />
            <div className="flex-1">
              <div className="h-3 w-16 bg-gray-200 rounded mb-1" />
              <div className="h-2 w-20 bg-gray-200 rounded" />
            </div>
          </div>
          <div className="space-y-1">
            <div className="h-2 w-24 bg-gray-200 rounded" />
            <div className="h-2 w-16 bg-gray-200 rounded" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default LoadingSkeleton; 