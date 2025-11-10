'use client'

import React from 'react'
import { Palette, Check } from 'lucide-react'
import { useTheme } from '../../hooks/useTheme'

const ThemeSelector: React.FC = () => {
  const { currentTheme, themes, changeTheme } = useTheme()

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <Palette className="w-5 h-5 text-current" />
        <span className="text-sm font-medium">Theme</span>
      </div>
      
      <div className="grid grid-cols-2 gap-3">
        {themes.map((theme) => (
          <button
            key={theme.id}
            onClick={() => changeTheme(theme.id)}
            className={`relative p-3 rounded-xl border-2 transition-all duration-300 hover:scale-105 ${
              currentTheme.id === theme.id
                ? 'border-current bg-current/10'
                : 'border-border hover:border-current/50 bg-card'
            }`}
          >
            {/* Theme Preview Colors */}
            <div className="flex gap-1 mb-2">
              <div 
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: theme.colors.primary }}
              />
              <div 
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: theme.colors.secondary }}
              />
              <div 
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: theme.colors.accent }}
              />
              <div 
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: theme.colors.highlight }}
              />
            </div>

            {/* Theme Name */}
            <p className="text-xs font-medium text-foreground text-left">{theme.name}</p>
            
            {/* Active Indicator */}
            {currentTheme.id === theme.id && (
              <div className="absolute top-2 right-2 w-4 h-4 bg-current rounded-full flex items-center justify-center">
                <Check size={10} className="text-background" />
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  )
}

export default ThemeSelector