/* PulseFinance — UI Module */
window.PF = window.PF || {};

/* ─── TICKER ─── */
PF.buildTicker = function() {
  const container = document.getElementById('tickerContainer');
  if (!container) return;
  const all = [...PF.TICKER_DATA, ...PF.TICKER_DATA];
  const items = all.map(d => `
    <div class="ticker-item">
      <span class="ticker-sym">${d.sym}</span>
      <span class="ticker-price">${typeof d.price === 'number' && d.price > 1000 ? d.price.toLocaleString() : d.price.toFixed(2)}</span>
      <span class="ticker-chg ticker-chg--${d.pos?'up':'dn'}">${d.pos?'+':''}${d.chg.toFixed(2)}%</span>
    </div>
  `).join('');
  container.innerHTML = `<div class="ticker-track"><div class="ticker-inner">${items}</div></div>`;
};

/* ─── HOLDINGS TABLE ─── */
PF.buildHoldingsTable = function() {
  const tbody = document.getElementById('holdingsTbody');
  if (!tbody) return;
  const typeMap = {equity:'equity',crypto:'crypto',etf:'etf',bond:'bond'};
  tbody.innerHTML = PF.HOLDINGS.map(h => `
    <tr>
      <td>
        <div class="asset-cell">
          <div class="asset-logo" style="background:${h.color}20;color:${h.color}">${h.ticker.slice(0,2)}</div>
          <div>
            <div class="asset-name">${h.name}</div>
            <span class="asset-ticker">${h.ticker}</span>
          </div>
        </div>
      </td>
      <td><span class="asset-type-badge type--${h.type}">${h.type}</span></td>
      <td class="price-cell">$${h.price.toLocaleString('en-US',{minimumFractionDigits:2,maximumFractionDigits:2})}</td>
      <td class="change-cell">
        <span class="change-pill change-pill--${h.pos?'up':'dn'}">
          ${h.pos?'▲':'▼'} ${Math.abs(h.chg).toFixed(2)}%
        </span>
      </td>
      <td class="weight-cell">
        <div class="weight-bar">
          <div class="weight-track"><div class="weight-fill" style="width:${(h.weight/20)*100}%"></div></div>
          <span class="weight-pct">${h.weight}%</span>
        </div>
      </td>
      <td class="value-cell">$${h.value.toLocaleString()}</td>
      <td class="signal-cell"><span class="signal-badge signal--${h.signal}">${h.signal.toUpperCase()}</span></td>
    </tr>
  `).join('');
};

/* ─── ACTIVITY FEED ─── */
PF.buildActivityFeed = function(filter) {
  const list = document.getElementById('activityList');
  if (!list) return;
  const iconMap = {buy:'↑',sell:'↓',alert:'⚠',news:'◎',dividend:'$'};
  const filtered = filter && filter !== 'all'
    ? PF.ACTIVITY.filter(a => filter === 'trade' ? ['buy','sell'].includes(a.type) : a.type === 'alert')
    : PF.ACTIVITY;
  list.innerHTML = filtered.map(a => `
    <div class="activity-item">
      <div class="activity-icon activity-icon--${a.type}">${iconMap[a.type]||'•'}</div>
      <div class="activity-body">
        <div class="activity-title">${a.title}</div>
        <div class="activity-meta">${a.meta}</div>
      </div>
      ${a.amount ? `<div class="activity-amount activity-amount--${a.atype}">${a.amount}</div>` : ''}
    </div>
  `).join('');
};

/* ─── PULSE GRID ─── */
PF.buildPulseGrid = function() {
  const grid = document.getElementById('pulseGrid');
  if (!grid) return;
  grid.innerHTML = PF.PULSE_METRICS.map(m => `
    <div class="pulse-item">
      <div class="pulse-label">${m.label}</div>
      <div class="pulse-value">${m.value}</div>
      <div class="pulse-change pulse-change--${m.pos?'up':'dn'}">${m.pos?'▲':'▼'} ${m.change}</div>
    </div>
  `).join('');
};

