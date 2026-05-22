import React, { useEffect, useRef, useState } from 'react'
import { playChime } from '../utils/audio'

function Stars() {
  const stars = useRef([])
  if (!stars.current.length) {
    for (let i = 0; i < 130; i++) {
      stars.current.push({
        id: i,
        left: Math.random() * 100,
        top: Math.random() * 100,
        size: Math.random() * 2.8 + 0.8,
        duration: Math.random() * 3 + 1.5,
        delay: Math.random() * 3
      })
    }
  }
  return (
    <div className="stars-layer">
      {stars.current.map(s => (
        <div
          key={s.id}
          className="star-dot"
          style={{
            left: s.left + '%',
            top: s.top + '%',
            width: s.size + 'px',
            height: s.size + 'px',
            animationDuration: s.duration + 's',
            animationDelay: s.delay + 's'
          }}
        />
      ))}
    </div>
  )
}

export default function CountdownScene({ onStart, onComplete }) {
  const [started, setStarted] = useState(false)
  const [display, setDisplay] = useState('3')
  const [phase, setPhase]     = useState('enter') // enter | exit
  const flashRef = useRef(null)

  useEffect(() => {
    if (!started) return

    const sequence = [
      // [label, enterDelay, exitAfter]
      { label: '3',  enter: 0,    exit: 750  },
      { label: '2',  enter: 1000, exit: 1750 },
      { label: '1',  enter: 2000, exit: 2750 }
    ]

    const timers = []

    sequence.forEach(({ label, enter, exit: exitT }) => {
      timers.push(setTimeout(() => {
        setDisplay(label)
        setPhase('enter')
      }, enter))
      timers.push(setTimeout(() => setPhase('exit'), exitT))
    })

    // Flash + transition
    timers.push(setTimeout(() => {
      playChime()
      if (flashRef.current) flashRef.current.style.opacity = '1'
      setTimeout(() => {
        if (flashRef.current) {
          flashRef.current.style.transition = 'opacity 1s ease'
          flashRef.current.style.opacity = '0'
        }
        onComplete()
      }, 320)
    }, 2900))

    return () => timers.forEach(clearTimeout)
  }, [started, onComplete])

  if (!started) {
    return (
      <div className="scene scene-countdown start-prompt">
        <Stars />
        <div className="start-prompt-content">
          <div className="dreamy-ring">
            <span className="heart-pulse-icon">💖</span>
          </div>
          <h1 className="start-prompt-title">A special surprise for you...</h1>
          <p className="start-prompt-subtitle">crafted with love & memories</p>
          <button className="start-prompt-btn" onClick={() => {
            setStarted(true)
            onStart()
          }}>
            Open Surprise ✨
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="scene scene-countdown">
      <Stars />
      <div
        className={`countdown-number ${phase === 'enter' ? 'num-enter' : 'num-exit'}`}
        key={display}
      >
        {display}
      </div>
      <div className="countdown-subtitle">a surprise awaits you ✦</div>
      <div
        className="flash-overlay"
        ref={flashRef}
        style={{ opacity: 0, transition: 'opacity 0.25s' }}
      />
    </div>
  )
}
