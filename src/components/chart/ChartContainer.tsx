import React, { useEffect, useRef } from 'react';
import { createChart, ColorType, IChartApi, ISeriesApi, LineData } from 'lightweight-charts';

// サンプルチャートデータ
const generateSampleData = (): LineData[] => {
  const data: LineData[] = [];
  let time = new Date(Date.UTC(2023, 0, 1, 0, 0, 0, 0));
  let value = 35000;
  
  for (let i = 0; i < 100; i++) {
    // 乱数を生成して価格変動をシミュレート
    const change = (Math.random() * 2 - 1) * 500;
    value = Math.max(30000, value + change);
    
    data.push({
      time: time.getTime() / 1000,
      value: value,
    });
    
    // 次の時間に進める
    time = new Date(time.getTime() + 24 * 60 * 60 * 1000);
  }
  
  return data;
};

interface ChartContainerProps {
  symbol: string;
  timeframe: string;
}

const ChartContainer: React.FC<ChartContainerProps> = ({ symbol, timeframe }) => {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<IChartApi | null>(null);
  const seriesRef = useRef<ISeriesApi<"Line"> | null>(null);

  useEffect(() => {
    // コンポーネントがマウントされたときにチャートを初期化
    if (chartContainerRef.current && !chartRef.current) {
      const chart = createChart(chartContainerRef.current, {
        layout: {
          background: { color: '#171723' },
          textColor: '#d1d4dc',
        },
        grid: {
          vertLines: { color: '#2e2e3e' },
          horzLines: { color: '#2e2e3e' },
        },
        width: chartContainerRef.current.clientWidth,
        height: chartContainerRef.current.clientHeight,
      });

      // ラインシリーズを追加
      const lineSeries = chart.addLineSeries({
        color: '#4caf50',
        lineWidth: 2,
      });

      // サンプルデータを設定
      lineSeries.setData(generateSampleData());

      // リサイズハンドラを設定
      const handleResize = () => {
        if (chartRef.current && chartContainerRef.current) {
          chartRef.current.applyOptions({
            width: chartContainerRef.current.clientWidth,
            height: chartContainerRef.current.clientHeight,
          });
        }
      };

      // リサイズイベントをリッスン
      window.addEventListener('resize', handleResize);

      // 参照を保存
      chartRef.current = chart;
      seriesRef.current = lineSeries;

      // クリーンアップ関数
      return () => {
        window.removeEventListener('resize', handleResize);
        if (chartRef.current) {
          chartRef.current.remove();
          chartRef.current = null;
          seriesRef.current = null;
        }
      };
    }
  }, []);

  // シンボルが変更されたときにチャートデータを更新
  useEffect(() => {
    if (seriesRef.current) {
      // 新しいシンボルのデータを生成
      const newData = generateSampleData();
      seriesRef.current.setData(newData);
    }
  }, [symbol]);

  return (
    <div className="flex flex-col h-full bg-app-dark">
      <div className="flex items-center justify-between px-4 py-2 border-b border-gray-700">
        <div className="font-semibold">{symbol} - {timeframe}</div>
        <div className="flex space-x-2">
          <button className="p-1 text-xs border border-gray-600 rounded hover:bg-gray-700">1分</button>
          <button className="p-1 text-xs border border-gray-600 rounded hover:bg-gray-700">5分</button>
          <button className="p-1 text-xs border border-gray-600 rounded hover:bg-gray-700">15分</button>
          <button className="p-1 text-xs border border-gray-600 rounded hover:bg-gray-700">1時間</button>
          <button className="p-1 text-xs border border-gray-600 rounded bg-gray-700">1日</button>
        </div>
      </div>
      <div className="flex-1" ref={chartContainerRef} />
    </div>
  );
};

export default ChartContainer;
