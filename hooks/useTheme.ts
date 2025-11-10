'use client'

import { useState, useEffect } from 'react'
import { Theme, themes, getTheme, applyTheme } from '../lib/themes'

export const useTheme = () => {
  const [currentTheme, setCurrentTheme] = useState<Theme>(themes[0])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Load theme from localStorage on mount
    const savedThemeId = localStorage.getItem('go-wut-theme')
    const theme = savedThemeId ? getTheme(savedThemeId) : themes[0]
    setCurrentTheme(theme)
    
    // Apply theme immediately on load
    const root = document.documentElement
    
    // Primary Colors
    root.style.setProperty('--primary', theme.colors.primary)
    root.style.setProperty('--secondary', theme.colors.secondary)
    root.style.setProperty('--accent', theme.colors.accent)
    root.style.setProperty('--highlight', theme.colors.highlight)
    root.style.setProperty('--success', theme.colors.success)
    
    // Backgrounds
    root.style.setProperty('--background', theme.colors.background)
    root.style.setProperty('--background-secondary', theme.colors.backgroundSecondary)
    root.style.setProperty('--card', theme.colors.card)
    root.style.setProperty('--card-hover', theme.colors.cardHover)
    
    // Text
    root.style.setProperty('--foreground', theme.colors.foreground)
    root.style.setProperty('--foreground-secondary', theme.colors.foregroundSecondary)
    root.style.setProperty('--muted', theme.colors.muted)
    
    // UI Elements
    root.style.setProperty('--border', theme.colors.border)
    root.style.setProperty('--border-hover', theme.colors.borderHover)
    root.style.setProperty('--button', theme.colors.button)
    root.style.setProperty('--button-hover', theme.colors.buttonHover)
    
    // Status Colors
    root.style.setProperty('--danger', theme.colors.danger)
    root.style.setProperty('--warning', theme.colors.warning)
    root.style.setProperty('--info', theme.colors.info)
    
    // Gradients (check if gradient exists)
    if (theme.gradient) {
      root.style.setProperty('--gradient-primary', theme.gradient.primary)
      root.style.setProperty('--gradient-secondary', theme.gradient.secondary)
      root.style.setProperty('--gradient-accent', theme.gradient.accent)
    }
    
    setIsLoading(false)
  }, [])

  const changeTheme = (themeId: string) => {
    const theme = getTheme(themeId)
    setCurrentTheme(theme)
    
    // Apply comprehensive theme to CSS variables
    const root = document.documentElement
    
    // Primary Colors
    root.style.setProperty('--primary', theme.colors.primary)
    root.style.setProperty('--secondary', theme.colors.secondary)
    root.style.setProperty('--accent', theme.colors.accent)
    root.style.setProperty('--highlight', theme.colors.highlight)
    root.style.setProperty('--success', theme.colors.success)
    
    // Backgrounds
    root.style.setProperty('--background', theme.colors.background)
    root.style.setProperty('--background-secondary', theme.colors.backgroundSecondary)
    root.style.setProperty('--card', theme.colors.card)
    root.style.setProperty('--card-hover', theme.colors.cardHover)
    
    // Text
    root.style.setProperty('--foreground', theme.colors.foreground)
    root.style.setProperty('--foreground-secondary', theme.colors.foregroundSecondary)
    root.style.setProperty('--muted', theme.colors.muted)
    
    // UI Elements
    root.style.setProperty('--border', theme.colors.border)
    root.style.setProperty('--border-hover', theme.colors.borderHover)
    root.style.setProperty('--button', theme.colors.button)
    root.style.setProperty('--button-hover', theme.colors.buttonHover)
    
    // Status Colors
    root.style.setProperty('--danger', theme.colors.danger)
    root.style.setProperty('--warning', theme.colors.warning)
    root.style.setProperty('--info', theme.colors.info)
    
    // Gradients (check if gradient exists)
    if (theme.gradient) {
      root.style.setProperty('--gradient-primary', theme.gradient.primary)
      root.style.setProperty('--gradient-secondary', theme.gradient.secondary)
      root.style.setProperty('--gradient-accent', theme.gradient.accent)
    }
    
    localStorage.setItem('go-wut-theme', themeId)
    console.log('Theme changed to:', theme.name)
  }

  return {
    currentTheme,
    themes,
    changeTheme,
    isLoading
  }
}