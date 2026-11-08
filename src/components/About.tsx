import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export interface AboutPillar {
  num: string
  title: string
  description: string
  tags: string[]
}

export interface TimelineItem {
  period: string
  title: string
  role: string
  desc: string
}

export interface VolunteerCategory {
  category: string
  items: string[]
}

interface AboutProps {
  content: {
    label: string
    heading: string
    intro1: string
    intro2: string
    pillarsHeading: string
    pillars: AboutPillar[]
    skillsHeading: string
    skills: Array<{ category: string; items: string }>
    stats: Array<{ num: string; label: string }>
    timelineHeading?: string
    timeline?: TimelineItem[]
    volunteerHeading?: string
    volunteerSubtext?: string
    volunteerCategories?: VolunteerCategory[]
  }
}

export default function About({ content }: AboutProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const introRef = useRef<HTMLDivElement>(null)
  const pillarsRef = useRef<HTMLDivElement>(null)

  const ink = 'var(--ink)'
  const gray = 'var(--gray)'
  const accent = 'var(--accent)'
  const cardBg = 'var(--card-bg)'
  const cardBorder = 'var(--card-border)'
  const statBg = 'var(--stat-bg)'
  const pillBg = 'var(--pill-bg)'
  const shadowColor = 'var(--shadow)'

  useEffect(() => {
    const section = sectionRef.current
    const intro = introRef.current
    const pillars = pillarsRef.current
    if (!section) return

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
    })

    if (intro) {
      tl.fromTo(
        intro.children,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', stagger: 0.1 }
      )
    }

    if (pillars) {
      const cards = pillars.querySelectorAll('.pillar-card')
      tl.fromTo(
        cards,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', stagger: 0.12 },
        '-=0.4'
      )
    }

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
      {/* Header and Intro Section */}
      <div
        ref={introRef}
        className="about-grid"
        style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(300px, 58%) minmax(250px, 42%)',
          gap: 64,
          alignItems: 'start',
          marginBottom: 80,
        }}
      >
        <div>
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
              fontSize: 'clamp(32px, 3.5vw, 42px)',
              fontWeight: 400,
              letterSpacing: '-1.2px',
              lineHeight: '46px',
              color: ink,
              marginBottom: 28,
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
              lineHeight: '26px',
              marginBottom: 16,
              transition: 'color 0.4s ease',
            }}
          >
            {content.intro1}
          </p>
          <p
            className="font-sans"
            style={{
              fontSize: 16,
              color: gray,
              lineHeight: '26px',
              transition: 'color 0.4s ease',
            }}
          >
            {content.intro2}
          </p>
        </div>

        {/* Stats Grid */}
        <div>
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
                  border: `1px solid ${cardBorder}`,
                  transition: 'background 0.4s ease, border-color 0.4s ease',
                }}
              >
                <p
                  style={{
                    fontFamily: '"Instrument Serif", Georgia, serif',
                    fontSize: 'clamp(32px, 3.5vw, 44px)',
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
                    fontSize: 11,
                    letterSpacing: '1.2px',
                    textTransform: 'uppercase',
                    color: gray,
                    fontWeight: 500,
                    marginTop: 8,
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

      {/* Pillars / Core Focus Cards Grid */}
      <div style={{ marginBottom: 80 }}>
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
          {content.pillarsHeading}
        </p>

        <div
          ref={pillarsRef}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 500px), 1fr))',
            gap: 24,
          }}
        >
          {content.pillars.map((pillar, i) => (
            <div
              key={i}
              className="pillar-card"
              style={{
                background: cardBg,
                backdropFilter: 'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)',
                border: `1px solid ${cardBorder}`,
                borderRadius: 16,
                padding: 32,
                transition: 'transform 0.3s ease, box-shadow 0.3s ease, background 0.4s ease, border-color 0.4s ease',
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget
                el.style.transform = 'translateY(-3px)'
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
                  color: accent,
                  fontWeight: 400,
                  marginBottom: 8,
                  transition: 'color 0.4s ease',
                }}
              >
                {pillar.num}
              </p>
              <h3
                style={{
                  fontFamily: '"Instrument Serif", Georgia, serif',
                  fontSize: 24,
                  fontWeight: 400,
                  letterSpacing: '-0.5px',
                  color: ink,
                  marginBottom: 12,
                  transition: 'color 0.4s ease',
                }}
              >
                {pillar.title}
              </h3>
              <p
                className="font-sans"
                style={{
                  fontSize: 15,
                  color: gray,
                  lineHeight: '24px',
                  marginBottom: 20,
                  transition: 'color 0.4s ease',
                }}
              >
                {pillar.description}
              </p>
              <div
                className="flex flex-wrap"
                style={{ gap: 8 }}
              >
                {pillar.tags.map((tag, j) => (
                  <span
                    key={j}
                    className="font-sans"
                    style={{
                      background: pillBg,
                      borderRadius: 20,
                      padding: '4px 12px',
                      fontSize: 11,
                      color: gray,
                      border: `1px solid ${cardBorder}`,
                      transition: 'background 0.4s ease, color 0.4s ease',
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Categorized Skills Section */}
      <div style={{ marginBottom: 80 }}>
        <p
          className="font-sans"
          style={{
            fontSize: 12,
            letterSpacing: '1.32px',
            textTransform: 'uppercase',
            color: gray,
            fontWeight: 400,
            marginBottom: 24,
            transition: 'color 0.4s ease',
          }}
        >
          {content.skillsHeading}
        </p>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: 20,
          }}
        >
          {content.skills.map((cat, i) => (
            <div
              key={i}
              style={{
                background: statBg,
                borderRadius: 12,
                padding: 24,
                border: `1px solid ${cardBorder}`,
                transition: 'background 0.4s ease, border-color 0.4s ease',
              }}
            >
              <h4
                style={{
                  fontFamily: '"Instrument Serif", Georgia, serif',
                  fontSize: 20,
                  fontWeight: 400,
                  color: ink,
                  marginBottom: 6,
                  transition: 'color 0.4s ease',
                }}
              >
                {cat.category}
              </h4>
              <p
                className="font-sans"
                style={{ fontSize: 13, color: gray, lineHeight: '20px', transition: 'color 0.4s ease' }}
              >
                {cat.items}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Academic & Professional Journey Timeline */}
      {content.timeline && content.timeline.length > 0 && (
        <div style={{ marginBottom: 80 }}>
          <p
            className="font-sans"
            style={{
              fontSize: 12,
              letterSpacing: '1.32px',
              textTransform: 'uppercase',
              color: gray,
              fontWeight: 400,
              marginBottom: 28,
              transition: 'color 0.4s ease',
            }}
          >
            {content.timelineHeading || 'ACADEMIC & PROFESSIONAL JOURNEY'}
          </p>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 520px), 1fr))',
              gap: 20,
            }}
          >
            {content.timeline.map((item, i) => (
              <div
                key={i}
                className="timeline-card"
                style={{
                  background: cardBg,
                  backdropFilter: 'blur(16px)',
                  WebkitBackdropFilter: 'blur(16px)',
                  border: `1px solid ${cardBorder}`,
                  borderRadius: 14,
                  padding: 28,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 8,
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease, background 0.4s ease, border-color 0.4s ease',
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget
                  el.style.transform = 'translateY(-2px)'
                  el.style.boxShadow = `0 8px 24px ${shadowColor}`
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget
                  el.style.transform = 'translateY(0)'
                  el.style.boxShadow = 'none'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
                  <span
                    className="font-sans"
                    style={{
                      fontSize: 11,
                      letterSpacing: '1.2px',
                      textTransform: 'uppercase',
                      color: accent,
                      fontWeight: 600,
                    }}
                  >
                    {item.period}
                  </span>
                  <span
                    className="font-sans"
                    style={{
                      fontSize: 12,
                      color: gray,
                      fontWeight: 500,
                      background: pillBg,
                      padding: '2px 10px',
                      borderRadius: 12,
                      border: `1px solid ${cardBorder}`,
                    }}
                  >
                    {item.role}
                  </span>
                </div>
                <h3
                  style={{
                    fontFamily: '"Instrument Serif", Georgia, serif',
                    fontSize: 22,
                    fontWeight: 400,
                    letterSpacing: '-0.4px',
                    color: ink,
                    marginTop: 4,
                  }}
                >
                  {item.title}
                </h3>
                <p
                  className="font-sans"
                  style={{
                    fontSize: 14,
                    color: gray,
                    lineHeight: '22px',
                    marginTop: 4,
                  }}
                >
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Volunteer & Humanitarian Leadership */}
      {content.volunteerCategories && content.volunteerCategories.length > 0 && (
        <div>
          <div style={{ marginBottom: 28 }}>
            <p
              className="font-sans"
              style={{
                fontSize: 12,
                letterSpacing: '1.32px',
                textTransform: 'uppercase',
                color: gray,
                fontWeight: 400,
                marginBottom: 10,
                transition: 'color 0.4s ease',
              }}
            >
              {content.volunteerHeading || 'VOLUNTEER & HUMANITARIAN LEADERSHIP'}
            </p>
            {content.volunteerSubtext && (
              <p
                className="font-sans"
                style={{
                  fontSize: 15,
                  color: gray,
                  lineHeight: '24px',
                  maxWidth: 820,
                }}
              >
                {content.volunteerSubtext}
              </p>
            )}
          </div>

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 20,
            }}
          >
            {content.volunteerCategories.map((cat, i) => (
              <div
                key={i}
                className="volunteer-card"
                style={{
                  background: cardBg,
                  backdropFilter: 'blur(16px)',
                  WebkitBackdropFilter: 'blur(16px)',
                  border: `1px solid ${cardBorder}`,
                  borderRadius: 16,
                  padding: '28px 32px',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease, background 0.4s ease, border-color 0.4s ease',
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget
                  el.style.transform = 'translateY(-2px)'
                  el.style.boxShadow = `0 8px 24px ${shadowColor}`
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget
                  el.style.transform = 'translateY(0)'
                  el.style.boxShadow = 'none'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                  <span
                    style={{
                      display: 'inline-block',
                      width: 8,
                      height: 8,
                      borderRadius: '50%',
                      background: accent,
                      flexShrink: 0,
                    }}
                  />
                  <h3
                    style={{
                      fontFamily: '"Instrument Serif", Georgia, serif',
                      fontSize: 22,
                      fontWeight: 400,
                      letterSpacing: '-0.3px',
                      color: ink,
                    }}
                  >
                    {cat.category}
                  </h3>
                </div>

                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {cat.items.map((item, j) => (
                    <li
                      key={j}
                      className="font-sans"
                      style={{
                        fontSize: 14,
                        color: gray,
                        lineHeight: '24px',
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: 12,
                      }}
                    >
                      <span
                        style={{
                          color: accent,
                          fontSize: 14,
                          lineHeight: '24px',
                          userSelect: 'none',
                        }}
                      >
                        —
                      </span>
                      <span style={{ flex: 1 }}>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  )
}
