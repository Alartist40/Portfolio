import { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router'
import type { Language } from '../data/content'

interface NavigationProps {
  lang: Language
  onToggleLang: () => void
  theme: 'light' | 'dark'
  onToggleTheme: () => void
}

export default function Navigation({ lang, onToggleLang, theme, onToggleTheme }: NavigationProps) {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()
  const isHome = location.pathname === '/'

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
  }, [location])

  const scrollTo = (id: string) => {
    if (!isHome) {
      navigate('/')
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
      }, 100)
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    }
    setMobileOpen(false)
  }

  const navItems = [
    { key: 'work', id: 'work', en: 'Work', jp: '作品' },
    { key: 'about', id: 'about', en: 'About', jp: 'について' },
    { key: 'contact', id: 'contact', en: 'Contact', jp: '連絡先' },
  ]

  const bgColor = scrolled
    ? `var(--nav-bg)`
    : 'transparent'
  const inkColor = 'var(--ink)'
  const grayColor = 'var(--gray)'

  return (
    <nav
      className="fixed top-0 left-0 w-full z-50 transition-all duration-300 theme-transition"
      style={{
        backgroundColor: bgColor,
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
      }}
    >
      <div
        className="flex items-center justify-between"
        style={{ height: 64, padding: '0 40px', maxWidth: 1200, margin: '0 auto' }}
      >
        {/* Logo */}
        <span
          className="font-sans cursor-pointer"
          style={{
            fontSize: 12,
            letterSpacing: '1.32px',
            textTransform: 'uppercase' as const,
            color: inkColor,
            fontWeight: 400,
            transition: 'color 0.4s ease',
          }}
          onClick={() => {
            if (!isHome) navigate('/')
            else window.scrollTo({ top: 0, behavior: 'smooth' })
          }}
        >
          ROMERO ALEJANDRO
        </span>

        {/* Desktop nav */}
        <div className="nav-desktop flex items-center" style={{ gap: 24 }}>
          {navItems.map((item) => (
            <button
              key={item.key}
              onClick={() => scrollTo(item.id)}
              className="font-sans transition-colors duration-300"
              style={{
                fontSize: 12,
                letterSpacing: '1.32px',
                textTransform: 'uppercase' as const,
                color: grayColor,
                fontWeight: 400,
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                transition: 'color 0.3s ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = inkColor)}
              onMouseLeave={(e) => (e.currentTarget.style.color = grayColor)}
            >
              {lang === 'en' ? item.en : item.jp}
            </button>
          ))}

          {/* Theme toggle */}
          <button
            onClick={onToggleTheme}
            title={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
            className="font-sans transition-colors duration-300"
            style={{
              fontSize: 14,
              color: grayColor,
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '4px 8px',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = inkColor)}
            onMouseLeave={(e) => (e.currentTarget.style.color = grayColor)}
          >
            {theme === 'light' ? '☾' : '☀'}
          </button>

          {/* Lang toggle */}
          <button
            onClick={onToggleLang}
            className="font-sans transition-colors duration-300"
            style={{
              fontSize: 12,
              letterSpacing: '1.32px',
              color: grayColor,
              fontWeight: 400,
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              transition: 'color 0.3s ease',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = inkColor)}
            onMouseLeave={(e) => (e.currentTarget.style.color = grayColor)}
          >
            {lang === 'en' ? 'EN | 日本語' : '日本語 | EN'}
          </button>
        </div>

        {/* Mobile hamburger */}
        <button
          className="nav-mobile-toggle"
          onClick={() => setMobileOpen(!mobileOpen)}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            color: inkColor,
            fontSize: 20,
            padding: 4,
          }}
        >
          {mobileOpen ? '✕' : '☰'}
        </button>
      </div>

      {/* Mobile menu overlay */}
      {mobileOpen && (
        <div
          className="nav-mobile-menu"
          style={{
            position: 'absolute',
            top: 64,
            left: 0,
            right: 0,
            backgroundColor: 'var(--nav-bg)',
            backdropFilter: 'blur(12px)',
            padding: '24px 40px',
            borderTop: '1px solid var(--border)',
          }}
        >
          <div className="flex flex-col" style={{ gap: 20 }}>
            {navItems.map((item) => (
              <button
                key={item.key}
                onClick={() => scrollTo(item.id)}
                className="font-sans text-left"
                style={{
                  fontSize: 14,
                  letterSpacing: '1.32px',
                  textTransform: 'uppercase' as const,
                  color: grayColor,
                  fontWeight: 400,
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                }}
              >
                {lang === 'en' ? item.en : item.jp}
              </button>
            ))}
            <div className="flex items-center" style={{ gap: 24, marginTop: 8 }}>
              <button
                onClick={onToggleTheme}
                className="font-sans"
                style={{
                  fontSize: 14,
                  color: grayColor,
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                }}
              >
                {theme === 'light' ? '☾ Dark' : '☀ Light'}
              </button>
              <button
                onClick={onToggleLang}
                className="font-sans"
                style={{
                  fontSize: 12,
                  letterSpacing: '1.32px',
                  color: grayColor,
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                }}
              >
                {lang === 'en' ? 'EN | 日本語' : '日本語 | EN'}
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
