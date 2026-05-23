import React, { useState, useEffect } from 'react'

/* ===== REUSABLE BITS ===== */
function PhotoSlot({ src, icon = '📸', label = 'add your photo', style = {}, onImageClick }) {
  return (
    <div 
      className="photo-slot" 
      style={{ ...style, cursor: src ? 'zoom-in' : 'default' }}
      onClick={(e) => {
        if (src && onImageClick) {
          e.stopPropagation()
          onImageClick(src, label)
        }
      }}
    >
      {src ? (
        <img src={src} alt={label} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      ) : (
        <>
          <div className="photo-slot-icon">{icon}</div>
          <div className="photo-slot-label">{label}</div>
        </>
      )}
    </div>
  )
}

function Tape({ style = {} }) {
  return <div className="tape-strip" style={style} />
}

function Doodle({ emoji, style = {} }) {
  return <div className="doodle" style={style}>{emoji}</div>
}

function FloatHeart({ style = {} }) {
  return <div className="float-heart-el" style={style}>💕</div>
}

function QuoteCard({ children }) {
  return (
    <div className="quote-card">
      <p>{children}</p>
    </div>
  )
}

/* ===== PAGE 1: MEMORY WALL ===== */
export function PageOneLeft({ onImageClick }) {
  return (
    <div className="page page-left" style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
      <Tape style={{ top: -5, left: '40%', transform: 'rotate(-4deg)' }} />
      <Doodle emoji="🌸" style={{ top: 8, right: 10, fontSize: 16 }} />
      <Doodle emoji="⭐" style={{ bottom: 14, left: 8, fontSize: 13 }} />
      <Doodle emoji="💫" style={{ top: '52%', left: 6, fontSize: 11 }} />

      <div className="page-heading">Our Beginning ✨</div>
      <PhotoSlot src="/photo_selfie.jpg" label="Our first picture together 🥺💖" style={{ height: '50%', flexShrink: 0 }} onImageClick={onImageClick} />
      <div className="caption-text" style={{ fontSize: 'clamp(12px,1.9vw,15px)', color: '#b5306e', marginTop: 2 }}>
        The day we first met… 🌷
      </div>
      <QuoteCard>
        "Some people come into your life and change everything — you're one of them. 🌸"
      </QuoteCard>
      <div className="caption-text" style={{ opacity: 0.6, fontSize: 12, marginTop: -2 }}>— your besties 💕</div>
    </div>
  )
}

export function PageOneRight({ onImageClick }) {
  return (
    <div className="page page-right" style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
      <Tape style={{ top: -5, right: '28%', transform: 'rotate(5deg)' }} />
      <Doodle emoji="💜" style={{ top: 8,  left: 10, fontSize: 16 }} />
      <Doodle emoji="🌙" style={{ bottom: 14, right: 10, fontSize: 13 }} />

      <div className="page-heading" style={{ color: '#8040a0' }}>My Favorite Memory ✨</div>
      <PhotoSlot src="/photo_hug.jpg" label="That warm, cozy hug from behind 🧸💕" style={{ height: '50%', flexShrink: 0 }} onImageClick={onImageClick} />
      <div className="caption-text" style={{ fontSize: 'clamp(12px,1.9vw,15px)', color: '#8040a0', marginTop: 2 }}>
        remember this day? 🥺💖
      </div>

      <div className="tag-row" style={{ marginTop: 2 }}>
        <span className="tag" style={{ background: '#FFE4F0', color: '#b5306e' }}>memories 💕</span>
        <span className="tag" style={{ background: '#EDD8FF', color: '#8040a0' }}>forever 🌸</span>
        <span className="tag" style={{ background: '#FFF8D0', color: '#a07000' }}>golden ✨</span>
      </div>
    </div>
  )
}

/* ===== PAGE 2: HEART COLLAGE ===== */
const HEART_POSITIONS = [
  { left: '26%', top: '15%', delay: '0s', src: '/photo_selfie.jpg' },
  { right: '26%', top: '15%', delay: '0.3s', src: '/photo_hug.jpg' },
  { left: '8%',  top: '40%', delay: '0.6s', src: '/photo_away.jpg' },
  { right: '8%', top: '40%', delay: '0.9s', src: '/photo_side.jpg' },
  { left: '50%', top: '68%', transform: 'translateX(-50%)', delay: '1.2s', src: '/photo_chibi.jpg' }
]

