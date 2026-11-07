# G11 圖標產生器 v1.0 — © SCOUT SYSTEM

公開、免登入的 Type A 單一 HTML 工具。上載一張母圖後，工具會在瀏覽器本地產生符合 G11 規格的 9 個圖標檔，並提供可複製的 `<head>` 程式碼及 `manifest.webmanifest`。

**正式網址：** <https://icon-maker-tau.vercel.app/>

> **私隱承諾：**圖片只在你的瀏覽器內以 File API／Canvas 處理，**不會上載到任何伺服器**。本工具沒有後端、沒有 API、沒有分析追蹤，亦不會呼叫任何 AI 模型。

## 用途

由一張正方形母圖產生以下 9 個檔案：

| 檔案 | 尺寸／內容 | 用途 |
|---|---:|---|
| `favicon.ico` | 16／32／48 三合一 | 書籤及舊瀏覽器 |
| `favicon-16.png` | 16×16 | 瀏覽器分頁；由使用者在 16×16 像素格手動整理 |
| `favicon-32.png` | 32×32 | Retina 瀏覽器分頁 |
| `apple-touch-icon.png` | 180×180 | iOS「加入主畫面」 |
| `icon-192.png` | 192×192 | Android／PWA |
| `icon-512.png` | 512×512 | Android／PWA 安裝 |
| `icon-maskable-192.png` | 192×192 | Android maskable 圖標 |
| `icon-maskable-512.png` | 512×512 | Android maskable 圖標 |
| `og-image.png` | 1200×630 | WhatsApp／Signal／Facebook 分享預覽 |

