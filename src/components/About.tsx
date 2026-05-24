import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface AboutProps {
  content: {
    label: string
    heading: string
    bio1: string
    bio2: string
    designLabel: string
    designSkills: string
    engLabel: string
    engSkills: string
    stats: Array<{ num: string; label: string }>
  }
}

export default function About({ content }: AboutProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const leftRef = useRef<HTMLDivElement>(null)
  const rightRef = useRef<HTMLDivElement>(null)

  const ink = 'var(--ink)'
  const gray = 'var(--gray)'
  const accent = 'var(--accent)'
  const statBg = 'var(--stat-bg)'

  useEffect(() => {
    const section = sectionRef.current
    const left = leftRef.current
    const right = rightRef.current
    if (!section || !left || !right) return

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
    })

    tl.fromTo(
      left.children,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', stagger: 0.1 }
    ).fromTo(
      right.querySelectorAll('.stat-block'),
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', stagger: 0.15 },
      '-=0.4'
    )

    return () => {
      tl.kill()
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      id="about"
      style={{
        position: 'relative',
        zIndex: 1,
        padding: '160px 40px',
        maxWidth: 1200,
        margin: '0 auto',
      }}
    >
      <div
        className="about-grid"
        style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(300px, 55%) minmax(250px, 45%)',
          gap: 80,
          alignItems: 'start',
        }}
      >
        <div ref={leftRef}>
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
              marginBottom: 32,
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
              marginBottom: 16,
              transition: 'color 0.4s ease',
            }}
          >
            {content.bio1}
          </p>
          <p
            className="font-sans"
            style={{
              fontSize: 16,
              color: gray,
              lineHeight: '24px',
              marginBottom: 48,
              transition: 'color 0.4s ease',
            }}
          >
            {content.bio2}
          </p>

          <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
            <div>
              <h4
                style={{
                  fontFamily: '"Instrument Serif", Georgia, serif',
                  fontSize: 20,
                  fontWeight: 400,
                  color: ink,
                  marginBottom: 4,
                  transition: 'color 0.4s ease',
                }}
              >
                {content.designLabel}
              </h4>
              <p
                className="font-sans"
                style={{ fontSize: 14, color: gray, transition: 'color 0.4s ease' }}
              >
                {content.designSkills}
              </p>
            </div>
            <div>
              <h4
                style={{
                  fontFamily: '"Instrument Serif", Georgia, serif',
                  fontSize: 20,
                  fontWeight: 400,
                  color: ink,
                  marginBottom: 4,
                  transition: 'color 0.4s ease',
                }}
              >
                {content.engLabel}
              </h4>
              <p
                className="font-sans"
                style={{ fontSize: 14, color: gray, transition: 'color 0.4s ease' }}
              >
                {content.engSkills}
              </p>
            </div>
          </div>
        </div>

        <div ref={rightRef}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: 16,
            }}
          >
            {content.stats.map((stat, i) => (
              <div
                key={i}
                className="stat-block"
                style={{
                  background: statBg,
                  backdropFilter: 'blur(12px)',
                  borderRadius: 12,
                  padding: 24,
                  transition: 'background 0.4s ease',
                }}
              >
                <p
                  style={{
                    fontFamily: '"Instrument Serif", Georgia, serif',
                    fontSize: 'clamp(36px, 4vw, 48px)',
                    fontWeight: 400,
                    letterSpacing: '-0.96px',
                    color: accent,
                    lineHeight: 1,
                    transition: 'color 0.4s ease',
                  }}
                >
                  {stat.num}
                </p>
                <p
                  className="font-sans"
                  style={{
                    fontSize: 12,
                    letterSpacing: '1.32px',
                    textTransform: 'uppercase',
                    color: gray,
                    fontWeight: 400,
                    marginTop: 4,
                    transition: 'color 0.4s ease',
                  }}
                >
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
