'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { 
  Sparkles,
  Music,
  Palette,
  Code,
  Coffee,
  Mountain,
  Gamepad2,
  BookOpen,
  Camera,
  Dumbbell,
  Utensils,
  Users,
  Briefcase,
  Heart,
  Headphones,
  Mic,
  Film,
  ShoppingBag,
  Car,
  Plane
} from 'lucide-react'

export default function OnboardingPage() {
  const router = useRouter()
  const [selectedVibes, setSelectedVibes] = useState<string[]>([])
  const [animationStep, setAnimationStep] = useState(0)

  const vibeOptions = [
    // Music & Entertainment
    { id: 'indie', label: 'Indie', icon: Music, color: 'from-purple-500 to-pink-500', size: 'large', category: 'music' },
    { id: 'pop', label: 'Pop', icon: Headphones, color: 'from-pink-500 to-rose-500', size: 'medium', category: 'music' },
    { id: 'jazz', label: 'Jazz', icon: Mic, color: 'from-amber-500 to-orange-500', size: 'medium', category: 'music' },
    { id: 'electronic', label: 'Electronic', icon: Music, color: 'from-cyan-500 to-blue-500', size: 'large', category: 'music' },
    
    // Arts & Culture
    { id: 'art', label: 'Art', icon: Palette, color: 'from-indigo-500 to-purple-500', size: 'large', category: 'culture' },
    { id: 'photography', label: 'Photography', icon: Camera, color: 'from-emerald-500 to-teal-500', size: 'medium', category: 'culture' },
    { id: 'film', label: 'Film', icon: Film, color: 'from-slate-500 to-gray-500', size: 'medium', category: 'culture' },
    
    // Tech & Innovation
    { id: 'tech', label: 'Tech', icon: Code, color: 'from-green-500 to-emerald-500', size: 'large', category: 'tech' },
    { id: 'gaming', label: 'Gaming', icon: Gamepad2, color: 'from-violet-500 to-purple-500', size: 'medium', category: 'tech' },
    
    // Lifestyle & Wellness
    { id: 'fitness', label: 'Fitness', icon: Dumbbell, color: 'from-red-500 to-pink-500', size: 'medium', category: 'lifestyle' },
    { id: 'wellness', label: 'Wellness', icon: Heart, color: 'from-rose-500 to-pink-500', size: 'small', category: 'lifestyle' },
    { id: 'outdoor', label: 'Outdoor', icon: Mountain, color: 'from-green-600 to-emerald-600', size: 'medium', category: 'lifestyle' },
    
    // Food & Social
    { id: 'foodie', label: 'Foodie', icon: Utensils, color: 'from-orange-500 to-red-500', size: 'large', category: 'social' },
    { id: 'coffee', label: 'Coffee', icon: Coffee, color: 'from-amber-600 to-orange-600', size: 'small', category: 'social' },
    { id: 'nightlife', label: 'Nightlife', icon: Users, color: 'from-purple-600 to-pink-600', size: 'medium', category: 'social' },
    
    // Learning & Growth
    { id: 'workshop', label: 'Workshop', icon: BookOpen, color: 'from-blue-500 to-indigo-500', size: 'medium', category: 'learning' },
    { id: 'business', label: 'Business', icon: Briefcase, color: 'from-gray-600 to-slate-600', size: 'small', category: 'learning' },
    
    // Lifestyle Extras
    { id: 'shopping', label: 'Shopping', icon: ShoppingBag, color: 'from-pink-600 to-rose-600', size: 'small', category: 'lifestyle' },
    { id: 'automotive', label: 'Cars', icon: Car, color: 'from-blue-600 to-cyan-600', size: 'small', category: 'lifestyle' },
    { id: 'travel', label: 'Travel', icon: Plane, color: 'from-sky-500 to-blue-500', size: 'medium', category: 'lifestyle' }
  ]

  useEffect(() => {
    // Staggered animation entrance
    const timer = setTimeout(() => {
      setAnimationStep(prev => prev < vibeOptions.length ? prev + 1 : prev)
    }, 100)
    return () => clearTimeout(timer)
  }, [animationStep])

  const toggleVibe = (vibeId: string) => {
    setSelectedVibes(prev => 
      prev.includes(vibeId) 
        ? prev.filter(id => id !== vibeId)
        : [...prev, vibeId]
    )
  }

  const getVibeSize = (size: string) => {
    switch (size) {
      case 'large': return 'w-28 h-28 text-3xl'
      case 'medium': return 'w-24 h-24 text-2xl'
      case 'small': return 'w-20 h-20 text-xl'
      default: return 'w-24 h-24 text-2xl'
    }
  }

  const getBubblePosition = (index: number) => {
    // Create a more natural, scattered layout
    const positions = [
      'top-16 left-32', 'top-8 left-96', 'top-24 right-32', 'top-4 right-80',
      'top-40 left-16', 'top-32 left-80', 'top-48 right-16', 'top-36 right-96',
      'top-64 left-48', 'top-56 left-128', 'top-72 right-48', 'top-60 right-112',
      'top-88 left-24', 'top-80 left-72', 'top-96 right-24', 'top-84 right-80',
      'top-112 left-56', 'top-104 left-104', 'top-120 right-56', 'top-108 right-128'
    ]
    return positions[index % positions.length] || 'top-16 left-32'
  }

  const handleContinue = () => {
    if (selectedVibes.length >= 3) {
      // Store selected vibes in localStorage or send to API
      localStorage.setItem('selectedVibes', JSON.stringify(selectedVibes))
      router.push('/dashboard')
    }
  }

  return (
    <div className="fixed inset-0 bg-background z-50 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      {/* Content Container */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-3xl flex items-center justify-center animate-pulse-glow">
              <Sparkles className="w-8 h-8 text-foreground" />
            </div>
            <h1 className="text-6xl font-bold text-white font-bold drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)] animate-gradient-x">
              <span className="bg-gradient-to-r from-purple-600 via-pink-500 to-yellow-400 bg-clip-text text-transparent" style={{WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'}}>
                GOwUT
              </span>
            </h1>
          </div>
          
          <h2 className="text-5xl font-bold text-foreground mb-4">
            What's Your Vibe?
          </h2>
          <p className="text-xl text-foreground-secondary max-w-2xl mx-auto">
            Select your interests to discover events that match your personality. 
            Choose at least 3 to get started on your journey!
          </p>
        </div>

        {/* Bubble Cloud */}
        <div className="relative w-full max-w-6xl h-96 mb-16">
          {vibeOptions.map((vibe, index) => {
            const Icon = vibe.icon
            const isSelected = selectedVibes.includes(vibe.id)
            const isVisible = index < animationStep
            
            return (
              <div
                key={vibe.id}
                className={`absolute ${getBubblePosition(index)} transform transition-all duration-500 ${
                  isVisible 
                    ? 'translate-y-0 opacity-100 scale-100' 
                    : 'translate-y-12 opacity-0 scale-50'
                }`}
                style={{ 
                  transitionDelay: `${index * 50}ms`,
                  animationDelay: `${index * 0.3}s`
                }}
              >
                <button
                  onClick={() => toggleVibe(vibe.id)}
                  className={`${getVibeSize(vibe.size)} rounded-full flex flex-col items-center justify-center cursor-pointer transition-all duration-300 hover:scale-110 group relative overflow-hidden ${
                    isSelected
                      ? `bg-gradient-to-br ${vibe.color} shadow-2xl shadow-primary/40 animate-pulse-glow`
                      : `bg-white/10 backdrop-blur-xl border-2 border-white/20 hover:border-white/40 hover:bg-white/20`
                  }`}
                >
                  {/* Selection Ring */}
                  {isSelected && (
                    <div className="absolute inset-0 rounded-full border-4 border-white/50 animate-pulse" />
                  )}
                  
                  {/* Shimmer Effect */}
                  {isSelected && (
                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-foreground/20 to-transparent animate-shimmer" />
                  )}
                  
                  <Icon className={`${isSelected ? 'text-foreground' : 'text-foreground-secondary group-hover:text-foreground'} transition-colors mb-1`} />
                  <span className={`text-xs font-bold text-center px-1 ${
                    isSelected ? 'text-foreground' : 'text-foreground-secondary group-hover:text-foreground'
                  } transition-colors`}>
                    {vibe.label}
                  </span>
                  
                  {/* Floating Animation */}
                  <div className="absolute inset-0 rounded-full animate-float" style={{
                    animationDelay: `${index * 0.5}s`,
                    animationDuration: `${4 + (index % 3)}s`
                  }} />
                </button>
              </div>
            )
          })}
        </div>

        {/* Selection Counter */}
        <div className="mb-8">
          <div className="flex items-center justify-center gap-4 p-4 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl">
            <div className="flex gap-2">
              {[...Array(Math.max(3, selectedVibes.length))].map((_, index) => (
                <div
                  key={index}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index < selectedVibes.length
                      ? 'bg-gradient-to-r from-primary to-secondary scale-110'
                      : 'bg-white/20 scale-75'
                  }`}
                />
              ))}
            </div>
            <span className="text-foreground font-medium">
              {selectedVibes.length} / {Math.max(3, selectedVibes.length)} selected
            </span>
            {selectedVibes.length >= 3 && (
              <div className="flex items-center gap-1 px-3 py-1 bg-green-500/20 border border-green-400/30 rounded-full">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <span className="text-green-300 text-sm font-medium">Ready!</span>
              </div>
            )}
          </div>
        </div>

        {/* Continue Button */}
        <div className="text-center">
          <button
            onClick={handleContinue}
            disabled={selectedVibes.length < 3}
            className={`px-12 py-4 rounded-2xl font-bold text-lg transition-all duration-300 ${
              selectedVibes.length >= 3
                ? 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-foreground hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/40 cursor-pointer'
                : 'bg-card text-foreground-secondary cursor-not-allowed'
            }`}
          >
            {selectedVibes.length >= 3 ? (
              <span className="flex items-center gap-2">
                Continue to Dashboard
                <Sparkles className="w-5 h-5" />
              </span>
            ) : (
              `Select ${3 - selectedVibes.length} more to continue`
            )}
          </button>
          
          {selectedVibes.length < 3 && (
            <p className="text-foreground-secondary text-sm mt-3">
              Pick at least 3 vibes to personalize your experience
            </p>
          )}
        </div>

        {/* Skip Option */}
        <button 
          onClick={() => router.push('/dashboard')}
          className="mt-6 text-foreground-secondary hover:text-foreground transition-colors text-sm underline"
        >
          Skip for now
        </button>
      </div>
    </div>
  )
}