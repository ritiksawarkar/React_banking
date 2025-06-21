import React from 'react';
import { FaRegNewspaper } from 'react-icons/fa';

const NewsSection = ({ MOCK_NEWS = [] }) => (
  <section className="bg-white rounded-lg shadow p-4 mb-8">
    <h2 className="text-lg font-semibold text-yellow-800 mb-3 flex items-center gap-2">
      <FaRegNewspaper className="text-yellow-500" /> Latest Gold News
    </h2>
    <ul className="divide-y divide-yellow-100">
      {MOCK_NEWS.length === 0 ? (
        <li className="py-2 text-gray-500">No news available.</li>
      ) : (
        MOCK_NEWS.map((news, idx) => (
          <li key={idx} className="py-2 flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <span className="font-medium text-gray-800">{news.title}</span>
            <span className="text-xs text-gray-500 mt-1 sm:mt-0">
              {news.date} &middot; {news.source}
            </span>
          </li>
        ))
      )}
    </ul>
  </section>
);

export default NewsSection;
