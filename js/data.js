/* PulseFinance — Data Module */
window.PF = window.PF || {};

PF.TICKER_DATA = [
  {sym:'AAPL', price:193.42, chg:1.24, pos:true},{sym:'MSFT', price:419.85, chg:0.87, pos:true},
  {sym:'GOOGL',price:174.23, chg:-0.32, pos:false},{sym:'AMZN', price:199.12, chg:2.14, pos:true},
  {sym:'NVDA', price:875.90, chg:3.45, pos:true},{sym:'TSLA', price:182.63, chg:-1.87, pos:false},
  {sym:'META', price:509.44, chg:1.03, pos:true},{sym:'BTC',  price:67420, chg:2.91, pos:true},
  {sym:'ETH',  price:3281, chg:1.54, pos:true},{sym:'SPX',  price:5234, chg:0.41, pos:true},
  {sym:'DXY',  price:104.82, chg:-0.12, pos:false},{sym:'GOLD', price:2312, chg:0.28, pos:true},
  {sym:'OIL',  price:78.34, chg:-0.65, pos:false},{sym:'VIX',  price:13.82, chg:-5.20, pos:false},
];

PF.HOLDINGS = [
  {name:'Apple Inc.',     ticker:'AAPL', type:'equity', price:193.42, chg:1.24,  pos:true,  weight:18.2, value:878340, signal:'buy',  color:'#718096'},
  {name:'NVIDIA Corp.',   ticker:'NVDA', type:'equity', price:875.90, chg:3.45,  pos:true,  weight:14.8, value:714260, signal:'buy',  color:'#48bb78'},
  {name:'Microsoft',      ticker:'MSFT', type:'equity', price:419.85, chg:0.87,  pos:true,  weight:12.5, value:603420, signal:'hold', color:'#63b3ed'},
  {name:'Bitcoin',        ticker:'BTC',  type:'crypto', price:67420,  chg:2.91,  pos:true,  weight:10.1, value:487340, signal:'buy',  color:'#f6ad55'},
  {name:'Vanguard S&P',  ticker:'VOO',  type:'etf',    price:493.20, chg:0.41,  pos:true,  weight:9.4,  value:453820, signal:'hold', color:'#4fd1c5'},
  {name:'Alphabet',       ticker:'GOOGL',type:'equity', price:174.23, chg:-0.32, pos:false, weight:7.8,  value:376590, signal:'hold', color:'#4299e1'},
  {name:'Tesla Inc.',     ticker:'TSLA', type:'equity', price:182.63, chg:-1.87, pos:false, weight:6.2,  value:299240, signal:'sell', color:'#fc8181'},
  {name:'Amazon',         ticker:'AMZN', type:'equity', price:199.12, chg:2.14,  pos:true,  weight:5.9,  value:284810, signal:'buy',  color:'#f6ad55'},
  {name:'US T-Bond 10Y', ticker:'GOVT', type:'bond',   price:91.45,  chg:0.08,  pos:true,  weight:5.6,  value:270340, signal:'hold', color:'#a0aec0'},
  {name:'Meta Platforms', ticker:'META', type:'equity', price:509.44, chg:1.03,  pos:true,  weight:4.8,  value:231760, signal:'buy',  color:'#667eea'},
  {name:'Ethereum',       ticker:'ETH',  type:'crypto', price:3281,   chg:1.54,  pos:true,  weight:2.8,  value:135180, signal:'hold', color:'#b794f4'},
  {name:'Gold ETF',       ticker:'GLD',  type:'etf',    price:214.30, chg:0.28,  pos:true,  weight:1.9,  value:91740,  signal:'hold', color:'#d4af37'},
];

PF.ALLOCATION = [
  {name:'Technology', pct:38, color:'#63b3ed'},{name:'Financials', pct:18, color:'#b794f4'},
  {name:'Crypto',     pct:13, color:'#f6ad55'},{name:'Bonds',      pct:11, color:'#4fd1c5'},
  {name:'Healthcare', pct:9,  color:'#68d391'},{name:'Consumer',   pct:6,  color:'#fc8181'},
  {name:'Other',      pct:5,  color:'#a0aec0'},
];

