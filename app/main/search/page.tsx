'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { 
  Search,
  Filter,
  MapPin,
  Calendar,
  Users,
  Star,
  Heart,
  Share2,
  Clock,
  Sparkles,
  TrendingUp,
  Navigation,
  X,
  ArrowLeft,
  Check
} from 'lucide-react'
import FireworkAnimation from '../../../components/ui/FireworkAnimation'
import ScrollAnimate from '../../../components/ui/ScrollAnimate'

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedFilters, setSelectedFilters] = useState<string[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const [searchResults, setSearchResults] = useState<any[]>([])

  const vibeFilters = [
    { id: 'music', label: 'Music', icon: '🎵', count: 45 },
    { id: 'art', label: 'Art', icon: '🎨', count: 23 },
    { id: 'workshop', label: 'Workshop', icon: '💡', count: 18 },
    { id: 'community', label: 'Community', icon: '👥', count: 32 },
    { id: 'food', label: 'Food', icon: '🍕', count: 28 },
    { id: 'tech', label: 'Tech', icon: '💻', count: 15 },
    { id: 'outdoor', label: 'Outdoor', icon: '🌳', count: 21 },
    { id: 'nightlife', label: 'Nightlife', icon: '🌃', count: 37 }
  ]

  const trendingEvents = [
    {
      id: 1,
      title: "Neon Underground",
      date: "2024-01-15",
      time: "22:00",
      location: "Electric Warehouse",
      attendees: 342,
      image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=400&h=300&fit=crop",
      tags: ["Music", "Nightlife"],
      price: "Free",
      rating: 4.8,
      trending: true
    },
    {
      id: 2,
      title: "Digital Art Gallery",
      date: "2024-01-18",
      time: "18:00",
      location: "Modern Space",
      attendees: 156,
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop",
      tags: ["Art", "Community"],
      price: "₫100,000",
      rating: 4.7,
      trending: true
    },
    {
      id: 3,
      title: "AI Workshop Series",
      date: "2024-01-20",
      time: "14:00",
      location: "Tech Hub",
      attendees: 89,
      image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&h=300&fit=crop",
      tags: ["Tech", "Workshop"],
      price: "₫300,000",
      rating: 4.9,
      trending: true
    },
    {
      id: 4,
      title: "Street Food Festival",
      date: "2024-01-22",
      time: "16:00",
      location: "City Park",
      attendees: 445,
      image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400&h=300&fit=crop",
      tags: ["Food", "Outdoor"],
      price: "₫150,000",
      rating: 4.5,
      trending: true
    }
  ]

  const nearbyEvents = [
    {
      id: 5,
      title: "Indie Coffee Sessions",
      date: "2024-01-16",
      time: "15:00",
      location: "District 1 Café",
      attendees: 67,
      image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=300&fit=crop",
      tags: ["Music", "Community"],
      price: "₫50,000",
      rating: 4.6,
      distance: "0.5km"
    },
    {
      id: 6,
      title: "Startup Networking",
      date: "2024-01-19",
      time: "19:00",
      location: "Innovation Hub",
      attendees: 123,
      image: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=400&h=300&fit=crop",
      tags: ["Tech", "Community"],
      price: "Free",
      rating: 4.4,
      distance: "1.2km"
    },
    {
      id: 7,
      title: "Pottery Workshop",
      date: "2024-01-21",
      time: "10:00",
      location: "Art Studio",
      attendees: 24,
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop",
      tags: ["Art", "Workshop"],
      price: "₫200,000",
      rating: 4.8,
      distance: "0.8km"
    },
    {
      id: 8,
      title: "Rooftop Yoga",
      date: "2024-01-23",
      time: "07:00",
      location: "Skyline Building",
      attendees: 35,
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop",
      tags: ["Outdoor", "Community"],
      price: "₫80,000",
      rating: 4.7,
      distance: "2.1km"
    }
  ]

  const allEvents = [...trendingEvents, ...nearbyEvents]

  useEffect(() => {
    // Simulate search functionality
    if (searchQuery.trim() || selectedFilters.length > 0) {
      setIsSearching(true)
      const filtered = allEvents.filter(event => {
        const matchesSearch = searchQuery.trim() === '' || 
          event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          event.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
          event.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
        
        const matchesFilters = selectedFilters.length === 0 ||
          selectedFilters.some(filter => 
            event.tags.some(tag => tag.toLowerCase() === filter.toLowerCase())
          )
        
        return matchesSearch && matchesFilters
      })
      setSearchResults(filtered)
    } else {
      setIsSearching(false)
      setSearchResults([])
    }
  }, [searchQuery, selectedFilters])

  const toggleFilter = (filterId: string) => {
    setSelectedFilters(prev => 
      prev.includes(filterId) 
        ? prev.filter(f => f !== filterId)
        : [...prev, filterId]
    )
  }

  const clearFilters = () => {
    setSelectedFilters([])
    setSearchQuery('')
  }

  const EventCard = ({ event }: { event: any }) => (
    <Link href={`/main/event/${event.id}`} className="group">
      <div className="relative overflow-hidden rounded-3xl bg-card backdrop-blur-xl border border-border hover:border-primary/30 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-primary/10">
        {/* Event Image */}
        <div className="relative h-48 overflow-hidden">
          <div className="absolute inset-0 bg-primary/10 z-10" />
          <img 
            src={event.image} 
            alt={event.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          
          {/* Badges */}
          <div className="absolute top-4 left-4 flex gap-2 z-20">
            {event.trending && (
              <div className="flex items-center gap-1 px-3 py-1.5 bg-warning/80 backdrop-blur-xl rounded-full border border-warning/30">
                <TrendingUp className="w-3 h-3 text-foreground" />
                <span className="text-xs text-foreground font-medium">Trending</span>
              </div>
            )}
            {event.distance && (
              <div className="flex items-center gap-1 px-3 py-1.5 bg-black/60 backdrop-blur-xl rounded-full border border-white/20">
                <Navigation className="w-3 h-3 text-success" />
                <span className="text-xs text-foreground font-medium">{event.distance}</span>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="absolute top-4 right-4 flex gap-2 z-20">
            <button className="p-2.5 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 text-foreground/80 hover:bg-white/20 hover:scale-110 transition-all duration-300">
              <Heart className="w-4 h-4" />
            </button>
            <button className="p-2.5 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 text-foreground/80 hover:bg-white/20 hover:scale-110 transition-all duration-300">
              <Share2 className="w-4 h-4" />
            </button>
          </div>

          {/* Bottom Info */}
          <div className="absolute bottom-4 left-4 flex gap-2 z-20">
            <div className="flex items-center gap-1 px-3 py-1.5 bg-black/60 backdrop-blur-xl rounded-full border border-white/20">
              <Star className="w-3 h-3 text-accent fill-current" />
              <span className="text-xs text-foreground font-medium">{event.rating}</span>
            </div>
            <div className="px-3 py-1.5 bg-success/80 backdrop-blur-xl rounded-full border border-success/30">
              <span className="text-xs text-foreground font-medium">{event.price}</span>
            </div>
          </div>
        </div>
        
        {/* Event Content */}
        <div className="p-5">
          <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-secondary transition-all duration-500">
            {event.title}
          </h3>
          
          <div className="flex items-center gap-3 mb-3 text-foreground-secondary text-sm">
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4 text-primary" />
              <span>{event.date}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4 text-highlight" />
              <span>{event.time}</span>
            </div>
          </div>
          
          <div className="flex items-center gap-2 mb-3">
            <MapPin className="w-4 h-4 text-primary" />
            <span className="text-sm text-foreground-secondary">{event.location}</span>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-foreground-secondary" />
              <span className="text-sm text-foreground-secondary">{event.attendees} going</span>
            </div>
            
            <div className="flex flex-wrap gap-1">
              {event.tags.slice(0, 2).map((tag: string, index: number) => (
                <span 
                  key={index}
                  className="px-2 py-1 text-xs font-medium bg-primary/20 text-primary rounded-full border border-primary/30"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Link>
  )

  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden">
      {/* Firework Animation Background */}
      <FireworkAnimation />

      <div className="max-w-7xl mx-auto px-6 py-8 relative z-10">
        {/* Search Section */}
        <div className="text-center mb-12">
          <h2 className="text-5xl font-bold mb-6 text-foreground">
            What's Your Vibe?
          </h2>
          
          {/* Large Centered Search Bar */}
          <div className="max-w-2xl mx-auto mb-8">
            <div className="relative">
              <Search className="absolute left-6 top-1/2 transform -translate-y-1/2 text-muted w-6 h-6" />
              <input
                type="text"
                placeholder="Search events, locations, or vibes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-16 pr-6 py-5 text-lg bg-card backdrop-blur-xl border border-border rounded-3xl text-foreground placeholder-muted focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300"
              />
            </div>
          </div>

          {/* Vibe Filters */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-foreground mb-6 flex items-center justify-center gap-3">
              <Filter className="w-5 h-5 text-primary" />
              Vibe Filters
            </h3>
            
            <div className="flex flex-wrap gap-4 justify-center max-w-4xl mx-auto">
              {vibeFilters.map((filter) => (
                <button
                  key={filter.id}
                  onClick={() => toggleFilter(filter.id)}
                  className={`group flex items-center gap-3 px-6 py-4 rounded-2xl backdrop-blur-xl border transition-all duration-300 hover:scale-105 cursor-pointer ${
                    selectedFilters.includes(filter.id)
                      ? 'bg-gradient-to-r from-primary/30 to-secondary/30 border-primary text-foreground shadow-lg shadow-primary/30'
                      : 'bg-card border-border text-muted hover:bg-card-hover hover:border-border-hover'
                  }`}
                >
                  <span className="text-2xl">{filter.icon}</span>
                  <div className="text-left">
                    <span className="font-medium">{filter.label}</span>
                    <div className="text-xs opacity-70">{filter.count} events</div>
                  </div>
                  {selectedFilters.includes(filter.id) && (
                    <div className="ml-auto w-5 h-5 bg-primary rounded-full flex items-center justify-center">
                      <Check className="w-3 h-3 text-foreground" size={12} />
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Search Results or Default Sections */}
        {isSearching ? (
          <div className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-foreground">
                Search Results 
                <span className="text-accent ml-2">({searchResults.length})</span>
              </h3>
            </div>
            
            {searchResults.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {searchResults.map((event, index) => (
                  <ScrollAnimate key={event.id} delay={index * 50}>
                    <EventCard event={event} />
                  </ScrollAnimate>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="w-24 h-24 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Search className="w-12 h-12 text-foreground-secondary" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">No events found</h3>
                <p className="text-foreground-secondary mb-6">Try adjusting your search or filters</p>
                <button 
                  onClick={clearFilters}
                  className="px-6 py-3 bg-primary hover:bg-primary/90 text-foreground font-medium rounded-xl transition-all duration-300 hover:scale-105"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            {/* Trending Now Section */}
            <ScrollAnimate>
              <div className="mb-12">
                <div className="flex items-center gap-3 mb-6">
                  <TrendingUp className="w-6 h-6 text-accent" />
                  <h3 className="text-2xl font-bold text-foreground">Trending Now</h3>
                  <div className="px-3 py-1 bg-accent/20 border border-accent/30 rounded-full">
                    <span className="text-sm text-accent font-medium">Hot</span>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {trendingEvents.map((event, index) => (
                    <ScrollAnimate key={event.id} delay={index * 50}>
                      <EventCard event={event} />
                    </ScrollAnimate>
                  ))}
                </div>
              </div>
            </ScrollAnimate>

            {/* Events Near You Section */}
            <div className="mb-12">
              <div className="flex items-center gap-3 mb-6">
                <Navigation className="w-6 h-6 text-success" />
                <ScrollAnimate>
                  <h3 className="text-2xl font-bold text-foreground">Events Near You</h3>
                </ScrollAnimate>
                <div className="px-3 py-1 bg-success/20 border border-success/30 rounded-full">
                  <span className="text-sm text-success font-medium">Nearby</span>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {nearbyEvents.map((event, index) => (
                  <ScrollAnimate key={event.id} delay={index * 50}>
                    <EventCard event={event} />
                  </ScrollAnimate>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}