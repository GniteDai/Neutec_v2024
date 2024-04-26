# demo

https://gnitedai.github.io/Neutec_v2024/

# 基礎需求

### 主頁面-側邊選單收合按鈕

```
@/components/side-Menu.vue
```

### 主頁面-九宮格動畫

```
@/components/FlashingGrid.vue
```

### 側邊選單

```
@/components/side-Menu.vue
```

# 額外需求

## 主頁面九宮格動畫

### :x: 請使用兩種以上的動畫執行方式，來繪製動畫

- CSS Animations
- CSS Transitions
- requestAnimationFrame()

### :heavy_check_mark: 四顆球同時朝同一個座標點移動

search project keyWord

```
randomMove()
```

### :x: 請在效能考量下，設計可同時存在一百顆球、且指定飛行起終點的結構

在效能考量下，設計能夠容納一百顆球並指定飛行起點和終點的結構。可以考慮使用 Canvas 技術來實現這樣的需求，因為 Canvas 提供了較佳的性能和更好的圖形處理能力，適合處理大量的動畫元素。

## 側邊選單

### :heavy_check_mark: 提供下拉選單，需包含所有種類。從下拉選單中選取任一項目時，等同點擊該項目

```
@/components/Drop-down.vue
```

### :heavy_check_mark: 請實作記憶功能，關閉分頁後再開啟，可以顯示上次選取的項目

- LocalStorage
- SessionStorage

search project keyWord

```
menu-selected
```

### :x: 請在效能考量下，設計可收合、展開最多一百層的選單

可以採用虛擬捲動（virtualization）的概念。僅渲染當前視窗可見的選單項目，而不是一次性渲染全部數據。當用戶滾動或展開選單時，系統會動態加載和渲染更多的選單項目，以提高性能並降低頁面加載時間。Element Plus 中提供了一個虛擬樹（virtualized tree）組件，可以方便地實現這樣的需求，並確保選單的高性能和流暢的用戶體驗。

# neutec_v2024

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) to make the TypeScript language service aware of `.vue` types.

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
