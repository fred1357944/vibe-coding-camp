# Vibe Coding Camp - 學員成果發表網站

這是一個為 Vibe Coding Camp 設計的學員成果展示網站，提供學員作品展示和學習歷程分享的平台。

## 功能特色

### 1. 期別分類展示
- 依據不同期別展示學員作品
- 支援多期別管理
- 動態加載學員資料

### 2. 成果作品展示
- 圖片展示搭配文字描述
- 響應式圖片畫廊
- 學員個人作品介紹

### 3. 學習歷程分享
- 學員可以分享學習心得
- 即時發布功能
- 本地儲存歷程記錄

### 4. 響應式設計
- 適配各種裝置螢幕
- 流暢的使用者體驗
- 現代化的視覺設計

## 技術架構

- **前端**: HTML5, CSS3, JavaScript (ES6+)
- **樣式**: 自定義 CSS with Flexbox & Grid
- **資料儲存**: LocalStorage (學習歷程)
- **部署**: GitHub Pages

## 檔案結構

```
vibe-coding-camp/
├── index.html          # 主頁面
├── css/
│   └── style.css      # 樣式檔案
├── js/
│   └── main.js        # JavaScript 功能
├── 學員成果/
│   ├── 20250629/      # 2025年6月期學員作品
│   └── 20250727/      # 2025年7月期學員作品
└── README.md          # 專案說明文件
```

## 如何使用

1. 克隆專案到本地
```bash
git clone https://github.com/fred1357944/vibe-coding-camp.git
```

2. 在瀏覽器中開啟 `index.html`

3. 瀏覽不同期別的學員作品

4. 在「學習歷程分享」區域發布你的學習心得

## 新增學員作品

在 `js/main.js` 中的 `students` 物件新增學員資料：

```javascript
const students = {
    '期別ID': [
        { 
            name: '學員名稱', 
            image: '圖片路徑', 
            description: '作品描述' 
        }
    ]
};
```

## 部署到 GitHub Pages

1. 推送程式碼到 GitHub
2. 在 Repository 設定中啟用 GitHub Pages
3. 選擇 main 分支作為來源
4. 網站將自動部署到 `https://fred1357944.github.io/vibe-coding-camp/`

## 授權

© 2025 Vibe Coding Camp. All rights reserved.