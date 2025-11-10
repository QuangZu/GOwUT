export interface Theme {
  id: string
  name: string
  colors: {
    // Primary Colors
    primary: string
    secondary: string
    accent: string
    highlight: string
    success: string
    // Backgrounds
    background: string
    backgroundSecondary: string
    card: string
    cardHover: string
    // Text
    foreground: string
    foregroundSecondary: string
    muted: string
    // UI Elements
    border: string
    borderHover: string
    button: string
    buttonHover: string
    // Status Colors
    danger: string
    warning: string
    info: string
  }
  gradient: {
    primary: string
    secondary: string
    accent: string
  }
}

export const themes: Theme[] = [
  {
    id: 'default',
    name: 'GOwUT Classic',
    colors: {
      primary: '#3A4C91',
      secondary: '#9FAF36',
      accent: '#F1D976',
      highlight: '#F37777',
      success: '#A1387A',
      background: '#000000',
      backgroundSecondary: '#0a0a0a',
      card: '#111111',
      cardHover: '#1a1a1a',
      foreground: '#ffffff',
      foregroundSecondary: '#e5e5e5',
      muted: '#888888',
      border: '#333333',
      borderHover: '#444444',
      button: '#3A4C91',
      buttonHover: '#2d3a73',
      danger: '#ef4444',
      warning: '#f59e0b',
      info: '#3b82f6'
    },
    gradient: {
      primary: 'linear-gradient(135deg, #3A4C91, #9FAF36)',
      secondary: 'linear-gradient(135deg, #F1D976, #F37777)',
      accent: 'linear-gradient(135deg, #A1387A, #3A4C91)'
    }
  },
  {
    id: 'midnight',
    name: 'Midnight Blue',
    colors: {
      primary: '#1e3a8a',
      secondary: '#84cc16',
      accent: '#fbbf24',
      highlight: '#f87171',
      success: '#8b5cf6',
      background: '#0f172a',
      backgroundSecondary: '#1e293b',
      card: '#334155',
      cardHover: '#475569',
      foreground: '#f1f5f9',
      foregroundSecondary: '#cbd5e1',
      muted: '#94a3b8',
      border: '#475569',
      borderHover: '#64748b',
      button: '#1e3a8a',
      buttonHover: '#1e40af',
      danger: '#ef4444',
      warning: '#f59e0b',
      info: '#3b82f6'
    },
    gradient: {
      primary: 'linear-gradient(135deg, #1e3a8a, #84cc16)',
      secondary: 'linear-gradient(135deg, #fbbf24, #f87171)',
      accent: 'linear-gradient(135deg, #8b5cf6, #1e3a8a)'
    }
  },
  {
    id: 'sunset',
    name: 'Sunset Vibes',
    colors: {
      primary: '#dc2626',
      secondary: '#f59e0b',
      accent: '#fb923c',
      highlight: '#c026d3',
      success: '#65a30d',
      background: '#1a0b08',
      backgroundSecondary: '#2d1b1b',
      card: '#451a03',
      cardHover: '#7c2d12',
      foreground: '#fef2f2',
      foregroundSecondary: '#fed7aa',
      muted: '#fdba74',
      border: '#7c2d12',
      borderHover: '#9a3412',
      button: '#dc2626',
      buttonHover: '#b91c1c',
      danger: '#ef4444',
      warning: '#f59e0b',
      info: '#fb923c'
    },
    gradient: {
      primary: 'linear-gradient(135deg, #dc2626, #f59e0b)',
      secondary: 'linear-gradient(135deg, #fb923c, #c026d3)',
      accent: 'linear-gradient(135deg, #65a30d, #dc2626)'
    }
  },
  {
    id: 'forest',
    name: 'Forest Green',
    colors: {
      primary: '#14532d',
      secondary: '#84cc16',
      accent: '#eab308',
      highlight: '#fb7185',
      success: '#a855f7',
      background: '#0c1a0f',
      backgroundSecondary: '#1a2e1a',
      card: '#22543d',
      cardHover: '#15803d',
      foreground: '#f0fdf4',
      foregroundSecondary: '#dcfce7',
      muted: '#86efac',
      border: '#22543d',
      borderHover: '#16a34a',
      button: '#14532d',
      buttonHover: '#166534',
      danger: '#ef4444',
      warning: '#eab308',
      info: '#06b6d4'
    },
    gradient: {
      primary: 'linear-gradient(135deg, #14532d, #84cc16)',
      secondary: 'linear-gradient(135deg, #eab308, #fb7185)',
      accent: 'linear-gradient(135deg, #a855f7, #14532d)'
    }
  },
  {
    id: 'ocean',
    name: 'Ocean Depths',
    colors: {
      primary: '#164e63',
      secondary: '#06b6d4',
      accent: '#fcd34d',
      highlight: '#f472b6',
      success: '#8b5cf6',
      background: '#0a1929',
      backgroundSecondary: '#1e3a5f',
      card: '#0369a1',
      cardHover: '#0284c7',
      foreground: '#e0f2fe',
      foregroundSecondary: '#bae6fd',
      muted: '#67e8f9',
      border: '#0369a1',
      borderHover: '#0284c7',
      button: '#164e63',
      buttonHover: '#155e75',
      danger: '#ef4444',
      warning: '#fcd34d',
      info: '#06b6d4'
    },
    gradient: {
      primary: 'linear-gradient(135deg, #164e63, #06b6d4)',
      secondary: 'linear-gradient(135deg, #fcd34d, #f472b6)',
      accent: 'linear-gradient(135deg, #8b5cf6, #164e63)'
    }
  }
]

export const getTheme = (themeId: string): Theme => {
  return themes.find(theme => theme.id === themeId) || themes[0]
}

export const applyTheme = (theme: Theme) => {
  const root = document.documentElement
  Object.entries(theme.colors).forEach(([key, value]) => {
    const cssVar = key.replace(/([A-Z])/g, '-$1').toLowerCase()
    root.style.setProperty(`--${cssVar}`, value)
  })
}