export function PageTwoLeft({ onImageClick }) {
  return (
    <div className="page page-left" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <div className="page-heading">Our Favorite Moments 💕</div>
      <div className="page-subheading">five little worlds in one big heart</div>

      <div className="heart-cluster">
        <div className="heart-bg-icon">💗</div>
        {HEART_POSITIONS.map((pos, i) => (
          <div
            key={i}
            className="heart-photo"
            style={{ 
              left: pos.left, 
              top: pos.top, 
              right: pos.right,
              transform: pos.transform,
              animationDelay: pos.delay, 
              animationDuration: (2 + i * 0.3) + 's',
              cursor: 'zoom-in'
            }}
            onClick={(e) => {
              e.stopPropagation()
              if (onImageClick) {
                const labels = {
                  '/photo_selfie.jpg': 'Our favorite selfie together 🥺💖',
                  '/photo_hug.jpg': 'That warm, cozy hug from behind 🧸💕',
                  '/photo_away.jpg': 'A beautiful moment captured forever ✨🌸',
                  '/photo_side.jpg': 'Every side of you is absolutely wonderful 🌷💫',
                  '/photo_chibi.jpg': 'My favorite chibi art collage of you! 🎨💝'
                };
                onImageClick(pos.src, labels[pos.src] || 'Memory')
              }
            }}
          >
            <img src={pos.src} alt={`collage-${i}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', gap: 10, marginTop: 10, justifyContent: 'center' }}>
        {['💕','💗','🩷','✨','🌸'].map((e, i) => (
          <span
            key={i}
            className="floating-icon"
            style={{ fontSize: 16 + (i % 3) * 4, animationDelay: i * 0.35 + 's', animationDuration: (1.8 + i * 0.25) + 's' }}
          >
            {e}
          </span>
        ))}
      </div>
    </div>
  )
}

export function PageTwoRight() {
  return (
    <div className="page page-right" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 8 }}>
      <Doodle emoji="✨" style={{ top: 8, right: 12 }} />
      <Doodle emoji="💫" style={{ bottom: 10, right: 12 }} />
      
      <QuoteCard>
        "In all the world, there is no heart for us like yours. In all the world, there is no love for you like ours. 💕"
      </QuoteCard>

      <div className="caption-text" style={{ color: '#b5306e', fontSize: 'clamp(12px,1.9vw,15px)', fontWeight: 'bold', margin: '2px 0 0' }}>
        Our Promises To You 📜
      </div>

      <div className="emotional-promises-list" style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        <div className="promise-item" style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
          <span style={{ fontSize: 18, lineHeight: 1.2 }}>🌸</span>
          <span style={{ fontFamily: "'Caveat', cursive", fontSize: 14, color: '#5C3D5E', lineHeight: 1.3 }}>
            To stay by your side, celebrating your joy and keeping you warm through every season of life.
          </span>
        </div>
        <div className="promise-item" style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
          <span style={{ fontSize: 18, lineHeight: 1.2 }}>⭐</span>
          <span style={{ fontFamily: "'Caveat', cursive", fontSize: 14, color: '#5C3D5E', lineHeight: 1.3 }}>
            To cherish all the late-night talks and secrets we've shared under the quiet starry skies.
          </span>
        </div>
        <div className="promise-item" style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
          <span style={{ fontSize: 18, lineHeight: 1.2 }}>💕</span>
          <span style={{ fontFamily: "'Caveat', cursive", fontSize: 14, color: '#5C3D5E', lineHeight: 1.3 }}>
            To hold onto this beautiful bond, making sure you always know how deeply loved you are.
          </span>
        </div>
        <div className="promise-item" style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
          <span style={{ fontSize: 18, lineHeight: 1.2 }}>💕</span>
          <span style={{ fontFamily: "'Caveat', cursive", fontSize: 14, color: '#5C3D5E', lineHeight: 1.3 }}>
            To turn every ordinary laughter and silly picture into a memory we'll treasure forever.
          </span>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginTop: 2 }}>
        <div style={{ background: 'linear-gradient(135deg,#FFE4F0,#EDD8FF)', borderRadius: 10, padding: '6px 10px' }}>
          <div style={{ fontFamily: "'Caveat', cursive", fontSize: 12, color: '#8040a0', fontWeight: 'bold' }}>📍 The places we've been</div>
          <div style={{ fontFamily: "'Caveat', cursive", fontSize: 11, color: '#b5306e', opacity: 0.9 }}>every corner of the world is warmer because we shared it 🌍</div>
        </div>
        <div style={{ background: 'linear-gradient(135deg,#FFF8D0,#FFE4F0)', borderRadius: 10, padding: '6px 10px' }}>
          <div style={{ fontFamily: "'Caveat', cursive", fontSize: 12, color: '#a07000', fontWeight: 'bold' }}>✨ The laughs we've shared</div>
          <div style={{ fontFamily: "'Caveat', cursive", fontSize: 11, color: '#c06000', opacity: 0.9 }}>endless giggles that healed our hearts when we needed it most 😂💛</div>
        </div>
      </div>
    </div>
  )
}

/* ===== PAGE 3: POLAROIDS ===== */
const POLAROIDS_LEFT = [
  { w: '44%', top: '2%',  left: '2%',   rotate: '-6deg', cap: 'magic sunset 🌅', src: '/photo_away.jpg' },
  { w: '42%', top: '6%',  right: '2%',  rotate: '5deg',  cap: 'bff forever 💕', src: '/photo_selfie.jpg' },
  { w: '46%', bottom: '4%', left: '8%', rotate: '3deg',  cap: 'chibi art grid 🎨', src: '/photo_chibi.jpg' }
]
const POLAROIDS_RIGHT = [
  { w: '48%', top: '4%',  right: '4%',  rotate: '-4deg', cap: 'warmest hug 🧸', src: '/photo_hug.jpg' },
  { w: '46%', bottom: '2%', left: '4%', rotate: '6deg',  cap: 'elegant side view 🌷', src: '/photo_side.jpg' }
]

function PolaroidCard({ style, rotate, width, cap, src, onImageClick }) {
  return (
    <div
      className="polaroid-card"
      style={{ ...style, width, transform: `rotate(${rotate})`, cursor: 'zoom-in' }}
      onClick={(e) => {
        e.stopPropagation()
        if (onImageClick) onImageClick(src, cap)
      }}
    >
      <div className="polaroid-img">
        <img src={src} alt={cap} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      </div>
      <div className="polaroid-caption">{cap}</div>
    </div>
  )
}

export function PageThreeLeft({ onImageClick }) {
  return (
    <div className="page page-left" style={{ position: 'relative' }}>
      <div className="page-heading" style={{ position: 'relative', zIndex: 5 }}>Our Adventures 🌸</div>
      <Doodle emoji="💫" style={{ top: 38, right: 12 }} />
      <Doodle emoji="🌟" style={{ bottom: 12, right: 8 }} />
      <div style={{ position: 'relative', height: 'calc(100% - 44px)' }}>
        {POLAROIDS_LEFT.map((p, i) => (
          <PolaroidCard
            key={i}
            style={{ top: p.top, bottom: p.bottom, left: p.left, right: p.right }}
            rotate={p.rotate}
            width={p.w}
            cap={p.cap}
            src={p.src}
            onImageClick={onImageClick}
          />
        ))}
      </div>
    </div>
  )
}

function TypewriterText({ text, active, delay = 35 }) {
  const [displayed, setDisplayed] = useState('')

  useEffect(() => {
    if (!active) {
      setDisplayed('')
      return
    }
    let idx = 0
    setDisplayed('')
    const timer = setInterval(() => {
      setDisplayed(text.substring(0, idx + 1))
      idx++
      if (idx >= text.length) {
        clearInterval(timer)
      }
    }, delay)

    return () => clearInterval(timer)
  }, [text, active, delay])

  return <span>{displayed}</span>
}

function SecretLetter() {
  const [open, setOpen] = useState(false)
  const [speaking, setSpeaking] = useState(false)

  useEffect(() => {
    return () => {
      if (typeof window !== 'undefined' && window.speechSynthesis) {
        window.speechSynthesis.cancel()
      }
    }
  }, [])

  const playVoiceNote = (e) => {
    e.stopPropagation()
    if (typeof window === 'undefined' || !window.speechSynthesis) {
      console.warn("Speech synthesis not supported in this browser.")
      return
    }
    try {
      if (speaking) {
        window.speechSynthesis.cancel()
        setSpeaking(false)
        return
      }
      window.speechSynthesis.cancel()
      const speech = new SpeechSynthesisUtterance(
        "Happy Birthday, Pranathi! You are the most wonderful friend, and we hope this surprise brings a giant smile to your face. Let's make many more memories together!"
      );
      speech.pitch = 1.35; // cute high-pitched tone
      speech.rate = 0.95;
      speech.onend = () => setSpeaking(false)
      speech.onerror = () => setSpeaking(false)
      
      setSpeaking(true)
      window.speechSynthesis.speak(speech)
    } catch (err) {
      console.warn("Speech synthesis error", err)
      setSpeaking(false)
    }
  }

  return (
    <div className={`secret-envelope-wrapper ${open ? 'opened' : ''}`}>
      <div className="envelope" onClick={() => setOpen(prev => !prev)}>
        <div className="envelope-flap" />
        <div className="envelope-pocket">
          <span className="heart-seal">❤️</span>
        </div>
        <div className="envelope-paper">
          <div className="paper-note">
            <h4 style={{ fontFamily: "'Caveat', cursive", color: '#b5306e', fontSize: 16, marginBottom: 2 }}>For Pranathi 🌸</h4>
            <p style={{ fontFamily: "'Caveat', cursive", fontSize: 13, color: '#5C3D5E', lineHeight: 1.25, margin: '2px 0 6px', minHeight: '50px' }}>
              <TypewriterText 
                active={open} 
                text="You are our absolute favorite human. Thank you for always listening to our silly rants, sharing late-night snacks, and making every ordinary day feel like an adventure! 🌸✨" 
              />
            </p>
            {typeof window !== 'undefined' && window.speechSynthesis && (
              <button className="voice-note-btn" onClick={playVoiceNote} style={{
                background: speaking ? '#b5306e' : '#F472B6',
                color: 'white',
                border: 'none',
                borderRadius: '20px',
                padding: '4px 10px',
                fontSize: '11px',
                fontFamily: "'Nunito', sans-serif",
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                boxShadow: '0 2px 5px rgba(244,114,182,0.3)',
                margin: '0 auto'
              }}>
                {speaking ? '🔊 Playing...' : '🎙️ Voice Note'}
              </button>
            )}
          </div>
        </div>
      </div>
      <div className="envelope-caption">
        {open ? '✦ click to fold letter ✦' : '✦ click to open secret letter ✉️ ✦'}
      </div>
    </div>
  )
}

export function PageThreeRight({ onImageClick }) {
  return (
    <div className="page page-right" style={{ position: 'relative' }}>
      <Doodle emoji="🌸" style={{ top: 10, left: 10 }} />
      <FloatHeart style={{ top: '15%', right: '10%' }} />
      <div style={{ position: 'relative', height: '56%', marginTop: 8 }}>
        {POLAROIDS_RIGHT.map((p, i) => (
          <PolaroidCard
            key={i}
            style={{ top: p.top, bottom: p.bottom, left: p.left, right: p.right }}
            rotate={p.rotate}
            width={p.w}
            cap={p.cap}
            src={p.src}
            onImageClick={onImageClick}
          />
        ))}
      </div>
      <SecretLetter />
    </div>
  )
}

/* ===== PAGE 4: VIDEO ===== */
export function PageFourFull({ onReset }) {
  return (
    <div className="video-spread-inner">
      <div style={{ fontFamily: "'Playfair Display', serif", fontStyle: 'italic', fontSize: 'clamp(14px,2.2vw,22px)', color: '#b5306e', textAlign: 'center' }}>
        A Message Just For You 🎬
      </div>

      <div className="video-frame">
        <video 
          src="https://assets.mixkit.co/videos/preview/mixkit-starry-night-sky-background-987-large.mp4" 
          poster="/photo_selfie.jpg"
          controls 
          loop 
          muted 
          autoPlay 
          playsInline
        />
      </div>

      <div className="final-message">Thank you for being part of my life 💖</div>

      <div className="floating-row">
        {['💕','✨','🌸','💫','🩷','⭐','💖'].map((e, i) => (
          <span
            key={i}
            className="floating-icon"
            style={{ fontSize: 16 + (i % 3) * 4, animationDelay: i * 0.3 + 's', animationDuration: (1.6 + i * 0.2) + 's' }}
          >
            {e}
          </span>
        ))}
      </div>

      <button className="reset-book-btn" onClick={onReset}>
        Close Book & Re-read 📖
      </button>
    </div>
  )
}
