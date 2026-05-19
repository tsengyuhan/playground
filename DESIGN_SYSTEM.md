# Yuhan's Playground — Design System

> Reference document for cross-AI collaboration. Keep this updated when visual decisions change.

---

## Concept

**Homepage metaphor**: A toilet paper roll mounted on a bathroom wall. The roll hangs at the top of the viewport; scrolling "pulls" paper sheets down. Each sheet is a navigation card (About / Works / Fun), styled as a flat retro OS window.

**Visual DNA**: Low-saturation, flat, retro computer/OS aesthetic — think 1990s Mac desktop or early Windows. Muted earthy tones, monospace UI labels, hard-offset shadows, minimal ornamentation.

---

## Color Palette

| Token             | Hex       | Role |
|-------------------|-----------|------|
| `--bg-wall`       | `#CAC5B8` | Bathroom wall (taupe, muted) |
| `--bg-paper`      | `#F5F1E8` | Toilet paper / window content area |
| `--chrome-bar`    | `#3A3A36` | Overlay window title bar |
| `--chrome-border` | `#5A5A54` | Window borders |
| `--accent-about`  | `#B87058` | Terracotta — About Me |
| `--accent-works`  | `#4E857C` | Muted teal — Works |
| `--accent-fun`    | `#8F7E40` | Warm olive — Fun |
| `--text-primary`  | `#2A2822` | Near-black (warm undertone) |
| `--text-secondary`| `#6A6660` | Muted warm gray |
| `--text-inverse`  | `#F5F1E8` | Cream (for dark backgrounds) |

**Avoid**: Saturated colors, neon, pure black `#000`, pure white `#fff`, pink or cool-toned grays.

---

## Typography

| Use case       | Font                             | Weight | Size |
|----------------|----------------------------------|--------|------|
| UI labels / chrome | IBM Plex Mono (→ Courier New fallback) | 400–600 | 9–15px |
| Body / captions    | IBM Plex Sans (→ system-ui fallback)   | 400–600 | 10–16px |

- Use `letter-spacing: 0.04–0.1em` on monospace labels for a terminal feel.
- No decorative fonts. Keep it system-native.

---

## Shadows & Depth

- **Flat hard shadow**: `3px 3px 0px #2A2822` — used on overlay window
- **Drop shadow on paper strip**: `drop-shadow(20px 26px 0 rgba(80,60,40,0.14))`
- No blur-heavy box shadows. Keep them flat and offset (retro OS feel).

---

## Component: Paper Sheet (`.tp-sheet`)

Each sheet is `--sheet-height: 520px` (desktop) / `360px` (mobile).

```
┌──────────────────────────────────┐  ← .tp-perforation (dashed line)
│ ● ○ ○  [  CATEGORY TITLE   ]    │  ← .tp-win-titlebar (accent color)
├──────────────────────────────────┤
│                                  │
│         [folder icon]            │  ← .tp-win-body (cream bg)
│         CATEGORY TITLE           │
│         short description        │
│                                  │
├──────────────────────────────────┤
│ click to open          ▪▪▪       │  ← .tp-win-statusbar
└──────────────────────────────────┘
```

- Title bar color = category accent color
- Traffic light buttons: close `#B85252`, min `#C8A040`, max `#5A8852`
- Folder icon: two CSS pseudo-elements (::before = tab flap, ::after = body)

---

## Component: Overlay Window (`#tp-overlay` / `#tp-win`)

Full-size window that appears when a sheet is clicked. Opens from the sheet's position (scale 0.12 → 1) with `cubic-bezier(0.34, 1.56, 0.64, 1)` spring bounce.

- Title bar color set by JS from `ACCENTS` object (matches sheet category)
- Content is an `<iframe>` loading the category page
- Close: button, backdrop click, or Escape key

---

## Component: Wall (`#tp-wall`)

- Base color `#CAC5B8`
- 22px dot grid: `radial-gradient(rgba(255,255,255,0.18) 1px, transparent 1px)` at `22px 22px`
- Subtle vignette via `::after` pseudo-element

---

## Layout Variables

```css
--strip-width:    min(37vw, 390px);   /* paper strip width */
--sheet-height:   520px;              /* height of each sheet */
--roll-svg-width: min(74vw, 760px);   /* SVG roll total width */
--roll-face-x:    61% of roll width;  /* horizontal offset for centering */
--paper-start:    clamp(310px, 22vh, 350px);  /* top of paper strip */
```

Mobile breakpoint `≤ 768px`: strip widens to `74vw`, sheet shrinks to `360px`, roll SVG expands to `140vw`.

---

## Animation Principles

| Moment | Easing | Duration |
|--------|--------|----------|
| Sheet hover | scale(0.98), ease | 150ms |
| Window open | cubic-bezier(0.34, 1.56, 0.64, 1) spring | 320ms |
| Window close | cubic-bezier(0.55, 0, 1, 0.45) ease-in | 200ms |
| Scroll LERP | factor 0.1 per frame | continuous |

---

## Files

| File | Role |
|------|------|
| `layouts/index.html` | Hugo template for homepage |
| `static/css/toilet-paper.css` | All homepage styles |
| `static/js/toilet-paper.js` | Scroll, rotation, window expand/close |
| `static/css/style.css` | Site-wide styles (compiled from theme SCSS) |
| `layouts/partials/head.html` | Overrides theme head (links precompiled CSS) |

---

## What NOT to do

- Do not add tile/grout patterns to the wall
- Do not use Instagram/social media post layout for sheets
- Do not use bright saturated colors or pink
- Do not add blur-heavy shadows or glassmorphism
- Do not use rounded corners > 4px on window chrome
