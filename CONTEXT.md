# Yuhan's Playground — 專案背景

## 概觀

曾郁涵（Yuhan Tseng）的個人作品集網站。她是一位來自台灣、目前定居芬蘭的互動設計師／新媒體藝術家。網站展示互動裝置、STEM 教育專案、AR 濾鏡，以及創意程式實驗。

**正式網址**：https://yuhantyh.gitlab.io/playground  
**Git 遠端**：GitLab（`yuhantyh/playground`）  
**擁有者 email**：tyhcindy@gmail.com

---

## 技術堆疊

- **框架**：Hugo（靜態網站產生器）
- **主題**：`roxo`（位於 `themes/roxo/`）— 一個設計公司的範本，已大量客製化
- **樣式**：SCSS（`assets/scss/`）— 專案層級的覆寫放在這裡，主題原始檔在 `themes/roxo/assets/scss/`
- **部署**：GitLab Pages（`.gitlab-ci.yml` 已設定完成）
- **表單**：Formspree（`https://formspree.io/myykjpje`）
- **設定檔**：`config.toml`

Hugo 覆寫優先順序：根目錄 `layouts/` 與 `assets/` 中的檔案會覆寫主題的對應檔案，無需修改主題資料夾。

---

## 網站結構

### 導覽（現況）
`Home → About → Works → Fun → AR Filter → Contact`

> 註：獨立的 `/about/` 頁已移除（首頁衛生紙的 ABOUT 即完整自我介紹）。選單與 footer 的
> `About` 連結改指首頁（`config.toml` 中 `url = ""`）。

### 內容清單

#### Works（`content/works/`）— 現況
| 檔案 | 標題 | 分類 |
|------|-------|----------|
| `artifact-generator.md` | ARTIFACT GENERATOR | 互動裝置 |
| `invisible-maze.md` | In-visible Maze | 實體玩具 |
| `modular-pcb.md` | Modular PCB for Haptic Control | PCB 設計 |
| `ai-robot-car.md` | AI 2 Robot Car | STEM 教育 |
| `wave-machine.md` | WAVE MACHINE（v1 + v2 合併） | 互動裝置 |

要新增的作品：**待定（使用者準備中）**

#### Fun（`content/fun/`）— 現況
| 檔案 | 標題 | 分類 |
|------|-------|----------|
| `a-hole.md` | A HOLE IN THE MIND | 投影對映 |
| `apple_cider.md` | After Only One Cider | 互動 |
| `caterpillar.md` | CATerpillar | 遊戲 |
| `fxxx-in-movie.md` | How many FxCK in a Movie | 互動網站 |
| `todo-app.md` | TODO-CAT | 互動網站 |
| `artificial-life.md` | ARTIFICIAL LIFE | 互動裝置 |
| `future-creature.md` | FUTURE CREATURE | 互動裝置 |

#### 已封存（`_archive/works/`）
- `coin-bank.md` — 已從網站移除（STEM 教育）
- `robotic-arm.md` — 已從網站移除（STEM 教育）
- `wave-machine-2.md` — 已合併至 `wave-machine.md`

#### AR Filter（`content/arfilter/`）
- beauty.md、dance_lion.md、donut.md、escape.md、fishing_game.md、hollow-start.md、loop_face.md
- mccafe.md — **目前停用**（`draft: true`，或透過 commit「disable McCafe filter」停用）

#### About（`layouts/partials/about-sheets.html`）
About 內容的**唯一來源**已改為這個 partial（首頁衛生紙的 ABOUT 由它渲染）；原
`content/about/_index.md` 與 `/about/` 頁已移除。內容為完整自我介紹＋經歷
（Intro / Profile / Education / Work），切成約 6 張畫面高的 sheet。

**新版自我介紹：待定（使用者準備中）**

#### Contact（`content/contact/_index.md`）
社群連結：Instagram（email 連結原本失效，已依 git 歷史替換）

---

## 資料檔（`data/`）
- `clients.yml`、`counter.yml`、`team.yml`、`testimonial.yml` — 主題遺留資料，未實際使用
- `contact.yml`、`service.yml`、`gallery.yml`、`feature.yml` — 部分使用

---

## 規劃中的改版 — 已決定

### 視覺風格
- 更乾淨、更明亮、極簡 — 但保留玩心與個性
- **參考素材：待定（使用者提供截圖或網址）**

### 版面
- 調整版面／結構（不只是換樣式，而是重新架構）
- **參考素材：待定（使用者提供截圖或網址）**

### 雙語支援（EN / 中文）
- 右上角導覽列的切換按鈕
- 全站雙語：Home、About、Works、Fun、AR Filter、Contact
- Hugo 內建多語系系統（設定檔中的 `[languages]`，內容樹分別位於 `content/en/` 與 `content/zh/`）
- 語言切換：簡單的 JS 切換器，或 Hugo 的 `RelLanguageURL`

### 內容變更
- ✅ 已封存：Automatic Coin Bank、Robotic Arm DIY Kit → `_archive/works/`
- ✅ 已合併：Wave Machine + Wave Machine v.2 → 單一 `wave-machine.md`
- ✅ 已移動：Artificial Life、Future Creature → Fun 區
- ⏳ 待新增：新作品（待定 — 使用者準備中）
- ⏳ 待更新：About 自我介紹（待定 — 使用者準備中）

---

## 重要檔案與其角色

```
config.toml                    — 網站設定、選單、參數
layouts/index.html             — 首頁樣板（捲筒互動：中央分類捲筒 + 左側軌道 + 固定灰色圓柱 + 三分類 template）
layouts/partials/tp-item-sheet.html — 單一作品紙張（首頁 works/fun 共用）
static/css/toilet-paper.css    — 首頁捲筒 UI 樣式
static/js/toilet-paper.js      — 首頁捲動、分類切換過場、視窗開關
layouts/partials/              — partial 樣板（覆寫主題）
themes/roxo/layouts/           — 主題基礎樣板（請勿直接編輯）
assets/scss/style.scss         — 主樣式表進入點
assets/scss/_variables.scss    — 要覆寫的色彩／字體變數
content/                       — 所有 Markdown 內容
data/                          — 動態區塊使用的 YAML 資料檔
static/                        — 靜態資源（圖片原樣提供）
```

---

## 慣例

- 使用的 Hugo shortcode：`{{< youtube >}}`、`{{< postimg >}}`
- 圖片儲存於 `static/images/works/[project-name]/`
- 每個 work/fun/arfilter 頁面都是帶有 YAML front matter 的 Markdown 檔：`title`、`date`、`type`、`image`、`category`、`draft`
- `draft: true` front matter 會讓頁面在建置時被隱藏
