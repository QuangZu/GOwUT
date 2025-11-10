import type { Config } from 'tailwindcss';

export default {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Theme System Colors
        primary: "var(--primary)",
        secondary: "var(--secondary)",
        accent: "var(--accent)",
        highlight: "var(--highlight)",
        success: "var(--success)",
        
        // Backgrounds
        background: "var(--background)",
        "background-secondary": "var(--background-secondary)",
        card: "var(--card)",
        "card-hover": "var(--card-hover)",
        
        // Text
        foreground: "var(--foreground)",
        "foreground-secondary": "var(--foreground-secondary)",
        muted: "var(--muted)",
        
        // UI Elements
        border: "var(--border)",
        "border-hover": "var(--border-hover)",
        button: "var(--button)",
        "button-hover": "var(--button-hover)",
        
        // Status Colors
        danger: "var(--danger)",
        warning: "var(--warning)",
        info: "var(--info)",
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'vibrant-pink-purple': 'linear-gradient(135deg, #EC4899, #8B5CF6)',
        'vibrant-blue-cyan': 'linear-gradient(135deg, #3B82F6, #06B6D4)',
        'vibrant-orange-red': 'linear-gradient(135deg, #F97316, #EF4444)',
        'vibrant-green-teal': 'linear-gradient(135deg, #10B981, #14B8A6)',
      },
      animation: {
        blob: 'blob 7s infinite',
      },
      keyframes: {
        blob: {
          '0%': { transform: 'translate(0px, 0px) scale(1)' },
          '33%': { transform: 'translate(30px, -50px) scale(1.1)' },
          '66%': { transform: 'translate(-20px, 20px) scale(0.9)' },
          '100%': { transform: 'translate(0px, 0px) scale(1)' },
        }
      }
    },
  },
  plugins: [],
} satisfies Config;