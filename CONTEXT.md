# Yuhan's Playground — Project Context

## Overview

Personal portfolio website for Yuhan Tseng (曾郁涵), an interaction designer / new media artist from Taiwan, currently based in Finland. The site showcases interactive installations, STEM education projects, AR filters, and creative coding experiments.

**Live URL**: https://yuhantyh.gitlab.io/playground  
**Git remote**: GitLab (`yuhantyh/playground`)  
**Owner email**: tyhcindy@gmail.com

---

## Tech Stack

- **Framework**: Hugo (static site generator)
- **Theme**: `roxo` (located at `themes/roxo/`) — a design-agency template, heavily customized
- **Styling**: SCSS (`assets/scss/`) — project-level overrides sit here, theme originals in `themes/roxo/assets/scss/`
- **Deployment**: GitLab Pages (`.gitlab-ci.yml` already configured)
- **Forms**: Formspree (`https://formspree.io/myykjpje`)
- **Config**: `config.toml`

Hugo override priority: files in root `layouts/` and `assets/` override theme equivalents without modifying the theme folder.

---

## Site Structure

### Navigation (current)
`Home → About → Works → Fun → AR Filter → Contact`

### Content Inventory

#### Works (`content/works/`) — current state
| File | Title | Category |
|------|-------|----------|
| `artifact-generator.md` | ARTIFACT GENERATOR | Interactive installation |
| `invisible-maze.md` | In-visible Maze | Tangible toy |
| `modular-pcb.md` | Modular PCB for Haptic Control | PCB design |
| `ai-robot-car.md` | AI 2 Robot Car | STEM education |
| `wave-machine.md` | WAVE MACHINE (v1 + v2 merged) | Interactive installation |

New works to be added: **TBD (user is preparing)**

#### Fun (`content/fun/`) — current state
| File | Title | Category |
|------|-------|----------|
| `a-hole.md` | A HOLE IN THE MIND | Projection mapping |
| `apple_cider.md` | After Only One Cider | Interactive |
| `caterpillar.md` | CATerpillar | Game |
| `fxxx-in-movie.md` | How many FxCK in a Movie | Interactive website |
| `todo-app.md` | TODO-CAT | Interactive website |
| `artificial-life.md` | ARTIFICIAL LIFE | Interactive installation |
| `future-creature.md` | FUTURE CREATURE | Interactive installation |

#### Archived (`_archive/works/`)
- `coin-bank.md` — removed from site (STEM education)
- `robotic-arm.md` — removed from site (STEM education)
- `wave-machine-2.md` — merged into `wave-machine.md`

#### AR Filter (`content/arfilter/`)
- beauty.md, dance_lion.md, donut.md, escape.md, fishing_game.md, hollow-start.md, loop_face.md
- mccafe.md — **currently disabled** (`draft: true` or disabled via commit "disable McCafe filter")

#### About (`content/about/_index.md`)
Current bio: "Hi 🐾 I am Yuhan. I am from Taiwan 🇹🇼 and studying in Finland 🇫🇮 now. With the background in New Media Design and Technology Education, I am passionate about interaction design and interactive installations..."

**New bio: TBD (user is preparing)**

#### Contact (`content/contact/_index.md`)
Social link: Instagram (email was broken, replaced per git history)

---

## Data Files (`data/`)
- `clients.yml`, `counter.yml`, `team.yml`, `testimonial.yml` — legacy theme data, not actively used
- `contact.yml`, `service.yml`, `gallery.yml`, `feature.yml` — partially used

---

## Planned Redesign — Decided

### Visual Style
- Cleaner, brighter, minimal — but retains playfulness/personality
- **Reference materials: TBD (user to provide screenshots or URLs)**

### Layout
- Adjusted layout/structure (not just restyled, but restructured)
- **Reference materials: TBD (user to provide screenshots or URLs)**

### Bilingual Support (EN / 中文)
- Toggle button in top-right navbar
- Full site bilingual: Home, About, Works, Fun, AR Filter, Contact
- Hugo's built-in multilingual system (`[languages]` in config, separate content trees under `content/en/` and `content/zh/`)
- Language toggle: simple JS switcher or Hugo's `RelLanguageURL`

### Content Changes
- ✅ Archived: Automatic Coin Bank, Robotic Arm DIY Kit → `_archive/works/`
- ✅ Merged: Wave Machine + Wave Machine v.2 → single `wave-machine.md`
- ✅ Moved: Artificial Life, Future Creature → Fun section
- ⏳ Add: new works (TBD — user preparing)
- ⏳ Update: About bio (TBD — user preparing)

---

## Key Files & Their Roles

```
config.toml                    — site config, menus, params
layouts/index.html             — home page template (overrides theme)
layouts/partials/              — partial templates (override theme)
themes/roxo/layouts/           — theme base templates (don't edit directly)
assets/scss/style.scss         — main stylesheet entry point
assets/scss/_variables.scss    — color/font variables to override
content/                       — all Markdown content
data/                          — YAML data files for dynamic sections
static/                        — static assets (images served as-is)
```

---

## Conventions

- Hugo shortcodes used: `{{< youtube >}}`, `{{< postimg >}}`
- Images stored in `static/images/works/[project-name]/`
- Each work/fun/arfilter page is a Markdown file with YAML front matter: `title`, `date`, `type`, `image`, `category`, `draft`
- The `draft: true` front matter hides a page from the build
