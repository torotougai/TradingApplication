import React, { useState } from 'react';
import Header from './Header';
import StatusBar from './StatusBar';
import WatchList from '../watchlist/WatchList';
import MarketScanner from '../watchlist/MarketScanner';
import ChartContainer from '../chart/ChartContainer';
import TradingTabs from '../chart/TradingTabs';
import OrderPanel from '../order/OrderPanel';
import NewsPanel from '../news/NewsPanel';

const MainLayout: React.FC = () => {
  // 選択された銘柄と時間枠の状態
  const [selectedSymbol, setSelectedSymbol] = useState('BTC/USD');
  const [selectedTimeframe, setSelectedTimeframe] = useState('1日');
  
  // 現在価格（実際のアプリケーションではリアルタイムデータから取得）
  const symbolPrices: { [key: string]: number } = {
    'BTC/USD': 34512,
    'ETH/USD': 2345,
    'AAPL': 189.5,
    'MSFT': 420.1,
  };
  
  const currentPrice = symbolPrices[selectedSymbol] || 0;
  
  // 銘柄が選択されたときのハンドラー
  const handleSymbolSelect = (symbol: string) => {
    setSelectedSymbol(symbol);
  };

  return (
    <div className="flex flex-col h-screen">
      {/* ヘッダー */}
      <Header />
      
      {/* メインコンテンツ */}
      <div className="flex flex-1 overflow-hidden">
        {/* 左サイドバー */}
        <div className="w-64 flex flex-col">
          <div className="flex-1">
            <WatchList onSelectSymbol={handleSymbolSelect} />
          </div>
          <div className="flex-1">
            <MarketScanner />
          </div>
        </div>
        
        {/* 中央エリア */}
        <div className="flex-1 flex flex-col">
          {/* チャートエリア */}
          <div className="flex-1">
            <ChartContainer symbol={selectedSymbol} timeframe={selectedTimeframe} />
          </div>
          
          {/* 取引タブエリア */}
          <div className="h-48">
            <TradingTabs />
          </div>
        </div>
        
        {/* 右サイドバー */}
        <div className="w-72 flex flex-col">
          {/* 注文パネル */}
          <div className="flex-1">
            <OrderPanel symbol={selectedSymbol} currentPrice={currentPrice} />
          </div>
          
          {/* ニュースとソーシャルパネル */}
          <div className="flex-1">
            <NewsPanel />
          </div>
        </div>
      </div>
      
      {/* ステータスバー */}
      <StatusBar />
    </div>
  );
};

export default MainLayout;
