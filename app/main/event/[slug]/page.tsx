'use client'

import { useState, use } from 'react'
import Link from 'next/link'
import { 
  ArrowLeft,
  Calendar,
  Clock,
  MapPin,
  Users,
  Heart,
  Share2,
  Star,
  Sparkles,
  Navigation,
  Mail,
  Globe,
  Ticket,
  ChevronRight
} from 'lucide-react'

export default function EventDetails({ params }: { params: Promise<{ slug: string }> }) {
  const [isSaved, setIsSaved] = useState(false)
  const [selectedTicket, setSelectedTicket] = useState('general')

  // Unwrap params using React.use()
  const resolvedParams = use(params)
  // Extract ID from slug (format: "1-event-name")
  const eventId = resolvedParams.slug.split('-')[0]

  // Mock event data
  const event = {
    id: eventId,
    title: "Electronic Music Night",
    subtitle: "Underground Vibes Series",
    date: "2024-01-15",
    time: "22:00",
    endTime: "02:00",
    location: "Electric Club",
    address: "123 Industrial District, Ho Chi Minh City",
    heroImage: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=1200&h=600&fit=crop",
    description: `Experience the underground electronic music scene like never before. This isn't just an event - it's a journey into sound, rhythm, and pure energy.

Join us for an unforgettable night featuring internationally renowned DJs spinning the latest in techno, house, and electronic beats. The venue transforms into a futuristic soundscape with state-of-the-art audio systems and mesmerizing visual effects.

Connect with fellow music enthusiasts, dance until dawn, and immerse yourself in the vibrant electronic music community.`,
    tags: ["#Electronic", "#Techno", "#Underground", "#Nightlife"],
    rating: 4.8,
    attendees: 342,
    organizer: {
      name: "Electric Collective",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
      description: "Premier electronic music event organizer bringing world-class underground experiences.",
      events: 28,
      followers: 12500
    },
    tickets: [
      {
        id: 'general',
        name: 'General Admission',
        price: 200000,
        description: 'Full access to main floor',
        available: 89,
        soldOut: false
      },
      {
        id: 'vip',
        name: 'VIP Experience',
        price: 350000,
        description: 'VIP area + complimentary drinks',
        available: 23,
        soldOut: false
      }
    ]
  }

  const formatPrice = (price: number) => {
    return `₫${price.toLocaleString()}`
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Back Navigation */}
        <div className="mb-6">
          <Link href="/main/timeline" className="inline-flex items-center gap-2 text-muted hover:text-foreground transition-colors cursor-pointer">
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Timeline</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Hero Image */}
            <div className="relative overflow-hidden rounded-3xl">
              <div className="aspect-[2/1] relative">
                <img 
                  src={event.heroImage}
                  alt={event.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-card/60" />
                
                {/* Actions */}
                <div className="absolute bottom-6 right-6 flex gap-2">
                  <button 
                    onClick={() => setIsSaved(!isSaved)}
                    className="p-3 bg-black/60 backdrop-blur-xl rounded-full hover:bg-black/80 transition-colors cursor-pointer"
                  >
                    <Heart className="w-5 h-5 text-foreground" fill={isSaved ? 'currentColor' : 'none'} />
                  </button>
                  <button className="p-3 bg-black/60 backdrop-blur-xl rounded-full hover:bg-black/80 transition-colors cursor-pointer">
                    <Share2 className="w-5 h-5 text-foreground" />
                  </button>
                </div>
              </div>
            </div>

            {/* Event Info */}
            <div className="space-y-6">
              <div>
                <h1 className="text-4xl font-bold text-foreground mb-2">{event.title}</h1>
                <p className="text-xl text-muted">{event.subtitle}</p>
              </div>

              {/* Date & Location */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-center gap-4 p-4 bg-card rounded-2xl">
                  <div className="p-3 bg-primary rounded-xl">
                    <Calendar className="w-6 h-6 text-foreground" />
                  </div>
                  <div>
                    <p className="text-sm text-foreground-secondary">Date & Time</p>
                    <p className="text-lg font-semibold text-foreground">{event.date}</p>
                    <p className="text-sm text-secondary">{event.time} - {event.endTime}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 bg-card rounded-2xl">
                  <div className="p-3 bg-highlight rounded-xl">
                    <MapPin className="w-6 h-6 text-foreground" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-foreground-secondary">Location</p>
                    <p className="text-lg font-semibold text-foreground">{event.location}</p>
                    <p className="text-sm text-highlight">{event.address}</p>
                  </div>
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-3">
                {event.tags.map((tag, index) => (
                  <span 
                    key={index}
                    className="px-4 py-2 text-sm font-medium bg-primary/20 text-primary rounded-full border border-primary/30"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Description */}
              <div className="p-6 bg-card rounded-3xl">
                <h2 className="text-2xl font-bold text-foreground mb-4">About this Event</h2>
                <div className="space-y-4">
                  {event.description.split('\n\n').map((paragraph, index) => (
                    <p key={index} className="text-foreground-secondary leading-relaxed">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>

              {/* Organizer */}
              <div className="p-6 bg-card rounded-3xl">
                <h2 className="text-2xl font-bold text-foreground mb-6">Organizer</h2>
                <div className="flex items-start gap-4">
                  <img 
                    src={event.organizer.avatar}
                    alt={event.organizer.name}
                    className="w-16 h-16 rounded-2xl object-cover"
                  />
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-foreground mb-2">{event.organizer.name}</h3>
                    <p className="text-foreground-secondary mb-3">{event.organizer.description}</p>
                    <div className="flex items-center gap-4 text-sm text-foreground-secondary">
                      <span>{event.organizer.events} events</span>
                      <span>{event.organizer.followers.toLocaleString()} followers</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              {/* Ticket Card */}
              <div className="p-6 bg-card rounded-3xl">
                <h2 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2">
                  <Ticket className="w-6 h-6 text-secondary" />
                  Get Tickets
                </h2>

                <div className="space-y-3 mb-6">
                  {event.tickets.map((ticket) => (
                    <div 
                      key={ticket.id}
                      className={`p-4 rounded-2xl border transition-all duration-300 cursor-pointer ${
                        selectedTicket === ticket.id
                          ? 'bg-primary/20 border-primary'
                          : 'bg-card border-border hover:border-primary/50'
                      }`}
                      onClick={() => setSelectedTicket(ticket.id)}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold text-foreground">{ticket.name}</h3>
                      </div>
                      <p className="text-sm text-foreground-secondary mb-2">{ticket.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-secondary">
                          {formatPrice(ticket.price)}
                        </span>
                        <span className="text-xs text-foreground-secondary">
                          {ticket.available} left
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                <button className="w-full py-4 bg-primary hover:bg-primary/90 text-foreground font-bold rounded-2xl transition-all duration-300 cursor-pointer">
                  Get Tickets
                </button>
              </div>

              {/* Event Stats */}
              <div className="p-6 bg-card rounded-3xl">
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="flex items-center justify-center gap-1 mb-1">
                      <Star className="w-4 h-4 text-accent fill-current" />
                      <span className="text-lg font-bold text-foreground">{event.rating}</span>
                    </div>
                    <p className="text-sm text-foreground-secondary">Rating</p>
                  </div>
                  <div>
                    <div className="flex items-center justify-center gap-1 mb-1">
                      <Users className="w-4 h-4 text-secondary" />
                      <span className="text-lg font-bold text-foreground">{event.attendees}</span>
                    </div>
                    <p className="text-sm text-foreground-secondary">Going</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}