import React, { useState, useEffect } from 'react'

/* ===== REUSABLE BITS ===== */
function PhotoSlot({ src, icon = '📸', label = 'add your photo', style = {} }) {
  return (
    <div className="photo-slot" style={style}>
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
export function PageOneLeft() {
  return (
    <div className="page page-left" style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
      <Tape style={{ top: -5, left: '40%', transform: 'rotate(-4deg)' }} />
      <Doodle emoji="🌸" style={{ top: 8, right: 10, fontSize: 16 }} />
      <Doodle emoji="⭐" style={{ bottom: 14, left: 8, fontSize: 13 }} />
      <Doodle emoji="💫" style={{ top: '52%', left: 6, fontSize: 11 }} />

      <div className="page-heading">Our Beginning ✨</div>
      <PhotoSlot src="/illust_cherry_blossom.png" label="cherry blossom picnic" style={{ height: '50%', flexShrink: 0 }} />
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

export function PageOneRight() {
  return (
    <div className="page page-right" style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
      <Tape style={{ top: -5, right: '28%', transform: 'rotate(5deg)' }} />
      <Doodle emoji="💜" style={{ top: 8,  left: 10, fontSize: 16 }} />
      <Doodle emoji="🌙" style={{ bottom: 14, right: 10, fontSize: 13 }} />

      <div className="page-heading" style={{ color: '#8040a0' }}>My Favorite Memory ✨</div>
      <PhotoSlot src="/illust_starry_night.png" label="starry night camp" style={{ height: '50%', flexShrink: 0 }} />
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
  { left: '50%', top: '2%',  transform: 'translateX(-50%)', delay: '0s', src: '/illust_cafe.png' },
  { left: '8%',  top: '22%', delay: '0.3s', src: '/illust_roadtrip.png' },
  { right: '8%', top: '22%', delay: '0.6s', src: '/illust_beach.png' },
  { left: '20%', top: '62%', delay: '0.9s', src: '/illust_cherry_blossom.png' },
  { right: '20%',top: '62%', delay: '1.2s', src: '/illust_starry_night.png' }
]

export function PageTwoLeft() {
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
              animationDuration: (2 + i * 0.3) + 's' 
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
    <div className="page page-right" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 10 }}>
      <Doodle emoji="🌸" style={{ top: 10, right: 10 }} />
      <Doodle emoji="⭐" style={{ bottom: 12, left: 10 }} />
      <FloatHeart style={{ top: '20%', right: '12%', animationDelay: '0.5s' }} />
      <FloatHeart style={{ bottom: '30%', left: '8%', animationDelay: '1.2s' }} />

      <QuoteCard>
        "In all the world, there is no heart for us like yours. In all the world, there is no love for you like ours. 💕"
      </QuoteCard>

      <div className="caption-text" style={{ color: '#b5306e', fontSize: 'clamp(11px,1.7vw,14px)' }}>
        Every single photo tells a story only we know… 🥺
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
        <div style={{ background: 'linear-gradient(135deg,#FFE4F0,#EDD8FF)', borderRadius: 10, padding: '8px 12px' }}>
          <div style={{ fontFamily: "'Caveat', cursive", fontSize: 13, color: '#8040a0' }}>📍 The places we've been</div>
          <div style={{ fontFamily: "'Caveat', cursive", fontSize: 12, color: '#b5306e', opacity: 0.8 }}>every corner is a memory 🌍</div>
        </div>
        <div style={{ background: 'linear-gradient(135deg,#FFF8D0,#FFE4F0)', borderRadius: 10, padding: '8px 12px' }}>
          <div style={{ fontFamily: "'Caveat', cursive", fontSize: 13, color: '#a07000' }}>✨ The laughs we've shared</div>
          <div style={{ fontFamily: "'Caveat', cursive", fontSize: 12, color: '#c06000', opacity: 0.8 }}>can't stop, won't stop 😂💛</div>
        </div>
      </div>
    </div>
  )
}

/* ===== PAGE 3: POLAROIDS ===== */
const POLAROIDS_LEFT = [
  { w: '44%', top: '2%',  left: '2%',   rotate: '-6deg', cap: 'beach day ☀️', src: '/illust_beach.png' },
  { w: '42%', top: '6%',  right: '2%',  rotate: '5deg',  cap: 'bff forever 💕', src: '/illust_cherry_blossom.png' },
  { w: '46%', bottom: '4%', left: '8%', rotate: '3deg',  cap: 'that night out ✨', src: '/illust_starry_night.png' }
]
const POLAROIDS_RIGHT = [
  { w: '48%', top: '4%',  right: '4%',  rotate: '-4deg', cap: 'silly moments 😝', src: '/illust_roadtrip.png' },
  { w: '46%', bottom: '2%', left: '4%', rotate: '6deg',  cap: 'always together 🌷', src: '/illust_cafe.png' }
]

function PolaroidCard({ style, rotate, width, cap, src }) {
  return (
    <div
      className="polaroid-card"
      style={{ ...style, width, transform: `rotate(${rotate})` }}
    >
      <div className="polaroid-img">
        <img src={src} alt={cap} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      </div>
      <div className="polaroid-caption">{cap}</div>
    </div>
  )
}

export function PageThreeLeft() {
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

  const playVoiceNote = (e) => {
    e.stopPropagation()
    try {
      if (speaking) {
        window.speechSynthesis.cancel()
        setSpeaking(false)
        return
      }
      window.speechSynthesis.cancel()
      const speech = new SpeechSynthesisUtterance(
        "Happy Birthday, Bhavya! You are the most wonderful friend, and we hope this surprise brings a giant smile to your face. Let's make many more memories together!"
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
            <h4 style={{ fontFamily: "'Caveat', cursive", color: '#b5306e', fontSize: 16, marginBottom: 2 }}>For Bhavya 🌸</h4>
            <p style={{ fontFamily: "'Caveat', cursive", fontSize: 13, color: '#5C3D5E', lineHeight: 1.25, margin: '2px 0 6px', minHeight: '50px' }}>
              <TypewriterText 
                active={open} 
                text="You are our absolute favorite human. Thank you for always listening to our silly rants, sharing late-night snacks, and making every ordinary day feel like an adventure! 🌸✨" 
              />
            </p>
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
          </div>
        </div>
      </div>
      <div className="envelope-caption">
        {open ? '✦ click to fold letter ✦' : '✦ click to open secret letter ✉️ ✦'}
      </div>
    </div>
  )
}

export function PageThreeRight() {
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
          poster="/illust_starry_night.png"
          controls 
          loop 
          muted 
          autoPlay 
          playsInline
        />
      </div>

      <div className="final-message">Thank you for being part of our lives 💖</div>

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
