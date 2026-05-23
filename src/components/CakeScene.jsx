import React, { useState, useRef, useCallback, useEffect } from 'react'
import ChibiCharacter from './ChibiCharacter'
import CakeSVG from './CakeSVG'
import { useParticles } from '../hooks/useParticles'
import { playConfettiPop, playChime } from '../utils/audio'
import { FRIEND_NAME } from '../constants'

const FLOATER_EMOJIS = ['💖','🌸','✨','💕','🎈','⭐','💫','🌷','🎀','🦋','🍰','🎊']
const BALLOONS       = ['🎈','💗','⭐','🎈']
const DANCERS        = ['🐰','🐻','🐱','🐣'] // Cuter chibi animal dancers

const BALLOON_POSITIONS = [
  { left: '4%',  top: '8%'  },
  { right: '4%', top: '6%'  },
  { left: '18%', top: '3%'  },
  { right: '18%',top: '10%' }
]
const DANCER_POSITIONS = [
  { left: '3%',  bottom: '5%' },
  { right: '3%', bottom: '5%' },
  { left: '12%', bottom: '10%'},
  { right: '12%',bottom: '10%'}
]
export default function CakeScene({ onNext, onSlice }) {
  const [visible,   setVisible]   = useState(false)
  const [sliced,    setSliced]    = useState(false)
  const [showText,  setShowText]  = useState(false)
  const [showBtn,   setShowBtn]   = useState(false)
  const [eyeOffset, setEyeOffset] = useState({ x: 0, y: 0 })
  const [floaters,  setFloaters]  = useState([])
  const [showDeco,  setShowDeco]  = useState(false)
  const chibiRef  = useRef(null)
  const dragRef   = useRef({ down: false, startX: 0, startY: 0 })
  const floaterId = useRef(0)
  const timerRef  = useRef([])
  const { burst, tapHeart } = useParticles()
  // Fade in
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 80)
    return () => clearTimeout(t)
  }, [])
  // Eye tracking & Head rotation for mouse
  const handleMouseMove = useCallback((e) => {
    if (!chibiRef.current) return
    const rect = chibiRef.current.getBoundingClientRect()
    const cx   = rect.left + rect.width  / 2
    const cy   = rect.top  + rect.height / 2
    const dx   = (e.clientX - cx) / window.innerWidth
    const dy   = (e.clientY - cy) / window.innerHeight
    setEyeOffset({ x: dx * 5, y: dy * 3 })
    if (chibiRef.current) {
      chibiRef.current.style.transform = `rotate(${dx * 5}deg)`
    }
  }, [])

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [handleMouseMove])

  const handleTouchMove = useCallback((e) => {
    const t = e.touches?.[0]
    if (!t || !chibiRef.current) return
    const rect = chibiRef.current.getBoundingClientRect()
    const cx   = rect.left + rect.width  / 2
    const cy   = rect.top  + rect.height / 2
    const dx   = (t.clientX - cx) / window.innerWidth
    const dy   = (t.clientY - cy) / window.innerHeight
    setEyeOffset({ x: dx * 5, y: dy * 3 })
    chibiRef.current.style.transform = `rotate(${dx * 5}deg)`
  }, [])

  // Floater loop
  useEffect(() => {
    let alive = true
    function addFloater() {
      if (!alive) return
      const id = ++floaterId.current
      const emoji = FLOATER_EMOJIS[Math.floor(Math.random() * FLOATER_EMOJIS.length)]
      const left  = Math.random() * 88 + '%'
      const dur   = Math.random() * 3 + 3
      const size  = Math.random() * 12 + 14

      setFloaters(prev => [...prev.slice(-30), { id, emoji, left, dur, size }])
      setTimeout(() => setFloaters(prev => prev.filter(f => f.id !== id)), dur * 1000 + 500)

      timerRef.current.push(setTimeout(addFloater, Math.random() * 500 + 250))
    }
    addFloater()
    return () => { alive = false; timerRef.current.forEach(clearTimeout) }
  }, [])

  // Cake slice logic
  const doSlice = useCallback((x, y) => {
    if (sliced) return
    setSliced(true)
    burst(x, y)
    playConfettiPop()
    playChime()
    if (onSlice) onSlice()
    setTimeout(() => setShowText(true), 550)
    setTimeout(() => { setShowBtn(true); setShowDeco(true) }, 1100)
  }, [sliced, burst, onSlice])

  const onCakePtrDown = (e) => {
    if (sliced) return
    const clientX = e.clientX ?? e.touches?.[0]?.clientX ?? 0
    const clientY = e.clientY ?? e.touches?.[0]?.clientY ?? 0
    dragRef.current = {
      down: true,
      startX: clientX,
      startY: clientY
    }
  }

  const onCakePtrMove = (e) => {
    if (!dragRef.current.down || sliced) return
    const clientX = e.clientX ?? e.touches?.[0]?.clientX ?? 0
    const clientY = e.clientY ?? e.touches?.[0]?.clientY ?? 0
    const dx = clientX - dragRef.current.startX
    const dy = clientY - dragRef.current.startY
    const dist = Math.sqrt(dx * dx + dy * dy)
    // Slices cake mid-drag/swipe if movement exceeds 20px
    if (dist > 20) {
      doSlice(clientX, clientY)
      dragRef.current.down = false
    }
  }

  const onCakePtrUp = (e) => {
    if (!dragRef.current.down || sliced) return
    const cx = e.clientX ?? e.changedTouches?.[0]?.clientX ?? window.innerWidth / 2
    const cy = e.clientY ?? e.changedTouches?.[0]?.clientY ?? window.innerHeight / 2
    doSlice(cx, cy)
    dragRef.current.down = false
  }

  // Tap hearts on click anywhere in scene
  const onSceneClick = (e) => {
    if (!e.target || typeof e.target.closest !== 'function') return
    // Only spawn hearts if user didn't click/tap the cake, button or back button
    if (e.target.closest('.cake-container') || e.target.closest('.next-scene-btn') || e.target.closest('.ui-btn')) return;
    tapHeart(e.clientX, e.clientY)
  }

  return (
    <div
      className={`scene scene-cake${visible ? ' visible' : ''}`}
      onClick={onSceneClick}
      onTouchMove={handleTouchMove}
    >
      {/* FLOATERS */}
      {floaters.map(f => (
        <div
          key={f.id}
          className="floater"
          style={{
            left: f.left,
            bottom: '-30px',
            fontSize: f.size + 'px',
            animationDuration: f.dur + 's'
          }}
        >
          {f.emoji}
        </div>
      ))}

      {/* DECO: balloons + dancers after slice */}
      {showDeco && BALLOON_POSITIONS.map((pos, i) => (
        <div
          key={'b' + i}
          className="balloon-el"
          style={{ ...pos, animationDelay: i * 0.25 + 's', animationDuration: (2.5 + i * 0.3) + 's' }}
        >
          {BALLOONS[i]}
        </div>
      ))}
      {showDeco && DANCER_POSITIONS.map((pos, i) => (
        <div
          key={'d' + i}
          className="dancer-el"
          style={{ ...pos, animationDelay: i * 0.2 + 's', animationDuration: (0.55 + i * 0.08) + 's' }}
        >
          {DANCERS[i]}
        </div>
      ))}

      {/* MAIN STAGE */}
      <div className="cake-stage">
        {/* CHIBI */}
        <div className="chibi-container" ref={chibiRef}>
          <ChibiCharacter eyeOffset={eyeOffset} />
        </div>

        {/* CAKE */}
        <div
          onMouseDown={onCakePtrDown}
          onMouseUp={onCakePtrUp}
          onMouseMove={onCakePtrMove}
          onTouchStart={onCakePtrDown}
          onTouchEnd={onCakePtrUp}
          onTouchMove={(e) => {
            e.stopPropagation()
            onCakePtrMove(e)
          }}
        >
          <CakeSVG sliced={sliced} />
        </div>

        {/* HINT */}
        {!sliced && (
          <div style={{
            fontFamily: "'Caveat', cursive",
            fontSize: 'clamp(13px, 2vw, 16px)',
            color: '#c060a0',
            marginTop: '10px',
            opacity: 0.75,
            animation: 'hintBlink 1.6s ease-in-out infinite alternate'
          }}>
            ✦ swipe or click the cake ✦
          </div>
        )}

        {/* BIRTHDAY TEXT */}
        <div className={`birthday-text${showText ? ' show' : ''}`}>
          Happy Birthday, {FRIEND_NAME}! 💖
        </div>

        {/* NEXT BUTTON */}
        <button
          className={`next-scene-btn${showBtn ? ' show' : ''}`}
          onClick={(e) => { e.stopPropagation(); onNext() }}
        >
          Open Memory Book 📖
        </button>
      </div>
    </div>
  )
}
