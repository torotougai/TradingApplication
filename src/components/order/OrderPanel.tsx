import React, { useState, useEffect } from 'react';
import { getSymbolData, createOrder } from '../../services/MarketService';

interface OrderPanelProps {
  symbol: string;
  currentPrice: number;
}

const OrderPanel: React.FC<OrderPanelProps> = ({ symbol, currentPrice }) => {
  const [orderType, setOrderType] = useState('買い');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState(currentPrice.toString());
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' | '' }>({
    text: '',
    type: '',
  });

  // シンボルまたは現在価格が変更されたときに価格を更新
  useEffect(() => {
    setPrice(currentPrice.toString());
  }, [symbol, currentPrice]);

  // 最新のシンボルデータを取得
  const refreshSymbolData = async () => {
    try {
      const data = await getSymbolData(symbol);
      if (data) {
        setPrice(data.price.toString());
      }
    } catch (error) {
      console.error('シンボルデータの取得に失敗しました', error);
    }
  };

  // 注文を送信する関数
  const submitOrder = async (side: string) => {
    if (!quantity || !price) {
      setMessage({
        text: '数量と価格を入力してください',
        type: 'error',
      });
      return;
    }

    try {
      setIsSubmitting(true);
      setMessage({ text: '', type: '' });

      const order = await createOrder(
        symbol,
        side.toLowerCase() === '買い' ? 'buy' : 'sell',
        parseFloat(price),
        parseFloat(quantity)
      );

      if (order) {
        setMessage({
          text: `${side}注文を送信しました: ${symbol} ${quantity}枚 @ ${price}`,
          type: 'success',
        });
        // フォームをリセット
        setQuantity('');
      } else {
        setMessage({
          text: '注文の送信に失敗しました',
          type: 'error',
        });
      }
    } catch (error) {
      console.error('注文の送信中にエラーが発生しました', error);
      setMessage({
        text: '注文の送信中にエラーが発生しました',
        type: 'error',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="h-full bg-app-dark border-l border-gray-700">
      <div className="px-4 py-2 font-semibold border-b border-gray-700 flex justify-between items-center">
        <span>注文</span>
        <button
          className="text-xs text-blue-400 hover:text-blue-300"
          onClick={refreshSymbolData}
        >
          更新
        </button>
      </div>
      
      <div className="p-4">
        {/* 注文タイプの選択 */}
        <div className="flex mb-4">
          <button
            className={`flex-1 py-2 ${orderType === '買い' ? 'bg-app-green text-white' : 'bg-gray-700 text-gray-300'}`}
            onClick={() => setOrderType('買い')}
          >
            買い
          </button>
          <button
            className={`flex-1 py-2 ${orderType === '売り' ? 'bg-app-red text-white' : 'bg-gray-700 text-gray-300'}`}
            onClick={() => setOrderType('売り')}
          >
            売り
          </button>
        </div>
        
        {/* 数量入力 */}
        <div className="mb-4">
          <label className="block text-sm text-gray-400 mb-1">数量：</label>
          <input
            type="number"
            className="input-field w-full"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            placeholder="0.00"
            step="0.01"
            min="0"
          />
        </div>
        
        {/* 価格入力 */}
        <div className="mb-6">
          <label className="block text-sm text-gray-400 mb-1">価格：</label>
          <input
            type="number"
            className="input-field w-full"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            step="0.01"
            min="0"
          />
        </div>

        {/* メッセージ表示エリア */}
        {message.text && (
          <div
            className={`mb-4 p-2 text-sm rounded ${
              message.type === 'success' ? 'bg-green-800 text-green-100' : 'bg-red-800 text-red-100'
            }`}
          >
            {message.text}
          </div>
        )}
        
        {/* 注文ボタン */}
        <div className="flex space-x-4">
          <button
            className="flex-1 btn-buy"
            onClick={() => submitOrder('買い')}
            disabled={isSubmitting}
          >
            {isSubmitting ? '処理中...' : '買い注文'}
          </button>
          <button
            className="flex-1 btn-sell"
            onClick={() => submitOrder('売り')}
            disabled={isSubmitting}
          >
            {isSubmitting ? '処理中...' : '売り注文'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderPanel;
