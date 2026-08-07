// ============================================================
// Hệ thống giao dịch — main.js
// ============================================================
(function(){
  "use strict";

  /* ---------- Mobile nav ---------- */
  var burger = document.getElementById('burger');
  var navlinks = document.getElementById('navlinks');
  if (burger && navlinks){
    burger.addEventListener('click', function(){
      navlinks.classList.toggle('open');
    });
    navlinks.querySelectorAll('a').forEach(function(a){
      a.addEventListener('click', function(){ navlinks.classList.remove('open'); });
    });
  }

  /* ---------- Rules tabs (section 3) ---------- */
  var tabBtns = document.querySelectorAll('.tab-btn');
  tabBtns.forEach(function(btn){
    btn.addEventListener('click', function(){
      var tab = btn.getAttribute('data-tab');
      tabBtns.forEach(function(b){ b.classList.remove('active'); });
      btn.classList.add('active');
      document.querySelectorAll('.tab-panel').forEach(function(p){ p.classList.remove('active'); });
      var panel = document.getElementById('panel-' + tab);
      if (panel) panel.classList.add('active');
    });
  });

  /* ---------- Case study tabs (section 5) ---------- */
  var caseTabs = document.querySelectorAll('.case-tab');
  caseTabs.forEach(function(btn){
    btn.addEventListener('click', function(){
      var id = btn.getAttribute('data-case');
      caseTabs.forEach(function(b){ b.classList.remove('active'); });
      btn.classList.add('active');
      document.querySelectorAll('.case').forEach(function(c){ c.classList.remove('active'); });
      var panel = document.getElementById('case-' + id);
      if (panel) panel.classList.add('active');
    });
  });

  /* ---------- Checklist with localStorage ---------- */
  var STORAGE_KEY = 'trading-system-checklist-v1';

  function loadState(){
    try{
      var raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : {};
    }catch(e){ return {}; }
  }
  function saveState(state){
    try{ localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); }catch(e){}
  }

  function updateCount(group){
    var items = document.querySelectorAll('.checklist-items[data-group="'+group+'"] input[type="checkbox"]');
    var checked = 0;
    items.forEach(function(i){ if (i.checked) checked++; });
    var counter = document.querySelector('.count[data-count="'+group+'"]');
    if (counter) counter.textContent = checked + '/' + items.length;
  }

  function initChecklist(){
    var state = loadState();
    var groups = document.querySelectorAll('.checklist-items');
    groups.forEach(function(group){
      var groupName = group.getAttribute('data-group');
      var items = group.querySelectorAll('.citem');
      items.forEach(function(item, idx){
        var input = item.querySelector('input[type="checkbox"]');
        var key = groupName + '-' + idx;
        if (state[key]){
          input.checked = true;
          item.classList.add('checked');
        }
        input.addEventListener('change', function(){
          state[key] = input.checked;
          item.classList.toggle('checked', input.checked);
          saveState(state);
          updateCount(groupName);
        });
      });
      updateCount(groupName);
    });

    var resetBtn = document.getElementById('resetChecklist');
    if (resetBtn){
      resetBtn.addEventListener('click', function(){
        state = {};
        saveState(state);
        document.querySelectorAll('.citem').forEach(function(item){
          var input = item.querySelector('input[type="checkbox"]');
          input.checked = false;
          item.classList.remove('checked');
        });
        groups.forEach(function(group){
          updateCount(group.getAttribute('data-group'));
        });
      });
    }
  }
  initChecklist();

  /* ---------- Back to top ---------- */
  var topBtn = document.getElementById('topBtn');
  if (topBtn){
    window.addEventListener('scroll', function(){
      topBtn.classList.toggle('show', window.scrollY > 600);
    });
    topBtn.addEventListener('click', function(){
      window.scrollTo({ top:0, behavior:'smooth' });
    });
  }

  /* ---------- Hero mini candlestick chart (signature visual) ---------- */
  (function renderHeroChart(){
    var svg = document.getElementById('hero-svg');
    if (!svg) return;
    var NS = 'http://www.w3.org/2000/svg';
    var W = 420, H = 220;
    svg.setAttribute('viewBox', '0 0 ' + W + ' ' + H);

    // deterministic pseudo-random candle data resembling an uptrend with a pullback
    var seedVals = [40,42,39,44,47,45,49,52,50,54,58,55,60,64,61,66,70,68,72,76,74,78,82,79,84,88,85,90,94,91,96,100,97,101,105,102];
    var n = seedVals.length;
    var padX = 8, padY = 14;
    var chartW = W - padX*2, chartH = H - padY*2 - 26;
    var min = Math.min.apply(null, seedVals) - 4;
    var max = Math.max.apply(null, seedVals) + 4;
    var cw = chartW / n;

    function y(v){ return padY + (max - v) / (max - min) * chartH; }

    // gridlines
    for (var g=0; g<4; g++){
      var gy = padY + g * (chartH/3);
      var line = document.createElementNS(NS,'line');
      line.setAttribute('x1', padX); line.setAttribute('x2', W-padX);
      line.setAttribute('y1', gy); line.setAttribute('y2', gy);
      line.setAttribute('stroke', '#1E2E48'); line.setAttribute('stroke-width', '1');
      svg.appendChild(line);
    }

    var prevClose = seedVals[0];
    var buyIdx = 6, sellIdx = 29; // signal candle positions
    for (var i=0;i<n;i++){
      var open = prevClose;
      var close = seedVals[i];
      prevClose = close;
      var high = Math.max(open,close) + (Math.random()*2+0.5);
      var low  = Math.min(open,close) - (Math.random()*2+0.5);
      var cx = padX + i*cw + cw/2;
      var up = close >= open;
      var color = up ? '#00E676' : '#F23645';

      var wick = document.createElementNS(NS,'line');
      wick.setAttribute('x1', cx); wick.setAttribute('x2', cx);
      wick.setAttribute('y1', y(high)); wick.setAttribute('y2', y(low));
      wick.setAttribute('stroke', color); wick.setAttribute('stroke-width', '1');
      wick.setAttribute('opacity', '0.85');
      svg.appendChild(wick);

      var body = document.createElementNS(NS,'rect');
      var yTop = y(Math.max(open,close));
      var bodyH = Math.max(1.6, Math.abs(y(open)-y(close)));
      body.setAttribute('x', cx - cw*0.32);
      body.setAttribute('y', yTop);
      body.setAttribute('width', cw*0.64);
      body.setAttribute('height', bodyH);
      body.setAttribute('fill', color);
      body.setAttribute('rx', '1');
      svg.appendChild(body);

      if (i === buyIdx || i === sellIdx){
        var isBuy = i === buyIdx;
        var tagY = isBuy ? y(low) + 20 : y(high) - 20;
        var tag = document.createElementNS(NS,'text');
        tag.setAttribute('x', cx);
        tag.setAttribute('y', tagY);
        tag.setAttribute('text-anchor','middle');
        tag.setAttribute('font-family','JetBrains Mono, monospace');
        tag.setAttribute('font-weight','700');
        tag.setAttribute('font-size','11');
        tag.setAttribute('fill', isBuy ? '#00E676' : '#F23645');
        tag.textContent = isBuy ? 'B★' : 'S★';
        svg.appendChild(tag);
      }
    }

    // EMA lines (simple smoothed)
    function ema(vals, period){
      var k = 2/(period+1);
      var out = [];
      var prev = vals[0];
      for (var j=0;j<vals.length;j++){
        prev = j===0 ? vals[0] : (vals[j]*k + prev*(1-k));
        out.push(prev);
      }
      return out;
    }
    function drawLine(vals, color, width){
      var d = '';
      for (var j=0;j<vals.length;j++){
        var cx = padX + j*cw + cw/2;
        var cy = y(vals[j]);
        d += (j===0 ? 'M' : 'L') + cx.toFixed(1) + ',' + cy.toFixed(1) + ' ';
      }
      var path = document.createElementNS(NS,'path');
      path.setAttribute('d', d);
      path.setAttribute('fill','none');
      path.setAttribute('stroke', color);
      path.setAttribute('stroke-width', width);
      path.setAttribute('opacity','0.9');
      svg.appendChild(path);
    }
    drawLine(ema(seedVals, 8), '#FF9800', 1.6);
    drawLine(ema(seedVals, 18), '#2196F3', 2);
  })();

})();