尺寸、格式、安全區及體積預算以真理倉 [`docs/33-icon-standard.md`](https://github.com/playerkousas-rgb/readme/blob/main/docs/33-icon-standard.md) 為唯一標準。

## 點用

1. 開啟公開網站，或直接以瀏覽器打開 `icon_maker_v1.0.html`。
2. 上載一張正方形母圖。母圖應滿版（full bleed）、沒有白邊或圓角框，主體置中並佔畫面 60–70%，而且至少使用 4 種顏色。
3. 填寫 App 名、網站的**絕對網址**及主題色。
4. 在「16×16 手繪格」逐格整理 favicon。工具只會以縮圖作起稿，最終版本必須由人眼確認；它不會假裝自動產生手繪版。
5. 檢查兩張 maskable 預覽的圓裁及中央 66% 安全區；9 個檔案合計應不超過 260 KB。
6. 逐個下載，或按「全部下載」。若瀏覽器攔截，請允許本頁進行多個下載。
7. 複製 `<head>` 的 5 條 link＋4 條 meta，以及 `manifest.webmanifest` 內容到目標 app。
8. 如有需要，可匯出／匯入設定 JSON（`schemaVersion: 1`）。設定檔只保存 App 名、網址及主題色，不包括母圖或 16×16 像素內容。

## 限制（誠實寫明）

- `favicon.ico` 是瀏覽器本地組合的 PNG-in-ICO（16／32／48），尚未在所有瀏覽器驗證相容性；首次使用必須依 G11 真機驗收。
- 工具只做縮放、置中及 ICO 組合，不會把母圖減色成 PNG8。若 9 個檔案合計超過 260 KB，應先簡化／減色母圖，再重新產生；不要改用 SVG、AVIF、WebP 或 JPEG。
- 16×16 畫布的起稿來自母圖縮小，**不是完成的手繪 16px 圖標**；使用者仍須逐格整理並以實際分頁大小檢查辨識度。
- 非正方形圖片會以滿版 cover 方式置中裁切；工具不會代替使用者判斷主體是否符合 60–70% 或 maskable 66% 安全區。
- 圖標不加入隱形水印：它們是使用者母圖的固定尺寸衍生檔，不是 AI 生成成品；來源證明應依靠母圖及 repo 紀錄。靜態審計的 W2 警告因此屬預期。
- 本工具不提供 AI 生圖、ZIP 打包、後端儲存或自動手繪 16px 等模板以外功能。

## 私隱及技術規定

- Type A 版本化主檔：`icon_maker_v1.0.html`；Vercel 根頁 `index.html` 是由主檔自動產生的部署拷貝，禁止直接修改。
- 零外部套件、零 CDN、零後端；下載及圖片處理全在本機完成。
- 雙版號 v1.0：主檔檔名、`<meta name="app-version">`、標題、`APP_VERSION` 常數及頁尾一致；部署拷貝帶有來源及版號標記。
- 版權：`© SCOUT SYSTEM`；可自由使用／改作，但須保留版權標示。
- 模板來源：真理倉 `playerkousas-rgb/readme` 的 `arena/676e77bf-readme` 分支，commit `614f33d53b7fae58a529d503860ad3212e7373f1`。本 repo 的交付 HTML 與該模板 SHA-256 相同：`d54ce318050b79ffc3a754da479d3f7498894f7a58c713eb24aaa49506c46bf1`。

## 本機檢查

需要 Node.js 20 或以上；不需安裝 dependency。

```bash
node scripts/sync_index_v1.0.mjs --check
node scripts/audit_single_html_v1.0.mjs icon_maker_v1.0.html
node scripts/audit_single_html_v1.0.mjs index.html
node scripts/guard.mjs
```

如有修改版本化主檔，先執行 `node scripts/sync_index_v1.0.mjs` 更新部署拷貝。GitHub Actions 會在每次 push／pull request 驗證兩者同步，並執行相同 guard 及單一 HTML 審計。

## 驗收結果（2026-11-07）

| 項目 | 結果 | 備註 |
|---|---|---|
| `audit_single_html_v1.0.mjs` 靜態審計 | ✅ PASS | 0 FAIL；2 個預期警告：Type A 無 AI key slot（C13）、固定尺寸圖標不嵌水印（W2） |
| `guard.mjs` | ✅ PASS | 16 項檢查全綠 |
| `index.html` 部署拷貝同步 | ✅ PASS | CI 會以 `sync_index_v1.0.mjs --check` 防止主檔與首頁 drift |
| Vercel production 根路徑 | 🔧 已修正，待部署 | 2026-11-07 實測曾回 `404 NOT_FOUND`；現改為實體 `index.html`，不再依賴根路徑 rewrite |
| Vercel 免登入存取 | **未測** | 新 deployment Ready 後須以無痕視窗確認 |
| favicon 在瀏覽器分頁顯示 | **未測** | 需要以產出的圖標放入目標 app 後真機驗收 |
| iPhone「加入主畫面」圖標及無白邊 | **未測** | 沒有 iPhone 真機可用，沒有假裝測過 |
| Android maskable 圓裁不切走主體 | **未測** | 需要 Android 真機及實際母圖 |
| WhatsApp 顯示 1200×630 `og-image` 預覽 | **未測** | 需要已公開的目標 app 絕對網址及 WhatsApp 真機 |
| 9 個檔案逐個／全部下載 | **未測** | 需要瀏覽器互動及允許多檔下載 |

未測項目明確標示為未測，不代表通過。完成真機驗收後，應把使用的瀏覽器／裝置、日期及結果補入此表。

## Vercel 部署

- Vercel 直接以根目錄的 `index.html` 提供 `/`；該檔由 `icon_maker_v1.0.html` 產生，CI 會阻止不同步的部署拷貝。
- 已移除曾令 production 根路徑回傳 `404 NOT_FOUND` 的 rewrite，避免 `cleanUrls` 與帶副檔名目的地互相影響。
- 純靜態站，無登入、無 serverless function、無環境變數。
- `.vercelignore` 排除 Git、文件及檢查腳本，只部署公開工具所需檔案。
- 部署地區設定為香港 `hkg1`。

---

© SCOUT SYSTEM · G11 圖標產生器 v1.0
