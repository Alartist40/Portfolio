import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface ContactProps {
  content: {
    label: string
    heading: string
    subtext: string
    email: string
    github: string
    linkedin: string
  }
}

export default function Contact({ content }: ContactProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  const ink = 'var(--ink)'
  const gray = 'var(--gray)'
  const accent = 'var(--accent)'

  useEffect(() => {
    const section = sectionRef.current
    const el = contentRef.current
    if (!section || !el) return

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
    })

    tl.fromTo(
      el.children,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', stagger: 0.1 }
    )

    return () => {
      tl.kill()
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      id="contact"
      style={{
        position: 'relative',
        zIndex: 1,
        padding: '160px 40px 80px',
        maxWidth: 1200,
        margin: '0 auto',
        textAlign: 'center',
      }}
    >
      <div ref={contentRef}>
        <p
          className="font-sans"
          style={{
            fontSize: 12,
            letterSpacing: '1.32px',
            textTransform: 'uppercase',
            color: gray,
            fontWeight: 400,
            marginBottom: 16,
            transition: 'color 0.4s ease',
          }}
        >
          {content.label}
        </p>
        <h2
          style={{
            fontFamily: '"Instrument Serif", Georgia, serif',
            fontSize: 'clamp(32px, 3.5vw, 40px)',
            fontWeight: 400,
            letterSpacing: '-1.2px',
            lineHeight: '44px',
            color: ink,
            marginBottom: 16,
            transition: 'color 0.4s ease',
          }}
        >
          {content.heading}
        </h2>
        <p
          className="font-sans"
          style={{
            fontSize: 16,
            color: gray,
            lineHeight: '24px',
            marginBottom: 40,
            transition: 'color 0.4s ease',
          }}
        >
          {content.subtext}
        </p>

        <a
          href={`mailto:${content.email}`}
          style={{
            fontFamily: '"Instrument Serif", Georgia, serif',
            fontSize: 'clamp(22px, 2.5vw, 28px)',
            fontWeight: 400,
            letterSpacing: '-0.84px',
            color: accent,
            textDecoration: 'none',
            transition: 'color 0.4s ease, text-decoration 0.3s ease',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.textDecoration = 'underline')}
          onMouseLeave={(e) => (e.currentTarget.style.textDecoration = 'none')}
        >
          {content.email}
        </a>

        <div
          className="flex items-center justify-center"
          style={{ gap: 24, marginTop: 32 }}
        >
          <a
            href="https://github.com/Alartist40"
            target="_blank"
            rel="noopener noreferrer"
            className="font-sans"
            style={{
              fontSize: 12,
              letterSpacing: '1.32px',
              textTransform: 'uppercase',
              color: gray,
              textDecoration: 'none',
              transition: 'color 0.3s ease',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = ink)}
            onMouseLeave={(e) => (e.currentTarget.style.color = gray)}
          >
            {content.github}
          </a>
          <span style={{ color: 'var(--border)', transition: 'color 0.4s ease' }}>·</span>
          <a
            href="#"
            className="font-sans"
            style={{
              fontSize: 12,
              letterSpacing: '1.32px',
              textTransform: 'uppercase',
              color: gray,
              textDecoration: 'none',
              transition: 'color 0.3s ease',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = ink)}
            onMouseLeave={(e) => (e.currentTarget.style.color = gray)}
          >
            {content.linkedin}
          </a>
        </div>
      </div>
    </section>
  )
}
