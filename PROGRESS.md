# Redesign Progress

Last updated: 2026-06-06

## Status: Phase 1 + Homepage done — Waiting on visual reference for full redesign

---

## Decisions Confirmed ✅

### Content Changes
- [x] Remove `coin-bank.md` and `robotic-arm.md` from Works
- [x] Merge `wave-machine.md` + `wave-machine-2.md` into one combined "Wave Machine" page
- [x] Move `artificial-life.md` and `future-creature.md` from Works → Fun
- [ ] New works to add: **waiting on user**
- [ ] Updated About bio: **waiting on user**

### Technical Direction
- [x] Continue using Hugo (not switching frameworks)
- [x] Add bilingual support (EN / 中文) using Hugo's built-in multilingual system
- [x] Language toggle: button in top-right navbar, switches entire site

### Visual/Layout Direction
- [ ] Visual style reference: **waiting on user to provide screenshots or URLs**
- [ ] Layout reference: **waiting on user to provide screenshots or URLs**
- [x] General direction: cleaner, brighter, minimal, but playful

---

## Implementation Plan

### Phase 1: Content restructuring ✅ Done
1. ~~Delete~~ Archived `coin-bank.md`, `robotic-arm.md` → `_archive/works/`
2. Merged wave machine pages → `content/works/wave-machine.md` (v1+v2 combined), archived `wave-machine-2.md`
3. Moved `artificial-life.md` and `future-creature.md` to `content/fun/`, updated `type: fun`
4. *(new works — waiting on user)*

### Phase 2: Hugo multilingual setup
1. Add `[languages]` config to `config.toml`
2. Reorganize content into `content/en/` and `content/zh/` directories
3. Create `i18n/en.toml` and `i18n/zh.toml` for UI strings
4. Add language toggle button to navbar (header partial)

### Phase 2.5: Homepage redesign ✅ Done
1. New toilet-paper-scroll interactive homepage (`layouts/index.html`)
2. Scroll to unroll toilet paper strip, each sheet = a nav category (About / Works / Fun)
3. Click a sheet to open category in an in-page window
4. CSS: `static/css/toilet-paper.css`, JS: `static/js/toilet-paper.js`
5. Added `layouts/partials/head.html` to load fonts
6. Updated the roll strip so each cycle shows About, one individual Work sheet, then Fun; WORK sheets now use project hero images with a printed-paper treatment
7. Fixed the curved roll clip issue by keeping each sheet/window background aligned to the paper edge while shifting only titlebar/body/statusbar contents into the visible safe area

### Phase 3: Visual redesign
*(Blocked — waiting on visual reference)*
1. Define new color palette and typography in `_variables.scss`
2. Rewrite/override SCSS components
3. Adjust layout templates in `layouts/partials/`

### Phase 4: New content
*(Blocked — waiting on user)*
1. Add new works pages + images
2. Update About bio

### Phase 5: QA & deploy
1. Test all pages in both languages
2. Check mobile responsiveness
3. Push to GitLab, verify Pages deployment

---

## Open Questions for User

1. **Visual style reference** — please provide screenshots, URLs, or images of sites whose style you like
2. **Layout reference** — same as above; point out specific sections/components you like
3. **New works** — title, description, images, category for each new project
4. **Updated About bio** — new self-introduction text (in Chinese and/or English)
5. **Chinese translation** — will you provide Chinese text for existing pages, or should a first-pass translation be drafted for your review?

---

## Completed Tasks

- Archived `coin-bank.md`, `robotic-arm.md` to `_archive/works/` (2026-05-18)
- Merged Wave Machine v1 + v2 into single `content/works/wave-machine.md`; archived `wave-machine-2.md` (2026-05-19)
- Moved `artificial-life.md`, `future-creature.md` to `content/fun/`, changed type to `fun` (2026-05-19)
- Configured Codex exec to use `workspace-write` sandbox by default via `~/.zshrc` shell function (2026-05-19)
- Built toilet-paper-scroll interactive homepage; CSS/JS in `static/`, layout in `layouts/index.html` (2026-05-19)
- Added `layouts/partials/head.html` for custom `<head>` with IBM Plex font loading (2026-05-19)
- Refined homepage toilet-paper UI: individual WORK sheets, cache-busted CSS/JS links, print texture/duotone filters, viewport-fit sheet height, scene centering, and content-only clip-safe left padding for curved roll edges (2026-06-06)
