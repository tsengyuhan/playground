# 重構：About 衛生紙改為單一來源的完整內容

## 目標

首頁衛生紙捲的 ABOUT 分類，原本是 3 張「摘要」紙，需點擊才用 iframe overlay 開啟完整
`/about/` 頁。改為：

1. 衛生紙直接顯示**完整經歷內容**，不再是摘要、不再 click-to-open。
2. 每個區段 = 一張 sheet（用 `.tp-perforation` 撕線分隔）。
3. About 內容只有**單一來源檔**，方便日後快速調整。
4. About 改**有限捲動**（捲到底就停），且各 sheet **不等高**。
5. works / fun 行為與外觀完全不變（等高 + 3× 無限迴圈 + iframe overlay）。

## 主要改動

### 單一來源
- 新增 `layouts/partials/about-sheets.html`：About 內容唯一來源。內容由舊
  `layouts/about/list.html` 搬入，拆成 **Intro / Profile / Education / Work** 四張
  `.tp-sheet.tp-sheet--about[data-category="about"]`，每張含 `.tp-perforation` +
  `.tp-about-section`。所有連結、巢狀清單、`highlight`、`light_text`、日期均保留。
- `layouts/index.html`：`<template id="tpl-sheets-about">` 內容改為
  `{{ partial "about-sheets.html" . }}`（template id 維持不變，JS 仍靠它取得）。
  移除已無用的 `$about := .Site.GetPage "/about"` 變數。

### 捲動引擎（`static/js/toilet-paper.js`）
- 依分類分流：`about` = 有限 + 不等高；`works`/`fun` = 迴圈 + 等高（維持原狀）。
- `about` 只渲染 1 份 sheet（不 3× 複製）；量測各 sheet 的 `offsetTop` 作為 snap 點，
  以 `aboutMax` 將位移夾在可視範圍內，`tick()` 不做無限 wrap。
- 切到 `about` 起始位移為 0；切回 `works`/`fun` 維持原本 `period * 2`。
- 圖片載入後重新量測，resize 時重算 about 的 snap 與 max。
- iframe overlay 基礎建設保留給 works/fun，about 永不觸發。

### 窄欄樣式（`static/css/toilet-paper.css`）
- `.tp-sheet--about { height: auto; }` 讓 about 依內容變高。
- `.tp-about-section` 一套窄欄樣式：單欄、日期由 `float:right` 改為堆疊、
  `padding-left` 用 `calc(var(--clip-safe-left) + …)` 避開捲弧；重現
  `highlight`/`light_text`/`link`/`title`/`sub-title` 視覺；移除舊摘要樣式。

### 移除獨立 /about/ 頁
- 完整頁面已不再需要（首頁衛生紙即 About）。刪除 `content/about/_index.md` 與
  `layouts/about/list.html`（及舊備份 `list_ori.html`），`/about/` 不再產生。
- `config.toml`：選單 `About` 與 footer `About Company` 連結改指首頁（`url = ""`），
  避免殘留 404 連結。

## 驗證

- `hugo` 乾淨 build 成功、零錯誤；`/about/` 已不產生；首頁仍含完整 about 內容；
  全站無殘留 `/about/` 連結。
- 桌面（1440）與手機（390）截圖：about 四區段完整可讀、未被捲弧裁切、可捲到底停住；
  works/fun 外觀與行為不受影響。
