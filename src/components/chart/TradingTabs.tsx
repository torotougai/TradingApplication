import React, { useState } from 'react';

// 取引データのサンプル
const positionsData = [
  { id: 1, symbol: 'BTC/USD', type: '買い', size: 0.5, entryPrice: 33450, currentPrice: 34512, profit: '+3.2%' },
  { id: 2, symbol: 'ETH/USD', type: '売り', size: 2.0, entryPrice: 2370, currentPrice: 2345, profit: '+0.5%' },
];

const TradingTabs: React.FC = () => {
  const [activeTab, setActiveTab] = useState('positions');

  // タブを切り替える関数
  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
  };

  return (
    <div className="h-full bg-app-dark border-t border-gray-700">
      {/* タブナビゲーション */}
      <div className="flex border-b border-gray-700">
        <button
          className={`px-4 py-2 ${activeTab === 'positions' ? 'bg-gray-700 text-white' : 'text-gray-400 hover:bg-gray-800'}`}
          onClick={() => handleTabChange('positions')}
        >
          ポジション
        </button>
        <button
          className={`px-4 py-2 ${activeTab === 'orders' ? 'bg-gray-700 text-white' : 'text-gray-400 hover:bg-gray-800'}`}
          onClick={() => handleTabChange('orders')}
        >
          注文履歴
        </button>
        <button
          className={`px-4 py-2 ${activeTab === 'alerts' ? 'bg-gray-700 text-white' : 'text-gray-400 hover:bg-gray-800'}`}
          onClick={() => handleTabChange('alerts')}
        >
          アラート
        </button>
        <button
          className={`px-4 py-2 ${activeTab === 'history' ? 'bg-gray-700 text-white' : 'text-gray-400 hover:bg-gray-800'}`}
          onClick={() => handleTabChange('history')}
        >
          履歴
        </button>
      </div>

      {/* タブコンテンツ */}
      <div className="p-4">
        {activeTab === 'positions' && (
          <div>
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="px-2 py-1 text-left">銘柄</th>
                  <th className="px-2 py-1 text-left">方向</th>
                  <th className="px-2 py-1 text-right">数量</th>
                  <th className="px-2 py-1 text-right">エントリー価格</th>
                  <th className="px-2 py-1 text-right">現在価格</th>
                  <th className="px-2 py-1 text-right">損益</th>
                </tr>
              </thead>
              <tbody>
                {positionsData.map((position) => (
                  <tr key={position.id} className="border-b border-gray-700">
                    <td className="px-2 py-1">{position.symbol}</td>
                    <td className={`px-2 py-1 ${position.type === '買い' ? 'text-app-green' : 'text-app-red'}`}>
                      {position.type}
                    </td>
                    <td className="px-2 py-1 text-right">{position.size}</td>
                    <td className="px-2 py-1 text-right">{position.entryPrice.toLocaleString()}</td>
                    <td className="px-2 py-1 text-right">{position.currentPrice.toLocaleString()}</td>
                    <td className="px-2 py-1 text-right text-app-green">{position.profit}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'orders' && (
          <div className="text-gray-400">注文履歴はありません</div>
        )}

        {activeTab === 'alerts' && (
          <div className="text-gray-400">アラートはありません</div>
        )}

        {activeTab === 'history' && (
          <div className="text-gray-400">取引履歴はありません</div>
        )}
      </div>
    </div>
  );
};

export default TradingTabs;
