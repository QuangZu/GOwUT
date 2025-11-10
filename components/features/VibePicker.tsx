'use client'

import React, { useState } from 'react'
import { Music, Palette, Code, Coffee, Mountain, Gamepad2, BookOpen, Camera, Dumbbell, Utensils, Users, Briefcase } from 'lucide-react'

interface Vibe {
  id: string
  label: string
  icon: React.ComponentType<{ size?: number; className?: string }>
  color: string
}

interface VibePickerProps {
  selectedVibes: string[]
  onVibeToggle: (vibeId: string) => void
  maxSelection?: number
}

const vibeOptions: Vibe[] = [
  { id: 'music', label: 'Music', icon: Music, color: 'bg-primary' },
  { id: 'art', label: 'Art', icon: Palette, color: 'bg-secondary' },
  { id: 'tech', label: 'Tech', icon: Code, color: 'bg-accent' },
  { id: 'coffee', label: 'Coffee', icon: Coffee, color: 'bg-highlight' },
  { id: 'outdoor', label: 'Outdoor', icon: Mountain, color: 'bg-success' },
  { id: 'gaming', label: 'Gaming', icon: Gamepad2, color: 'bg-primary' },
  { id: 'workshop', label: 'Workshop', icon: BookOpen, color: 'bg-secondary' },
  { id: 'photography', label: 'Photography', icon: Camera, color: 'bg-accent' },
  { id: 'fitness', label: 'Fitness', icon: Dumbbell, color: 'bg-highlight' },
  { id: 'food', label: 'Food', icon: Utensils, color: 'bg-success' },
  { id: 'community', label: 'Community', icon: Users, color: 'bg-primary' },
  { id: 'business', label: 'Business', icon: Briefcase, color: 'bg-secondary' }
]

const VibePicker: React.FC<VibePickerProps> = ({ 
  selectedVibes, 
  onVibeToggle, 
  maxSelection = 5 
}) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {vibeOptions.map((vibe) => {
        const Icon = vibe.icon
        const isSelected = selectedVibes.includes(vibe.id)
        const isDisabled = !isSelected && selectedVibes.length >= maxSelection

        return (
          <button
            key={vibe.id}
            onClick={() => !isDisabled && onVibeToggle(vibe.id)}
            disabled={isDisabled}
            className={`
              p-4 rounded-xl border transition-all duration-300 flex flex-col items-center space-y-2
              ${isSelected 
                ? `${vibe.color} text-foreground border-transparent shadow-lg scale-105` 
                : 'bg-card border-border hover:border-primary text-foreground-secondary hover:text-foreground'
              }
              ${isDisabled ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'}
            `}
          >
            <Icon size={24} />
            <span className="text-sm font-medium">{vibe.label}</span>
            {isSelected && (
              <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
            )}
          </button>
        )
      })}
    </div>
  )
}

export default VibePicker