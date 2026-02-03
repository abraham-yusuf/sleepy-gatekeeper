# CSS Instructions - Windows 95 Retro UI

This document outlines the CSS styling requirements for achieving an authentic Windows 95 retro UI aesthetic.

## Color Palette

Use the classic Windows 95 color scheme:

```css
:root {
  --win95-gray: #c0c0c0;
  --win95-dark-gray: #808080;
  --win95-light-gray: #dfdfdf;
  --win95-white: #ffffff;
  --win95-black: #000000;
  --win95-blue: #000080;
  --win95-blue-light: #0000ff;
  --win95-desktop: #008080;
  --win95-highlight: #000080;
  --win95-highlight-text: #ffffff;
}
```

## Typography

Windows 95 used specific system fonts:

```css
body {
  font-family: 'MS Sans Serif', 'Microsoft Sans Serif', sans-serif;
  font-size: 11px;
  color: var(--win95-black);
  background-color: var(--win95-desktop);
}

/* For titles and headers */
.window-title {
  font-family: 'MS Sans Serif', 'Microsoft Sans Serif', sans-serif;
  font-size: 11px;
  font-weight: bold;
  color: var(--win95-white);
}

/* For monospace text (e.g., code, terminal) */
.monospace {
  font-family: 'Courier New', Courier, monospace;
  font-size: 12px;
}
```

## Buttons

Classic 3D raised button style with proper borders:

```css
.button {
  padding: 4px 12px;
  background-color: var(--win95-gray);
  border: none;
  outline: none;
  box-shadow: 
    inset -1px -1px 0px var(--win95-black),
    inset 1px 1px 0px var(--win95-white),
    inset -2px -2px 0px var(--win95-dark-gray),
    inset 2px 2px 0px var(--win95-light-gray);
  font-family: 'MS Sans Serif', 'Microsoft Sans Serif', sans-serif;
  font-size: 11px;
  cursor: pointer;
  position: relative;
}

.button:active {
  box-shadow: 
    inset 1px 1px 0px var(--win95-black),
    inset -1px -1px 0px var(--win95-white),
    inset 2px 2px 0px var(--win95-dark-gray),
    inset -2px -2px 0px var(--win95-light-gray);
  padding: 5px 11px 3px 13px;
}

.button:focus {
  outline: 1px dotted var(--win95-black);
  outline-offset: -4px;
}

.button:disabled {
  color: var(--win95-dark-gray);
  text-shadow: 1px 1px 0px var(--win95-white);
  cursor: default;
}
```

## Windows

Classic window frame with title bar:

```css
.window {
  background-color: var(--win95-gray);
  box-shadow: 
    inset -1px -1px 0px var(--win95-black),
    inset 1px 1px 0px var(--win95-light-gray),
    inset -2px -2px 0px var(--win95-dark-gray),
    inset 2px 2px 0px var(--win95-white);
  padding: 2px;
}

.window-title-bar {
  background: linear-gradient(to right, var(--win95-blue), var(--win95-blue-light));
  color: var(--win95-white);
  padding: 2px 4px;
  font-weight: bold;
  font-size: 11px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2px;
}

.window-body {
  background-color: var(--win95-gray);
  padding: 8px;
}
```

## Text Inputs

Classic inset text input fields:

```css
.text-input {
  background-color: var(--win95-white);
  border: none;
  box-shadow: 
    inset -1px -1px 0px var(--win95-light-gray),
    inset 1px 1px 0px var(--win95-dark-gray),
    inset -2px -2px 0px var(--win95-white),
    inset 2px 2px 0px var(--win95-black);
  padding: 3px 4px;
  font-family: 'MS Sans Serif', 'Microsoft Sans Serif', sans-serif;
  font-size: 11px;
  color: var(--win95-black);
}

.text-input:focus {
  outline: none;
}

.text-input:disabled {
  background-color: var(--win95-gray);
  color: var(--win95-dark-gray);
}
```

## Backgrounds

Desktop and panel backgrounds:

```css
/* Desktop background */
.desktop {
  background-color: var(--win95-desktop);
  min-height: 100vh;
}

/* Panel/Dialog background */
.panel {
  background-color: var(--win95-gray);
}

/* Content area background */
.content-area {
  background-color: var(--win95-white);
  box-shadow: 
    inset -1px -1px 0px var(--win95-light-gray),
    inset 1px 1px 0px var(--win95-dark-gray),
    inset -2px -2px 0px var(--win95-white),
    inset 2px 2px 0px var(--win95-black);
  padding: 8px;
}
```

## Taskbar

Classic Windows 95 taskbar:

```css
.taskbar {
  background-color: var(--win95-gray);
  height: 28px;
  box-shadow: 
    inset 0px 1px 0px var(--win95-white),
    inset 0px 2px 0px var(--win95-light-gray);
  display: flex;
  align-items: center;
  padding: 2px;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
}

.start-button {
  padding: 2px 8px;
  background-color: var(--win95-gray);
  box-shadow: 
    inset -1px -1px 0px var(--win95-black),
    inset 1px 1px 0px var(--win95-white),
    inset -2px -2px 0px var(--win95-dark-gray),
    inset 2px 2px 0px var(--win95-light-gray);
  font-weight: bold;
  display: flex;
  align-items: center;
  gap: 4px;
}
```

## Menu Items

Classic menu styling:

```css
.menu {
  background-color: var(--win95-gray);
  border: 2px solid;
  border-color: var(--win95-white) var(--win95-black) var(--win95-black) var(--win95-white);
  padding: 2px;
}

.menu-item {
  padding: 4px 20px;
  cursor: pointer;
  font-size: 11px;
}

.menu-item:hover {
  background-color: var(--win95-highlight);
  color: var(--win95-highlight-text);
}

.menu-item:disabled {
  color: var(--win95-dark-gray);
  text-shadow: 1px 1px 0px var(--win95-white);
}

.menu-separator {
  height: 1px;
  background-color: var(--win95-dark-gray);
  margin: 2px 0;
  box-shadow: 0px 1px 0px var(--win95-white);
}
```

