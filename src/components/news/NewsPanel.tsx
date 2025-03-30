import React from 'react';

// ニュースアイテムの定義
const newsItems = [
  { 
    id: 1, 
    title: 'ビットコイン、4万ドル突破の勢い', 
    date: '2023/03/30 10:15',
    source: 'Crypto News'
  },
  { 
    id: 2, 
    title: 'FRB、金利据え置きを決定', 
    date: '2023/03/30 08:05',
    source: 'Financial Times'
  }
];

// ソーシャル投稿の定義
const socialPosts = [
  {
    id: 1,
    user: 'crypto_trader',
    avatar: '👨‍💻',
    message: 'BTC/USDの下落、買いのチャンスです',
    time: '5分前'
  },
  {
    id: 2,
    user: 'stock_analyst',
    avatar: '👩‍💼',
    message: 'AAPLの四半期決算に注目しています',
    time: '20分前'
  }
];

const NewsPanel: React.FC = () => {
  return (
    <div className="h-full bg-app-dark border-l border-gray-700 flex flex-col">
      {/* ニュースセクション */}
      <div className="flex-1 border-b border-gray-700">
        <div className="px-4 py-2 font-semibold border-b border-gray-700">ニュース</div>
        <div className="overflow-y-auto h-[calc(100%-2.5rem)] p-4">
          {newsItems.map((item) => (
            <div key={item.id} className="mb-4 pb-3 border-b border-gray-700">
              <div className="text-sm text-gray-400">{item.date}</div>
              <div className="font-medium mb-1">{item.title}</div>
              <div className="text-xs text-gray-500">{item.source}</div>
            </div>
          ))}
        </div>
      </div>
      
      {/* ソーシャルセクション */}
      <div className="flex-1">
        <div className="px-4 py-2 font-semibold border-b border-gray-700">ソーシャル</div>
        <div className="overflow-y-auto h-[calc(100%-2.5rem)] p-4">
          {socialPosts.map((post) => (
            <div key={post.id} className="flex items-start mb-4 pb-3 border-b border-gray-700">
              <div className="mr-3 text-2xl">{post.avatar}</div>
              <div>
                <div className="flex items-center">
                  <div className="font-medium">{post.user}</div>
                  <div className="text-xs text-gray-400 ml-2">{post.time}</div>
                </div>
                <div className="text-sm mt-1">{post.message}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NewsPanel;
