(() => {
  'use strict';

  const LERP = 0.1;
  const SCROLL_SCALE = 0.85;
  const TOUCH_SCALE = 1.2;

  // Category metadata (drives rail labels & order). Centre default = works.
  const CATS = {
    works: { label: 'WORK',  sub: '作品' },
    about: { label: 'ABOUT', sub: '關於我' },
    fun:   { label: 'FUN',   sub: '趣味' },
  };
  const ORDER = ['works', 'about', 'fun'];
  let centerCat = 'works';

  // ── Scroll state ──────────────────────────────────────────────────────
  let targetOffset = 0;
  let currentOffset = 0;
  let SHEET_H = 280;
  let PERIOD_SHEETS = 1;     // sheets in ONE copy of the active strip
  let aboutSnapOffsets = [0];
  let aboutMax = 0;
  let snapTimer = null;
  let touchStartY = 0;
  let isDragging = false;
  let dragLastY = 0;
  let hasDragged = false;
  let paused = false;        // pause rAF transform writes during a switch
  let animating = false;     // a category switch is in progress

  // ── DOM refs ──────────────────────────────────────────────────────────
  const scene = document.getElementById('tp-scene');
  const rail = document.getElementById('tp-rail');
  const rollSvg = document.getElementById('tp-roll-svg');
  const stripWrapper = document.getElementById('tp-strip-wrapper');
  const strip = document.getElementById('tp-strip');
  const flyLayer = document.getElementById('tp-fly-layer');
  const overlay = document.getElementById('tp-overlay');
  const win = document.getElementById('tp-win');
  const winClose = document.getElementById('tp-win-close');
  const winTitle = document.getElementById('tp-win-title');
  const winFrame = document.getElementById('tp-win-frame');
  const hint = document.getElementById('tp-hint');

  const ACCENTS = {
    about: '#B87058',
    works: '#4E857C',
    fun:   '#8F7E40',
  };

  const lerp = (a, b, t) => a + (b - a) * t;
  const wait = (ms) => new Promise((r) => setTimeout(r, ms));

  // ── Roll / mini graphics ──────────────────────────────────────────────
  // Capsule roll (no spindle — the spindle is a fixed separate layer). Same
  // viewBox as the big roll so flyers scale uniformly between mini ↔ centre.
  function rollSVG() {
    return (
      '<svg viewBox="0 0 520 280" xmlns="http://www.w3.org/2000/svg">' +
      '<rect x="44" y="18" width="380" height="240" rx="28" ry="120" fill="url(#tp-roll-grad)" stroke="#5A5A54" stroke-width="1.5"/>' +
      '<ellipse cx="72" cy="138" rx="28" ry="120" fill="url(#tp-face-grad)" stroke="#5A5A54" stroke-width="1.5"/>' +
      '<ellipse cx="72" cy="138" rx="21" ry="90" fill="none" stroke="#D5D0C4" stroke-width="1"/>' +
      '<ellipse cx="72" cy="138" rx="15" ry="65" fill="none" stroke="#DDD9CE" stroke-width="1"/>' +
      '<ellipse cx="72" cy="138" rx="10" ry="44" fill="#C4A87A" stroke="#5A5A54" stroke-width="1.5"/>' +
      '<ellipse cx="72" cy="138" rx="6" ry="27" fill="#B89468"/>' +
      '</svg>'
    );
  }

  function miniLabel(cat) {
    const m = CATS[cat];
    return (
      '<span class="tp-mini-label">' +
      '<span class="en">' + m.label + '</span>' +
      '<span class="zh">' + m.sub + '</span>' +
      '</span>'
    );
  }

  // ── Left rail ─────────────────────────────────────────────────────────
  // Renders a mini roll for every category that isn't the active centre.
  // dockLast (optional) forces a category to the bottom slot — used so the
  // just-departed centre roll docks at the bottom of the rail.
  function buildRail(dockLast) {
    rail.innerHTML = '';
    let cats = ORDER.filter((c) => c !== centerCat);
    if (dockLast) cats = cats.filter((c) => c !== dockLast).concat(dockLast);
    cats.forEach((cat) => {
      const mini = document.createElement('div');
      mini.className = 'tp-mini';
      mini.dataset.cat = cat;
      mini.setAttribute('role', 'button');
      mini.setAttribute('tabindex', '0');
      mini.setAttribute('aria-label', CATS[cat].label);
      mini.innerHTML = rollSVG() + miniLabel(cat);
      mini.addEventListener('click', () => switchCategory(cat));
      mini.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); switchCategory(cat); }
      });
      rail.appendChild(mini);
    });
  }

  // ── Centre strip ──────────────────────────────────────────────────────
  function getSheetHeight() {
    const s = strip.querySelector('.tp-sheet');
    return s ? s.offsetHeight : 280;
  }

  function isAboutMode() {
    return centerCat === 'about';
  }

  function clamp(value, min, max) {
    return Math.min(max, Math.max(min, value));
  }

  function getVisibleStripHeight() {
    const rect = stripWrapper.getBoundingClientRect();
    return Math.max(0, window.innerHeight - rect.top);
  }

  function measureAboutStrip() {
    if (!isAboutMode()) return;
    const sheets = Array.from(strip.querySelectorAll('.tp-sheet'));
    aboutSnapOffsets = sheets.length ? sheets.map((sheet) => sheet.offsetTop) : [0];
    aboutMax = Math.max(0, strip.offsetHeight - getVisibleStripHeight());
  }

  function measureAboutStripSoon() {
    requestAnimationFrame(measureAboutStrip);
  }

  function clampAboutOffset(value) {
    return clamp(value, 0, aboutMax);
  }

  function getLoopStartOffset() {
    return SHEET_H * PERIOD_SHEETS * 2;
  }

  // Build the active centre roll's paper from the matching <template>.
  // Looping strips are rendered 3×; about is finite and uses natural heights.
  function buildStrip(cat) {
    const tpl = document.getElementById('tpl-sheets-' + cat);
    const sheets = tpl ? tpl.content.querySelectorAll('.tp-sheet') : [];
    PERIOD_SHEETS = Math.max(1, sheets.length);
    let html = '';
    const copies = cat === 'about' ? 1 : 3;
    for (let i = 0; i < copies; i++) sheets.forEach((s) => { html += s.outerHTML; });
    strip.innerHTML = html;
    SHEET_H = getSheetHeight();
    if (cat === 'about') {
      measureAboutStrip();
      strip.querySelectorAll('img').forEach((img) => {
        if (!img.complete) img.addEventListener('load', measureAboutStripSoon, { once: true });
      });
    } else {
      attachSheetHandlers();
    }
    updatePaperClip();
  }

  function attachSheetHandlers() {
    strip.querySelectorAll('.tp-sheet-window').forEach((el) => {
      el.addEventListener('click', (e) => {
        if (hasDragged || animating) return;
        e.stopPropagation();
        openWindow(el.closest('.tp-sheet'));
      });
    });
  }

  // ── Scroll / drag / touch ─────────────────────────────────────────────
  scene.addEventListener('wheel', (e) => {
    e.preventDefault();
    if (animating || overlay.classList.contains('is-open')) return;
    targetOffset += e.deltaY * SCROLL_SCALE;
    hideHint();
    scheduleSnap();
  }, { passive: false });

  scene.addEventListener('mousedown', (e) => {
    if (animating || overlay.classList.contains('is-open')) return;
    if (e.target.closest('#tp-rail')) return;   // let rail handle its own clicks
    isDragging = true;
    hasDragged = false;
    dragLastY = e.clientY;
    clearTimeout(snapTimer);
    scene.style.cursor = 'grabbing';
    e.preventDefault();
  });

  window.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    const dy = e.clientY - dragLastY;
    if (Math.abs(dy) > 2) hasDragged = true;
    targetOffset -= dy;
    dragLastY = e.clientY;
    hideHint();
  });

  window.addEventListener('mouseup', () => {
    if (!isDragging) return;
    isDragging = false;
    scene.style.cursor = '';
    if (hasDragged) scheduleSnap();
    setTimeout(() => { hasDragged = false; }, 50);
  });

  scene.addEventListener('touchstart', (e) => {
    touchStartY = e.touches[0].clientY;
  }, { passive: true });

  scene.addEventListener('touchmove', (e) => {
    if (animating || overlay.classList.contains('is-open')) return;
    const dy = touchStartY - e.touches[0].clientY;
    targetOffset += dy * TOUCH_SCALE;
    touchStartY = e.touches[0].clientY;
    hideHint();
  }, { passive: true });

  scene.addEventListener('touchend', () => scheduleSnap(120));

  function scheduleSnap(delay = 220) {
    clearTimeout(snapTimer);
    snapTimer = setTimeout(snap, delay);
  }

  function snap() {
    if (animating) return;
    if (isAboutMode()) {
      const clampedTarget = clampAboutOffset(targetOffset);
      targetOffset = aboutSnapOffsets.reduce((nearest, offset) => {
        return Math.abs(offset - clampedTarget) < Math.abs(nearest - clampedTarget) ? offset : nearest;
      }, aboutSnapOffsets[0] || 0);
      targetOffset = clampAboutOffset(targetOffset);
      return;
    }
    targetOffset = Math.round(targetOffset / SHEET_H) * SHEET_H;
  }

  function hideHint() {
    if (hint) {
      hint.style.opacity = '0';
      hint.style.pointerEvents = 'none';
    }
  }

  function tick() {
    if (!paused) {
      if (isAboutMode()) {
        targetOffset = clampAboutOffset(targetOffset);
        currentOffset = clampAboutOffset(currentOffset);
      }

      currentOffset = lerp(currentOffset, targetOffset, LERP);
      strip.style.transform = `translateY(${-currentOffset}px)`;

      if (isAboutMode()) {
        currentOffset = clampAboutOffset(currentOffset);
      } else {
        const period = SHEET_H * PERIOD_SHEETS;
        if (targetOffset > period * 2) targetOffset = period * 2;
        if (currentOffset < period && targetOffset < period) {
          currentOffset += period;
          targetOffset += period;
        }
      }
    }
    requestAnimationFrame(tick);
  }

  // ── Category switch — pull-out / shrink / dock / extend ────────────────
  function flyRoll(fromRect, toRect, cat, duration) {
    const sceneRect = scene.getBoundingClientRect();
    const fly = document.createElement('div');
    fly.className = 'tp-flyer';
    fly.dataset.cat = cat;
    fly.style.width = fromRect.width + 'px';
    fly.style.height = fromRect.height + 'px';
    fly.innerHTML = rollSVG() + miniLabel(cat);
    flyLayer.appendChild(fly);

    const x0 = fromRect.left - sceneRect.left;
    const y0 = fromRect.top - sceneRect.top;
    fly.style.transform = `translate(${x0}px, ${y0}px)`;
    void fly.offsetWidth;   // commit start frame

    const x1 = toRect.left - sceneRect.left;
    const y1 = toRect.top - sceneRect.top;
    const s = toRect.width / fromRect.width;
    fly.style.transition = `transform ${duration}ms cubic-bezier(0.5, 0, 0.2, 1)`;
    fly.style.transform = `translate(${x1}px, ${y1}px) scale(${s})`;
    return fly;
  }

  async function switchCategory(next) {
    if (animating || next === centerCat) return;
    animating = true;
    paused = true;
    scene.classList.add('is-switching');
    hideHint();

    const prev = centerCat;
    const incomingMini = rail.querySelector(`.tp-mini[data-cat="${next}"]`);
    const incRect = incomingMini.getBoundingClientRect();
    const centerRect = rollSvg.getBoundingClientRect();

    // 1) Retract the current paper up into the roll.
    const rolledUp = currentOffset + window.innerHeight + 240;
    strip.classList.add('tp-anim');
    strip.style.transform = `translateY(${-rolledUp}px)`;
    await wait(300);

    // 2) Hide the real centre; rebuild the rail for the post-switch layout
    //    (centre = next; outgoing 'prev' docked to the bottom slot).
    rollSvg.classList.add('tp-fade');
    stripWrapper.classList.add('tp-fade');
    centerCat = next;
    buildRail(prev);
    const outMini = rail.querySelector(`.tp-mini[data-cat="${prev}"]`);
    const outRect = outMini.getBoundingClientRect();
    outMini.style.visibility = 'hidden';   // flyer stands in until it lands

    // 3) Fly: outgoing centre → rail (shrink+dock); incoming mini → centre (grow).
    const FLY = 540;
    const outFly = flyRoll(centerRect, outRect, prev, FLY);
    const inFly = flyRoll(incRect, centerRect, next, FLY);
    await wait(FLY);

    // 4) Land: drop flyers, reveal docked mini, build the new centre strip.
    outFly.remove();
    inFly.remove();
    outMini.style.visibility = '';
    buildStrip(next);

    currentOffset = targetOffset = next === 'about' ? 0 : getLoopStartOffset();
    // Start rolled-up, then unroll the new paper downward.
    strip.classList.remove('tp-anim');
    strip.style.transform = `translateY(${-(currentOffset + window.innerHeight + 240)}px)`;
    rollSvg.classList.remove('tp-fade');
    stripWrapper.classList.remove('tp-fade');
    void strip.offsetWidth;
    strip.classList.add('tp-anim');
    strip.style.transform = `translateY(${-currentOffset}px)`;
    await wait(460);
    strip.classList.remove('tp-anim');

    paused = false;
    animating = false;
    scene.classList.remove('is-switching');
  }

  // ── Expanded window overlay ───────────────────────────────────────────
  function openWindow(sheet) {
    if (!sheet || overlay.classList.contains('is-open')) return;

    const rect = sheet.getBoundingClientRect();
    const ox = ((rect.left + rect.width / 2) / window.innerWidth) * 100;
    const oy = ((rect.top + rect.height / 2) / window.innerHeight) * 100;
    win.style.transformOrigin = `${ox}% ${oy}%`;

    winFrame.src = '';
    winTitle.textContent = sheet.dataset.title || '';
    const cat = sheet.dataset.category;
    document.getElementById('tp-win-chrome').style.background = ACCENTS[cat] || '#4A4A52';

    win.style.transition = 'none';
    win.style.transform = 'scale(0.12)';
    overlay.classList.add('is-open');
    overlay.setAttribute('aria-hidden', 'false');

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        win.style.transition = 'transform 320ms cubic-bezier(0.34, 1.56, 0.64, 1)';
        win.style.transform = 'scale(1)';
      });
    });

    setTimeout(() => { winFrame.src = sheet.dataset.url || ''; }, 80);
  }

  function closeWindow() {
    win.style.transition = 'transform 200ms cubic-bezier(0.55, 0, 1, 0.45)';
    win.style.transform = 'scale(0.12)';
    overlay.classList.remove('is-open');
    overlay.setAttribute('aria-hidden', 'true');
    setTimeout(() => {
      winFrame.src = '';
      win.style.transition = 'none';
      win.style.transform = 'scale(0.12)';
    }, 210);
  }

  winClose.addEventListener('click', closeWindow);
  overlay.addEventListener('click', (e) => { if (e.target === overlay) closeWindow(); });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && overlay.classList.contains('is-open')) closeWindow();
  });

  // ── Paper clip-path — follow the roll body's curved top edge ───────────
  // (Geometry identical to the original; see notes in the SVG comment.)
  function updatePaperClip() {
    if (!rollSvg) return;
    const scale = rollSvg.getBoundingClientRect().width / 520;
    const rx = 28 * scale;
    const ry = 120 * scale;
    const faceEnd = rx;
    const centerY = ry;
    const flatEnd = 324 * scale;
    const rollEnd = 352 * scale;
    const INF = 99999;
    const p = [
      `M 0,0`,
      `A ${rx},${ry} 0 0 1 ${faceEnd},${centerY}`,
      `L ${faceEnd},${INF}`,
      `L ${rollEnd},${INF}`,
      `L ${rollEnd},${centerY}`,
      `A ${rx},${ry} 0 0 0 ${flatEnd},0`,
      `Z`,
    ].join(' ');
    stripWrapper.style.clipPath = `path('${p}')`;
  }

  // ── Init ──────────────────────────────────────────────────────────────
  function init() {
    buildRail();
    buildStrip(centerCat);

    targetOffset = getLoopStartOffset();
    currentOffset = getLoopStartOffset();
    updatePaperClip();

    window.addEventListener('resize', () => {
      updatePaperClip();
      if (isAboutMode()) {
        measureAboutStrip();
        targetOffset = clampAboutOffset(targetOffset);
        currentOffset = clampAboutOffset(currentOffset);
        return;
      }
      const oldH = SHEET_H;
      SHEET_H = getSheetHeight();
      if (oldH > 0 && SHEET_H !== oldH && !animating) {
        const ratio = SHEET_H / oldH;
        targetOffset *= ratio;
        currentOffset *= ratio;
      }
    });

    requestAnimationFrame(tick);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