/* ─── CLOCK ─── */
PF.startClock = function() {
  function tick() {
    const now = new Date();
    const t = now.toLocaleTimeString('en-US',{hour:'2-digit',minute:'2-digit',second:'2-digit',timeZone:'America/New_York'});
    const el = document.getElementById('topbarClock');
    if (el) el.textContent = t + ' EST';
    const mt = document.getElementById('marketTime');
    if (mt) mt.textContent = now.toLocaleTimeString('en-US',{hour:'numeric',minute:'2-digit',timeZone:'America/New_York'});
    const ls = document.getElementById('lastSync');
    if (ls) ls.textContent = t;
  }
  tick();
  setInterval(tick, 1000);
};

/* ─── LIVE P&L JITTER ─── */
PF.startPnlJitter = function() {
  let base = 14280;
  setInterval(() => {
    base += Math.round((Math.random()-0.48)*300);
    const el = document.getElementById('dailyPnl');
    if (el) {
      const pos = base >= 0;
      el.textContent = (pos?'+':'') + '$' + Math.abs(base).toLocaleString();
      el.style.color = pos ? 'var(--color-green)' : 'var(--color-red)';
    }
  }, 2800);
};

/* ─── TOAST ─── */
PF.showToast = function(msg, type, duration) {
  const container = document.getElementById('toastContainer');
  if (!container) return;
  const icons = {success:'✓', error:'✗', info:'ℹ'};
  const toast = document.createElement('div');
  toast.className = `toast toast--${type||'info'}`;
  toast.innerHTML = `<span class="toast-icon">${icons[type||'info']}</span><span>${msg}</span>`;
  container.appendChild(toast);
  requestAnimationFrame(() => { setTimeout(() => toast.classList.add('show'), 10); });
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 350);
  }, duration || 3500);
};

/* ─── ANIMATE ON SCROLL ─── */
PF.initAnimations = function() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const delay = parseInt(el.dataset.delay || 0);
        setTimeout(() => el.classList.add('animated'), delay);
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.1 });
  document.querySelectorAll('[data-animate]').forEach(el => observer.observe(el));
};

/* ─── THEME ─── */
PF.initTheme = function() {
  const btn = document.getElementById('themeToggle');
  if (!btn) return;
  btn.addEventListener('click', () => {
    const body = document.body;
    const isLight = body.classList.contains('theme-light');
    body.classList.toggle('theme-light', !isLight);
    body.classList.toggle('theme-dark', isLight);
    btn.innerHTML = isLight
      ? `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg> Light Mode`
      : `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg> Dark Mode`;
    setTimeout(() => PF.rebuildAllCharts(PF._currentRange, PF._currentChartType), 50);
  });
};

/* ─── SIDEBAR ─── */
PF.initSidebar = function() {
  const sidebar = document.getElementById('sidebar');
  const main = document.getElementById('mainContent');
  const toggle = document.getElementById('sidebarToggle');
  const mobileBtn = document.getElementById('mobileMenuBtn');
  if (toggle && sidebar && main) {
    toggle.addEventListener('click', () => {
      sidebar.classList.toggle('collapsed');
      main.classList.toggle('sidebar-collapsed');
    });
  }
  if (mobileBtn && sidebar) {
    mobileBtn.addEventListener('click', () => sidebar.classList.toggle('mobile-open'));
  }
};

/* ─── CHART CONTROLS ─── */
PF.initChartControls = function() {
  document.querySelectorAll('.time-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      document.querySelectorAll('.time-btn').forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      PF._currentRange = this.dataset.range;
      PF.buildPerfChart(PF._currentRange, PF._currentChartType || 'area');
    });
  });
  document.querySelectorAll('.chart-type-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      document.querySelectorAll('.chart-type-btn').forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      PF._currentChartType = this.dataset.type;
      PF.buildPerfChart(PF._currentRange || '1D', PF._currentChartType);
    });
  });
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      PF.buildActivityFeed(this.dataset.filter);
    });
  });
};
