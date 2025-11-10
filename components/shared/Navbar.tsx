'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Search, User, Bell, Menu, X, Sparkles, LogOut } from 'lucide-react'
import { useAuth } from '../providers/AuthProvider'

const Navbar = () => {
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const { user, logout } = useAuth()

  const navItems = [
    { href: '/main/dashboard', label: 'Dashboard' },
    { href: '/main/search', label: 'Discover' },
    { href: '/main/timeline', label: 'Timeline' }
  ]

  const isActive = (href: string) => pathname === href || pathname.startsWith(href)

  // Handle logout
  const handleLogout = () => {
    logout()
  }

  return (
    <nav className="sticky top-0 z-50 bg-card/80 backdrop-blur-xl">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Clean Logo */}
          <Link href="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center hover:bg-primary/80 transition-colors duration-300">
              <Sparkles className="w-6 h-6 text-foreground" />
            </div>
            <span className="text-2xl font-bold text-white font-bold drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">
              <span className="bg-gradient-to-r from-purple-600 via-pink-500 to-yellow-400 bg-clip-text text-transparent" style={{WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'}}>
                GOwUT
              </span>
            </span>
          </Link>

          {/* Navigation Items */}
          <div className="hidden md:flex items-center space-x-2 bg-white/5 backdrop-blur-xl rounded-full px-2 py-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`px-4 py-2 text-sm font-medium rounded-full transition-all duration-300 ${
                  isActive(item.href)
                    ? 'bg-primary text-foreground shadow-lg'
                    : 'text-foreground hover:bg-white/10'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-3">
            <button className="p-3 rounded-full bg-white/5 backdrop-blur-xl hover:bg-white/10 text-foreground transition-all duration-300 relative">
              <Bell size={20} />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-accent rounded-full animate-pulse" />
            </button>

            {user ? (
              // Show profile and logout if user is logged in
              <div className="flex items-center space-x-3">
                <Link href="/main/profile" className="p-1 rounded-full bg-white/5 backdrop-blur-xl hover:bg-white/10 transition-all duration-300">
                  <div className="w-9 h-9 bg-primary rounded-full flex items-center justify-center overflow-hidden">
                    <img
                      src={user.avatar || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face"}
                      alt={user.name || "Profile"}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </Link>
                
                <button 
                  onClick={handleLogout}
                  className="p-3 rounded-full bg-white/5 backdrop-blur-xl hover:bg-white/10 text-foreground transition-all duration-300"
                  title="Log out"
                >
                  <LogOut size={20} />
                </button>
              </div>
            ) : (
              // Show login button if user is not logged in
              <Link 
                href="/auth/login" 
                className="px-4 py-2 bg-primary text-foreground rounded-full hover:bg-primary/90 transition-colors duration-300"
              >
                Log In
              </Link>
            )}

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-3 rounded-full bg-white/5 backdrop-blur-xl hover:bg-white/10 text-foreground transition-all duration-300"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 bg-white/5 backdrop-blur-xl rounded-b-2xl mx-4 mb-4">
            <div className="space-y-2 px-4">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`block px-4 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
                    isActive(item.href)
                      ? 'bg-primary text-foreground shadow-lg'
                      : 'text-foreground hover:bg-white/10'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              
              {/* Mobile Login/Logout Button */}
              {user ? (
                <div className="flex flex-col space-y-2">
                  <Link
                    href="/main/profile"
                    className="block px-4 py-3 rounded-full text-sm font-medium text-foreground hover:bg-white/10 transition-all duration-300"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Profile
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsMenuOpen(false);
                    }}
                    className="block w-full text-left px-4 py-3 rounded-full text-sm font-medium text-foreground hover:bg-white/10 transition-all duration-300"
                  >
                    Log Out
                  </button>
                </div>
              ) : (
                <Link
                  href="/auth/login"
                  className="block px-4 py-3 rounded-full text-sm font-medium bg-primary text-foreground hover:bg-primary/90 transition-all duration-300"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Log In
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar