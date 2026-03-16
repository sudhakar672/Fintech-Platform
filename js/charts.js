/* PulseFinance — Charts Module */
window.PF = window.PF || {};
PF.charts = {};

const CHART_DEFAULTS = {
  color: { grid: 'rgba(255,255,255,0.05)', text: '#4d5d7a', tooltip_bg: '#1a2540' },
  font: 'DM Mono, Space Mono, monospace',
  tooltip: function(label, isLight) {
    return {
      backgroundColor: isLight ? '#fff' : '#1a2540',
      borderColor: isLight ? 'rgba(0,0,0,0.1)' : 'rgba(255,255,255,0.08)',
      borderWidth: 1,
      titleColor: isLight ? '#718096' : '#4d5d7a',
      bodyColor: isLight ? '#1a202c' : '#e8eef8',
      padding: 10,
      titleFont: { family: 'DM Mono, monospace', size: 11 },
      bodyFont: { family: 'DM Mono, monospace', size: 12 },
    };
  }
};

function isLightTheme() { return document.body.classList.contains('theme-light'); }

/* ─── PERFORMANCE CHART ─── */
PF.buildPerfChart = function(range, type) {
  const canvas = document.getElementById('perfChart');
  if (!canvas) return;
  if (PF.charts.perf) { PF.charts.perf.destroy(); }

  const pts = PF.getDataPoints(range);
  const labels = PF.genLabels(range);
  const portfolio = PF.genTimeSeries(labels.length, 100, 1.8, 0.12);
  const benchmark = PF.genTimeSeries(labels.length, 100, 1.2, 0.08);
  const light = isLightTheme();
  const gridColor = light ? 'rgba(0,0,0,0.05)' : 'rgba(255,255,255,0.05)';
  const textColor = light ? '#718096' : '#4d5d7a';
  const isBar = type === 'bar';
  const isLine = !isBar;

  PF.charts.perf = new Chart(canvas, {
    type: isBar ? 'bar' : 'line',
    data: {
      labels,
      datasets: [
        {
          label: 'Portfolio',
          data: portfolio,
          borderColor: '#63b3ed',
          backgroundColor: isBar ? 'rgba(99,179,237,0.7)' : function(ctx) {
            const g = ctx.chart.ctx.createLinearGradient(0,0,0,240);
            g.addColorStop(0,'rgba(99,179,237,0.18)');
            g.addColorStop(1,'rgba(99,179,237,0.01)');
            return g;
          },
          borderWidth: isBar ? 0 : 2,
          fill: isLine,
          tension: 0.4,
          pointRadius: 0,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: '#63b3ed',
          barPercentage: 0.55,
        },
        {
          label: 'Benchmark',
          data: benchmark,
          borderColor: light ? '#a0aec0' : 'rgba(139,151,179,0.5)',
          backgroundColor: isBar ? 'rgba(160,174,192,0.4)' : 'transparent',
          borderWidth: isBar ? 0 : 1.5,
          borderDash: isBar ? [] : [5,4],
          fill: false,
          tension: 0.4,
          pointRadius: 0,
          pointHoverRadius: 4,
          barPercentage: 0.55,
        }
      ]
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      interaction: { mode: 'index', intersect: false },
      plugins: {
        legend: { display: false },
        tooltip: {
          ...CHART_DEFAULTS.tooltip('', light),
          callbacks: {
            title: (items) => items[0].label,
            label: (ctx) => ' ' + ctx.dataset.label + ': ' + ctx.parsed.y.toFixed(2) + ' (idx)',
          }
        }
      },
      scales: {
        x: { grid: { color: gridColor, drawBorder: false }, ticks: { color: textColor, font: { family: CHART_DEFAULTS.font, size: 11 }, maxRotation: 0, autoSkipPadding: 12 } },
        y: { grid: { color: gridColor, drawBorder: false }, ticks: { color: textColor, font: { family: CHART_DEFAULTS.font, size: 11 }, callback: v => v.toFixed(0) }, position: 'right' }
      }
    }
  });
};

/* ─── ALLOCATION DONUT ─── */
PF.buildAllocChart = function() {
  const canvas = document.getElementById('allocChart');
  if (!canvas) return;
  if (PF.charts.alloc) { PF.charts.alloc.destroy(); }
  const light = isLightTheme();
  const borderColor = light ? '#ffffff' : '#141d2e';

  PF.charts.alloc = new Chart(canvas, {
    type: 'doughnut',
    data: {
      labels: PF.ALLOCATION.map(a => a.name),
      datasets: [{
        data: PF.ALLOCATION.map(a => a.pct),
        backgroundColor: PF.ALLOCATION.map(a => a.color),
        borderColor: borderColor,
        borderWidth: 3,
        hoverOffset: 8,
      }]
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      cutout: '70%',
      plugins: {
        legend: { display: false },
        tooltip: {
          ...CHART_DEFAULTS.tooltip('', light),
          callbacks: { label: ctx => ' ' + ctx.label + ': ' + ctx.parsed + '%' }
        }
      },
      animation: { animateRotate: true, duration: 900, easing: 'easeOutQuart' }
    }
  });

  // Build breakdown
  const container = document.getElementById('allocBreakdown');
  if (container) {
    container.innerHTML = PF.ALLOCATION.map(a => `
      <div class="alloc-row">
        <span class="alloc-name">${a.name}</span>
        <div class="alloc-bar-track"><div class="alloc-bar-fill" style="width:0%;background:${a.color}" data-w="${a.pct}"></div></div>
        <span class="alloc-pct">${a.pct}%</span>
      </div>
    `).join('');
    setTimeout(() => {
      container.querySelectorAll('.alloc-bar-fill').forEach(el => { el.style.width = el.dataset.w + '%'; });
    }, 100);
  }
};

