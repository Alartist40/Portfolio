import { useEffect, useRef, useState } from 'react'

interface HeroProps {
  content: {
    label: string
    titleLine1: string
    titleLine2: string
    subtitle: string
    ctaProjects: string
    ctaContact: string
    scroll: string
  }
}

const GLYPHS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*'

function ScrambleLine({
  text,
  delay,
}: {
  text: string
  delay: number
}) {
  const [display, setDisplay] = useState('')
  const [done, setDone] = useState(false)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    setDisplay('')
    setDone(false)
    const startTimeout = setTimeout(() => {
      let iteration = 0
      const totalFrames = 40

      intervalRef.current = setInterval(() => {
        setDisplay(
          text
            .split('')
            .map((char, i) => {
              if (char === ' ') return ' '
              const threshold = Math.pow(iteration / totalFrames, 2) * text.length
              if (i < threshold) return text[i]
              return GLYPHS[Math.floor(Math.random() * GLYPHS.length)]
            })
            .join('')
        )

        iteration++
        if (iteration > totalFrames) {
          setDisplay(text)
          setDone(true)
          if (intervalRef.current) clearInterval(intervalRef.current)
        }
      }, 30)
    }, delay)

    return () => {
      clearTimeout(startTimeout)
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [text, delay])

  return (
    <span
      style={{
        opacity: done ? 1 : 0.9,
        transition: 'opacity 0.3s ease',
      }}
    >
      {display || '\u00A0'}
    </span>
  )
}

export default function Hero({ content }: HeroProps) {
  const ink = 'var(--ink)'
  const gray = 'var(--gray)'
  const accent = 'var(--accent)'
  const ts = 'var(--text-shadow)'

  return (
    <section
      id="hero"
      className="relative flex flex-col items-center justify-center"
      style={{
        minHeight: '100vh',
        textAlign: 'center',
        zIndex: 1,
        padding: '0 24px',
      }}
    >
      <div style={{ maxWidth: 800 }}>
        <p
          className="font-sans"
          style={{
            fontSize: 12,
            letterSpacing: '1.32px',
            textTransform: 'uppercase',
            color: gray,
            fontWeight: 400,
            marginBottom: 32,
            transition: 'color 0.4s ease',
          }}
        >
          {content.label}
        </p>

        <h1
          style={{
            fontFamily: '"Instrument Serif", Georgia, serif',
            fontSize: 'clamp(36px, 5vw, 64px)',
            fontWeight: 400,
            letterSpacing: '-2.56px',
            lineHeight: '1.05',
            color: ink,
            textShadow: ts,
            transition: 'color 0.4s ease',
          }}
        >
          <ScrambleLine text={content.titleLine1} delay={200} />
          <br />
          <ScrambleLine text={content.titleLine2} delay={600} />
        </h1>

        <p
          className="font-sans"
          style={{
            fontSize: 16,
            color: gray,
            lineHeight: '24px',
            marginTop: 24,
            maxWidth: 480,
            margin: '24px auto 0',
            transition: 'color 0.4s ease',
          }}
        >
          {content.subtitle}
        </p>

        <div
          className="flex items-center justify-center flex-wrap"
          style={{ gap: 16, marginTop: 48 }}
        >
          <button
            onClick={() =>
              document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' })
            }
            className="font-sans"
            style={{
              fontSize: 14,
              color: accent,
              textDecoration: 'none',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              transition: 'color 0.4s ease',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.textDecoration = 'underline')}
            onMouseLeave={(e) => (e.currentTarget.style.textDecoration = 'none')}
          >
            {content.ctaProjects}
          </button>
          <button
            onClick={() =>
              document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
            }
            className="font-sans"
            style={{
              fontSize: 14,
              color: accent,
              textDecoration: 'none',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              transition: 'color 0.4s ease',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.textDecoration = 'underline')}
            onMouseLeave={(e) => (e.currentTarget.style.textDecoration = 'none')}
          >
            {content.ctaContact}
          </button>
        </div>
      </div>

      <div
        className="flex flex-col items-center"
        style={{ position: 'absolute', bottom: 64 }}
      >
        <div
          style={{
            width: 200,
            height: 1,
            backgroundColor: 'var(--border)',
            marginBottom: 12,
            transition: 'background-color 0.4s ease',
          }}
        />
        <span
          className="font-sans"
          style={{
            fontSize: 10,
            letterSpacing: '1.32px',
            textTransform: 'uppercase',
            color: gray,
            transition: 'color 0.4s ease',
          }}
        >
          {content.scroll}
        </span>
      </div>
    </section>
  )
}
