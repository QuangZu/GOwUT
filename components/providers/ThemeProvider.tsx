'use client'

import { useEffect } from 'react'
import { useTheme } from '../../hooks/useTheme'

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  const { currentTheme, isLoading } = useTheme()

  useEffect(() => {
    // Apply theme immediately when it changes
    if (!isLoading && currentTheme) {
      const root = document.documentElement
      Object.entries(currentTheme.colors).forEach(([key, value]) => {
        const cssVar = key.replace(/([A-Z])/g, '-$1').toLowerCase()
        root.style.setProperty(`--${cssVar}`, value)
      })
    }
  }, [currentTheme, isLoading])

  return <>{children}</>
}