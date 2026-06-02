(() => {
  const SHEETS_PER_CYCLE = 3;
  const LERP = 0.1;
  const SCROLL_SCALE = 0.85;
  const TOUCH_SCALE = 1.2;

  function getSheetHeight() {
    const s = document.querySelector('.tp-sheet');
    return s ? s.offsetHeight : 280;
  }

  let targetOffset = 0;
  let currentOffset = 0;
  let SHEET_H = 280;
  let snapTimer = null;
  let touchStartY = 0;
  let expandedSource = null;
  let isDragging = false;
  let dragLastY = 0;
  let hasDragged = false;

  const scene = document.getElementById('tp-scene');
  const strip = document.getElementById('tp-strip');
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

  function lerp(a, b, t) {
    return a + (b - a) * t;
  }

  // Scroll DOWN = pull paper = offset increases = strip moves up, revealing more paper
  scene.addEventListener('wheel', (e) => {
    e.preventDefault();
    if (overlay.classList.contains('is-open')) return;
    targetOffset += e.deltaY * SCROLL_SCALE;
    hideHint();
    scheduleSnap();
  }, { passive: false });

  // Mouse drag — paper follows cursor
  scene.addEventListener('mousedown', (e) => {
    if (overlay.classList.contains('is-open')) return;
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

  // Swipe down (finger moves down, dy negative) = pull = decrease offset
  scene.addEventListener('touchmove', (e) => {
    if (overlay.classList.contains('is-open')) return;
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
    const nearest = Math.round(targetOffset / SHEET_H) * SHEET_H;
    targetOffset = nearest;
  }

  function hideHint() {
    if (hint) {
      hint.style.opacity = '0';
      hint.style.pointerEvents = 'none';
    }
  }

  function tick() {
    currentOffset = lerp(currentOffset, targetOffset, LERP);

    strip.style.transform = `translateY(${-currentOffset}px)`;

    const cycleHeight = SHEET_H * SHEETS_PER_CYCLE;

    // Clamp so user can't push paper back above the roll
    if (targetOffset > cycleHeight * 2) targetOffset = cycleHeight * 2;

    // When offset drops into the first cycle, jump up by one cycle seamlessly
    if (currentOffset < cycleHeight && targetOffset < cycleHeight) {
      currentOffset += cycleHeight;
      targetOffset += cycleHeight;
    }

    requestAnimationFrame(tick);
  }

  function openWindow(sheet) {
    if (overlay.classList.contains('is-open')) return;
    expandedSource = sheet;

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

    setTimeout(() => {
      winFrame.src = sheet.dataset.url || '';
    }, 80);
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

  document.querySelectorAll('.tp-sheet-window').forEach((el) => {
    el.addEventListener('click', (e) => {
      if (hasDragged) return;
      e.stopPropagation();
      openWindow(el.closest('.tp-sheet'));
    });
  });

  winClose.addEventListener('click', closeWindow);

  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeWindow();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && overlay.classList.contains('is-open')) closeWindow();
  });

  // Clip the strip-wrapper so both curved ends of the roll body define the paper edges.
  //
  // Wrapper origin = SVG (72, 18) — the face centre-top, so the wrapper extends
  // left enough to include the face's right arc.
  //
  // SVG geometry (rx=28, ry=120, face cx=72 cy=138, roll body x=44..424 y=18..258):
  //   face right arc  : (72,18) → (100,138)  [SVG]  =  (0,0)→(28s,120s) in wrapper
  //   flat top        : x=72..396 at y=18     [SVG]  =  x=0..324s at y=0
  //   roll right arc  : (396,18) → (424,138)  [SVG]  =  (324s,0)→(352s,120s) in wrapper
  //
  // Clip path (clockwise winding so interior = visible area):
  //   M 0,0                                ← face centre-top
  //   A rx,ry 0 0 1 faceEnd,centerY        ← face right arc  (CW, sweep=1)
  //   L faceEnd,INF                        ← down left paper edge
  //   L rollEnd,INF                        ← across bottom
  //   L rollEnd,centerY                    ← up to roll right equator
  //   A rx,ry 0 0 0 flatEnd,0              ← roll right arc (CCW, sweep=0)
  //   Z                                    ← straight back across flat top to (0,0)
  function updatePaperClip() {
    const svgEl = document.getElementById('tp-roll-svg');
    if (!svgEl) return;
    const scale   = svgEl.getBoundingClientRect().width / 520;
    const rx      = 28  * scale;
    const ry      = 120 * scale;
    const faceEnd = rx;          // (100-72)*scale  — face rightmost point
    const centerY = ry;          // (138-18)*scale  — roll equator in wrapper y
    const flatEnd = 324 * scale; // (396-72)*scale  — flat top ends here
    const rollEnd = 352 * scale; // (424-72)*scale  — roll rightmost point
    const INF     = 99999;
    const p = [
      `M 0,0`,
      `A ${rx},${ry} 0 0 1 ${faceEnd},${centerY}`,
      `L ${faceEnd},${INF}`,
      `L ${rollEnd},${INF}`,
      `L ${rollEnd},${centerY}`,
      `A ${rx},${ry} 0 0 0 ${flatEnd},0`,
      `Z`,
    ].join(' ');
    document.getElementById('tp-strip-wrapper').style.clipPath = `path('${p}')`;
  }

  function init() {
    SHEET_H = getSheetHeight();
    // Start at 2 cycles deep so pulling down reveals content from above seamlessly
    const cycleHeight = SHEET_H * SHEETS_PER_CYCLE;
    targetOffset = cycleHeight * 2;
    currentOffset = cycleHeight * 2;
    updatePaperClip();
    window.addEventListener('resize', updatePaperClip);
    requestAnimationFrame(tick);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
