import React from 'react'
import Scrapbook from './Scrapbook'
import { useParticles } from '../hooks/useParticles'

export default function ScrapbookScene({ visible }) {
  const { tapHeart } = useParticles()

  const onSceneClick = (e) => {
    if (e.target.closest('.book-sheet') || e.target.closest('.ui-btn') || e.target.closest('.scrapbook-instructions')) return
    tapHeart(e.clientX, e.clientY)
  }

  return (
    <div
      className={`scene scene-book${visible ? ' visible' : ''}`}
      onClick={onSceneClick}
    >
      <Scrapbook />
    </div>
  )
}
