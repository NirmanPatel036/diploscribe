"use client"

import { useEffect, useRef } from "react"
import { useTheme } from "next-themes"

export function HeroAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { theme, resolvedTheme } = useTheme()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Get current theme colors
    const isDark = resolvedTheme === 'dark'
    const gridColor = isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.05)'
    const borderColor = isDark ? '255, 255, 255' : '0, 0, 0'

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio
      canvas.height = canvas.offsetHeight * window.devicePixelRatio
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio)
    }
    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    // Grid configuration
    const gridSize = 60
    const cols = Math.ceil(canvas.offsetWidth / gridSize)
    const rows = Math.ceil(canvas.offsetHeight / gridSize)

    // Border animations
    interface Border {
      x: number
      y: number
      direction: 'right' | 'down' | 'left' | 'up'
      progress: number
      opacity: number
      speed: number
    }

    const borders: Border[] = []
    const borderCount = 1

    // Initialize border at random grid position
    for (let i = 0; i < borderCount; i++) {
      const x = Math.floor(Math.random() * cols)
      const y = Math.floor(Math.random() * rows)
      const directions: Border['direction'][] = ['right', 'down', 'left', 'up']
      
      borders.push({
        x,
        y,
        direction: directions[Math.floor(Math.random() * directions.length)],
        progress: Math.random(),
        opacity: 0.4,
        speed: 0.015
      })
    }

    // Animation loop
    let animationId: number
    const animate = () => {
      ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight)

      // Draw grid
      ctx.strokeStyle = gridColor
      ctx.lineWidth = 1
      for (let x = 0; x <= cols; x++) {
        ctx.beginPath()
        ctx.moveTo(x * gridSize, 0)
        ctx.lineTo(x * gridSize, canvas.offsetHeight)
        ctx.stroke()
      }
      for (let y = 0; y <= rows; y++) {
        ctx.beginPath()
        ctx.moveTo(0, y * gridSize)
        ctx.lineTo(canvas.offsetWidth, y * gridSize)
        ctx.stroke()
      }

      // Draw and update borders
      borders.forEach(border => {
        const startX = border.x * gridSize
        const startY = border.y * gridSize
        
        let x1 = startX, y1 = startY, x2 = startX, y2 = startY

        // Calculate current position based on direction and progress
        switch (border.direction) {
          case 'right':
            x1 = startX
            y1 = startY
            x2 = startX + gridSize * border.progress
            y2 = startY
            break
          case 'down':
            x1 = startX + gridSize
            y1 = startY
            x2 = startX + gridSize
            y2 = startY + gridSize * border.progress
            break
          case 'left':
            x1 = startX + gridSize
            y1 = startY + gridSize
            x2 = startX + gridSize * (1 - border.progress)
            y2 = startY + gridSize
            break
          case 'up':
            x1 = startX
            y1 = startY + gridSize
            x2 = startX
            y2 = startY + gridSize * (1 - border.progress)
            break
        }

        // Draw border segment with gradient
        const gradient = ctx.createLinearGradient(x1, y1, x2, y2)
        gradient.addColorStop(0, `rgba(${borderColor}, 0)`)
        gradient.addColorStop(0.5, `rgba(${borderColor}, ${border.opacity})`)
        gradient.addColorStop(1, `rgba(${borderColor}, 0)`)
        
        ctx.strokeStyle = gradient
        ctx.lineWidth = 2
        ctx.beginPath()
        ctx.moveTo(x1, y1)
        ctx.lineTo(x2, y2)
        ctx.stroke()

        // Update progress
        border.progress += border.speed

        // Move to next segment when complete
        if (border.progress >= 1) {
          border.progress = 0
          
          // Update position and direction
          switch (border.direction) {
            case 'right':
              border.x++
              border.direction = Math.random() > 0.5 ? 'down' : 'up'
              break
            case 'down':
              border.y++
              border.direction = Math.random() > 0.5 ? 'left' : 'right'
              break
            case 'left':
              border.x--
              border.direction = Math.random() > 0.5 ? 'up' : 'down'
              break
            case 'up':
              border.y--
              border.direction = Math.random() > 0.5 ? 'right' : 'left'
              break
          }

          // Wrap around edges
          if (border.x < 0) border.x = cols - 1
          if (border.x >= cols) border.x = 0
          if (border.y < 0) border.y = rows - 1
          if (border.y >= rows) border.y = 0
        }
      })

      animationId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      cancelAnimationFrame(animationId)
    }
  }, [resolvedTheme])

  return (
    <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />
  )
}