PF.RISKS = [
  {name:'Market',     val:32, color:'#63b3ed'},{name:'Credit',     val:18, color:'#68d391'},
  {name:'Liquidity',  val:24, color:'#f6ad55'},{name:'Currency',   val:41, color:'#b794f4'},
  {name:'Volatility', val:28, color:'#fc8181'},
];

PF.PULSE_METRICS = [
  {label:'S&P 500',   value:'5,234',  change:'+0.41%', pos:true},{label:'NASDAQ',    value:'16,820', change:'+0.63%', pos:true},
  {label:'DXY',       value:'104.82', change:'-0.12%', pos:false},{label:'VIX',       value:'13.82',  change:'-5.2%',  pos:false},
  {label:'10Y Yield', value:'4.32%',  change:'+0.04',  pos:false},{label:'Gold',      value:'$2,312', change:'+0.28%', pos:true},
  {label:'Oil WTI',   value:'$78.34', change:'-0.65%', pos:false},{label:'BTC Dom.',  value:'52.4%',  change:'+0.8%',  pos:true},
];

PF.ACTIVITY = [
  {type:'buy',      title:'Bought 50 NVDA @ $875.90',              meta:'09:31:42 · Market Order',       amount:'+$43,795', atype:'buy'},
  {type:'sell',     title:'Sold 100 AAPL @ $193.42',               meta:'09:28:17 · Limit Order',         amount:'−$19,342', atype:'sell'},
  {type:'buy',      title:'Bought 25 MSFT @ $419.85',              meta:'09:15:03 · Market Order',        amount:'+$10,496', atype:'buy'},
  {type:'alert',    title:'TSLA crossed below 50-day moving avg',   meta:'09:10:56 · Technical Alert',     amount:'', atype:''},
  {type:'dividend', title:'Received dividend: VOO $0.84/share',     meta:'09:00:00 · Quarterly Dividend',  amount:'+$420', atype:'buy'},
  {type:'news',     title:'Fed holds rates steady — markets rally', meta:'08:45:00 · Market News',         amount:'', atype:''},
  {type:'sell',     title:'Sold 200 GOOGL @ $174.23 (Stop Loss)',   meta:'08:30:22 · Stop Loss Triggered', amount:'−$34,846', atype:'sell'},
  {type:'buy',      title:'Bought 0.5 BTC @ $67,200',              meta:'08:12:11 · Market Order',        amount:'+$33,600', atype:'buy'},
  {type:'alert',    title:'NVDA approaching all-time high level',   meta:'07:55:40 · Price Alert',         amount:'', atype:''},
  {type:'news',     title:'CPI data inline with expectations',      meta:'07:30:00 · Economic Data',       amount:'', atype:''},
];

PF.genTimeSeries = function(points, base, volatility, trend) {
  const data = []; let val = base;
  for (let i = 0; i < points; i++) {
    val = val + (Math.random() - 0.48) * volatility + trend;
    val = Math.max(val, base * 0.7);
    data.push(Math.round(val * 100) / 100);
  }
  return data;
};

PF.genLabels = function(range) {
  const now = new Date(); const labels = [];
  if (range === '1D') {
    for (let h = 9; h <= 16; h++) for (let m = 0; m < 60; m += 15) {
      if (h === 9 && m < 30) continue; if (h === 16 && m > 0) break;
      labels.push(h + ':' + m.toString().padStart(2,'0'));
    }
    return labels;
  }
  if (range === '1W') {
    for (let i = 6; i >= 0; i--) { const d = new Date(now); d.setDate(d.getDate()-i); labels.push(d.toLocaleDateString('en-US',{weekday:'short'})); }
    return labels;
  }
  for (let i = 11; i >= 0; i--) {
    const d = new Date(now); d.setMonth(d.getMonth()-i);
    labels.push(d.toLocaleDateString('en-US',{month:'short'}));
  }
  return labels;
};

PF.getDataPoints = function(range) { return {'1D':27,'1W':7,'1M':30,'3M':12,'YTD':12,'1Y':12}[range] || 27; };
