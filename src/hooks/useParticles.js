import { useCallback } from 'react'

const CONFETTI_COLORS = [
  '#F472B6','#C084FC','#FFB6C1','#F9D77E',
  '#BAE6FD','#FF6B9D','#A78BFA','#FCA5A5','#6EE7B7'
]

export function useParticles() {
  const burst = useCallback((ox, oy) => {
    // Confetti
    for (let i = 0; i < 90; i++) {
      const el = document.createElement('div')
      el.className = 'particle confetti-p'
      const size = Math.random() * 10 + 5
      const xDrift = (Math.random() - 0.5) * 320
      const color = CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)]
      el.style.cssText = `
        left:${ox + xDrift}px;
        top:${oy - 10}px;
        width:${size}px;
        height:${size}px;
        background:${color};
        transform:rotate(${Math.random() * 360}deg);
        animation-duration:${Math.random() * 1.4 + 0.9}s;
        animation-delay:${Math.random() * 0.25}s;
        border-radius:${Math.random() > 0.5 ? '50%' : '3px'};
      `
      document.body.appendChild(el)
      setTimeout(() => el.remove(), 3000)
    }

    // Sparkles
    for (let i = 0; i < 16; i++) {
      const el = document.createElement('div')
      el.className = 'particle sparkle-p'
      el.textContent = ['✦','✧','★','⭐','✨'][Math.floor(Math.random() * 5)]
      el.style.cssText = `
        left:${ox + (Math.random() - 0.5) * 140}px;
        top:${oy + (Math.random() - 0.5) * 140}px;
        animation-delay:${Math.random() * 0.35}s;
        animation-duration:1.1s;
        color:#F9D77E;
        text-shadow:0 0 8px #F9D77E;
      `
      document.body.appendChild(el)
      setTimeout(() => el.remove(), 2000)
    }

    // Cream splats
    for (let i = 0; i < 8; i++) {
      const el = document.createElement('div')
      el.className = 'particle cream-p'
      const size = Math.random() * 18 + 8
      el.style.cssText = `
        left:${ox + (Math.random() - 0.5) * 80}px;
        top:${oy + (Math.random() - 0.5) * 80}px;
        width:${size}px;
        height:${size}px;
        animation-delay:${Math.random() * 0.15}s;
        animation-duration:0.55s;
      `
      document.body.appendChild(el)
      setTimeout(() => el.remove(), 1500)
    }
  }, [])

  const tapHeart = useCallback((x, y) => {
    const hearts = ['💕','💖','💗','🩷','✨','🌸','💫']
    const el = document.createElement('div')
    el.className = 'tap-heart'
    el.textContent = hearts[Math.floor(Math.random() * hearts.length)]
    el.style.cssText = `left:${x - 12}px; top:${y - 20}px;`
    document.body.appendChild(el)
    setTimeout(() => el.remove(), 1300)
  }, [])

  return { burst, tapHeart }
}