/* ─── RISK GAUGE ─── */
PF.buildRiskGauge = function() {
  const canvas = document.getElementById('riskGauge');
  if (!canvas) return;
  if (PF.charts.risk) { PF.charts.risk.destroy(); }
  const score = 34;
  const light = isLightTheme();

  PF.charts.risk = new Chart(canvas, {
    type: 'doughnut',
    data: {
      datasets: [{
        data: [score, 100 - score],
        backgroundColor: ['#48bb78', light ? '#e2e8f0' : 'rgba(255,255,255,0.06)'],
        borderWidth: 0,
        hoverOffset: 0,
      }]
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      cutout: '78%',
      rotation: -120, circumference: 240,
      plugins: { legend: { display: false }, tooltip: { enabled: false } },
      animation: { animateRotate: true, duration: 1000, easing: 'easeOutQuart' }
    }
  });

  const rm = document.getElementById('riskMetrics');
  if (rm) {
    rm.innerHTML = PF.RISKS.map(r => `
      <div class="risk-metric-row">
        <span class="risk-metric-name">${r.name}</span>
        <div class="risk-track"><div class="risk-fill" style="width:0%;background:${r.color}" data-w="${r.val}"></div></div>
        <span class="risk-val">${r.val}%</span>
      </div>
    `).join('');
    setTimeout(() => {
      rm.querySelectorAll('.risk-fill').forEach(el => { el.style.width = el.dataset.w + '%'; });
    }, 200);
  }
};

/* ─── SPARKLINES ─── */
PF.buildSparkline = function(id, data, color) {
  const canvas = document.getElementById(id);
  if (!canvas) return;
  if (PF.charts[id]) { PF.charts[id].destroy(); }
  PF.charts[id] = new Chart(canvas, {
    type: 'line',
    data: {
      labels: data.map((_,i) => i),
      datasets: [{
        data,
        borderColor: color,
        borderWidth: 1.5,
        fill: true,
        backgroundColor: function(ctx) {
          const g = ctx.chart.ctx.createLinearGradient(0,0,0,40);
          g.addColorStop(0, color.replace(')', ',0.2)').replace('rgb','rgba').replace('#','rgba(') || color + '33');
          g.addColorStop(1, 'transparent');
          return g;
        },
        pointRadius: 0,
        tension: 0.4,
      }]
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      plugins: { legend: { display: false }, tooltip: { enabled: false } },
      scales: { x: { display: false }, y: { display: false } },
      animation: { duration: 600 }
    }
  });
};

/* ─── VOLUME CHART ─── */
PF.buildVolumeChart = function() {
  const canvas = document.getElementById('volumeChart');
  if (!canvas) return;
  if (PF.charts.volume) { PF.charts.volume.destroy(); }
  const light = isLightTheme();
  const labels = PF.genLabels('1D');
  const buyVol = labels.map(() => Math.round(Math.random() * 80 + 20));
  const sellVol = labels.map(() => Math.round(Math.random() * 40 + 10));

  PF.charts.volume = new Chart(canvas, {
    type: 'bar',
    data: {
      labels,
      datasets: [
        { label: 'Buy', data: buyVol, backgroundColor: 'rgba(72,187,120,0.65)', borderWidth: 0, barPercentage: 0.8 },
        { label: 'Sell', data: sellVol, backgroundColor: 'rgba(252,129,129,0.65)', borderWidth: 0, barPercentage: 0.8 },
      ]
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      interaction: { mode: 'index', intersect: false },
      plugins: {
        legend: { display: false },
        tooltip: { ...CHART_DEFAULTS.tooltip('', light), callbacks: { label: ctx => ' ' + ctx.dataset.label + ': ' + ctx.parsed.y + 'K' } }
      },
      scales: {
        x: { stacked: true, grid: { display: false }, ticks: { color: light ? '#718096' : '#4d5d7a', font: { family: CHART_DEFAULTS.font, size: 10 }, maxTicksLimit: 8, maxRotation: 0 } },
        y: { stacked: true, grid: { color: light ? 'rgba(0,0,0,0.04)' : 'rgba(255,255,255,0.04)', drawBorder: false }, ticks: { color: light ? '#718096' : '#4d5d7a', font: { family: CHART_DEFAULTS.font, size: 10 } } }
      }
    }
  });
};

/* ─── REBUILD ALL (theme change) ─── */
PF.rebuildAllCharts = function(range, chartType) {
  PF.buildPerfChart(range || '1D', chartType || 'area');
  PF.buildAllocChart();
  PF.buildRiskGauge();
  PF.buildVolumeChart();
  ['sparkAUM','sparkPnl','sparkSharpe','sparkWin','sparkBeta'].forEach((id, i) => {
    const colors = ['#63b3ed','#48bb78','#f6ad55','#68d391','#b794f4'];
    const bases = [4700000, 14000, 2.3, 65, 0.85];
    const vols = [50000, 500, 0.05, 2, 0.02];
    PF.buildSparkline(id, PF.genTimeSeries(18, bases[i], vols[i], 0), colors[i]);
  });
};
