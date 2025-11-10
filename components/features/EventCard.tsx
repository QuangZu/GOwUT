'use client'

import React from 'react'
import Link from 'next/link'
import { Calendar, Clock, MapPin, Users, Star, Heart, Share2 } from 'lucide-react'
import Card from '../ui/Card'
import Button from '../ui/Button'
import { formatDate, formatTime, slugify } from '@/lib/utils'

interface Event {
  id: number
  title: string
  date: string
  time: string
  location: string
  description: string
  attendees: number
  image: string
  tags: string[]
  price: string | number
  rating: number
  saved?: boolean
  attended?: boolean
}

interface EventCardProps {
  event: Event
  showActions?: boolean
  size?: 'small' | 'medium' | 'large'
}

const EventCard: React.FC<EventCardProps> = ({ 
  event, 
  showActions = true, 
  size = 'medium' 
}) => {
  const eventSlug = `${event.id}-${slugify(event.title)}`
  
  const sizeClasses = {
    small: 'h-40',
    medium: 'h-48',
    large: 'h-56'
  }

  const handleSaveEvent = (e: React.MouseEvent) => {
    e.preventDefault()
    // Handle save event logic
    console.log('Save event:', event.id)
  }

  const handleShareEvent = (e: React.MouseEvent) => {
    e.preventDefault()
    // Handle share event logic
    console.log('Share event:', event.id)
  }

  return (
    <Link href={`/event/${eventSlug}`} className="group block">
      <Card variant="glass" className="overflow-hidden hover:border-secondary transition-all duration-300 p-0">
        {/* Event Image */}
        <div className={`relative ${sizeClasses[size]} overflow-hidden`}>
          <img 
            src={event.image} 
            alt={event.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          
          {/* Overlay */}
          <div className="absolute inset-0 bg-card/40" />
          
          {/* Status Badges */}
          <div className="absolute top-3 left-3 flex gap-2">
            {event.saved && (
              <div className="px-2 py-1 bg-primary text-foreground text-xs font-medium rounded-full">
                Saved
              </div>
            )}
            {event.attended && (
              <div className="px-2 py-1 bg-secondary text-foreground text-xs font-medium rounded-full">
                Attended
              </div>
            )}
          </div>

          {/* Action Buttons */}
          {showActions && (
            <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                onClick={handleSaveEvent}
                className="p-2 bg-card/60 text-foreground rounded-full hover:bg-primary/60 transition-colors"
              >
                <Heart size={16} />
              </button>
              <button
                onClick={handleShareEvent}
                className="p-2 bg-card/60 text-foreground rounded-full hover:bg-primary/60 transition-colors"
              >
                <Share2 size={16} />
              </button>
            </div>
          )}

          {/* Bottom Info */}
          <div className="absolute bottom-3 left-3 flex gap-2">
            <div className="flex items-center gap-1 px-2 py-1 bg-card/70 text-foreground text-xs rounded-full">
              <Star size={12} className="text-warning fill-current" />
              <span>{event.rating}</span>
            </div>
            <div className="px-2 py-1 bg-accent text-foreground text-xs font-medium rounded-full">
              {typeof event.price === 'number' ? (event.price === 0 ? 'Free' : `₫${event.price.toLocaleString()}`) : event.price}
            </div>
          </div>
        </div>
        
        {/* Event Content */}
        <div className="p-4">
          <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-secondary transition-colors">
            {event.title}
          </h3>
          
          <div className="flex items-center gap-4 mb-3 text-sm text-foreground-secondary">
            <div className="flex items-center gap-1">
              <Calendar size={14} className="text-primary" />
              <span>{formatDate(event.date)}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock size={14} className="text-accent" />
              <span>{formatTime(event.time)}</span>
            </div>
          </div>
          
          <div className="flex items-center gap-2 mb-3">
            <MapPin size={14} className="text-accent" />
            <span className="text-sm text-foreground-secondary">{event.location}</span>
          </div>
          
          <p className="text-sm text-foreground-secondary mb-4 line-clamp-2">{event.description}</p>
          
          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {event.tags.slice(0, 3).map((tag, index) => (
              <span 
                key={index}
                className="px-2 py-1 text-xs bg-primary/20 text-primary rounded-full border border-primary/30"
              >
                {tag}
              </span>
            ))}
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Users size={14} className="text-foreground-secondary" />
              <span className="text-sm text-foreground-secondary">{event.attendees} going</span>
            </div>
            
            <Button size="sm" className="group-hover:bg-secondary group-hover:text-foreground transition-colors">
              View Event
            </Button>
          </div>
        </div>
      </Card>
    </Link>
  )
}

export default EventCard