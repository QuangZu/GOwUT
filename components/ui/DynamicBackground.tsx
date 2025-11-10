'use client'

import React, { useEffect, useRef } from 'react'

interface DynamicBackgroundProps {
  children: React.ReactNode
}

const DynamicBackground: React.FC<DynamicBackgroundProps> = ({ children }) => {
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

    // Create animated dots
    const dots: Array<{
      x: number
      y: number
      size: number
      speedX: number
      speedY: number
      opacity: number
      baseOpacity: number
      color: string
    }> = []

    // Initialize dots with different properties
    const colors = [
      'rgba(58, 76, 145, 0.5)', // primary
      'rgba(159, 175, 54, 0.5)', // secondary
      'rgba(241, 217, 118, 0.5)', // accent
      'rgba(243, 119, 119, 0.5)', // highlight
      'rgba(161, 56, 122, 0.5)'  // success
    ]

    for (let i = 0; i < 50; i++) {
      dots.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 3 + 1,
        speedX: (Math.random() - 0.5) * 0.5,
        speedY: (Math.random() - 0.5) * 0.5,
        opacity: Math.random() * 0.5 + 0.1,
        baseOpacity: Math.random() * 0.5 + 0.1,
        color: colors[Math.floor(Math.random() * colors.length)]
      })
    }

    // Cursor interaction variables
    let mouseX = -1000
    let mouseY = -1000

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
    }

    window.addEventListener('mousemove', handleMouseMove)

    // Animation loop
    let animationFrameId: number

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw and update dots
      dots.forEach(dot => {
        // Wiggle movement
        dot.x += dot.speedX + (Math.random() - 0.5) * 0.3
        dot.y += dot.speedY + (Math.random() - 0.5) * 0.3

        // Boundary check to keep dots within canvas
        if (dot.x < 0) dot.x = canvas.width
        if (dot.x > canvas.width) dot.x = 0
        if (dot.y < 0) dot.y = canvas.height
        if (dot.y > canvas.height) dot.y = 0

        // Flickering effect
        dot.opacity = dot.baseOpacity + Math.sin(Date.now() * 0.001 + dot.x * 0.01) * 0.1

        // Draw dot
        ctx.beginPath()
        ctx.arc(dot.x, dot.y, dot.size, 0, Math.PI * 2)
        ctx.fillStyle = dot.color.replace('0.5', dot.opacity.toString())
        ctx.fill()

        // Cursor interaction - create light effect near cursor
        const distanceToCursor = Math.sqrt(
          Math.pow(dot.x - mouseX, 2) + Math.pow(dot.y - mouseY, 2)
        )
        
        if (distanceToCursor < 150) {
          const gradient = ctx.createRadialGradient(
            dot.x, dot.y, 0,
            dot.x, dot.y, 150
          )
          gradient.addColorStop(0, dot.color.replace('0.5', (dot.opacity * 3).toString()))
          gradient.addColorStop(1, dot.color.replace('0.5', dot.opacity.toString()))
          
          ctx.beginPath()
          ctx.arc(dot.x, dot.y, 3, 0, Math.PI * 2)
          ctx.fillStyle = gradient
          ctx.fill()
        }
      })

      // Draw light source around cursor
      if (mouseX !== -1000 && mouseY !== -1000) {
        const gradient = ctx.createRadialGradient(
          mouseX, mouseY, 0,
          mouseX, mouseY, 200
        )
        gradient.addColorStop(0, 'rgba(58, 76, 145, 0.2)')
        gradient.addColorStop(1, 'rgba(58, 76, 145, 0)')

        ctx.fillStyle = gradient
        ctx.fillRect(0, 0, canvas.width, canvas.height)
      }

      animationFrameId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      window.removeEventListener('mousemove', handleMouseMove)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      <canvas
        ref={canvasRef}
        className="absolute top-0 left-0 w-full h-full pointer-events-none"
      />
      <div className="relative z-10">
        {children}
      </div>
    </div>
  )
}

export default DynamicBackground