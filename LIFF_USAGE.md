# LIFF 集中管理使用說明

## 架構說明

為了避免在每個頁面重複寫 LIFF 初始化程式碼，我們建立了以下架構：

### 1. useLiff Hook (`app/hooks/useLiff.tsx`)

- 處理 LIFF 初始化邏輯
- 管理 LIFF 狀態（初始化、登入狀態、錯誤）
- 提供 login 和 logout 方法

### 2. LiffContext (`app/context/LiffContext.tsx`)

- 使用 React Context 在整個應用程式中共享 LIFF 狀態
- 包裝 useLiff Hook 的功能

### 3. LiffProvider (`app/layout.tsx`)

- 在應用程式根層級提供 LIFF 上下文
- 集中管理 LIFF ID

## 使用方式

### 在任何元件中使用 LIFF：

```tsx
"use client";

import { useLiffContext } from "../context/LiffContext";

export default function MyComponent() {
  const { isInitialized, isLoggedIn, error, login, logout } = useLiffContext();

  const handleLogin = () => {
    if (!isInitialized) {
      console.warn("LIFF is not initialized yet");
      return;
    }

    if (!isLoggedIn) {
      login("https://your-redirect-url.com");
    }
  };

  const handleLogout = () => {
    logout();
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!isInitialized) {
    return <div>Loading LIFF...</div>;
  }

  return (
    <div>
      <p>LIFF Status: {isLoggedIn ? "Logged In" : "Not Logged In"}</p>
      <button onClick={handleLogin}>Login</button>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}
```

## 優點

1. **避免重複程式碼**：LIFF 初始化邏輯只寫一次
2. **集中管理**：LIFF ID 在 `layout.tsx` 中統一管理
3. **狀態共享**：所有元件都可以存取相同的 LIFF 狀態
4. **錯誤處理**：統一的錯誤處理機制
5. **效能優化**：LIFF 只初始化一次

## 注意事項

- 所有需要使用 LIFF 的元件都必須在 `LiffProvider` 內部
- 使用 `useLiffContext` 前請確保元件已被 `LiffProvider` 包裝
- LIFF ID 現在集中在 `layout.tsx` 中管理，如需修改請在那裡更新
