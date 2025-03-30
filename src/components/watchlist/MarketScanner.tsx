import React from 'react';

// スキャナー項目の定義
const scannerItems = [
  { id: 'bullish', label: '強気トレンド' },
  { id: 'bearish', label: '弱気トレンド' },
  { id: 'volume', label: '出来高急増' },
];

const MarketScanner: React.FC = () => {
  return (
    <div className="h-full bg-app-dark border-r border-gray-700">
      <div className="px-4 py-2 font-semibold border-b border-gray-700">マーケットスキャナー</div>
      <div className="overflow-y-auto h-[calc(100%-2.5rem)]">
        {scannerItems.map((item) => (
          <div key={item.id} className="sidebar-item">
            {item.label}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MarketScanner;
