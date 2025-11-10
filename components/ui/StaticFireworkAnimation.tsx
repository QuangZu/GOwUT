'use client'

import { useEffect, useState } from 'react'

interface FireworkParticle {
  id: number
  left: string
  top: string
  size: string
  color: string
  animationDelay: string
  animationDuration: string
}

const StaticFireworkAnimation = () => {
  const [particles, setParticles] = useState<FireworkParticle[]>([])

  useEffect(() => {
    const colors = [
      'var(--primary)',
      'var(--secondary)', 
      'var(--accent)',
      'var(--success)',
      'var(--highlight)',
      'var(--warning)'
    ]
    
    const newParticles: FireworkParticle[] = []
    for (let i = 0; i < 20; i++) {
      newParticles.push({
        id: i,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        size: `${Math.random() * 3 + 1}px`,
        color: colors[Math.floor(Math.random() * colors.length)],
        animationDelay: `${Math.random() * 5}s`,
        animationDuration: `${Math.random() * 3 + 2}s`
      })
    }
    
    setParticles(newParticles)
  }, [])

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute rounded-full animate-float-pulse"
          style={{
            left: particle.left,
            top: particle.top,
            width: particle.size,
            height: particle.size,
            backgroundColor: particle.color,
            opacity: 0.6,
            animationDelay: particle.animationDelay,
            animationDuration: particle.animationDuration
          }}
        />
      ))}
    </div>
  )
}

export default StaticFireworkAnimation