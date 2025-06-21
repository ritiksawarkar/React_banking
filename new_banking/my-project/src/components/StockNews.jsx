import React, { useEffect, useState } from 'react';
import axios from 'axios';

const FINNHUB_API_KEY = 'd1a5mj9r01qltimvc2j0d1a5mj9r01qltimvc2jg';

const StockNews = ({ symbol }) => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!symbol) return;
    setLoading(true);
    axios
      .get(`https://finnhub.io/api/v1/company-news?symbol=${symbol}&from=2024-01-01&to=2024-12-31&token=${FINNHUB_API_KEY}`)
      .then(res => setNews(res.data || []))
      .catch(() => setNews([]))
      .finally(() => setLoading(false));
  }, [symbol]);

  if (loading) return <div className="py-4">Loading news...</div>;
  if (!news.length) return <div className="py-4 text-gray-500">No news found.</div>;

  return (
    <div className="space-y-4">
      {news.slice(0, 5).map(item => (
        <div key={item.id || item.datetime} className="border-b border-gray-200 pb-4">
          <a href={item.url} target="_blank" rel="noopener noreferrer" className="font-medium text-blue-700 hover:underline">
            {item.headline}
          </a>
          <p className="text-sm text-gray-500 mt-1">{item.summary}</p>
          <p className="text-xs text-gray-400 mt-2">{new Date(item.datetime * 1000).toLocaleString()}</p>
        </div>
      ))}
    </div>
  );
};

export default StockNews; 