## Tabs

Windows 95 style tabs:

```css
.tabs {
  display: flex;
  gap: 2px;
  margin-bottom: -2px;
}

.tab {
  padding: 4px 12px;
  background-color: var(--win95-gray);
  border: 2px solid;
  border-color: var(--win95-white) var(--win95-black) var(--win95-black) var(--win95-white);
  border-bottom: none;
  cursor: pointer;
}

.tab.active {
  background-color: var(--win95-gray);
  border-bottom: 2px solid var(--win95-gray);
  margin-bottom: -2px;
  padding-bottom: 6px;
}
```

## Checkboxes and Radio Buttons

Classic form controls:

```css
.checkbox-container,
.radio-container {
  display: flex;
  align-items: center;
  gap: 6px;
  cursor: pointer;
}

.checkbox,
.radio {
  width: 13px;
  height: 13px;
  background-color: var(--win95-white);
  box-shadow: 
    inset -1px -1px 0px var(--win95-light-gray),
    inset 1px 1px 0px var(--win95-dark-gray),
    inset -2px -2px 0px var(--win95-white),
    inset 2px 2px 0px var(--win95-black);
  position: relative;
}

.checkbox.checked::after {
  content: '✓';
  position: absolute;
  top: -3px;
  left: 1px;
  font-size: 14px;
  font-weight: bold;
  color: var(--win95-black);
}

.radio {
  border-radius: 50%;
}

.radio.checked::after {
  content: '';
  position: absolute;
  top: 3px;
  left: 3px;
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background-color: var(--win95-black);
}
```

## Progress Bar

Classic progress bar with blocks:

```css
.progress-bar {
  background-color: var(--win95-white);
  box-shadow: 
    inset -1px -1px 0px var(--win95-light-gray),
    inset 1px 1px 0px var(--win95-dark-gray),
    inset -2px -2px 0px var(--win95-white),
    inset 2px 2px 0px var(--win95-black);
  height: 20px;
  padding: 2px;
}

.progress-bar-fill {
  background: repeating-linear-gradient(
    to right,
    var(--win95-blue) 0px,
    var(--win95-blue) 10px,
    var(--win95-white) 10px,
    var(--win95-white) 12px
  );
  height: 100%;
  transition: width 0.3s ease;
}
```

## Scrollbars

Custom scrollbar styling (for modern browsers):

```css
::-webkit-scrollbar {
  width: 16px;
  height: 16px;
}

::-webkit-scrollbar-track {
  background-color: var(--win95-gray);
  background-image: 
    linear-gradient(45deg, var(--win95-white) 25%, transparent 25%),
    linear-gradient(-45deg, var(--win95-white) 25%, transparent 25%),
    linear-gradient(45deg, transparent 75%, var(--win95-white) 75%),
    linear-gradient(-45deg, transparent 75%, var(--win95-white) 75%);
  background-size: 2px 2px;
  background-position: 0 0, 0 1px, 1px -1px, -1px 0px;
}

::-webkit-scrollbar-thumb {
  background-color: var(--win95-gray);
  box-shadow: 
    inset -1px -1px 0px var(--win95-black),
    inset 1px 1px 0px var(--win95-white),
    inset -2px -2px 0px var(--win95-dark-gray),
    inset 2px 2px 0px var(--win95-light-gray);
}

::-webkit-scrollbar-button {
  background-color: var(--win95-gray);
  box-shadow: 
    inset -1px -1px 0px var(--win95-black),
    inset 1px 1px 0px var(--win95-white),
    inset -2px -2px 0px var(--win95-dark-gray),
    inset 2px 2px 0px var(--win95-light-gray);
}
```

## Icons and Images

Image rendering for pixelated icons:

```css
.icon {
  image-rendering: pixelated;
  image-rendering: -moz-crisp-edges;
  image-rendering: crisp-edges;
}

.icon-16 {
  width: 16px;
  height: 16px;
}

.icon-32 {
  width: 32px;
  height: 32px;
}
```

## Additional Utility Classes

```css
/* Divider/Separator */
.divider {
  height: 2px;
  background: linear-gradient(
    to bottom,
    var(--win95-dark-gray) 0px,
    var(--win95-dark-gray) 1px,
    var(--win95-white) 1px,
    var(--win95-white) 2px
  );
  margin: 8px 0;
}

/* Sunken field effect */
.sunken {
  box-shadow: 
    inset -1px -1px 0px var(--win95-light-gray),
    inset 1px 1px 0px var(--win95-dark-gray),
    inset -2px -2px 0px var(--win95-white),
    inset 2px 2px 0px var(--win95-black);
}

/* Raised field effect */
.raised {
  box-shadow: 
    inset -1px -1px 0px var(--win95-black),
    inset 1px 1px 0px var(--win95-white),
    inset -2px -2px 0px var(--win95-dark-gray),
    inset 2px 2px 0px var(--win95-light-gray);
}
```

## Notes

- Always use pixel-perfect measurements to maintain the authentic Win95 look
- Avoid modern CSS features like border-radius (except for radio buttons), shadows (except box-shadow for 3D effects), and gradients (except for title bars)
- Keep animations minimal - Windows 95 was not heavily animated
- Use system fonts or fallback to sans-serif
- Maintain the characteristic 3D beveled appearance using box-shadow techniques
- Color palette should be strictly limited to the Windows 95 system colors
