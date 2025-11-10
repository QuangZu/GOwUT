'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  ArrowLeft,
  Settings,
  Edit3,
  Camera,
  Calendar,
  MapPin,
  Users,
  Star,
  Heart,
  Share2,
  Clock,
  Sparkles,
  TrendingUp,
  Award,
  Music,
  Palette,
  Code,
  Coffee,
  Mountain,
  Gamepad2,
  BookOpen,
  Camera as CameraIcon,
  MoreHorizontal,
  Plus,
  X,
  LogOut
} from 'lucide-react'
import ThemePicker from '../../../components/features/ThemePicker'
import ThemeSelector from '../../../components/ui/ThemeSelector'
import ScrollAnimate from '../../../components/ui/ScrollAnimate'
import { useTheme } from '../../../hooks/useTheme'
import { useAuth } from '../../../components/providers/AuthProvider'

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState('saved')
  const [isEditingVibes, setIsEditingVibes] = useState(false)
  const { currentTheme } = useTheme()
  const { user, logout } = useAuth()

  // Handle logout
  const handleLogout = () => {
    if (confirm("Are you sure you want to log out?")) {
      logout()
      // Redirect to home page after logout
      window.location.href = '/'
    }
  }

  // Use actual user data from auth context, or fall back to mock data
  const userData = user || {
    id: 1,
    name: "Alex Chen",
    username: "@alexchen",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face",
    bio: "Tech enthusiast, music lover, and art collector. Always hunting for the next cool event in the city! 🎵🎨💻",
    location: "Ho Chi Minh City, Vietnam",
    joinDate: "March 2023",
    stats: {
      eventsAttended: 47,
      eventsSaved: 23,
      following: 156,
      followers: 89
    },
    vibes: [
      { id: 1, name: "#Techno", icon: Music, color: "bg-primary", size: "large" },
      { id: 2, name: "#ArtGallery", icon: Palette, color: "bg-secondary", size: "medium" },
      { id: 3, name: "#TechTalks", icon: Code, color: "bg-accent", size: "large" },
      { id: 4, name: "#Coffee", icon: Coffee, color: "bg-highlight", size: "small" },
      { id: 5, name: "#Outdoor", icon: Mountain, color: "bg-success", size: "medium" },
      { id: 6, name: "#Gaming", icon: Gamepad2, color: "bg-primary", size: "small" },
      { id: 7, name: "#Workshop", icon: BookOpen, color: "bg-secondary", size: "medium" },
      { id: 8, name: "#Photography", icon: CameraIcon, color: "bg-accent", size: "small" }
    ]
  }

  const savedEvents = [
    {
      id: 1,
      title: "Neon Underground",
      date: "2024-01-15",
      time: "22:00",
      location: "Electric Warehouse",
      attendees: 342,
      image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=400&h=300&fit=crop",
      tags: ["#Techno", "#Underground"],
      price: "Free",
      rating: 4.8,
      saved: true
    },
    {
      id: 2,
      title: "Digital Art Gallery",
      date: "2024-01-18",
      time: "18:00",
      location: "Modern Space",
      attendees: 156,
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop",
      tags: ["#ArtGallery", "#Digital"],
      price: "₫100,000",
      rating: 4.7,
      saved: true
    },
    {
      id: 3,
      title: "AI Workshop Series",
      date: "2024-01-20",
      time: "14:00",
      location: "Tech Hub",
      attendees: 89,
      image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&h=300&fit=crop",
      tags: ["#TechTalks", "#AI"],
      price: "₫300,000",
      rating: 4.9,
      saved: true
    }
  ]

  const attendedEvents = [
    {
      id: 4,
      title: "Coffee Culture Expo",
      date: "2024-01-10",
      time: "09:00",
      location: "Central Mall",
      attendees: 234,
      image: "https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=400&h=300&fit=crop",
      tags: ["#Coffee", "#Community"],
      price: "₫50,000",
      rating: 4.5,
      attended: true
    },
    {
      id: 5,
      title: "Mountain Hiking Club",
      date: "2024-01-05",
      time: "06:00",
      location: "Ba Den Mountain",
      attendees: 67,
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop",
      tags: ["#Outdoor", "#Adventure"],
      price: "₫200,000",
      rating: 4.8,
      attended: true
    }
  ]

  const tabs = [
    { id: 'saved', label: 'Saved Events', count: savedEvents.length },
    { id: 'attended', label: 'Attended', count: attendedEvents.length },
    { id: 'settings', label: 'Settings', count: null }
  ]

  const getVibeSize = (size: string) => {
    switch (size) {
      case 'large': return 'w-24 h-24 text-2xl'
      case 'medium': return 'w-20 h-20 text-xl'
      case 'small': return 'w-16 h-16 text-lg'
      default: return 'w-20 h-20 text-xl'
    }
  }

  const EventCard = ({ event }: { event: any }) => (
    <Link href={`/main/event/${event.id}`} className="group">
      <div className="relative overflow-hidden rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 hover:border-purple-500/30 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-purple-500/10">
        {/* Event Image */}
        <div className="relative h-48 overflow-hidden">
          <div className="absolute inset-0 bg-primary/20 z-10" />
          <img
            src={event.image}
            alt={event.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />

          {/* Status Badge */}
          <div className="absolute top-4 left-4 z-20">
            {event.saved && (
              <div className="flex items-center gap-1 px-3 py-1.5 bg-primary/80 backdrop-blur-xl rounded-full border border-primary/30">
                <Heart className="w-3 h-3 text-foreground fill-current" />
                <span className="text-xs text-foreground font-medium">Saved</span>
              </div>
            )}
            {event.attended && (
              <div className="flex items-center gap-1 px-3 py-1.5 bg-success/80 backdrop-blur-xl rounded-full border border-success/30">
                <Award className="w-3 h-3 text-foreground" />
                <span className="text-xs text-foreground font-medium">Attended</span>
              </div>
            )}
          </div>

          {/* Rating & Price */}
          <div className="absolute bottom-4 left-4 flex gap-2 z-20">
            <div className="flex items-center gap-1 px-3 py-1.5 bg-black/60 backdrop-blur-xl rounded-full border border-white/20">
              <Star className="w-3 h-3 text-yellow-400 fill-current" />
              <span className="text-xs text-foreground font-medium">{event.rating}</span>
            </div>
            <div className="px-3 py-1.5 bg-success/80 backdrop-blur-xl rounded-full border border-success/30">
              <span className="text-xs text-foreground font-medium">{event.price}</span>
            </div>
          </div>
        </div>

        {/* Event Content */}
        <div className="p-5">
          <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-all duration-500">
            {event.title}
          </h3>

          <div className="flex items-center gap-3 mb-3 text-foreground-secondary text-sm">
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4 text-primary" />
              <span>{event.date}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4 text-secondary" />
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

  const SettingsContent = () => (
    <div className="space-y-6">
      {/* Theme Settings */}
      <ThemePicker />

      {/* Account Settings */}
      <div className="p-6 bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl">
        <h3 className="text-xl font-bold text-foreground mb-6 flex items-center gap-3">
          <Settings className="w-6 h-6 text-primary" />
          Account Settings
        </h3>

        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/10">
            <div>
              <h4 className="text-foreground font-medium">Email Notifications</h4>
              <p className="text-sm text-foreground-secondary">Get notified about new events and updates</p>
            </div>
            <button className="w-12 h-6 bg-primary rounded-full relative">
              <div className="w-5 h-5 bg-foreground rounded-full absolute right-0.5 top-0.5 transition-transform"></div>
            </button>
          </div>

          <div className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/10">
            <div>
              <h4 className="text-foreground font-medium">Location Services</h4>
              <p className="text-sm text-foreground-secondary">Show events near your location</p>
            </div>
            <button className="w-12 h-6 bg-primary rounded-full relative">
              <div className="w-5 h-5 bg-foreground rounded-full absolute right-0.5 top-0.5 transition-transform"></div>
            </button>
          </div>

          <div className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/10">
            <div>
              <h4 className="text-foreground font-medium">Dark Mode</h4>
              <p className="text-sm text-foreground-secondary">Use dark theme throughout the app</p>
            </div>
            <button className="w-12 h-6 bg-primary rounded-full relative">
              <div className="w-5 h-5 bg-foreground rounded-full absolute right-0.5 top-0.5 transition-transform"></div>
            </button>
          </div>
        </div>
      </div>

      {/* Privacy Settings */}
      <div className="p-6 bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl">
        <h3 className="text-xl font-bold text-foreground mb-6">Privacy & Safety</h3>

        <div className="space-y-4">
          <button className="w-full text-left p-4 bg-white/5 hover:bg-white/10 rounded-2xl border border-white/10 transition-colors">
            <h4 className="text-foreground font-medium">Privacy Policy</h4>
            <p className="text-sm text-foreground-secondary">Read our privacy policy and data usage</p>
          </button>

          <button className="w-full text-left p-4 bg-white/5 hover:bg-white/10 rounded-2xl border border-white/10 transition-colors">
            <h4 className="text-foreground font-medium">Block List</h4>
            <p className="text-sm text-foreground-secondary">Manage blocked users and content</p>
          </button>

          <button className="w-full text-left p-4 bg-danger/20 hover:bg-danger/30 rounded-2xl border border-danger/30 transition-colors">
            <h4 className="text-danger font-medium">Delete Account</h4>
            <p className="text-sm text-foreground-secondary">Permanently delete your account and data</p>
          </button>
        </div>
      </div>
      
      {/* Logout Section */}
      <div className="p-6 bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl">
        <h3 className="text-xl font-bold text-foreground mb-6">Account Security</h3>
        
        <div className="space-y-4">
          <button 
            onClick={handleLogout}
            className="w-full text-left p-4 bg-danger/20 hover:bg-danger/30 rounded-2xl border border-danger/30 transition-colors flex items-center gap-3"
          >
            <LogOut className="w-5 h-5 text-danger" />
            <div className="flex-1">
              <h4 className="text-danger font-medium">Log Out</h4>
              <p className="text-sm text-foreground-secondary">Sign out of your account</p>
            </div>
          </button>
        </div>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Firework Background Effect */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        {/* Randomly moving firework particles with fade and flicker */}
        <div className="absolute w-2 h-2 bg-primary/50 rounded-full animate-float-pulse" style={{left: '30%', top: '20%', animationDelay: '0s', animationDuration: '4s'}}></div>
        <div className="absolute w-1.5 h-1.5 bg-secondary/50 rounded-full animate-float-pulse" style={{left: '65%', top: '35%', animationDelay: '1s', animationDuration: '3.5s'}}></div>
        <div className="absolute w-2.5 h-2.5 bg-success/50 rounded-full animate-float-pulse" style={{left: '45%', top: '65%', animationDelay: '2s', animationDuration: '4.5s'}}></div>
        <div className="absolute w-2 h-2 bg-accent/50 rounded-full animate-float-pulse" style={{left: '80%', top: '10%', animationDelay: '1.5s', animationDuration: '5s'}}></div>
        <div className="absolute w-1.5 h-1.5 bg-danger/50 rounded-full animate-float-pulse" style={{left: '15%', top: '75%', animationDelay: '2.5s', animationDuration: '3.8s'}}></div>
        <div className="absolute w-2 h-2 bg-highlight/50 rounded-full animate-float-pulse" style={{left: '55%', top: '45%', animationDelay: '0.5s', animationDuration: '4.2s'}}></div>

        {/* Additional randomly moving firework particles */}
        <div className="absolute w-1.5 h-1.5 bg-primary/50 rounded-full animate-float-pulse" style={{left: '25%', top: '50%', animationDelay: '0.7s', animationDuration: '4.7s'}}></div>
        <div className="absolute w-2 h-2 bg-accent/50 rounded-full animate-float-pulse" style={{left: '70%', top: '25%', animationDelay: '1.2s', animationDuration: '3.9s'}}></div>
        <div className="absolute w-1.5 h-1.5 bg-danger/50 rounded-full animate-float-pulse" style={{left: '50%', top: '15%', animationDelay: '1.8s', animationDuration: '4.1s'}}></div>
        <div className="absolute w-2 h-2 bg-success/50 rounded-full animate-float-pulse" style={{left: '85%', top: '60%', animationDelay: '2.2s', animationDuration: '4.6s'}}></div>

        {/* Additional firework particles for more dynamic effect */}
        <div className="absolute w-1.5 h-1.5 bg-warning/50 rounded-full animate-float-pulse" style={{left: '10%', top: '40%', animationDelay: '3s', animationDuration: '4.4s'}}></div>
        <div className="absolute w-2 h-2 bg-primary/50 rounded-full animate-float-pulse" style={{left: '90%', top: '30%', animationDelay: '1.4s', animationDuration: '3.7s'}}></div>
        <div className="absolute w-1 h-1 bg-info/50 rounded-full animate-float-pulse" style={{left: '40%', top: '80%', animationDelay: '2.8s', animationDuration: '5.1s'}}></div>
        <div className="absolute w-1.5 h-1.5 bg-success/50 rounded-full animate-float-pulse" style={{left: '60%', top: '70%', animationDelay: '0.3s', animationDuration: '4.9s'}}></div>

        {/* AI Neural Network Lines - Dimmed */}
        <div className="absolute inset-0 opacity-2">
          <svg className="w-full h-full">
            <defs>
              <linearGradient id="line-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#8B5CF6" />
                <stop offset="100%" stopColor="#EC4899" />
              </linearGradient>
            </defs>
            <path d="M0,100 Q150,50 300,100 T600,100" stroke={"url(#line-gradient)"} strokeWidth="1" fill="none"/>
            <path d="M100,0 Q200,150 300,100 T500,200" stroke={"url(#line-gradient)"} strokeWidth="1" fill="none"/>
            <path d="M200,300 Q350,200 500,300 T800,250" stroke={"url(#line-gradient)"} strokeWidth="1" fill="none"/>
          </svg>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-8">
        {/* Profile Header */}
        <div className="mb-12">
          <div className="flex items-start gap-8 mb-8">
            {/* Profile Picture */}
            <div className="relative group">
              <div className="w-32 h-32 rounded-3xl overflow-hidden border-4 border-primary p-1">
                <img
                  src={userData?.avatar || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face"}
                  alt={userData?.name || "Profile"}
                  className="w-full h-full object-cover rounded-2xl"
                />
              </div>
              <button className="absolute bottom-2 right-2 p-2 bg-primary rounded-xl shadow-lg hover:scale-110 transition-transform">
                <Camera className="w-4 h-4 text-foreground" />
              </button>
            </div>

            {/* User Info */}
            <div className="flex-1">
              <div className="flex items-center gap-4 mb-3">
                <h1 className="text-4xl font-bold text-foreground">Hello, {userData?.name?.split(' ')[0] || 'User'}!</h1>
                <button className="p-2 rounded-xl bg-white/5 hover:bg-white/10 transition-colors">
                  <Edit3 className="w-5 h-5 text-foreground-secondary" />
                </button>
              </div>

              <p className="text-xl text-foreground-secondary mb-2">{userData?.username || '@username'}</p>
              <p className="text-foreground-secondary mb-4 max-w-2xl">{userData?.bio || 'No bio available'}</p>

              <div className="flex items-center gap-6 text-sm text-foreground-secondary mb-6">
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  {userData?.location || 'Location not set'}
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  Joined {userData?.joinDate || 'Date unknown'}
                </div>
              </div>

              {/* Stats */}
              <div className="flex gap-8">
                {[
                  { label: 'Events Attended', value: userData?.stats?.eventsAttended || 0 },
                  { label: 'Saved Events', value: userData?.stats?.eventsSaved || 0 },
                  { label: 'Following', value: userData?.stats?.following || 0 },
                  { label: 'Followers', value: userData?.stats?.followers || 0 }
                ].map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                      {stat.value}
                    </div>
                    <div className="text-sm text-foreground-secondary">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* My Vibe Section */}
          <ScrollAnimate>
            <div className="p-8 bg-card/80 backdrop-blur-xl border border-border rounded-3xl">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <Sparkles className="w-8 h-8 text-accent" />
                  <h2 className="text-3xl font-bold text-foreground">My Vibe</h2>
                </div>
                <button
                  onClick={() => setIsEditingVibes(!isEditingVibes)}
                  className="flex items-center gap-2 px-4 py-2 bg-primary hover:bg-button-hover text-foreground rounded-xl transition-all duration-300 hover:scale-105 cursor-pointer"
                >
                  {isEditingVibes ? <X className="w-4 h-4" /> : <Edit3 className="w-4 h-4" />}
                  <span className="text-sm font-medium">{isEditingVibes ? 'Done' : 'Edit'}</span>
                </button>
              </div>

              {/* Vibe Tags and Theme Selector */}
              <div className="space-y-8">
                {/* Vibe Tags */}
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-4">Interests</h3>
                  <div className="flex flex-wrap gap-3 justify-center">
                    {(userData?.vibes || []).map((vibe: any, index: number) => {
                      const Icon = vibe.icon
                      return (
                        <div
                          key={vibe.id}
                          className="relative flex items-center gap-2 px-4 py-3 bg-card border border-border rounded-full cursor-pointer hover:bg-card-hover transition-all duration-300"
                        >
                          <Icon className="w-5 h-5 text-primary" />
                          <span className="text-sm font-medium text-foreground">{vibe.name}</span>
                          {isEditingVibes && (
                            <button className="ml-2 w-5 h-5 bg-danger rounded-full flex items-center justify-center hover:scale-110 transition-transform cursor-pointer">
                              <X className="w-3 h-3 text-foreground" />
                            </button>
                          )}
                        </div>
                      )
                    })}

                    {isEditingVibes && (
                      <button className="flex items-center gap-2 px-4 py-3 border-2 border-dashed border-border rounded-full hover:border-secondary hover:bg-secondary/10 transition-all duration-300 cursor-pointer">
                        <Plus className="w-5 h-5 text-muted" />
                        <span className="text-sm text-muted">Add Vibe</span>
                      </button>
                    )}
                  </div>
                </div>

                {/* Theme Selector */}
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-4">Appearance</h3>
                  <ThemeSelector />
                </div>
              </div>
            </div>
          </ScrollAnimate>
        </div>

        {/* Tabs */}
        <div className="mb-8">
          <div className="flex gap-1 p-1 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl w-fit">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 flex items-center gap-2 ${
                  activeTab === tab.id
                    ? 'bg-primary text-foreground shadow-lg'
                    : 'text-foreground-secondary hover:text-foreground hover:bg-white/5'
                }`}
              >
                {tab.label}
                {tab.count !== null && (
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    activeTab === tab.id
                      ? 'bg-white/20 text-foreground'
                      : 'bg-white/10 text-foreground-secondary'
                  }`}>
                    {tab.count}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div>
          {activeTab === 'saved' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <ScrollAnimate>
                  <h3 className="text-2xl font-bold text-foreground">Saved Events</h3>
                </ScrollAnimate>
                <Link
                  href="/main/search"
                  className="px-4 py-2 bg-primary hover:bg-primary/90 rounded-xl text-sm font-medium transition-all duration-300 hover:scale-105"
                >
                  Discover More
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {savedEvents.map((event, index) => (
                  <ScrollAnimate key={event.id} delay={index * 50}>
                    <EventCard event={event} />
                  </ScrollAnimate>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'attended' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <ScrollAnimate>
                  <h3 className="text-2xl font-bold text-foreground">Attended Events</h3>
                </ScrollAnimate>
                <div className="flex items-center gap-2 px-4 py-2 bg-success/20 border border-success/30 rounded-xl">
                  <Award className="w-4 h-4 text-success" />
                  <span className="text-sm text-success font-medium">{attendedEvents.length} Completed</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {attendedEvents.map((event, index) => (
                  <ScrollAnimate key={event.id} delay={index * 50}>
                    <EventCard event={event} />
                  </ScrollAnimate>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'settings' && <SettingsContent />}
        </div>
      </div>
    </div>
  )
}