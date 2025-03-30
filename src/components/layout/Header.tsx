import React from 'react';

// メニュー項目の定義
const menuItems = [
  { id: 'file', label: 'ファイル' },
  { id: 'view', label: '表示' },
  { id: 'chart', label: 'チャート' },
  { id: 'tools', label: '分析ツール' },
  { id: 'settings', label: '設定' },
  { id: 'alerts', label: 'アラート' },
  { id: 'social', label: 'ソーシャル設定' },
  { id: 'help', label: 'ヘルプ' },
];

const Header: React.FC = () => {
  return (
    <div className="bg-app-dark border-b border-gray-700">
      
      {/* メニューバー */}
      <div className="flex bg-app-darker px-2 py-1">
        {menuItems.map((item) => (
          <div key={item.id} className="menu-item">
            {item.label}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Header;
