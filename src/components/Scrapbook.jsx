import React, { useState, useCallback, useEffect } from 'react'
import { playPageFlip } from '../utils/audio'
import { FRIEND_NAME } from '../constants'
import {
  PageOneLeft, PageOneRight,
  PageTwoLeft, PageTwoRight,
  PageThreeLeft, PageThreeRight,
  PageFourFull
} from './ScrapbookPages'

export default function Scrapbook() {
  const [flippedSheets, setFlippedSheets] = useState([]) // indices of flipped sheets: 0 (cover), 1, 2, etc.
  const [bookStyle, setBookStyle] = useState({ transform: 'scale(1)' })
  const [isPortrait, setIsPortrait] = useState(false)
  const [activeImage, setActiveImage] = useState(null) // { src, caption }

  useEffect(() => {
    const handleResize = () => {
      const w = window.innerWidth
      const h = window.innerHeight
      const portrait = h > w && w < 960
      setIsPortrait(portrait)

      let scale
      if (portrait) {
        // Rotated 90deg, so screen height corresponds to book width (900)
        // Screen width corresponds to book height (550)
        const scaleW = h / 950
        const scaleH = w / 580
        scale = Math.min(scaleW, scaleH)
      } else {
        const scaleW = w / 950
        const scaleH = h / 650 // buffer for header/music buttons
        scale = Math.min(scaleW, scaleH)
      }

      const finalScale = Math.min(1.0, scale)

      setBookStyle({
        transform: portrait 
          ? `rotate(-90deg) scale(${finalScale})` 
          : `scale(${finalScale})`,
        transformOrigin: 'center center'
      })
    }

    window.addEventListener('resize', handleResize)
    handleResize()

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const handleFlip = useCallback((sheetIndex) => {
    playPageFlip()
    setFlippedSheets(prev => {
      if (prev.includes(sheetIndex)) {
        // Unflip this sheet and all subsequent sheets to keep order
        return prev.filter(idx => idx < sheetIndex)
      } else {
        // Flip this sheet and all previous sheets to keep order
        const next = [...prev]
        for (let i = 0; i <= sheetIndex; i++) {
          if (!next.includes(i)) next.push(i)
        }
        return next
      }
    })
  }, [])

  const resetBook = useCallback(() => {
    playPageFlip()
    setFlippedSheets([])
  }, [])

  const onImageClick = useCallback((src, caption) => {
    setActiveImage({ src, caption })
  }, [])

  const totalSheets = 4 // Cover + Spread 1-to-2 + Spread 2-to-3 + Spread 3-to-4

  return (
    <div className="scrapbook-wrapper">
      {isPortrait && (
        <div className="portrait-rotate-hint">
          <span className="rotate-phone-icon">🔄</span>
          <span>Rotate phone sideways to read 📖</span>
        </div>
      )}
      <div className="book-container" style={bookStyle}>
        
        {/* --- SHEET 1 (COVER & PAGE 1 LEFT) --- */}
        <div className={`book-sheet sheet-depth-1 ${flippedSheets.includes(0) ? 'flipped' : ''}`} style={{ zIndex: flippedSheets.includes(0) ? 10 : 40 }}>
          {/* Front Face: Book Cover */}
          <div className="sheet-face sheet-front cover-front" onClick={() => handleFlip(0)}>
            <div className="book-spine-strip" />
            <div className="book-cover-pattern" />
            <div className="cover-icon">📖</div>
            <div className="cover-title">For Our Dearest {FRIEND_NAME}</div>
            <div className="cover-quote-text">
              "Every page of this book is a piece of our hearts — because every memory with you is priceless."
            </div>
            <div className="cover-hint">✦ tap to open ✦</div>
          </div>
          {/* Back Face: Page 1 Left */}
          <div className="sheet-face sheet-back" onClick={() => handleFlip(0)}>
            <div className="page-spine-shadow-left" />
            <PageOneLeft onImageClick={onImageClick} />
          </div>
        </div>

        {/* --- SHEET 2 (PAGE 1 RIGHT & PAGE 2 LEFT) --- */}
        <div className={`book-sheet sheet-depth-2 ${flippedSheets.includes(1) ? 'flipped' : ''}`} style={{ zIndex: flippedSheets.includes(1) ? 20 : 30 }}>
          {/* Front Face: Page 1 Right */}
          <div className="sheet-face sheet-front" onClick={() => handleFlip(1)}>
            <div className="page-spine-shadow-right" />
            <PageOneRight onImageClick={onImageClick} />
          </div>
          {/* Back Face: Page 2 Left */}
          <div className="sheet-face sheet-back" onClick={() => handleFlip(1)}>
            <div className="page-spine-shadow-left" />
            <PageTwoLeft onImageClick={onImageClick} />
          </div>
        </div>

        {/* --- SHEET 3 (PAGE 2 RIGHT & PAGE 3 LEFT) --- */}
        <div className={`book-sheet sheet-depth-3 ${flippedSheets.includes(2) ? 'flipped' : ''}`} style={{ zIndex: flippedSheets.includes(2) ? 30 : 20 }}>
          {/* Front Face: Page 2 Right */}
          <div className="sheet-face sheet-front" onClick={() => handleFlip(2)}>
            <div className="page-spine-shadow-right" />
            <PageTwoRight />
          </div>
          {/* Back Face: Page 3 Left */}
          <div className="sheet-face sheet-back" onClick={() => handleFlip(2)}>
            <div className="page-spine-shadow-left" />
            <PageThreeLeft onImageClick={onImageClick} />
          </div>
        </div>

        {/* --- SHEET 4 (PAGE 3 RIGHT & FINAL PAGE) --- */}
        <div className={`book-sheet sheet-depth-4 ${flippedSheets.includes(3) ? 'flipped' : ''}`} style={{ zIndex: flippedSheets.includes(3) ? 40 : 10 }}>
          {/* Front Face: Page 3 Right */}
          <div className="sheet-face sheet-front" onClick={() => handleFlip(3)}>
            <div className="page-spine-shadow-right" />
            <PageThreeRight onImageClick={onImageClick} />
          </div>
          {/* Back Face: Page 4 Full-Width Spread (Combined Right & Left) */}
          <div 
            className="sheet-face sheet-back final-spread-face"
            onClick={(e) => {
              if (e.target.closest('.video-frame') || e.target.closest('.reset-book-btn')) return;
              handleFlip(3);
            }}
          >
            <div className="final-spine-shadow" />
            <PageFourFull onReset={resetBook} />
          </div>
        </div>

      </div>

      {/* --- INSTRUCTIONS HINT --- */}
      <div className="scrapbook-instructions">
        {flippedSheets.length === 0 ? (
          <span>✦ Tap the cover to open the scrapbook ✦</span>
        ) : flippedSheets.length === totalSheets ? (
          <span>✦ Tap any page to flip back ✦</span>
        ) : (
          <span>✦ Tap on the outer edges to turn pages ✦</span>
        )}
      </div>

      {/* --- IMAGE LIGHTBOX --- */}
      {activeImage && (
        <div className="lightbox-overlay" onClick={() => setActiveImage(null)}>
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <button className="lightbox-close" onClick={() => setActiveImage(null)}>&times;</button>
            <img src={activeImage.src} alt={activeImage.caption} className="lightbox-img" />
            {activeImage.caption && (
              <div className="lightbox-caption">{activeImage.caption}</div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
