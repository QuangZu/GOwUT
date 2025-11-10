'use client'

import React from 'react'
import { Check, Palette } from 'lucide-react'
import { useTheme } from '../../hooks/useTheme'
import Card from '../ui/Card'

const ThemePicker: React.FC = () => {
  const { currentTheme, themes, changeTheme } = useTheme()

  return (
    <Card variant="glass" className="p-6">
      <div className="flex items-center gap-3 mb-6">
        <Palette className="w-6 h-6 text-accent" />
        <h3 className="text-xl font-bold text-foreground">Theme Selection</h3>
      </div>
      
      <p className="text-foreground-secondary mb-6 text-sm">
        Choose your preferred color scheme for the GOwUT experience
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {themes.map((theme) => (
          <button
            key={theme.id}
            onClick={() => changeTheme(theme.id)}
            className={`relative p-4 rounded-xl border-2 transition-all duration-300 hover:scale-105 ${
              currentTheme.id === theme.id
                ? 'border-accent bg-accent/10'
                : 'border-border hover:border-accent/50 bg-card'
            }`}
          >
            {/* Theme Preview */}
            <div className="flex items-center gap-3 mb-3">
              <div className="flex gap-1">
                <div 
                  className="w-4 h-4 rounded-full border border-white/20"
                  style={{ backgroundColor: theme.colors.primary }}
                />
                <div 
                  className="w-4 h-4 rounded-full border border-white/20"
                  style={{ backgroundColor: theme.colors.secondary }}
                />
                <div 
                  className="w-4 h-4 rounded-full border border-white/20"
                  style={{ backgroundColor: theme.colors.accent }}
                />
                <div 
                  className="w-4 h-4 rounded-full border border-white/20"
                  style={{ backgroundColor: theme.colors.highlight }}
                />
                <div 
                  className="w-4 h-4 rounded-full border border-white/20"
                  style={{ backgroundColor: theme.colors.success }}
                />
              </div>
              
              {currentTheme.id === theme.id && (
                <div className="ml-auto w-5 h-5 bg-accent rounded-full flex items-center justify-center">
                  <Check size={12} className="text-foreground" />
                </div>
              )}
            </div>

            {/* Theme Info */}
            <div className="text-left">
              <h4 className="font-semibold text-foreground mb-1">{theme.name}</h4>
              <div className="flex gap-2 text-xs">
                <span 
                  className="px-2 py-1 rounded-full text-foreground"
                  style={{ backgroundColor: theme.colors.background }}
                >
                  Background
                </span>
                <span 
                  className="px-2 py-1 rounded-full"
                  style={{ 
                    backgroundColor: theme.colors.primary,
                    color: theme.colors.foreground 
                  }}
                >
                  Primary
                </span>
              </div>
            </div>

            {/* Hover Effect */}
            <div className="absolute inset-0 rounded-xl bg-accent/5 opacity-0 hover:opacity-100 transition-opacity pointer-events-none" />
          </button>
        ))}
      </div>

      <div className="mt-6 p-4 bg-primary/10 border border-primary/30 rounded-lg">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-2 h-2 bg-accent rounded-full animate-pulse" />
          <span className="text-sm font-medium text-foreground">Current Theme</span>
        </div>
        <p className="text-xs text-foreground-secondary">
          {currentTheme.name} is currently active. Changes are saved automatically.
        </p>
      </div>
    </Card>
  )
}

export default ThemePicker