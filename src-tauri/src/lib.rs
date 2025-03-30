use serde::{Deserialize, Serialize};
use std::collections::HashMap;
use std::sync::Mutex;
use once_cell::sync::Lazy;

// マーケットデータの構造体
#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct MarketData {
    pub symbol: String,
    pub price: f64,
    pub change: f64,
    pub high: f64,
    pub low: f64,
    pub volume: f64,
}

// 注文の構造体
#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct Order {
    pub id: String,
    pub symbol: String,
    pub side: String, // "buy" or "sell"
    pub price: f64,
    pub quantity: f64,
    pub status: String, // "open", "filled", "canceled"
    pub timestamp: u64,
}

// ポジションの構造体
#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct Position {
    pub symbol: String,
    pub side: String, // "long" or "short"
    pub entry_price: f64,
    pub current_price: f64,
    pub quantity: f64,
    pub unrealized_pnl: f64,
    pub unrealized_pnl_percent: f64,
}

// グローバルなマーケットデータのモック
// スレッドセーフなグローバル変数
static MOCK_MARKET_DATA: Lazy<Mutex<Option<HashMap<String, MarketData>>>> = 
    Lazy::new(|| Mutex::new(None));

// マーケットデータの初期化
fn init_market_data() -> HashMap<String, MarketData> {
    let mut data = HashMap::new();
    
    data.insert(
        "BTC/USD".to_string(),
        MarketData {
            symbol: "BTC/USD".to_string(),
            price: 34512.0,
            change: 1.2,
            high: 35000.0,
            low: 34000.0,
            volume: 5234.5,
        },
    );
    
    data.insert(
        "ETH/USD".to_string(),
        MarketData {
            symbol: "ETH/USD".to_string(),
            price: 2345.0,
            change: -0.5,
            high: 2400.0,
            low: 2300.0,
            volume: 12345.6,
        },
    );
    
    data.insert(
        "AAPL".to_string(),
        MarketData {
            symbol: "AAPL".to_string(),
            price: 189.5,
            change: 0.8,
            high: 190.2,
            low: 187.5,
            volume: 45678.9,
        },
    );
    
    data.insert(
        "MSFT".to_string(),
        MarketData {
            symbol: "MSFT".to_string(),
            price: 420.1,
            change: 1.5,
            high: 425.0,
            low: 415.0,
            volume: 23456.7,
        },
    );
    
    data
}

// マーケットデータの取得コマンド
#[tauri::command]
fn get_market_data() -> HashMap<String, MarketData> {
    let mut data = MOCK_MARKET_DATA.lock().unwrap();
    if data.is_none() {
        *data = Some(init_market_data());
    }
    data.clone().unwrap()
}


// 特定のシンボルのマーケットデータを取得
#[tauri::command]
fn get_symbol_data(symbol: &str) -> Option<MarketData> {
    let data = MOCK_MARKET_DATA.lock().unwrap();
    if data.is_none() {
        return None;
    }
    data.as_ref().unwrap().get(symbol).cloned()
}

// 新しい注文を作成
#[tauri::command]
fn create_order(symbol: &str, side: &str, price: f64, quantity: f64) -> Order {
    // 実際のアプリケーションでは、注文IDの生成や注文の処理を行う
    let order_id = format!("order_{}", std::time::SystemTime::now().duration_since(std::time::UNIX_EPOCH).unwrap().as_secs());
    
    Order {
        id: order_id,
        symbol: symbol.to_string(),
        side: side.to_string(),
        price,
        quantity,
        status: "open".to_string(),
        timestamp: std::time::SystemTime::now().duration_since(std::time::UNIX_EPOCH).unwrap().as_secs(),
    }
}

// 挨拶コマンド（既存のコマンド）
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

// Tauriアプリケーションの実行
#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![
            greet,
            get_market_data,
            get_symbol_data,
            create_order
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
