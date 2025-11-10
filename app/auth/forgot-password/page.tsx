'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { Mail, Lock, Sparkles } from 'lucide-react'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    setIsLoading(false)
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background p-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-10">
            <div className="w-20 h-20 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Sparkles className="w-10 h-10 text-foreground" />
            </div>
            <h1 className="text-5xl font-bold text-white font-bold drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">
              <span className="bg-gradient-to-r from-purple-600 via-pink-500 to-yellow-400 bg-clip-text text-transparent" style={{WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'}}>
                GOwUT
              </span>
            </h1>
          </div>

          <div className="bg-card/80 backdrop-blur-xl border border-border rounded-3xl p-8 shadow-xl text-center">
            <p className="text-foreground-secondary mb-6">
              Didn't receive the email? Check your spam folder or try again.
            </p>
            <Link 
              href="/auth/login" 
              className="inline-block py-4 px-6 bg-gradient-to-r from-primary via-secondary to-accent hover:from-primary/90 hover:via-secondary/90 hover:to-accent/90 text-foreground font-semibold rounded-xl transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-xl hover:shadow-primary/30"
            >
              Back to Login
            </Link>
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
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-foreground-secondary w-5 h-5" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full pl-12 pr-4 py-4 bg-white/5 border border-border rounded-xl text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-4 bg-gradient-to-r from-primary via-secondary to-accent hover:from-primary/90 hover:via-secondary/90 hover:to-accent/90 text-foreground font-semibold rounded-xl transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-xl hover:shadow-primary/30"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="w-5 h-5 border-2 border-foreground/30 border-t-foreground rounded-full animate-spin mr-2"></div>
                  Sending Reset Link...
                </div>
              ) : (
                'Send Reset Link'
              )}
            </button>
          </form>

          <div className="mt-8 text-center">
            <Link href="/auth/login" className="text-sm text-foreground-secondary hover:text-foreground transition-colors flex items-center justify-center gap-2">
              <span>←</span> Back to login
            </Link>
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