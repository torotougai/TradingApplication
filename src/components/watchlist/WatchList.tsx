import React, { useState, useEffect } from 'react';
import { MarketData, getMarketData } from '../../services/MarketService';

interface WatchListProps {
  onSelectSymbol: (symbol: string) => void;
}

const WatchList: React.FC<WatchListProps> = ({ onSelectSymbol }) => {
  const [marketData, setMarketData] = useState<MarketData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // マウント時にマーケットデータを取得
  useEffect(() => {
    const fetchMarketData = async () => {
      try {
        setLoading(true);
        const data = await getMarketData();
        // オブジェクトから配列に変換
        const dataArray = Object.values(data);
        setMarketData(dataArray);
        setError(null);
      } catch (err) {
        console.error('マーケットデータの取得に失敗しました', err);
        setError('データの読み込みに失敗しました。後でもう一度お試しください。');
      } finally {
        setLoading(false);
      }
    };

    fetchMarketData();

    // 定期的に更新（実際のアプリでは更新間隔を調整する）
    const intervalId = setInterval(fetchMarketData, 30000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="h-full bg-app-dark border-r border-gray-700">
      <div className="px-4 py-2 font-semibold border-b border-gray-700">ウォッチリスト</div>
      
      {loading && marketData.length === 0 && (
        <div className="p-4 text-center text-gray-400">読み込み中...</div>
      )}
      
      {error && (
        <div className="p-4 text-center text-red-400">{error}</div>
      )}
      
      <div className="overflow-y-auto h-[calc(100%-2.5rem)]">
        {marketData.map((item) => (
          <div 
            key={item.symbol} 
            className="watchlist-item"
            onClick={() => onSelectSymbol(item.symbol)}
          >
            <div className="font-medium">{item.symbol}</div>
            <div className={item.change >= 0 ? 'price-up' : 'price-down'}>
              {item.price.toLocaleString()}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WatchList;
