# 改版進度

最後更新：2026-06-10

## 狀態：Phase 1 + 首頁（捲筒互動 v2.7）已完成 — 等待視覺參考以進行完整改版

---

## 已確認的決策 ✅

### 內容變更
- [x] 從 Works 移除 `coin-bank.md` 與 `robotic-arm.md`
- [x] 將 `wave-machine.md` + `wave-machine-2.md` 合併為單一「Wave Machine」頁面
- [x] 將 `artificial-life.md` 與 `future-creature.md` 從 Works → Fun
- [ ] 要新增的作品：**等待使用者**
- [ ] 更新後的 About 自我介紹：**等待使用者**

### 技術方向
- [x] 繼續使用 Hugo（不更換框架）
- [x] 使用 Hugo 內建的多語系系統加入雙語支援（EN / 中文）
- [x] 語言切換：右上角導覽列按鈕，切換整個網站

### 視覺／版面方向
- [ ] 視覺風格參考：**等待使用者提供截圖或網址**
- [ ] 版面參考：**等待使用者提供截圖或網址**
- [x] 整體方向：更乾淨、更明亮、極簡，但保有玩心

---

## 實作計畫

### Phase 1：內容重整 ✅ 已完成
1. ~~刪除~~ 已封存 `coin-bank.md`、`robotic-arm.md` → `_archive/works/`
2. 合併 wave machine 頁面 → `content/works/wave-machine.md`（v1+v2 合併），封存 `wave-machine-2.md`
3. 將 `artificial-life.md` 與 `future-creature.md` 移至 `content/fun/`，更新 `type: fun`
4. *（新作品 — 等待使用者）*

### Phase 2：Hugo 多語系設定
1. 在 `config.toml` 加入 `[languages]` 設定
2. 將內容重整至 `content/en/` 與 `content/zh/` 目錄
3. 建立 `i18n/en.toml` 與 `i18n/zh.toml` 存放 UI 字串
4. 在導覽列（header partial）加入語言切換按鈕

### Phase 2.5：首頁改版（捲筒互動 v1）✅ 已完成
1. 全新的捲筒衛生紙互動首頁（`layouts/index.html`）
2. 捲動以拉開衛生紙條，每一張紙 = 一個導覽分類（About / Works / Fun）
3. 點擊一張紙在頁內視窗中開啟該分類
4. CSS：`static/css/toilet-paper.css`，JS：`static/js/toilet-paper.js`
5. 加入 `layouts/partials/head.html` 以載入字型
6. 更新捲筒紙條，使每一循環依序顯示 About、一張個別 Work 紙、再到 Fun；WORK 紙張現在使用專案主視覺圖片並套上印刷紙質處理
7. 修正捲筒曲面裁切問題：讓每張紙／視窗的背景對齊紙張邊緣，只將標題列／內容／狀態列的內容移入可見的安全範圍

### Phase 2.6：首頁改版（捲筒互動 v2 — 分類切換）✅ 已完成（2026-06-08）
1. **中央大捲筒只放單一分類**：每張衛生紙 = 一個作品（hero image + 標題）。預設中央 = WORK。
2. **左側軌道（`#tp-rail`）放另外兩類的小捲筒**：永遠顯示非當前分類的兩個（如中央 WORK 時，左側為 ABOUT + FUN）。小捲筒由 JS `buildRail()` 動態生成，外觀與大捲筒一致並印上分類標籤。
3. **點擊小捲筒切換中央內容**，過場動畫（JS `switchCategory()`）：
   - 中央紙條先往上捲收 → 大捲筒以 flyer 縮小、docked 到左側軌道最下面
   - 被點選的小捲筒放大飛入中央 → 新紙條往下伸展
   - 切換後「剛離開的分類」排到左側最下面（`buildRail(dockLast)`）
4. **三分類資料以 `<template>` 渲染**（`tpl-sheets-works / -fun / -about`），JS 取對應 template 複製 3× 進 `#tp-strip` 做無縫循環；works/fun 共用 `layouts/partials/tp-item-sheet.html`。
5. **ABOUT 呈現**：拆成多張紙、用撕線（perforation）分隔，但**無彩色標題色塊**（純紙張印照片 + 文字）；每張點擊放大開啟完整 about 頁。
6. **固定灰色圓柱（spindle）**：獨立於捲筒 SVG 的固定層 `#tp-spindle-svg`（z-index 介於捲筒與衛生紙之間），覆蓋在咖啡色核心前，呈現「固定圓柱穿過紙筒」效果；左端跑出 viewBox 被切平、右端收進核心內（目前 `rect x=-30 width=112` → 右端 x≈82 到核心右緣，倒角 `rx=3`）。切換時圓柱固定不動，捲筒從中抽離／插入。
7. 點擊中央紙張仍維持原本行為：放大用 overlay（iframe）開啟完整內容。
8. 關閉此檔的「儲存時格式化」（`.vscode/settings.json` 加 `editor.formatOnSave:false` + `[html]` 區塊），避免 Hugo 模板被 formatter 破壞。

