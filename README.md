# PulseFinance Analytics Platform

A complete, production-grade FinTech Analytics Platform built with pure HTML, CSS, and JavaScript.

## Project Structure

```
fintech-platform/
├── index.html              ← Main Dashboard (entry point)
├── README.md
├── css/
│   ├── variables.css       ← Design tokens (dark/light themes)
│   ├── base.css            ← Reset, typography, background FX
│   ├── layout.css          ← Sidebar, topbar, responsive grid
│   ├── components.css      ← All UI components
│   ├── charts.css          ← Chart overrides
│   └── animations.css      ← Keyframes & scroll animations
├── js/
│   ├── data.js             ← All mock financial data & generators
│   ├── charts.js           ← Chart.js chart builders
│   ├── ui.js               ← UI builders (ticker, tables, feeds)
│   └── dashboard.js        ← Dashboard init, modal, keyboard shortcuts
└── pages/
    ├── portfolio.html      ← Full portfolio positions view
    ├── markets.html        ← Market indices, heatmap, movers
    ├── trading.html        ← Trade desk with order book
    ├── orders.html         ← Order history & management
    ├── watchlist.html      ← Watchlist with price alerts
    ├── analytics.html      ← Performance analytics & charts
    ├── risk.html           ← Risk matrix & stress tests
    └── reports.html        ← Report generation & scheduling
```

## Features

### Dashboard (index.html)
- Live market ticker strip with animated scroll
- 5 KPI hero cards with sparklines (AUM, P&L, Sharpe, Win Rate, Beta)
- Portfolio performance chart — switchable Area/Line/Bar + time ranges (1D→1Y)
- Asset allocation donut chart with animated breakdown bars
- Top Holdings table with buy/sell/hold signals
- Risk gauge with exposure bars per category
- Market Pulse grid (8 live market metrics)
- Live activity feed with trade/alert/news filtering
- Volume analysis chart with VWAP stats
- Exchange status strip (NYSE, NASDAQ, LSE, JPX, SSE)
- Trade execution modal with order form & P&L preview
- Live clock, P&L jitter simulation, toast notifications
- Dark/Light theme toggle

### Trade Desk (trading.html)
- Candlestick/line price chart with time range switching
- Live order book with bid/ask depth visualization (auto-refreshes)
- Full trade form with Buy/Sell toggle, order types, Stop/TP fields
- Real-time order total calculation
- Open positions panel with unrealized P&L

### Orders (orders.html)
- Filterable order history (All/Filled/Pending/Canceled)
- Order stats summary cards
- Full order detail table with status pills

### Portfolio (portfolio.html)
- Complete position table with cost basis, unrealized P&L
- Portfolio value, invested, return, and cash cards

### Markets (markets.html)
- 6 major index cards (S&P 500, NASDAQ, Dow, Russell, VIX, 10Y)
- S&P 500 sector heatmap with color-coded returns
- Top gainers / top losers panels

### Analytics (analytics.html)
- 8 risk-adjusted performance metrics (Sharpe, Sortino, Calmar, Alpha, Beta…)
- Monthly returns bar chart
- Return distribution histogram

### Risk Matrix (risk.html)
- Risk score KPIs (VaR 95%, CVaR, Max Drawdown)
- Risk category heatmap cells
- VaR by asset table
- 6 stress test scenario cards (COVID, 2008, Rate Hike, etc.)

### Watchlist (watchlist.html)
- Clickable watchlist cards with quick chart
- Price alerts panel with on/off toggles

### Reports (reports.html)
- 6 report type cards (Performance, Risk, Tax, Compliance…)
- Scheduled reports list with status

## How to Run

Simply open `index.html` in any modern browser. No build step, no dependencies to install — all external libraries (Chart.js, Google Fonts) load from CDN.

```bash
# Option 1: Direct open
open index.html

# Option 2: Local server (avoids any CORS)
npx serve .
# or
python3 -m http.server 8080
```

## Tech Stack
- **HTML5** — semantic, accessible markup
- **CSS3** — custom properties, grid, flexbox, animations
- **JavaScript (ES6+)** — modular, no frameworks
- **Chart.js 4.4** — performance & allocation charts
- **Google Fonts** — Syne (display) + DM Sans (body) + DM Mono (data)

## Design System
- Dark-first with full light mode support via CSS custom properties
- Responsive down to 375px mobile
- Animated background grid + color orbs for depth
- Font stack: Syne (headings) · DM Sans (body) · DM Mono (data/prices)
- Color palette: Blues, Greens (profit), Reds (loss), Amber (warning), Purple (accent)
