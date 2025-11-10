'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Mail, Lock, Eye, EyeOff, Sparkles } from 'lucide-react'
import { useAuth } from '../../../components/providers/AuthProvider'

export default function LoginPage() {
  const router = useRouter()
  const { login } = useAuth() // Use the auth context to login
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      // Simulate login process
      // In a real app, you would make an API call here
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      // Mock user data after successful login
      const userData = {
        id: Date.now(),
        name: 'John Doe', // In a real app, this would come from the API
        email: formData.email,
        avatar: `https://api.dicebear.com/7.x/initials/svg?seed=John Doe&backgroundColor=primary-lime,primary-yellow,primary-coral,primary-navy,primary-purple&fontSize=36`
      }
      
      // Login the user (this stores user data in localStorage)
      login(userData)
      
      // Redirect to main dashboard
      router.push('/main/dashboard')
    } catch (err) {
      setError('Invalid email or password. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <h1 className="text-5xl font-bold text-white font-bold drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">
            <span className="bg-gradient-to-r from-purple-600 via-pink-500 to-yellow-400 bg-clip-text text-transparent" style={{WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'}}>
              GOwUT
            </span>
          </h1>
        </div>

        <div className="bg-card/80 backdrop-blur-xl border border-border rounded-3xl p-8 shadow-xl">
          {error && (
            <div className="mb-6 p-3 bg-danger/20 border border-danger/30 rounded-xl text-danger text-sm">
              {error}
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-foreground-secondary w-5 h-5" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  className="w-full pl-12 pr-4 py-4 bg-white/5 border border-border rounded-xl text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-foreground-secondary w-5 h-5" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  className="w-full pl-12 pr-12 py-4 bg-white/5 border border-border rounded-xl text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-foreground-secondary hover:text-foreground transition-colors"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between mt-2">
              <label className="flex items-center space-x-3">
                <input 
                  type="checkbox" 
                  className="rounded border-border bg-card text-primary focus:ring-primary focus:ring-offset-0" 
                />
                <span className="text-sm text-foreground-secondary">Remember me</span>
              </label>
              <Link href="/auth/forgot-password" className="text-sm text-secondary hover:underline">
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-4 bg-gradient-to-r from-primary via-secondary to-accent hover:from-primary/90 hover:via-secondary/90 hover:to-accent/90 text-foreground font-semibold rounded-xl transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-xl hover:shadow-primary/30 mt-4"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="w-5 h-5 border-2 border-foreground/30 border-t-foreground rounded-full animate-spin mr-2"></div>
                  Signing In...
                </div>
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-foreground-secondary">
              Don't have an account?{' '}
              <Link href="/auth/signup" className="text-primary hover:underline font-semibold">
                Sign up
              </Link>
            </p>
          </div>
        </div>

        <div className="mt-8 text-center">
          <Link href="/" className="text-sm text-foreground-secondary hover:text-foreground transition-colors flex items-center justify-center gap-2">
            <span>←</span> Back to home
          </Link>
        </div>
      </div>
    </div>
  )
}