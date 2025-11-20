# Traditional Chinese Colors Web App

A beautiful, interactive web application built with **React + Vite** that showcases traditional Chinese colors each day, accompanied by classical poetry, descriptions, and curated images.

![App Screenshot](/screenshot.png)

## Features

- **Daily Color Display** – Shows a different color based on the current date.
- **Search** – Find colors by Chinese name, Pinyin (tone‑insensitive) or Hex code.
- **Copy to Clipboard** – Click on Hex or RGB codes to copy them.
- **Dynamic Contrast** – Text color automatically switches between light and dark for optimal readability.
- **Responsive Design** – Optimized layout for desktop and mobile.
- **Mobile Navigation** – Swipe left/right to change colors and sticky navigation buttons at the bottom.
- **Smooth Transitions & Micro‑animations** – Elegant UI interactions.
- **Local Images** – All illustrations are stored locally for fast loading.

## Getting Started

```bash
npm install
npm run dev
```

Open `http://localhost:5173` to view the app.

## Project Structure

```
src/
  components/
    ColorDisplay.jsx
    InfoCard.jsx
    SearchOverlay.jsx
  data/
    colors.js
  App.jsx
public/
  images/   # local illustrations
```

## License

MIT

## Acknowledgements & Inspiration

- [Chinese Colors](https://github.com/zerosoul/chinese-colors)
