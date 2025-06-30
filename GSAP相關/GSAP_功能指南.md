# GSAP 功能免費狀態和使用指南

## 重要更新 (2024-2025)
感謝 Webflow 的支持，**所有 GSAP 功能現在都完全免費**，包括以前需要付費會員資格的插件！

---

## 1. CustomEase - 自定義緩動函數

### 狀態：✅ **完全免費**
- 以前是付費插件，現在完全免費
- 可用於商業專案
- 包含在標準授權中

### CDN 連結
```html
<script src="https://cdn.jsdelivr.net/npm/gsap@3.13/dist/gsap.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/gsap@3.13/dist/CustomEase.min.js"></script>
```

### 基本使用範例
```javascript
// 註冊插件
gsap.registerPlugin(CustomEase);

// 創建自定義緩動曲線
CustomEase.create("myEase", "M0,0 C0.25,0.1 0.25,1 1,1");

// 使用自定義緩動
gsap.to(".element", {
    duration: 2,
    x: 300,
    ease: "myEase"
});

// 或使用內建的緩動曲線編輯器數據
CustomEase.create("hop", "M0,0 C0.071,0.505 0.192,0.726 0.318,0.852 0.45,0.984 0.504,1 1,1");
```

### 替代方案
- 不需要替代方案，現在完全免費使用！

---

## 2. useGSAP - React Hook

### 狀態：✅ **完全免費**
- React 專用的 Hook
- 自動處理清理和生命週期

### 安裝方式
```bash
npm i @gsap/react
```

### CDN 連結 (使用 ESM)
```javascript
import React from "https://esm.sh/react";
import ReactDOM from "https://esm.sh/react-dom";
import gsap from "https://esm.sh/gsap";
import { useGSAP } from "https://esm.sh/@gsap/react";
```

### 基本使用範例
```javascript
import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

// 註冊 Hook
gsap.registerPlugin(useGSAP);

function AnimatedComponent() {
  const container = useRef();
  
  useGSAP(() => {
    // GSAP 動畫代碼
    gsap.to(".box", { 
      rotation: "+=360", 
      duration: 3 
    });
    
    // 使用 ref
    gsap.from(container.current, {
      opacity: 0,
      y: 50,
      duration: 1
    });
  }, { scope: container }); // 設定範圍
  
  return (
    <div ref={container}>
      <div className="box">動畫元素</div>
    </div>
  );
}
```

### 進階功能 - contextSafe
```javascript
function ClickAnimationComponent() {
  const container = useRef();
  
  const { contextSafe } = useGSAP({ scope: container });
  
  // 包裹事件處理函數
  const handleClick = contextSafe(() => {
    gsap.to(".clickable", { 
      scale: 1.2, 
      duration: 0.3 
    });
  });
  
  return (
    <div ref={container}>
      <button onClick={handleClick} className="clickable">
        點擊我
      </button>
    </div>
  );
}
```

### 替代方案
- 如果不使用 React，可以直接使用 gsap.context() 進行清理管理

---

## 3. ScrollTrigger - 滾動觸發動畫

### 狀態：✅ **完全免費**
- GSAP 最受歡迎的插件之一
- 功能強大且免費

### CDN 連結
```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.11.3/gsap.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.11.3/ScrollTrigger.min.js"></script>
```

### 基本使用範例
```javascript
// 註冊插件
gsap.registerPlugin(ScrollTrigger);

// 基本滾動動畫
gsap.to('.box', {
    scrollTrigger: '.box', // 當 .box 進入視窗時觸發
    x: 500,
    duration: 2
});

// 進階配置
gsap.to(".element", {
    scrollTrigger: {
        trigger: ".element",
        start: "top 80%",      // 開始位置
        end: "bottom 20%",     // 結束位置
        scrub: true,           // 動畫進度綁定滾動
        pin: true,             // 固定元素
        markers: true          // 顯示調試標記
    },
    x: 400,
    rotation: 360
});

// 時間軸配合 ScrollTrigger
const tl = gsap.timeline({
    scrollTrigger: {
        trigger: ".container",
        pin: true,
        start: "top top",
        end: "bottom top",
        scrub: 1
    }
});

tl.from(".title", { opacity: 0, y: 50 })
  .from(".content", { opacity: 0, x: -100 }, "-=0.5");
```

