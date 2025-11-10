'use client'

import { useState, useRef } from 'react'
import Link from 'next/link'
import {
  Search,
  Home,
  Bookmark,
  User,
  Bell,
  Settings,
  Heart,
  Share2,
  Calendar,
  MapPin,
  Users,
  Star,
  Sparkles,
  Filter,
  MoreHorizontal
} from 'lucide-react'
import ScrollAnimate from '../../../components/ui/ScrollAnimate'
import FireworkAnimation from '../../../components/ui/FireworkAnimation'

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('home')
  const [searchQuery, setSearchQuery] = useState('')

  const mockEvents = [
    {
      id: 1,
      title: "Neon Underground",
      date: "2024-01-15",
      time: "22:00",
      location: "Electric Warehouse",
      description: "Underground electronic music experience with top DJs",
      attendees: 342,
      image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=500&h=300&fit=crop",
      tags: ["#Rave", "#Electronic", "#Underground"],
      price: "Free",
      rating: 4.8,
      saved: false
    },
    {
      id: 2,
      title: "Indie Vibes Session",
      date: "2024-01-18",
      time: "19:30",
      location: "Rooftop Lounge",
      description: "Chill indie music with stunning city views",
      attendees: 156,
      image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=500&h=300&fit=crop",
      tags: ["#Indie", "#Chill", "#Rooftop"],
      price: "₫150,000",
      rating: 4.6,
      saved: true
    },
    {
      id: 3,
      title: "AI Future Summit",
      date: "2024-01-20",
      time: "14:00",
      location: "Tech Hub",
      description: "Exploring the future of artificial intelligence",
      attendees: 89,
      image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=500&h=300&fit=crop",
      tags: ["#Tech", "#AI", "#Workshop"],
      price: "₫300,000",
      rating: 4.9,
      saved: false
    },
    {
      id: 4,
      title: "Art Gallery Opening",
      date: "2024-01-22",
      time: "18:00",
      location: "Modern Space",
      description: "Contemporary digital art exhibition",
      attendees: 201,
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=500&h=300&fit=crop",
      tags: ["#Art", "#Digital", "#Gallery"],
      price: "Free",
      rating: 4.7,
      saved: true
    },
    {
      id: 5,
      title: "Street Food Fest",
      date: "2024-01-25",
      time: "16:00",
      location: "City Park",
      description: "Best street food vendors in the city",
      attendees: 445,
      image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=500&h=300&fit=crop",
      tags: ["#Food", "#Festival", "#Outdoor"],
      price: "₫100,000",
      rating: 4.5,
      saved: false
    }
  ]

  const EventCard = ({ event, index = 0 }: { event: any, index?: number }) => {
    return (
      <ScrollAnimate delay={index * 100}>
        <div className="group relative overflow-hidden rounded-3xl bg-card backdrop-blur-xl border border-border hover:border-primary/30 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-primary/10">
          {/* Event Image */}
          <div className="relative h-56 overflow-hidden">
            <div className="absolute inset-0 bg-primary/20 z-10" />
            <img
              src={event.image}
              alt={event.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />

            {/* Floating Action Buttons */}
            <div className="absolute top-4 right-4 flex gap-2 z-20">
              <button className={`p-2.5 rounded-full backdrop-blur-xl border border-white/20 transition-all duration-300 hover:scale-110 cursor-pointer ${event.saved ? 'bg-primary/80 text-foreground' : 'bg-white/10 text-foreground/80 hover:bg-white/20'}`}>
                <Heart className="w-4 h-4" fill={event.saved ? 'currentColor' : 'none'} />
              </button>
              <button className="p-2.5 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 text-foreground/80 hover:bg-white/20 hover:scale-110 transition-all duration-300 cursor-pointer">
                <Share2 className="w-4 h-4" />
              </button>
            </div>

            {/* Rating & Price Badge */}
            <div className="absolute bottom-4 left-4 flex gap-2 z-20">
              <div className="flex items-center gap-1 px-3 py-1.5 bg-black/40 backdrop-blur-xl rounded-full border border-white/20">
                <Star className="w-3 h-3 text-warning fill-current" />
                <span className="text-xs text-foreground font-medium">{event.rating}</span>
              </div>
              <div className="px-3 py-1.5 bg-success/80 backdrop-blur-xl rounded-full border border-success/30">
                <span className="text-xs text-foreground font-medium">{event.price}</span>
              </div>
            </div>
          </div>

          {/* Event Content */}
          <div className="p-6">
            <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-all duration-500">
              {event.title}
            </h3>

            <div className="flex items-center gap-4 mb-3 text-foreground-secondary">
              <div className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-primary" />
                <span className="text-sm">{event.date}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-secondary" />
                <span className="text-sm">{event.location}</span>
              </div>
            </div>

            <p className="text-foreground-secondary text-sm mb-4 line-clamp-2">{event.description}</p>

            {/* Vibe Tags */}
            <div className="flex flex-wrap gap-2 mb-5">
              {event.tags.map((tag: string, index: number) => (
                <span
                  key={index}
                  className="px-3 py-1.5 text-xs font-medium bg-primary/20 text-foreground-secondary rounded-full border border-primary/30 hover:border-primary/50 hover:bg-primary/30 transition-all duration-300 cursor-pointer"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-foreground-secondary" />
                <span className="text-sm text-foreground-secondary">{event.attendees} going</span>
              </div>

              <Link href={`/main/event/${event.id}`} className="px-6 py-2.5 bg-gradient-to-r from-primary via-secondary to-accent hover:from-primary/90 hover:via-secondary/90 hover:to-accent/90 text-foreground font-medium rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary/25 inline-block text-center">
                View Event
              </Link>
            </div>
          </div>
        </div>
      </ScrollAnimate>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden relative">
      {/* Firework Animation Background */}
      <FireworkAnimation />

      <div className="max-w-7xl mx-auto px-6 py-8 relative z-10">
        {/* Main Feed */}
        <main>
          {/* Feed Header */}
          <ScrollAnimate>
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-4">
                <h2 className="text-3xl font-bold text-foreground">For You</h2>
                <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600/20 to-pink-600/20 border border-purple-500/30 rounded-full">
                  <Sparkles className="w-4 h-4 text-primary" />
                  <span className="text-sm text-foreground-secondary font-medium">AI Curated</span>
                </div>
              </div>

              <button className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-colors">
                <MoreHorizontal className="w-5 h-5 text-muted" />
                <span className="text-sm text-muted hidden sm:block">More</span>
              </button>
            </div>
          </ScrollAnimate>

          {/* Event Cards Grid */}
          <ScrollAnimate delay={100}>
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
              {mockEvents.map((event, index) => (
                <div key={event.id} className="w-full">
                  <EventCard event={event} index={index} />
                </div>
              ))}
            </div>
          </ScrollAnimate>

          {/* Load More */}
          <ScrollAnimate>
            <div className="text-center">
              <button className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-foreground font-medium rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-purple-500/25 cursor-pointer">
                Discover More Events
              </button>
            </div>
          </ScrollAnimate>
        </main>
      </div>
    </div>
  )
}
