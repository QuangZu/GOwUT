'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { Calendar, Clock, MapPin, Users, Star, ChevronRight, Filter } from 'lucide-react'
import FireworkAnimation from '../../../components/ui/FireworkAnimation'
import ScrollAnimate from '../../../components/ui/ScrollAnimate'

// Import the hover effect CSS
import '../../../styles/timeline-hover.css'

export default function TimelinePage() {
  const [selectedDate, setSelectedDate] = useState('2024-01-15')
  const [viewMode, setViewMode] = useState<'day' | 'week' | 'month'>('week')

  const timelineEvents = [
    {
      id: 1,
      title: "Morning Yoga Session",
      date: "2024-01-15",
      time: "07:00",
      endTime: "08:30",
      location: "Central Park",
      attendees: 24,
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=200&fit=crop",
      tags: ["#Wellness", "#Outdoor"],
      rating: 4.7,
      type: "wellness"
    },
    {
      id: 2,
      title: "Coffee Meetup",
      date: "2024-01-15",
      time: "09:00",
      endTime: "11:00",
      location: "Brew Coffee House",
      attendees: 12,
      image: "https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=400&h=200&fit=crop",
      tags: ["#Coffee", "#Networking"],
      rating: 4.5,
      type: "social"
    },
    {
      id: 3,
      title: "Tech Workshop",
      date: "2024-01-15",
      time: "14:00",
      endTime: "17:00",
      location: "Innovation Hub",
      attendees: 45,
      image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&h=200&fit=crop",
      tags: ["#Tech", "#Learning"],
      rating: 4.9,
      type: "learning"
    },
    {
      id: 4,
      title: "Sunset Photography Walk",
      date: "2024-01-15",
      time: "17:30",
      endTime: "19:00",
      location: "Waterfront District",
      attendees: 18,
      image: "https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=400&h=200&fit=crop",
      tags: ["#Photography", "#Outdoor"],
      rating: 4.8,
      type: "creative"
    },
    {
      id: 5,
      title: "Electronic Music Night",
      date: "2024-01-15",
      time: "22:00",
      endTime: "02:00",
      location: "Electric Club",
      attendees: 156,
      image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=400&h=200&fit=crop",
      tags: ["#Music", "#Nightlife"],
      rating: 4.6,
      type: "entertainment"
    }
  ]

  const getEventTypeColor = (type: string) => {
    const colors = {
      wellness: 'border-l-secondary bg-secondary/5',
      social: 'border-l-highlight bg-highlight/5',
      learning: 'border-l-primary bg-primary/5',
      creative: 'border-l-success bg-success/5',
      entertainment: 'border-l-accent bg-accent/5'
    }
    return colors[type as keyof typeof colors] || 'border-l-muted bg-muted/5'
  }

  const TimelineEvent = ({ event }: { event: any }) => (
    <Link href={`/main/event/${event.id}`} className="block group cursor-pointer">
      <div className={`p-4 border-l-4 ${getEventTypeColor(event.type)} hover:bg-white/5 transition-all duration-300 rounded-r-xl`}>
        <div className="flex items-start gap-4">
          {/* Time */}
          <div className="flex-shrink-0 text-center min-w-[80px]">
            <div className="text-lg font-bold text-foreground">{event.time}</div>
            <div className="text-sm text-muted">{event.endTime}</div>
          </div>

          {/* Event Image */}
          <div className="flex-shrink-0">
            <img 
              src={event.image}
              alt={event.title}
              className="w-16 h-16 rounded-xl object-cover group-hover:scale-110 transition-transform duration-300"
            />
          </div>

          {/* Event Details */}
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold text-foreground group-hover:text-secondary transition-colors duration-300 truncate timeline-event-title">
              {event.title}
            </h3>
            
            <div className="flex items-center gap-4 mt-1 text-sm text-muted">
              <div className="flex items-center gap-1">
                <MapPin size={14} />
                <span className="truncate">{event.location}</span>
              </div>
              <div className="flex items-center gap-1">
                <Users size={14} />
                <span>{event.attendees}</span>
              </div>
              <div className="flex items-center gap-1">
                <Star size={14} className="text-accent fill-current" />
                <span>{event.rating}</span>
              </div>
            </div>

            {/* Tags */}
            <div className="flex gap-2 mt-2">
              {event.tags.map((tag: string, index: number) => (
                <span 
                  key={index}
                  className="px-2 py-1 text-xs bg-white/10 text-foreground rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Arrow */}
          <div className="flex-shrink-0">
            <ChevronRight className="w-5 h-5 text-muted group-hover:text-secondary transition-colors duration-300" />
          </div>
        </div>
      </div>
    </Link>
  )

  return (
    <div className="min-h-screen bg-background text-foreground p-6 overflow-hidden">
      {/* Firework Animation Background */}
      <FireworkAnimation />

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Header */}
        <ScrollAnimate>
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2 timeline-header">Event Timeline</h1>
              <p className="text-muted">Your personalized schedule for today</p>
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center gap-2 bg-white/5 backdrop-blur-xl rounded-full p-1">
              {(['day', 'week', 'month'] as const).map((mode) => (
                <button
                  key={mode}
                  onClick={() => setViewMode(mode)}
                  className={`px-4 py-2 text-sm font-medium rounded-full transition-all duration-300 capitalize cursor-pointer ${
                    viewMode === mode
                      ? 'bg-primary text-foreground'
                      : 'text-foreground hover:bg-white/10'
                  }`}
                >
                  {mode}
                </button>
              ))}
            </div>
          </div>
        </ScrollAnimate>

        {/* Date Header */}
        <ScrollAnimate delay={100}>
          <div className="flex items-center gap-4 mb-6 p-4 bg-white/5 backdrop-blur-xl rounded-2xl">
            <Calendar className="w-6 h-6 text-secondary" />
            <div>
              <h2 className="text-xl font-semibold text-foreground timeline-regular-header">Monday, January 15, 2024</h2>
              <p className="text-sm text-muted">{timelineEvents.length} events scheduled</p>
            </div>
            
            <div className="ml-auto">
              <button className="p-2 rounded-xl bg-white/10 hover:bg-white/20 transition-colors cursor-pointer">
                <Filter className="w-5 h-5 text-foreground" />
              </button>
            </div>
          </div>
        </ScrollAnimate>

        {/* Timeline */}
        <div className="space-y-2">
          {timelineEvents.map((event, index) => (
            <ScrollAnimate key={event.id} delay={index * 50}>
              <TimelineEvent event={event} />
            </ScrollAnimate>
          ))}
        </div>

        {/* Empty State for other days */}
        {timelineEvents.length === 0 && (
          <div className="text-center py-12">
            <Calendar className="w-16 h-16 text-muted mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-2 timeline-regular-header">No events scheduled</h3>
            <p className="text-muted mb-6">Looks like you have a free day!</p>
            <Link 
              href="/main/search"
              className="inline-block px-6 py-3 bg-primary hover:bg-primary/90 text-foreground rounded-xl transition-colors duration-300 cursor-pointer"
            >
              Discover Events
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}