### 替代方案
- Intersection Observer API（原生但功能較少）
- AOS (Animate On Scroll)
- 但 ScrollTrigger 現在免費，是最佳選擇

---

## 4. SplitText - 文字分割動畫

### 狀態：✅ **完全免費**（2024年4月30日起）
- 以前是付費插件
- 最近完全重寫，檔案大小減少 50%
- 新增 14 項新功能

### CDN 連結
```html
<script src="https://cdn.jsdelivr.net/npm/gsap@3.13/dist/gsap.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/gsap@3.13/dist/SplitText.min.js"></script>
```

### 基本使用範例
```javascript
// 註冊插件
gsap.registerPlugin(SplitText);

// 分割文字
const mySplitText = new SplitText("#text", {
    type: "words,chars"  // 分割成單詞和字元
});

// 動畫每個字元
gsap.from(mySplitText.chars, {
    duration: 0.8,
    opacity: 0,
    scale: 0,
    y: 80,
    rotationX: 180,
    transformOrigin: "0% 50% -50",
    ease: "back",
    stagger: 0.01
});

// 新功能：自動分割
const autoSplit = new SplitText("#auto-text", {
    type: "lines",
    linesClass: "split-line",
    autoSplit: true  // 自動處理 resize 事件
});
```

### 替代方案
- Splitting.js（免費開源）
- 自己寫分割函數
- 但 SplitText 現在免費且功能最完整

---

## 5. GSAP Core - 核心功能

### 狀態：✅ **完全免費**
- 一直都是免費的核心動畫庫
- 包含所有基本動畫功能

### CDN 連結
```html
<!-- 最新版本 -->
<script src="https://cdn.jsdelivr.net/npm/gsap@3.13/dist/gsap.min.js"></script>

<!-- 或使用 cdnjs -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.11.3/gsap.min.js"></script>
```

### 基本使用範例
```javascript
// 基本動畫
gsap.to(".box", {
    duration: 2,
    x: 300,
    rotation: 360,
    scale: 2,
    backgroundColor: "#ff0000",
    ease: "power2.inOut"
});

// 從某個狀態開始
gsap.from(".element", {
    duration: 1,
    opacity: 0,
    y: 50,
    stagger: 0.2  // 多個元素依序動畫
});

// 來回動畫
gsap.fromTo(".item", 
    { opacity: 0, scale: 0.5 },
    { opacity: 1, scale: 1, duration: 1 }
);

// 時間軸
const tl = gsap.timeline({ repeat: -1, yoyo: true });
tl.to(".first", { x: 100, duration: 0.5 })
  .to(".second", { y: 50, duration: 0.5 }, "-=0.25")
  .to(".third", { rotation: 180, duration: 0.5 });

// 設定預設值
gsap.defaults({
    ease: "power2.out",
    duration: 1
});
```

### 核心功能包含
- **gsap.to()** - 動畫到某個狀態
- **gsap.from()** - 從某個狀態開始
- **gsap.fromTo()** - 定義開始和結束狀態
- **gsap.timeline()** - 創建時間軸
- **gsap.set()** - 立即設定屬性
- **gsap.defaults()** - 設定預設值
- **gsap.utils** - 實用工具函數

---

## 總結

1. **所有功能現在都免費** - 感謝 Webflow 收購 GSAP
2. **商業使用也免費** - 標準授權涵蓋商業用途
3. **CDN 可直接使用** - 不需要註冊或下載
4. **React 整合完善** - useGSAP Hook 讓 React 開發更簡單
5. **功能持續更新** - SplitText 等插件都有重大改進

## 推薦學習資源
- [GSAP 官方文檔](https://gsap.com/docs/v3/)
- [GSAP 安裝助手](https://gsap.com/docs/v3/Installation)
- [React & GSAP 指南](https://gsap.com/resources/React/)
- [ScrollTrigger 詳細教程](https://gsap.com/docs/v3/Plugins/ScrollTrigger/)