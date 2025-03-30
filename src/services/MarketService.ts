import { invoke } from "@tauri-apps/api/core";

// マーケットデータの型定義
export interface MarketData {
  symbol: string;
  price: number;
  change: number;
  high: number;
  low: number;
  volume: number;
}

// 注文の型定義
export interface Order {
  id: string;
  symbol: string;
  side: string;
  price: number;
  quantity: number;
  status: string;
  timestamp: number;
}

// ポジションの型定義
export interface Position {
  symbol: string;
  side: string;
  entry_price: number;
  current_price: number;
  quantity: number;
  unrealized_pnl: number;
  unrealized_pnl_percent: number;
}

// マーケットデータを取得する関数
export async function getMarketData(): Promise<Record<string, MarketData>> {
  try {
    const data = await invoke<Record<string, MarketData>>("get_market_data");
    return data;
  } catch (error) {
    console.error("マーケットデータの取得に失敗しました:", error);
    return {};
  }
}

// 特定のシンボルのマーケットデータを取得する関数
export async function getSymbolData(symbol: string): Promise<MarketData | null> {
  try {
    const data = await invoke<MarketData | null>("get_symbol_data", { symbol });
    return data;
  } catch (error) {
    console.error(`${symbol}のデータ取得に失敗しました:`, error);
    return null;
  }
}

// 注文を作成する関数
export async function createOrder(
  symbol: string,
  side: string,
  price: number,
  quantity: number
): Promise<Order | null> {
  try {
    const order = await invoke<Order>("create_order", {
      symbol,
      side,
      price,
      quantity,
    });
    return order;
  } catch (error) {
    console.error("注文の作成に失敗しました:", error);
    return null;
  }
}
