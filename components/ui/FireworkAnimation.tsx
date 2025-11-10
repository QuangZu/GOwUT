'use client'

import { useEffect, useRef } from 'react'

interface CanvasParticle {
  x: number
  y: number
  size: number
  speedX: number
  speedY: number
  opacity: number
  flicker: number
  color: string
  originalColorIndex: number
}

const FireworkAnimation = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    // Function to get theme colors
    const getThemeColors = () => {
      const root = document.documentElement;
      return [
        getComputedStyle(root).getPropertyValue('--primary').trim() || '#8B5CF6',
        getComputedStyle(root).getPropertyValue('--secondary').trim() || '#EC4899',
        getComputedStyle(root).getPropertyValue('--accent').trim() || '#34D399',
        getComputedStyle(root).getPropertyValue('--highlight').trim() || '#FBBF24',
        getComputedStyle(root).getPropertyValue('--success').trim() || '#10B981',
        getComputedStyle(root).getPropertyValue('--warning').trim() || '#F59E0B',
      ].map(color => {
        // Convert hex to rgba with opacity if it's in hex format
        const hex = color.replace('#', '');
        if (hex.length === 6) {
          const r = parseInt(hex.substring(0, 2), 16);
          const g = parseInt(hex.substring(2, 4), 16);
          const b = parseInt(hex.substring(4, 6), 16);
          return `rgba(${r}, ${g}, ${b}, 0.8)`;
        }
        // If it's already in rgb/rgba format, adjust alpha
        if (color.includes('rgb(')) {
          return color.replace('rgb(', 'rgba(').replace(')', ', 0.8)');
        }
        if (color.includes('rgba(')) {
          return color.replace(/[\d.]+\)$/, '0.8)');
        }
        return color; // fallback
      });
    };

    // Store original color indices for each particle
    let particles: CanvasParticle[] = []

    // Create initial particles
    const initParticles = () => {
      particles = []
      const colors = getThemeColors();
      for (let i = 0; i < 150; i++) { // Increased number of particles for denser effect
        const colorIndex = Math.floor(Math.random() * colors.length);
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 1.8 + 0.4, // Slightly larger size
          speedX: (Math.random() - 0.5) * 0.4, // Slightly faster movement for more dynamic effect
          speedY: (Math.random() - 0.5) * 0.4, // Slightly faster movement for more dynamic effect
          opacity: Math.random() * 0.7 + 0.2, // Increased opacity for better visibility
          flicker: Math.random() * 0.08, // Increased flickering slightly for more sparkly effect
          color: colors[colorIndex],
          originalColorIndex: colorIndex,
        })
      }
    }

    initParticles()

    // Animation loop
    let animationFrameId: number

    const animate = () => {
      if (!ctx) return

      // Clear canvas with a more opaque overlay to reduce trail effect
      ctx.fillStyle = 'rgba(0, 0, 0, 0.2)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Update and draw particles
      particles.forEach((particle) => {
        // Update position with very subtle movement to minimize trails
        particle.x += particle.speedX
        particle.y += particle.speedY

        // Very subtle opacity fluctuation
        particle.opacity += (Math.random() - 0.5) * particle.flicker
        particle.opacity = Math.max(0.02, Math.min(0.5, particle.opacity))

        // Boundary check - wrap around
        if (particle.x > canvas.width) particle.x = 0
        if (particle.x < 0) particle.x = canvas.width
        if (particle.y > canvas.height) particle.y = 0
        if (particle.y < 0) particle.y = canvas.height

        // Draw particle using current theme color
        const currentColors = getThemeColors();
        const currentColor = currentColors[particle.originalColorIndex] || particle.color;

        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fillStyle = currentColor.replace('0.8', particle.opacity.toString())
        ctx.fill()
      })

      animationFrameId = requestAnimationFrame(animate)
    }

    animate()

    // Clean up
    return () => {
      window.removeEventListener('resize', resizeCanvas)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ background: 'transparent' }}
    />
  )
}

export default FireworkAnimation