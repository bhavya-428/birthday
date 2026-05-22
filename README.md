# 🎂 Birthday Surprise Website

A fully interactive birthday scrapbook built with **pure React + CSS** — no Tailwind, no UI frameworks, no heavy libraries.

## Tech Stack
- React 18 (via Vite)
- Vanilla CSS (CSS variables, keyframe animations, transitions)
- Google Fonts: Caveat + Playfair Display + Nunito

---

## 🚀 Setup

```bash
# 1. Install dependencies
npm install

# 2. Start dev server
npm run dev

# 3. Open in browser
http://localhost:5173
```

---

## 📁 Project Structure

```
src/
├── App.jsx                    ← Scene controller + custom cursor
├── main.jsx                   ← React entry point
├── hooks/
│   └── useParticles.js        ← Confetti, sparkles, tap hearts
├── components/
│   ├── CountdownScene.jsx     ← 3–2–1 cinematic intro
│   ├── CakeScene.jsx          ← Chibi + cake slice interaction
│   ├── CakeSVG.jsx            ← Animated cake SVG
│   ├── ChibiCharacter.jsx     ← SVG chibi with eye tracking
│   ├── ScrapbookScene.jsx     ← Book cover + page navigation
│   └── ScrapbookPages.jsx     ← All 4 page spreads
└── styles/
    └── global.css             ← All styling, animations, tokens
```

---

## ✏️ Customization

### Change the birthday name
In `CakeScene.jsx`, find:
```jsx
<div className={`birthday-text${showText ? ' show' : ''}`}>
  Happy Birthday, Bestie! 💖
</div>
```
Replace `Bestie` with your friend's name.

### Change the book cover text
In `ScrapbookScene.jsx`:
```jsx
<div className="cover-title">For My Dearest Bestie</div>
<div className="cover-quote-text">...</div>
```

### Add real photos
In `ScrapbookPages.jsx`, replace `<PhotoSlot />` components with:
```jsx
<div className="photo-slot">
  <img src="/photos/photo1.jpg" alt="memory" />
</div>
```
Put photos in `public/photos/`.

### Add a video
In `ScrapbookPages.jsx`, inside `PageFourFull`, replace:
```jsx
{/* video placeholder div */}
```
with:
```jsx
<video src="/memory.mp4" controls poster="/thumb.jpg" />
```
Put your video in `public/`.

### Add background music
In `public/`, add `bg-music.mp3`.  
In `App.jsx`, add:
```jsx
<audio src="/bg-music.mp3" autoPlay loop volume="0.25" />
```

---

## 🎨 Design Tokens
All colors and fonts live in `src/styles/global.css` under `:root`:
```css
:root {
  --pink:     #FFB6C1;
  --rose:     #F472B6;
  --lavender: #E8D5F5;
  --purple:   #C084FC;
  --cream:    #FFF8F0;
  --peach:    #FFD9B8;
  --gold:     #F9D77E;
}
```

---

## 📱 Responsive
- Mobile-first CSS with `clamp()` for fluid typography
- Book spreads stack vertically on mobile (<600px)
- Touch gestures supported on cake slice
- All animations GPU-accelerated via `transform` and `opacity`

---

## 🌸 Features
- ✅ Cinematic 3–2–1 countdown with star field
- ✅ Chibi character with real-time eye/head tracking (mouse + touch)
- ✅ Cake slice gesture (drag/swipe) with confetti + sparkle burst
- ✅ Tap anywhere for floating hearts
- ✅ Floating ambient emojis + balloons + dancing characters
- ✅ Animated book cover with 3D hover
- ✅ 4-page scrapbook with page-turn animation
- ✅ Heart photo collage layout
- ✅ Polaroid grid with tilt + hover zoom
- ✅ Video memory final spread
- ✅ Custom glowing cursor
