import React, { useState, useEffect } from 'react';

const StatusBar: React.FC = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  
  // 1秒ごとに現在時刻を更新
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    
    return () => {
      clearInterval(timer);
    };
  }, []);
  
  // 日付と時刻のフォーマット
  const dateTimeString = currentTime.toLocaleString('ja-JP', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
  });
  
  return (
    <div className="bg-app-dark border-t border-gray-700 px-4 py-1 text-xs text-gray-400 flex justify-between">
      <div className="flex items-center space-x-4">
        <div className="flex items-center">
          <span className="w-2 h-2 rounded-full bg-green-500 mr-2"></span>
          <span>接続済み | サーバー応答: 25ms</span>
        </div>
        <div>CPU: 15% | RAM: 2.4GB</div>
      </div>
      <div>{dateTimeString}</div>
    </div>
  );
};

export default StatusBar;
