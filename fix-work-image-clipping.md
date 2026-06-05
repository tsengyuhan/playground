# Fix: Toilet paper sheet content clipped by the curved roll edge

## Problem

On the homepage toilet-paper UI, content near the left side of each sheet can be
cut off by the curved roll edge. The issue was first visible on WORK project
images, then also appeared on titlebar controls/text and statusbar text.

## Root Cause

`#tp-strip-wrapper` is clipped by `updatePaperClip()` in
`static/js/toilet-paper.js`. The clip path intentionally hides the left curved
roll-face zone so the paper looks like it emerges from the roll.

The hidden zone is proportional to the strip width:

- clip boundary: `faceEnd = 28 * scale`
- wrapper width: `352 * scale`
- hidden fraction: `28 / 352 = 7.95%`

Any visible content that starts before this boundary can be clipped.

## Final Fix

**File:** `static/css/toilet-paper.css`

Add a shared safe-left variable:

```css
--clip-safe-left: calc(var(--strip-width) * 0.09);
```

Do **not** move `.tp-sheet-window` itself. The sheet/window backgrounds must stay
aligned with the paper edge so the titlebar color strip and paper body continue
to be clipped naturally by the curved roll.

Instead, apply the safe-left offset only to internal content padding:

- `.tp-win-titlebar`
- `.tp-win-body`
- `.tp-win-body--work`
- `.tp-win-statusbar`

This keeps the colored bars flush with the paper edge while moving controls,
labels, folder icons, project images, descriptions, and status text into the
fully visible area.

## Verification

Checked the homepage at `http://localhost:1413/playground/` with a desktop-size
Chrome headless screenshot. The titlebar controls and WORK titlebar content are
visible, and the background bars remain aligned to the left paper edge.
