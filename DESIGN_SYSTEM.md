# Yuhan's Playground — 設計系統

> 跨 AI 協作的參考文件。當視覺決策變動時請保持更新。

---

## 概念

**首頁隱喻**：掛在浴室牆上的一捲衛生紙，固定在一根穿過紙筒中心的灰色圓柱上。捲筒懸在視窗頂端；捲動會「拉」出一張張紙往下。

中央大捲筒一次只呈現**一個分類**，預設為 WORK，且**每一張紙 = 一個作品**（hero image + 標題，樣式做成扁平的復古 OS 視窗）；FUN 同此模式（點擊紙張放大開啟該作品頁）。ABOUT 則**直接顯示完整自我介紹／經歷**（不再點擊開頁）：內容切成約 6 張畫面高的純紙張、以撕線分隔，捲動採「拉衛生紙」邏輯——新的一張從上方（捲筒）冒出、把舊的往下推，顯示順序 Intro→…→Work，拉到底時出現 `roll back` 按鈕回到開頭。左側軌道放「另外兩類」的小捲筒；點擊小捲筒會以過場動畫（大捲筒抽離→縮小→docked 到左下；被選的小捲筒放大→放入圓柱→伸出衛生紙）把該分類換到中央。灰色圓柱固定不動，捲筒從中抽離／插入。

**視覺 DNA**：低飽和、扁平、復古電腦／OS 美學 — 想像 1990 年代的 Mac 桌面或早期 Windows。低調的大地色調、等寬字 UI 標籤、硬邊位移陰影、極少裝飾。

---

## 配色

| Token             | Hex       | 角色 |
|-------------------|-----------|------|
| `--bg-wall`       | `#CAC5B8` | 浴室牆（灰褐、低調） |
| `--bg-paper`      | `#F5F1E8` | 衛生紙／視窗內容區 |
| `--chrome-bar`    | `#3A3A36` | 覆蓋視窗標題列 |
| `--chrome-border` | `#5A5A54` | 視窗邊框 |
| `--accent-about`  | `#B87058` | 赤陶色 — About Me |
| `--accent-works`  | `#4E857C` | 低調青綠 — Works |
| `--accent-fun`    | `#8F7E40` | 暖橄欖色 — Fun |
| `--text-primary`  | `#2A2822` | 近黑色（帶暖色底調） |
| `--text-secondary`| `#6A6660` | 低調暖灰 |
| `--text-inverse`  | `#F5F1E8` | 乳白色（用於深色背景） |

**避免**：飽和色、霓虹色、純黑 `#000`、純白 `#fff`、粉紅色或冷調灰。

---

## 字體排印

| 使用情境       | 字體                             | 字重 | 大小 |
|----------------|----------------------------------|--------|------|
| UI 標籤 / chrome | IBM Plex Mono（→ Courier New 備援） | 400–600 | 9–15px |
| 內文 / 圖說    | IBM Plex Sans（→ system-ui 備援）   | 400–600 | 10–16px |

- 在等寬字標籤上使用 `letter-spacing: 0.04–0.1em` 營造終端機感。
- 不使用裝飾性字體。維持系統原生感。

---

## 陰影與層次

- **扁平硬陰影**：`3px 3px 0px #2A2822` — 用於覆蓋視窗
- **紙條的投影**：`drop-shadow(20px 26px 0 rgba(80,60,40,0.14))`
- 不使用模糊厚重的 box shadow。維持扁平與位移（復古 OS 感）。

---

## 元件：紙張（`.tp-sheet`）

每張紙為 `--sheet-height: 520px`（桌面）/ `360px`（手機）。

```
┌──────────────────────────────────┐  ← .tp-perforation（虛線）
│ ● ○ ○  [  CATEGORY TITLE   ]    │  ← .tp-win-titlebar（accent 色）
├──────────────────────────────────┤
│                                  │
│         [folder icon]            │  ← .tp-win-body（乳白背景）
│         CATEGORY TITLE           │
│         short description        │
│                                  │
├──────────────────────────────────┤
│ click to open          ▪▪▪       │  ← .tp-win-statusbar
└──────────────────────────────────┘
```

- 標題列顏色 = 分類 accent 色
- 紅綠燈按鈕：關閉 `#B85252`、最小化 `#C8A040`、最大化 `#5A8852`
- 資料夾圖示：兩個 CSS 偽元素（::before = 標籤翻摺、::after = 主體）

---

## 元件：覆蓋視窗（`#tp-overlay` / `#tp-win`）

點擊紙張時出現的全尺寸視窗。從紙張位置展開（scale 0.12 → 1），使用 `cubic-bezier(0.34, 1.56, 0.64, 1)` 彈簧回彈。

- 標題列顏色由 JS 從 `ACCENTS` 物件設定（與紙張分類一致）
- 內容是載入分類頁面的 `<iframe>`
- 關閉方式：按鈕、點擊背景，或 Escape 鍵

---

## 元件：牆面（`#tp-wall`）

- 底色 `#CAC5B8`
- 22px 點狀格線：`radial-gradient(rgba(255,255,255,0.18) 1px, transparent 1px)`，於 `22px 22px`
- 透過 `::after` 偽元素加上輕微暈影

---

## 版面變數

```css
--strip-width:    min(37vw, 390px);   /* 紙條寬度 */
--sheet-height:   520px;              /* 每張紙的高度 */
--roll-svg-width: min(74vw, 760px);   /* SVG 捲筒總寬 */
--roll-face-x:    61% of roll width;  /* 置中用的水平偏移 */
--paper-start:    clamp(310px, 22vh, 350px);  /* 紙條頂端位置 */
```

手機斷點 `≤ 768px`：紙條加寬至 `74vw`，紙張縮小至 `360px`，捲筒 SVG 擴大至 `140vw`。

---

## 動畫原則

| 時機 | Easing | 時長 |
|--------|--------|----------|
| 紙張 hover | scale(0.98), ease | 150ms |
| 視窗開啟 | cubic-bezier(0.34, 1.56, 0.64, 1) 彈簧 | 320ms |
| 視窗關閉 | cubic-bezier(0.55, 0, 1, 0.45) ease-in | 200ms |
| 捲動 LERP | 每幀係數 0.1 | 持續 |

---

## 檔案

| 檔案 | 角色 |
|------|------|
| `layouts/index.html` | 首頁的 Hugo 樣板（含三分類 `<template>`、捲筒 SVG、固定灰色圓柱 `#tp-spindle-svg`、左側軌道 `#tp-rail`） |
| `layouts/partials/tp-item-sheet.html` | 單一作品紙張（works/fun 共用：hero image + 標題） |
| `static/css/toilet-paper.css` | 所有首頁樣式 |
| `static/js/toilet-paper.js` | 捲動、分類切換過場（`buildStrip`/`buildRail`/`switchCategory`）、視窗展開／關閉、紙張曲面裁切 |
| `static/css/style.css` | 全站樣式（由主題 SCSS 編譯而來） |
| `layouts/partials/head.html` | 覆寫主題 head（連結預編譯 CSS） |

---

## 不要做的事

- 不要在牆面加上磁磚／填縫圖案
- 不要在紙張上使用 Instagram／社群貼文版面
- 不要使用明亮飽和色或粉紅色
- 不要加上模糊厚重的陰影或毛玻璃效果
- 視窗 chrome 的圓角不要超過 4px
