import { useEffect, useRef, useState, useCallback } from 'react'
import { Routes, Route, useLocation } from 'react-router'
import Lenis from 'lenis'
import AuroraSphere from './components/AuroraSphere'
import Navigation from './components/Navigation'
import Hero from './components/Hero'
import Work from './components/Work'
import About from './components/About'
import Contact from './components/Contact'
import Footer from './components/Footer'
import ProjectDetail from './pages/ProjectDetail'
import { content, type Language } from './data/content'

function getSafeTheme(): 'light' | 'dark' {
  try {
    const saved = localStorage.getItem('theme') as 'light' | 'dark' | null
    if (saved === 'light' || saved === 'dark') return saved
    if (typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark'
    }
  } catch {
    // ignore security/permission errors in sandboxed environments
  }
  return 'light'
}

function setSafeTheme(theme: 'light' | 'dark') {
  try {
    localStorage.setItem('theme', theme)
  } catch {
    // ignore
  }
}

export default function App() {
  const [lang, setLang] = useState<Language>('en')
  const [theme, setTheme] = useState<'light' | 'dark'>('light')
  const [isTransitioning, setIsTransitioning] = useState(false)
  const scrollSpeedRef = useRef<number>(0)
  const lenisRef = useRef<Lenis | null>(null)
  const location = useLocation()
  const isHome = location.pathname === '/' || location.pathname === ''

  // Initialize theme
  useEffect(() => {
    const initialTheme = getSafeTheme()
    setTheme(initialTheme)
    document.documentElement.setAttribute('data-theme', initialTheme)
  }, [])

  // Persist theme changes
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    setSafeTheme(theme)
  }, [theme])

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'))
  }, [])

  // Initialize Lenis smooth scroll safely
  useEffect(() => {
    let lenis: Lenis | null = null
    let animFrameId: number | null = null

    try {
      lenis = new Lenis({
        lerp: 0.08,
        smoothWheel: true,
      })
      lenisRef.current = lenis

      lenis.on('scroll', (e: { velocity: number }) => {
        const normalized = Math.max(-1, Math.min(1, e.velocity / 1000))
        scrollSpeedRef.current = normalized
      })

      const raf = (time: number) => {
        lenis?.raf(time)
        animFrameId = requestAnimationFrame(raf)
      }
      animFrameId = requestAnimationFrame(raf)
    } catch (e) {
      console.warn('Lenis smooth scrolling disabled:', e)
    }

    return () => {
      if (animFrameId) cancelAnimationFrame(animFrameId)
      try {
        lenis?.destroy()
      } catch {
        // ignore
      }
    }
  }, [])

  // Language toggle with fade transition
  const toggleLang = useCallback(() => {
    setIsTransitioning(true)
    setTimeout(() => {
      setLang((prev) => (prev === 'en' ? 'jp' : 'en'))
      setTimeout(() => {
        setIsTransitioning(false)
      }, 50)
    }, 300)
  }, [])

  const c = content[lang] || content.en

  return (
    <div
      className="theme-transition"
      style={{
        minHeight: '100vh',
        backgroundColor: 'var(--bg, #F4F1EA)',
        color: 'var(--ink, #191919)',
        opacity: isTransitioning ? 0 : 1,
        transition: 'opacity 0.3s ease, background-color 0.4s ease, color 0.4s ease',
      }}
    >
      {/* Fixed aurora sphere background — only on home page */}
      {isHome && <AuroraSphere scrollSpeedRef={scrollSpeedRef} />}

      {/* Navigation */}
      <Navigation
        lang={lang}
        onToggleLang={toggleLang}
        theme={theme}
        onToggleTheme={toggleTheme}
      />

      {/* Routes */}
      <main style={{ position: 'relative', zIndex: 1 }}>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Hero content={c.hero} />
                <Work content={c.work} />
                <About content={c.about} />
                <Contact content={c.contact} />
                <Footer content={c.footer} />
              </>
            }
          />
          <Route
            path="/project/:slug"
            element={<ProjectDetail lang={lang} />}
          />
          {/* Catch-all fallback route to ensure no blank page on unexpected URLs */}
          <Route
            path="*"
            element={
              <>
                <Hero content={c.hero} />
                <Work content={c.work} />
                <About content={c.about} />
                <Contact content={c.contact} />
                <Footer content={c.footer} />
              </>
            }
          />
        </Routes>
      </main>
    </div>
  )
}
