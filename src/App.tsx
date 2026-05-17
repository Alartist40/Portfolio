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

export default function App() {
  const [lang, setLang] = useState<Language>('en')
  const [theme, setTheme] = useState<'light' | 'dark'>('light')
  const [isTransitioning, setIsTransitioning] = useState(false)
  const scrollSpeedRef = useRef(0)
  const lenisRef = useRef<Lenis | null>(null)
  const location = useLocation()
  const isHome = location.pathname === '/'

  // Detect system color scheme preference on mount
  useEffect(() => {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null
    const initialTheme = savedTheme || (prefersDark ? 'dark' : 'light')
    setTheme(initialTheme)
    document.documentElement.setAttribute('data-theme', initialTheme)
  }, [])

  // Persist theme changes
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)
  }, [theme])

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'))
  }, [])

  // Initialize Lenis smooth scroll
  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.08,
      smoothWheel: true,
    })
    lenisRef.current = lenis

    lenis.on('scroll', (e: { velocity: number }) => {
      const normalized = Math.max(-1, Math.min(1, e.velocity / 1000))
      scrollSpeedRef.current = normalized
    })

    let animFrameId: number
    const raf = (time: number) => {
      lenis.raf(time)
      animFrameId = requestAnimationFrame(raf)
    }
    animFrameId = requestAnimationFrame(raf)

    return () => {
      cancelAnimationFrame(animFrameId)
      lenis.destroy()
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

  const c = content[lang]

  return (
    <div
      className="theme-transition"
      style={{
        minHeight: '100vh',
        backgroundColor: 'var(--bg)',
        color: 'var(--ink)',
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
        </Routes>
      </main>
    </div>
  )
}
