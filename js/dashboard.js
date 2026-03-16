/* PulseFinance — Dashboard Init */
window.PF = window.PF || {};
PF._currentRange = '1D';
PF._currentChartType = 'area';

/* ─── TRADE MODAL ─── */
window.openTradeModal = function() {
  document.getElementById('tradeModal').classList.add('open');
};
window.closeTradeModal = function(e) {
  if (!e || e.target === e.currentTarget) {
    document.getElementById('tradeModal').classList.remove('open');
  }
};
window.setSide = function(side) {
  document.getElementById('buyBtn').classList.toggle('active', side==='buy');
  document.getElementById('sellBtn').classList.toggle('active', side==='sell');
};
window.calcTradeTotal = function() {
  const qty = parseFloat(document.getElementById('tradeQty').value) || 0;
  const price = parseFloat(document.getElementById('tradePrice').value) || 0;
  const total = qty * price;
  const comm = total * 0.0005;
  document.getElementById('tradeTotal').textContent = '$' + total.toFixed(2);
  document.getElementById('tradeComm').textContent = '$' + comm.toFixed(2);
  document.getElementById('tradeNet').textContent = '$' + (total + comm).toFixed(2);
};
window.submitTrade = function() {
  const btn = document.getElementById('submitTradeBtn');
  const sym = document.getElementById('tradeSymbol').value || 'AAPL';
  const qty = document.getElementById('tradeQty').value || '50';
  btn.classList.add('loading');
  btn.textContent = 'Processing...';
  setTimeout(() => {
    document.getElementById('tradeModal').classList.remove('open');
    btn.classList.remove('loading');
    btn.innerHTML = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg> Place Order';
    PF.showToast('Order placed: ' + qty + ' ' + sym + ' · Confirmation #TRD' + Math.floor(Math.random()*100000), 'success');
  }, 1600);
};

/* ─── KEYBOARD SHORTCUTS ─── */
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') window.closeTradeModal();
  if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
    e.preventDefault();
    document.querySelector('.search-input')?.focus();
  }
  if ((e.metaKey || e.ctrlKey) && e.key === 'n') {
    e.preventDefault();
    window.openTradeModal();
  }
});

/* ─── INIT ─── */
document.addEventListener('DOMContentLoaded', function() {
  // UI components
  PF.buildTicker();
  PF.buildHoldingsTable();
  PF.buildActivityFeed();
  PF.buildPulseGrid();

  // Charts
  PF.rebuildAllCharts('1D', 'area');

  // Utilities
  PF.startClock();
  PF.startPnlJitter();
  PF.initAnimations();
  PF.initTheme();
  PF.initSidebar();
  PF.initChartControls();

  // Initial trade calc
  calcTradeTotal();

  // Simulate live ticker price jitter
  setInterval(() => {
    const items = document.querySelectorAll('.ticker-item');
    items.forEach(item => {
      const priceEl = item.querySelector('.ticker-price');
      const chgEl = item.querySelector('.ticker-chg');
      if (priceEl && Math.random() > 0.85) {
        const current = parseFloat(priceEl.textContent.replace(/,/g,''));
        if (!isNaN(current)) {
          const newPrice = current * (1 + (Math.random()-0.49)*0.001);
          const newChg = ((newPrice / current) - 1) * 100;
          priceEl.textContent = newPrice > 1000 ? newPrice.toLocaleString('en-US',{maximumFractionDigits:0}) : newPrice.toFixed(2);
          const pos = newChg >= 0;
          chgEl.textContent = (pos?'+':'') + newChg.toFixed(2) + '%';
          chgEl.className = 'ticker-chg ticker-chg--' + (pos?'up':'dn');
        }
      }
    });
  }, 3000);
});
