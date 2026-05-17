import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface WorkProps {
  content: {
    label: string
    heading: string
    subtext: string
    projects: Array<{
      num: string
      title: string
      slug: string
      description: string
      tags: string[]
    }>
  }
}

export default function Work({ content }: WorkProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const headingRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)
  const navigate = useNavigate()

  useEffect(() => {
    const section = sectionRef.current
    const heading = headingRef.current
    const cards = cardsRef.current
    if (!section || !heading || !cards) return

    const cardEls = cards.querySelectorAll('.project-card')

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
    })

    tl.fromTo(
      heading.children,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }
    ).fromTo(
      cardEls,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', stagger: 0.15 },
      '-=0.4'
    )

    return () => {
      tl.kill()
    }
  }, [])

  const inkColor = 'var(--ink)'
  const grayColor = 'var(--gray)'
  const accentColor = 'var(--accent)'
  const cardBg = 'var(--card-bg)'
  const cardBorder = 'var(--card-border)'
  const pillBg = 'var(--pill-bg)'
  const shadowColor = 'var(--shadow)'

  return (
    <section
      ref={sectionRef}
      id="work"
      style={{
        position: 'relative',
        zIndex: 1,
        padding: '160px 40px',
        maxWidth: 1200,
        margin: '0 auto',
      }}
    >
      <div ref={headingRef}>
        <p
          className="font-sans"
          style={{
            fontSize: 12,
            letterSpacing: '1.32px',
            textTransform: 'uppercase',
            color: grayColor,
            fontWeight: 400,
            marginBottom: 16,
            transition: 'color 0.4s ease',
          }}
        >
          {content.label}
        </p>
        <h2
          className="theme-transition"
          style={{
            fontFamily: '"Instrument Serif", Georgia, serif',
            fontSize: 'clamp(32px, 3.5vw, 40px)',
            fontWeight: 400,
            letterSpacing: '-1.2px',
            lineHeight: '44px',
            color: inkColor,
            marginBottom: 8,
            transition: 'color 0.4s ease',
          }}
        >
          {content.heading}
        </h2>
        <p
          className="font-sans"
          style={{
            fontSize: 14,
            color: grayColor,
            marginBottom: 64,
            transition: 'color 0.4s ease',
          }}
        >
          {content.subtext}
        </p>
      </div>

      <div
        ref={cardsRef}
        className="project-grid"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 400px), 1fr))',
          gap: 24,
        }}
      >
        {content.projects.map((project, i) => (
          <div
            key={i}
            className="project-card"
            onClick={() => navigate(`/project/${project.slug}`)}
            style={{
              background: cardBg,
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
              border: `1px solid ${cardBorder}`,
              borderRadius: 16,
              padding: 32,
              transition: 'transform 0.3s ease, box-shadow 0.3s ease, background 0.4s ease, border-color 0.4s ease',
              cursor: 'pointer',
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget
              el.style.transform = 'translateY(-4px)'
              el.style.boxShadow = `0 8px 32px ${shadowColor}`
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget
              el.style.transform = 'translateY(0)'
              el.style.boxShadow = 'none'
            }}
          >
            <p
              className="font-sans"
              style={{
                fontSize: 10,
                letterSpacing: '1.32px',
                textTransform: 'uppercase',
                color: accentColor,
                fontWeight: 400,
                transition: 'color 0.4s ease',
              }}
            >
              {project.num}
            </p>
            <h3
              className="theme-transition"
              style={{
                fontFamily: '"Instrument Serif", Georgia, serif',
                fontSize: 28,
                fontWeight: 400,
                letterSpacing: '-0.84px',
                color: inkColor,
                marginTop: 8,
                transition: 'color 0.4s ease',
              }}
            >
              {project.title}
            </h3>
            <p
              className="font-sans"
              style={{
                fontSize: 16,
                color: grayColor,
                lineHeight: '24px',
                marginTop: 12,
                transition: 'color 0.4s ease',
              }}
            >
              {project.description}
            </p>
            <div
              className="flex flex-wrap"
              style={{ gap: 8, marginTop: 24 }}
            >
              {project.tags.map((tag, j) => (
                <span
                  key={j}
                  className="font-sans"
                  style={{
                    background: pillBg,
                    borderRadius: 20,
                    padding: '4px 12px',
                    fontSize: 11,
                    color: grayColor,
                    transition: 'background 0.4s ease, color 0.4s ease',
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
            <div
              className="flex items-center"
              style={{ marginTop: 20, gap: 4 }}
            >
              <span
                className="font-sans"
                style={{
                  fontSize: 12,
                  color: accentColor,
                  letterSpacing: '0.5px',
                  transition: 'color 0.4s ease',
                }}
              >
                View details →
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