### Phase 2.7：About 衛生紙完整內容 + 拉衛生紙捲動 ✅ 已完成（2026-06-10）
1. **單一來源**：About 內容改由 `layouts/partials/about-sheets.html` 統一管理（從舊 `about/list.html` 搬入），首頁 `tpl-sheets-about` 改 `{{ partial }}` 引入。
2. **直接顯示完整內容**：ABOUT 不再是摘要、不再點擊開 iframe overlay；內容切成約 6 張畫面高的 sheet（Intro / Profile / Education / Work①②③）。
3. **「拉衛生紙」捲動（`toilet-paper.js`）**：about strip **反向渲染**、起始只顯示最底的 Intro（紙還沒拉下）；三種輸入「**往下＝拉出**」，下一張從**上方**冒出、舊的往下推，顯示順序仍 Intro→…→Work③；snap 對齊各 sheet、有限捲動不迴圈。works/fun 維持等高 + 3× 迴圈 + overlay 不變。
4. **`roll back` 按鈕**（`#tp-rollback`）：拉到底淡入，點擊平滑回捲到 Intro。
5. **窄欄樣式**（`toilet-paper.css`）：`.tp-sheet--about` 用 `min-height:var(--sheet-height)`、日期改堆疊、`--clip-safe-left` 避開捲弧，重現 highlight/light_text/link 等視覺。
6. **移除獨立 `/about/` 頁**：刪 `content/about/_index.md` 與 `layouts/about/*`；選單與 footer 的 About 連結改指首頁。
7. 桌機（1440）／手機（390）以 headless Chrome + CDP 驗證：初始只見 Intro、下拉新 sheet 從上方出現、拉到底見 roll back 並可點擊回頂、works/fun 不受影響。

### Phase 3：視覺改版
*（受阻 — 等待視覺參考）*
1. 在 `_variables.scss` 定義新的配色與字體
2. 改寫／覆寫 SCSS 元件
3. 調整 `layouts/partials/` 中的版面樣板

### Phase 4：新內容
*（受阻 — 等待使用者）*
1. 新增作品頁面 + 圖片
2. 更新 About 自我介紹

### Phase 5：QA 與部署
1. 測試所有頁面的兩種語言
2. 檢查手機版的響應式表現
3. 推送至 GitLab，確認 Pages 部署

---

## 待使用者回覆的問題

1. **視覺風格參考** — 請提供你喜歡的網站截圖、網址或圖片
2. **版面參考** — 同上；指出你喜歡的特定區塊／元件
3. **新作品** — 每個新專案的標題、描述、圖片、分類
4. **更新後的 About 自我介紹** — 新的自我介紹文字（中文與／或英文）
5. **中文翻譯** — 你會提供現有頁面的中文內容，還是要先草擬第一版翻譯供你檢視？

---

## 已完成的工作

- 將 `coin-bank.md`、`robotic-arm.md` 封存至 `_archive/works/`（2026-05-18）
- 將 Wave Machine v1 + v2 合併為單一 `content/works/wave-machine.md`；封存 `wave-machine-2.md`（2026-05-19）
- 將 `artificial-life.md`、`future-creature.md` 移至 `content/fun/`，type 改為 `fun`（2026-05-19）
- 透過 `~/.zshrc` shell 函式設定 Codex exec 預設使用 `workspace-write` 沙箱（2026-05-19）
- 建置捲筒衛生紙互動首頁；CSS/JS 置於 `static/`，版面置於 `layouts/index.html`（2026-05-19）
- 加入 `layouts/partials/head.html` 以自訂 `<head>` 並載入 IBM Plex 字型（2026-05-19）
- 優化首頁衛生紙 UI：個別 WORK 紙張、加上快取破壞參數的 CSS/JS 連結、印刷質感／雙色調濾鏡、配合視窗高度的紙張高度、場景置中，以及為捲筒曲面左緣保留僅作用於內容的裁切安全邊距（2026-06-06）
- 首頁捲筒互動 v2（分類切換）：中央大捲筒只放單一分類（預設 WORK，每張紙=一個作品）；左側軌道 `#tp-rail` 放另外兩類小捲筒；點擊小捲筒以「抽離→縮小→docked 左下／放大進中央→伸紙」過場切換中央內容；三分類改用 `<template>` + JS `buildStrip`/`buildRail`/`switchCategory` 驅動；新增 `layouts/partials/tp-item-sheet.html`；ABOUT 拆成多張無色塊純紙張；新增獨立固定灰色圓柱層 `#tp-spindle-svg`（穿過紙筒、右端收進核心、外緣切平）；桌機／手機以 headless Chrome 截圖驗證並用 CDP 點擊驗證切換（rail/center 狀態正確）（2026-06-08）
- 關閉 `layouts/index.html` 的儲存時自動格式化（`.vscode/settings.json`），避免 Prettier 破壞 Hugo 模板（2026-06-08）
- About 衛生紙改版：內容統一到單一來源 `layouts/partials/about-sheets.html`（切成約 6 張畫面高 sheet）；ABOUT 改為直接顯示完整經歷、不再點擊開頁；捲動改「拉衛生紙」R1（strip 反向、起始只見 Intro、往下拉新 sheet 從上方冒出、拉到底出現 `#tp-rollback` 回捲鈕）；移除獨立 `/about/` 頁、選單與 footer About 連結改指首頁；works/fun 維持原行為；桌機／手機 headless Chrome 驗證（2026-06-10）
