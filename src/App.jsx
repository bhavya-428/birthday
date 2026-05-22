import React, { useState, useEffect, useRef, useCallback } from 'react'
import CountdownScene from './components/CountdownScene'
import CakeScene from './components/CakeScene'
import ScrapbookScene from './components/ScrapbookScene'
import { startBGM, stopBGM } from './utils/audio'

export const FRIEND_NAME = 'Bhavya'

export default function App() {
  const [scene, setScene] = useState('countdown') // countdown | cake | book
  const [bgmActive, setBgmActive] = useState(false)
  const cursorRef = useRef(null)

  // Custom cursor
  useEffect(() => {
    const move = (e) => {
      if (!cursorRef.current) return
      cursorRef.current.style.left = e.clientX + 'px'
      cursorRef.current.style.top  = e.clientY + 'px'
    }
    const enlarge = () => cursorRef.current?.classList.add('big')
    const shrink  = () => cursorRef.current?.classList.remove('big')

    window.addEventListener('mousemove', move)
    window.addEventListener('mousedown', enlarge)
    window.addEventListener('mouseup',   shrink)
    return () => {
      window.removeEventListener('mousemove', move)
      window.removeEventListener('mousedown', enlarge)
      window.removeEventListener('mouseup',   shrink)
    }
  }, [])

  const toggleBGM = useCallback(() => {
    setBgmActive(prev => {
      if (prev) {
        stopBGM()
      } else {
        startBGM()
      }
      return !prev
    })
  }, [])

  const goToCake = useCallback(() => {
    setScene('cake')
    // Auto start BGM upon entering cake scene (requires user gesture, which they did by clicking/waiting)
    if (!bgmActive) {
      startBGM()
      setBgmActive(true)
    }
  }, [bgmActive])
  
  const goToBook = useCallback(() => setScene('book'), [])

  return (
    <div className={`app-container scene-${scene}`}>
      {/* CUSTOM CURSOR */}
      <div id="custom-cursor" ref={cursorRef} />

      {/* SCENES */}
      {scene === 'countdown' && (
        <CountdownScene
          onStart={() => {
            if (!bgmActive) {
              startBGM()
              setBgmActive(true)
            }
          }}
          onComplete={goToCake}
        />
      )}

      {scene === 'cake' && (
        <CakeScene onNext={goToBook} />
      )}

      {/* Book scene stays mounted once created so state isn't lost */}
      <ScrapbookScene visible={scene === 'book'} />

      {/* UI BUTTONS */}
      {scene !== 'countdown' && (
        <div className="ui-btn-row">
          <button
            className="ui-btn"
            onClick={() => {
              if (scene === 'book') setScene('cake')
              else setScene('countdown')
            }}
          >
            ↩ Back
          </button>
          <button
            className="ui-btn"
            onClick={toggleBGM}
            style={bgmActive ? { background: '#F472B6', color: 'white' } : {}}
          >
            {bgmActive ? '🎵 Music: ON' : '🔇 Music: OFF'}
          </button>
        </div>
      )}
    </div>
  )
}
