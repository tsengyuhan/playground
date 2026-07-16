# 修正：捲筒衛生紙紙張內容被曲面捲邊裁切

## 問題

在首頁的捲筒衛生紙 UI 上，每張紙左側附近的內容可能被曲面捲邊切掉。此問題最早出現在 WORK 專案圖片上，後來也出現在標題列的控制項／文字以及狀態列文字上。

## 根本原因

`#tp-strip-wrapper` 在 `static/js/toilet-paper.js` 的 `updatePaperClip()` 中被裁切。clip path 刻意隱藏左側曲面捲邊區域，讓紙張看起來像是從捲筒中拉出。

被隱藏的區域與紙條寬度成比例：

- 裁切邊界：`faceEnd = 28 * scale`
- wrapper 寬度：`352 * scale`
- 隱藏比例：`28 / 352 = 7.95%`

任何起始位置在此邊界之前的可見內容都可能被裁切。

## 最終修正

**檔案：** `static/css/toilet-paper.css`

加入一個共用的安全左側變數：

```css
--clip-safe-left: calc(var(--strip-width) * 0.09);
```

**不要**移動 `.tp-sheet-window` 本身。紙張／視窗的背景必須與紙張邊緣對齊，標題列的色帶與紙張本體才能繼續被曲面捲邊自然裁切。

改為僅將安全左側偏移套用到內部內容的 padding：

- `.tp-win-titlebar`
- `.tp-win-body`
- `.tp-win-body--work`
- `.tp-win-statusbar`

如此一來，彩色色帶仍與紙張邊緣齊平，同時把控制項、標籤、資料夾圖示、專案圖片、描述與狀態文字移入完全可見的區域。

## 驗證

以桌面尺寸的 Chrome headless 截圖檢查首頁 `http://localhost:1413/playground/`。標題列控制項與 WORK 標題列內容皆可見，背景色帶仍與左側紙張邊緣對齊。
